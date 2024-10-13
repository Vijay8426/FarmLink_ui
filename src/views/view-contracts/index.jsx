import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const BootstrapTable = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>

          <Card>
            <Card.Header>
              <Card.Title as="h5">Contracts Signed</Card.Title>

            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th> Promisor</th>
                    <th> Promisee</th>
                    <th>Contract title</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Tomato</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Mark</td>
                    <td>Thornton</td>
                    <td>Potato</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Mark</td>
                    <td>the Bird</td>
                    <td>Raagi</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Contracts Pending</Card.Title>

            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th> Promisor</th>
                    <th> Promisee</th>
                    <th>Contract title</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Tomato</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Mark</td>
                    <td>Thornton</td>
                    <td>Potato</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Mark</td>
                    <td>the Bird</td>
                    <td>Raagi</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Contracts Completed</Card.Title>

            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th> Promisor</th>
                    <th> Promisee</th>
                    <th>Contract title</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Tomato</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Mark</td>
                    <td>Thornton</td>
                    <td>Potato</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Mark</td>
                    <td>the Bird</td>
                    <td>Raagi</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BootstrapTable;
