import React from "react"
import PropTypes from "prop-types"
import axios from "axios"
import { Router, Location, navigate } from "@reach/router"
import posed, { PoseGroup } from "react-pose"
import { Provider } from "./SearchContext"
import Search from "./layouts/Search"
import Viewer from "./layouts/Viewer"
import constants from "./constants"

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100 },
  exit: { opacity: 0 }
})

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => {
      // Only transition between <Search> and <Viewer>
      const page = location.pathname.split("/")[1]
      return (
        <PoseGroup>
          <RouteContainer key={page}>
            <Router location={location}>{children}</Router>
          </RouteContainer>
        </PoseGroup>
      )
    }}
  </Location>
)

PosedRouter.propTypes = {
  children: PropTypes.any.isRequired
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      visibilityFilter: constants.FILTER.ALL,
      loading: false,
      githubUrl: "",
      owner: "",
      repo: "",
      issues: [],
      error: null,
      handleUrlChange: this.handleUrlChange,
      searchIssues: this.searchIssues,
      getIssues: this.getIssues,
      updateStateFromUrl: this.updateStateFromUrl,
      clearState: this.clearState
    }

    this.state = this.initialState
  }

  handleUrlChange = event => {
    const githubUrl = event.target.value
    this.setState({ githubUrl })
  }

  // Called when a GitHub URL is pasted into the <Search> component
  searchIssues = () => {
    this.setState({ error: null })
    const url = this.state.githubUrl
    const validGitHubUrl = /https:\/\/github.com\//
    const match = url.match(validGitHubUrl)
    if (match) {
      const githubUrl = url
      const parts = githubUrl.split("https://github.com/")[1].split("/")
      const owner = parts[0]
      const repo = parts[1]
      this.setState({ githubUrl, owner, repo }, () => {})
      this.getIssues(owner, repo, constants.FILTER.ALL)
      navigate(`/viewer/${owner}/${repo}/all`)
    } else {
      this.setState({
        error: { message: "Not a valid GitHub URL. Don't forget https:// :)" }
      })
    }
  }

  // Called after loading up the results page and also when
  // filtering issues.
  // Caches results in localStorage.
  getIssues = (owner, repo, state = constants.FILTER.ALL, callback) => {
    this.setState({ error: null, visibilityFilter: state })
    if (!owner || !repo) {
      this.setState(
        { error: { message: "Error getting issues. Did you paste the URL?" } },
        callback
      )
      return
    }

    let issueState = state
    // Note the GitHub API does not allow us to search for only pull requests.
    // We can filter out PR's from all issues.
    if (issueState === constants.FILTER.PULL) {
      issueState = constants.FILTER.ALL
    }

    // The GitHub API is rate limited so we cache issues for 1 hour
    const cacheExpireKey = `issues:expiry:${owner}:${repo}:${state}`
    const cacheKey = `issues:${owner}:${repo}:${state}`
    const cacheExpireTime = localStorage.getItem(cacheExpireKey)
    const cachedIssues = localStorage.getItem(cacheKey)

    const now = new Date().getTime()
    let cacheIsExpired = false
    if (cacheExpireTime <= now) cacheIsExpired = true

    this.setState({ loading: true })
    if (cachedIssues && !cacheIsExpired) {
      const issues = JSON.parse(cachedIssues)
      this.setState({ issues, loading: false }, callback)
    } else {
      const url = `${
        constants.GH_API_BASE
      }repos/${owner}/${repo}/issues?state=${issueState}`
      axios
        .get(url, {
          headers: { Accept: "application/vnd.github.symmetra-preview+json" }
        })
        .then(response => {
          let issues = response.data
          // If we need to, check if the issue is a pull request.
          if (state === constants.FILTER.PULL) {
            issues = issues.filter(issue => {
              return issue.pull_request
            })
          }
          if (!issues.length) {
            this.setState(
              {
                error: {
                  message: "There are no issues for this search filter."
                },
                loading: false
              },
              callback
            )
          } else {
            const hour = 1 * 60 * 60 * 1000
            const cacheEnd = now + hour
            this.setState({ issues, loading: false }, callback)
            localStorage.setItem(cacheKey, JSON.stringify(issues))
            localStorage.setItem(cacheExpireKey, cacheEnd)
          }
        })
        .catch(error => {
          this.setState({ error, loading: false }, callback)
        })
    }
  }

  // Refresh state. Used when doing a full page load on the <Viewer>
  // component.
  updateStateFromUrl = (owner, repo, visibilityFilter) => {
    const githubUrl = `https://github.com/${owner}/${repo}`
    this.setState({ githubUrl, owner, repo, visibilityFilter })
    this.getIssues(owner, repo, visibilityFilter)
  }

  // Clear the state when leaving the <Viewer> back to <Search>
  clearState = () => {
    this.setState(this.initialState)
  }

  render() {
    return (
      <Provider value={this.state}>
        <PosedRouter>
          <Search path="/" />
          <Viewer path="/viewer/:owner/:repo/:visibilityFilter" />
        </PosedRouter>
      </Provider>
    )
  }
}

export default App
