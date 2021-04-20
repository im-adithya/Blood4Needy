import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  text-align:center;
`;

class AutoComplete extends Component {

    componentDidMount({ map, mapApi } = this.props) {
        const options = {
            // restrict your search to a specific type of result
            type: ['hospitals'],
            // restrict your search to a specific country, or an array of countries
            componentRestrictions: { country: ['in'] },
        };
        this.autoComplete = new mapApi.places.Autocomplete(
            this.searchInput,
            options,
        );
        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
        this.autoComplete.bindTo('bounds', map);
    }

    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.searchInput);
    }

    onPlaceChanged = ({ map, addplace } = this.props) => {
        const place = this.autoComplete.getPlace();

        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(14);
        }

        addplace(place);
        this.setState({ add: place.formatted_address })
        this.searchInput.blur();
    };

    handleInput(e) {
        this.props.addressUpdate(e.target.value)
    }

    render() {
        return (
            <Wrapper>

                <label htmlFor="hospital" style={{ textAlign: 'left' }} autoComplete="chrome-off">Hospital <span className="hindi">(अस्पताल)</span>&nbsp;</label>
                <input
                    className="search-input"
                    ref={(ref) => {
                        this.searchInput = ref;
                    }}
                    type="text"
                    placeholder="Search Hospital Here"
                    style={{ borderColor: 'none', backgroundColor: 'none' }}
                    value={this.props.value}
                    onChange={this.handleInput.bind(this)}
                    required
                />
            </Wrapper>
        );
    }
}

export default AutoComplete;