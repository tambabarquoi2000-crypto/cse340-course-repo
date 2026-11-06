import db from './db.js';

export async function getAllProjects()
{
    const query = 
    `
        SELECT name, title, p.description, location, date
        FROM organization org
        JOIN projects p
        ON org.org_id = p.org_id

    `
    const projects = await db.query(query);
    return projects.rows;
}


