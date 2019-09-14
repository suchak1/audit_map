import React, {PureComponent} from 'react';
import './Map.css';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <label>
          <h4><button>Import File ↗ </button></h4>
          <input type="file"></input>
        </label>
      </Container>
    );
  }
}
