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
                        <img src={logo} className="footlogo" alt="Blood4Needy" width='100' /><br/>
                        <div>XYZ builds platforms & investment products to invest better in Indian equities. A smallcase is a basket of stocks/ETFs weighted intelligently to reflect an idea A smallcase is a basket of stocks/ETFs weighted intelligently to reflect an idea</div>
                        {/*<form>
                            <input type="email" placeholder="Email Address" />
                            <button type="submit">Subscribe</button>
                        </form>*/}
                    </div>
                    <div className="footer-1-2 sidefooter">
                        <h6>Company</h6>
                        <div><Link to="/about-us">About Us</Link></div>
                        <div><Link to="/contact">Contact Us</Link></div>
                    </div>
                    <div className="footer-1-3 sidefooter">
                        <h6>Navigation</h6>
                        <div><Link to="/">Home</Link></div>
                        <div><Link to="/donors">Blood Donors</Link></div>
                        <div><Link to="/volunteer">Volunteer</Link></div>
                        <div><Link to="/blog">Blog</Link></div>
                    </div>
                </div>
                <hr />
                <br/>
                <div className="footer-2">
                    <div className="footer-2-1">
                        Blood4Needy NGO<br />
                        #51, 3rd Floor, Le Parc Richmonde,<br />
                        Richmond Road, Shanthala Nagar,<br />
                        Richmond Town, Bangalore - 560025
                    </div>

                    <div className="footer-2-2">
                        <div>Contact us on help@blood4needy.com</div>
                        <div>Find us on:</div>
                        <div className="socialicons">
                            <a href="http://www.facebook.com"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
                            <a href="http://www.instagram.com"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
                            <a href="http://www.twitter.com"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
                            <a href="http://www.linkedin.com"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>
                        </div>
                    </div>

                    <div className="footer-2-3">
                        <div className="copyright">&copy; 2020-2021 Blood4Needy. All Rights Reserved.</div>
                        <div className="builtin">Built with <FontAwesomeIcon icon='heart' className="colorize"/> in India</div>
                    </div>
                </div>
            </div>
        )
    }
}