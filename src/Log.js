import React, {Component} from 'react';
import {List, AutoSizer} from "react-virtualized";
import VirtualizedList from './VirtualizedList';
import {sizing} from '@material-ui/system';
import './Log.css';

const lines = [
  "POLICY.ACCESSED => POLICY.REVOKED",
  "POLICY.OPENED => POLICY.REVOKED",
  "POLICY.READ_ACCESS => POLICY.REVOKED",
  "POLICY.WRITE_ACCESS => POLICY.REVOKED",
  "POLICY.FETCH => POLICY.REVOKED"]

const rowHeight = 20;

class Log extends Component {
  state = {
    status: "waiting",
  }
  rowRenderer = ({ index, isScrolling, key, style }) => {
    this.state.status = isScrolling ?"working":"waiting";
    return (
      <div key={key} style={style}>
        <span>{this.props.data[index].username}</span>
        <span>{this.props.data[index].email}</span>
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
            <span style={{fontSize: "0.85em", color: "dimgray"}}>
              an entry for the Virtru Privacy Engineering Challenge
            </span>
          </div>
          <div >
            <div style={{textAlign:"center", fontFamily: 'Ubuntu Mono'}}>
              {"<Logs>"}
            </div>
          </div>
        <div className="list">
        <AutoSizer>
          {({height, width}) => (
            <List
              rowCount={this.props.data.length}
              width={width}
              height={height}
              rowHeight={rowHeight}
              rowRenderer={this.rowRenderer}
              overscanRowCount={3}
            />
          )}
        </AutoSizer>
        </div>
        </div>
    );
  }
}

export default Log;
