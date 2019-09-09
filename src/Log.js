import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import VirtualizedList from './VirtualizedList';
import './Log.css';

const lines = [
  "POLICY.ACCESSED => POLICY.REVOKED",
  "POLICY.OPENED => POLICY.REVOKED",
  "POLICY.READ_ACCESS => POLICY.REVOKED",
  "POLICY.WRITE_ACCESS => POLICY.REVOKED",
  "POLICY.FETCH => POLICY.REVOKED"]

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
            <span style={{color: "#343332"}}> | </span>
            <span style={{fontSize: "0.85em", color: "dimgray"}}>
              an entry for the Virtru Privacy Engineering Challenge
            </span>
          </div>
          <hr className="hr"></hr>
          <div className="text">Logs...</div>
          <div className="text">hey</div>
          <VirtualizedList>
          Hello world
          </VirtualizedList>
        </div>
    );
  }
}

export default Log;
