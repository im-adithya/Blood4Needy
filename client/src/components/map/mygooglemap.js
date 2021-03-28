import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMapReact from 'google-map-react';

import styled from 'styled-components';

import AutoComplete from './autocomplete';
import Marker from './marker';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

class MyGoogleMap extends Component {


    state = {
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        places: [],
        center: [this.props.user.pos.lat, this.props.user.pos.lng],
        zoom: 14,
        address: '',
        draggable: true,
        lat: this.props.user.pos.lat,
        lng: this.props.user.pos.lng
    };

    componentDidMount() {
        //this.setCurrentLocation();
    }


    onMarkerInteraction = (childKey, childProps, mouse) => {
        this.setState({
            draggable: false,
            lat: mouse.lat,
            lng: mouse.lng
        });
    }
    onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        this.setState({ draggable: true });
        this._generateAddress();
    }

    _onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });

    }

    _onClick = (value) => {
        this.setState({
            lat: value.lat,
            lng: value.lng
        });
        this._generateAddressForClick(value.lat,value.lng);
    }

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });

        this._generateAddress();
    };

    addPlace = (place) => {
        this.setState({
            places: [place],
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
        this._generateAddress()
    };

    _generateAddress() {
        const {
            mapApi
        } = this.state;

        const geocoder = new mapApi.Geocoder();
        geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 14;
                    this.setState({ address: results[0].formatted_address });
                    this.props.addressUpdate(results[0].formatted_address);
                    this.props.locUpdate({ lat: this.state.lat, lng: this.state.lng });
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
    }
    
    _generateAddressForClick(lat,lng) {
        const {
            mapApi
        } = this.state;

        const geocoder = new mapApi.Geocoder();
        geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 14;
                    this.setState({ address: results[0].formatted_address });
                    this.props.addressUpdate(results[0].formatted_address);
                    this.props.locUpdate({ lat: lat, lng: lng });
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
    }

    // Get Current Location Coordinates
    /*setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }*/

    handleAddress(x){
        this.setState({address: x})
    }

    render() {
        const {
            /*places,*/ mapApiLoaded, mapInstance, mapApi,
        } = this.state;
        return (
            <Wrapper>
                {mapApiLoaded && (
                    <div>
                        <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} value={this.state.address} addressUpdate={this.handleAddress.bind(this)}/>
                    </div>
                )}
                <GoogleMapReact
                    center={this.state.center}
                    zoom={this.state.zoom}
                    draggable={this.state.draggable}
                    onChange={this._onChange}
                    onChildMouseDown={this.onMarkerInteraction}
                    onChildMouseUp={this.onMarkerInteractionMouseUp}
                    onChildMouseMove={this.onMarkerInteraction}
                    onChildClick={() => console.log('child click')}
                    onClick={this._onClick}
                    bootstrapURLKeys={{
                        key: 'AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us',
                        libraries: ['places', 'geometry'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                >
                    <Marker
                        text={this.state.address}
                        lat={this.state.lat}
                        lng={this.state.lng}
                    />
                </GoogleMapReact>
            </Wrapper >
        );
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      user: state.user
    }
}

export default connect(mapStateToProps)(MyGoogleMap)