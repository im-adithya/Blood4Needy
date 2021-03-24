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

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

    return (
        <GoogleMap defaultZoom={8} defaultCenter={props.defaults}>
            {props.markers.map((marker,index) => {
                const onClick = props.onClick.bind(this, marker)
                return (
                    <Marker
                        key={'marker'+index}
                        onClick={onClick}
                        position={{ lat: marker.location.coordinates[1], lng: marker.location.coordinates[0] }}
                    >
                        {props.selectedMarker === marker &&
                            <InfoWindow>
                                <div className="mapitem">
                                    <div className="mapitem-1">
                                        <img src="https://www.vhv.rs/dpng/d/408-4087421_person-svg-circle-icon-picture-charing-cross-tube.png" alt="user" className="mapitemimg" />
                                        <div className="mapitem-1-1">
                                            <h3>{marker.name}</h3>
                                            <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']} style={{ color: '#F42929' }} /> {(getDistance({ lat: marker.location.coordinates[1], lng: marker.location.coordinates[0] }, props.defaults) / 1000).toFixed(2)} km Away</p>
                                        </div>
                                    </div>
                                    <div className="mapitem-2">
                                        <h1 style={{ color: 'black' }}>{marker.bloodgroup}</h1>
                                        <button className="connectbutton"><a href={props.onConnect ? 'ivrs' : '/request'}>Connect</a></button>
                                    </div>
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
                    defaults={this.props.defaults}
                    selectedMarker={this.props.selectedMarker}
                    markers={this.props.markers}
                    onClick={this.props.onClick}
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us&libraries=geometry&callback=initMap"}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}