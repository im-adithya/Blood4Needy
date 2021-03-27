import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './request.css';
import MyGoogleMap from './map/mygooglemap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RequestFAQs extends Component {
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
        const FAQs = [
            'What is raise a request?',
            'How does the Raise a Request Works?',
            'Do you charge any fees for fulfilling the request?',
            'Someone I know needs blood, can you call him?',
            'How can someone raise a request if he/she has no access to the internet?',
            'How much time will you take to revert?',
            'In which all cities you help?',
            'Can you give us access to donor database and we can call?'
        ]
        const Answers = [
            'If any of your relatives / friends is about to undergo a surgery and the hospital has asked you for blood and you are unable to arrange it on your own, you can raise a request here and we will try to help you.',
            'There are few simple steps -1. Requestor fill the form on this page, with all the details as accurate as possible. 2. One of our volunteers, who would be assigned as Point of Contact (POC) for the request, would call the requestor to verify the details, and collect additional information, as required. Please note that POC might ask for a proof of blood requirement/units like requisition slip from doctor, medical record, etc. 3. If the request is successfully verified, our team would search for the donors and keep the requestor updated on ths status.We try our best, however you would understand there are moments when we might not be able to help due to the lack of enough donors in our network in that region.',
            'No, we don’t charge anything from the requester/patient for arranging the blood donors. If someone asks for any payment on the behalf of BloodConnect for this purpose, please report to us at contact@bloodconnect.org. Please note that if a donor requests for transport to reach the blood bank, we ask the requestor to arrange the transport or reimburse the cost directly to the donor. In exceptional cases, where it is not possible for the requestor due to financial constraints, BloodConnect would consider bearing the cost of transportation.',
            'As a first step, we request you to please Raise a Request here, you can also do it on someone’s behalf if you have all required details. Thereafter, our team will contact the requestor and take the process forward.',
            'In several cities, we work closely with leading blood banks, and they can help a requestor contact us.',
            'We make all the efforts to respond to queries at the earliest. However, exact response time depends on several factors, including but not limited to, number of requests received in a period; requests raised at night or during festivals might take longer; limited availability of donors in our network in that area, etc.',
            'We have sent donors to Nepal even to help! While we have a good donor and volunteer strength for some cities (you can see them in the field City in the form), we have a team that manages requests across India, trying to use our network to ‘reach’ the ‘unreachable’. We try our best, but you would understand there are some moments when we might not be able to help due to the lack of enough donors in our network in that region.',
            'We have promised our donors, our super heroes, that they would not receive unlimited phone calls asking for blood donation. Therefore, we cannot share their data.'
        ]

        return (
            <div className="requestfaqwrapper">
                {FAQs.map((info, index) => (
                    <div className='requestfaq' key={'requestfaq' + (index + 1).toString()}>
                        <button className="faqbox" onClick={this.toggleFAQs} value={(index + 1).toString()} style={{ borderTop: '1px solid white', borderBottom: index === 7 ? '1px solid white' : '' }}>{info}<FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={this.state.active === (index + 1).toString() ? 'minus' : 'plus'} color='#ff8a82' /></button>
                        {this.state.active === (index + 1).toString() && <div className="requestfaqhidden">
                            <p>{Answers[index]}</p>
                        </div>}
                    </div>
                ))}
            </div>
        )
    }
}
class RequestForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeBG = this.onChangeBG.bind(this);
        this.onChangeUnits = this.onChangeUnits.bind(this);
        this.onChangeRequiredDate = this.onChangeRequiredDate.bind(this);
        this.onChangePatientName = this.onChangePatientName.bind(this);
        this.onChangePatientPhone = this.onChangePatientPhone.bind(this);
        this.onChangeDoctorName = this.onChangeDoctorName.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.onChangeHospital = this.onChangeHospital.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        /*this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);*/
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.handleInput = this.handleInput.bind(this)
        this.onSubmitFinal = this.onSubmitFinal.bind(this);

        this.state = {
            bloodgroup: '',
            units: 0,
            requireddate: '',
            patientname: '',
            patientphone: '',
            doctorname: '',
            reason: '',
            hospital: '',
            pos: '',
            /*contactname: '',
            contactphone: '',
            contactemail: '',*/
            message: '',
            warningmessage: '',
            redirect: false
        }
    }

    onChangeBG(e) {
        this.setState({
            bloodgroup: e.target.value
        })
    }

    onChangeUnits(e) {
        this.setState({
            units: parseInt(e.target.innerText)
        })
    }

    onChangeRequiredDate(e) {
        this.setState({
            requireddate: e.target.value
        })
    }

    onChangePatientName(e) {
        this.setState({
            patientname: e.target.value
        })
    }

    onChangePatientPhone(e) {
        this.setState({
            patientphone: e.target.value
        })
    }

    onChangeDoctorName(e) {
        this.setState({
            doctorname: e.target.value
        })
    }

    onChangeReason(e) {
        this.setState({
            reason: e.target.value
        })
    }

    onChangeHospital(loc) {
        this.setState({
            hospital: loc
        })
    }

    onChangePosition(loc) {
        this.setState({
            pos: loc
        })
    }

    /*onChangeContactName(e) {
        this.setState({
            contactname: e.target.value
        })
    }

    onChangeContactPhone(e) {
        this.setState({
            contactphone: e.target.value
        })
    }

    onChangeContactEmail(e) {
        this.setState({
            contactemail: e.target.value
        })
    }*/

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleInput(event) {
        event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
    }

    onSubmitFinal(e) {
        e.preventDefault();

        const request = {
            bloodgroup: this.state.bloodgroup,
            units: this.state.units,
            requireddate: this.state.requireddate,
            patientname: this.state.patientname,
            patientphone: this.state.patientphone,
            doctorname: this.state.doctorname,
            reason: this.state.reason,
            hospital: this.state.hospital,
            pos: this.state.pos,
            /*contactname: this.state.contactname,
            contactphone: this.state.contactphone,
            contactemail: this.state.contactemail,*/
            message: this.state.message,
            user: this.props.userData
        }

        if (this.state.units !== 0 && this.state.pos !== '') {
            axios.post('/api/request/add', request)
                .then(res => {
                    this.setState({ warning: '' })
                    this.props.setValues(this.state.pos, this.state.bloodgroup)
                    this.props.setRequested()
                    this.props.toggleRedirect()
                })
                .catch(err => {
                    this.setState({ warning: 'ERROR: Please try again!' })
                    console.log(err)
                });
        } else if (this.state.units === 0) {
            this.setState({ warning: 'Please select number of units.' })
        } else {
            this.setState({ warning: 'Please select the nearest location using marker.' })
        }
    }

    render() {
        return (
            <div className="request">
                <h3>Request Blood to Connect with Donors Near You</h3>
                <form className="requestform" onSubmit={this.onSubmitFinal} >
                    <div className="requestheader">Kindly fill below details accurately so we can help you better!</div>
                    <div className="formwrapper">
                        <label>Blood Group</label>
                        <select name="bloodgroup" id="bloodgroup" onChange={this.onChangeBG} required>
                            <option value="" hidden>Select Blood Group</option>
                            <option value="A-">A-</option>
                            <option value="A+">A+</option>
                            <option value="B-">B-</option>
                            <option value="B+">B+</option>
                            <option value="AB-">AB-</option>
                            <option value="AB+">AB+</option>
                            <option value="O-">O-</option>
                            <option value="O+">O+</option>
                        </select>
                        <label>Blood Units Required</label>
                        <div className="units">
                            <div onClick={this.onChangeUnits} className={'clickable ' + (this.state.units === 1 ? 'activeunits' : '')}>1</div>
                            <div onClick={this.onChangeUnits} className={'clickable ' + (this.state.units === 2 ? 'activeunits' : '')}>2</div>
                            <div onClick={this.onChangeUnits} className={'clickable ' + (this.state.units === 3 ? 'activeunits' : '')}>3</div>
                            <div onClick={this.onChangeUnits} className={'clickable ' + (this.state.units === 4 ? 'activeunits' : '')}>4</div>
                            <div onClick={this.onChangeUnits} className={'clickable ' + (this.state.units === 5 ? 'activeunits' : '')}>5</div>
                            <div onClick={this.onChangeUnits} className={'clickable ' + (this.state.units === 6 ? 'activeunits' : '')}>6</div>
                        </div>
                        <label htmlFor="requireddate">Date When Required</label>
                        <input type="date" id="requireddate" className={"dateclass " + (this.state.requireddate !== '' ? '' : 'placeholderclass')} name="requireddate" onChange={this.onChangeRequiredDate} placeholder="Select Date" />
                    </div>
                    <div className="formwrapper">
                        <label htmlFor="patientname">Patient's Full Name</label>
                        <input type="text" name="patientname" id="patientname" onChange={this.onChangePatientName} autoComplete="chrome-off" placeholder="Enter Name Here" required />
                        <label htmlFor="patientphone">Patient's Contact Number</label>
                        <input type="tel" value='+91' style={{ width: '15%', textAlign: 'center' }} disabled />
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            style={{ width: '85%' }}
                            name="patientphone"
                            id="patientphone"
                            onInput={this.handleInput}
                            onChange={this.onChangePatientPhone}
                            autoComplete="chrome-off"
                            required />
                        <label htmlFor="doctorname">Doctor's Name <span className="colorize">(Optional)</span></label>
                        <input type="text" name="doctorname" id="doctorname" onChange={this.onChangeDoctorName} autoComplete="chrome-off" placeholder="Doctor Name" />
                        <label htmlFor="reason">Reason/Purpose Details <span className="colorize">(Optional)</span></label>
                        <textarea type="text" name="reason" id="reason" rows="2" onChange={this.onChangeReason} placeholder="Why you need blood?" /><br />
                    </div>
                    <div className="formwrapper mapwrap">
                        <div className="main-wrapper" style={{ height: '75%' }}>
                            <MyGoogleMap addressUpdate={this.onChangeHospital} locUpdate={this.onChangePosition} />
                        </div>
                    </div>
                    <div className="formwrapper">
                        {/*<label htmlFor="contactname">Contact Person's Name</label>
                        <input type="text" name="contactname" id="contactname" onChange={this.onChangeContactName} autoComplete="chrome-off" placeholder="Enter Name Here" required /><br />
                        <label htmlFor="contactphone">Contact Person's Number</label>
                        <input type="tel" value='+91' style={{ width: '15%', textAlign: 'center' }} disabled />
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            style={{ width: '85%' }}
                            name="contactphone"
                            id="contactphone"
                            onInput={this.handleInput}
                            onChange={this.onChangeContactPhone}
                            autoComplete="chrome-off"
                            required />
                        <label htmlFor="contactemail">Contact Person's Email <span className="colorize">(Optional)</span></label>
                        <input type="text" name="contactemail" id="contactemail" onChange={this.onChangeContactEmail} placeholder="Enter Email Here" autoComplete="chrome-off" /><br />*/}
                        <label htmlFor="msgdonors">Message for Donors</label>
                        <textarea type="text" name="msgdonors" id="msgdonors" rows="2" onChange={this.onChangeMessage} placeholder="This message will appear to all our blood donors" required /><br />

                        <p>By submitting these details, you agree that this request should not be made for as commercial interest and you allow with Terms and Conditions of privacy</p>
                        <p className='colorize'>{this.state.warning}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button type="submit" className="button1">Submit Request</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

class Request extends Component {
    constructor(props) {
        super(props);

        this.toggleRedirect = this.toggleRedirect.bind(this)
        this.setPosAndBG = this.setPosAndBG.bind(this)

        this.state = {
            redirect: false,
            pos: '',
            bloodgroup: '',
            warning: '',
            data: []
        }
    }

    setPosAndBG(pos, bg) {
        this.setState({
            pos: pos,
            bloodgroup: bg
        })
    }

    toggleRedirect() {
        axios.get('/api/blood/' + this.state.bloodgroup + '&' + this.props.user._id + '&' + this.state.pos.lat + '&' + this.state.pos.lng + '&' + this.props.user.gender)
            .then(res => {
                this.setState({ data: res.data, redirect: true })
            })
            .catch(err => {
                this.setState({ warning: 'ERR: Please Try Again' })
                console.log(err)
            });
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect
                to={{
                    pathname: "/donors",
                    data: { pos: this.state.pos, bloodgroup: this.state.bloodgroup, data: this.state.data }
                }}
            />
        }

        return (
            this.props.auth ? (<div>
                <div className="requestpageheader">
                    <h1>Request Blood Near You</h1>
                </div>
                <div className="requestpage">
                    <RequestFAQs />
                    <RequestForm
                        setRequested={this.props.requestinitiator}
                        toggleRedirect={this.toggleRedirect}
                        setValues={this.setPosAndBG}
                        userData={this.props.user}
                    />
                </div>

            </div>) :
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
        requestinitiator: () => { dispatch({ type: 'REQUESTED' }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Request)