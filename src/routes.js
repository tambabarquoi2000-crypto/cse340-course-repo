import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationPage } from './controllers/organizations.js';
import { showProjectDeatailsPage, showProjectPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailPage } from './controllers/organizations.js';

const router = express.Router();


router.get('/', showHomePage)

router.get('/organizations', showOrganizationPage);

router.get('/projects', showProjectPage);

router.get('/categories', showCategoriesPage)

router.get('/organization/:id', showOrganizationDetailPage)

router.get('/project/:id', showProjectDeatailsPage)

router.get('/category/:id', showCategoryDetailsPage)

router.get('/test-error', testErrorPage)


export default router
