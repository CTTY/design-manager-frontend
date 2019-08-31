import React, {Component, setState, useState, useEffect} from 'react';
// import logo from './logo.svg';
import '../../App.css';
import './Upload.css';
import Content from '../../Content';
import Progress from '../Progress/Progress';
import Dropzone from '../Dropzone/Dropzone';

// Import Bootstrap Components
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function MainPage() {

  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfullUploaded, setSuccessfullUploaded] = useState(false);

  const handleClick = () => setShow(true);
  const handleClose = () => setShow(false);

  // need to implement delete uploaded files
  const deleteRow = id => {
    setFiles(files.filter(files => {return files.id !== id}))
  }

  const onFilesAdded = (upfiles) => {
    console.log(files);
    setFiles(files => (
      files.concat(upfiles)
    ))
    console.log(files);
  }

  const uploadFiles = async() => {
    setUploadProgress({});
    setUploading(true);
    const promises = [];
    files.forEach(file => {
      promises.push(sendRequest(file));
    });
    try {
      await Promise.all(promises);

      setSuccessfullUploaded(true);
      setUploading(false);
    } catch (e) {
      // error handling is needed
      setSuccessfullUploaded(true);
      setUploading(false);
    }
  }

  const sendRequest = file => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          setUploadProgress(copy);
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        setUploadProgress(copy);
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        setUploadProgress(copy);
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", "http://localhost:8000/upload");
      req.send(formData);
    });
  }

  const renderProgress = file => {
    const uploadProgress = setUploadProgress[file.name];
    if (uploading || successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  const renderActions = () => {
    if (successfullUploaded) {
      return (
        <button
          // onClick={() => this.setState({ files: [], successfullUploaded: false })}
          onClick={()=>setFiles([])}
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={files.length < 0 || uploading}
          onClick={uploadFiles}
        >
          Upload
        </button>
      );
    }
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
                {
                  files.map((content) =>{
                    return (
                      <Content id={content.id} title={content.name} url={content.url} deleteRow={deleteRow}/>
                    );
                  })
                }
          </Table>
          
             
  
        {/* Add Modal Area */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Upload Design</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="form.design">
                <div className="Upload">
                  <div className="Content">
                    <div>
                      <Dropzone
                        onFilesAdded={onFilesAdded}
                        disabled={uploading || successfullUploaded}
                      />
                    </div>
                    <div className="Files">
                      {files.map(file => {
                        return (
                          <div key={file.name} className="Row">
                            <span className="Filename">{file.name}</span>
                            {renderProgress(file)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Form.Group>
              <Form.Group controlId="form.description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Please enter description here" />
              </Form.Group>
            </Form>
          </Modal.Body>
  
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <div>{renderActions()}</div>
          </Modal.Footer>
        </Modal>
      </Container>
    );
}

export default MainPage;
