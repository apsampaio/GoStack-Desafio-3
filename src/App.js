import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((res) => setRepositories(res.data));
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("/repositories", {
      title: "GoStack-Desafio-1",
      url: "https://github.com/apsampaio/GoStack-Desafio-1",
      techs: ["JavaScript", "NodeJS"],
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const newList = repositories.filter((repository) => repository.id !== id);
    setRepositories(newList);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
