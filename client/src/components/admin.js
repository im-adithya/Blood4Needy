import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Autocomplete from 'react-google-autocomplete';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './admin.css';
import logo from '../logodark.svg';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            warning: ' '
        }
    }

    onChangeUserName = (e) => {
        this.setState({ username: e.target.value })
    }

    onChangePass = (e) => {
        this.setState({ password: e.target.value })
    }

    adminLogin = (e) => {
        e.preventDefault()
        console.log(this.state)
        if (window.innerWidth < 600) {
            this.setState({ warning: 'Login from Laptop/PC' })
        } else {
            if (this.state.username === 'Lakshya' && this.state.password === 'Blood4Needy') {
                this.props.toggle()
            } else {
                this.setState({ warning: 'Invalid Credentials' })
            }
        }
    }

    render() {
        if (this.props.display) {
            return (
                <div className="adminlogin">
                    <form onSubmit={this.adminLogin} className="adminform">
                        <div className="logheader">
                            <img src={logo} alt="logo" width={100} />
                            <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Admin</h3>
                        </div><br /><br />
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="username" onChange={this.onChangeUserName} required /><br />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" onChange={this.onChangePass} required /><br />
                        <div className="bold colorize admin-warn">{this.state.warning}</div>
                        <button className="admin-btn">Login</button>
                    </form>
                    <a href="/" className="admin-sug">← Back to Blood4Needy</a>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updates: [],
            users: [],
            volunteers: [],
            requests: [],
            testimonials: [],
            updateswarning: '',
            userswarning: '',
            volunteerswarning: '',
            requestswarning: '',
            testimonialswarning: '',
            updatespageCount: 1,
            userspageCount: 1,
            volunteerspageCount: 1,
            requestspageCount: 1,
            testimonialspageCount: 1,

            updatecontent: '',
            updatetitle: '',

            username: '',
            useremail: '',
            useraddress: '',
            userage: '',
            userbg: '',
            usergender: '',
            userphone: '',
            userpos: '',

            requestpatientphone: '',
            requestmessage: '',
            requestbloodgroup: '',
            requestrequireddate: '',
            reqshow: '',

            newupdatemode: true,
            newusermode: true,
            reqeditmode: false,

            active: 'users'
        }
    }

    componentDidMount() {
        axios.get('/api/updates/')
            .then(res => {
                this.setState({ updates: res.data })
                axios.get('/api/user/')
                    .then(res => {
                        this.setState({ users: res.data })
                        axios.get('/api/volunteer/')
                            .then(res => {
                                this.setState({ volunteers: res.data })
                                axios.get('/api/request/all')
                                    .then(res => {
                                        this.setState({ requests: res.data })
                                        axios.get('/api/user/testimonials')
                                            .then(res => {
                                                this.setState({ testimonials: res.data })
                                            })
                                            .catch(err => {
                                                this.setState({ testimonialswarning: 'ERR: Please Try Again' })
                                                console.log(err)
                                            });
                                    })
                                    .catch(err => {
                                        this.setState({ requestswarning: 'ERR: Please Try Again' })
                                        console.log(err)
                                    });
                            })
                            .catch(err => {
                                this.setState({ volunteerswarning: 'ERR: Please Try Again' })
                                console.log(err)
                            });
                    })
                    .catch(err => {
                        this.setState({ userswarning: 'ERR: Please Try Again' })
                        console.log(err)
                    });
            })
            .catch(err => {
                this.setState({ updateswarning: 'ERR: Please Try Again' })
                console.log(err)
            });
    }

    handleReadVolunteer = (x) => {
        if (this.state.openedvolunteer === x) {
            this.setState({ openedvolunteer: '' })
        } else {
            this.setState({ openedvolunteer: x })
        }
    }

    handleReadUpdate = (x) => {
        if (this.state.openedupdate === x) {
            this.setState({ openedupdate: '' })
        } else {
            this.setState({ openedupdate: x })
        }
    }

    handleReadUser = (x) => {
        if (this.state.openeduser === x) {
            this.setState({ openeduser: '' })
        } else {
            this.setState({ openeduser: x })
        }
    }

    handleReadRequest = (x) => {
        if (this.state.openedrequest === x) {
            this.setState({ openedrequest: '' })
        } else {
            this.setState({ openedrequest: x })
        }
    }

    handleupdatesPageClick = (data) => {
        let selected = data.selected;
        this.setState({ updatespageCount: selected + 1 });
    };

    handleusersPageClick = (data) => {
        let selected = data.selected;
        this.setState({ userspageCount: selected + 1 });
    };

    handlevolunteersPageClick = (data) => {
        let selected = data.selected;
        this.setState({ volunteerspageCount: selected + 1 });
    };

    handlerequestsPageClick = (data) => {
        let selected = data.selected;
        this.setState({ requestspageCount: selected + 1 });
    };

    handletestimonialsPageClick = (data) => {
        let selected = data.selected;
        this.setState({ testimonialspageCount: selected + 1 });
    };

    removeVolunteer = () => {
        console.log(this.state.openedvolunteer, this.state.volunteers[this.state.openedvolunteer])
        axios.delete('/api/volunteer/' + this.state.volunteers[this.state.openedvolunteer]._id)
            .then(res => {
                this.setState(({ openedvolunteer, volunteers }) => {
                    let vols = volunteers
                    vols.splice(openedvolunteer, 1)
                    return {
                        openedvolunteer: '',
                        volunteers: vols
                    }
                })
            })
            .catch(err => {
                this.setState({ testimonialswarning: 'ERR: Please Try Again' })
                console.log(err)
            });

    }

    editUpdate = () => {
        this.setState(({ openedupdate, updates }) => {
            return {
                updatecontent: updates[openedupdate].content,
                updatetitle: updates[openedupdate].title,
                newupdatemode: false
            }
        })
    }

    editRequest = () => {
        this.setState(({ openedrequest, requests }) => {

            return {
                requestmessage: requests[openedrequest].message,
                requestbloodgroup: requests[openedrequest].bloodgroup,
                requestpatientphone: requests[openedrequest].patientphone,
                requestrequireddate: requests[openedrequest].requireddate,
                reqeditmode: true
            }
        })
    }

    updateRequest = (e) => {
        e.preventDefault()
        const req = {
            message: this.state.requestmessage,
            bloodgroup: this.state.requestbloodgroup,
            patientphone: this.state.requestpatientphone,
            requireddate: this.state.requestrequireddate
        }
        axios.post('/api/request/update/' + this.state.requests[this.state.openedrequest]._id, req)
            .then(res => {
                axios.get('/api/request/all')
                    .then(res => {
                        this.setState({
                            requests: res.data,
                            requestpatientphone: '',
                            requestmessage: '',
                            requestbloodgroup: '',
                            requestrequireddate: '',
                            reqshow: '',
                        })
                    })
            })
    }

    editUser = () => {
        this.setState(({ openeduser, users }) => {
            return {
                username: users[openeduser].name,
                userphone: users[openeduser].phone,
                useraddress: users[openeduser].address,
                userpos: users[openeduser].pos,
                useremail: users[openeduser].email,
                userage: users[openeduser].age,
                usergender: users[openeduser].gender,
                userbg: users[openeduser].bloodgroup,
                newusermode: false
            }
        })
    }

    hideRequest = () => {
        axios.post('/api/request/show/' + this.state.requests[this.state.openedrequest]._id, { show: !this.state.requests[this.state.openedrequest].show })
            .then(res => {
                axios.get('/api/request/all')
                    .then(res => {
                        this.setState({
                            requestpatientphone: '',
                            requestmessage: '',
                            requestbloodgroup: '',
                            requestrequireddate: '',
                            reqshow: '',
                            requests: res.data,
                            requestwarning: 'Hidden',
                            reqeditmode: false
                        })
                        setTimeout(function () {
                            this.setState({ requestwarning: '' });
                        }.bind(this), 1500);
                    })
            })
    }

    removeUser = () => {
        axios.delete('/api/user/' + this.state.users[this.state.openeduser]._id)
            .then(res => {
                axios.delete('/api/blood/' + this.state.users[this.state.openeduser].phone)
                    .then(res => {
                        console.log(res)
                        this.setState(({ openeduser, users }) => {
                            let usrs = users
                            usrs.splice(openeduser, 1)
                            return {
                                openeduser: '',
                                users: usrs
                            }
                        })
                    })
            })
    }

    removeRequest = () => {
        axios.delete('/api/request/' + this.state.requests[this.state.openedrequest]._id)
            .then(res => {
                this.setState(({ openedrequest, requests }) => {
                    let rqsts = requests
                    rqsts.splice(openedrequest, 1)
                    return {
                        requestpatientphone: '',
                        requestmessage: '',
                        requestbloodgroup: '',
                        requestrequireddate: '',
                        reqshow: '',
                        reqeditmode: false,
                        openedrequest: '',
                        requests: rqsts
                    }
                })
            })
    }

    removeUpdate = () => {
        axios.delete('/api/updates/' + this.state.updates[this.state.openedupdate]._id)
            .then(res => {
                this.setState(({ openedupdate, updates }) => {
                    let upd = updates
                    upd.splice(openedupdate, 1)
                    return {
                        openedupdate: '',
                        updates: upd
                    }
                })
            })
            .catch(err => {
                this.setState({ updateswarning: 'ERR: Please Try Again' })
                console.log(err)
            });

    }

    onChangeBG = (e) => {
        this.setState({ userbg: e.target.value })
    }

    onChangeName = (e) => {
        this.setState({ username: e.target.value })
    }

    onChangePhone = (e) => {
        this.setState({ userphone: e.target.value })
    }

    onChangeEmail = (e) => {
        this.setState({ useremail: e.target.value })
    }

    onChangeAge = (e) => {
        this.setState({ userage: e.target.value })
    }

    onChangeGender = (e) => {
        this.setState({ usergender: e.target.value })
    }

    onChangeAddress = (e) => {
        this.setState({ useraddress: e.target.value, userpos: '' })
    }

    onChangeTitle = (e) => {
        this.setState({ updatetitle: e.target.value })
    }

    onChangeUC = (e) => {
        this.setState({ updatecontent: e.target.value })
    }

    onChangePatientPhone = (e) => {
        this.setState({ requestpatientphone: e.target.value })
    }

    onChangeRequiredDate = (e) => {
        this.setState({ requestrequireddate: e.target.value })
    }

    onChangeReqBG = (e) => {
        this.setState({ requestbloodgroup: e.target.value })
    }

    onChangeReqMsg = (e) => {
        this.setState({ requestmessage: e.target.value })
    }

    newUser = (e) => {
        e.preventDefault()
        if (typeof (this.state.userpos) === 'object') {
            const user = {
                name: this.state.username,
                phone: this.state.userphone,
                email: this.state.useremail,
                bloodgroup: this.state.userbg,
                age: this.state.userage,
                gender: this.state.usergender,
                pos: this.state.userpos,
                address: this.state.useraddress
            }
            axios.post(this.state.newusermode ? '/api/user/add' : '/api/user/update/' + this.state.users[this.state.openeduser]._id, user)
                .then(res => {
                    this.setState({ userwarning: '' })
                    if (this.state.newusermode) {
                        axios.post('/api/blood/add', { user: res.data })
                            .then(res => {
                                axios.get('/api/user/')
                                    .then(res => {
                                        this.setState({
                                            users: res.data,
                                            username: '',
                                            useremail: '',
                                            useraddress: '',
                                            userage: '',
                                            userbg: '',
                                            usergender: '',
                                            userphone: '',
                                            userpos: '',
                                            userwarning: 'Added Successfully!',
                                            openeduser: ''
                                        })
                                        setTimeout(function () {
                                            this.setState({ userwarning: '' });
                                        }.bind(this), 1500);
                                    })
                                    .catch(err => {
                                        this.setState({ userswarning: 'ERR: Please Try Again' })
                                        console.log(err)
                                    });
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    } else {
                        axios.get('/api/user/')
                            .then(res => {
                                this.setState({
                                    users: res.data,
                                    username: '',
                                    useremail: '',
                                    useraddress: '',
                                    userage: '',
                                    userbg: '',
                                    usergender: '',
                                    userphone: '',
                                    userpos: '',
                                    userwarning: 'Edited Successfully!',
                                    newusermode: true
                                })
                                setTimeout(function () {
                                    this.setState({ userwarning: '' });
                                }.bind(this), 1500);
                            })
                            .catch(err => {
                                this.setState({ userswarning: 'ERR: Please Try Again' })
                                console.log(err)
                            });
                    }
                })
                .catch(err => {
                    console.log(err, this.state)
                });
        } else {
            this.setState({ userwarning: 'Please select from dropdown' })
        }
    }

    newUpdate = (e) => {
        e.preventDefault()
        const update = {
            title: this.state.updatetitle,
            content: this.state.updatecontent
        }
        axios.post(this.state.newupdatemode ? '/api/updates/add' : '/api/updates/update/' + this.state.updates[this.state.openedupdate]._id, update)
            .then(res => {
                axios.get('/api/updates/')
                    .then(res => {
                        this.setState({ updates: res.data, updatecontent: '', updatetitle: '', updatewarning: this.state.newupdatemode ? 'Added successfully!' : 'Edited successfully!' })
                        setTimeout(function () {
                            this.setState({ updatewarning: '' });
                        }.bind(this), 1500);
                    })
                    .catch(err => {
                        this.setState({ updateswarning: 'ERR: Please Try Again' })
                        console.log(err)
                    });
            })
    }

    stringGenerator = (date) => {
        let diff = new Date() - new Date(date)
        let string = 'about '
        if (Math.trunc(diff / 3.6e+6) > 0) {
            if (Math.trunc(diff / 3.6e+6) > 24) {
                let rem = Math.trunc(diff / 8.64e+7)
                string += rem + ' day' + ((rem === 1) ? ' ' : 's ') + 'ago'
            } else {
                let rem = Math.trunc((diff / 3.6e+6))
                string += rem + ' hour' + ((rem === 1) ? ' ' : 's ') + 'ago'
            }
        } else {
            let rem = Math.trunc((diff / 60000))
            string += rem + ' minute' + ((rem === 1) ? ' ' : 's ') + 'ago'
        }
        return string
    }

    usercancel = () => {
        this.setState({
            username: '',
            userphone: '',
            userage: '',
            userbg: '',
            usergender: '',
            useremail: '',
            userpos: '',
            useraddress: '',
            newusermode: true
        })
    }

    requestcancel = () => {
        this.setState({
            requestpatientphone: '',
            requestmessage: '',
            requestbloodgroup: '',
            requestrequireddate: '',
            reqshow: '',
            reqeditmode: false

        })
    }

    updatecancel = () => {
        this.setState({
            updatecontent: '',
            updatetitle: '',
            newupdatemode: true
        })
    }

    render() {
        if (this.props.display) {
            return (
                <div>
                    <div class="sidenav">
                        <a href="/"><img src={logo} alt="logo" width={100} style={{ marginBottom: '30px', paddingLeft: '10px' }} /></a>
                        <p style={{ color: ((this.state.active === 'users') ? '#F42929' : '') }} onClick={() => this.setState({ active: 'users' })}>Users</p>
                        <p style={{ color: ((this.state.active === 'requests') ? '#F42929' : '') }} onClick={() => this.setState({ active: 'requests' })}>Requests</p>
                        <p style={{ color: ((this.state.active === 'updates') ? '#F42929' : '') }} onClick={() => this.setState({ active: 'updates' })}>Updates</p>
                        <p style={{ color: ((this.state.active === 'volunteers') ? '#F42929' : '') }} onClick={() => this.setState({ active: 'volunteers' })}>Volunteers</p>
                    </div>
                    <div className="admin">
                        <div className="admin-header">
                            <h2>Admin Panel</h2>
                            <button className="admin-so" onClick={() => this.props.toggle()}>Sign Out</button>
                        </div>
                        {this.state.active === 'users' && <div className="notifwrapper">
                            <div className="orgupdates">
                                <div style={{ height: '95%' }}>
                                    <h3>All Users</h3>
                                    {this.state.users.map((info, index) => {
                                        if ((index < this.state.userspageCount * 5) && (index >= (this.state.userspageCount - 1) * 5)) {
                                            return (<div className='orgupdate' key={'orgupdate' + (index + 1).toString()}>
                                                <h2 className="orgupdate-1">
                                                    {info.name}
                                                </h2>
                                                <div className="orgupdate-2">
                                                    <div className="userbg">{info.bloodgroup}</div>
                                                    <button className="readbtn" style={{ width: '80px' }} onClick={() => this.handleReadUser(index)}>{this.state.openeduser === index ? 'Hide ' : 'View '} Details</button>
                                                </div>
                                                {this.state.openeduser === index && <div style={{ marginTop: '10px' }} className="voldata">
                                                    <span className="bold">Phone: </span>{info.phone}<br />
                                                    <span className="bold">Email: </span>{info.email}<br />
                                                    <span className="bold">Age: </span>{info.age}<br />
                                                    <span className="bold">Gender: </span>{info.gender}<br />
                                                    <span className="bold">Address: </span>{info.address}<br />
                                                    <span className="bold">Joined: </span>{info.createdAt}<br />
                                                    <span className="bold">Pos: </span>{info.pos.lat + '-' + info.pos.lng}<br />
                                                    <button className="readbtn" style={{ width: '100px', marginTop: '10px' }} onClick={this.editUser}>Edit User</button>&nbsp;&nbsp;&nbsp;
                                            <button className="readbtn" style={{ width: '100px', marginTop: '10px' }} onClick={this.removeUser}>Delete User</button>
                                                </div>}
                                            </div>)
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                                <div className="pages">
                                    <ReactPaginate
                                        previousLabel={'<'}
                                        nextLabel={'>'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(this.state.users.length / 5)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        onPageChange={this.handleusersPageClick}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                            <div className="orgupdates" style={{ display: 'block' }}>
                                <div>
                                    <h3>{this.state.newusermode ? 'Add New ' : 'Edit '} User</h3>
                                    <form onSubmit={this.newUser} className="updatesform">
                                        <label htmlFor="phone">10-Digit Mobile Number</label>
                                        <input type="tel" value='+91' style={{ width: '10%' }} disabled />
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            style={{ width: '90%' }}
                                            name="phone"
                                            id="phone"
                                            pattern="[1-9]{1}[0-9]{9}"
                                            onChange={this.onChangePhone}
                                            value={this.state.userphone}
                                            required />
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" placeholder="Name" value={this.state.username} onChange={this.onChangeName} required /><br />
                                        <div className="selection">
                                            <label htmlFor="bloodgroup" style={{ fontSize: '30px' }}>Blood Group</label>
                                            <select name="bloodgroup" id="bloodgroup" value={this.state.userbg} onChange={this.onChangeBG} style={{ width: '30%', fontSize: '20px' }} required>
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
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" placeholder="example@domain.com" value={this.state.useremail} onChange={this.onChangeEmail} required /><br />
                                        <label htmlFor="age">Age</label>
                                        <input type="number" min="18" name="age" id="age" placeholder="Age" value={this.state.userage} onChange={this.onChangeAge} required /><br />
                                        <label htmlFor="address">City</label>
                                        <Autocomplete
                                            id="address" name="address"
                                            onChange={this.onChangeAddress}
                                            value={this.state.useraddress}
                                            apiKey={'AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us'}
                                            onPlaceSelected={(place) => this.setState({ useraddress: place.formatted_address, userpos: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } })}
                                            types={['(cities)']}
                                            componentRestrictions={{ country: "in" }}
                                            placeholder="Select from dropdown"
                                            required
                                        />
                                        <div className="radiobtn">
                                            <input type="radio" id="male" name="gender" value="male" checked={this.state.usergender === 'male'} onChange={this.onChangeGender} required />
                                            <label htmlFor="male">Male</label><br />
                                            <input type="radio" id="female" name="gender" value="female" checked={this.state.usergender === 'female'} onChange={this.onChangeGender} required />
                                            <label htmlFor="female">Female</label><br />
                                            <input type="radio" id="other" name="gender" value="other" checked={this.state.usergender === 'other'} onChange={this.onChangeGender} required />
                                            <label htmlFor="other">Other</label>
                                        </div>
                                        <div className="colorize">{this.state.userwarning}</div>
                                        <button type="submit" style={{ width: '80px', marginTop: '10px' }} className="readbtn">{this.state.newusermode ? 'Add ' : 'Edit '} User</button><br />
                                        {!this.state.newusermode && <button onClick={this.usercancel} style={{ width: '80px', marginTop: '10px' }} className="readbtn">Cancel</button>}
                                    </form>
                                </div>
                            </div>
                        </div>}
                        {this.state.active === 'requests' && <div className="notifwrapper">
                            <div className="orgupdates">
                                <div style={{ height: '95%' }}>
                                    <h3>Blood Requests</h3>
                                    {this.state.requests.map((info, index) => {
                                        if ((index < this.state.requestspageCount * 4) && (index >= (this.state.requestspageCount - 1) * 4)) {
                                            return (<div className='orgupdate' key={'orgupdate' + (index + 1).toString()}>
                                                <h2 className="orgupdate-1">
                                                    {info.patientname}
                                                </h2>
                                                <div className="orgupdate-2">
                                                    <div className="userbg">{info.units + ' units'} {info.bloodgroup}</div>
                                                    <button className="readbtn" style={{ width: '80px' }} onClick={() => this.handleReadRequest(index)}>{this.state.openedrequest === index ? 'Hide ' : 'View '} Details</button>
                                                </div>
                                                {this.state.openedrequest === index && <div style={{ marginTop: '10px' }} className="voldata">
                                                    <span className="bold">Required Date: </span>{info.requireddate}<br />
                                                    <span className="bold">Patient Phone: </span>{info.patientphone}<br />
                                                    <span className="bold">Doctor Name: </span>{info.doctorname}<br />
                                                    <span className="bold">Reason: </span>{info.reason}<br />
                                                    <span className="bold">Hospital: </span>{info.hospital}<br />
                                                    <span className="bold">Description: </span>{info.description}<br />
                                                    <span className="bold">Pos: </span>{info.pos.lat + '-' + info.pos.lng}<br />
                                                    <span className="bold">Contact Phone: </span>{info.user.phone}<br />
                                                    <span className="bold">Contact Email: </span>{info.contactemail}<br />
                                                    <span className="bold">Message: </span>{info.message}<br />
                                                    <span className="bold colorize">Shown: </span>{info.show.toString()}<br />
                                                    <button className="readbtn" style={{ width: '100px', marginTop: '10px' }} onClick={this.editRequest}>Edit Request</button>&nbsp;&nbsp;&nbsp;
                                            <button className="readbtn" style={{ width: '100px', marginTop: '10px' }} onClick={this.hideRequest}>{info.show ? 'Hide' : 'Show'} Request</button>&nbsp;&nbsp;&nbsp;
                                            <button className="readbtn" style={{ width: '100px', marginTop: '10px' }} onClick={this.removeRequest}>Delete Request</button>
                                                </div>}
                                            </div>)
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                                <div className="pages">
                                    <ReactPaginate
                                        previousLabel={'<'}
                                        nextLabel={'>'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(this.state.requests.length / 4)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlerequestsPageClick}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                            <div className="orgupdates" style={{ display: 'block' }}>
                                <div>
                                    <h3>Edit Request</h3>
                                    <form onSubmit={this.updateRequest} className="updatesform">
                                        <label htmlFor="reqphone">Patient's Number</label>
                                        <input type="tel" value='+91' style={{ width: '10%' }} disabled />
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            style={{ width: '90%' }}
                                            name="reqphone"
                                            id="reqphone"
                                            pattern="[1-9]{1}[0-9]{9}"
                                            onChange={this.onChangePatientPhone}
                                            value={this.state.requestpatientphone}
                                            required
                                        />
                                        <div className="selection">
                                            <label htmlFor="reqbloodgroup" style={{ fontSize: '30px' }}>Blood Group</label>
                                            <select name="reqbloodgroup" id="reqbloodgroup" value={this.state.requestbloodgroup} onChange={this.onChangeReqBG} style={{ width: '30%', fontSize: '20px' }} required>
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
                                        <label htmlFor="requireddate">Date When Required</label>
                                        <input type="date" id="requireddate" className={"dateclass " + (this.state.requestrequireddate !== '' ? '' : 'placeholderclass')} name="requireddate" value={this.state.requestrequireddate} onChange={this.onChangeRequiredDate} placeholder="Select Date" />
                                        <label htmlFor="reqmsg">Message</label>
                                        <textarea type="text" name="reqmsg" id="reqmsg" placeholder="Request Message" value={this.state.requestmessage} onChange={this.onChangeReqMsg} required /><br />
                                        <div className="colorize">{this.state.requestwarning}</div>
                                        <button type="submit" style={{ width: '80px', marginTop: '10px' }} className="readbtn">Edit Request</button><br />
                                        {!this.state.reqeditmode && <button onClick={this.usercancel} style={{ width: '80px', marginTop: '10px' }} className="readbtn">Cancel</button>}
                                    </form>
                                </div>
                            </div>
                        </div>}
                        {this.state.active === 'updates' && <div className="notifwrapper">
                            <div className="orgupdates">
                                <div style={{ height: '95%' }}>
                                    <h3>Organization Updates</h3>
                                    {this.state.updates.map((info, index) => {
                                        if ((index < this.state.updatespageCount * 4) && (index >= (this.state.updatespageCount - 1) * 4)) {
                                            return (<div className='orgupdate' key={'orgupdate' + (index + 1).toString()}>
                                                <h2 className="orgupdate-1">{info.title}</h2>
                                                <div className="orgupdate-2">
                                                    <div>{this.stringGenerator(info.createdAt)}</div>
                                                    <button className="readbtn" onClick={() => this.handleReadUpdate(index)} value={index}>{this.state.openedupdate === index ? 'Hide ' : 'Read'} Post</button>
                                                </div>
                                                {this.state.openedupdate === index && <div style={{ marginTop: '10px', maxHeight: '150px', overflow: 'auto', textAlign: 'justify', paddingRight: '10px' }}>
                                                    {info.content}<br />
                                                    <button className="readbtn" style={{ width: '100px', marginTop: '10px' }} onClick={this.editUpdate}>Edit Update</button>&nbsp;&nbsp;&nbsp;
                                            <button className="readbtn" style={{ width: '100px', marginTop: '10px' }} onClick={this.removeUpdate}>Delete Update</button>
                                                </div>}
                                            </div>)
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                                <div className="pages">
                                    <ReactPaginate
                                        previousLabel={'<'}
                                        nextLabel={'>'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(this.state.updates.length / 4)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handleupdatesPageClick}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                            <div className="orgupdates" style={{ display: 'block' }}>
                                <div>
                                    <h3>{this.state.newupdatemode ? 'Post New ' : 'Edit '} Update</h3>
                                    <form onSubmit={this.newUpdate} className="updatesform">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" name="title" id="title" placeholder="Update Title" value={this.state.updatetitle} onChange={this.onChangeTitle} required /><br />
                                        <label htmlFor="update">Update</label>
                                        <textarea type="text" name="update" id="update" placeholder="Update Content" value={this.state.updatecontent} onChange={this.onChangeUC} required /><br />
                                        <div className="colorize">{this.state.updatewarning}</div>
                                        <button type="submit" style={{ width: '80px', marginTop: '10px' }} className="readbtn">{this.state.newupdatemode ? 'Post ' : 'Edit '} Update</button><br />
                                        {!this.state.newupdatemode && <button onClick={this.updatecancel} style={{ width: '80px', marginTop: '10px' }} className="readbtn">Cancel</button>}
                                    </form>
                                </div>
                            </div>
                        </div>}
                        {this.state.active === 'volunteers' && <div className="notifwrapper">
                            <div className="orgupdates">
                                <div style={{ height: '95%' }}>
                                    <h3>Volunteer Requests</h3>
                                    {this.state.volunteers.map((info, index) => {
                                        if ((index < this.state.volunteerspageCount * 4) && (index >= (this.state.volunteerspageCount - 1) * 4)) {
                                            return (<div className='orgupdate' key={'orgupdate' + (index + 1).toString()}>
                                                <h2 className="orgupdate-1">{info.name}</h2>
                                                <div className="orgupdate-2">
                                                    <button className="readbtn" style={{ width: '80px' }} onClick={() => this.handleReadVolunteer(index)}>{this.state.openedvolunteer === index ? 'Hide ' : 'View '} Details</button>
                                                </div>
                                                {this.state.openedvolunteer === index && <div style={{ marginTop: '10px' }} className="voldata">
                                                    <span className="bold">Phone: </span>{info.phone}<br />
                                                    <span className="bold">Email: </span>{info.email}<br />
                                                    <span className="bold">Occupation: </span>{info.occupation}<br />
                                                    <span className="bold">City: </span>{info.city}<br />
                                                    <span className="bold">Interest: </span>{info.interest}<br />
                                                    <span className="bold">Experience: </span>{info.experience}<br />
                                                    <span className="bold">Reached: </span>{info.reached}<br />
                                                    <span className="bold">Additional Info: </span>{info.additioninfo}<br />
                                                    <button className="readbtn" style={{ width: '100px', marginTop: '10px' }} onClick={this.removeVolunteer}>Delete Request</button>
                                                </div>}
                                            </div>)
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                                <div className="pages">
                                    <ReactPaginate
                                        previousLabel={'<'}
                                        nextLabel={'>'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(this.state.volunteers.length / 4)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlevolunteersPageClick}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false
        }
    }
    toggleAuth = () => {
        this.setState(({ auth }) => {
            return { auth: !auth }
        })
    }
    render() {
        return (
            <div>
                <Helmet>
                    <meta name="robots" content="noindex"></meta>
                    <title>Admin Panel</title>
                </Helmet>
                <AdminLogin toggle={this.toggleAuth} display={!this.state.auth} />
                <AdminPanel toggle={this.toggleAuth} display={this.state.auth} />
            </div>
        )
    }
}