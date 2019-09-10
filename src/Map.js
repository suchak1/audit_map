import React, {Component} from 'react';
import ReactMapGL, {NavigationControl} from 'react-map-gl';

const width = window.innerWidth;
const height = window.innerHeight;
const winSize = width * height;
const zoom = winSize < 260000 ?  0 : (winSize < 580000 ? 0.5: 1);
console.log(zoom)

class Map extends Component {
  state = {
    viewport: {
      zoom: zoom
    }
  };

  render() {
    const {viewport} = this.state;
    return (
      <ReactMapGL {...viewport}
        width = "100%"
        height = "65vh"
        attributionControl = {false}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle = 'mapbox://styles/suchak1/ck0ahex6o26ri1co8gmm3ezvr'
        onViewportChange={viewport => this.setState({viewport})}>
        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    );
  }
}

export default Map;
