import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import axios from 'axios';
import Switch from "react-switch";
import Autocomplete from 'react-google-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import './landingpage.css';

import logo from '../logodark.svg';
import clock from '../assets/clock-icon.webp';
import warning from '../assets/warning.png'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            name: '',
            email: '',
            age: '',
            type: 'blood',
            covid: false,
            gender: '',
            bloodgroup: '',
            address: '',
            pos: '',

            page: 0,
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

    onChangeType = (e) => {
        if (!this.state.covid) {
            this.setState({
                covid: true,
                type: 'plasma'
            })
        } else {
            this.setState({
                covid: false,
                type: 'blood'
            })
        }
    }

    submitform = (e) => {
        e.preventDefault()
        const data = {
            phone: this.state.phone,
            name: this.state.name,
            gender: this.state.gender,
            email: this.state.email,
            address: this.state.address,
            pos: this.state.pos,
            age: this.state.age,
            bloodgroup: this.state.bloodgroup,
            type: this.state.type,
            covid: this.state.covid
        }

        if (typeof (data.pos) === 'object') {
            axios.get('/api/user/' + this.state.phone)
                .then(res => {
                    if (res.data === null) {
                        axios.post('/api/user/add', data)
                            .then(res => {
                                this.props.addUser(res.data)
                                axios.post('/api/blood/add', { user: res.data })
                                    .then(res => {
                                        this.setState({ page: 1 })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    } else {
                        this.setState({ warning: "User Already Exists!" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            this.setState({ warning: "Please select from dropdown" })
        }
    }

    render() {
        return (
            <div className="lp">
                <Helmet>
                    <meta name="description" content="Signup to donate blood or plasma to people in need!"></meta>
                    <title>Signup</title>
                </Helmet>
                <div style={{ backgroundImage: `url(https://californiaivf.eggdonorconnect.com/ClinicFiles/Clinic59/bg-egg-donor.jpg)` }} className="lp-cover">
                    <div className="lp-admin">Become a Blood Donor with Blood4Needy</div>
                </div>
                {this.state.page === 0 && <form className="lp-form" onSubmit={this.submitform}>
                    <img className="lp-logo" alt="logo" src={logo} width="150" />
                    <p className="lp-tag-1">Donate Blood, Save Lives <FontAwesomeIcon icon='heart' className="heart" /></p>
                    <p className="lp-tag-2 bold">Blood4Needy is an online NGO. We connect blood donors with the blood receivers through an integrated online platform.</p>
                    <div className="lp-time">
                        <img alt="time" src={clock} width="40" height="40" />
                        <div className="lp-time-tags">
                            <p>Estimated completion time:</p>
                            <p style={{ fontSize: '18px' }}>1 - 1½ minutes</p>
                        </div>
                    </div>
                    <p style={{ fontSize: '15px', marginBottom: '30px' }}>Please complete the form below to begin your blood donation journey with Blood4Needy</p>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="Your Name" onChange={this.onChangeName} required /><br />
                    <label htmlFor="phone">10-Digit Mobile Number</label>
                    <input type="tel" value='+91' style={{ width: '20%', textAlign: 'center' }} disabled />
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        style={{ width: '80%' }}
                        name="phone"
                        id="phone"
                        pattern="[1-9]{1}[0-9]{9}"
                        onInput={this.handleInput}
                        onChange={this.onChangePhone}
                        required />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="example@domain.com" onChange={this.onChangeEmail} required /><br />
                    <label htmlFor="age">Age</label>
                    <input type="number" min="18" name="age" id="age" placeholder="Your Age" onChange={this.onChangeAge} required /><br />
                    <label htmlFor="address">City</label>
                    <Autocomplete
                        id="address" name="address" onChange={this.onChangeAddress}
                        apiKey={'AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us'}
                        onPlaceSelected={(place) => this.setState({ address: place.formatted_address, pos: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } })}
                        types={['(regions)']}
                        componentRestrictions={{ country: "in" }}
                        placeholder="Select from dropdown"
                        required
                    />
                    <div className="lp-surround">
                        <div className="lp-gender">
                            <label htmlFor="name">Gender</label>
                            <div className="radiobtn">
                                <input type="radio" id="male" name="gender" value="male" onChange={this.onChangeGender} required />
                                <label htmlFor="male">Male</label><br />
                                <input type="radio" id="female" name="gender" value="female" onChange={this.onChangeGender} required />
                                <label htmlFor="female">Female</label><br />
                                <input type="radio" id="other" name="gender" value="other" onChange={this.onChangeGender} required />
                                <label htmlFor="other">Other</label>
                            </div>
                        </div>
                        <div className="lp-bg">
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
                        </div>
                    </div>
                    <div className="currloc" title="Urgent! Plasma Donors Required!!">
                        <label htmlFor="address" style={{ width: '80%' }}><img src={warning} alt="warning" className="blink" width={25} style={{ marginRight: '10px' }} /> I've Recovered from Covid and can Donate Plasma</label>
                        <Switch onChange={this.onChangeType} checked={this.state.type === 'plasma'} uncheckedIcon={false} onColor='#F42929' offColor='#bcbcbc' handleDiameter={16} boxShadow='0 0 2px 1px #a7a7a7' activeBoxShadow='0 0 2px 1px #F42929' width={30} height={15} checkedIcon={false} />
                    </div>
                    <div className="bold colorize lp-warning">{this.state.warning}</div>
                    <div className="btnbox">
                        <button type="submit" id="next3" className="loginbutton">Submit</button>
                    </div>
                </form>}
                {this.state.page === 1 && <div className="lp-typage">
                    <div>
                        <div className="btnbox">
                            <div className="lp-ty" style={{ marginTop: '50px' }}>Your account has been created!</div>
                            <div className="lp-ty" style={{ marginBottom: '50px' }}>Thank You For Being a Part of Blood4Needy!</div>
                            <button type="button" id="actlog" className="loginbutton"><a href="/request" style={{ fontSize: '15px', color: 'white' }}>Raise a Request</a></button>
                            <button type="button" id="reqblood" className="loginbutton"
                                style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}><a href="/feed" style={{ fontSize: '15px', color: 'black' }}>Live Feed</a></button>
                        </div><br /><br /><br /><br /><br />
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => { dispatch({ type: 'AUTHENTICATE_USER', userdata: user }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)