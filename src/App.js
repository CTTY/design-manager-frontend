import React, {Component, setState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import './Upload.css';
import Content from './Content';
import Progress from './Progress/Progress';
import Dropzone from './Dropzone/Dropzone';

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
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  handleClick = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  // need to implement delete uploaded files
  deleteRow = (id) => {
    this.setState(prevState => ({
      files: prevState.files.filter(files => {return files.id !== id})
    }))
  }

  onFilesAdded(files) {
    console.log(files);
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", "http://localhost:8000/upload");
      req.send(formData);
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
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

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() => this.setState({ files: [], successfullUploaded: false })}
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
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
                      <Content id={content.id} title={content.name} url={content.url} deleteRow={this.deleteRow}/>
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
                <div className="Upload">
                  <div className="Content">
                    <div>
                      <Dropzone
                        onFilesAdded={this.onFilesAdded}
                        disabled={this.state.uploading || this.state.successfullUploaded}
                      />
                    </div>
                    <div className="Files">
                      {this.state.files.map(file => {
                        return (
                          <div key={file.name} className="Row">
                            <span className="Filename">{file.name}</span>
                            {this.renderProgress(file)}
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
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <div>{this.renderActions()}</div>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default App;
