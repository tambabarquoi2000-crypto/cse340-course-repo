// import { getAllProjects } from '../models/projects.js';
import { getUpcommingProjects, getProjectDetails } from '../models/projects.js';

const showProjectPage = async (req, res) => {
    const projects = await getUpcommingProjects(5);
    // console.log(projects);
    const title = 'Service Projects';
    res.render('projects', {title, projects})
}

const showProjectDeatailsPage = async (req, res) => {

    const previousPage = req.url;

    const projectID = req.params.id;

    // console.log(projectID);

    const validProjectID = /^\d+$/;

    if(!validProjectID.test(projectID)){
        res.status(400).send('The project ID is not valid')
    }

    const result = await getProjectDetails(projectID);
    const project = result[0];

    const title = project.title;

    res.render('project-details', {title, project, previousPage})

}



export { showProjectPage, showProjectDeatailsPage }

