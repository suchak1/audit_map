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
var ips2 = ['69.243.229.184'];
var ip_addrs2 = {};

class App extends Component {
  constructor(props) {
    super(props);

    this.setState = {ips: ips2, ip_addrs: ip_addrs2};
  }

  componentDidMount() {
    var ip = '69.243.229.184';
    fetch('http://api.ipstack.com/'+ ip +'?access_key=' +
      process.env.REACT_APP_IPSTACK)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
          var copy = {};
          copy[ip] = {};
          copy[ip]['lat'] = myJson.latitude;
          copy[ip]['long'] = myJson.longitude;
          console.log(copy);
          console.log(copy[ip]['lat']);
          console.log(copy[ip]['long']);
          console.log(myJson.city);
          //this.setState({ ip_addrs: copy});
        });
  }

  render() {
    return (<><Map /><Log data = {records}/></>
    );
  }
}

export default App;
