import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';
import './aboutus.css'
import paper from '../assets/paper.png'
import about1 from '../assets/about-1.png'
import about2 from '../assets/about-2.png'
import about3 from '../assets/about-3.jpg'
import about4 from '../assets/about-4.JPG'
import about5 from '../assets/about-5.JPG'
import about6 from '../assets/about-6.JPG'
import about7 from '../assets/about-7.JPG'
import about8 from '../assets/about-8.JPG'
import about9 from '../assets/about-9.JPG'


export default class About extends Component {
    componentDidMount() {
        document.getElementsByClassName('navbar-nav')[0].scrollLeft = 400
    }
    render() {
        return (
            <div className="aboutus">
                <Helmet>
                    <meta name="description" content="Blood4Needy’s mission is to eradicate the problem of blood shortage in India by establishing the largest network of blood donors across the country. Our motto is that no one dies due to blood shortage."></meta>
                    <title>About</title>
                </Helmet>
                <div className="aboutpg1">
                    <h1>About Us</h1><br /><br />
                    <p>Blood4Needy is an online NGO, We connect blood donors with the blood receivers through an integrated online platform</p>
                </div>
                <div className="aboutpg2" style={{ backgroundImage: 'linear-gradient(rgb(253, 234, 234), rgb(253, 234, 234))' }}>
                    <h1><span style={{ color: '#F42929', fontSize: 'inherit' }}>Blood4Needy</span> in numbers</h1>
                    <div className="innumbers">
                        <div className="innumber">
                            <h1><CountUp start={0} end={247} delay={1} duration={2} />+</h1>
                            <p>Blood Requests<br />Raised</p>
                        </div>
                        <div className="innumber">
                            <h1><CountUp start={0} end={700} delay={1} duration={2} />+</h1>
                            <p>Registered<br />Blood Donors</p>
                        </div>
                        <div className="innumber">
                            <h1><CountUp start={0} end={360} delay={1} duration={2} />+</h1>
                            <p>Blood Units<br />Donated</p>
                        </div>
                        <div className="innumber">
                            <h1><CountUp start={0} end={5000} delay={1} duration={2} />+</h1>
                            <p>People Trust on<br />Social Media</p>
                        </div>
                    </div>
                </div>
                <div className="aboutpg3">
                    <div className="aboutpg3-1">
                        <h1 style={{ color: '#b21e2e' }}>Vision:</h1><br />
                        <p>Bridge the gap between Needy and Donor through technology and Increase social responsibility in citizens by providing them a transparent platform to donate blood.</p>
                    </div>
                    <div className="aboutpg3-2 hehe" style={{ backgroundImage: `url(${about1})` }}></div>
                </div>
                <div className="aboutpg3 aboutpg3mob">
                    <div className="aboutpg3-2" style={{ backgroundImage: `url(${about2})` }}></div>
                    <div className="aboutpg3-1">
                        <h1 style={{ color: '#b21e2e' }}>Mission:</h1><br />
                        <p>Blood4Needy’s mission is to eradicate the problem of blood shortage in India by establishing the largest network of blood donors across the country. Our motto is that no one dies due to blood shortage.</p>
                    </div>
                </div>
                <div className="aboutpg4">
                    <h1>"We connect people who need<br /> blood to people who donate blood"</h1>
                </div>
                <div className="aboutpg5">
                    <div className="bgpaper" style={{ backgroundImage: `url(${paper})` }}>
                        <h1>How It All <span style={{ color: '#F42929', fontSize: 'inherit' }}>Started</span></h1><br />
                        <p>Hi, My name is Lakshya Madhav Goyal and I am the founder and CEO of Blood4Needy- an initiative under Lend2Mend foundation.<br /><br />
                    This all started when I was just 10 years old. My father organized a blood donation camp and recorded highest ever units of blood donations in a single day which was massive 1000 units of donation.<br /><br />
                    Soon after the camp my father started getting calls almost daily from regular working hours to late night or early mornings.<br /><br />
                    This incident really shook me and again I saw the rising need for the blood as the Covid-19 pandemic hit the world. The donors had just vanished. And blood is becoming scarce which also gave me another reason to think that what if another pandemic happens in which blood loss takes place?<br /><br />
                    I instantly saw this uprising need and I chose to build an online platform so that the impact is not just limited to Gwalior or Madhya Pradesh or even India, my aim is to scale it to even higher heights by making it the largest network of blood donors - a step towards a bright future where no one dies dueto lack of blood.<br /><br />
                    Today, We have addressed over 247+ blood requests with a network of 700+ blood donors and with the trust of over 5000 people and that too by bootstrapping it, I have only realized how big the issue is and also the huge impact that Blood4Needy can create.</p><br /><br />
                        <div>
                            "Human service is by far the mother of all religions, the kindest of all doings and the Gita of all values"
                    </div>
                        <p className="owner">- Lakshya Goyal <FontAwesomeIcon icon='heart' className="heart colorize" /></p>
                    </div>
                </div>
                <div className="fullheight aboutpg6" style={{ backgroundImage: "linear-gradient(#FDEAEA,#FDEAEA)" }}>
                    <h1 style={{ color: 'black' }}>Join Us as a <span className="colorize" style={{ fontSize: 'inherit' }}>Volunteer</span></h1>
                    <Carousel indicators={false}>
                        <Carousel.Item interval={1200}>
                            <div className="testimonial sliderimg" style={{ backgroundImage: `url(${about4})` }}></div>
                        </Carousel.Item>
                        <Carousel.Item interval={1200}>
                            <div className="testimonial sliderimg" style={{ backgroundImage: `url(${about5})` }}></div>
                        </Carousel.Item>
                        <Carousel.Item interval={1200}>
                            <div className="testimonial sliderimg" style={{ backgroundImage: `url(${about6})` }}></div>
                        </Carousel.Item>
                        <Carousel.Item interval={1200}>
                            <div className="testimonial sliderimg" style={{ backgroundImage: `url(${about7})` }}></div>
                        </Carousel.Item>
                        <Carousel.Item interval={1200}>
                            <div className="testimonial sliderimg" style={{ backgroundImage: `url(${about8})` }}></div>
                        </Carousel.Item>
                        <Carousel.Item interval={1200}>
                            <div className="testimonial sliderimg" style={{ backgroundImage: `url(${about9})` }}></div>
                        </Carousel.Item>
                    </Carousel>
                    <Link to="/volunteer"><button className="signout aboutvol">I'm Ready to Volunteer</button></Link>
                </div>
                <div className="aboutpg6">
                    <h1>Support Us</h1>
                    <div className="supportus">
                        <div className="supportimg" style={{ backgroundImage: `url(${about3})` }}></div>
                        <p className="supportcnt">You can help us build a country where people can get blood whenever they require and that too FREE. Make your donation today and support Blood4Needy's conservation solutions.</p>
                    </div>
                    <Link to="/feed"><button className="supportbtn" >Donate Now <FontAwesomeIcon icon='heart' className="colorize heart" /></button></Link>
                </div>
            </div>
        )
    }
}