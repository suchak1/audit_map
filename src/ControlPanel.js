import React, {PureComponent} from 'react';
import Virtru from 'virtru-sdk';
import './ControlPanel.css';


const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      file: null
    }
  }

  setEmails = (emails) => {
    const addresses = emails.split(",").map(email => email.trim());
    this.setState({emails: addresses});
  }


  handleClick = () => {console.log(this.state)};

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const encryptRef = React.createRef();
    const emailRef = React.createRef();

    return (
      <Container>
        <span>
        <div className="field">
          <input fontFamily='Maven Pro' type="text" id="name" name="name" ref={emailRef}
            required size="50" onChange={(e) => {this.setEmails(e.target.value)}}
            placeholder="Enter emails with whom to share file (sep. by commas)"/>
        </div>
        <div className="upload-encrypt-wrapper">
            <button className="encrypt" onClick={this.handleClick()}>Encrypt File ↗</button>
              <input
              id="file_input_file"
              className="none"
              type="file"
              ref={encryptRef}
              onChange={(e) => {
                if(encryptRef.current.files.length) {
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
                      console.log(this.state.emails);
                      const encryptParams = new Virtru.EncryptParamsBuilder()
                      .withArrayBufferSource(file)
                      .withUsersWithAccess(this.state.emails)
                      .withPolicy(policy)
                      .build();

                      const ct = await client.encrypt(encryptParams);
                      await ct.toFile('encrypted.html');
                    }
                    virtru();
                    this.setState({file: file})
                  }
                  let file = encryptRef.current.files[0];
                  this.setState({file: file.name});
                  reader.readAsArrayBuffer(file);
                  console.log(file);
                  //this.setState({file: file});
                  // require user to store file in directory
                  // only record filename, pass filename to node.js file + e
                  // write json file after encrypting file - first level is encrypt paramas index then ip, users, filename, etc
                  // data structure in react app should be list of dicts encrypt params
                }
              }}
            />
        </div>
        </span>
      </Container>
    );
  }
}
