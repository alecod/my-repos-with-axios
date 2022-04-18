import React from 'react'

function Repository({match}) {
  return (
    <div>
      <h1>Repository</h1>
      {decodeURIComponent(match.params.repository)}
    </div>
  )
}

export default Repository