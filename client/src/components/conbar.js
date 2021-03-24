import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './conbar.css';

export default class Contactbar extends Component{
    render() {
    return(
        <div className="conbar">
            <button style={{backgroundColor: '#F42929'}}><Link to='/request'>Request Blood</Link></button>
            <button style={{backgroundColor: '#6dc370'}}><Link to='/contact'>Contact Us</Link></button>
        </div>
    )}
}