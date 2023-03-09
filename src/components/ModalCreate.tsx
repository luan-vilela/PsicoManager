import React, { useState } from "react";
import Post from "../interface/Post";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface CreateProps {
  posts: Post[];
  show: boolean;
  handleClose: VoidFunction;
  savePost: Function;
}

export const ModalCreate: React.FC<CreateProps> = ({
  posts,
  show,
  handleClose,
  savePost,
}: CreateProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSave = () => {
    if (!title || !body) return;

    if (existTitle()) {
      return alert(`Título ${title.trim()} já existe!`);
    }

    const p = {
      userId: 1,
      title: title.trim(),
      body: body,
    };
    savePost(p);
  };

  const existTitle = () => {
    return posts.find((item) => item.title === title.trim());
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="titulo001">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="body"
                autoFocus
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="titulo002">
              <Form.Label>Post</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                defaultValue={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
