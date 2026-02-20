const router = require("express").Router();
const { updateCvCtrl, getCvCtrl } = require("../controllers/cvController");
const { deleteCvCtrl } = require("../controllers/cvController");
const { uploadCvCtrl,downloadCvCtrl } = require("../controllers/cvController");
const { pdfUpload } = require("../middlewares/pdfUpload");
const { photoUpload } = require("../middlewares/photoUpload");
const { verifyTokenAndAdmin } = require("../middlewares/verifytoken");

// Upload CV (Admin only)
// POST /api/cv/upload
router.post(
  "/upload",
  verifyTokenAndAdmin,
  pdfUpload.single("cv"),
  uploadCvCtrl
);

// Update CV (Admin only)
// PUT /api/cv/update
router.put(
  "/update",
  verifyTokenAndAdmin,
  pdfUpload.single("cv"),
  updateCvCtrl
);

// Download CV (Public)
// GET /api/cv/download
router.get("/download", downloadCvCtrl);


// Delete CV (Admin only)
router.delete(
  "/delete",
  verifyTokenAndAdmin,
  deleteCvCtrl
);
// Get CV URL (Public)
router.get("/", getCvCtrl);

module.exports = router;
