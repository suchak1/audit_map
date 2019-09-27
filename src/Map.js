import React, {Component} from 'react';
import MapGL, {Marker, Popup,
  NavigationControl, FullscreenControl} from 'react-map-gl';
import ControlPanel from './ControlPanel';
import Pin from './Pin';
// import PinInfo from './PinInfo';
import { Button } from 'react-bootstrap';

import './Map.css';


const width = window.innerWidth;
const height = window.innerHeight;
const winSize = width * height;
const zoom = winSize < 260000 ?  0 : (winSize < 580000 ? 0.5: 1);

const nav = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px',
}

const fullscreen = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px',
};


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        zoom: zoom
      },
      popupInfo: null,
      data: this.props.data
    };
  }


  _renderCityMarker = (ip, index) => {
    console.log(ip);

    return (
      <Marker key={`marker-${index}`} longitude={ip.long} latitude={ip.lat}>
        <Pin size={20} access={ip['access']} onClick={() => this.setState({popupInfo: ip})} />
      </Marker>
    );
  };

  handleClick = (popupInfo) => {
    const ip = popupInfo['ip'];
    let copy = this.state.data;
    copy[ip]['access'] = this.state.data[ip]['access'] === 'GRANT' ? 'REVOKE' : 'GRANT';
    this.setState({data: copy});
    console.log(ip);
    console.log(this.state.data[ip]['access']);
    //this.state.ip_addrs[]
  }

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo['long']}
          latitude={popupInfo['lat']}
          offsetTop={5}
          closeOnClick={false}
          closeButton={true}
          onClose={() => this.setState({popupInfo: null})}
        >
        <div style={{paddingTop: 10, fontFamily: 'Maven Pro'}}>
          IP Address: {popupInfo['ip']}
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Button
            variant={popupInfo['access'] === 'REVOKE' ? "outline-primary" : "outline-danger"}
            onClick={() => this.handleClick(popupInfo)}
          >
            {popupInfo['access'] === 'REVOKE' ? "GRANT ACCESS 🔵" : "REVOKE ACCESS 🛑"}
          </Button>
        </div>
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

        {console.log(this.state.data)}
        {Object.keys(this.state.data).map((key, index) =>
          this._renderCityMarker(this.state.data[key], key))}
        {this._renderPopup()}


        <div style = {fullscreen}>
          <FullscreenControl />
        </div>

        <div style = {nav}>
          <NavigationControl />
        </div>

        <ControlPanel containerComponent={this.props.containerComponent} />
      </MapGL>
    );
  }
}

export default Map;
