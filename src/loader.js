import React, { Component } from 'react';
import loaderGif from './loader.gif';

class Loader extends Component {

    render() {
        
        return (
            <img src={loaderGif} alt="Loading" />
        );
    }
}

export default Loader;