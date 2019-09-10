import React, {Component} from 'react';
import {List, AutoSizer} from "react-virtualized";
import './Log.css';

const rowHeight = 20;

class Log extends Component {
  state = {
    status: "waiting",
  }
  rowRenderer = ({ index, isScrolling, key, style }) => {
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
              <b>{"A̩̯͔̞̙̮̰͗͑͋̎̒̓̚ͅu̖͖̝̟͎̦̦̞͈̤̐̑̆̈̆̂̀̊͒̄̃͒ͅd̳͍̮̖͌̅́̋ì̗̣̥̜̯̫̰̰͛͌̉͐̔̇́̊̈́͂́t͙̘̭̫͐̏̃͑͊̌̾̔̚ͅ M̫̟̮̣͉̭̗̳̲͉̌̌̑͋̽͋̀͗͐̾̚̚ͅà͙͎̲̲̈́̄́͑̂̆̄p͎͉̣̱̳̗͉̬̋̀͒̓̽̿̊ͅ > "}</b>
            </span>
            <span style={{fontSize: "0.7em", color: "dimgray"}}>
              &nbsp;&nbsp;an entry for the Virtru Privacy Engineering Challenge
            </span>
          </div>
          <div >
            <div style={{textAlign:"center", fontFamily: 'Ubuntu Mono'}}>
              {"<Logs>"} <span className="waiting"> </span>
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
