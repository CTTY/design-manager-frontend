import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'

import '../style.css'

class EmailMainPage extends Component {
    constructor(props) {
        super(props);

        this.state={
            from: '',
            title: '',
            content: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    async handleSubmit (e) {
        e.preventDefault()

        const {from, title, content} = this.state

        const form = await axios.post('/api/form', {
            from,
            title,
            content
        })
    }

    render() {
        return (
            <React.Fragment>
            {/* breadcrumb */}
            <div className="breadcumb-area">
                <div className="container h-100">
                    <div className="row h-100 align-items-end">
                        <div className="col-12">
                            <div className="breadcumb--con">
                                <h2 className="title">Email</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html"><i class="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Email</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Container style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
                <Form onSubmit={this.handleSubmit} style={{width: '600px'}}>
                <FormGroup>
                <Label for="exampleEmail">From</Label>
                <Input type="email" name="from" placeholder="your email address" onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                <Label for="exampleEmail">Title</Label>
                <Input type="textarea" name="title" placeholder="subject" onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                <Label for="exampleEmail">Content</Label>
                <Input type="textarea" name="content" placeholder="comment" onChange={this.handleChange}/>
                </FormGroup>

                <Button type="primary" onClick={this.handleSubmit}>Send</Button>
                </Form>
            </Container>
            </React.Fragment>
        );
    }
}

export default EmailMainPage;