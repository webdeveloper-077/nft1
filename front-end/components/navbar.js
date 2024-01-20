"use client";

import { Web3Button } from "@web3modal/react";

function NavBar() {
    return(
        <div className="flex flex-row p-4 bg-black justify-between">
            <div className="text-4xl pl-[15px] text-white ">carbon</div>
            <div>
                <Web3Button />
            </div>
        </div>
        
    )
}

export default NavBar;