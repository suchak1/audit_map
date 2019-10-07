import React, {PureComponent} from 'react';
import Virtru from 'virtru-sdk';
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
        <span>
        <div className="field"><input type="text" id="name" name="name" required size="50"/></div>
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
                    const virtru = async () => {
                      const email = process.env.REACT_APP_EMAIL;
                      if(!Virtru.Auth.isLoggedIn({email: email})) {
                        Virtru.Auth.loginWithGoogle({email: email, redirectUrl: "http://localhost:3000/"});
                      }
                      const policy = new Virtru.PolicyBuilder().build();
                      const client = new Virtru.Client({email});
                      console.log("got this far");
                      const encryptParams = new Virtru.EncryptParamsBuilder()
                      .withArrayBufferSource(file)
                      .withUsersWithAccess(['suchak.krish@gmail.com'])
                      .withPolicy(policy)
                      .build();

                      const ct = await client.encrypt(encryptParams);
                      await ct.toFile('encrypted.html');
                    }
                    virtru();
                    this.setState({file: file})
                  }
                  let file = inputRef.current.files[0];
                  reader.readAsArrayBuffer(file);
                  console.log(file);
                  //this.setState({file: file});
                  // require user to store file in directory
                  // only record filename, pass filename to node.js file + e
                }
              }}
            />
        </div>
        </span>
      </Container>
    );
  }
}
