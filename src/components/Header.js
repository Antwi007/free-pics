import React from 'react';
import "./Header.css";

const Header = () => {
    return (
        <h2 className="ui header headerContainer">
            <i className="circular camera icon"></i>
            <div className="description">
                Photo Search Gallery
                <div className="sub header">
                    Perfect website to find and download copyright free images for your website.
                </div>
            </div>
        </h2>
    )
}

export default Header;