var express = require('express');
var router = express.Router();

const Project = require('../models/project.js')

/* GET all projects from db */
router.get('/getAll', (req, res) => {
  Project.find({})
  .then((allProjects) => {
    res.json(allProjects)
  })
})

/* move Project to another List */
router.get('/updateProjectList', (req, res) => {
  Project.findOneAndUpdate({_id: req.query.id}, { $inc: {task:1}})
  .then(() => {
    Project.find({})
    .then((allProjects) => {
      res.json(allProjects)
    })
  })
  .catch(err => {
  })
})

router.get('/updateProjectListBack', (req, res) => {
  Project.findOneAndUpdate({_id: req.query.id}, { $inc: {task:-1}})
  .then(() => {
    Project.find({})
    .then((allProjects) => {
      res.json(allProjects)
    })
  })
})

router.get('/deleteProject', (req, res) => {
  Project.findOneAndRemove({_id: req.query.id})
  .then((updatedList) => {
    Project.find({})
    .then((allProjects) => {
      res.json(allProjects)
    })
  })
})

/* POST new project from form submit */
router.post('/newProject', (req, res) => {
  Project.create({
    title: req.body.title,
    description: req.body.description,
    task: 1
  })
  .then(() => {
    Project.find({})
    .then((allProjects) => {
      res.json(allProjects)
    })
  })
  .catch(err => {
    res.status(400).json({
      message: 'Project could not be created!'
    })
  })
})

module.exports = router;