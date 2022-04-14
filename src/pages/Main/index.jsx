import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";

import { Container, Form, SubmitButton, List, DeleteButton } from "./style";

import API from "../../services/api";

function Main() {

  const [newRepo, setNewRepo] = useState("");
  const [repository, setRepository] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);

        try {
          const response = await API.get(`/repos/${newRepo}`);

          const data = {
            name: response.data.full_name,
          };

          setRepository([...repository, data]);
          setNewRepo("");
        } catch (err) {
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

      <Form onSubmit={handleSubmit}>
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
              <a href="ale">
                <FaBars size={14} />
              </a>
            </li>
          ))}
      </List>
    </Container>
  );
}

export default Main;
