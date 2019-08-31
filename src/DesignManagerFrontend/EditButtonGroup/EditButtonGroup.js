import React, {useState, useEffect} from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';


function EditButtonGroup(props){
    return(
        <ButtonGroup>
            <Button variant="warning" onClick={props.openEdit}>Edit</Button>
            <Button variant="danger" onClick={props.openDelete}>Delete</Button>
        </ButtonGroup>
    );
}

export default EditButtonGroup;