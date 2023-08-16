import "./styles.css";
import react, { useState } from "react";
import Modal, { contextType } from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./redux/store";
import users from "./redux/users";

interface EditmodalProps {
  open?: boolean;
  text?: string;
  data?: any;
}

const EditModal: React.FC<EditmodalProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(data.name);

  function openModal() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={(e) => openModal()}>Edit</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={close}
        style={{
          content: {
            height: 100,
            display: "flex",
            flexDirection: "row",
          },
        }}
      >
        <form>
          <input
            onChange={(e) => setNewName(e.currentTarget.value)}
            value={newName}
          />
          <button>Save</button>
        </form>
      </Modal>
    </>
  );
};

export default function App() {
  const [name, setName] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const usersList = useSelector((state: AppState) => state.users);

  const saveUser = (e: any) => {
    e.preventDefault();
    dispatch(users.actions.addUser(name));
    setName("");
  };

  const deleteUser = (e: any, user: any) => {
    e.preventDefault();
    dispatch(users.actions.deleteUser(user.id));
  };

  const editUser = (e: any, user: any) => {
    e.preventDefault();
    // openModal();
    // dispatch(users.actions.deleteUser(user.id));
  };

  return (
    <div className="App">
      <form onSubmit={(e) => saveUser(e)}>
        <input onChange={(e) => setName(e.currentTarget.value)} value={name} />
        <button>Send</button>
      </form>
      {usersList.map((user) => (
        <div className="user_card">
          {/* <p>{user.id}</p> */}
          <p>{user.name}</p>
          <button onClick={(e) => deleteUser(e, user)}>x</button>
          {/* <button onClick={(e) => editUser(e, user)}>Edit</button> */}
          <EditModal data={user} />
        </div>
      ))}
    </div>
  );
}
