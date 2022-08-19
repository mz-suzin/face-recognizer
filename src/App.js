import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm.js';
import Rank from './components/rank/Rank.js';

const App = () => {
  return (
    <div className="App">
      <div>
        <Navigation />
        <Logo />
      </div> 
      <Rank />
      <ImageLinkForm />
      
      {/* <FaceRecognizer />       */}
    </div>
  );
}

export default App;
