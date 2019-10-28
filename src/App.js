import React, {Component} from 'react';
import Map from './Map';
import './Map.css';
import Log from './Log';
import faker from 'faker';
import FileSaver from 'file-saver';
import history from './history';

// const ips = ['69.243.229.184', '96.150.51.147'];


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            policies: this.updateGeos(history.policies),
            ip_addrs: history.ip_addrs,
            updates: history.updates,
        };
    }

    addPolicy = (key, entry) => {
        let copy = this.state.policies;
        let logUpdates = this.state.updates;
        const geo = this.ip2geo(entry.ip);

        for(var field in geo) {
            console.log(field);
            entry[field] = geo[field];
        }

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

    writeFile = () => {
        const data = JSON.stringify(this.state, null, 4);
        const blob = new Blob([data], {type: 'application/json'});
        console.log(blob);
        FileSaver.saveAs(blob, 'history.json');
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

    ip2geo = (ip) => {
        let entry = {};

        if (process.env.REACT_APP_DEBUG === "true" || !process.env.REACT_APP_IPSTACK) {
            fetch('https://ipapi.co/' + ip + '/json/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                entry['lat'] = data.latitude;
                entry['long'] = data.longitude;
                entry['city'] = data.city;
                entry['region'] = data.region;
                entry['region code'] = data.region_code;
                entry['country'] = data.country_name;
                entry['country code'] = data.country;
            });

        } else {
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
        }
        console.log(entry);
        return entry;
    }

    updateGeos = (policies) => {
        for(var key in policies) {
            if('ip' in policies[key] && !('loc' in policies[key])) {
                const ip = policies[key]['ip'];
                const loc = this.ip2geo(ip);
                policies[key]['loc'] = loc;
            }
        }
        return policies;
    }

    render() {
        console.log(this.state.ip_addrs);
        return (
            <div styles={{fontFamily: "Maven Pro"}}>
                <Map flipAccess = {this.flipAccess}
                    addPolicy = {this.addPolicy}
                    writeFile = {this.writeFile}
                    ip2geo = {this.ip2geo}
                    data = {this.state.ip_addrs}/>
                <Log data = {this.state.updates} writeFile = {this.writeFile}/> </div>
            );
        }
    }

    export default App;
