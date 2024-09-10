import { useEffect, useState } from "react";
import axios from "axios";
import CreateCardModal from "./components/CreateCardModal";
import EditModal from "./components/EditModal";

export const BASE_URL = "https://0202-103-25-44-74.ngrok-free.app/api";
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${BASE_URL}/friends`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setUsers(res?.data);
      console.log(res);
    };
    fetchUsers();
  }, []);

  const deleteCard = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/friends/${id}`);
      console.log(res);
      if (res?.data?.message) {
        window.location.reload();
      }
    } catch (error) {
      console.log("failed to delete", error);
      alert("failed to delete\n", error);
    }
  };

  return (
    <div style={{ width: 800, maxWidth: "100%" }}>
      <CreateCardModal />
      <div>
        {users?.map((user, ind) => (
          <div
            key={user?.id}
            style={{
              padding: 10,
              backgroundColor: ind % 2 === 0 ? "lightgrey" : "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              // width: 350,
              margin: 10,
              // height: 100,
              border: "1px solid grey",
            }}
          >
            <p>name: {user?.name}</p>
            <p>role: {user?.role}</p>
            <p>description: {user?.description}</p>
            <p>gender: {user?.gender}</p>
            <button onClick={() => deleteCard(user?.id)}>delete</button>
            <EditModal user={user} setUsers={setUsers} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
