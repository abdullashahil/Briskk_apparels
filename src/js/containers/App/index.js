import React from "react"
import { Outlet } from "@tata1mg/router"
import NavBar from "../../components/NavBar"
import { CartProvider } from "../../../context/CartContext"
const App = () => {
    return (

        <CartProvider>
            <NavBar />
            <Outlet />
        </CartProvider>
    )
}

App.serverSideFunction = () => {
    return new Promise((resolve) => resolve())
}

export default App
