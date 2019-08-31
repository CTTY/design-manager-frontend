import React, {Component, setState, useState, useEffect} from 'react';
import Content from '../Content/Content';
import Upload from '../Upload/Upload';

// Import Bootstrap Components
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function DesignMainPage() {

  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("initial");

  const handleClick = () => setShow(true);
  const handleClose = () => setShow(false);

  // need to implement delete uploaded files
  const deleteRow = id => {
    // setFiles(files.filter(files => {return files.id !== id}))
  }

  // useEffect(() => {
  //   load();
  // },[contents]);
  // const load = () => {
  //   // document.getElementById("content").appendChild(
  //   //   "<h1> Hello World </h1>"
  //   // );
  // }
    return (
      <Container>
            {/* breadcrumb */}
            <div className="breadcumb-area">
                <div className="container h-100">
                    <div className="row h-100 align-items-end">
                        <div className="col-12">
                            <div className="breadcumb--con">
                                <h2 className="title">DesignManager</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html"><i class="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">DesignManager</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          <Jumbotron>
            <h1 style={{"fontSize": 80}}>Design Manager</h1>
            <p style={{"fontSize": 30}}> Manage your design here</p>
          </Jumbotron>
          <Row>
            <Col xs={7}><h1>Designs</h1></Col>
            <Col xs={2}></Col>
            <Col><Button variant="primary" onClick={handleClick} block>Add a new design</Button></Col>
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
                {/* {
                  files.map((content) =>{
                    return (
                      <Content id={content.id} title={content.name} url={content.url} deleteRow={deleteRow}/>
                    );
                  })
                } */}
          </Table>
          
             
  
        {/* Add Modal Area */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Upload Design</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="form.design">
                <Upload />
              </Form.Group>
            </Form>
          </Modal.Body>
  
          {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          </Modal.Footer> */}
        </Modal>
      </Container>
    );
}

export default DesignMainPage;
