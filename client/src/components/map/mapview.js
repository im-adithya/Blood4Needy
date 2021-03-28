import React, { Component } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps"
import { compose } from "recompose";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDistance } from 'geolib';
import male from '../../assets/male-user.png';
import female from '../../assets/female-user.png';
import markerself from '../../assets/marker-self-1.png';
import marker1 from '../../assets/marker-01.png';
import marker2 from '../../assets/marker-02.png';
import marker3 from '../../assets/marker-03.png';
import marker4 from '../../assets/marker-04.png';
import marker5 from '../../assets/marker-05.png';
import marker6 from '../../assets/marker-06.png';
import marker7 from '../../assets/marker-07.png';
import marker8 from '../../assets/marker-08.png';
import { WhatsappIcon } from "react-share";
var min = .999999;
var max = 1.000001;

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
    return (
        <GoogleMap defaultZoom={13} defaultCenter={props.defaults}>
            {props.markers.map((marker, index) => {
                const onClick = props.onClick.bind(this, marker)
                function iconspecifier(bg) {
                    switch (bg) {
                        case 'O+':
                            return marker1
                        case 'O-':
                            return marker2
                        case 'A+':
                            return marker3
                        case 'A-':
                            return marker4
                        case 'B+':
                            return marker5
                        case 'B-':
                            return marker6
                        case 'AB+':
                            return marker7
                        case 'AB-':
                            return marker8

                        default:
                            return markerself
                    }
                }
                return (
                    <Marker
                        icon={{
                            url: (marker.user._id !== props.user._id) ? iconspecifier(marker.bloodgroup) : iconspecifier(),
                            scaledSize: (marker.user._id !== props.user._id) ? new window.google.maps.Size(30, 55) : new window.google.maps.Size(40, 58),
                        }}
                        key={'marker' + index}
                        /*label={{
                            text: (marker.user._id !== props.user._id) ? marker.bloodgroup : ' ',
                            position: 'absolute',
                            marginBottom: '2px',
                            fontFamily: "Arial",
                            fontSize:  (marker.user._id !== props.user._id) ? "12px" : "16px",
                            color: 'white',
                            fontWeight: (marker.user._id !== props.user._id) ? 'normal' : 'bold'
                        }}*/
                        onClick={onClick}
                        position={{ lat: marker.location.coordinates[1] * ((index + 1) / props.markers.length * (max - min) + min), lng: marker.location.coordinates[0] * ((index + 1) / props.markers.length * (max - min) + min) }}
                    >
                        {props.selectedMarker === marker && marker.user._id !== props.user._id &&
                            <InfoWindow>
                                <div className="mapitem">
                                    <div className="cross" onClick={onClick}>
                                        <FontAwesomeIcon icon='times' />
                                    </div>
                                    <div className="mapitem-1">
                                        <img src={marker.user.gender === "male" ? male : female} alt="user" className="mapitemimg" />
                                        <div className="mapitem-1-1">
                                            <h3>{marker.user._id === props.user._id ? "You" : marker.name}</h3>
                                            {(marker.user._id !== props.user._id) && !props.alldonors && <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']} style={{ color: '#F42929' }} /> {(getDistance({ lat: marker.location.coordinates[1], lng: marker.location.coordinates[0] }, props.defaults) / 1000).toFixed(2)} km Away</p>}
                                        </div>
                                    </div>
                                    {(marker.user._id !== props.user._id) && <div className="mapitem-2">
                                        <h1 style={{ color: 'black' }}>{marker.bloodgroup}</h1>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <button className="callbtn" style={{ width: '100px' }}><a href={props.requested ? 'tel:+91' + marker.user.phone : '/request'} style={{ color: 'white' }}>Contact</a></button>
                                            <a href={props.requested ? 'https://wa.me/91' + marker.user.phone : 'request'} style={{ color: 'white' }}><WhatsappIcon size={35} round /></a>
                                        </div>
                                    </div>}
                                </div>
                            </InfoWindow>}
                    </Marker>
                )
            })}
        </GoogleMap>
    )
})


export default class MapView extends Component {
    render() {
        return (
            <div style={{ marginTop: '2.5%' }}>
                <MapWithAMarker
                    user={this.props.user}
                    alldonors={this.props.alldonors}
                    defaults={this.props.defaults}
                    selectedMarker={this.props.selectedMarker}
                    markers={this.props.markers}
                    onClick={this.props.onClick}
                    requested={this.props.requested}
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us&libraries=geometry&libraries=places&callback=initMap"}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `80vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}