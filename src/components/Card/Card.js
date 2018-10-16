import React from "react"
import PropTypes from "prop-types"

class Card extends React.Component {
  static Icons = ({ isClosed, isPullRequest }) => (
    <div>
      {isClosed ? <i className="icon closed" /> : null}
      {isPullRequest ? <i className="icon pull-request" /> : null}
    </div>
  )

  static Title = ({ children }) => (
    <div className="card-title">
      <h4 className="regular">{children}</h4>
    </div>
  )
  static Body = ({ children }) => (
    <div className="card-body">
      <p>{children || "No description provided."}</p>
    </div>
  )
  static Label = ({ children }) => (
    <small className="card-label light">&#8226; {children}</small>
  )

  render() {
    return (
      <div className="card">
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            isClosed: this.props.isClosed,
            isPullRequest: this.props.isPullRequest
          })
        )}
      </div>
    )
  }
}

Card.propTypes = {
  children: PropTypes.any.isRequired,
  isClosed: PropTypes.bool,
  isPullRequest: PropTypes.bool
}

export default Card
