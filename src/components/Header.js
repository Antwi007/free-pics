import React from 'react';
import PostButton from './PostButton';
import "./Header.css";

const Header = ({onPostClick}) => {
    return (
        <h2 className="ui header headerContainer">
            <i className="circular camera icon"></i>
            <div className="description">
                Photo Search Gallery
                <div className="sub header">
                    Perfect website to find and download copyright free images for your website.
                </div>
            </div>
            <div className="postButton">
                <PostButton onPostClick={onPostClick}/>
            </div>
        </h2>
    )
}

export default Header;