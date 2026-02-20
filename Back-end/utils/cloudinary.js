const cloudinary = require('cloudinary').v2;
const stream = require('stream');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Upload Image
const cloudinaryUploadImage = async (fileBuffer) => {
    const maxSizeInBytes = 4 * 1024 * 1024; // 4MB

    if (fileBuffer.length > maxSizeInBytes) {
        throw new Error("Image size exceeds 4MB limit");
    }

    return new Promise((resolve, reject) => {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileBuffer);

        bufferStream.pipe(cloudinary.uploader.upload_stream({
            resource_type: "image"
        }, (error, result) => {
            if (error) {
                return reject(new Error("Internal Server Error (Cloudinary)"));
            }
            resolve(result);
        }));
    });
};

// Cloudinary Remove Image
const cloudinaryRemoveImage = async (ImagePublicId)=>{
    try {
        const result = await cloudinary.uploader.destroy(ImagePublicId);

        return result
    } catch (error) {
       throw new Error("Intenal Server Error (Cloudinary)") 
     }
};



//  استخدام الدالة لرفع الصور
const handleImageUpload = async (fileBuffer) => {
    try {
        const result = await cloudinaryUploadImage(fileBuffer);
        return result; // يمكنك إرجاع النتيجة هنا
    } catch (error) {
        throw new Error("Intenal Server Error (Cloudinary)") 
       // يمكنك إلقاء الخطأ هنا
    }
};




module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    handleImageUpload,
};