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
            graduation: '',
            org: '',

            city: '',
            interest1: [],
            experience: '',

            interest2: [],
            reached: '',
            contactname: '',
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

    onChangeGraduation = (e) => {
        this.setState({
            graduation: e.target.value
        })
    }

    onChangeOrg = (e) => {
        this.setState({
            org: e.target.value
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

    onChangeReason2 = (e) => {
        this.setState(prevState => {
            let arr = prevState.interest2
            if (arr.includes(e.target.value)) {
                arr.splice(arr.indexOf(e.target.value), 1)
            } else {
                arr.push(e.target.value)
            }
            return {
                interest2: arr
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

    onChangeContactname = (e) => {
        this.setState({
            contactname: e.target.value
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

        if (this.state.interest2.length !== 0) {
            axios.post('/api/user/volunteer/' + this.props.user._id, { volunteer: true })
                .then(res => {
                    this.setState({ currpage: 4, warning: '' })
                    this.props.updateUser(res.data)
                })
                .catch(err => {
                    this.setState({ warning: 'An error occured, please try again!' })
                    console.log(err)
                })
        } else {
            this.setState({ warning: 'Select why you want to join.' })
        }
    }

    render() {
        return (
            <div className="volformwrap">
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
                        <div className="volwrapbw" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ width: '55%', marginRight: '5%' }}>
                                <label htmlFor="occupation">Occupation</label>
                                <select name="occupation" id="occupation" onChange={this.onChangeOccupation} required>
                                    <option value="" defaultValue hidden>--</option>
                                    <option value="student">Student</option>
                                    <option value="wp">Working Professional</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div style={{ width: '45%' }}>
                                <label htmlFor="graduation">Year of Graduation</label>
                                <input type="number" min="1900" max="2200" name="graduation" id="graduation" placeholder="20xx" onChange={this.onChangeGraduation} /><br />
                            </div>
                        </div>
                        <label htmlFor="org">Organization</label>
                        <input type="text" name="org" id="org" onChange={this.onChangeOrg} placeholder="Workplace/Institute you are part of" required /><br />
                        <button type="submit" className="volbtn">Next</button>
                    </form>
                </div>
                <div className="volform" style={{ display: this.state.currpage === 2 ? 'block' : 'none' }}>
                    <form onSubmit={this.onSubmitVolpg2}>
                        <label htmlFor="name">City in which you wish to volunteer</label>
                        <select name="loc" id="loc" onChange={this.onChangeCity} required>
                            <option value="" defaultValue hidden>Select Here</option>
                            <option value="Gwalior" >Gwalior</option>
                            <option value="Bhopal">Bhopal</option>
                            <option value="Indore">Indore</option>
                            <option value="Other">Other</option> {/*Special Case*/}
                        </select>
                        <label htmlfor="interest1">Select your interest in Blood4Needy</label>
                        <div className="manyboxes">
                            <div>
                                <input type="checkbox" id="cityop" onChange={this.onChangeReason1} value="City Operation" />&nbsp;
                                <label htmlFor="cityop">City Operation (Camps, emergency helpline, awareness)</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="tech" onChange={this.onChangeReason1} value="Tech" />&nbsp;
                                <label htmlFor="tech">Tech (Website, CRM)</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="pr" onChange={this.onChangeReason1} value="PR" />&nbsp;
                                <label htmlFor="pr">PR (Digital marketing, fundraising)</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="creative" onChange={this.onChangeReason1} value="Creative" />&nbsp;
                                <label htmlFor="creative">Creative (Doodles, posters, video editing, content writing)</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="consulting" onChange={this.onChangeReason1} value="Consulting" />&nbsp;
                                <label htmlFor="consulting">Consulting (Organizing camps across India virtually)</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="nothingspecific" onChange={this.onChangeReason1} value="Nothing Specific" />&nbsp;
                                <label htmlFor="nothingspecific">Nothing Specific, I am up for any activity</label><br />
                            </div>
                        </div>
                        <label htmlFor="experience">Do you have prior experience in volunteering with any NGO or any other extra-curricular activities?</label>
                        <textarea type="text" name="experience" id="experience" rows="2" onChange={this.onChangeExperience} placeholder="Share your prior experience with us!" /><br />
                        <p className="warning">{this.state.warning}</p>
                        <div className="backnext">
                            <button onClick={this.prevPage} className="backbtn">Back</button>
                            <button type="submit" className="volbtn">Next</button>
                        </div>
                    </form>
                </div>
                <div className="volform" style={{ overflowY: 'scroll', display: this.state.currpage === 3 ? 'block' : 'none' }}>
                    <form onSubmit={this.onSubmitVolpg3}>
                        <label htmlfor="interest2">Why do you want to be a part of Blood4Needy</label>
                        <div className="manyboxes">
                            <div>
                                <input type="checkbox" id="service" onChange={this.onChangeReason2} value="service" />&nbsp;
                                <label htmlFor="service">Social service</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="friends" onChange={this.onChangeReason2} value="friends" />&nbsp;
                                <label htmlFor="friends">Because my friends are also working here</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="resume" onChange={this.onChangeReason2} value="resume" />&nbsp;
                                <label htmlFor="resume">For my resume</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="travel" onChange={this.onChangeReason2} value="travel" />&nbsp;
                                <label htmlFor="travel">I love to travel</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="speak" onChange={this.onChangeReason2} value="speak" />&nbsp;
                                <label htmlFor="speak">I like to speak with people</label><br />
                            </div>
                            <div>
                                <input type="checkbox" id="nothing" onChange={this.onChangeReason2} value="nothing" />&nbsp;
                                <label htmlFor="nothing">Nothing Specific</label><br />
                            </div>
                        </div>
                        <label htmlFor="reached">How did you get to know about Blood4Needy?</label>
                        <select name="reached" id="reached" onChange={this.onChangeReached} required>
                            <option value="" defaultValue hidden>Select Here</option>
                            <option value="member">Through Blood4Needy Member</option>
                            <option value="event">In an event/camp of Blood4Needy</option>
                            <option value="website">Website</option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="twitter">Twitter</option>
                            <option value="linkedin">Linkedin</option>
                            <option value="other">Other</option>
                        </select>
                        <label htmlFor="referralname">Do you have a personal contact in BloodConnect team? If Yes, please mention his/her name.</label>
                        <input type="text" name="referralname" id="referralname" placeholder="Personal Contact Name" onChange={this.onChangeContactName} /><br />
                        <label htmlFor="additionalinfo">Any additional information you would like to share about your application?</label>
                        <textarea type="text" name="additionalinfo" id="additionalinfo" rows="2" onChange={this.onChangeAdditionalnfo} placeholder="Feel free to share it with us!" /><br />
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
    render() {
        return (
            this.props.auth ? (<div className="volunteer">
                <div className="volpg1">
                    <h1>Volunteer with Us</h1>
                    <br /><br /><br /><br />
                    <p>We depend on volunteers! Volunteers make up 96% of our total workforce and carry on our humanitarian work.</p>
                    <br /><br />
                    <button>Join Us</button>
                </div>

                <div className="fullheight volpg2">
                    <h1><span className="colorize" style={{ fontSize: 'inherit' }}>"Your Time and Talent can literally</span> save someone's lives<span className="colorize" style={{ fontSize: 'inherit' }}>."</span></h1><br />
                    <button className="signout">I'm ready to volunteer</button>
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