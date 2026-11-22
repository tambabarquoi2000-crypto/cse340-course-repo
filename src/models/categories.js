import db from './db.js';




const getAllCategories = async () =>
{
    const query = 
`
    SELECT category_id, category_name
    FROM categories;
`;

    const categories = await db.query(query);
    return categories.rows;
}


const getCategoryById = async (id) => {
    
    const query = `

        SELECT category_id, category_name
        FROM categories
        WHERE category_id = $1;
        
    `;

    const categoryId = [id];

    const category = await db.query(query, categoryId);

    return category.rows;
}

const getCategoryByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.category_name
        FROM categories c
            JOIN project_categories pc
            ON pc.category_id = c.category_id
            JOIN projects p
            ON p.project_id = pc.project_id
        WHERE p.project_id = $1;
    `
    const params = [projectId];
    const result = await db.query(query, params);

    return result.rows;
}

const assignCategoryToProject = async (projectId, categoryId) => {

    const query = `
    
        INSERT INTO project_categories(project_id, category_id)
        VALUES($1, $2);
    
    `;

    const params = [projectId, categoryId];
    db.query(query, params);

}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
}

const createNewCategory = async (category_name) => {

    const query = `
        INSERT INTO categories(name)
        VALUES
            ($1)
        RETURNING category_id;       
    `;

    const params = [category_name];
    const result = await db.query(query, params);
    return result.rows;
}

const updateCategory = async (category_id, name) => {
    const query = `
        UPDATE categories
        SET
            category_name = $2
        WHERE category_id = $1;
    `;
    
    const params = [category_id, category_name];
    const result = await db.query(query, params);
}



export { 
    getAllCategories,  
    getCategoryById, 
    assignCategoryToProject, 
    updateCategoryAssignments,
    getCategoryByProjectId,
    createNewCategory, 
    updateCategory
 }

