import { useEffect, useState } from "react"
import { Product } from "./products";
import Catalog from "./Catalog";
import { Container, CssBaseline, Typography } from "@mui/material";
import Header from "./Header";





function App() {
  const [products,setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/Product')
    .then(response => response.json())
    .then(data => setProducts(data))
  },[])

  function addProducts(){
    setProducts(preState =>[...preState,
      { 
        id:preState.length + 101,
        name:'product'+ (preState.length + 1),
        price:(preState.length *100)+100,
        brand:'some brand',
        description:'some thing',
        type:'type1'


    }])
  }
  

  return (
    <>
      <CssBaseline></CssBaseline>
      <Header></Header>
      <Container>
        <Catalog products = {products} addProducts={addProducts}></Catalog>

      </Container>
      
      
    </>
  )
}

export default App
