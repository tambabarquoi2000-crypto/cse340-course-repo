// import { getAllProjects } from '../models/projects.js';
import { getUpcommingProjects, getProjectDetails, createNewProject, updateProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title can not be empty')
        .isLength({ min: 3, max: 150 })
        .withMessage('Project name is between 3 to 150 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description can not be empty')
        .isLength({ max: 500 })
        .withMessage('Project description can not exceed 500 characters.'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('project location can not be empty.')
        .isLength({ min: 3, max: 150 })
        .withMessage('Project location should be between 3 to 150 characters'),

    body('date')
        .trim()
        .notEmpty()
        .withMessage('Project can not be empty')
        .isISO8601()
        .withMessage('Please enter a valid date'),

    body('orgId')
        .trim()
        .notEmpty()
        .withMessage('Organization ID can not be empty.')
        .isInt()
        .withMessage('Organization ID must be an integer')
];


const showProjectPage = async (req, res) => {
    const projects = await getUpcommingProjects(5);
    // console.log(projects);
    const title = 'Service Projects';
    res.render('projects', { title, projects })
}

const showProjectDeatailsPage = async (req, res) => {


    const projectID = req.params.id;

    // console.log(projectID);

    const validProjectID = /^\d+$/;

    if (!validProjectID.test(projectID)) {
        res.status(400).send('The project ID is not valid')
    }

    const result = await getProjectDetails(projectID);
    console.log(result);
    const project = result[0];

    if (!result.length > 0) {
        return res.status(400).send('There is no complete project for this route.');
    }

    const title = project.title;

    res.render('project-details', { title, project })

}

const showNewProjectForm = async (req, res) => {


    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });

}

const processNewProjectForm = async (req, res) => {

    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach(error => {
            req.flash('error', error.msg)
        });

        return res.redirect('/new-project');
    }

    const { title, description, date, location, orgId } = req.body;
    const result = await createNewProject(title, description, location, date, orgId);

    const projectId = result[0].project_id;

    req.flash('Success', 'New service project creted successfully!')
    res.redirect(`/project/${projectId}`);

}

const showProjectEditForm = async (req, res) => {


    const projectId = req.params.id;
    const projectDetailsResult = await getProjectDetails(projectId);
    const projectDetails = projectDetailsResult[0];
    console.log('Project Details:', projectDetails);

    const organizations = await getAllOrganizations();

    const title = 'Edit Project'

    res.render('edit-project', { title, projectDetails, organizations });
}

const processEditProject = async (req, res) => {

    const projectId = req.params.id;
    const { title, description, location, date, orgId } = req.body;

    await updateProject(title, description, location, date, orgId, projectId);

    req.flash('success', 'Project updateed successfully');
    res.redirect(`/project/${projectId}`);
}



export {
    showProjectPage,
    showProjectDeatailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showProjectEditForm,
    processEditProject
}

