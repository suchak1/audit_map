import React, {Component} from 'react';
import Map from './Map';
import './Map.css';
import Log from './Log';
import faker from 'faker';

var ips = ['69.243.229.184', '96.150.51.147'];


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ip_addrs: this.updateGeos(ips),
      updates: []
    };
  }

  flipAccess = (ip) => {
    let copy = this.state.ip_addrs;
    let logUpdates = this.state.updates;
    const flip = copy[ip]['access'] === 'GRANT' ? 'REVOKE' : 'GRANT';
    copy[ip]['access'] = flip;
    logUpdates.push({
      ip: ip,
      access: flip,
      email: faker.internet.email(),
      file: faker.system.fileName(),
      key: logUpdates.length
    });
    this.setState(prevState => ({
      ip_addrs: copy,
      updates: logUpdates
    }))
  }

  ip2geo = (ip) => {
    if (process.env.REACT_APP_DEBUG === "true") {
      return {
        'lat': Number(faker.address.latitude()),
        'long': Number(faker.address.longitude())
      };
    } else {
      let entry = {};

      fetch('http://api.ipstack.com/'+ ip +'?access_key=' +
        process.env.REACT_APP_IPSTACK)
          .then(response => response.json())
          .then(data => {
            entry['lat'] = data.latitude;
            entry['long'] = data.longitude;
          });

      return entry;
    }
  }

  updateGeos = (ips) => {
    let geos = {};
    for (var i in ips) {
      const ip = ips[i];
      const entry = this.ip2geo(ip);
      // console.log(entry);
      geos[ip] = entry;
      geos[ip]['access'] = 'GRANT';
      geos[ip]['ip'] = ip;
    }
    return geos;
  }

  render() {
    console.log(this.state.ip_addrs);
    return (<><Map flipAccess = {this.flipAccess} data = {this.state.ip_addrs}/><Log data = {this.state.updates}/></>
    );
  }
}

export default App;
