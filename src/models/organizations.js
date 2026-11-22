import db from './db.js'

const getAllOrganizations = async() => {
    const query = `
        SELECT org_id, name, description, contact_email, logo_file_name
      FROM public.organization;
    `;

    const result = await db.query(query);

    return result.rows;
}


const getOrganizationDetailsById = async (id) =>
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


/**
 * Creates a new organization in the database.
 * @param {string} name - The name of the organization.
 * @param {string} description - A description of the organization.
 * @param {string} contactEmail - The contact email for the organization.
 * @param {string} logoFilename - The filename of the organization's logo.
 * @returns {string} The id of the newly created organization record.
 */


const createOrganization = async (name, description, contactEmail, logoFilename) => {
    const query = `
      INSERT INTO organization (name, description, contact_email, logo_file_name)
      VALUES ($1, $2, $3, $4)
      RETURNING org_id
    `;

    const queryParams = [name, description, contactEmail, logoFilename];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create organization');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new organization with ID:', result.rows[0].org_id);
    }

    return result.rows[0].org_id;
}

const updateOrganization = async (name, description, contact_email, logo_file_name, org_id) => {
     const query = `
        UPDATE organization
        SET 
            name = $1,
            description = $2,
            contact_email = $3,
            logo_file_name = $4
        WHERE org_id = $5
        RETURNING org_id;
    `;


    const params = [name, description, contact_email, logo_file_name, org_id];
    const result = await db.query(query, params);

    if (result.rows.length === 0) {
    throw new Error('Organization not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated organization with ID:', org_id);
  }

    return result.rows;

}

export { getAllOrganizations, getOrganizationDetailsById, createOrganization, updateOrganization }