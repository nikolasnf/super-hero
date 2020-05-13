import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Col,
  Row,
} from 'reactstrap';
import LoadingButton from '../LoadingButton';

const ModalExample = props => {
  const { toggle, modal, id, approved, approval } = props;
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Envie uma justificativa para o usuário
        </ModalHeader>
        <ModalBody>
          <Col sm={12}>
            <Input
              style={{ height: 150 }}
              type="textarea"
              name="text"
              onChange={e => setMessage(e.target.value)}
            />
          </Col>
          <Col sm={12}>
            <Label check>
              <Input
                style={{ position: 'relative', marginLeft: 0, marginTop: 12 }}
                type="checkbox"
                onChange={() => setChecked(!checked)}
              />{' '}
              Permitir reenvio de solicitação
            </Label>
          </Col>
        </ModalBody>
        <ModalFooter>
          <LoadingButton outline label="CANCELAR" onClick={toggle} />
          <LoadingButton
            label="ENVIAR"
            color="primary"
            onClick={() => {
              approval(id, approved, message, checked);
              toggle();
            }}
          />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
