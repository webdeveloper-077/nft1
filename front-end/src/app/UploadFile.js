"use client";

import { useState } from "react";
import axios from "axios";
import { Blob, NFTStorage } from "nft.storage";
import { ethers } from "ethers";
import { abiS, contractAddressS } from "../../constants/constants";

const nftapi = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIzNGVFN0ZjMzUxOTcwMjZEOTQ3Yzk2NkM4MGY5RDc4Q0FmZDhEMjciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3ODk4MjkyMzc2MiwibmFtZSI6IlByb2plY3RfMSJ9.yltH4xETYrpHOyAogkPvo3YGCegeeGyqUoRRDPnMWEg"


export default function UploadFile() {
    const [selectedImage, setSelectImage] = useState("");
    const [viewImage, setViewImage] = useState("");
    const [text, setText] = useState("")
    const [description, setDescription] = useState("");
    const [tokenURILink, setTokenURILink] = useState("");
    const [imageIPFS, setImageIPFS] = useState("");
    const [tokenURI, setTokenURI] = useState("");
    const [upload, setUpload] = useState("");
    const [mint, setMint] = useState("");
    let tokenURITemplate = {
      "title": "Asset Metadata",
      "type": "object",
      "properties": {
          "name": {
              "type": "string",
              "description": ""
          },
          "description": {
              "type": "string",
              "description": ""
          },
          "image": {
              "type": "string",
              "description": ""
          }
      }
  }



    const handleFiles = async () => {
      if(!selectedImage) return
      console.log(selectedImage);
      const formData = new FormData();
      formData.set("file", selectedImage);
      const res = await axios.post("/api/saveFile", formData);
      console.log(res)

      let tokenURIMetaData = {...tokenURITemplate}
      tokenURIMetaData.properties.name.description = text;
      tokenURIMetaData.properties.description.description = description;
      tokenURIMetaData.properties.image.description = `ipfs://${res.data.IpfsHash}`;

      let imageIPFSURL = `https://ipfs.io/ipfs/${res.data.IpfsHash}`

      setImageIPFS(imageIPFSURL)

      console.log(tokenURIMetaData);
      //console.log(nftapi)


      const client = new NFTStorage({token: nftapi});
      const blob = new Blob([JSON.stringify(tokenURIMetaData)], {"type": "application/json"})
      const data = await client.storeBlob(blob)
      
      let tokenURIURL = `https://ipfs.io/ipfs/${data}`;

      console.log(tokenURIURL)
      setUpload(true);
      

      setTokenURILink(tokenURIURL)
      let tokenURIG = `ipfs://${data}`
      setTokenURI(tokenURIG);
      
    }
    const handleMint = async () => {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signers = providers.getSigner();
      const contract = new ethers.Contract(contractAddressS, abiS, signers);
      try {
        console.log("Minting Tokens")
        const transResp = await contract.mint(tokenURI);
        await transResp.wait(1);
        console.log("Token Minted");
        setMint(true)
        console.log(transResp)
      } catch (error) {
        console.log(error);
      }
    }
    return(
        <div className="flex flex-row justify-center">
            <div className=" items-start space-y-6 p-10">
            <div className="text-center  text-slate-500">
            <img src={viewImage} alt="Upload File by choosing file below" className="h-[280px] w-[230px] rounded-md border-4 border-gray-800"/>
            </div>
            
            <input type="text" placeholder="Type name" onChange={(event) => {
                setText(event.target.value);
              }} className="placeholder:italic placeholder:text-slate-500 border-4 border-gray-800 rounded-md w-[230px]"/>
              <textarea type="text" placeholder="Type in Description" onChange={(event) => {
                setDescription(event.target.value)
              }} className="flex  placeholder:italic placeholder:text-slate-500 border-4 border-gray-800 rounded-md w-[230px] h-[100px]"/>
              <input hidden type="file" id="file" onChange={({target})=>{
              if(target.files){
                const file = target.files[0];
                setViewImage(URL.createObjectURL(file));
                setSelectImage(file);
              }
              }}/>
              <label htmlFor="file" className="flex justify-center items-center border-4  border-gray-800 rounded-2xl h-[40px] w-[170px]">
                Choose Photo
              </label>
            </div>
            <div className="flex flex-col p-10 space-y-6">
              <button onClick={handleFiles} className="border-4 border-gray-800 rounded-2xl h-[40px] w-[170px]">{upload?<>Uploaded</>:<>Upload</>}</button>
              <button onClick={handleMint} className="border-4 border-gray-800 rounded-2xl h-[40px] w-[170px]">{mint?<>Minted</>:<>Mint</>}</button>
              <a href={imageIPFS} className="bold text-2xl color text-blue-600">Image URL</a>
              <a href={tokenURILink} className="bold text-2xl text-blue-600">Token URI</a>
            </div>
        </div>
    )
}

