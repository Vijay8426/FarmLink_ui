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
  const [file, setFile] = useState(null); // State to store the selected file
  const [buyerId, setBuyerId] = useState(null); // State to store the buyer ID

  const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token
  const userRole = localStorage.getItem('userRole'); // Retrieve the user role

  // Function to decode JWT and get user ID
  const getUserIdFromToken = (token) => {
    if (!token) return null;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decoded = JSON.parse(jsonPayload);
      return decoded.user_id || decoded.sub; // Adjust according to the structure of your payload
    } catch (error) {
      console.error("Error decoding access token", error);
      return null;
    }
  };

  // Fetch the buyer ID from the token
  useEffect(() => {
    const userId = getUserIdFromToken(accessToken);
    setBuyerId(userId);
  }, [accessToken]);

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

  // Fetch the drafts based on the tender ID if userRole is not 1
  useEffect(() => {
    if (tender && userRole === '2') {
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
  }, [tender, id, accessToken, userRole]);

  // Handle file change event
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle the draft submission
  const handleSubmitDraft = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file to submit.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('draftfile', file);

      await axios.post(`https://farmlink-ewxs.onrender.com/draft/drafts/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Draft submitted successfully!');
      setFile(null); // Reset the file input after successful submission
    } catch (error) {
      console.error("Error submitting the draft", error);
      alert('Failed to submit the draft.');
    }
  };

  // Function to handle contract creation
  const handleCreateContract = (farmerId) => {
    const contractUrl = `https://farmlink-ui.onrender.com/demos/admin-templates/datta-able/react/free/app/create-contract/${id}/${buyerId}/${farmerId}`;
    window.location.href=contractUrl
    // Redirect to the contract creation page
  };

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

          {/* Conditionally render the Enrollments section for userRole 2 */}
          {userRole === '2' && (
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
                          <td className='link-success' onClick={() => handleCreateContract(draft.farmer)} style={{ cursor: 'pointer' }}>
                            Create a contract
                          </td>
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
          )}

          {/* Conditionally render the Enroll card for userRole 1 */}
          {userRole === '1' && (
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
                    <Form className="d-inline-flex" onSubmit={handleSubmitDraft}>
                      <Form.Group className="d-inline-flex mx-3 align-items-center">
                        <Form.Label className="mb-0">Email:</Form.Label>
                        <Form.Control className="mx-2" plaintext readOnly defaultValue="email@example.com" />
                      </Form.Group>
                      <Form.Group className="d-inline-flex mr-5 mx-3 align-items-center">
                        <Form.Control className="mx-4" type="file" onChange={handleFileChange} />
                      </Form.Group>
                      <Form.Group className="d-inline-flex mx-3" style={{ overflow: 'unset' }}>
                        <Button className="mb-0" type="submit">Submit Draft</Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Tender;
