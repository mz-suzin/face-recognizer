import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm.js';
import FaceRecognizer from './components/faceRecognizer/FaceRecognizer';
import React, { Component } from 'react';
import Rank from  './components/rank/Rank';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';


const particlesOptions = 
  {
    "fullScreen": {
      "enable": true,
      "zIndex": -1
    },
    "particles": {
      "number": {
        "value": 10,
        "density": {
          "enable": true,
          "value_area": 900
        }
      },
      "color": {
        "value": "#fff"
      },
      "shape": {
        "type": "line"
      },
      "opacity": {
        "value": 0.8,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 4,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 600,
        "color": "#ffffff",
        "opacity": 0.6,
        "width": 2
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "events": {
        "onhover": {
          "enable": true,
          "mode": ["grab"]
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        }
      }
    },
    "retina_detect": true,
    "background": {
      "color": "#111",
      "image": "",
      "position": "50% 50%",
      "repeat": "no-repeat",
      "size": "cover",
      "opacity": 0
    }};

const particlesInit = async (main) => {
  console.log(main);
  await loadFull(main);
};

class App extends Component {
  constructor() { 
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name:'',
        email: '',
        entries: 0,
        joined: '' 
      }
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const w = Number(image.width);
    const h = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * w,
      topRow: clarifaiFace.top_row * h,
      rightCol: w - (clarifaiFace.right_col * w),
      bottomRow: h - (clarifaiFace.bottom_row * h)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch('https://fierce-river-95633.herokuapp.com/imageUrl', {
      method:'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res) {
        fetch('https://fierce-river-95633.herokuapp.com/image', {
          method: 'put',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())      
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log('Could not find correct definitions'))
      }
      this.displayFaceBox(this.calculateFaceLocation(res))
    })
    .catch(err => console.log(err))
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }});
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({isSignedIn: false, imageUrl: ''});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box, user } = this.state;
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions} />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              {/*has to be this.blablabla because onInputChange is a property of the class */} 
              <FaceRecognizer box={box} imageUrl={imageUrl}/>
            </div>
          : (
            route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
