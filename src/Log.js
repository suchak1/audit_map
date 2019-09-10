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

  binary = (str) => {
    let spans = [];
    for(let i = 0; i < str.length; i++)
    {
      const randColor = Math.random()>0.3 ? '#4481F8' : 'dimgray';
      spans.push(
        <span style={{fontWeight:"bold", color: randColor}}>
          {str[i]}
        </span>);
    }
    return spans;
  };


  render() {
    return (
        <div className="log">
          <div className="header">
              <b>{this.binary("A̩̯͔̞̙̮̰͗͋̎̒̓̚ͅu̖͖̝̟͎̦̦̞͈̤̐̑̆̈̆̂̀̊͒̄̃͒ͅd̳͍̮̖͌̅́̋ì̗̣̥̜̯̫̰̰͛͌̉͐̔̇́̊̈́͂́t͙̘̭̫͐̏̃͑͊̌̾̔̚ͅ M̫̟̮̣͉̭̗̳̲͉̌̌̑͋̽͋̀͗͐̾̚̚ͅà͙͎̲̲̈́̄́͑̂̆̄p͎͉̣̱̳̗͉̬̋̀͒̓̽̿̊ͅ > ")}</b>
            <span className="virtru">
              >
            </span>
            <span style={{fontSize: "0.8em", color: "dimgray"}}>
              &nbsp;&nbsp;an entry for the Virtru Privacy Engineering Challenge
            </span>
          </div>
          <div style={{textAlign:"center", fontFamily: 'Ubuntu Mono'}}>
            {"Logs_"}
          </div>
          <span className="waiting"> </span>
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
