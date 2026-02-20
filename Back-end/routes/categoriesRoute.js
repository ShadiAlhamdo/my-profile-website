const router = require('express').Router();
const { createCategoryCtrl,getAllCategoriesCtrl } = require('../controllers/categoriesController');
const validateObjectId = require('../middlewares/validateObjectId');
const { verifyTokenAndAdmin } = require('../middlewares/verifytoken');

// Create Category
// POST /api/categories
router.post('/',verifyTokenAndAdmin, createCategoryCtrl);

// Get All Categories
// GET /api/categories
router.get('/', require('../controllers/categoriesController').getAllCategoriesCtrl);
// Get Categories Count
//  /api/categories/count
router.get('/count', verifyTokenAndAdmin,require('../controllers/categoriesController').getAllCategoriesCountCtrl);

// Delete Category
// DELETE /api/categories/:id
router.delete('/:id',validateObjectId, verifyTokenAndAdmin, require('../controllers/categoriesController').deleteCategoryCtrl);

module.exports = router;