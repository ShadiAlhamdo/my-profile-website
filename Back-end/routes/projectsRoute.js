const router = require ("express").Router();
const { getAllProjectsCtrl, createNewProjectCtrl, getSingleProjectCtrl, updateProjectCtrl, updateProjectImageCtrl, deleteProjectCtrl, getProjectsCountCtrl } = require("../controllers/projectsController");
const { photoUpload } = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyTokenAndAdmin } = require("../middlewares/verifytoken");

// Create New Project
// POST /api/projects
router.post("/",verifyTokenAndAdmin,photoUpload.single('image'), createNewProjectCtrl);

// Get All Projects
// GET /api/projects
router.get("/", getAllProjectsCtrl);

//Projects Count
// GET /api/projects/count
router.get("/count", verifyTokenAndAdmin, getProjectsCountCtrl);

// Get singele project
// GET /api/projects/:id
router.get("/:id", getSingleProjectCtrl);

// Update Project
// PUT /api/projects/:id
router.put("/:id", validateObjectId,verifyTokenAndAdmin, photoUpload.single('image'), updateProjectCtrl);

// Update Project Image
// PUT /api/projects/:id/image
router.put("/:id/image", validateObjectId,verifyTokenAndAdmin, photoUpload.single('image'),updateProjectImageCtrl);



// Delete Project
// DELETE /api/projects/:id
router.delete("/:id", validateObjectId,verifyTokenAndAdmin,deleteProjectCtrl);

module.exports = router;