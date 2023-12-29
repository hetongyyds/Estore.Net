import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./HomePage";
import Catalog from "./Catalog";
import ProductDetails from "./ProductDetail";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import BasketPage from "./BasketPage";
import CheckOutPage from "./CheckOut";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {path:'',element:<HomePage/>},
            {path:'Catalog',element:<Catalog/>},
            {path:'Catalog/:id',element:<ProductDetails/>},
            {path:'about',element:<AboutPage/>},
            {path:'contact',element:<ContactPage/>},
            {path:'basket',element:<BasketPage/>},
            {path:'checkout',element:<CheckOutPage/>}
        

        ]
    }
])