import { useState } from "react";
import { UserForm } from "./component/UserForm";
import { UserList } from "./component/UserList";

function App() {
  const [users, setUsers] = useState([])

  const onUserAdd = (user) => {
    setUsers([...users, user])
  }

  return (
    <div>
      <UserForm onUserAdd={onUserAdd} />
      <hr />
      <UserList users={users} />
    </div>
  )
}

export default App;