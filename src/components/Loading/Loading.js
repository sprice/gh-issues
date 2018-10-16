import React from "react"
import PropTypes from "prop-types"
import ViewerHeader from "../../components/ViewerHeader"

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <ViewerHeader githubUrl={this.props.githubUrl} />
        <div className="spinner">
          <div className="spin" />
        </div>
      </div>
    )
  }
}

Loading.propTypes = {
  githubUrl: PropTypes.string.isRequired
}

export default Loading
