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
  const { handleShowModal, showModal, onClick, title } = props;
  return (
    <div>
      <Modal
        style={{ marginTop: '10%' }}
        isOpen={showModal}
        toggle={handleShowModal}
      >
        <ModalHeader toggle={handleShowModal}>{title}</ModalHeader>
        <ModalFooter>
          <LoadingButton
            label="CONFIRMAR"
            color="primary"
            onClick={() => onClick()}
          />
          <LoadingButton outline label="CANCELAR" onClick={handleShowModal} />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
