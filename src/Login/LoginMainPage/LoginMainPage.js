import React, { Component } from 'react';
import { Form, Input, Button, Icon, notification } from 'antd';
import Container from 'react-bootstrap/Container';
import { login } from '../Utils/APIUtils';
import { ACCESS_TOKEN } from '../Constants/Constants';

import './Login.css';
import '../../style.css'

const FormItem = Form.Item;
class LoginMainPage extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <React.Fragment>
            {/* breadcrumb */}
            <div className="breadcumb-area">
                <div className="container h-100">
                    <div className="row h-100 align-items-end">
                        <div className="col-12">
                            <div className="breadcumb--con">
                                <h2 className="title">Log in</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html"><i class="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Log in</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* login form */}
            
            <Container style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '30vh'}}>
                <div className="login-container">
                    <div className="login-content">
                        <AntWrappedLoginForm onLogin={this.props.onLogin} />
                    </div>
                </div>
            </Container>

            </React.Fragment>

        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });                    
                    } else {
                        notification.error({
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });                                            
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem className="email">
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Please input your username or email!' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}}/>}
                        size="40"
                        name="usernameOrEmail" 
                        placeholder="Username or Email"
                         />    
                    )}
                </FormItem>
                <FormItem className="password">
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />}
                        size="40"
                        
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                )}
                </FormItem>
                <br/>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                </FormItem>
            </Form>
        );
    }
}

export default LoginMainPage;