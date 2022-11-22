import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from '../components';

export default function Blogger() {

    let [data,setData] = useState([]);

    
    useEffect(() => {
        const reqData = async () => {
            // const blogData = await axios.get("https://www.googleapis.com/blogger/v3/blogs/5453241076183956423?key=AIzaSyAhmbbj55QBFn2jVcrFeRd9XOEmjV11xpg")
            const postData = await axios.get("https://www.googleapis.com/blogger/v3/blogs/5453241076183956423/posts?key=AIzaSyAhmbbj55QBFn2jVcrFeRd9XOEmjV11xpg")
            setData(postData.data.items) 
            // console.log(data)
        };
        reqData()
    }, []);


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Blogger" />
            <div>
            {/* {data  && console.log(data)} */}
            {data && 
            
            data.map((item, index) => {
                console.log(item)

                return (
                    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl" id={index}>
                        <h1>{item.title}</h1>
                        <p>{item.published}</p>
                        <p>{item.content}</p>
                        <button>enviar comentario</button>
                    </div>
                )
            })}

            </div>
            
        </div>
    )
}