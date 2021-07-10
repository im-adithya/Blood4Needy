import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from "react-helmet";
import axios from 'axios';
//import { connect } from 'react-redux';
import Confetti from 'react-confetti'
import generateCerti from "../certiGenerator";
import './donations.css';
import qr from '../assets/qr.jpg';
import logo from '../assets/logodark.png';
import gold from '../assets/gold.png';
import silver from '../assets/silver.png';
import bronze from '../assets/bronze.png';
import loader from '../assets/loader.gif';
import loaderw from '../assets/loader-white.gif';

class Donations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            name: '',
            amount: 0,
            received: 0,
            up: 0, //initialize to 0
            down: 0,
            loaded: false,
            invalid: false,
            apd: 350, //amount per donation
            toploaded: false,
            topdonors: [],
            donatenow: false,
        }
    }

    componentDidMount = () => {
        let id = "";
        try {
            id = new URLSearchParams(this.props.location.search).get("id");
        } catch (error) {
            this.setState({ invalid: true, loaded: true, amount: '--' })
        }
        const { innerWidth: width } = window;

        axios.get('/api/donations/id/' + id)
            .then(res => {
                const phone = res.data.phone;
                const name = res.data.name;
                const amount = res.data.amount;
                axios.get('/api/request/donations/' + res.data.date)
                    .then(res => {
                        const received = res.data;
                        const down = Math.floor(amount / this.state.apd);
                        const up = (received > down) ? down : received;
                        this.setState({ phone, name, amount, received, down, up, loaded: true })
                        this.setState({ width: this.divRef2.clientWidth-5 , height: this.divRef1.clientHeight + this.divRef2.clientHeight + this.divRef3.clientHeight })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                this.setState({ invalid: true, loaded: true, amount: '--' })
                console.log(err)
            })
        axios.get('/api/donations/top')
            .then(res => {
                this.setState({ topdonors: res.data, toploaded: true });
            })
            .catch(err => {
                console.log(err);
            })
    }

    whatsapp = () => {
        let message1 = `https://api.whatsapp.com/send?&text=Hey! I contributed to Blood4Needy to help them save ${this.state.down} lives. Visit blood4needy.com/donations to donate and receive your certificate as well!`;
        let message2 = `https://api.whatsapp.com/send?&text=Hey! Do you know? We can contribute to Blood4Needy and receive certificates for helping the needy! Visit blood4needy.com/donations now!`
        let link = (this.state.invalid ? message2 : message1);
        window.location = link;
    }

    certificate = () => {
        if (this.state.loaded) {
            let now = new Date()
            generateCerti(this.state.name, now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear())
        }
    }

    render() {
        return (
            <div className="donations">
                <Helmet>
                    <meta name="description" content="Signup to donate blood or plasma to people in need!"></meta>
                    <title>{this.state.invalid ? "Donations" : "Thank you, " + this.state.name}</title>
                </Helmet>
                {/*use loading extensively and properly*/}
                {this.state.loaded && !!this.state.up && (this.state.up === this.state.down) && <Confetti
                    width={this.state.width}
                    height={this.state.height}
                />}
                <div className="donations-header" ref={element => this.divRef1 = element}>
                    <a href="/">
                        <img src={logo} alt="Blood4Needy" width='80' />
                    </a>
                </div>
                <div className="donations-wrapper" ref={element => this.divRef2 = element}>
                    <div className="d-cover">
                        {!this.state.loaded && <img src={loaderw} alt="loading-spinner" width={60} />}
                        {this.state.invalid && <h2>Help us save lives!<br /> Donate Now <FontAwesomeIcon icon='heart' className="heart" /></h2>}
                        {!this.state.invalid && this.state.loaded && <h2>Thank you for your<br /> contribution,<br /> {this.state.name} <FontAwesomeIcon icon='heart' className="heart" /></h2>}
                    </div>
                    <div className="d-detail-wrapper">
                        <div className="d-details">
                            <div className="d-amount">
                                <div>Amount Donated:</div>
                                {this.state.loaded && <div className="colorize">{'₹ ' + this.state.amount}</div>}
                                {!this.state.loaded && <img src={loader} alt="loading-spinner" width={30} />}
                            </div>
                            <br />
                            <div className="d-message">
                                We helped
                                {this.state.loaded && <span className="bold"> {this.state.up}/{this.state.down} </span>}
                                {!this.state.loaded && <img src={loader} alt="loading-spinner" width={30} />}
                                people till now with your help.
                                {this.state.invalid && <div className="d-message">
                                    Donate and help us save lives!
                                </div>}
                            </div>
                            <div className="thermometer">
                                <div className="thermofit" style={{ width: this.state.up * 100 / this.state.down + '%' }}></div>
                            </div>
                            <br />
                            <div className="d-up">
                                <div>Requests Fullfilled:</div>
                                {this.state.loaded && <div className="colorize">{this.state.up}</div>}
                                {!this.state.loaded && <img src={loader} alt="loading-spinner" width={20} />}
                            </div>
                            <div className="d-down">
                                <div>Requests Left:</div>
                                {this.state.loaded && <div className="colorize">{this.state.down - this.state.up}</div>}
                                {!this.state.loaded && <img src={loader} alt="loading-spinner" width={20} />}
                            </div>
                            <div className="d-buttons">
                                <button onClick={this.whatsapp}>
                                    {/*"https://api.whatsapp.com/send?phone=" + "919652726340" + "&text="" + "Hey how are you!" */}
                                    <div><FontAwesomeIcon icon="share-alt" /></div>
                                    <div>Spread the Word</div>
                                </button>
                                {!this.state.invalid && <button onClick={this.certificate}>
                                    <div><FontAwesomeIcon icon="file-download" /></div>
                                    <div>Download Certificate</div>
                                </button>}
                                {this.state.invalid && <button onClick={() => { this.setState({ donatenow: true }) }}>
                                    <div><FontAwesomeIcon icon="donate" /></div>
                                    <div>Donate Now</div>
                                </button>}
                                {this.state.donatenow && <div className="qr">
                                    <FontAwesomeIcon icon="times" className="qr-cross" onClick={() => { this.setState({ donatenow: false }) }} />
                                    <img src={qr} alt="QR" width={175} />
                                    <br />
                                    <p className="qr-upi">abcdefg@oksbi</p>
                                    <p className="qr-title">Blood4Needy</p>
                                    <br />
                                    <p className="qr-scan">Scan the QR code to pay</p>
                                </div>}
                            </div>
                        </div>

                        <div className="d-leaderboard">
                            <div className="lb-header">Top Donors</div>
                            <div className="lb-donors">
                                {!this.state.toploaded && <img src={loader} alt="loading-spinner" width={60} />}
                                {this.state.toploaded && this.state.topdonors.map((info, index) => (
                                    <div className='lb-donor' key={'donor' + (index + 1).toString()}>
                                        <div className='lb-donor-details'>
                                            <img src={index === 0 ? gold : (index === 1 ? silver : bronze)} alt="medal" width='30' />
                                            <div>{info.name}</div>
                                        </div>
                                        <div className="bold">{'₹ ' + info.amount}</div>
                                    </div>
                                ))}
                                {!this.state.toploaded && (this.state.topdonors.length === 3) && <div>
                                    No donors yet. Donate now to top the list :)
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="donations-footer" ref={element => this.divRef3 = element}>
                    <div className="footer-2">
                        <hr />
                        <br />
                        <div className="footer-2-1">
                            Blood4Needy NGO<br />
                            Lend2Mend Foundation{/*<br />
                        Dal Bazaar, Gwalior<br />
                        Madhya Pradesh - 474001*/}
                        </div>

                        <div className="footer-2-2">
                            <div>Contact us on bloodrequests@blood4needy.com</div>
                            <div style={{ marginTop: '25px' }}>Find us on:</div>
                            <div className="socialicons">
                                <a href="https://b-m.facebook.com/Blood4Needy/"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
                                <a href="https://www.instagram.com/blood4needy_ngo"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
                                <a href="https://twitter.com/blood4_needy"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
                                <a href="http://www.linkedin.com"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>
                            </div>
                        </div>

                        <div className="footer-2-3">
                            <div className="copyright" style={{ marginTop: '25px' }}>&copy; 2020-2021 Blood4Needy. All Rights Reserved.</div>
                            <div className="builtin">Built with <FontAwesomeIcon icon='heart' className="colorize" /> in India</div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

//This can be unnnecessary
/*
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
*/

//export default connect(mapStateToProps, mapDispatchToProps)(Donations)
export default (Donations)