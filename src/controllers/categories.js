import { validationResult } from "express-validator";
import { getAllCategories, getCategoryById, getCategoryByProjectId, updateCategoryAssignments } from "../models/categories.js";
import { getProjectDetails, getProjectsByCategoryId } from "../models/projects.js";


const showCategoriesPage = async (req, res) => 
{
    const categories = await getAllCategories();
    const title = 'Project Categories';
    res.render('categories', {title, categories});
}

const showCategoryDetailsPage = async (req, res) => {

    const isValidId = /^\d+$/;

    const category_id = req.params.id;


    if(!isValidId.test(category_id)){
        res.status(400).send('The category id is not valid.')
    }

    const category = await getCategoryById(category_id);
    const title = category[0].name;
    
    const projects = await getProjectsByCategoryId(category_id);

    res.render('category-details', {title, projects});

}

const showAssignCategoriesForm = async(req, res) => {

    const result = validationResult(req);

    if(!result.isEmpty()){
        result.array().forEach(error => {
            req.flash('error', error.msg)
        })

        return res.redirect('/assign-categories')
    }

    const title = 'Assign Categories to Project';
    const projectId = req.params.project_id;
    

    const projectDetails = await getProjectDetails(projectId);
    console.log('Project Details', projectDetails);

    const categories = await getAllCategories();

    const assignedCategories = await getCategoryByProjectId(projectId);

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories })

}

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.project_id;
    const selectedCategories = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(selectedCategories)? selectedCategories : [selectedCategories];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);

}


export { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm 
}