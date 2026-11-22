import express from 'express';

import { showHomePage } from './controllers/index.js';
import { processNewOrganizationForm, showOrganizationPage, showNewOrganizationForm, showOrganizationDetailPage, organizationValidation, showEditOrganizationForm, processEditOrganization} from './controllers/organizations.js';
import { showProjectDeatailsPage, showProjectPage, showNewProjectForm, projectValidation, processNewProjectForm, showProjectEditForm, processEditProject } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();


router.get('/', showHomePage);

router.get('/organizations', showOrganizationPage);

router.get('/projects', showProjectPage);

router.get('/categories', showCategoriesPage);

router.get('/organization/:id', showOrganizationDetailPage);

router.get('/project/:id', showProjectDeatailsPage);

router.get('/category/:id', showCategoryDetailsPage);

router.get('/test-error', testErrorPage);

router.get('/new-organization', showNewOrganizationForm);

router.post('/new-organization', organizationValidation, processNewOrganizationForm);

router.get('/edit-organization/:id', showEditOrganizationForm);

router.post('/edit-organization/:id', organizationValidation, processEditOrganization);

router.get('/new-project', showNewProjectForm);

router.post('/new-project', projectValidation, processNewProjectForm);

router.get('/assign-categories/:project_id', showAssignCategoriesForm);

router.post('/assign-categories/:project_id', processAssignCategoriesForm);

router.get('/edit-project/:id', showProjectEditForm);

router.post('/edit-project/:id', projectValidation, processEditProject);

export default router;
