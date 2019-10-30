import React, {Component} from 'react';
import MapGL, {Marker, Popup, NavigationControl, FullscreenControl} from 'react-map-gl';
import ControlPanel from './ControlPanel';
import Pin from './Pin';
import { Button } from 'react-bootstrap';
import './Map.css';


const width = window.innerWidth;
const height = window.innerHeight;
const winSize = width * height;
const zoom = winSize < 260000 ?  0 : (winSize < 580000 ? 0.5: 1);

const nav = {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px',
}

const fullscreen = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
};


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                zoom: zoom
            },
            popupInfo: null,
        };
    }


    _renderCityMarker = (entry, key) => {
        const loc = entry['loc'];
        if(!entry['ip'] || !loc.lat || !loc.long) {
            return null;
        }

        return (
            <Marker key={`marker-${key}`} longitude={loc.long} latitude={loc.lat}>
                <Pin size={20} access={entry['access']} onClick={() => this.setState({popupInfo: {key: key, entry: entry}})} />
            </Marker>
        );
    };


    _renderPopup() {
        const {popupInfo} = this.state;

        return (
            popupInfo && (
                <Popup
                    tipSize={5}
                    anchor="top"
                    longitude={popupInfo['entry']['loc']['long']}
                    latitude={popupInfo['entry']['loc']['lat']}
                    offsetTop={5}
                    closeOnClick={false}
                    closeButton={true}
                    onClose={() => this.setState({popupInfo: null})}
                    >
                    <div style={{paddingTop: 10, fontFamily: 'Maven Pro'}}>
                        IP Address: {popupInfo['entry']['ip']}
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Button
                            variant={popupInfo['entry']['access'] === 'REVOKE' ? "outline-primary" : "outline-danger"}
                            onClick={() => this.props.flipAccess(popupInfo['key'])}
                            >
                            {popupInfo['entry']['access'] === 'REVOKE' ? "GRANT ACCESS 🔵" : "REVOKE ACCESS 🛑"}
                        </Button>
                    </div>
                </Popup>
            )
        );
    }

    render() {
        const {viewport} = this.state;
        return (
            <MapGL
                {...viewport}
                width = "100%"
                height = "65vh"
                attributionControl = {false}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                mapStyle = "mapbox://styles/mapbox/dark-v9"
                onViewportChange={viewport => this.setState({viewport})}
                >

                {console.log(this.props.data)}
                {Object.keys(this.props.data).map((entry, key) =>
                    this._renderCityMarker(this.props.data[entry], entry))}

                    {this._renderPopup()}


                    <div style = {fullscreen}>
                        <FullscreenControl />
                    </div>

                    <div style = {nav}>
                        <NavigationControl />
                    </div>

                    <ControlPanel containerComponent={this.props.containerComponent} addPolicy={this.props.addPolicy} />
                </MapGL>
            );
        }
    }

    export default Map;
