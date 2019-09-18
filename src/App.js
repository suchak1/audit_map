import React, {Component} from 'react';
import Map from './Map';
import './Map.css';
import Log from './Log';
import faker from 'faker';

var ips = ['69.243.229.184', '96.150.51.147'];

function createRecord(count) {
  let records = [];

  for (let i = 0; i < count; i++) {
    records.push({
      email: faker.internet.email(),
      file: faker.system.fileName(),
      access: Math.random() > 0.3 ? 'REVOKE' : 'GRANT'
    });
  }
  return records;
}

const records = createRecord(100);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {ip_addrs: this.updateGeos(ips)};
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
    }
    return geos;
  }

  render() {
    console.log(this.state.ip_addrs);
    return (<><Map data = {this.state.ip_addrs}/><Log data = {records}/></>
    );
  }
}

export default App;
