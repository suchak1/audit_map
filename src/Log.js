import React, {Component} from 'react';
import {List, AutoSizer} from "react-virtualized";
import './Log.css';

const rowHeight = 30;

class Log extends Component {
  state = {
    status: "waiting",
  }

  padWord = (str, padNum) => {
    if (str.length <= 3) {
      str = '';
    }

    if(str.length === padNum) {
      return str;
    }
    else if(str.length < padNum) {
      return str.padEnd(padNum, '.');
    }
    return str.substring(0, padNum-3)+'...';
  };

  rowRenderer = ({ index, isScrolling, key, style }) => {
    const accessColor = this.props.data[index].access === 'GRANT' ? 'lime' : 'red';
    return (
      <div key={key} style={style}>
      ACTION: <span style={{color: accessColor}}>{this.props.data[index].access.padEnd(9, '.')}</span> decrypt
      &nbsp;&nbsp;&nbsp;&nbsp;USER: <span style={{color: "lightslategray"}}>{this.padWord(this.props.data[index].email, 25)}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;FILE: <span style={{color: "peachpuff"}}>{this.padWord(this.props.data[index].file, 25)}</span>
      </div>
    );
  };

  binary = (str) => {
    let spans = [];
    for(let i = 0; i < str.length; i++)
    {
      const randColor = Math.random() > 0.3 ? '#4481F8' : 'dimgray';
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
          <div style={{color: '#4481F8', textAlign:"center", fontFamily: 'Ubuntu Mono'}}>
            {"Logs_"}
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
                  overscanRowCount={100}
                />
              )}
            </AutoSizer>
          </div>
          <div style=
          {{fontSize: "0.7em", textAlign: "right", paddingRight: "1em"}}>
            {"powered by"}
            <span style={{color: '#4481F8'}}>
              &nbsp;
              {
                <a href=
                  "https://developer.virtru.com/docs/getting-started-node-js"
                >
                  virtru-sdk
                </a>}
            </span>
            <span>
              &nbsp;and&nbsp;
            </span>
            <span style={{color: "dimgray"}}>
              <a href="https://uber.github.io/react-map-gl/"> react-map-gl </a>
            </span>
          </div>
        </div>
    );
  }
}

export default Log;
