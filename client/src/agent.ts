import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';

axios.defaults.withCredentials = true;

const responseBody = (response:AxiosResponse) => response.data;

const request = {
    get:(url:string) => axios.get(url).then(responseBody),
    post:(url:string,body:{}) => axios.post(url,body).then(responseBody),
    put:(url:string,body:{}) => axios.put(url,body).then(responseBody),
    delete:(url:string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list:() => request.get('Product'),
    details:(id:number) => request.get(`Product/${id}`)
}

const Basket = {
    get:() => request.get('Basket'),
    addItem:(productId: number,quantity =1) => request.post(`Basket?productId=${productId}&quantity=${quantity}`,{}),
    deleteItem:(productId: number,quantity =1) => request.delete(`Basket?productId=${productId}&quantity=${quantity}`)
}



const agent = {
    Catalog,
    Basket
}

export default agent;
