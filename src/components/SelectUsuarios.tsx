import Form from "react-bootstrap/Form";
import User from "../interface/User";

interface UsersProps {
  users: User[];
  userId: number;
  handSelect: Function;
}
export const SelectUsuarios: React.FC<UsersProps> = ({
  users,
  userId,
  handSelect,
}: UsersProps) => {
  return (
    <Form.Select aria-label="selecione usuário" className="w-25" onChange={(e) => handSelect(Number(e.target.value))}>
      {users.map((user: User, index) => (
        <option key={index} value={index}>
          {user.name}
        </option>
      ))}
    </Form.Select>
  );
};
