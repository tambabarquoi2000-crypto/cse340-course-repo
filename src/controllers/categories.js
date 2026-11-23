import { body, validationResult } from "express-validator";
import { getAllCategories, getCategoryById, getCategoryByProjectId, updateCategoryAssignments, createNewCategory, updateCategory } from "../models/categories.js";
import { getProjectDetails, getProjectsByCategoryId } from "../models/projects.js";


const categoryValidation = [
    body('categoryName')
        .trim()
        .notEmpty()
        .withMessage('Category Name can not be empty.')
]

const showCategoriesPage = async (req, res) => 
{
    const categories = await getAllCategories();
    console.log('All Categories', categories);
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
    console.log('Category', category);
    const title = category[0].category_name;
    
    const projects = await getProjectsByCategoryId(category_id);
    
    console.log(projects);

    res.render('category-details', {title, projects, category});

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

    console.log('Selected Categories', selectedCategories);

    const categoryIdsArray = Array.isArray(selectedCategories)? selectedCategories : [selectedCategories];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);

}

const showNewCategoryForm = async (req, res) => {

    const title = 'Create New Category';
    res.render('new-category', { title });
}


const processNewCategoryForm = async (req, res) => {
      
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        validationErrors.array().forEach(error => {
            req.flash('error', error.msg)
        })
        
        return res.redirect('/new-category')
    }

    const { categoryName } = req.body;

    const result = await createNewCategory(categoryName);
    if(!result > 0) {
        const error = new Error('There was a problem in process the request');
        throw error;
    }

    res.redirect('/categories')
}

const showEditCategoryForm = async (req, res) => {

    const title = 'Edit Category';

    const categoryId = req.params.category_id;
    const category = await getCategoryById(categoryId);
    console.log(category);

    res.render('edit-category', {title, categoryId, category})

}


const processEditCategoryForm = async (req, res) => {
    
    const categoryId= req.params.category_id;
    const { categoryName } = req.body;


    console.log('Category Infomation', categoryId,  categoryName)
    
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()> 0){
        validationErrors.array().forEach(error => {
            req.flash('error', error.msg)
        })
        
        return res.redirect(`edit-category/${categoryId}`)
    }

    await updateCategory(categoryId, categoryName);

    req.flash('success', 'Category updated successfully.')

    res.redirect('/categories');
}


export { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    showEditCategoryForm,
    processNewCategoryForm,
    processEditCategoryForm,
    categoryValidation
}