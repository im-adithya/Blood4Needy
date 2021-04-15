import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import './volunteer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            occupation: '',
            city: '',

            interest1: [],
            experience: '',

            reached: '',
            additionalinfo: '',

            currpage: this.props.user.volunteer ? 4 : 1,
            warning: ''
        }
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

    onChangePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    onChangeOccupation = (e) => {
        this.setState({
            occupation: e.target.value
        })
    }

    onChangeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    onChangeReason1 = (e) => {
        this.setState(prevState => {
            let arr = prevState.interest1
            if (arr.includes(e.target.value)) {
                arr.splice(arr.indexOf(e.target.value), 1)
            } else {
                arr.push(e.target.value)
            }
            return {
                interest1: arr
            }
        })
    }

    onChangeExperience = (e) => {
        this.setState({
            experience: e.target.value
        })
    }

    onChangeReached = (e) => {
        this.setState({
            reached: e.target.value
        })
    }

    onChangeAdditionalInfo = (e) => {
        this.setState({
            additionalinfo: e.target.value
        })
    }

    prevPage = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                currpage: --prevState.currpage,
                warning: ''
            }
        })
    }

    onSubmitVolpg1 = (e) => {
        e.preventDefault()
        this.setState({ currpage: 2 })
    }

    onSubmitVolpg2 = (e) => {
        e.preventDefault()
        if (this.state.interest1.length !== 0) {
            this.setState({ currpage: 3, warning: '' })
        } else {
            this.setState({ warning: 'Select your interest' })
        }
    }

    onSubmitVolpg3 = (e) => {
        e.preventDefault()

        const data = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            occupation: this.state.occupation,
            city: this.state.city,
            interest: this.state.interest1,
            experience: this.state.experience,
            reached: this.state.reached,
            additionalinfo: this.state.additionalinfo,
        }

        axios.post('/api/volunteer/add', data)
            .then(res => {
                console.log(res.data)
                axios.post('/api/user/volunteer/' + this.props.user._id, { volunteer: true })
                    .then(res => {
                        this.setState({ currpage: 4, warning: '' })
                        this.props.updateUser(res.data)
                    })
                    .catch(err => {
                        this.setState({ warning: 'An error occured, please try again!' })
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return (
            <div className="volformwrap" id="volunteerform">
                <h1>Fill this form</h1>
                <div className="form-page">
                    <div id="page1" className={"hand " + ((this.state.currpage > 1) ? 'active' : '')}>1</div>
                    <div id="page2" className={"hand " + ((this.state.currpage > 2) ? 'active' : '')}>2</div>
                    <div id="page3" className={"hand " + ((this.state.currpage > 3) ? 'active' : '')}>3</div>
                    <hr />
                </div>
                <div className="volform" style={{ display: this.state.currpage === 1 ? 'block' : 'none' }}>
                    <form onSubmit={this.onSubmitVolpg1}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Your Name" onChange={this.onChangeName} required /><br />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@domain.com" onChange={this.onChangeEmail} required /><br />
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" value='+91' style={{ width: '15%', textAlign: 'center' }} disabled />
                        <input
                            type="tel"
                            placeholder="10 Digit Mobile Number"
                            style={{ width: '85%' }}
                            pattern="[1-9]{1}[0-9]{9}"
                            name="phone"
                            id="phone"
                            onInput={this.handleInput}
                            onChange={this.onChangePhone}
                            required />
                        <label htmlFor="occupation">What Defines You Better?</label>
                        <select name="occupation" id="occupation" onChange={this.onChangeOccupation} required>
                            <option value="" defaultValue hidden>Select Here</option>
                            <option value="Student">Student</option>
                            <option value="Working Professional">Working Professional</option>
                            <option value="House Wife">House Wife</option>
                            <option value="Other">Other</option>
                        </select>
                        <label htmlFor="name">City in which you wish to volunteer</label>
                        <select name="loc" id="loc" onChange={this.onChangeCity} required>
                            <option value="" defaultValue hidden>Select Here</option>
                            <option value="Gwalior" >Gwalior</option>
                            <option value="Bhopal">Bhopal</option>
                            <option value="Indore">Indore</option>
                            <option value="Other">Other</option> {/*Special Case*/}
                        </select>
                        <button type="submit" className="volbtn">Next</button>
                    </form>
                </div>
                <div className="volform" style={{ display: this.state.currpage === 2 ? 'block' : 'none' }}>
                    <form onSubmit={this.onSubmitVolpg2}>
                        <label htmlFor="interest2">Why do you want to be a part of Blood4Needy?</label>
                        <div className="manyboxes">
                            <div>
                                <input type="checkbox" id="service" onChange={this.onChangeReason1} value="Social Service" />&nbsp;
                                <label htmlFor="service">Social Service</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="friends" onChange={this.onChangeReason1} value="Because of Friends" />&nbsp;
                                <label htmlFor="friends">Because my friends are also working here</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="resume" onChange={this.onChangeReason1} value="For Resume" />&nbsp;
                                <label htmlFor="resume">For my resume</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="speak" onChange={this.onChangeReason1} value="I like to speak" />&nbsp;
                                <label htmlFor="speak">I like to speak with people</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="nothing" onChange={this.onChangeReason1} value="Nothing Specific" />&nbsp;
                                <label htmlFor="nothing">Nothing Specific</label><br />
                            </div>
                        </div>
                        <label htmlFor="experience">Do you have prior experience in volunteering with any NGO or any other extra-curricular activities? <span className="colorize">(optional)</span></label>
                        <textarea type="text" name="experience" id="experience" rows="6" onChange={this.onChangeExperience} placeholder="Share your prior experience with us!" /><br />
                        <p className="warning">{this.state.warning}</p>
                        <div className="backnext">
                            <button onClick={this.prevPage} className="backbtn">Back</button>
                            <button type="submit" className="volbtn">Next</button>
                        </div>
                    </form>
                </div>
                <div className="volform" style={{ display: this.state.currpage === 3 ? 'block' : 'none' }}>
                    <form onSubmit={this.onSubmitVolpg3}>

                        <label htmlFor="reached">How did you get to know about Blood4Needy?</label>
                        <select name="reached" id="reached" onChange={this.onChangeReached} required>
                            <option value="" defaultValue hidden>Select Here</option>
                            <option value="Through Blood4Needy Member">Through Blood4Needy Member</option>
                            <option value="In an event/camp of Blood4Needy">In an event/camp of Blood4Needy</option>
                            <option value="Website">Website</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Linkedin">Linkedin</option>
                            <option value="Other">Other</option>
                        </select>
                        <label htmlFor="additionalinfo">Any additional information you would like to share about yourself? <span className="colorize">(optional)</span></label>
                        <textarea type="text" name="additionalinfo" id="additionalinfo" rows="6" onChange={this.onChangeAdditionalInfo} placeholder="Feel free to share it with us!" /><br />
                        <p className="warning">{this.state.warning}</p>
                        <div className="backnext">
                            <button onClick={this.prevPage} className="backbtn">Back</button>
                            <button type="submit" className="volbtn">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="volform" style={{ display: this.state.currpage === 4 ? 'block' : 'none' }}>
                    <div className=" volconfirm">
                        <h1>Thankyou!</h1>
                        <p>Your request has been sent successfully!</p>
                        <FontAwesomeIcon icon='heart' className="volheart" />
                    </div>
                </div>
            </div>
        )
    }
}

const WhatWeDo = () => {
    let reasons = ['Finding Life Saving Heroes', 'Helping us with tiny tasks', 'Organizing Blood donation camps', 'Fundraising for the cause', 'Helps us spreading awareness', 'Running Social Campaigns']
    return (
        <div className="volpg3" style={{ backgroundImage: "linear-gradient(#FDEAEA,#FDEAEA)" }}>
            <h1>What We Do!</h1>
            <p>Through each of our activities we make an impact. Our mission is simple - to save lives.<br /> Being a volunteer with Blood4Needy, means you will do a wide variety of activities. Be it:</p>
            <div className="pg6wrapper">
                {reasons.map((reason, index) => (
                    <div className="reason" key={'reason' + (index + 1).toString()}>
                        <h3 className="reason-num">{index + 1}</h3>
                        <div className="reason-title">{reason}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

class Volunteer extends Component {
    componentDidMount() {
        document.getElementsByClassName('navbar-nav')[0].scrollLeft = 400
    }
    scrolltoform = () => {
        document.getElementById('volunteerform').scrollIntoView()
    }
    render() {
        return (
            this.props.auth ? (<div className="volunteer">
                <div className="volpg1">
                    <h1>Volunteer with Us</h1>
                    <br /><br /><br /><br />
                    <p>We depend on volunteers! Volunteers make up 96% of our total workforce and carry on our humanitarian work.</p>
                    <br /><br />
                    <button onClick={this.scrolltoform}>Join Us</button>
                </div>

                <div className="fullheight volpg2">
                    <h1><span className="colorize" style={{ fontSize: 'inherit' }}>"Your Time and Talent can literally</span> save someone's lives<span className="colorize" style={{ fontSize: 'inherit' }}>."</span></h1><br />
                    <button className="signout" onClick={this.scrolltoform}>I'm ready to volunteer</button>
                </div>

                <WhatWeDo />
                <div>
                    <Form user={this.props.user} updateUser={this.props.updateUser} />
                </div>

                <div className="fullheight volpg5" style={{ backgroundImage: "linear-gradient(#FDEAEA,#FDEAEA)" }}>
                    <h1>Our work is only possible <span className="colorize" style={{ fontSize: 'inherit' }}>because of people like you</span></h1>
                    <Carousel className="pg7wrapper" indicators={false}>
                        <Carousel.Item interval={1200}>
                            <div className="testimonial"></div>
                        </Carousel.Item>
                        <Carousel.Item interval={1200}>
                            <div className="testimonial"></div>
                        </Carousel.Item>
                        <Carousel.Item interval={1200}>
                            <div className="testimonial"></div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>) :
                <Redirect to={{ pathname: '/login', state: { from: "volunteer" } }} />
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
        updateUser: (user) => { dispatch({ type: 'UPDATE_USER', userdata: user }) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Volunteer)