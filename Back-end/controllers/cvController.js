const { uploadRawFile } = require("../utils/cloudinary1");
const Settings = require("../Config/settings");
const { cloudinary } = require("../utils/cloudinary1");
const axios = require("axios");
/* ===============================
    Upload CV (Admin)
================================ */

module.exports.uploadCvCtrl = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded" });
    }

    // 1️⃣ جلب أو إنشاء Settings
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    // 2️⃣ رفع الملف
    const result = await uploadRawFile(req.file.buffer, {
      folder: "cv",
      public_id: "my_cv",
    });

    // 3️⃣ حفظ البيانات في DB
    settings.cvUrl = result.secure_url;
    settings.cvPublicId = result.public_id;
    await settings.save();

    res.status(200).json({
      message: "CV uploaded successfully",
      url: result.secure_url,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};
/* ===============================
    Update CV (Admin)
================================ */
module.exports.updateCvCtrl = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No CV file uploaded" });
    }

    // 1️⃣ جلب الإعدادات (أو إنشاؤها)
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    // 2️⃣ حذف الـ CV القديم إن وُجد
    if (settings.cvPublicId) {
      await cloudinary.uploader.destroy(settings.cvPublicId, {
        resource_type: "raw",
      });
    }

    // 3️⃣ رفع الـ CV الجديد
    const result = await uploadRawFile(req.file.buffer, {
      folder: "cv",
      public_id: "my_cv", // ثابت → يتم الاستبدال
    });

    // 4️⃣ تحديث البيانات
    settings.cvUrl = result.secure_url;
    settings.cvPublicId = result.public_id;
    await settings.save();

    res.status(200).json({
      message: "CV updated successfully",
      url: result.secure_url,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "CV update failed" });
  }
};
/* ===============================
  download CV (Public)
================================ */

module.exports.downloadCvCtrl = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (!settings || !settings.cvUrl) {
      return res.status(404).json({ message: "CV not found" });
    }

    // Download from cloudinary as binary
    const cloudinaryResponse = await axios.get(settings.cvUrl, {
      responseType: "arraybuffer",
    });

    // Force headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="My_CV.pdf"'
    );
    // Send the file buffer
    

    res.send(cloudinaryResponse.data);

  } catch (error) {
    console.error("Download CV error:", error);
    res.status(500).json({ message: "Failed to download CV" });
  }
};

/* ===============================

  delete CV (Admin)
================================ */

module.exports.deleteCvCtrl = async (req, res) => {
  try {
    // 1️⃣ جلب الإعدادات
    const settings = await Settings.findOne();

    if (!settings || !settings.cvPublicId) {
      return res.status(404).json({ message: "No CV to delete" });
    }

    // 2️⃣ حذف الملف من Cloudinary
    await cloudinary.uploader.destroy(settings.cvPublicId, {
      resource_type: "raw",
    });

    // 3️⃣ حذف البيانات من DB
    settings.cvUrl = null;
    settings.cvPublicId = null;
    await settings.save();

    res.status(200).json({
      message: "CV deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "CV deletion failed" });
  }
};
/* ===============================
  Get CV URL (Public)
================================ */
// GET /api/cv
module.exports.getCvCtrl = async (req, res) => {
  const settings = await Settings.findOne();
  res.status(200).json({
    cvUrl: settings?.cvUrl || null,
  });
};
