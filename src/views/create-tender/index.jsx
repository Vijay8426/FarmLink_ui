import React from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

const FormsElements = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Create Tender</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label >Tender Title</Form.Label>
                      <Form.Control type="text" placeholder="Enter title" />
                      
                    </Form.Group>

                  </Form>
                </Col>
                <Col md={6}>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control type="datetime-local" placeholder="Enter email" />
                      
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMinimumBid">
                      <Form.Label>Minimum Bid</Form.Label>
                      <Form.Control type="number" placeholder="INR" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicChecbox">

                    </Form.Group>
                   
                  </Form>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>End date</Form.Label>
                    <Form.Control type="datetime-local" placeholder="Text" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicMaximumBid">
                      <Form.Label>Maximum Bid</Form.Label>
                      <Form.Control type="number" placeholder="INR" />
                    </Form.Group>


                </Col>
                <Col md={12} >
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Tender Description</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                  </Form.Group>
                </Col>
                <Col md={8}>
                <Button variant="primary">Submit</Button>
                
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </React.Fragment>
  );
};

export default FormsElements;
