import React, {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    const mapbox = process.env.REACT_APP_MAPBOX;
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={mapbox}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
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

export default App;
