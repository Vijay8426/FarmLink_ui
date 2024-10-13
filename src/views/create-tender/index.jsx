import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const FormsElements = () => {
  // Initial values for the form
  const initialValues = {
    title: '',
    open_time: '',
    close_time: '',
    status: '',
    minimum_bid: '',
    maximum_bid: '',
    description: '',
    notice_file: null,
  };

  // State to manage form values
  const [formValues, setFormValues] = useState(initialValues);
  // State for loader and messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormValues({
      ...formValues,
      notice_file: e.target.files[0], // Capture the uploaded file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    setMessage(null); // Clear previous message

    const formData = new FormData();
    // Append each form value to the FormData object
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }

    try {
      const response = await axios.post('https://farmlink-ewxs.onrender.com/tender/tenders/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Use the access token from local storage
        },
      });
      console.log('Tender created successfully:', response.data);
      setMessage('Tender created successfully!'); // Set success message
      setMessageType('success'); // Set message type
      // Reset form values after successful submission
      setFormValues(initialValues);
    } catch (error) {
      console.error('Error creating tender:', error);
      setMessage('Error creating tender. Please try again.'); // Set error message
      setMessageType('danger'); // Set message type
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Create Tender</Card.Title>
            </Card.Header>
            <Card.Body>
              {loading && (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
              {message && (
                <Alert variant={messageType} onClose={() => setMessage(null)} dismissible>
                  {message}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                      <Form.Label>Tender Title</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter title" 
                        name="title" 
                        value={formValues.title} 
                        onChange={handleChange} 
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicOpenTime">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control 
                        type="datetime-local" 
                        name="open_time" 
                        value={formValues.open_time} 
                        onChange={handleChange} 
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMinimumBid">
                      <Form.Label>Minimum Bid</Form.Label>
                      <Form.Control 
                        type="number" 
                        placeholder="INR" 
                        name="minimum_bid" 
                        value={formValues.minimum_bid} 
                        onChange={handleChange} 
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicCloseTime">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control 
                        type="datetime-local" 
                        name="close_time" 
                        value={formValues.close_time} 
                        onChange={handleChange} 
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMaximumBid">
                      <Form.Label>Maximum Bid</Form.Label>
                      <Form.Control 
                        type="number" 
                        placeholder="INR" 
                        name="maximum_bid" 
                        value={formValues.maximum_bid} 
                        onChange={handleChange} 
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                      <Form.Label>Tender Description</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows="3" 
                        name="description" 
                        value={formValues.description} 
                        onChange={handleChange} 
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <div className="d-flex justify-content-center form-group px-auto">
                      <label
                        htmlFor="notice_file"
                        className="d-flex flex-column align-items-center justify-content-center w-100 h-64 border border-muted rounded bg-light cursor-pointer"
                      >
                        <div className="d-flex flex-column align-items-center justify-content-center pt-5 pb-6">
                          <svg
                            className="w-2 h-2 mb-5 text-secondary"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-center text-secondary">
                            <span className="font-weight-bold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-center text-muted">file: docs, txt, pdf</p>
                        </div>
                        <input
                          id="notice_file"
                          type="file"
                          name="notice_file"
                          className="d-none"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </Col>

                  <Col md={8}>
                    <Button variant="primary" type="submit" disabled={loading}>Submit</Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormsElements;
