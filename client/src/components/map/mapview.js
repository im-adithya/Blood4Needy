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

var min = .999999;
var max = 1.000001;

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
    return (
        <GoogleMap defaultZoom={16} defaultCenter={props.defaults}>
            {props.markers.map((marker, index) => {
                const onClick = props.onClick.bind(this, marker)
                let popup = false;
                return (
                    <Marker
                        /*icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                        }}*/
                        key={'marker' + index}
                        label={{
                            text: (index + 1).toString(),
                            fontFamily: "Arial",
                            fontSize: "14px",
                        }}
                        onClick={onClick}
                        position={{ lat: marker.location.coordinates[1] * ((index+1)/props.markers.length * (max - min) + min), lng: marker.location.coordinates[0] * ((index+1)/props.markers.length * (max - min) + min) }}
                    >
                        {props.selectedMarker === marker &&
                            <InfoWindow>
                                <div className="mapitem">
                                    <div className="mapitem-1">
                                        <img src={marker.user.gender === "male" ? male : female} alt="user" className="mapitemimg" />
                                        <div className="mapitem-1-1">
                                            <h3>{marker.user._id === props.user._id ? "You" : marker.name}</h3>
                                            {(marker.user._id !== props.user._id) && !props.alldonors && <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']} style={{ color: '#F42929' }} /> {(getDistance({ lat: marker.location.coordinates[1], lng: marker.location.coordinates[0] }, props.defaults) / 1000).toFixed(2)} km Away</p>}
                                        </div>
                                    </div>
                                    {(marker.user._id !== props.user._id) && <div className="mapitem-2">
                                        <h1 style={{ color: 'black' }}>{marker.bloodgroup}</h1>
                                        <button className="connectbutton">Contact</button>
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
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us&libraries=geometry&callback=initMap"}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `80vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}