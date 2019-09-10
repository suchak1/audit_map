import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Map from './Map';
import Log from './Log';
import * as serviceWorker from './serviceWorker';
import faker from 'faker';
require('dotenv').config();
require("typeface-ubuntu-mono");

function createRecord(count) {
  let records = [];

  for (let i = 0; i < count; i++) {
    records.push({
      username: faker.internet.userName(),
      email: faker.internet.email()
    });
  }
  return records;
}

const records = createRecord(100);

ReactDOM.render(<><Map /><Log data={records} /></>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
