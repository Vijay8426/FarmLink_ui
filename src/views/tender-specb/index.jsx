import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, Table, Form, Button } from 'react-bootstrap';

const Tender = () => {
  const { id } = useParams(); // Get the tender id from the URL
  const [tender, setTender] = useState(null); // State to store the tender details
  const [drafts, setDrafts] = useState([]); // State to store the drafts data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error

  // Retrieve the access token from local storage or wherever it is stored
  const accessToken = localStorage.getItem('accessToken'); // Adjust this line if your token is stored differently

  // Fetch the tender details based on the ID
  useEffect(() => {
    const fetchTender = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://farmlink-ewxs.onrender.com/tender/tenders/${id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}` // Include the access token in the headers
          }
        });
        setTender(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the tender details", error);
        setError('Failed to load tender details');
        setLoading(false);
      }
    };

    fetchTender();
  }, [id, accessToken]);

  // Fetch the drafts based on the tender ID
  useEffect(() => {
    if (tender) {
      const fetchDrafts = async () => {
        try {
          const response = await axios.get(`https://farmlink-ewxs.onrender.com/draft/drafts/${id}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}` // Include the access token in the headers
            }
          });
          setDrafts(response.data);
        } catch (error) {
          console.error("Error fetching drafts", error);
        }
      };

      fetchDrafts();
    }
  }, [tender, id, accessToken]);

  // If still loading, show a loading spinner or message
  if (loading) return <p>Loading...</p>;

  // If there's an error, show the error message
  if (error) return <p>{error}</p>;

  // If the tender is successfully fetched, render the details
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">{tender.title}</Card.Title>
            </Card.Header>
            <Card.Body>
              <p className='text-dark'>
                {tender.description || 'No description available for this tender.'}
              </p>
              <Table>
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <td>{new Date(tender.open_time).toLocaleDateString()}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>End Date</th>
                    <td>{new Date(tender.close_time).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th>Attachment</th>
                    <td className='link-primary'>
                      <a href={`https://farmlink-ewxs.onrender.com${tender.notice_file}/`}>Tender File</a>
                    </td>
                  </tr>
                  <tr>
                    <th>Minimum Bid</th>
                    <td>{tender.minimum_bid}/-</td>
                  </tr>
                  <tr>
                    <th>Maximum Bid</th>
                    <td>{tender.maximum_bid}/-</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title as="h5">Enrollments</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vendor</th>
                    <th>Attachment</th>
                    <th>Negotiate</th>
                    <th>Contract</th>
                  </tr>
                </thead>
                <tbody>
                  {drafts.length > 0 ? (
                    drafts.map((draft, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{draft.farmer_name}</td>
                        <td className='link-primary'>
                          <a href={`https://farmlink-ewxs.onrender.com${draft.draftfile}`}>File</a>
                        </td>
                        <td className='link-info'>Message</td>
                        <td className='link-success'>Create a contract</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No enrollments available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title as="h5">Enroll</Card.Title>
              <span className="d-block m-t-5">
                Attach your draft (a detailed description like bid, personal info, etc.)
              </span>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={12} style={{ overflowX: 'auto' }}>
                  <Form className="d-inline-flex">
                    <Form.Group className="d-inline-flex mx-3 align-items-center">
                      <Form.Label className="mb-0">Email:</Form.Label>
                      <Form.Control className="mx-2" plaintext readOnly defaultValue="email@example.com" />
                    </Form.Group>
                    <Form.Group className="d-inline-flex mr-5 mx-3 align-items-center">
                      <Form.Control className="mx-4" type="file" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="d-inline-flex mx-3" style={{ overflow: 'unset' }}>
                      <Button className="mb-0">Submit Draft</Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Tender;
