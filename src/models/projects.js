import db from './db.js';

export const getAllProjects = async () =>
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


export const getProjectsByOrganizationId = async (id) =>
{
    const query = `
    SELECT
        project_id, org_id, title, description, location, date
        FROM projects
        WHERE org_id = ${id}
        ORDER BY date;
    `;

    const result = await db.query(query);

    return result.rows;
}



const groupProjectsByCategory = (projects) => {

    const result =  projects.reduce((acc, project) => {

        if(!acc[project.category_name]){

            acc[project.category_name] = []
        }
        
        acc[project.category_name].push(project);

        return acc;


    }, {});

    return result;

}


export const getUpcommingProjects = async (num_of_proj) =>
{
    const query = `
        SELECT project_id, title, p.description, date, location, o.org_id, name
        FROM projects p
        JOIN organization o
            ON p.org_id = o.org_id
        LIMIT $1;
    `;

    const limit = num_of_proj;
    
    const result = await db.query(query, [limit]);
    return result.rows;
}

export const getProjectDetails = async (id) => {
    const query = `
        SELECT p.project_id, title, p.description, date, location, o.org_id, o.name AS org_name, c.category_id, c.name
        FROM projects p
        JOIN organization o
            ON p.org_id = o.org_id
        JOIN project_categories pc
            ON pc.project_id = p.project_id
        JOIN categories c
            ON pc.category_id = c.category_id
        WHERE p.project_id = ${id};
    `

    const result = await db.query(query);
    return result.rows;
}


