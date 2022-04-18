import React, { useState, useCallback, useEffect } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";

import { Container, Form, SubmitButton, List, DeleteButton } from "./style";
import { Link } from "react-router-dom";

import API from "../../services/api";

function Main() {

  const [newRepo, setNewRepo] = useState("");
  const [repository, setRepository] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null)

  //did mount

  useEffect(() => {
    const reposStorage = localStorage.getItem("repos");

    if (reposStorage) {
      setRepository(JSON.parse(reposStorage));
    }
  }, [])


  
  // did update
  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repository));
  }, [repository])


  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(null);
        try {

          if(newRepo === "") {
            throw new Error("Digite um repositório válido");
          }

          const response = await API.get(`/repos/${newRepo}`)

          const hasRepo = repository.find(repo => repo.name === newRepo);

          if(hasRepo) {
            throw new Error("Repositório já adicionado");
          }

          const data = {
            name: response.data.full_name,
          };

          setRepository([...repository, data]);
          setNewRepo("");
        } catch (err) {
          setAlert(true)
          console.log(err);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repository]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null)
  }

  const handleDelete = useCallback((repo) => {
    const find = repository.filter((r) => r.name !== repo);
    setRepository(find)
  }, [repository])

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositorios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Digite o nome do repositorio"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton Loading={loading ? 1 : 0}>
          {
            loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus size={14} color="#fff" />
            )
          }

          
        </SubmitButton>
      </Form>

      <List>
          {repository.map((repo) => (
            <li key={repo.name}>
              <span>
                <DeleteButton onClick={() => handleDelete(repo.name)}>
                  <FaTrash size={12}/>
                </DeleteButton>
                {repo.name}</span>
              <Link to={`/repository/${ encodeURIComponent(repo.name)}`}>
                <FaBars size={14} />
              </Link>
            </li>
          ))}
      </List>
    </Container>
  );
}

export default Main;
