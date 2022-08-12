import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/header";
import { token } from "../apiKey/apiKey";

interface ProdcutProps {
  category: string;
  _id: string;
  avatar: string;
  name: string;
  price: number;
}

interface CatProps {
    name: string;
  _id: string;
}

function Home() {
  const [products, setProducts] = useState<ProdcutProps[]>([]);
  const [productsFilter, setProductsFilter] = useState<ProdcutProps[]>([]);
  const [cateogries, setCateogries] = useState<CatProps[]>([]);
  const [filters, setFilters] = useState<ProdcutProps[]>([]);

  const getProducts = () => {
    return axios.get(
      "https://upayments-studycase-api.herokuapp.com/api/products",
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const getCategories = () => {
    return axios.get(
      "https://upayments-studycase-api.herokuapp.com/api/categories/",
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };
  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(function (
      response
    ) {
        const prods = response[0]?.data?.products
        const cats = response[1]?.data?.categories
        setProducts(prods)
        setCateogries(cats)
    });
  }, []);
  const requestSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedVal = e.target.value;
    const filteredRows = products.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    filteredRows.length > 0 ? setFilters(filteredRows) : null;
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
      let filters= products.filter(el=>el.category === e.target.value);
      setProductsFilter(filters)
  };
  return (
    <div className="container  w-9/12 m-auto p-auto">
      <Header />
      {products.length > 0 ? null : (
        <div
          className="bg-lime-50"
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            padding: "10px",
          }}
        >
          Loading....
        </div>
      )}
      <div className="flex mt-10 justify-between w-full">
        <div>
          <input
            type="text"
            placeholder="Apple Watch,Samsung S21,Macbook Pro..."
            className="px-4 py-2 w-96 shadow-lg leading-tight rounded-lg"
            onChange={requestSearch}
          />
        </div>
        <div className="inline-block relative w-64">
          <select
            onChange={handleCategory}
            className="block appearance-none w-full bg-white px-4 py-2 pr-8 shadow-lg leading-tight rounded-lg focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled selected hidden>
              Categories
            </option>
            {cateogries.length > 0 ? (
              cateogries.map((element, index) => {
                return (
                  <option key={index} value={element.name}>
                    {element.name}
                  </option>
                );
              })
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

      {/* Cards */}
      <div className="container mt-10 p-4">
        <div className="grid grid-cols-4 gap-4">
          {(filters.length > 0 ? filters : productsFilter.length > 0 ? productsFilter : products).map((el, idx) => {
            return (
              <Link to={{ pathname: `/details:id=${el._id}` }}>
                <div className="shadow-lg rounded-lg bg-white p-4">
                  <img
                    style={{ maxHeight: "200px", minHeight: "200px" }}
                    className="p-5"
                    src={el.avatar}
                    alt={`img` + [idx]}
                  />
                </div>
                <h5 className="text-center font-semibold">
                  {el.name}
                  <h6 className="text-center font-semibold">$ {el.price}</h6>
                </h5>
              </Link>
            );
          })}
          {/* <img alt="img"  src={}/> */}
        </div>
      </div>
      {/* Cards-end */}

      {/* floating Button */}

      <Link
        to={{ pathname: "/register" }}
        className="bg-slate-800 rounded-full hover:bg-violet-600 text-center text-slate-100"
        style={{
          position: "fixed",
          right: "100px",
          bottom: "10px",
          width: "60px",
          height: "60px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className="text-center text-5xl mb-2">+</p>
      </Link>

      {/* floating Button end */}
    </div>
  );
}

export default Home;
