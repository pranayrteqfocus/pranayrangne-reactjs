import axios from "axios";
import React, { useEffect, useState } from "react";
import { token } from "../apiKey/apiKey";
import Header from "../components/header";


interface ProductProps{
    avatar:string;
    description:string;
    name:string;
    price:string
}


function Details() {
   const id = (window.location.pathname).split('=');
   const [product, setProduct] = useState<ProductProps>({avatar:'',description:'',name:'',price:''})
   useEffect(() => {
    axios({
        method: "get",
        url: `https://upayments-studycase-api.herokuapp.com/api/products/${id[1]}`,
        headers: { Authorization: `Bearer ${token}` },
      }).then(async function (response) {
        if (response?.data?.message === "Success") {
            setProduct(response.data.product)
        }
      });
   }, [])
   
  return (
    <div className="container  w-9/12 m-auto p-auto">
      <Header />
      {product.avatar !== '' ? null :<div className="bg-lime-50" style={{position:'fixed',left:'50%',top:'50%',padding:'10px'}}>
      Loading....
      </div>}
      <div className="grid grid-cols-4 gap-2 m-10">
        <div>
        <img alt="img"  src={product.avatar} />
        </div>

        <div className="p-2">
            <h1 className="font-bold text-3xl">{product.name}</h1>
            <h2 className="font-bold text-2xl mt-16 pt-12">$ {product.price}</h2>
        </div>
      </div>
       <div className="container w-10/12 ml-8">
       <hr className="font-extrabold" style={{border:'2px solid lightgray',backgroundColor:'lightgray',borderRadius:'4px'}}/>
       
       <p className="py-2">
        <b className="text-lg">Description</b><br/>
        {product.description}
       </p>
       </div>
    </div>
  );
}

export default Details;
