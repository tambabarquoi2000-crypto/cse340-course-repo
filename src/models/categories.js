import db from './db.js';

const query = 
`
    SELECT category_id, name
    FROM categories;
`;

export async function getAllCategories()
{
    const categories = await db.query(query);
    return categories.rows;
}

export async function getProjectsByCategory(id) {
    
    const query = `
        SELECT p.project_id, title
        FROM categories c
            JOIN project_categories pc
            ON c.category_id = pc.category_id
            JOIN projects p
            ON p.project_id = pc.project_id
        WHERE c.category_id = $1
    `;

    const category_id = [id];

    const result = await db.query(query, category_id);

    return result.rows;
}

export async function getCategoryById(id){
    
    const query = `

        SELECT name
        FROM categories
        WHERE category_id = $1;
        
    `;

    const categoryId = [id];

    const category = await db.query(query, categoryId);

    return category.rows;
}

