import React, { Component } from 'react';
//import axios from 'axios';
import Autocomplete from 'react-google-autocomplete';
import './landingpage.css';

import logo from '../logodark.svg';
import clock from '../assets/clock-icon.webp';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            name: '',
            email: '',
            age: '',
            gender: '',
            bloodgroup: '',
            address: '',
            pos: '',
        }
    }

    onChangePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onChangeAge = (e) => {
        this.setState({
            age: e.target.value
        })
    }

    onChangeGender = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    onChangeBG = (e) => {
        this.setState({
            bloodgroup: e.target.value
        })
    }

    onChangeAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    submitform = (e) => {
        e.preventDefault()
        console.log(this.state)
        /*const data = {
            phone: this.state.phone,
            name: this.state.name,
            gender: this.state.gender,
            email: this.state.email,
            address: this.state.address,
            pos: this.state.pos,
            age: this.state.age,
            bloodgroup: this.state.bloodgroup
        }*/
        //axios.post('/api/landingpage/', data)
        //    .then(res => {
        //        console.log(res)
        //    })
        //    .catch(err => {
        //        console.log(err)
        //    })
    }

    render() {
        return (
            <div className="lp">
                <div style={{ backgroundImage: `url(${logo})` }} className="lp-cover">
                    <div className="lp-admin">Become a Blood Donor with Blood4Needy</div>
                </div>
                <form className="lp-form" onSubmit={this.submitform}>
                    <img className="lp-logo" alt="logo" src={logo} width="150" />
                    <p className="lp-tag">Donate Blood, Save Lives :heart:</p>
                    <p className="lp-tag bold">Blood4Needy is an online NGO. We connect blood donors with the blood receivers through an integrated online platform.</p>
                    <div className="lp-time">
                        <img alt="time" src={clock} width="40" height="40" />
                        <div className="lp-time-tags">
                            <p>Estimated completion time:</p>
                            <p style={{ fontSize: '18px' }}>2-3 minutes</p>
                        </div>
                    </div>
                    <p style={{ fontSize: '10px' }}>Please complete the form below to begin your blood donation journey with Blood4Needy</p>
                    <label htmlFor="phone">10-Digit Mobile Number</label>
                    <input type="tel" value='+91' style={{ width: '15%' }} disabled />
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        style={{ width: '85%' }}
                        name="phone"
                        id="phone"
                        pattern="[1-9]{1}[0-9]{9}"
                        onInput={this.handleInput}
                        onChange={this.onChangePhone}
                        required />
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="Your Name" onChange={this.onChangeName} required /><br />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="example@domain.com" onChange={this.onChangeEmail} required /><br />
                    <label htmlFor="age">Age</label>
                    <input type="number" min="18" name="age" id="age" placeholder="Your Age" onChange={this.onChangeAge} required /><br />
                    <label htmlFor="address">City</label>
                    <Autocomplete
                        id="address" name="address" onChange={this.onChangeAddress}
                        apiKey={'AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us'}
                        onPlaceSelected={(place) => this.setState({ address: place.formatted_address, pos: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } })}
                        types={['(cities)']}
                        componentRestrictions={{ country: "in" }}
                        placeholder="Select from dropdown"
                        required
                    />
                    <label htmlFor="name" style={{ fontSize: '12px', marginBottom: '0.5rem' }}>Gender</label>
                    <div className="radiobtn">
                        <input type="radio" id="male" name="gender" value="male" onChange={this.onChangeGender} required />
                        <label htmlFor="male">Male</label><br />
                        <input type="radio" id="female" name="gender" value="female" onChange={this.onChangeGender} required />
                        <label htmlFor="female">Female</label><br />
                        <input type="radio" id="other" name="gender" value="other" onChange={this.onChangeGender} required />
                        <label htmlFor="other">Other</label>
                    </div>
                    <div className="selection">
                        <label htmlFor="bloodgroup">Blood Group</label>
                        <select name="bloodgroup" id="bloodgroup" onChange={this.onChangeBG} required>
                            <option value="" defaultValue hidden>--</option>
                            <option value="A-">A-</option>
                            <option value="A+">A+</option>
                            <option value="B-">B-</option>
                            <option value="B+">B+</option>
                            <option value="AB-">AB-</option>
                            <option value="AB+">AB+</option>
                            <option value="O-">O-</option>
                            <option value="O+">O+</option>
                        </select>
                    </div>
                    <div className="btnbox">
                        <button type="submit" id="next3" className="loginbutton">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}