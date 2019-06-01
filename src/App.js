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
      statusMessage: ''
    };
  }

  getProfile() {
    liff.init(async () => {
      let getProfile = await liff.getProfile();
      this.setState({
        name: getProfile.displayName,
        userLineID: getProfile.userId,
        pictureUrl: getProfile.pictureUrl,
        statusMessage: getProfile.statusMessage
      });
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
