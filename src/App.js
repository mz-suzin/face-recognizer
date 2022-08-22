import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm.js';
import React, { Component } from 'react';
import Rank from  './components/rank/Rank';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '81fe6e0759124ad8b0fe947794ae4018'
})


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
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    console.log('click');
    app.models.predict('81fe6e0759124ad8b0fe947794ae4018', 'https://img.freepik.com/free-photo/worldface-american-woman-white-background_53876-146191.jpg?w=2000').then(
    function(response)
    {
      console.log('123', response);
    },
    function(err){

    });
  }

  render() {
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          init={particlesInit}

          options={particlesOptions}/>
      
      
      <div>
        <Navigation />
        <Logo />
      </div>
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> {/*has to be this.blablabla because onInputChange is a property of the class */} 
        
      {/* <FaceRecognizer /> */}
      </div>
    );
  }
}

export default App;
