import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

const liff = window.liff;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      userLineID: '',
      pictureUrl: '',
      statusMessage: '',
      languageDevice: '',
      versionSDK: '',
      client: '',
      isLogin: '',
      os: ''
    };
  }

  componentDidMount() {
    liff.init({ liffId: '1579235015-DRJy4vn9' })
      .then(async () => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  getProfile() {
    liff.getProfile().then(dataInfo => {
      this.setState({
        name: dataInfo.displayName,
        userLineID: dataInfo.userId,
        pictureUrl: dataInfo.pictureUrl,
        statusMessage: dataInfo.statusMessage
      });
    });

    const languageDevice = liff.getLanguage();
    const versionSDK = liff.getVersion();
    const client = liff.isInClient();
    const isLogin = liff.isLoggedIn();
    const os = liff.getOS();

    this.setState({
      languageDevice: languageDevice,
      versionSDK: versionSDK,
      client: (client === true) ? 'YES' : 'NO',
      isLogin: (isLogin === true) ? 'Login' : 'Not Login',
      os: os
    });
  }

  sendMessage() {
    liff.sendMessages([{
      type: 'text',
      text: "Hi LIFF"
    }]).then(() => {
      liff.closeWindow();
    });
  }

  closeLIFF() {
    liff.closeWindow();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="support">
            <img width="25%" src="https://img.icons8.com/color/420/line-me.png" />
            <img width="25%" src="https://lh3.googleusercontent.com/illfpW97yh9TtvtmtN-BiNcpomys5gzAj4nw8Je6Ydby814PRquAPcvsP2tAV43Iqe8logzjUnjp7tN5Dvk" />
          </div>
          <div className="support">
            {
              (this.state.pictureUrl && this.state.pictureUrl != '')
                ?
                <img width="25%" src={this.state.pictureUrl} />
                :
                null
            }
          </div>
          {
            (this.state.name && this.state.name != '')
              ?
              <p>Name: {this.state.name}</p>
              :
              null
          }
          {
            (this.state.userLineID && this.state.userLineID != '')
              ?
              <p>LineID: {this.state.userLineID}</p>
              :
              null
          }
          {
            (this.state.statusMessage && this.state.statusMessage != '')
              ?
              <p>statusMessage: {this.state.statusMessage}</p>
              :
              null
          }
          {
            (this.state.languageDevice && this.state.languageDevice != '')
              ?
              <p>languageDevice: {this.state.languageDevice}</p>
              :
              null
          }
          {
            (this.state.versionSDK && this.state.versionSDK != '')
              ?
              <p>versionSDK: {this.state.versionSDK}</p>
              :
              null
          }
          {
            (this.state.client && this.state.client != '')
              ?
              <p>client: {this.state.client}</p>
              :
              null
          }
          {
            (this.state.isLogin && this.state.isLogin != '')
              ?
              <p>isLogin: {this.state.isLogin}</p>
              :
              null
          }
          {
            (this.state.os && this.state.os != '')
              ?
              <p>os: {this.state.os}</p>
              :
              null
          }
          <div className="support">
            <Button variant="contained" onClick={this.getProfile.bind(this)} style={{ marginRight: '20px' }} color="primary">
              Getdata INFO
            </Button>
            <Button variant="contained" onClick={this.sendMessage.bind(this)} style={{ marginRight: '20px' }}>
              Send Message
            </Button>
            <Button variant="contained" onClick={this.closeLIFF.bind(this)} color="secondary">
              Close LIFF
            </Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
