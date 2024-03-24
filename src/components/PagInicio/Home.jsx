import React from "react";
import Header  from "./Header/Header";
import MainContent from "./MainContent/MainContent";

const Home = () => {
    return (
        <div className="homeContent">
            <div className="headerInit">{<Header />}</div>
            <div className="mainContent">{<MainContent />}</div>
        </div>
        
    )
};

export default Home