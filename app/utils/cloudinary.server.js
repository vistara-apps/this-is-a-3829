import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload an image to Cloudinary
 * @param {string} dataUrl - The data URL of the image
 * @param {string} folder - The folder to upload to
 * @returns {Promise<Object>} - The upload result
 */
export async function uploadImage(dataUrl, folder = "pet-pic-showcase") {
  try {
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder,
      resource_type: "image",
      transformation: [
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
    });
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
}

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - The public ID of the image
 * @returns {Promise<Object>} - The deletion result
 */
export async function deleteImage(publicId) {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image");
  }
}

/**
 * Generate a signed upload URL for client-side uploads
 * @param {Object} options - Upload options
 * @returns {Object} - The signed upload parameters
 */
export function generateUploadSignature(options = {}) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  const params = {
    timestamp,
    folder: options.folder || "pet-pic-showcase",
    ...options,
  };
  
  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET
  );
  
  return {
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    ...params,
  };
}

/**
 * Get an optimized image URL with transformations
 * @param {string} url - The original Cloudinary URL
 * @param {Object} options - Transformation options
 * @returns {string} - The transformed image URL
 */
export function getOptimizedImageUrl(url, options = {}) {
  const defaults = {
    width: 800,
    height: 600,
    crop: "fill",
    quality: "auto:good",
    fetchFormat: "auto",
  };
  
  const params = { ...defaults, ...options };
  
  // Check if it's a Cloudinary URL
  if (!url || !url.includes("cloudinary.com")) {
    return url;
  }
  
  // Parse the URL to extract components
  const urlParts = url.split("/upload/");
  if (urlParts.length !== 2) {
    return url;
  }
  
  // Build transformation string
  const transformations = [
    `w_${params.width}`,
    `h_${params.height}`,
    `c_${params.crop}`,
    `q_${params.quality}`,
    `f_${params.fetchFormat}`,
  ];
  
  // Combine transformations with the original URL
  return `${urlParts[0]}/upload/${transformations.join(",")}/v1/${urlParts[1]}`;
}

