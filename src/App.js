import React from 'react';
import logo from './logo.svg';
import './App.css';

// Import Bootstrap Components
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Container>
        <Jumbotron>
          <h1 style={{"fontSize": 80}}>Design Manager</h1>
          <p style={{"fontSize": 30}}> Manage your design here</p>
        </Jumbotron>
        <Row>
          <Col xs={7}><h1>Designs</h1></Col>
          <Col xs={2}></Col>
          <Col><Button variant="primary" block>Add a new design</Button></Col>
        </Row>
        <Table striped bordered hover responsive variant="dark">
            <tr>
              <th width="10%">#</th>
              <th width="25%">Title</th>
              <th width="30%">URL</th>
              <th width="35%">Action</th>
            </tr>
            <tbody id="content" />
        </Table>
    </Container>
  );
}

export default App;
