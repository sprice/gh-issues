import React from "react"
import { Consumer } from "../../SearchContext"

class Search extends React.Component {
  render() {
    return (
      <Consumer>
        {context => (
          <div className="search-page">
            <h1>GitHub Issue Viewer</h1>
            <label className="search-label" htmlFor="search">
              <input
                type="text"
                id="search"
                className="search-box"
                placeholder="Type a link to a GitHub repo!"
                value={context.githubUrl}
                onChange={context.handleUrlChange}
              />
            </label>
            <button onClick={context.searchIssues}>View Issues</button>
            {context.error ? (
              <h2 className="error">{context.error.message}</h2>
            ) : null}
          </div>
        )}
      </Consumer>
    )
  }
}

export default Search
