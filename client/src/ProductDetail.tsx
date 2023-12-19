import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "./products";

export default function ProductDetails(){

    const{id} = useParams<{id:string}>();
    const[product,setProduct] = useState<Product|null>(null);
    const[loading,setloading] = useState(true);

    useEffect(() =>{
        axios.get(`http://localhost:5000/api/Product/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.log(error))
        .finally(() => setloading(false));
    },[id])

    if(loading) return <h6>Loading...</h6>

    if(!product) return <h6>Product Not Found</h6>

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

            </Grid>
        </Grid>
    )
}


