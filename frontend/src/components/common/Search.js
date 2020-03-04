import React from 'react'

const Search = ({ basicSearchFunction }) => (

  <form onSubmit={(e) => e.preventDefault()}>
      <div className="control">
        <input className="input" placeholder="Search users by location" onChange={basicSearchFunction}/>
      </div>
  </form>

)

export default Search