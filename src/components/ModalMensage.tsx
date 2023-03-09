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
          <Modal.Title>Excluir post?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className="text-danger text-center"> Atenção!</h1>
          <p className="text-danger text-center">
           {mensage}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-light" onClick={() => responseModal(true)}>
            Excluir
          </Button>
          <Button variant="btn btn-outline-primary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
