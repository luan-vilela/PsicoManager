import React, { useState } from "react";
import Post from "../interface/Post";
import Comment from "../interface/Comment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import "../assets/style.css";
import User from "../interface/User";

interface CommentsProps {
  comments: Comment[];
  post: Post;
  show: boolean;
  user: User;
  handleClose: VoidFunction;
  postNewComment: Function;
}

const InputComment = (props: any) => {

  return (
    <InputGroup className="mb-3 bg-white">
      <Form.Control
        placeholder="Escreva um comentário..."
        aria-label="Escreva um comentário..."
        aria-describedby="inpComent"
        autoFocus
        value={props.msg}
        onChange={(e) => props.setMsg(e.target.value)}
      />
      <Button variant="outline-primary" id="inpComent" onClick={props.send}>
        <i className="bi bi-send"></i>
      </Button>
    </InputGroup>
  );
};

export const ModalComments: React.FC<CommentsProps> = ({
  comments,
  show,
  post,
  handleClose,
  postNewComment,
  user,
}: CommentsProps) => {
  const [msg, setMsg] = useState("");

  const nameFormat = (value: string) => {
    return value.split("@")[0];
  };

  const send = () => {
    if (msg.trim().length < 1) {
      alert("Escreva um comentário");
      return;
    }
    postNewComment(msg);

    setMsg("")
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="text-center bg-primary text-white">
          <i className="bi bi-envelope-paper fs-3 me-2"></i>
          <Modal.Title> {post.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body"></div>
       
          {comments.map((comment: Comment, index) => (
            <div key={index} className={`comments ${user.email === comment.email ? "float_right" : "float_left"}`}>
              <small>@{nameFormat(comment.email)}</small>
              <p className={`ballon ${user.email === comment.email ? "ballon_right" : "ballon_left"}`}>{comment.body}</p>
            </div>
          ))}

          <InputComment msg={msg} setMsg={setMsg} send={send} />
        </Modal.Body>
      </Modal>
    </>
  );
};
