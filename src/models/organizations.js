import db from './db.js'

const getAllOrganizations = async() => {
    const query = `
        SELECT org_id, name, description, contact_email, logo_file_name
      FROM public.organization;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllOrganizations}  