import React, {Component} from 'react';
import MainPage from './DesignManagerFrontend/MainPage/MainPage';
import Carousel from './ArtGallery/Carousel/Carousel';
import Header from './Header/Header';
import Footer from './Footer/Footer';



class App extends Component{
  render(){
    return (
      <React.Fragment>
        <Header />
        <MainPage />
        <Carousel />
        <Footer />
      </React.Fragment>
    );
  }  
}

export default App;
