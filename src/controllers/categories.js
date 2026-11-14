import { getAllCategories, getProjectsByCategory, getCategoryById } from "../models/categories.js";


const showCategoriesPage = async (req, res) => 
{
    const categories = await getAllCategories();
    console.log(categories);
    const title = 'Project Categories';
    res.render('categories', {title, categories});
}

const showCategoryDetailsPage = async (req, res) => {

    const isValidId = /^\d+$/;

    const category_id = req.params.id;

    console.log('This is the category id:', category_id);

    if(!isValidId.test(category_id)){
        res.status(400).send('The category id is not valid.')
    }

    const category = await getCategoryById(category_id);
    const title = category[0].name;
    
    const projects = await getProjectsByCategory(category_id);

    res.render('category-details', {title, projects});

}


export { showCategoriesPage, showCategoryDetailsPage }