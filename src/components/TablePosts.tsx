import Table from "react-bootstrap/Table";
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
          <th>#</th>
          <th>Título</th>
          <th>Post</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={index}>
            <td onClick={() => handleOpen(post)}>{post.id}</td>
            <td onClick={() => handleOpen(post)}>{post.title}</td>
            <td onClick={() => handleOpen(post)}>{post.body}</td>
            <td onClick={() => handleDelete(post)} className="flex align-self-center">
              <i className="bi bi-trash"></i>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
