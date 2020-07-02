import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListItem from './ListItem.js';

export default function SortableList() {
    const [rawdata, setRawData] = useState([]);
    const [contacts, setContacts] = useState([]);
    const searchRef = React.createRef();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://jsonplaceholder.typicode.com/users',
            );
            const shapedData = result.data.map((data) => DataModel(data.id, data));
            setRawData(shapedData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        setContacts(rawdata);
    }, [rawdata]);

    const DataModel = (index, srcData) => {
        const addressStr = srcData.address.street + " " + 
                           srcData.address.suite + " " + 
                           srcData.address.city + " " + 
                           srcData.address.zipcode;
        return {
            id: index,
            name: srcData.name,
            email: srcData.email,
            address: addressStr
        }
    };

    const applySearch = (value) => {
        if (value !== "") {
            const searchResults = [];
            rawdata.map((data) => {
                const nameStr = data.name;
                const rExp = new RegExp(value, "i");
                if (nameStr.search(rExp) > -1) {
                    searchResults.push(data);
                }
                return null;
            });
            setContacts(searchResults);
        } else {
            setContacts(rawdata);
        }
    };

    const onSearchChanged = (e) => {
        applySearch(e.target.value);
    };

    const onClear = () => { 
        if (searchRef.current) {
            searchRef.current.value = "";
            setContacts(rawdata);
        }
    };

    const onRemove = (removedData) => {
        return () => {
            const modifiedRawData = [];
            rawdata.map((data) => {
                if (data.name !== removedData.name) {
                    modifiedRawData.push(data);
                }
                return null;
            });
            setRawData(modifiedRawData);
        }
    };

    const onSortAZ = () => {
        contacts.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
        });
        const sortedData = contacts.map((data, index) => DataModel(index, data));
        setContacts(sortedData);
    };

    const onSortZA = () => {
        contacts.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
            return 0;
        });
        const sortedData = contacts.map((data, index) => DataModel(index, data));
        setContacts(sortedData);
    };

    const onResetSort = () => {
        rawdata.sort(function(a, b) {
            return a.id - b.id;
        });
        setContacts(rawdata);
        if (searchRef.current) {
            applySearch(searchRef.current.value);
        }
    };

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <Form className="form-inline mb-3">
                            <InputGroup className="w-100">
                                <FormControl
                                    ref={searchRef}
                                    placeholder="Search Contacts"
                                    aria-label="Search Contacts"
                                    aria-describedby="basic-addon2"
                                    onChange={onSearchChanged}
                                />
                                <InputGroup.Append>
                                    <Button variant="primary" onClick={onClear}>Clear</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="mb-3" variant="primary" onClick={onSortAZ}>Sort A-Z</Button>
                        <Button className="mb-3 ml-3" variant="primary" onClick={onSortZA}>Sort Z-A</Button>
                        <Button className="mb-3 ml-3" variant="primary" onClick={onResetSort}>Reset Sort</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {contacts.map((data) => {
                                return (
                                    <ListItem key={`contact-${data.id}`} itemData={data} onRemove={onRemove(data)} />
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
