import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm.js';
import Rank from './components/rank/Rank.js';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const App = () => {
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
    <ImageLinkForm />
      
    {/* <FaceRecognizer /> */}
    </div>
  );
}

export default App;
