import {body, validationResult} from 'express-validator';

import { getAllOrganizations, getOrganizationDetailsById, createOrganization, updateOrganization } from "../models/organizations.js";
import { getProjectsByOrganizationId } from "../models/projects.js";


const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({min: 3, max: 150})
        .withMessage('Organization name must be between 3 to 150 characters.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({max: 500})
        .withMessage('Organization description can not exceed 500 characters.'),

    body('contactEmail')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact Email is required')
        .isEmail()
        .withMessage('Please provide a valid email.')

];

const showOrganizationPage = async (req, res) =>
{
   const organizations = await getAllOrganizations();
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

    const title = `${orgDetails[0].name} Projects`;
    

    res.render('organization-details', {orgDetails, projects, title})


}

const showNewOrganizationForm = async (req, res) => {

    const title = 'Add New Organization';
    
    res.render('new-organization', {title});
}


const processNewOrganizationForm = async (req, res) => {

    const results = validationResult(req);
    
    if(!results.isEmpty()) {
        results.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-organization');
    }

    const {name, description, contactEmail} = req.body;
    const placeHolderImage = 'placeholder-logo.png';

    const newOrgId = await createOrganization(name, description, contactEmail, placeHolderImage);
    
    req.flash('Success', 'Organization added successfully!')

    res.redirect(`/organization/${newOrgId}`);
}

const showEditOrganizationForm = async (req, res) =>
{
    const orgId = req.params.id;
    const title = 'Edit Organization'
    
    const result = await getOrganizationDetailsById(orgId)

    res.render('edit-organization', { title, result })
    // res.send('This route was requested.')


}

const processEditOrganization = async (req, res) => {
    
    const results = validationResult(req);

    if(!results.isEmpty()){
        results.array.forEach(result =>
        {
            req.flash('error', result.msg);

        }
        )

        return res.redirect('/edit-organization/' + req.params.id)
    }

    const org_id = req.params.id;

    const regExp = /^\d+$/;

    if(!regExp.test(org_id)){
        res.status(400).send('The organization ID is not valid')
    }

    const {name, description, contactEmail, fileName} = req.body;

    

    const result = await updateOrganization(name, description, contactEmail, fileName, org_id);
    
    req.flash('success', 'Organization updated successfully');

    res.redirect(`/organization/${result[0].org_id}`);

}

export { 

    showOrganizationPage, 
    showOrganizationDetailPage, 
    showNewOrganizationForm, 
    processNewOrganizationForm, 
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganization
}

