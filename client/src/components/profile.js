import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './profile.css';
import Autocomplete from 'react-google-autocomplete';
import Switch from "react-switch";
import male from '../assets/male-user.png';
import female from '../assets/female-user.png';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.setCurrentLocation = this.setCurrentLocation.bind(this);
        this.onChangeFeedback = this.onChangeFeedback.bind(this);
        this.onUpdateUser = this.onUpdateUser.bind(this);
        this.signOut = this.signOut.bind(this);

        this.state = {
            posavailable: false,

            name: this.props.user.name,
            updatedPhone: this.props.user.phone,
            updatedEmail: this.props.user.email,
            updatedAge: this.props.user.age,
            gender: this.props.user.gender,
            bloodgroup: this.props.user.bloodgroup,
            updatedAddress: this.props.user.address,
            updatedPos: this.props.user.pos,
            updatedFeedback: this.props.user.feedback,

            changed: false,
            warning: ''
        }
    }
    onChangePhone(e) {
        this.setState({
            updatedPhone: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            updatedEmail: e.target.value
        })
    }

    onChangeAge(e) {
        this.setState({
            updatedAge: parseInt(e.target.value)
        })
    }

    onChangeAddress(e) {
        this.setState({
            updatedAddress: e.target.value
        })
    }

    onChangeFeedback(e) {
        if (e.target.value === '') {
            this.setState({
                updatedFeedback: undefined
            })
        } else {
            this.setState({
                updatedFeedback: e.target.value
            })
        }
    }

    changeDetect() {
        let { phone, age, address, pos, email, feedback } = this.props.user
        let { updatedPhone, updatedAge, updatedAddress, updatedPos, updatedEmail, updatedFeedback } = this.state
        if (phone === updatedPhone && age === updatedAge && address === updatedAddress && pos.lat === updatedPos.lat && pos.lng === updatedPos.lng && email === updatedEmail && feedback === updatedFeedback) {
            return false
        } else {
            return true
        }
    }

    setCurrentLocation() {
        if (!this.state.posavailable && 'geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    updatedPos: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    posavailable: true
                });
            });
        } else {
            this.setState({ posavailable: false, updatedPos: this.props.user.pos })
        }
    }

    onUpdateUser(e) {
        e.preventDefault()

        const updatedUser = {
            name: this.state.name,
            phone: this.state.updatedPhone,
            email: this.state.updatedEmail,
            age: this.state.updatedAge,
            gender: this.state.gender,
            bloodgroup: this.state.bloodgroup,
            address: this.state.updatedAddress,
            pos: this.state.updatedPos,
            feedback: this.state.updatedFeedback,
        }
        axios.post('/api/user/update/' + this.props.user._id, updatedUser)
            .then(res => {
                this.setState({ warning: 'User Details Updated Successfully!', changed: false })
                setTimeout(function () {
                    this.setState({ warning: '' });
                }.bind(this), 5000);
                this.props.updateUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    signOut() {
        this.props.signoutUser({})
        window.location = '/'
    }

    render() {
        return (
            this.props.auth ? <div className="profile">
                <Helmet>
                    <meta name="description" content="See your blood donation stats and give us your valuable feedback here."></meta>
                    <title>Profile</title>
                </Helmet>
                <h1>Profile</h1>
                <div className="userprof">
                    <img src={this.state.gender === "male" ? male : female} alt="user" className="profileimg" width="200" />
                    <h2>{this.state.name} : {this.state.bloodgroup}</h2>
                    <p className="bold" style={{ marginBottom: '5px' }}>Joined {(new Date(this.props.user.createdAt)).toString().split(' ').splice(1, 3).join(' ')}</p>
                    <p className="bold">Last Updated {(new Date(this.props.user.updatedAt)).toString().split(' ').splice(1, 3).join(' ')}</p>
                    <form className="userdetails" onSubmit={this.onUpdateUser}>
                        <label htmlFor="phone">Phone Number</label>
                        <div>
                            <input type="tel" value='+91' style={{ width: '15%' }} disabled />
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                style={{ width: '85%' }}
                                pattern="[1-9]{1}[0-9]{9}"
                                name="phone"
                                id="phone"
                                value={this.state.updatedPhone}
                                onChange={this.onChangePhone}
                                required />
                        </div>
                        <label htmlFor="age">Age</label>
                        <input type="number" min="18" name="age" id="age" onChange={this.onChangeAge} value={this.state.updatedAge} required /><br />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={this.onChangeEmail} value={this.state.updatedEmail} required /><br />
                        <label htmlFor="address">Address</label>
                        <Autocomplete
                            id="address" name="address" onChange={this.onChangeAddress} value={this.state.updatedAddress}
                            apiKey={'AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us'}
                            onPlaceSelected={(place) => this.setState({ updatedAddress: place.formatted_address })}
                            types={['(cities)']}
                            componentRestrictions={{ country: "in" }}
                            required
                        />
                        <div className="currloc" style={{ justifyContent: 'space-between', alignItems: 'unset' }}>
                            <label htmlFor="address">Reset Location to Present</label>
                            <Switch onChange={this.setCurrentLocation} checked={this.state.posavailable} uncheckedIcon={false} onColor='#b21e2e' offColor='#bcbcbc' handleDiameter={16} boxShadow='0 0 2px 1px #a7a7a7' activeBoxShadow='0 0 2px 1px #b21e2e' width={30} height={15} checkedIcon={false} />
                        </div>
                        <label htmlFor="feedback">Feedback</label>
                        <textarea value={this.state.updatedFeedback ? this.state.updatedFeedback : ''} onChange={this.onChangeFeedback} placeholder="Please give us your valuable feedback!"></textarea>
                        <p className="colorize" style={{ textAlign: 'center' }}>{this.state.warning}</p>
                        <button type="submit" className={this.changeDetect() ? 'udbactive' : 'udbdisabled'} style={{ pointerEvents: this.changeDetect() ? '' : 'none' }}>Update</button>
                    </form>
                    <button className="signout" onClick={this.signOut}>Sign Out</button>
                </div>
            </div> :
                <Redirect to={{ pathname: '/login', state: { from: "request" } }} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user,
        requested: state.requested
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => { dispatch({ type: 'UPDATE_USER', userdata: user }) },
        signoutUser: () => { dispatch({ type: 'SIGNOUT_USER' }) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)