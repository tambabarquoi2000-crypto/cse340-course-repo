import { getAllOrganizations, getOrganizationDetailsById } from "../models/organizations.js";
import { getProjectsByOrganizationId } from "../models/projects.js";


const showOrganizationPage = async (req, res) =>
{
   const organizations = await getAllOrganizations();
    //    console.log(organizations);
       const title = 'Our Partner Organizations';
   
       res.render('organizations', { title, organizations })
}

const showOrganizationDetailPage = async (req, res) => {
    const orgId = req.params.id;

    const validIdPattern = /^\d+$/;

    if(!validIdPattern.test(orgId)) {
        res.status(400).send('The organization ID is not valid')
    }


    const orgDetails = await getOrganizationDetailsById(orgId);
    const projects = await getProjectsByOrganizationId(orgId);

    console.log(orgDetails);
    console.log(projects);

    const title = `${orgDetails[0].name} Projects`;
    

    res.render('organization-details', {orgDetails, projects, title})


}

export { showOrganizationPage, showOrganizationDetailPage }

