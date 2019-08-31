import React, {useState, useEffect} from 'react';
import EditButtonGroup from '../EditButtonGroup/EditButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Content(props){
    const [showDelete,setShowDelete] = useState(false);
    const [showEdit,setShowEdit] = useState(false);
    
    const openEdit = () => {
        setShowEdit(true);
    }
   
    const closeEdit = () =>{
        setShowEdit(false);
    }

    const openDelete = () => {
        setShowDelete(true);
    }
   
    const closeDelete = () =>{
        setShowDelete(false);
    }

    return (
        <React.Fragment>
        <tbody>
            <tr>
                <td width="10%">{props.id}</td>
                <td width="25%">{props.title}</td>
                <td width="30%">{props.url}</td>
                <td width="35%"><EditButtonGroup id={props.id} openEdit={openEdit} closeEdit={closeEdit} openDelete={openDelete} closeDelete={closeDelete}/></td>
            </tr>
        </tbody>

        {/* Edit Modal Area */}
        <Modal show={showEdit} onHide={closeEdit}>
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
        <Button variant="secondary" onClick={closeEdit}>
        Cancel
        </Button>
        <Button variant="primary" >
        Edit
        </Button>
        </Modal.Footer>
        </Modal>

        {/* Delete Modal Area */}
        <Modal show={showDelete} onHide={closeDelete}>
        <Modal.Header closeButton>
        <Modal.Title>Upload Design</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure to delete this design?
        </Modal.Body>

        <Modal.Footer>
        <Button variant="primary" onClick={closeDelete}>
        Cancel
        </Button>
        <Button variant="secondary" onClick={() => {props.deleteRow(props.id); closeDelete();}}>
        Yes
        </Button>
        </Modal.Footer>
        </Modal>
        </React.Fragment>
    );
}

export default Content;