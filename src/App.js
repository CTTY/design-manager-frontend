import React, {Component} from 'react';
import MainPage from './DesignManagerFrontend/MainPage/MainPage';
import Carousel from './ArtGallery/Carousel/Carousel';



class App extends Component{
  render(){
    return (
      <React.Fragment>
        <MainPage />
        <Carousel />
      </React.Fragment>
    );
  }  
}

export default App;
