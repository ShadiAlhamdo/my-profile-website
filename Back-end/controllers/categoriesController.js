const asynchandler = require('express-async-handler');
const { Category, validateCreateCategory } = require('../models/Category');



/**------------------------------------------
 * @desc   Create new category
 * @route  POST /api/categories
 * @method  POST
 * @access  Private (Admin)
 * ------------------------------------------*/
 module.exports.createCategoryCtrl = asynchandler(async (req, res) => {
    // Validation (handle undefined body safely)
    const { error } = validateCreateCategory(req.body || {});
    if (error){
        return res.status(400).json({ message: error.details[0].message });
    }
    // Check if category already exists
    
    let category = await Category.findOne({ title: req.body.title });
    if(category){
        return res.status(400).json({message: 'Category already exists.'})
    }
    // Create category
    category = new Category({
         user:req.user.id,
        title: req.body.title,
       
    });
    await category.save();
    res.status(201).json({ message: "Category created successfully", category });
});

/**------------------------------------------
 * @desc   Get all categories
 * @route  GET /api/categories
 * @method  GET
 * @access  Public 
 * ------------------------------------------*/
module.exports.getAllCategoriesCtrl = asynchandler(async (req, res) => {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
});

/**------------------------------------------
 * @desc   Get  Categories Count
 * @route  GET /api/categories/count
 * @method  GET
 * @access  Private 
 * ------------------------------------------*/
module.exports.getAllCategoriesCountCtrl = asynchandler(async (req, res) => {
    const count = await Category.countDocuments();
    res.status(200).json({count});
});


/**------------------------------------------
 * @desc   Delete category
 * @route  DELETE /api/categories/:id
 * @method  DELETE
 * @access  Private (Admin)
 * ------------------------------------------*/
module.exports.deleteCategoryCtrl = asynchandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted successfully.' });
});