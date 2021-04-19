import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import axios from 'axios';
import AOS from 'aos';
import "aos/dist/aos.css";
import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './home.css';
import arrow from '../arrow.png'
import home1 from '../assets/home-1.png'
import home3 from '../assets/home-3.png'
import home4 from '../assets/home-4.png'
import home5 from '../assets/home-5.png'
import home6 from '../assets/home-6.png'
import home7 from '../assets/home-7.png'
import home8 from '../assets/home-8.png'
import home11 from '../assets/home-11.png'

const PageOne = () => {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <div
                        className="w-100 fullheight pg1"
                        style={{ backgroundImage: `url(${home1})`, backgroundColor: 'white' }}
                    >
                        <h1>Welcome to<br /> Blood4Needy</h1><br />
                        <p>Connecting Blood donors <br />had never been much easier!</p><br />
                        <button className="button1"><Link to='/donors'>Find Blood</Link></button>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        className="w-100 fullheight pg1"
                        style={{ backgroundImage: `url(${home1})` }}
                    >
                        <h1>Welcome to<br /> Blood4Needy</h1><br />
                        <p>Connecting Blood donors <br />had never been much easier!</p><br />
                        <button className="button1"><Link to='/donors'>Find Blood</Link></button>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        className="w-100 fullheight pg1"
                        style={{ backgroundImage: `url(${home1})` }}
                    >
                        <h1>Welcome to<br /> Blood4Needy</h1><br />
                        <p>Connecting Blood donors <br />had never been much easier!</p><br />
                        <button className="button1"><Link to='/donors'>Find Blood</Link></button>
                    </div>
                </Carousel.Item>
            </Carousel >
            <div className="chevron"></div>
            <div className="chevron"></div>
            <div className="chevron"></div>
        </div>
    )
}

const PageTwo = () => {
    return (
        <div
            className="d-block w-100 fullheight pg2"
            style={{ backgroundImage: "linear-gradient(#FDEAEA,#FDEAEA)" }}
        >
            <h3>According to WHO</h3><br />
            <h1>"India runs short of <span className="emphasize">2,000,000<br /></span> units of blood every year."</h1><br />
            <p>Every two seconds someone needs blood.<br />More than 38,000 blood donations are needed every day.</p><br />
            <button className="button1"><Link to='/donate'>Donate Blood</Link></button>
        </div>
    )
}

const PageThree = () => {
    return (
        <div
            className="d-block w-100 fullheight pg3"
        >
            <h2>What Does <span className="emphasize">Blood4Needy</span> Do?</h2>
            <br />
            <p>We Connect Blood Donors with the people who are
                    in need of blood anytime, anywhere in the world.<br />
                    We Connect Blood Donors with the people who are
                    in need of blood anytime, anywhere in the world.<br />
            </p>
            <br />
            <Link to="/about"><span style={{ fontSize: '20px', color: '#F42929' }}>Click here</span> to know more about us</Link>
        </div>
    )
}

const PageFour = () => {
    return (
        <div className="fullheight pg4">
            <div data-aos="fade-up">
                <div className="pg4text">
                    <h2>Request Blood</h2>
                    <h4>NEED BLOOD FOR YOURSELF <br />OR SOMEONE YOU KNOW?</h4>
                    <button className="button1" ><Link to='/request'>Find Blood</Link></button>
                </div>
                <div className="pg4img">
                    <img src={home3} alt='request' />
                </div>
            </div>
            <div data-aos="fade-up">
                <div className="pg4text">
                    <h2>Become a Volunteer</h2>
                    <h4>VOLUNTEER WITH US AND <br />HELP THE SOCIETY</h4>
                    <button className="button1"><Link to='/volunteer'>Sign Up</Link></button>
                </div>
                <div className="pg4img">
                    <img src={home4} alt='donate' />
                </div>
            </div>
        </div>
    )
}

class PageFive extends Component {
    constructor(props) {
        super(props);
        this.changeState = this.changeState.bind(this)

        this.state = {
            worksfor: 'requests'
        }
    }
    changeState(e) {
        this.setState({ worksfor: e.target.value })
    }

    render() {
        let steps = (this.state.worksfor === 'donors') ?
            ['Complete your profile and start getting request.', 'Contact the blood receiver you want to help.', 'Congrats! Receive a certificate for your nice gesture.'] :
            ['Raise a Blood request by filling up the form.', 'Search from the list of Blood Donors in your location.', 'Connect & get blood near your hospital.']

        let buttonClass = ['disabledbutton', 'activebutton']

        if (this.state.worksfor === 'requests') {
            buttonClass = ['activebutton', 'disabledbutton']
        }

        return (
            <div className="fullheight pg5">
                <div className="pg5-1wrapper">
                    <h1 style={{ color: 'white' }}>How It Works?</h1>
                    <br />
                    <button onClick={this.changeState} className={buttonClass[0] + ' button2'} value='requests'>For Blood Requests</button>
                    <button onClick={this.changeState} className={buttonClass[1] + ' button2'} value='donors'>For Blood Donors</button>
                </div>
                <div className="pg5-2wrapper" data-aos="fade-up">
                    {steps.map((info, index) => (
                        <div className='stepbox lift' key={'step' + (index + 1).toString()}>
                            <div className='stepbox-header'>
                                <span>STEP {index + 1}</span>
                                <img src={arrow} alt='arrow' width='70px' height='10px' style={{ marginTop: '10px' }} />
                            </div>
                            <p>{info}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const PageSix = () => {
    let reasons = ['No Fees/No Commission', 'Live Update Feature', 'Connect directly with Blood donors', 'Time Saving', 'Map View', 'And many more...']
    return (
        <div className="pg6">
            <h1>Why Blood4Needy?</h1>
            <div className="pg6wrapper">
                {reasons.map((reason, index) => (
                    <div className="reason" key={'reason' + (index + 1).toString()} data-aos='fade-up'>
                        <h3 className="reason-num">{index + 1}</h3>
                        <div className="reason-title">{reason}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

class PageSeven extends Component {
    constructor(props) {
        super(props);
        this.getTestimonials = this.getTestimonials.bind(this)

        this.state = {
            testimonials: [{ name: 'Neha Singh', feedback: "I am really thankful to blood4needy for connecting us with Ajay (Blood donor), who saved our child life being an stranger" },
            { name: 'Ankush Sharma', feedback: "Can't thank Blood4Needy enough for saving my life! Gave blood in the right time." },
            { name: 'Bhanu Kumar', feedback: "Thank you for saving my child's life! Blood4Needy is the best. Thank you very much!!" }],
        }
    }

    getTestimonials() { /*TODO: USE COMPONENT DID MOUNT HERE */
        axios.get('/api/user/testimonials')
            .then(res => {
                this.setState({ testimonials: res })
            })
            .catch(err => { console.log(err) });
    }

    render() {
        return (
            <div
                className="fullheight pg7"
                style={{ backgroundImage: "linear-gradient(#FDEAEA,#FDEAEA)" }}
            >
                <h1>What People Say!</h1>
                <Carousel className="pg7wrapper" indicators={false}>
                    {this.state.testimonials.map((user, index) => (
                        <Carousel.Item interval={1200} key={'testimonial' + (index + 1).toString()}>
                            <div className="testimonial">
                                <h3 className="testimonial-name">{user.name}</h3>
                                <p className="testimonial-feedback">{user.feedback}</p>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        )
    }
}

const PageEight = () => {
    return (
        <div
            className="w-100 fullheight pg8"
            style={{ backgroundImage: `url(${home6})` }}
        >
            <h1 style={{ color: 'white' }}>The volume of blood you donate is replaced in your body in 24 hours.</h1>
        </div>
    )
}

const PageNine = () => {
    return (
        <div className="fullheight pg9 ">
            <h1>Make A Difference</h1>
            <p>with Blood4Needy</p>
            <div className="pg9wrapper">
                <div className="pg9-1">
                    <div data-aos="fade-up"
                        data-aos-duration="150"
                        data-aos-delay="100"
                        className="pg9-1-1"
                        style={{ backgroundImage: `url(${home5})` }}
                    />
                    <div className="pg9-1-1"
                        style={{ backgroundColor: '#FAD0D2' }}
                        data-aos="fade-down"
                        data-aos-duration="300"
                        data-aos-delay="250"
                    >
                        <h3>Host A Blood Camp</h3>
                        <p>Host a blood camp within your<br /> community and become our partner.</p>
                        <Link to='/volunteer' style={{ fontWeight: 'bold' }}>Learn More</Link>
                    </div>
                </div>
                <div className="pg9-2">
                    <div className="pg9-1-2"
                        style={{ backgroundColor: '#D6ECD9' }}
                        data-aos="fade-left"
                        data-aos-duration="300"
                        data-aos-delay="175"
                    >
                        <h3>Volunteer with us</h3>
                        <p>Volunteer with us and help the society</p>
                        <Link to='/volunteer' style={{ fontWeight: 'bold' }}>Learn More</Link>
                    </div>
                    <div
                        className="pg9-1-2 pg9-1-img"
                        style={{ backgroundImage: `url(${home8})` }}
                        data-aos="fade-right"
                        data-aos-duration="75"
                        data-aos-delay="100"
                    >
                    </div>
                    <div
                        className="pg9-1-2"
                        style={{ backgroundImage: `url(${home7})` }}
                        data-aos="fade-left"
                        data-aos-duration="75"
                        data-aos-delay="100"
                    >
                    </div>
                    <div className="pg9-1-2"
                        style={{ backgroundColor: '#E3D1E6' }}
                        data-aos="fade-right"
                        data-aos-duration="300"
                        data-aos-delay="175"
                    >
                        <h3>Support us financialy</h3>
                        <p>Other ways you can help us is by sponsoring us.</p>
                        <Link to='/donate' style={{ fontWeight: 'bold' }}>Learn More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

class PageTen extends Component {
    constructor(props) {
        super(props);
        this.getBlogs = this.getBlogs.bind(this)

        this.state = {
            blogs: [{ title: '10 Things to remember before donating blood.', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.", link: 'https://www.google.com' },
            { title: 'Upcoming Blood donation camps in Gwalior.', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.", link: 'https://www.facebook.com' },
            { title: 'Tips to increase blood in human body.', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.", link: 'https://www.ebay.com' }],
        }
    }

    getBlogs() { //TODO: USE COMPONENT DID MOUNT
        axios.get('/api/user/blogs') //TODO: LIMIT BLOGS TO THREE
            .then(res => {
                this.setState({ blogs: res })
            })
            .catch(err => { console.log(err) });
    }

    render() {
        return (
            <div className="fullheight pg10">
                <h1 style={{ color: 'white' }}>Our Latest Blogs!</h1>
                <div className="pg10wrapper" data-aos='fade-up'>
                    {this.state.blogs.map((blog, index) => (
                        <a href={blog.link} key={'pg10-' + index}>
                            <div className='blog lift' key={'blog' + (index + 1).toString()}>
                                <p className="blog-title">{blog.title}</p>
                                <p className="blog-content">{blog.content.substring(0, 100)}...</p>
                                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Read More</div>
                            </div>
                        </a>
                    ))}
                </div>
                <a href='https://blog.blood4needy.com/' className='moreblogs'>
                    <button className="button3">
                        More Blogs
                    </button>
                </a>
            </div >
        )
    }
}

class PageEleven extends Component {
    constructor(props) {
        super(props);
        this.toggleFAQs = this.toggleFAQs.bind(this)

        this.state = {
            active: 'u'
        }
    }

    toggleFAQs(e) {
        if (this.state.active === e.target.value) {
            this.setState({ active: 'u' })
        } else {
            this.setState({ active: e.target.value })
        }
    }

    render() {
        return (
            <div className="pg11">
                <h1>Frequently Asked Questions</h1>
                <div className="pg11wrapper">
                    <button className="faqbox" onClick={this.toggleFAQs} value='1' style={{ borderTop: '2px solid rgb(131, 131, 131)' }}>How to create an account<FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={this.state.active === '1' ? 'minus' : 'plus'} /></button>
                    {this.state.active === '1' && <div className="faqhidden">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>}

                    <button className="faqbox" onClick={this.toggleFAQs} value='2'>Eligibility to became a blood donor<FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={this.state.active === '2' ? 'minus' : 'plus'} /></button>
                    {this.state.active === '2' && <div className="faqhidden">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>}

                    <button className="faqbox" onClick={this.toggleFAQs} value='3'>How to make a blood request?<FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={this.state.active === '3' ? 'minus' : 'plus'} /></button>
                    {this.state.active === '3' && <div className="faqhidden">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>}

                    <button className="faqbox" onClick={this.toggleFAQs} value='4'>How to host blood camp?<FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={this.state.active === '4' ? 'minus' : 'plus'} /></button>
                    {this.state.active === '4' && <div className="faqhidden">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>}

                    <button className="faqbox" onClick={this.toggleFAQs} value='5'>What are the types of Blood Groups?<FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={this.state.active === '5' ? 'minus' : 'plus'} /></button>
                    {this.state.active === '5' && <div className="faqhidden">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>}
                </div>
            </div>
        )
    }
}

const PageTwelve = () => {
    return (
        <div className="w-100 pg12bgparent fullheight">
            <div className="pg12wrapper">
                <h1 style={{ textAlign: 'center', fontSize: '66px', fontWeight: 'bold', color: 'white', marginBottom: '50px' }}>There is NO alternative<br /> to human blood.</h1>
                <button className="button1 heartwrap"><Link to='/donate'>Donate Now &nbsp; <FontAwesomeIcon icon='heart' className="heart" /></Link></button>
            </div>
            <div className="pg12 pg12bg" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url(${home11})` }}></div>
        </div>
    )
}

export const LoginBG = class HomeWrapper extends Component {
    componentDidMount() {
        AOS.init({
            duration: 1000
        });
    }

    render() {
        return (
            <div className="home container">
                <Helmet>
                    <meta name="description" content="Blood4Needy is an online NGO, We connect blood donors with the blood receivers through an integrated online platform. We bridge the gap between Needy and Donor through technology and Increase social responsibility in citizens by providing them a transparent platform to donate blood. Blood4Needy’s mission is to eradicate the problem of blood shortage in India by becoming the largest network of blood donors across the country. Our motto is that no one dies due to blood shortage."></meta>
                    <title>Home • Blood4Needy</title>
                </Helmet>
                <PageOne />
                <PageTwo />
                <PageThree />
                <PageFour />
                <PageFive />
                <PageSix />
                <PageSeven />
                <PageEight />
                <PageNine />
                <PageTen />
                <PageEleven />
                <PageTwelve />
            </div>
        )
    }
}

class Home extends Component {
    render() {
        return (
            this.props.auth ? <LoginBG /> : <Redirect to={{ pathname: '/login', state: { from: "home" } }} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Home)