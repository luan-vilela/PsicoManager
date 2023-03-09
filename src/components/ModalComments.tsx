import React, { useState } from "react";
import Post from "../interface/Post";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface CommentsProps {
  comments: Comment[];
  post: Post;
  show: boolean;
  handleClose: VoidFunction;
  postNewComment: Function;
}

export const ModalComments: React.FC<CommentsProps> = ({
  comments,
  show,
  post,
  handleClose,
  postNewComment,
}: CommentsProps) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir post?</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
};
