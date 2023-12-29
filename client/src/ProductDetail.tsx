import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "./products";
import agent from "./agent";
import { useStoreContext } from "./StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails(){

    const{id} = useParams<{id:string}>();
    const[product,setProduct] = useState<Product|null>(null);
    const[loading,setloading] = useState(true);
    const{basket,setBasket,removeItem} = useStoreContext();
    const[quantity,setQuantity] = useState(0);
    const[submitting,setSubmitting] = useState(false);
    const item = basket?.items.find(item => item.productId === product?.id);

    

    useEffect(() =>{
        if(item) setQuantity(item.quantityInCart);
        id && agent.Catalog.details(parseInt(id))
        .then(response => setProduct(response))
        .catch(error => console.log(error))
        .finally(() => setloading(false)); 
    },[id,item])

    function handleInputChange(event:any){
        if(event.target.value>=0){
            setQuantity(parseInt(event.target.value));

        }
        
    }

    function handleUpdateCart(){
        
        setSubmitting(true);
        
        if(!item||quantity > item.quantityInCart){
            const updateQuantity = item ? quantity - item.quantityInCart : quantity;
            
            agent.Basket.addItem(product?.id!,updateQuantity)
            .then(basket => setBasket(basket))
            .catch(error=>console.log(error))
            .finally(() => setSubmitting(false))
        }
        else{
            const updateQuantity = item.quantityInCart - quantity;
            agent.Basket.deleteItem(product?.id!,updateQuantity)
            .then(()=> removeItem(product?.id!,updateQuantity))
            .catch(error=>console.log(error))
            .finally(() => setSubmitting(false))
        }


    }

    

    if(loading) return <h3>Loading...</h3>

    if(!product) return <h3>Product Not Found</h3>

    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}></img>

            </Grid>

            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant='h4' color='secondary'>${(product.price/100).toFixed(2)} </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    {product.name}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Description
                                </TableCell>
                                <TableCell>
                                    {product.description}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Type
                                </TableCell>
                                <TableCell>
                                    {product.type}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Brand
                                </TableCell>
                                <TableCell>
                                    {product.brand}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    QuantityInStock
                                </TableCell>
                                <TableCell>
                                    {product.quantityInStock}
                                </TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField onChange={handleInputChange} variant="outlined" type="number" label='Quantity in Cart' fullWidth  value={quantity}/>
                            
                    </Grid>

                    <Grid item xs={6}>
                        <LoadingButton disabled={item?.quantityInCart === quantity || !item && quantity === 0} loading={submitting} onClick={handleUpdateCart} sx={{height:'55px'}} color='primary' size='large' variant="contained" fullWidth>
                            {item?'Update Quantity':'Add to Cart'}
                        </LoadingButton>
                    </Grid>

                </Grid>

            </Grid>
        </Grid>
    )
}


