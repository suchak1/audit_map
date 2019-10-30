import React, {PureComponent} from 'react';
import Virtru from 'virtru-sdk';
import publicIp from 'public-ip';
import './ControlPanel.css';


const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            emails: [],
        }
    }

    setEmails = (emails) => {
        const addresses = emails.split(",").map(email => email.trim());
        this.setState({emails: addresses});
    }

    encrypt = async (file, fileName) => {
        const policy = new Virtru.PolicyBuilder().build();
        console.log(this.state.emails);
        const encryptParams = new Virtru.EncryptParamsBuilder()
        .withArrayBufferSource(file)
        .withUsersWithAccess(this.state.emails)
        .withPolicy(policy)
        .build();

        const ct = await this.props.client.encrypt(encryptParams);
        await ct.toFile('encrypted-' + fileName + '.html');

        const policyId = encryptParams.getPolicyId();
        console.log(policyId);
        const entry = {
            [policyId]: {
                users: this.state.emails,
                file: fileName,
                access: 'GRANT',
                ip: await publicIp.v4()
            }
        };
        console.log(entry);
        this.props.addPolicy(policyId, entry[policyId]);

    }

    render() {
        const Container = this.props.containerComponent || defaultContainer;
        const encryptRef = React.createRef();

        return (
            <Container>
                <span>
                    <div className="field">
                        <input fontFamily='Maven Pro' type="text" id="name" name="name"
                            required size="50" onChange={(e) => {this.setEmails(e.target.value)}}
                            placeholder="Enter emails with whom to share file (sep. by commas)"/>
                    </div>
                    <div className="upload-encrypt-wrapper">
                        <button className="encrypt">Encrypt File ↗</button>
                        <input
                            id="file_input_file"
                            className="none"
                            type="file"
                            ref={encryptRef}
                            onChange={(e) => {
                                if(encryptRef.current.files.length) {
                                    const fileName = encryptRef.current.files[0].name;
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        const file = reader.result;
                                        this.encrypt(file, fileName);
                                    }
                                    let file = encryptRef.current.files[0];
                                    reader.readAsArrayBuffer(file);
                                }
                            }}
                            />
                    </div>
                </span>
            </Container>
        );
    }
}
