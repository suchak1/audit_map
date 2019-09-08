import React, {Component} from 'react';
import './Log.css';
// console.log(styles.log);

class Log extends Component {
  state = {
  };

  render() {
    return (
        <div className="log">
          <div className="header">
            <span>
              <b>Audit Map</b>
            </span>
            <span> | </span>
            <span>
              an entry for the Virtru Privacy Engineering Challenge
            </span>
          </div>
          <hr></hr>
          Logs...
          <div class="cursor">
            <input type="text" class="rq-form-element" />
              <i></i>
          </div>
        </div>
    );
  }
}

export default Log;
