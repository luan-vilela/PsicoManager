import React, { useState } from "react";
import Post from "../interface/Post";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface CreateProps {
  mensage: string;
  show: boolean;
  handleClose: VoidFunction;
  responseModal: Function;
}

export const ModalMensage: React.FC<CreateProps> = ({
  mensage,
  show,
  handleClose,
  responseModal,
}: CreateProps) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir esse post?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className="text-danger text-center"> Atenção!</h1>
          <p className="text-danger text-center">
           {mensage}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={responseModal(true)}>
            Sim
          </Button>
          <Button variant="primary" onClick={responseModal(false)}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
