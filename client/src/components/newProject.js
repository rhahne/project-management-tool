import React, { Component } from 'react'
import axios from 'axios'

export default class NewProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }
  }
  handleChange = (event) => {
    let updateInput = {}
    updateInput[event.target.name] = event.target.value;
    this.setState(updateInput);
  }
  handleSubmit = (event) => {
    event.preventDefault()
    let newProject = this.state;
    axios({
      method: 'post',
      url: 'http://localhost:5000/project/newProject',
      data: newProject
    })
      .then((response) => {
        this.props.getAllProjects();
      })
      .catch((err) => {
        
      })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} action='http://localhost:5000/project/newProject'>
          <div className="field">
            <label className="label">
              New Project
            </label>
            <div className="control">
              <input className="input" onChange={this.handleChange} type="text" name="title" placeholder="title" value={this.state.title} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <textarea className="textarea" onChange={this.handleChange} name="description" placeholder="description" value={this.state.description}></textarea>
            </div>
          </div>
          <div className="control">
            <input className="button is-primary is-fullwidth" type="submit" value="Add Project" />
          </div>
        </form>
      </div>
    )
  }
}