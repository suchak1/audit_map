if(process.argv.length < 5) {
    console.error(
        'Only ' + process.argv.length + ' args provided. Injection requires at least 5.'
    );
    throw 'Not enough arguments provided.';
} else {
    const cmd = process.argv[2];
    if(cmd === 'grabber') {
        
    } else if(cmd === 'ip_new') {

    } else {
        console.error(
            "Only 'grabber' and 'ip_new' commands are valid. You typed '" + cmd + "'."
        );
        throw 'Invalid command provided.';
    }
}
