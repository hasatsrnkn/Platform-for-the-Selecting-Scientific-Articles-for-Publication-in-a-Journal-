import { Table } from "react-bootstrap";
import UserElement from "./UserElement";

const UserList = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Go To Profile</th>
          <th>New Role</th>
          <th>Submit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => {
          return (
            <UserElement
              key={user.idUser}
              id={user.idUser}
              name={user.name}
              surname={user.surname}
              username={user.username}
              email={user.email}
              role={user.role}
            ></UserElement>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UserList;
