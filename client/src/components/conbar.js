import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './conbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Contactbar extends Component {
    render() {
        return (
            <div className="conbar">
                <button style={{ backgroundColor: '#F42929' }}><Link to='/request'>Request<br /> Blood/Plasma</Link></button>
                <button style={{ backgroundColor: '#6dc370' }}><Link to='/feed'>Live Feed &nbsp;<FontAwesomeIcon icon='heart' className="heart" /></Link></button>
            </div>
        )
    }
}