import React, {Component} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import logo from './logo.svg';
import './Map.css';

class Map extends Component {
  state = {
    viewport: {
    },
  };

  onViewportChange = viewport => {
    const {width, height, ...etc} = viewport
    this.setState({viewport: etc})
  }

  render() {
    const {
      viewport,
    } = this.state
    return (
        <ReactMapGL {...viewport}
          width='100vw'
          height='75vh'
          zoom={1}
          mapStyle='mapbox://styles/suchak1/ck0ahex6o26ri1co8gmm3ezvr'
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={viewport => this.onViewportChange(viewport)}>
          <div style={{position: 'absolute', right: 0}}>
            <NavigationControl />
          </div>
        </ReactMapGL>
    );
  }
}
// function App() {
//   const virtru = process.env.REACT_APP_VIRTRU;
//   const mapbox = process.env.REACT_APP_MAPBOX;
//   console.log(virtru);
//   console.log(mapbox)
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Map;
