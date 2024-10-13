import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HeaderAndFooterExample() {
  return (
    <Row>
      <Col xs={12} md={6}>
        <Card className="mb-3">

          <Card.Body>
            <Card.Title>Fresh Organic Tomato Supply Tender</Card.Title>
            <Card.Text>
            Inviting bids for the supply of high-quality, organic tomatoes for the upcoming season. Suppliers must ensure fresh, pesticide-free produce with consistent quality and timely delivery. The contract includes the delivery schedule, pricing terms, and volume requirements.
            </Card.Text>
            <Button variant="primary">Details</Button>
          </Card.Body>

        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card className="mb-3">

          <Card.Body>
            <Card.Title> Fresh Onion Supply Tender</Card.Title>
            <Card.Text>
            Seeking bids for the procurement of fresh, high-quality onions in bulk quantities. Suppliers must adhere to strict quality standards and ensure timely deliveries. The contract includes details on quantity, packaging, and delivery schedules for the upcoming season.
            </Card.Text>
            <Button variant="primary">Details</Button>
          </Card.Body>

        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card className="mb-3">

          <Card.Body>
            <Card.Title>Bulk Potato Procurement Tender</Card.Title>
            <Card.Text>
            Inviting bids for the supply of premium-grade potatoes. Suppliers must guarantee consistent quality, proper storage conditions, and timely delivery. The tender includes terms for pricing, volume, and delivery logistics.
            </Card.Text>
            <Button variant="primary">Details</Button>
          </Card.Body>

        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card className="mb-3">

          <Card.Body>
            <Card.Title>Organic Ragi Supply Tender</Card.Title>
            <Card.Text>
            Bids are invited for the supply of organic ragi (finger millet) to meet growing demand for nutritious grains. Suppliers should ensure pesticide-free, high-quality ragi with proper packaging and timely delivery. The contract specifies quantity requirements and delivery timelines.
            </Card.Text>
            <Button variant="primary">Details</Button>
          </Card.Body>

        </Card>
      </Col>


    </Row>
  );
}

export default HeaderAndFooterExample;
