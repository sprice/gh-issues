import React from "react"
import PropTypes from "prop-types"

class ViewerHeader extends React.Component {
  render() {
    const { githubUrl } = this.props
    return (
      <header>
        <h2>Github Issue Viewer</h2>
        <h4 className="regular">{githubUrl}</h4>
      </header>
    )
  }
}

ViewerHeader.propTypes = {
  githubUrl: PropTypes.string.isRequired
}

export default ViewerHeader
