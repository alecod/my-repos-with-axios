import React, {useState, useEffect} from 'react'
import {Container, Owner, Loading, BackButton, Issueslist, PageActions} from './style'
import {FaArrowLeft} from 'react-icons/fa'
import API from '../../services/api'


function Repository({match}) {

  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);


  useEffect(() => {
    async function loadRepository() {
      const nomeRepo = decodeURIComponent(match.params.repository)

      // const response = await API.get(`/repos/${nomeRepo}`)
      // const issues = await API.get(`/repos/${nomeRepo}/issues`)

     const [repositorioData, issuesData] = await Promise.all([
        API.get(`/repos/${nomeRepo}`), 
        API.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          }
        })
      ])

      setRepository(repositorioData.data);
      setIssues(issuesData.data);

      setLoading(false);

      console.log(repositorioData.data)
      console.log(issuesData.data)
    }

    loadRepository()

  }, [match.params.repository])


  useEffect(() => {


    async function loadIssues() {
      const nomeRepo = decodeURIComponent(match.params.repository)

      const response = await API.get (`/repos/${nomeRepo})/issues`, {
        params: {
          state: 'open',
          page: page,
          per_page: 5,
        }
      })

      setIssues(response.data);

    }

    loadIssues()

  }, [match.params.repository, page])


  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }


  if(loading) {
    return (
      <Loading>
        <h1>Carregando....</h1>
      </Loading>
    )
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft size={30} color="#222" />
      </BackButton>

      <Owner>
        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>

      <Issueslist>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login}/>

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>


                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}

              </strong>
              <p>{issue.user.login}</p>
            </div>

          </li>

        ))}

      </Issueslist>

      <PageActions>
        <button type="button" onClick={() => handlePage('back')}>Voltar</button>
        <button type="button" onClick={() => handlePage('next')}>Avançar</button>
      </PageActions>


    </Container>
  )
}

export default Repository