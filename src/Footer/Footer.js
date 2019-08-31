import React from 'react';
import '../style.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'

function Footer(){
    return (
        <div className="footer-area section-padding-80-0">
            <div className="container">
                <div className="row justify-content-between">


                    
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="single-footer-widget mb-60">

                {/* <a href="#" class="d-block mb-4"><img src="./img/core-img/logo.jpeg" height="60" width="60" alt=""></a> */}
                <Navbar.Brand href="/index.html" className="d-block mb-4">
                            <img
                                alt=""
                                src="../img/core-img/logo.jpeg"
                                height="60"
                                width="60"
                                className="nav-brand"
                            />
                </Navbar.Brand>

                <h3>A place of art.</h3>
                {/* <div class="copywrite-text">
                  <p>&copy; 
    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This website is built with &hearts; by <a href="https://www.linkedin.com/in/yexiang-chang/" target="_blank">Shawn Chang  Abby Lu</a>
                </div> */}

            </div>
        </div>


                    
            <div className="col-12 col-lg-4 col-xl-3">
                <div className="single-footer-widget mb-60">
                            
                    <h4 className="widget-title">Contact</h4>
                            
                    <div className="footer-content mb-30">
                        <h4>+1-607-379-4550</h4>
                        <h6>Maplewood Apartment, Ithaca, NY 14850</h6>
                    </div>
                            
                    <div className="footer-social-info">
                        <a href="#" className="facebook" data-toggle="tooltip" data-placement="top" title="Facebook"><i
                                className="fa fa-facebook"></i></a>
                        <a href="#" className="twitter" data-toggle="tooltip" data-placement="top" title="Twitter"><i
                                className="fa fa-twitter"></i></a>
                        <a href="#" className="pinterest" data-toggle="tooltip" data-placement="top" title="Pinterest"><i
                                className="fa fa-pinterest"></i></a>
                        <a href="#" className="instagram" data-toggle="tooltip" data-placement="top" title="Instagram"><i
                                className="fa fa-instagram"></i></a>
                        <a href="#" className="youtube" data-toggle="tooltip" data-placement="top" title="YouTube"><i
                                className="fa fa-youtube-play"></i></a>
                    </div>
                </div>
            </div>

                </div>
            </div>
        </div>
    )
    
}

export default Footer;