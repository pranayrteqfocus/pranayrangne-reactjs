import axios from "axios";
import React, { useEffect, useState } from "react";
import { token } from "../apiKey/apiKey";
import Header from "../components/header";

function Register() {
    const [cat, setCat] = useState<string[]>([])
    const [productName,setProductName] = useState<string>('');
    const [description,setDescription] = useState<string>('');
    const [imageUrl,setImageUrl] = useState<string>('');
    const [categoryName,setCategoryName] = useState<string>('');
    const [price,setPrice] = useState<number>(0);

    const handleSubmit = () =>{
        if(productName !== '' && description !== '' && imageUrl !== '' && categoryName !== '' && price > 0){
            axios({
                method: "post",
                url: "https://upayments-studycase-api.herokuapp.com/api/products",
                headers: { Authorization: `Bearer ${token}` },
                data:{
                    name:productName,
                    price:price,
                    category:categoryName,
                    avatar:imageUrl,
                    description:description,
                    developerEmail:'pranayrangne91@gmail.com'
                }
              }).then(async function (response) {
                    
                    if(response.data.message === 'Success'){
                        alert('Product Successfully Added')
                        window.location.href = '/';
                    }
              });
        }else{
            alert('All Fields Required')
        }
    }

    
    useEffect(() => {
        axios({
            method: "get",
            url: "https://upayments-studycase-api.herokuapp.com/api/categories/",
            headers: { Authorization: `Bearer ${token}` },
          }).then(async function (response) {
            if (response?.data?.message === "Success") {
              let result = response.data.categories;
              let categories: string[] = result.map(
                (el: { name: string }) => el.name
              );
              setCat(categories);
            }
          });
    }, [])
    
  return (
    <>
      <div className="container  w-9/12 m-auto p-auto">
        <Header />

        <div className="flex justify-center mt-16">
          <b className="text-3xl">Create Product</b>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Product Name"
            className="px-4 my-8 py-2 w-2/4 shadow-lg leading-tight rounded-lg"
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setProductName(event.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <textarea
            rows={5}
            placeholder="Description"
            className="px-4  py-2 w-2/4 shadow-lg leading-tight rounded-lg"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>)=> setDescription(event.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Image URL"
            className="px-4 my-8 py-2 w-2/4 shadow-lg leading-tight rounded-lg"
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setImageUrl(event.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <div className="inline-block relative w-2/4 mb-8">
            <select onChange={(event: React.ChangeEvent<HTMLSelectElement>)=> setCategoryName(event.target.value)} className="block appearance-none w-full bg-white px-4 py-2 pr-8 shadow-lg leading-tight rounded-lg focus:outline-none focus:shadow-outline">
              <option  value="" disabled selected hidden>
                Categories
              </option>
              {cat.length > 0 ? (
              cat.map((element, index) => (
                <option key={index} value={element}>
                  {element}
                </option>
              ))
            ) : (
              <option>No Category found</option>
            )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>    
        </div>
        <div className="flex justify-center">
          <input
            type="number"
            placeholder="Price"
            className="px-4  py-2 w-2/4 shadow-lg leading-tight rounded-lg"
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setPrice(+event.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button onClick={handleSubmit} className="px-4 py-4 w-2/4 font-semibold text-center my-8 hover:bg-violet-600 shadow-lg bg-white leading-tight rounded-lg">
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
