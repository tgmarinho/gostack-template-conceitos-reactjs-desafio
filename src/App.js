import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tech, setTech] = useState("");
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRepositories = async () => {
    setLoading(true);
    const { data } = await api.get("/repositories");
    console.log(data);
    setLoading(false);
    setRepositories(data);
  };

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();

    api.post("/repositories", { title, url, techs });
    loadRepositories();
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    console.log("testing rodando");
    loadRepositories();
  }

  function handleAddTech(e) {
    if (!tech) return;
    setTechs([...techs, tech]);
    setTech("");
  }

  return !loading ? (
    <div>
      <ul data-testid="repository-list">
        {!!repositories.length &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>
      <br />
      Title: <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      Url: <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <br />
      Tech: <input value={tech} onChange={(e) => setTech(e.target.value)} />
      <button onClick={handleAddTech}>Adicionar Tech</button>
      <p>{techs.join(", ")}</p>
      <br />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  ) : (
    <p>Carregando...</p>
  );
}

export default App;
