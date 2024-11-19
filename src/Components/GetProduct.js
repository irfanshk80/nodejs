import React, {useState, useEffect} from 'react';

const GetProduct = (props) => {

  const [products, setProducts] = useState(null)

  const getProduct = async () => {
    try {
      await fetch("http://192.168.43.175:9000/readProducts")
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          setProducts(data);
        })
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(async () => {
    console.log('fetch useEffect');
    const interval = setInterval(() => {
      getProduct();
    },10000)
    return () => clearInterval(interval);
  },[]);

  return (
      <div>
    	<h1> My Products </h1>
      <div className="products-list">
        {products && 
          products.map((product) => (
          <div className="products-preview" key={product.id}>
            <h2>{product.name}</h2>
            <span>{product.list_price}</span>
          </div>
        ))}
      </div>
      </div>
  )
}

export default GetProduct;