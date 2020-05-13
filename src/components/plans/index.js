import React from 'react';
import './styles.css';
import { Button } from 'reactstrap';
// import { Container } from './styles';

const Plans = props => {
  const { title, price, description, onClick, style, assign } = props;
  return (
    <div style={style} className="sub-card">
      <p className="title">{title}</p>
      <p className="description">{description}</p>
      <p className="price">{`R$ ${price}`}</p>
      {assign ? (
        <Button color="" className="highlight-button" onClick={onClick}>
          Destacar!
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Plans;
