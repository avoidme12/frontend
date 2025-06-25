import React from "react";
import {assets} from "@/assets/assets.js";

export default function NotFound(){
    return(
        <div>
            <h1 className='mb-3 p-2 font-semibold text-[20px]'>[404] Ничего не найдено :(</h1>
            <img
                className='w-[90px] rounded-lg'
                width={1000}
                height={1000}
                src={assets.smailface}
                alt=''/>
        </div>
    )
}