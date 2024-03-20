import React from "react";
import Header  from "./Header/Header";
import { Routes } from "react-router-dom";

const Home = () => {
    return (
        <div className="homeContent">
            <div className="headerInicio">{<Header />}</div>
        </div>
        
    )
};

export default Home