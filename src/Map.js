import React, {Component} from 'react';
import MapGL, {Marker, Popup,
  NavigationControl, FullscreenControl} from 'react-map-gl';
import ControlPanel from './ControlPanel';
import Pin from './Pin';
import PinInfo from './PinInfo';

import CITIES from './cities.json';


const width = window.innerWidth;
const height = window.innerHeight;
const winSize = width * height;
const zoom = winSize < 260000 ?  0 : (winSize < 580000 ? 0.5: 1);


class Map extends Component {
  state = {
    viewport: {
      zoom: zoom
    },
    popupInfo: null
  };

  _renderCityMarker = (city, index) => {
    return (
      <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
        <Pin size={20} onClick={() => this.setState({popupInfo: city})} />
      </Marker>
    );
  };

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <PinInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const {viewport} = this.state;
    return (
      <MapGL
        {...viewport}
        width = "100%"
        height = "65vh"
        attributionControl = {false}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle = "mapbox://styles/mapbox/dark-v9"
        onViewportChange={viewport => this.setState({viewport})}
      >

        {CITIES.map(this._renderCityMarker)}
        {this._renderPopup()}


        <div className = "fullscreen">
          <FullscreenControl />
        </div>

        <div className = "nav">
          <NavigationControl />
        </div>

        <ControlPanel containerComponent={this.props.containerComponent} />
      </MapGL>
    );
  }
}

export default Map;
