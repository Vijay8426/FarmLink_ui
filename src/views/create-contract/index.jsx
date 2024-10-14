import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import axios from 'axios';

const FormsElements = () => {
  // Use useParams to extract parameters from the URL
  const { tender_id, farmer_id, buyer_id } = useParams();

  // Initial values for the form
  const initialValues = {
    contract_value: 0,
    start_date: '',
    end_date: '',
    description: '',
    contractFile: null,
  };

  // State to manage form values
  const [formValues, setFormValues] = useState(initialValues);
  // State for loader and messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [tenderTitle, setTenderTitle] = useState('');

  // Fetch the tender details and set the title
  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        console.log('Tender ID:', tender_id);
        const response = await axios.get(`https://farmlink-ewxs.onrender.com/tender/tenders/${tender_id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTenderTitle(response.data.title || 'No Title'); // Set the tender title
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tender details:', error);
        setMessage('Failed to fetch tender details');
        setMessageType('danger');
        setLoading(false);
      }
    };

    fetchTenderDetails();
  }, [tender_id]);

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
      contractFile: e.target.files[0], // Capture the uploaded file
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

    // Additional data for the contract
    formData.append('farmer_id', farmer_id); // Use farmer_id from params
    formData.append('tender_id', tender_id); // Use tender_id from params
    formData.append('buyer_id', buyer_id); // Use buyer_id from params
    formData.append('status', 'Active'); // Default to Active
    formData.append('payment_status', 'Pending'); // Default to Pending

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('https://farmlinkbc.onrender.com/submit_contract', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Contract submitted successfully:', response.data);
      setMessage('Contract submitted successfully');
      setMessageType('success');
      setLoading(false);
    } catch (error) {
      console.error('Error submitting contract:', error);
      setMessage('Failed to submit the contract.');
      setMessageType('danger');
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">{tenderTitle || 'Contract'} Contract </Card.Title>
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
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicOpenTime">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        name="start_date" 
                        value={formValues.start_date} 
                        onChange={handleChange} 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicCloseTime">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        name="end_date" 
                        value={formValues.end_date} 
                        onChange={handleChange} 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicContractValue">
                      <Form.Label>Contract Value as per terms</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="contract_value" 
                        value={formValues.contract_value} 
                        onChange={handleChange} 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                      <Form.Label>Contract Description</Form.Label>
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
                          <p className="text-center text-muted">Contract File only in pdf</p>
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
