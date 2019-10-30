import React, {Component} from 'react';
import Virtru from 'virtru-sdk';
import FileSaver from 'file-saver';
import history from './history';
import Log from './Log';
import Map from './Map';
import './Map.css';


class App extends Component {
    constructor(props) {
        super(props);

        const email = process.env.REACT_APP_EMAIL;
        if(!Virtru.Auth.isLoggedIn({email: email})) {
            Virtru.Auth.loginWithGoogle({email: email, redirectUrl: "http://localhost:3000/"});
        }
        const client = new Virtru.Client({email});


        this.state = {
            policies: this.updatePolicies(history.policies),
            log: this.updateLog(history.log),
            client: client
        };
    }

    addPolicy = (key, entry) => {
        let copy = this.state.policies;
        let updates = this.state.log;
        const geo = this.ip2geo(entry.ip);

        entry['loc'] = geo;
        copy[key] = entry;
        updates.push({
            ip: entry.ip,
            access: entry.access,
            email: entry.users,
            file: entry.file,
            key: key
        });

        this.setState(prevState => ({
            policies: copy,
            log: updates
        }));
    }

    writeFile = () => {
        const data = JSON.stringify(this.state, null, 4);
        const blob = new Blob([data], {type: 'application/json'});
        console.log(blob);
        FileSaver.saveAs(blob, 'history.json');
    }

    flipVirtru = async(access, policyId)  => {
        console.log(policyId);
        const policy = await this.state.client.fetchPolicy(policyId);
        const users = this.state.policies[policyId]['users'];

        const updatedPolicy = access === 'GRANT' ?
            policy.builder().addUsersWithAccess(users).build() :
            policy.builder().removeUsersWithAccess(users).build();

        await this.state.client.updatePolicy(updatedPolicy);
        console.log("SUCCESS");
    }

    flipAccess = (key) => {
        let copy = this.state.policies;
        let updates = this.state.log;
        const flip = copy[key]['access'] === 'GRANT' ? 'REVOKE' : 'GRANT';
        copy[key]['access'] = flip;

        this.flipVirtru(flip, key);

        updates.push({
            ip: copy[key]['ip'],
            access: flip,
            email: copy[key]['users'],
            file: copy[key]['file'],
            loc: copy[key]['loc'],
            key: key
        });
        this.setState(prevState => ({
            policies: copy,
            updates: updates
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

    updatePolicies = (policies) => {
        for(var key in policies) {
            if('ip' in policies[key] &&
            !!policies[key]['ip'] &&
            (!('loc' in policies[key]) || !policies[key]['loc']['lat'])) {
                const ip = policies[key]['ip'];
                const loc = this.ip2geo(ip);
                policies[key]['loc'] = loc;
            }
        }
        return policies;
    }

    updateLog = (log) => {
        for(var idx in log) {
            let entry = log[idx];
            if('ip' in entry &&
            !!entry['ip'] &&
            !('loc' in entry)) {
                const policies = history.policies;
                if('loc' in policies[entry['key']] && !!policies[entry['key']]['loc']['lat']) {
                    entry['loc'] = policies[entry['key']]['loc'];
                } else {
                    const ip = entry['ip'];
                    const loc = this.ip2geo(ip);
                    entry['loc'] = loc;
                }
                log[idx] = entry;
            }
        }
        return log
    }

    render() {
        console.log(this.state.policies);
        return (
            <div styles={{fontFamily: "Maven Pro"}}>
                <Map flipAccess = {this.flipAccess}
                    addPolicy = {this.addPolicy}
                    writeFile = {this.writeFile}
                    ip2geo = {this.ip2geo}
                    data = {this.state.policies}
                    client = {this.state.client}/>
                <Log data = {this.state.log} writeFile = {this.writeFile}/> </div>
            );
        }
    }

    export default App;
