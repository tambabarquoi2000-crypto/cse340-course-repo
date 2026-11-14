import db from './db.js'

const getAllOrganizations = async() => {
    const query = `
        SELECT org_id, name, description, contact_email, logo_file_name
      FROM public.organization;
    `;

    const result = await db.query(query);

    return result.rows;
}


async function getOrganizationDetailsById(id)
{
    const query = `
      SELECT org_id, name, description, contact_email, logo_file_name
      FROM organization
      WHERE org_id = $1;
    `;

    const org_id = id;

    const result = await db.query(query, [org_id]);

    return result.rows;
    
}

export { getAllOrganizations, getOrganizationDetailsById }