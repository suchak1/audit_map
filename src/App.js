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
            policies: {},
            ip_addrs: this.updateGeos(ips),
            updates: [],
        };
    }

    addPolicy = (key, entry) => {
        let copy = this.state.policies;
        let logUpdates = this.state.updates;
        const geo = this.ip2geo(entry.ip);

        for(let field in geo) {
            entry[field] = geo[field];
        }
        entry.lat = geo.lat;
        entry.long = geo.long;

        copy[key] = entry;
        logUpdates.push({
            ip: entry.ip,
            access: entry.access,
            email: entry.users,
            file: entry.file,
            location: geo.city +', ' + geo.country,
            key: logUpdates.length
        });

        this.setState(prevState => ({
            policies: copy,
            updates: logUpdates
        }));

    }

    flipAccess = (ip) => {
        let copy = this.state.ip_addrs;
        let logUpdates = this.state.updates;
        const flip = copy[ip]['access'] === 'GRANT' ? 'REVOKE' : 'GRANT';
        copy[ip]['access'] = flip;
        logUpdates.push({
            ip: ip,
            access: flip,
            email: [faker.internet.email()],
            file: faker.system.fileName(),
            key: logUpdates.length
        });
        this.setState(prevState => ({
            ip_addrs: copy,
            updates: logUpdates
        }))
    }

    ip2geo = async (ip) => {
        let entry = {};

        // if (process.env.REACT_APP_DEBUG === "true" || !process.env.REACT_APP_IPSTACK) {
        //     console.log('https://ipapi.co/' + ip + '/json/');
        //     fetch('https://ipapi.co/' + ip + '/json/')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         entry['lat'] = data.latitude;
        //         entry['long'] = data.longitude;
        //         entry['city'] = data.city;
        //         entry['region'] = data.region;
        //         entry['region code'] = data.region_code;
        //         entry['country'] = data.country_name;
        //         entry['country code'] = data.country;
        //     });
        //     console.log(entry);
        //     console.log("ip-api");
        // } else {
            fetch('http://api.ipstack.com/'+ ip +'?access_key=' +
            process.env.REACT_APP_IPSTACK)
            .then(response => response.json())
            .then(data => {
                entry['lat'] = data.latitude;
                entry['long'] = data.longitude;
                entry['city'] = data.city;
                entry['region'] = data.region_name;
                entry['region code'] = data.region_code;
                entry['country'] = data.country_name;
                entry['country code'] = data.country_code;
            });
            console.log(entry);
            console.log('ipstack');
        // }
        return await entry;
    }

    updateGeos = (ips) => {
        let geos = {};
        for (var i in ips) {
            const ip = ips[i];
            const geo = this.ip2geo(ip);
            const entry = {};
            entry.lat = geo.lat;
            entry.long = geo.long;
            geos[ip] = entry;
            geos[ip]['access'] = 'GRANT';
            geos[ip]['ip'] = ip;
        }
        return geos;
    }

    render() {
        console.log(this.state.ip_addrs);
        return (
            <div styles={{fontFamily: "Maven Pro"}}>
                <Map flipAccess = {this.flipAccess}
                    addPolicy = {this.addPolicy}
                    data = {this.state.ip_addrs}/>
                <Log data = {this.state.updates}/></div>
            );
        }
    }

    export default App;
