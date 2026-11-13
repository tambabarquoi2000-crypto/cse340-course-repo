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


export async function getProjectsByOrganizationId(id)
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



function groupProjectsByCategory(projects) {

    const result =  projects.reduce((acc, project) => {

        if(!acc[project.category_name]){

            acc[project.category_name] = []
        }
        
        acc[project.category_name].push(project);

        return acc;


    }, {});

    return result;

}


