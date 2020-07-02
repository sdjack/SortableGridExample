import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function ListItem(props) {
    const { itemData, onRemove } = props;

    const address = itemData.address.street + " " + itemData.address.suite + " " + itemData.address.city + " " + itemData.address.zipcode; 
    return (
        <ListGroup.Item>
            <span>Name: {itemData.name}</span><br/>
            <span>Email: {itemData.email}</span><br/>
            <span>Address: {address}</span><br/>
            <Button className="float-right" variant="primary" onClick={onRemove}>Remove</Button>
        </ListGroup.Item>
    );
};