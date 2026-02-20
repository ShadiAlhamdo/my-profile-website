const cloudinary = require("cloudinary").v2;
const stream = require("stream");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// رفع ملفات (PDF / Images)
const uploadRawFile = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);

    bufferStream.pipe(
      cloudinary.uploader.upload_stream(
        { resource_type: "raw", ...options },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
    );
  });
};

module.exports = {
  cloudinary,     // ✅ مهم جدًا
  uploadRawFile,  // ✅ نستخدمه للـ PDF
};
