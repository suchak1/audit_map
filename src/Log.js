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
            <span style={{color: "#4481F8"}}>
              <b>Audit Map</b>
            </span>
            <span> | </span>
            <span>
              an entry for the Virtru Privacy Engineering Challenge
            </span>
          </div>
          <hr className="hr"></hr>
          <div className="text">Logs...</div>
          <div className="text">hey</div>
        </div>
    );
  }
}

export default Log;
