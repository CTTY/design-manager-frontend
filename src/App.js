import React, {Component} from 'react';
import MainPage from './DesignManagerFrontend/MainPage/MainPage';
import Carousel from './ArtGallery/Carousel/Carousel';
import Header from './Header/Header';



class App extends Component{
  render(){
    return (
      <React.Fragment>
        <Header />
        <MainPage />
        <Carousel />
      </React.Fragment>
    );
  }  
}

export default App;
