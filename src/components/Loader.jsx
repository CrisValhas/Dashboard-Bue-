import React from "react";

const gif = require('../assets/gif-loading.gif')

export default function Loader() {

    return (
        <div className="mt-80 w:full flex justify-center">
            <img className="w-40" src={gif} alt="gif-loading" />
        </div>
    )  
}