import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Listing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: this.props.projects
    }
  }
  render() {
    const projects = this.props.projects.length > 0 ? this.props.projects : [];
    return (
      <div>
        {projects.map((project) => {
          return <div className="card custom-card">
          <header className="card-header">
            <p className="card-header-title">
              {project.title}
            </p>
            <span className="button close-button" id={project._id} onClick={this.props.deleteProject}>
              <FontAwesomeIcon icon="times" />
            </span>
          </header>
          <div className="card-content">
            <div className="content">
              {project.description}
            </div>
          </div>
          <div className="card-footer">
            <div className="card-footer-item">
              <span className="pointer" id={project._id} onClick={this.props.moveListBackward}>
                <FontAwesomeIcon icon="arrow-left" />
              </span>
            </div>
            <div className="card-footer-item">
              <span className="pointer" id={project._id} onClick={this.props.moveListForward}>
                <FontAwesomeIcon icon="arrow-right" />
              </span>
            </div>
          </div>
        </div>
        })}
      </div>
    )
  }
}