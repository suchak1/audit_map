import React, {Component} from 'react';
import ReactMapGL, {NavigationControl} from 'react-map-gl';

class Map extends Component {
  state = {
    viewport: {
      zoom: 1
    }
  };

  render() {
    const {viewport} = this.state;
    return (
      <ReactMapGL {...viewport}
        width = "100vw"
        height = "75vh"
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
