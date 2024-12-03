import { useState } from "react";

import "./App.css";
import CreateUser from "./components/CreateUser/CreateUser";
import UserList from "./components/userList/UserList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Create User</h1>
      <CreateUser />
      <UserList />
    </>
  );
}

export default App;
