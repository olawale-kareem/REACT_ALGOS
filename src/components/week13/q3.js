import React from "react";
import {Route, useParams}  from "react-router-dom"


// note : route is a conditional compnents that renders a compnents when the url matches

function App() {
    return(
        <Route path="/category/:categoryId/product/:productName">
            <Product/>
        </Route>
    )
}

export default function Product(){
    const {categoryId, productName} = useParams();
    return(
        <>
            <p>The product category is {productName}</p>
            <p>The product name is {categoryId}</p>
        </>
    )
}