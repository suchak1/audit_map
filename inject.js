// Injection

if(process.argv.length < 5) {
    console.error(
        'Only ' + process.argv.length + ' args provided. Injection requires at least 5.'
    );
    throw 'Not enough arguments provided.';
} else {
    const fs = require('fs');
    const history = require("./src/history.json");
    const cmd = process.argv[2];

    console.log(history);
    if(cmd === 'grabber') {
        const link = process.argv[3];
        const filePath = process.argv[4];

    } else if(cmd === 'new_ip') {
        const policyId = process.argv[3];
        const address = process.argv[4];

        history['policies'][policyId]['ip'] = address;
        history['policies'][policyId]['loc'] = undefined;
        const data = JSON.stringify(history, null, 4);
        fs.writeFile('./src/history.json', data, (err) => {
            if(err) throw err;
            console.log('New IP address (' + address + ') successfully injected for policy ' + policyId + '.');
        })
    } else {
        console.error(
            "Only 'grabber' and 'ip_new' commands are valid. You typed '" + cmd + "'."
        );
        throw 'Invalid command provided.';
    }
}


// node injection.js grabber link file
//  0       1           2      3   4            total length: 5

// node injection.js ip_new policyId ip_address
//  0       1           2       3       4       total length: 5
