import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css';

function HeaderAndFooterExample() {
  // Define a common card style with a fixed width
  const cardStyle = {
    width: '550px', // Standard width for all cards
    margin: '0 auto', // Center the card
  };

  // State to hold the tender data
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch tenders from the API
  useEffect(() => {
    const fetchTenders = async () => {
      setLoading(true);
      try {
        // Get accessToken from localStorage
        const accessToken = localStorage.getItem('accessToken');

        // Axios request with Authorization header
        const response = await axios.get('https://farmlink-ewxs.onrender.com/tender/tender/buyer/', {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add token to header
          },
        });

        setTenders(response.data); // Set the tender data to the state
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching tenders:', error);
        setLoading(false); // Stop the loader even on error
      }
    };

    fetchTenders();
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <Row className="justify-content-center"> {/* Center cards horizontally */}
      {loading ? (
        // Show Bootstrap spinner when data is being loaded
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        tenders.length > 0 ? (
          tenders.map((tender, index) => (
            <Col xs={12} md={6} className="d-flex justify-content-center mb-3" key={index}>
              <Card style={cardStyle} data-aos="fade-up"> {/* AOS animation */}
                <Card.Body>
                  <Card.Title>{tender.title}</Card.Title> {/* Dynamically display tender title */}
                  <Card.Text>
                    {tender.description} {/* Dynamically display tender description */}
                  </Card.Text>
                  <Button variant="primary">Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No tenders available.</p>
        )
      )}
    </Row>
  );
}

export default HeaderAndFooterExample;
