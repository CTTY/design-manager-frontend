import React, {Component} from 'react';
import '../style.css';

import { Nav, Navbar} from "react-bootstrap";

// style={{background-image : url(./img/core-img/curve.png)}}
class Header extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this); 
    }

    handleMenuClick() {
        this.props.onLogout();
      }

    render(){
        let menuItems;
        if(this.props.currentUser){
            menuItems=[
                <li><a href="https://ctty.github.io/ArtCollectionWebsite/">Home</a></li>,
                <li><a href="#">Pages</a>
                 <ul className="dropdown">
                   <li><a href="https://ctty.github.io/ArtCollectionWebsite/">- Home</a></li>

                   <li><a href="https://ctty.github.io/design-manager-frontend/#/">- Projects</a></li>
                   <li><a href="https://ctty.github.io/ArtCollectionWebsite/designer.html">- Designer</a></li>
                   <li><a href="https://ctty.github.io/ArtCollectionWebsite/developers.html">- Developers</a></li>
                   <li><a href="https://ctty.github.io/design-manager-frontend/#/login">- Log In</a></li>
                   <li><a href="https://ctty.github.io/design-manager-frontend/#/DesignMainPage">- DesignManager</a></li>
                   <li><a href="https://ctty.github.io/design-manager-frontend/#/Email">- Email</a></li>

                 </ul>
                </li>,
                <li><a href="https://ctty.github.io/design-manager-frontend/#/">Projects</a></li>,
                <li><a href="#">About Us</a>
                 <ul className="dropdown">
                   <li><a href="https://ctty.github.io/ArtCollectionWebsite/designer.html">- Designer</a></li>
                   <li><a href="https://ctty.github.io/ArtCollectionWebsite/developers.html">- Developers</a></li>
                 </ul>
                </li>,

                <li><a href="https://ctty.github.io/design-manager-frontend/#/login">Log In</a></li>,
                <li><a href="https://ctty.github.io/design-manager-frontend/#/DesignMainPage">Design Manager</a></li>,
                <li><a href="https://ctty.github.io/design-manager-frontend/#/Email">Email</a></li>,

                <li><Nav.Link href="https://ctty.github.io/ArtCollectionWebsite/" onSelect={this.handleMenuClick}>Log out</Nav.Link></li>,
            ]
        } else {
            menuItems=[
                <li><a href="https://ctty.github.io/ArtCollectionWebsite/">Home</a></li>,
                <li><a href="#">Pages</a>
                 <ul className="dropdown">
                   <li><a href="https://ctty.github.io/ArtCollectionWebsite/">- Home</a></li>

                   <li><a href="https://ctty.github.io/design-manager-frontend/#/">- Projects</a></li>
                   <li><a href="https://ctty.github.io/ArtCollectionWebsite/designer.html">- Designer</a></li>
                   <li><a href="https://ctty.github.io/ArtCollectionWebsite/developers.html">- Developers</a></li>
                   <li><a href="https://ctty.github.io/design-manager-frontend/#/login">- Log In</a></li>
                   <li><a href="https://ctty.github.io/design-manager-frontend/#/DesignMainPage">- DesignManager</a></li>
                   <li><a href="https://ctty.github.io/design-manager-frontend/#/Email">- Email</a></li>

                 </ul>
                </li>,
                <li><a href="https://ctty.github.io/design-manager-frontend/#/">Projects</a></li>,
                <li><a href="#">About Us</a>
                 <ul className="dropdown">
                   <li><a href="https://ctty.github.io/ArtCollectionWebsite/designer.html">- Designer</a></li>
                   <li><a href="https://ctty.github.io/ArtCollectionWebsite/developers.html">- Developers</a></li>
                 </ul>
                </li>,
                <li><a href="https://ctty.github.io/design-manager-frontend/#/login">Log In</a></li>,
                <li><a href="https://ctty.github.io/design-manager-frontend/#/DesignMainPage">Design Manager</a></li>,
                <li><a href="https://ctty.github.io/design-manager-frontend/#/Email">Email</a></li>,
            ]
        }

        return (
            <div className="header-area">
                <div className="main-header-area">
                    <div className="classy-nav-container breakpoint-off">
                        <Navbar className="classy-navbar justify-content-between navbar-fixed-top" expand="lg" variant="light" bg="dark" fixed="top">
                            {/* background curve */}
                            <div className="bg-curve" style={{'background-image' : 'url(1' + '../img/core-img/curve.png' + ')'}}></div>
                            
                            {/* logo */}
                            <Navbar.Brand href="https://ctty.github.io/ArtCollectionWebsite/">
                                <img
                                    alt=""
                                    src="https://raw.githubusercontent.com/CTTY/design-manager-frontend/master/src/img/core-img/logo.jpeg"
                                    height="60"
                                    width="60"
                                    className="nav-brand"
                                />
                            </Navbar.Brand>
    
                            {/* <div className="classy-navbar-toggler">
                                <span className="navbarToggler"><span></span><span></span><span></span></span>
                            </div> */}

                            <div className="classy-menu">
                                {/* <div className="classycloseIcon">
                                    <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                                    </div> */}
    
                                {/* navbar */}
                                <div className="classynav">
                                    <ul id="nav">
                                        {menuItems}
                                    </ul>
                                </div>
                            </div>
                        </Navbar>
                    </div>
                </div>
            </div>
        )
    }
    
    
}

export default Header;
