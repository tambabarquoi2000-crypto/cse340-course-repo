import db from './db.js';

const query = 
`
    SELECT name
    FROM categories;
`;

export async function getAllCategories()
{
    const categories = await db.query(query);
    return categories.rows;
}

