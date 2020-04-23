import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import SignIn from './components/signin/signin';
import Register from './components/register/register';
import FaceRecognition from './components/facerecognition/facerecognition';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: '60aa8644c12f4006bae21e0878627dc7'
})

const particleOptions =  {
    particles: {
     number: {
      value: 90,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

calculateFaceLocation = (data, box) => {
  
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);

  return {
    leftColumn: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightColumn: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)

  }
}

displayBox = (box) => {
  this.setState({box: box});
}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
    .then(response => this.displayBox(this.calculateFaceLocation(response)))
    .catch(error => console.log(error));
    }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
      route = 'signin';
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route});
  }

  render() {
    const { isSignedIn ,imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
                params={particleOptions}
              />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          { route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box ={box} imageUrl={imageUrl} />
            </div>
          : (
            route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
          
          
        }   
      </div>
    );
  }
} 

export default App;
