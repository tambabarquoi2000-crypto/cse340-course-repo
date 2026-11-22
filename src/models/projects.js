import db from './db.js';

const getAllProjects = async () =>
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


const getProjectsByOrganizationId = async (id) =>
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

const getProjectsByCategoryId = async (id) => {
    
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


const getUpcommingProjects = async (num_of_proj) =>
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

const getProjectDetails = async (id) => {
    const query = `
        SELECT p.project_id, title, p.description, date, location, o.org_id, o.name AS org_name, c.category_id, c.category_name
        FROM projects p
        LEFT JOIN organization o
            ON p.org_id = o.org_id
        LEFT JOIN project_categories pc
            ON pc.project_id = p.project_id
        LEFT JOIN categories c
            ON pc.category_id = c.category_id
        WHERE p.project_id = $1;
    `

    const params = [id]
    const result = await db.query(query, params);
    return result.rows;
}


const createNewProject = async (title, description, location, date, org_id) => {
    const query = `
        INSERT INTO projects(title, description, location, date, org_id)
            VALUES($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const params = [title, description, location, date, org_id];
    const result = await db.query(query, params);

    return result.rows;
}

const updateProject = async (title, description, location, date, orgId, project_id) => {
    const query = `
        UPDATE projects
        SET 
            title = $1,
            description = $2,
            location = $3,
            date = $4,
            org_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const params  = [title, description, location, date, orgId, project_id];
    const result = await db.query(query, params);


    if(!result.rows > 0) {

        const error = new Error('Something went wrong please try again')
        throw error;
    }

    return result[0];

}


export { 
    getAllProjects, 
    getProjectsByOrganizationId, 
    getProjectsByCategoryId,
    getUpcommingProjects, 
    getProjectDetails, 
    createNewProject, 
    updateProject
 }

