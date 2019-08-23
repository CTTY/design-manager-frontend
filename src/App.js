import React, {Component, setState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import Content from './Content';

// Import Bootstrap Components
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

class App extends Component {

  state={
    show: false,
    files: [
      {
        "id": 1,
        "title": "Hello1",
        "url":"World1"
      }
  ]
  }

  handleClick = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  addRow = () =>{
    this.setState(prevState => ({
      files: prevState.files.concat(
        {
          "id": 2,
          "title": "Hello2",
          "url":"World2"
        }
      )
    }))
  }

  deleteRow = (id) => {
    this.setState(prevState => ({
      files: prevState.files.filter(files => {return files.id !== id})
    }))
  }

  // useEffect(() => {
  //   load();
  // },[contents]);
  // const load = () => {
  //   // document.getElementById("content").appendChild(
  //   //   "<h1> Hello World </h1>"
  //   // );
  // }
  render(){
    return (
      <Container>
          <Jumbotron>
            <h1 style={{"fontSize": 80}}>Design Manager</h1>
            <p style={{"fontSize": 30}}> Manage your design here</p>
          </Jumbotron>
          <Row>
            <Col xs={7}><h1>Designs</h1></Col>
            <Col xs={2}></Col>
            <Col><Button variant="primary" onClick={this.handleClick} block>Add a new design</Button></Col>
          </Row>
          
          <Table>
              <thead>
                <tr>
                <th width="10%">#</th>
                <th width="25%">Title</th>
                <th width="30%">URL</th>
                <th width="35%">Action</th>
                </tr>
              </thead>
                {
                  this.state.files.map((content) =>{
                    return (
                      <Content id={content.id} title={content.title} url={content.url} deleteRow={this.deleteRow}/>
                    );
                  })
                }
          </Table>
          
             
  
        {/* Add Modal Area */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Upload Design</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="form.design">
                <Form.Label>Design</Form.Label>
                <Form.Control type="file"/>
                <Form.Text className="text-muted">Please upload your design here</Form.Text>
              </Form.Group>
              <Form.Group controlId="form.description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Please enter description here" />
              </Form.Group>
              
            </Form>
          </Modal.Body>
  
          <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() =>{this.addRow(); this.handleClose();}}>
            Upload
          </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default App;
