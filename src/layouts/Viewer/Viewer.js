import React from "react"
import PropTypes from "prop-types"
import ViewerHeader from "../../components/ViewerHeader"
import IssueFilter from "../../components/IssueFilter"
import Card from "../../components/Card"
import Loading from "../../components/Loading"
import { Consumer } from "../../SearchContext"

class Viewer extends React.Component {
  componentDidMount() {
    // If there is a full page load on this page we need to load up
    // some state based on URL params.
    if (!this.props.searchParams.githubUrl) {
      this.props.searchParams.getIssues(this.props.owner, this.props.repo)
      if (
        this.props.visibilityFilter !== this.props.searchParams.visibilityFilter
      ) {
        this.props.searchParams.updateStateFromUrl(
          this.props.owner,
          this.props.repo,
          this.props.visibilityFilter
        )
      }
    }
  }

  render() {
    const error = this.props.searchParams.error
    if (this.props.searchParams.loading) {
      return <Loading githubUrl={this.props.searchParams.githubUrl} />
    }
    return (
      <div className="viewer-page">
        <ViewerHeader githubUrl={this.props.searchParams.githubUrl} />
        <IssueFilter
          getIssues={this.props.searchParams.getIssues}
          owner={this.props.owner}
          repo={this.props.repo}
          visibilityFilter={this.props.visibilityFilter}
          clearState={this.props.searchParams.clearState}
        />
        {error ? <h2 className="error">{error.message}</h2> : null}
        <div className="cards">
          {!error &&
            this.props.searchParams.issues.map(issue => {
              const isClosed = !!issue.closed_at
              const isPullRequest = !!issue.pull_request
              return (
                <Card
                  isClosed={isClosed}
                  isPullRequest={isPullRequest}
                  key={issue.number}
                >
                  <Card.Icons />
                  <Card.Title>{issue.title.substring(0, 60)}</Card.Title>
                  <Card.Body>{issue.body.substring(0, 100)}</Card.Body>
                  {issue.labels.map(label => (
                    <Card.Label key={label.id}>{label.name}</Card.Label>
                  ))}
                </Card>
              )
            })}
        </div>
      </div>
    )
  }
}

Viewer.propTypes = {
  searchParams: PropTypes.shape({
    getIssues: PropTypes.func.isRequired,
    visibilityFilter: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    githubUrl: PropTypes.string.isRequired,
    updateStateFromUrl: PropTypes.func.isRequired,
    issues: PropTypes.array.isRequired,
    clearState: PropTypes.func.isRequired,
    error: PropTypes.object
  }).isRequired,
  owner: PropTypes.string,
  repo: PropTypes.string,
  visibilityFilter: PropTypes.string
}

export default function ViewerWithContext(props) {
  return (
    <Consumer>
      {context => <Viewer {...props} searchParams={context} />}
    </Consumer>
  )
}
