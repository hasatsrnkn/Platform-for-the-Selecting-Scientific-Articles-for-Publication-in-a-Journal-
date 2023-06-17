import { Table } from "react-bootstrap";
import SectionEditorElement from "./SectionEditorElement";
const SectionEditorList = (props) => {
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
          <th>Section</th>
          <th>Go To Profile</th>
          <th>New Section</th>
          <th>Submit</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => {
          return (
            <SectionEditorElement
              key={user.user.idUser}
              id={user.user.idUser}
              name={user.user.name}
              surname={user.user.surname}
              username={user.user.username}
              email={user.user.email}
              section={user.section}
            ></SectionEditorElement>
          );
        })}
      </tbody>
    </Table>
  );
};

export default SectionEditorList;