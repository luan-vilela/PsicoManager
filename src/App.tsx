import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { useApi } from "./api/axios";
import { ModalComments } from "./components/ModalComments";
import { ModalCreate } from "./components/ModalCreate";
import { ModalMensage } from "./components/ModalMensage";
import { TablePosts } from "./components/TablePosts";
import Post from "./interface/Post";
import User from "./interface/User";
import Comment from "./interface/Comment";
import { SelectUsuarios } from "./components/SelectUsuarios";

function App() {
  const api = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [user, setUser] = useState<User>(Object);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>(Object);

  const [show, setShow] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);
  const [showComments, setShowComments] = useState(false);

  //Carrega posts do usuário selecionado
  const loadPostsUser = () => {
    api.get(`posts?userId=${user?.id}`).then((response) => {
      response.sort(ordem);
      setPosts(response);
    });
  };
  //Carrega usuário
  const loadUser = () => {
    return api.get("/users").then((response) => {
      setUsers(response);
      return response;
    });
  };

  //Carrega comentários
  const loadCommentPost = (post: Post) => {
    api.get(`comments?postId=${post.id}`).then((response) => {
      setComments(response);
      setPost(post);
      setShowComments(true);
    });
  };

  // Salva post
  const savePost = (post: Post) => {
    api.post("posts", post).then((response) => {
      let temp = [...posts, response];
      temp.sort(ordem);
      setPosts(temp);
      handleCloseCreate();
    });
  };

  // Comenta post
  const saveComent = (comment: Comment) => {
    api.post(`comments?postid=${comment.postId}`, comment).then((response) => {
      setComments([...comments, response]);
    });
  };

  //Remove post do DB
  const removePost = () => {
    api.delete(`posts/${post.id}`).then((response) => {
      if (Object.keys(response).length === 0) {
        const postCurrent = posts.filter((d) => d.title !== post.title);
        setPosts(postCurrent);
        handleCloseMensage();
      }
    });
  };

  // Salva comentário
  const saveComment = (body: string) => {
    const mycomment: Comment = {
      postId: post.id,
      id: user?.id,
      email: user?.email,
      name: user.name,
      body: body,
    };
    saveComent(mycomment);
  };

  //ordena
  const ordem = (a: Post, b: Post) => {
    return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
  };

  //Deleta post
  const del = (e: boolean) => {
    if (!e) return;

    if (post) {
    }
  };

  //Abre pop delete
  const handleOpenDelete = (item: Post) => {
    setPost(item);
    setShowExcluir(true);
  };

  //Carrega comentários do post
  const handleOpenComments = (item: Post) => {
    loadCommentPost(item);
  };

  const selectUser = (id: number) => {
    setUserId(id);
    setUser(users[id]);
  };

  // Controle view modal
  const handleCloseCreate = () => setShow(false);
  const handleCloseMensage = () => setShowExcluir(false);
  const handleCloseComments = () => setShowComments(false);

  // Carrega usuários
  useEffect(() => {
    loadUser().then((dataUser: User[]) => {
      setUser(dataUser[userId]);
    });
  }, []);

  //Carrega ou recarrega posts
  useEffect(() => {
    loadPostsUser();
  }, [user]);

  return (
    <>
      <h1 className="text-center">Mini twitter</h1>
      <div className="container-lg">
        <div className="d-flex justify-content-between my-2">
        <Button
          variant="primary"
          className="my-3"
          onClick={() => setShow(true)}
        >
          + Nova Postagem
        </Button>
        <SelectUsuarios users={users} userId={userId} handSelect={selectUser} />
        </div>
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
          user={user}
        />
      )}
    </>
  );
}

export default App;
