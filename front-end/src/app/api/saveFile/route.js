import formidable from "formidable";
import {writeFile} from "fs/promises"
import path, { resolve } from "path";
import {NextResponse} from "next/server"
const dir = path.join(process.cwd(), "/NFTImages");
import fs from "fs";
const pinataSDK = require("@pinata/sdk");
require("dotenv").config();

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);


export async function POST(req) {
  // const parseFile = () => {
  //   // const options = {
  //   //   uploadDir: path.join(process.cwd(), "/NFTImages"),
  //   //   filename: (name, ext, part, form) => {
  //   //     let filename = part.originalFilename;
  //   //     return filename.split(".")[0].concat(".png");
  //   //   },
  //   // };
  //   // const form = formidable(options);

  //   // form.parse(req, (err, fields, files) => {
  //   //   if (!files.File.originalFilename) {
  //   //     res.setHeader("content-type", "application/json")
  //   //     res.status(400).send("No File Uploaded")
  //   //     return
  //   //   }
  //   // });

  // };

  async function uploadToPinata(files){
    try {
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false});
    }

  };
    
  const body = await req.formData();
  const File = body.get("file");
  console.log(File);
  const bytes = await File.arrayBuffer()
  const buffer = Buffer.from(bytes);
  await writeFile(dir + "/" + File.name.toString(), buffer); 
  const readableFileStream = fs.createReadStream(dir + "/" + File.name.toString());
  const options = {
       pinataMetadata: {
       name: File.name.toLowerCase()
    },
  };

  const result = await pinata.pinFileToIPFS(readableFileStream, options);
  console.log(result.IpfsHash);
  return new NextResponse(JSON.stringify(result), {status: 201, headers: {"Content-Type": "application/json"}});
}

