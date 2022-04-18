import React, {useState, useEffect} from 'react'
import {Container} from './style'
import API from '../../services/api'


function Repository({match}) {

  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);


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

  }, [])

  return (
    <Container>
   
      
    </Container>
  )
}

export default Repository