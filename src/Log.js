import React, {Component} from 'react';
import {List, AutoSizer} from "react-virtualized";
import { Button } from 'react-bootstrap';

import './Log.css';

const rowHeight = 30;

class Log extends Component {

    padWord = (str, padNum) => {
        if (str.length <= 3) {
            str = '';
        }

        if(str.length === padNum) {
            return str;
        }
        else if(str.length < padNum) {
            return str.padEnd(padNum, ' ');
        }
        return str.substring(0, padNum-3)+'...';
    };

    rowRenderer = ({ index, isScrolling, key, style }) => {
        const accessColor = this.props.data[index].access === 'GRANT' ? '#4481F8' : '#DC3545';
        return (
            <div key={`row-${index}`} style={style}>
                <div>
                    ACTION:&nbsp;
                    <span style={{color: accessColor}}>
                        {this.props.data[index].access.padEnd(9, ' ')}
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    USER(S):&nbsp;
                    <span style={{color: "darkgray"}}>
                        {this.padWord('[' + this.props.data[index].email.join(', ') + ']', 75)}
                    </span>
                </div>
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    FILE: <span style={{color: "peachpuff"}}>
                    {this.padWord(this.props.data[index].file, 25)}
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                LOCATION:&nbsp;
                <span style={{color: "darkgray"}}>
                    {!!this.props.data[index].loc ?
                        this.padWord([this.props.data[index].loc.city, this.props.data[index].loc.country].join(', '), 50) :
                    ""}
                </span>
            </div>
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
                    <span>
                        <b>{this.binary("A̩̯͔̞̙̮̰͗͋̎̒̓̚ͅu̖͖̝̟͎̦̦̞͈̤̐̑̆̈̆̂̀̊͒̄̃͒ͅd̳͍̮̖͌̅́̋ì̗̣̥̜̯̫̰̰͛͌̉͐̔̇́̊̈́͂́t͙̘̭̫͐̏̃͑͊̌̾̔̚ͅ M̫̟̮̣͉̭̗̳̲͉̌̌̑͋̽͋̀͗͐̾̚̚ͅà͙͎̲̲̈́̄́͑̂̆̄p͎͉̣̱̳̗͉̬̋̀͒̓̽̿̊ͅ >")}</b>
                        <span className="virtru">
                            >
                        </span>
                        <span style={{fontSize: "0.8em", color: "dimgray"}}>
                            &nbsp;&nbsp;an entry for the Virtru Privacy Engineering Challenge
                        </span>
                    </span>
                    <span className="save">
                        <Button variant = "primary" size = "sm" onClick = {this.props.writeFile}> Save JSON </Button>
                    </span>
                </div>
                <div className="underline">
                    {"Logs"}
                </div>

                <div className="list">
                    <AutoSizer>
                        {({height, width}) => (
                            <List
                                rowCount={this.props.data.length}
                                width={width}
                                height={height}
                                rowHeight={rowHeight*2}
                                rowRenderer={this.rowRenderer}
                                scrollToRow={this.props.data.length}
                                overscanRowCount={100}
                                />
                        )}
                    </AutoSizer>
                </div>
                <div style=
                    {{fontSize: "0.7em", textAlign: "right",
                        paddingRight: "1em", color: "dimgray"}}>
                        {"powered by"}
                        <span style={{color: '#4481F8'}}>
                            &nbsp;
                            {
                                <a href=
                                    "https://developer.virtru.com/docs/getting-started-node-js"
                                    target="_blank" rel="noopener noreferrer">
                                    virtru-sdk
                                </a>}
                            </span>
                            <span>
                                &nbsp;and&nbsp;
                            </span>
                            <span style={{color: "darkgray"}}>
                                <a href="https://uber.github.io/react-map-gl/" target="_blank"
                                    rel="noopener noreferrer">
                                    react-map-gl
                                </a>
                            </span>
                        </div>
                    </div>
                );
            }
        }

        export default Log;
