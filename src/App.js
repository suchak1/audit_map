import React, {Component} from 'react';
import Map from './Map';
import './Map.css';
import Log from './Log';
import faker from 'faker';


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

  async ip2geo (ip) {
    const result = await fetch('http://api.ipstack.com/'+ ip +'?access_key=' +
      process.env.REACT_APP_IPSTACK)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          return data;
        });

    const entry = {
      'lat': result.latitude,
      'long': result.longitude
    }
    return entry;
  }

  componentDidMount() {
    var ips = ['69.243.229.184'];
    for (var i in ips) {
      var ip = ips[i];
      var entry = this.ip2geo(ip);
      console.log(entry);
      this.setState({
        ...this.state,
        ip_addrs: {
          ...this.state.ip_addrs,
          [ip]: entry
        }
      });
    }

    console.log(this.state.ip_addrs);

  }

  render() {
    // console.log(this.state.ip_addrs);
    return (<><Map data = {this.state.ip_addrs}/><Log data = {records}/></>
    );
  }
}

export default App;
