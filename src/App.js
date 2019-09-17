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

    this.state = {ip_addrs: {}};
  }

ip2geo = (ip) => {
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

  componentDidMount() {
    for (var i in ips) {
      var ip = ips[i];
      var entry = this.ip2geo(ip);
      // console.log(entry);
      let copy = this.state.ip_addrs;
      copy[ip] = entry;
      this.setState({
        ip_addrs: copy
      });
    }
  }

  render() {
    console.log(this.state.ip_addrs);
    return (<><Map data = {this.state.ip_addrs}/><Log data = {records}/></>
    );
  }
}

export default App;
