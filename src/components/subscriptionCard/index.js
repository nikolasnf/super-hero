import React from 'react';
import './styles.css';
import { Button } from 'reactstrap';
// import { Container } from './styles';

const SubscriptionCard = props => {
  const { title, price, agents, onClick, style } = props;
  return (
    <Button style={style} color="" className="sub-card" onClick={onClick}>
      <p className="title-card-sub">{title}</p>
      <p className="price">{`R$ ${price}/mês`}</p>
      <p className="agent">{`Até ${agents} corretores`}</p>
      <p className="agent2">vinculados</p>
    </Button>
  );
};

export default SubscriptionCard;
