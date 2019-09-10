import React, {Component} from 'react';
import {List, AutoSizer} from "react-virtualized";
import './Log.css';

const lines = [
  "POLICY.ACCESSED => POLICY.REVOKED",
  "POLICY.OPENED => POLICY.REVOKED",
  "POLICY.READ_ACCESS => POLICY.REVOKED",
  "POLICY.WRITE_ACCESS => POLICY.REVOKED",
  "POLICY.FETCH => POLICY.REVOKED"]

const height = 100;
const rowHeight = 40;
const width = 200;

class Log extends Component {
  rowRenderer = ({ index, isScrolling, key, style }) => {
    return (
      <div key={key} style={style}>
        <div>{this.props.data[index].username}</div>
        <div>{this.props.data[index].email}</div>
      </div>
    );
  };

  render() {
    return (
        <div className="log">
          <div className="header">
            <span style={{color: "#4481F8"}}>
              <b>Audit Map</b>
            </span>
            <span style={{color: "#343332"}}> | </span>
            <span style={{fontSize: "0.85em", color: "dimgray"}}>
              an entry for the Virtru Privacy Engineering Challenge
            </span>
          </div>
          <hr className="hr"></hr>
          <div className="text">
            Logs
            <hr className="hr"></hr>
            <List
              rowCount={this.props.data.length}
              width={width}
              height={height}
              rowHeight={rowHeight}
              rowRenderer={this.rowRenderer}
              overscanRowCount={3}
            />
        </div>

        </div>
    );
  }
}

export default Log;
