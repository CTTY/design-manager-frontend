import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { withRouter, Route, Switch, Link } from "react-router-dom";

import './App.css';
import './style.css';

import { getCurrentUser } from './Login/Utils/APIUtils';
import { ACCESS_TOKEN } from './Login/Constants/Constants';
import { notification } from 'antd';

// import Preloader from './Preloader/Preloader';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import DesignMainPage from './DesignManagerFrontend/DesignMainPage/DesignMainPage';
import RBCarousel from './ArtGallery/Carousel/Carousel';
import Login from './Login/LoginMainPage/LoginMainPage';
import PrivateRoute from './Login/PrivateRoute/PrivateRoute';
import Email from './Email/EmailMainPage';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="https://ctty.github.io/ArtCollectionWebsite/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("https://ctty.github.io/design-manager-frontend/#/DesignMainPage");
  }

  render(){
    return (
      <React.Fragment>
        {/* <Preloader /> */}
        <Header 
        isAuthenticated={this.state.isAuthenticated}
        currentUser={this.state.currentUser}
        onLogout={this.handleLogout}/>
        <Switch>
          <Route exact path="/" component={RBCarousel} />
          <Route exact path="/Email" component={Email} />
          <Route exact path="/DesignManagerDemo" component={DesignMainPage} />
          <Route path="/login" 
                 render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
          <PrivateRoute authenticated={this.state.isAuthenticated} path="/DesignMainPage" component={DesignMainPage} handleLogout={this.handleLogout}></PrivateRoute>
      </Switch>
        <Footer />
      </React.Fragment>
      
    );
  }
}

export default withRouter(App);
