import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { useApi } from "./api/axios";
import { ModalComments } from "./components/ModalComments";
import { ModalCreate } from "./components/ModalCreate";
import { ModalMensage } from "./components/ModalMensage";
import { TablePosts } from "./components/TablePosts";
import Post from "./interface/Post";

function App() {
  const api = useApi();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>(Object);
  const [show, setShow] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    api.get("posts?userId=1").then((r) => {
      r.sort(ordem);
      setPosts(r);
    });
  }, []);

  const savePost = (post: Post) => {
    api.post("posts", post).then((r) => {
      let temp = [...posts, r];
      temp.sort(ordem);
      setPosts(temp);
      handleCloseCreate();
    });
  };

  const saveComment = (body: string) => {
    alert(body)
  };

  const ordem = (a: Post, b: Post) => {
    return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
  };

  const del = (e: boolean) => {
    if (!e) return;
    console.log(post);
    if (post) {
      api.delete(`posts/${post.id}`).then((r) => {
        if (Object.keys(r).length === 0) {
          const postCurrent = posts.filter((d) => d.title !== post.title);
          setPosts(postCurrent);
          handleCloseMensage();
        }
      });
    }
  };

  const handleOpenDelete = (item: Post) => {
    setPost(item);
    setShowExcluir(true);

  };

  const handleOpenComments = (item: Post) => {
    setPost(item);
    setShowComments(true)
  };

  const handleCloseCreate = () => setShow(false);
  const handleCloseMensage = () => setShowExcluir(false);
  const handleCloseComments = () => setShowComments(false);

  return (
    <>
      <h1>Micro twitter</h1>
      <div className="container-lg">
        <Button
          variant="primary"
          className="my-3"
          onClick={() => setShow(true)}
        >
          + Nova Postagem
        </Button>
        <TablePosts
          posts={posts}
          handleOpen={handleOpenComments}
          handleDelete={handleOpenDelete}
        />
      </div>

      {show && (
        <ModalCreate
          show={show}
          handleClose={handleCloseCreate}
          posts={posts}
          savePost={savePost}
        />
      )}
      {showExcluir && (
        <ModalMensage
          show={showExcluir}
          handleClose={handleCloseMensage}
          responseModal={del}
          mensage={
            "Ao excluir esta postagem os comentários também serão excluídos."
          }
        />
      )}
      {showComments && (
        <ModalComments
          show={showComments}
          handleClose={handleCloseComments}
          comments={comments}
          post={post}
          postNewComment={saveComment}
        />
      )}
    </>
  );
}

export default App;
