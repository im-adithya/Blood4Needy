import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from '../logodark.svg';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-1">
                    <div className="footer-1-1">
                        <img src={logo} className="footlogo" alt="Blood4Needy" width='100' /><br />
                        <div>Blood4Needy is an NGO that aims to tackle the problem of blood shortage through an online platform that aims to connect the donors witH receivers. Blood4Needy’s mission is to eradicate the problem of blood shortage in India by establishing the largest network of blood donors across the country.</div>
                        {/*<form>
                            <input type="email" placeholder="Email Address" />
                            <button type="submit">Subscribe</button>
                        </form>*/}
                    </div>
                    <div className="footer-1-2 sidefooter">
                        <h6>Company</h6>
                        <div><Link to="/about">About Us</Link></div>
                        <div><Link to="/contact">Contact Us</Link></div>
                    </div>
                    <div className="footer-1-3 sidefooter">
                        <h6>Navigation</h6>
                        <div><Link to="/">Home</Link></div>
                        <div><Link to="/blood">Blood Donors</Link></div>
                        <div><Link to="/plasma">Plasma Donors</Link></div>
                        <div><Link to="/request">Raise A Request</Link></div>
                        <div><Link to="/feed">Live Feed</Link></div>
                        <div><Link to="/volunteer">Volunteer</Link></div>
                        <div><a href="https://blog.blood4needy.com/">Blog</a></div>
                    </div>
                </div>
                <hr />
                <br />
                <div className="footer-2">
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
        )
    }
}