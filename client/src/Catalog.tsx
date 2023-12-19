import { Fragment, useEffect, useState } from "react";
import { Product } from "./products";
import ProductList from "./ProductList";






export default function Catalog(){
    const [products,setProducts] = useState<Product[]>([]);

    useEffect(() => {
    fetch('http://localhost:5000/api/Product')
    .then(response => response.json())
    .then(data => setProducts(data))
    },[])

    return(
        <Fragment>
            <ProductList products={products}></ProductList>
           

        </Fragment>
      
    )
}