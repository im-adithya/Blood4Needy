import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapView from './map/mapview';
import './feed.css';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";

class SharePopUp extends Component {
    render() {
        return (
            <div className="sharepopup">
                <div className="cross" onClick={this.props.cross}>
                    <FontAwesomeIcon icon='times-circle' />
                </div>
                <div className="sharepopup-2">
                    <h1>Share to your contacts!</h1>
                    <div>
                        <EmailShareButton url='https://www.blood4needy.com/donate' subject={"Someone needs your help"} body={this.props.message} openShareDialogOnClick={true} title>
                            <EmailIcon size={32} round />
                        </EmailShareButton >
                        <WhatsappShareButton url='https://www.blood4needy.com/donate' title={this.props.message}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <FacebookShareButton url='https://www.blood4needy.com/donate' quote={this.props.message}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <FacebookMessengerShareButton url='https://www.blood4needy.com/donate' quote={this.props.message}>
                            <FacebookMessengerIcon size={32} round />
                        </FacebookMessengerShareButton>
                        <TelegramShareButton url='https://www.blood4needy.com/donate' title={this.props.message}>
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <TwitterShareButton url='https://www.blood4needy.com/donate' title={this.props.message}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                    </div>
                </div>
            </div>
        )
    }
}

class BloodRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requests: [],
            share: ''
        }
    }

    componentDidMount() {
        axios.get('/api/request/')
            .then(res => {
                this.setState({ requests: res.data })
            })
            .catch(err => {
                console.log(err)
            });

    }

    handleClickOnMarker = (marker, event) => {
        this.setState({ selectedMarker: marker })
    }

    toggleShare = (e) => {
        this.setState({ share: parseInt(e.target.title) })
    }

    stringGenerator = (date) => {
        let diff = new Date() - new Date(date)
        let string = 'about '
        if (Math.trunc(diff/3.6e+6)>0){
            if (Math.trunc(diff/3.6e+6)>24){
                let rem = Math.trunc(diff/8.64e+7)
                string += rem + ' day' + ((rem===1) ? ' ' : 's ') + 'ago'
            } else {
                let rem = Math.trunc((diff/3.6e+6))
                string += rem + ' hour' + ((rem===1) ? ' ' : 's ') + 'ago'
            }
        } else {
            let rem = Math.trunc((diff/60000))
            string += rem + ' minute' + ((rem===1) ? ' ' : 's ') + 'ago'
        }
        return string
    }

    render() {
        return (
            <div className="requests">
                {this.state.requests.map((info, index) => (
                    <div className='bloodrequest' key={'bloodrequest' + (index + 1).toString()}>
                        <div>
                            <h2>{info.user.name}</h2>
                            <p className="looking for">looking for <span className="bold">{info.bloodgroup}</span> in <span className="bold">{info.hospitaladdress}</span></p>
                        </div>
                        <div>{this.stringGenerator(info.createdAt)}</div>
                        <div className="reqmsg">
                            {info.message}
                        </div>
                        <div className="minimap">
                            <MapView
                                defaults={info.pos}
                                selectedMarker={false}
                                markers={[{ location: { coordinates: [info.pos.lng, info.pos.lat] } }]}
                                onClick={this.handleClickOnMarker}
                            />
                        </div>
                        <div className="helperbtns">
                            <div className="contactpatient">
                                <a href={'tel:' + info.contactphone}>
                                    <div className="contactpatient-1">Contact Patient</div>
                                    <div className="contactpatient-2">I'm Available. I'll Donate</div>
                                </a>
                            </div>
                            <div className="share" onClick={this.toggleShare} title={index}>Share &nbsp;<FontAwesomeIcon icon={['fas', 'share-alt']} /></div>
                        </div>

                        {this.state.share === index && <SharePopUp cross={this.toggleShare} message={info.user.name + ' is looking for ' + info.bloodgroup + 'blood in ' + info.hospitaladdress + '. Please help him if you can! Contact: ' + info.contactphone} />}
                    </div>
                ))}
            </div>
        )
    }
}

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updates: [],
            users: [],
            totalusers: 0,
            openedupdate: '',
            pageCount: 1,
        }
    }

    componentDidMount() {
        axios.get('/api/updates/')
            .then(res => {
                this.setState({ updates: res.data })
                axios.get('/api/user/feed')
                    .then(res => {
                        this.setState({ users: res.data })
                        axios.get('/api/user/total')
                            .then(res => {
                                this.setState({ totalusers: res.data })
                            })
                            .catch(err => {
                                this.setState({ warning: 'ERR: Please Try Again' })
                                console.log(err)
                            });
                    })
                    .catch(err => {
                        this.setState({ warning: 'ERR: Please Try Again' })
                        console.log(err)
                    });
            })
            .catch(err => {
                this.setState({ warning: 'ERR: Please Try Again' })
                console.log(err)
            });
    }

    handleRead(e) {
        if (this.state.openedupdate === parseInt(e.target.value)) {
            this.setState({ openedupdate: '' })
        } else {
            this.setState({ openedupdate: parseInt(e.target.value) })
        }
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({ pageCount: selected + 1 })
    };

    stringGenerator = (date) => {
        let diff = new Date() - new Date(date)
        let string = 'about '
        if (Math.trunc(diff/3.6e+6)>0){
            if (Math.trunc(diff/3.6e+6)>24){
                let rem = Math.trunc(diff/8.64e+7)
                string += rem + ' day' + ((rem===1) ? ' ' : 's ') + 'ago'
            } else {
                let rem = Math.trunc((diff/3.6e+6))
                string += rem + ' hour' + ((rem===1) ? ' ' : 's ') + 'ago'
            }
        } else {
            let rem = Math.trunc((diff/60000))
            string += rem + ' minute' + ((rem===1) ? ' ' : 's ') + 'ago'
        }
        return string
    }

    render() {
        return (
            <div className="notifwrapper">
                <div className="orgupdates">
                    <div style={{height: '95%'}}>
                    <h3>Organization Updates</h3>
                    {this.state.updates.map((info, index) => {
                        if ((index < this.state.pageCount * 4) && (index >= (this.state.pageCount - 1) * 4)) {
                            return (<div className='orgupdate' key={'orgupdate' + (index + 1).toString()}>
                                <h2 className="orgupdate-1">{info.title}</h2>
                                <div className="orgupdate-2">
                                    <div>{this.stringGenerator(info.createdAt)}</div>
                                    <button className="readbtn" onClick={this.handleRead.bind(this)} value={index}>Read Post</button>
                                </div>
                                {this.state.openedupdate === index && <div style={{marginTop: '10px'}}>
                                    {info.content}
                                </div>}
                            </div>)
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
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                    </div>
                </div>
                <div className="recentmembers">
                    <h3>Recent Members Registered</h3>
                    {this.state.users.map((info, index) => (
                        <div className='newuser' key={'newuser' + (index + 1).toString()}>
                            <div className='userdetails'>
                                <h2>{info.name}</h2>
                                <p>{info.address}</p>
                            </div>
                            <div className="userbg">
                                {info.bloodgroup}
                            </div>
                        </div>
                    ))}
                    <div className="donorcount">
                        <h3>Total Blood Donors Registered</h3>
                        <h2>{this.state.totalusers}</h2>
                    </div>
                </div>
            </div>
        )
    }
}

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updates: [],
            users: [],
            requests: [],
            view: 'Blood Requests'
        }

        this.toggleView = this.toggleView.bind(this)
    }


    toggleView(e) {
        this.setState({ view: e.target.innerText })
    }

    render() {
        return (
            this.props.auth ?
                (<div className="feed">
                    <h1>Live Activity Log &nbsp;<FontAwesomeIcon icon='heart' className="heart" /></h1>
                    <div className="togglenotifs">
                        <div onClick={this.toggleView} className={this.state.view === 'Blood Requests' ? 'activenotif' : ''}>Blood Requests</div>
                        <div onClick={this.toggleView} className={this.state.view === 'Notifications' ? 'activenotif' : ''}>Notifications</div>
                    </div>
                    {this.state.view === 'Blood Requests' && <BloodRequests />}
                    {this.state.view === 'Notifications' && <Notifications />}
                </div>) :
                <Redirect to={{ pathname: '/login', state: { from: "feed" } }} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Feed)