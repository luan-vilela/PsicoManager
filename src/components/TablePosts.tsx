import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Post from "../interface/Post";

interface PostProps {
  posts: Post[];
  handleDelete: Function;
  handleOpen: Function;
}
export const TablePosts: React.FC<PostProps> = ({
  posts,
  handleOpen,
  handleDelete,
}: PostProps) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Título</th>
          <th scope="col">Post</th>
          <th scope="col">Opções</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={index}>
            <td scope="row" onClick={() => handleOpen(post)}>{post.id}</td>
            <td onClick={() => handleOpen(post)}>{post.title}</td>
            <td onClick={() => handleOpen(post)}>{post.body}</td>
            <td className="flex align-self-center">
              <Button variant="danger" onClick={() => handleDelete(post)}>
                <i className="bi bi-trash"></i> Excluir
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
