import { Fragment } from "react";
import { Product } from "./products";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ProductList from "./ProductList";

interface Props{
    products:Product[],
    addProducts:() => void
}

export default function Catalog({products,addProducts}: Props){
    return(
        <Fragment>
            <ProductList products={products}></ProductList>
            <Button variant="contained" onClick={addProducts}>Add Product</Button>

        </Fragment>
      
    )
}