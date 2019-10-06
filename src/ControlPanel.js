import React, {PureComponent} from 'react';
import './ControlPanel.css';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
  }


  handleClick = () => {console.log("hi")};

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const inputRef = React.createRef();

    return (
      <Container>
        <div className="upload-encrypt-wrapper">
            <button className="encrypt" onClick={this.handleClick()}>Encrypt File ↗</button>
              <input
              id="file_input_file"
              className="none"
              type="file"
              ref={inputRef}
              onChange={(e) => {
                if(inputRef.current.files.length) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const file = reader.result;
                    console.log(file.byteLength);
                    console.log(file);
                    this.setState({file: file})
                  }
                  let file = inputRef.current.files[0];
                  reader.readAsArrayBuffer(file);
                  console.log(file);
                  //this.setState({file: file});
                }
              }}
            />
        </div>
      </Container>
    );
  }
}
