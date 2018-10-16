import React from "react"
import PropTypes from "prop-types"
import { Link } from "@reach/router"
import classNames from "classnames"
import constants from "../../constants"

class IssueFilter extends React.Component {
  handleClickAll = () => {
    this.props.getIssues(
      this.props.owner,
      this.props.repo,
      constants.FILTER.ALL
    )
  }

  handleClickOpen = () => {
    this.props.getIssues(
      this.props.owner,
      this.props.repo,
      constants.FILTER.OPEN
    )
  }

  handleClickClosed = () => {
    this.props.getIssues(
      this.props.owner,
      this.props.repo,
      constants.FILTER.CLOSED
    )
  }

  handleClickPull = () => {
    this.props.getIssues(
      this.props.owner,
      this.props.repo,
      constants.FILTER.PULL
    )
  }

  render() {
    const allIsActive = this.props.visibilityFilter === constants.FILTER.ALL
    const all = classNames({ active: allIsActive })

    const openIsActive = this.props.visibilityFilter === constants.FILTER.OPEN
    const open = classNames({ active: openIsActive })

    const closedIsActive =
      this.props.visibilityFilter === constants.FILTER.CLOSED
    const closed = classNames({ active: closedIsActive })

    const pullIsActive = this.props.visibilityFilter === constants.FILTER.PULL
    const pull = classNames({ active: pullIsActive })

    const baseUrl = `/viewer/${this.props.owner}/${this.props.repo}/`

    return (
      <div className="issue-filter">
        <div className="filters">
          <Link
            to={`${baseUrl}${constants.FILTER.ALL}`}
            className={all}
            onClick={this.handleClickAll}
          >
            All Issues
          </Link>
          <Link
            to={`${baseUrl}${constants.FILTER.OPEN}`}
            className={open}
            onClick={this.handleClickOpen}
          >
            Open Issues
          </Link>
          <Link
            to={`${baseUrl}${constants.FILTER.CLOSED}`}
            className={closed}
            onClick={this.handleClickClosed}
          >
            Closed Issues
          </Link>
          <Link
            to={`${baseUrl}${constants.FILTER.PULL}`}
            className={pull}
            onClick={this.handleClickPull}
          >
            Pull Requests
          </Link>
        </div>
        <div className="close-viewer">
          <Link to="/" onClick={this.props.clearState}>
            <i className="icon close" />
          </Link>
        </div>
      </div>
    )
  }
}

IssueFilter.propTypes = {
  getIssues: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  clearState: PropTypes.func.isRequired
}

export default IssueFilter
