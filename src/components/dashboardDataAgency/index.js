import React from 'react';
import './styles.css';
import { Card, CardBody, Container } from 'reactstrap';

// import { Container } from './styles';

const DashboardDataAgency = props => (
  <Card style={{ borderRadius: 12 }} className="card">
    <CardBody>
      <Container fluid>
        <div className="customCard">
          <h1 className="title-card">{props.title}</h1>
          <h2 className="type">{props.type}</h2>
        </div>
      </Container>
    </CardBody>
  </Card>
);

export default DashboardDataAgency;
