import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import AOS from 'aos';
import CountUp from 'react-countup';


import Autocomplete from 'react-google-autocomplete';
import './donors.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDistance } from 'geolib';
import MapView from './map/mapview'



export const ListView = class ListView extends Component {
    render() {
        return (
            <div className="listviewwrap">
                {this.props.data.map((info, index) => (
                    <div className='listitem'>
                        <img src="https://www.vhv.rs/dpng/d/408-4087421_person-svg-circle-icon-picture-charing-cross-tube.png" alt="user" className="listitemimg" />
                        <h3>{info.name}</h3>
                        <p>Blood Group: {info.bloodgroup}</p>
                        <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']} style={{ color: '#F42929' }} /> {(getDistance({ lat: info.location.coordinates[1], lng: info.location.coordinates[0] }, this.props.pos) / 1000).toFixed(2)} km Away</p>
                        <button className="connectbutton"><a href={this.props.onConnect ? 'ivrs' : '/request'}>Connect</a></button>
                    </div>
                ))}
                {this.props.data.length === 0 && <div>
                    <h1>No donors available :(</h1>
                </div>}
            </div>
        )
    }
}

class DonorsFunction extends Component {
    constructor(props) {
        super(props);

        this.onToggleView = this.onToggleView.bind(this);
        this.onChangeBG = this.onChangeBG.bind(this);
        this.onDonorSearch = this.onDonorSearch.bind(this);

        this.state = {
            address: this.props.user.address,
            bloodgroup: this.props.location.data ? this.props.location.data.bloodgroup : this.props.user.bloodgroup,
            data: this.props.location.data ? this.props.location.data.data : [],
            warning: '',
            pos: this.props.location.data ? this.props.location.data.pos : this.props.user.pos,

            view: 'Map',
            donorsview: this.props.location.data ? true : false,

            redirectedview: this.props.location.data ? true : false,
            selectedMarker: false,

            showdonors: true,
            totaldonors: 0,
            selected: true
        }
    }

    fetchData(bg) { /*TODO: ADD LOCATION DEPENDING ON WHERE HE COMES FROM LITERALLY */
        axios.get('/api/blood/' + bg + '&' + this.props.user._id + '&' + this.state.pos.lat + '&' + this.state.pos.lng)
            .then(res => {
                this.setState({ warning: '', donorsview: true, data: res.data })
                axios.get('/api/blood/total/' + bg)
                    .then(res => {
                        this.setState({ totaldonors: res.data })
                    })
                    .catch(err => {
                        this.setState({ warning: "ERR: Couldn't fetch total" })
                        console.log(err)
                    });
            })
            .catch(err => {
                this.setState({ warning: 'ERR: Please Try Again' })
                console.log(err)
            });
    }

    componentDidMount() {
        this.fetchData(this.state.bloodgroup)
        AOS.init({
            duration: 1000
        });
    }

    handleInput(e) {
        this.setState({ address: e.target.value, selected: false })
    }

    onToggleView(e) {
        this.setState({ view: e.target.innerText.split(' ')[0] })
    }

    onChangeBG(e) {
        this.setState({ bloodgroup: e.target.value })
    }


    onDonorSearch(e) {
        e.preventDefault();

        this.setState({ donorsview: false })

        if (!this.state.selected) {
            this.setState({ warning: 'Please select an address from dropdown', showdonors: false, totaldonors: 0 })
            return;
        }

        this.fetchData(this.state.bloodgroup)

    }

    handleClickOnMarker = (marker, event) => {
        this.setState({ selectedMarker: marker })
    }

    render() {
        return (
            <div className="donors">
                {!this.state.redirectedview && <div className="searchpanel">
                    <h1>Connect With Blood Donors in your location</h1>
                    <form onSubmit={this.onDonorSearch} autoComplete="off">
                        <div className="donorwrapper">
                            <div className="selectionwrapper">
                                <div>
                                    <label htmlFor="loc">Location</label>
                                    <Autocomplete
                                        id="loc" name="loc"
                                        apiKey={'AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us'}
                                        onPlaceSelected={(place) => this.setState({ address: place.formatted_address, pos: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }, selected: true })}
                                        onChange={this.handleInput.bind(this)}
                                        placeholder="Select your City"
                                        value={this.state.address}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Blood Group</label>
                                    <select name="bloodgroup" id="bloodgroup" value={this.state.bloodgroup} onChange={this.onChangeBG} required>
                                        <option value="" defaultValue hidden>Select Here</option>
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
                            </div>
                            <div className="warnsearch">
                                <div className="colorize">{this.state.warning}</div>
                                <button type="submit" className="searchbutton">Search</button>
                                {this.state.showdonors && <div>
                                    <h3>Total: {this.state.totaldonors ? (this.state.totaldonors-1) : 0} Donor(s)</h3>
                                    <h3>Donors within 10km radius: {this.state.data.length}</h3>
                                </div>}
                            </div>
                        </div>
                    </form>
                </div>}

                {/*Redirected View*/}
                {this.state.redirectedview && <div className="ty">
                    <h1>Thankyou!</h1><br />
                    <h2>We have recieved your request!</h2>
                    <div className="numdonors">
                        <h1>Searching...</h1>
                        <p className="bold">Blood donors in your area</p>
                        {this.state.data.length > 0 &&
                            <div className="sendingpanel">
                                <div className="msgsent"> {/* TOTAL DONORS SEND SMS AND TEXT*/}
                                    <p><span className="bold"><CountUp start={0} end={this.state.totaldonors ? (this.state.totaldonors-1) : 0} delay={1} duration={1} /></span> Whatsapp Message(s) Sent</p>
                                    <FontAwesomeIcon icon='check-circle' />
                                </div>
                                <div className="msgsent">
                                    <p><span className="bold"><CountUp start={0} end={this.state.totaldonors ? (this.state.totaldonors-1) : 0} delay={1} duration={1} /></span> Text SMS Sent</p>
                                    <div><FontAwesomeIcon icon='check-circle' className="icon" /></div>
                                </div>
                            </div>
                        }
                        {this.state.data.length > 0 && <div>
                            Your request is sent to <span className="bold">{this.state.data.length} blood donor(s)</span> in your area
                                </div>
                        }
                        {this.state.data.length === 0 && <div>
                            <h1 className="nodonors">No donors available!</h1>
                        </div>}
                    </div>
                    {this.state.data.length > 0 && <div>
                        <h1>Connect with {this.state.data.length} Blood Donor(s)</h1>
                    </div>}
                </div>}

                {/* MAIN FUNCTIONALITY */}
                {this.state.donorsview && <div className="donorsview">
                    <div className="selection">
                        <div className={"view " + (this.state.view === 'Map' ? 'activeview' : '')} onClick={this.onToggleView}>Map View</div>
                        <div className={"view " + (this.state.view === 'List' ? 'activeview' : '')} onClick={this.onToggleView}>List View</div>
                    </div>

                    <div className="therealview">
                        {this.state.view === 'Map' &&
                            <MapView
                                defaults={this.state.pos}
                                selectedMarker={this.state.selectedMarker}
                                markers={this.state.data}
                                onClick={this.handleClickOnMarker}
                                onConnect={this.props.requested}
                            />}
                        {this.state.view === 'List' &&
                            <ListView
                                data={this.state.data}
                                pos={this.state.pos}
                                onConnect={this.props.requested}
                            />}
                    </div>
                </div>
                }
            </div>
        )
    }
}

class Donors extends Component {
    render() {
        return (
            this.props.auth ?
                <DonorsFunction user={this.props.user} requested={this.props.requested} location={this.props.location}/> :
                <Redirect to={{ pathname: '/login', state: { from: "donors" } }} />
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

export default connect(mapStateToProps)(Donors)