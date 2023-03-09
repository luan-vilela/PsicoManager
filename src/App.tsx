import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { useApi } from "./api/axios";
import { ModalCreate } from "./components/ModalCreate";
import { ModalMensage } from "./components/ModalMensage";
import { TablePosts } from "./components/TablePosts";
import Post from "./interface/Post";

function App() {
  const api = useApi();
  const [posts, setPosts] = useState<Post[]>([]);
  const [show, setShow] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);

  useEffect(() => {
    api.get("posts?userId=1").then((r) => {
      r.sort(ordem);
      setPosts(r);
    });
  }, []);

  const savePost = (post: Post) => {
    handleClose();
    api.post("posts", post).then((r) => {
      let temp = [...posts, r];
      // setPosts(posts => [...posts, r]);
      // let temp = posts
      temp.sort(ordem);
      setPosts(temp);
    });
  };

  const ordem = (a: Post, b: Post) => {
    return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
  };

  const del = (e: boolean) => {
    console.log(e);
  };

  const handleDelete = (item: Post) => {
    setShowExcluir(true);

    //  api.delete("posts/1").then((r) => {
    //   if (Object.keys(r).length === 0) {
    //     const post = posts.filter((d) => d.title !== item.title);
    //     setPosts(post);
    //   }
    // });
  };

  const handleOpen = (item: Post) => {
    alert("abrindo");
  };

  const handleClose = () => setShow(false);

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
          handleOpen={handleOpen}
          handleDelete={handleDelete}
        />
      </div>
      {show && (
        <ModalCreate
          show={show}
          handleClose={handleClose}
          posts={posts}
          savePost={savePost}
        />
      )}
      {showExcluir && (
        <ModalMensage
          show={showExcluir}
          handleClose={handleClose}
          responseModal={del}
          mensage={
            "Ao excluir esta postagem os comentários também serão excluídos."
          }
        />
      )}
    </>
  );
}

export default App;
