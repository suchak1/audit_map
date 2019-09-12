import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup, NavigationControl, FullscreenControl} from 'react-map-gl';

import ControlPanel from './ControlPanel';
import Pin from './Pin';
import PinInfo from './PinInfo';

import CITIES from './cities.json';

const TOKEN = process.env.REACT_APP_MAPBOX; // Set your mapbox token here

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const width = window.innerWidth;
const height = window.innerHeight;
const winSize = width * height;
const zoom = winSize < 260000 ?  0 : (winSize < 580000 ? 0.5: 1);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        zoom: zoom,
      },
      popupInfo: null
    };
  }

  _updateViewport = viewport => {
    this.setState({viewport});
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
        width="100%"
        height="65vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        {CITIES.map(this._renderCityMarker)}

        {this._renderPopup()}

        <div className="fullscreen" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>

        <ControlPanel containerComponent={this.props.containerComponent} />
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
