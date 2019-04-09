import React, { Component } from 'react';
import './App.css';
import NewProject from './components/newProject'
import Listing from './components/listing'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowLeft, faArrowRight, faTimes)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
    this.moveListForward = this.moveListForward.bind(this)
    this.moveListBackward = this.moveListBackward.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
  }
  componentDidMount() {
    this.getAllProjects();
  }
  getAllProjects() {
    axios({method: 'get', url: 'http://localhost:5000/project/getAll'})
    .then((response) => {
        this.setState({ 
            projects: response.data,
        })
    })
    .catch((err) => {
    })
  }
  // ToDo: combine moveListForward and moveListBackward
  moveListForward(event) {
    const projectId = event.currentTarget.id;
    axios({
      method: 'get',
      url: 'http://localhost:5000/project/updateProjectList',
      params: {
        id: projectId
      }
    })
    .then(response => {
      this.setState({ 
            projects: response.data,
        })
    })
  }
  moveListBackward(event) {
    const projectId = event.currentTarget.id;
    axios({
      method: 'get',
      url: 'http://localhost:5000/project/updateProjectListBack',
      params: {
        id: projectId
      }
    })
    .then(response => {
      this.setState({ 
            projects: response.data,
        })
    })
  }
  deleteProject(event) {
    const projectId = event.currentTarget.id;
    axios({
      method: 'get',
      url: 'http://localhost:5000/project/deleteProject',
      params: {
        id: projectId
      }
    })
    this.getAllProjects();
  }
  render() {

    // ToDo:
    // make projects 1-6 dynamically!

    let projects1 = [];
    let projects2 = [];
    let projects3 = [];
    let projects4 = [];
    let projects5 = [];
    let projects6 = [];
    if(this.state.projects.length > 1){
      projects1 = this.state.projects.filter(project => project.task === 1)
      projects2 = this.state.projects.filter(project => project.task === 2)
      projects3 = this.state.projects.filter(project => project.task === 3)
      projects4 = this.state.projects.filter(project => project.task === 4)
      projects5 = this.state.projects.filter(project => project.task === 5)
      projects6 = this.state.projects.filter(project => project.task === 6)
    }
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="container">
            <div id="navbarBasicExample" className="navbar-menu columns has-text-centered">
              <span className="navbar-item column">
                Flowcharts
              </span>
              <span className="navbar-item column">
                Wireframes
              </span>
              <span className="navbar-item column">
                Prototype
              </span>
              <span className="navbar-item column">
                Development
              </span>
              <span className="navbar-item column">
                Test
              </span>
              <span className="navbar-item column">
                Launch
             </span>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="columns">
            <div className="column lists">
              <Listing moveListForward={this.moveListForward} moveProject={this.moveProject} deleteProject={this.deleteProject} task="1" projects={projects1} />
            </div>
            <div className="column lists">
              <Listing moveListBackward={this.moveListBackward} moveListForward={this.moveListForward} deleteProject={this.deleteProject} task="2" projects={projects2}/>
            </div>
            <div className="column lists">
              <Listing moveListBackward={this.moveListBackward} moveListForward={this.moveListForward} deleteProject={this.deleteProject} task="3" projects={projects3}/>
            </div>
            <div className="column lists">
              <Listing moveListBackward={this.moveListBackward} moveListForward={this.moveListForward} deleteProject={this.deleteProject} task="4" projects={projects4}/>
            </div>
            <div className="column lists">
              <Listing moveListBackward={this.moveListBackward} moveListForward={this.moveListForward} deleteProject={this.deleteProject} task="5" projects={projects5}/>
            </div>
            <div className="column lists">
              <Listing moveListBackward={this.moveListBackward} deleteProject={this.deleteProject} task="6" projects={projects6}/>
            </div>
          </div>
          <div className="bottomLeft custom-card">
            <NewProject getAllProjects={this.getAllProjects.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
