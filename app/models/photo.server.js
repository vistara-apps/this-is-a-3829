import { db } from "~/utils/db.server";
import { deleteImage } from "~/utils/cloudinary.server";

/**
 * Add a photo to a gallery
 * @param {Object} data - Photo data
 * @returns {Promise<Object>} - The created photo
 */
export async function addPhoto({ galleryId, imageUrl, caption, order }) {
  return db.photo.create({
    data: {
      galleryId,
      imageUrl,
      caption,
      order,
    },
  });
}

/**
 * Get a photo by ID
 * @param {string} id - Photo ID
 * @returns {Promise<Object|null>} - The photo or null
 */
export async function getPhotoById(id) {
  return db.photo.findUnique({
    where: { id },
    include: {
      gallery: true,
    },
  });
}

/**
 * Update a photo
 * @param {string} id - Photo ID
 * @param {Object} data - Photo data to update
 * @returns {Promise<Object>} - The updated photo
 */
export async function updatePhoto(id, data) {
  return db.photo.update({
    where: { id },
    data,
  });
}

/**
 * Delete a photo
 * @param {string} id - Photo ID
 * @param {boolean} deleteFromCloudinary - Whether to delete the image from Cloudinary
 * @returns {Promise<Object>} - The deleted photo
 */
export async function deletePhoto(id, deleteFromCloudinary = true) {
  // Get the photo first to get the image URL
  const photo = await db.photo.findUnique({
    where: { id },
    select: { imageUrl: true },
  });
  
  // Delete the photo from the database
  const deletedPhoto = await db.photo.delete({
    where: { id },
  });
  
  // Delete the image from Cloudinary if requested
  if (deleteFromCloudinary && photo?.imageUrl) {
    try {
      // Extract the public ID from the Cloudinary URL
      const urlParts = photo.imageUrl.split("/");
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = publicIdWithExtension.split(".")[0];
      
      await deleteImage(publicId);
    } catch (error) {
      console.error("Failed to delete image from Cloudinary:", error);
    }
  }
  
  return deletedPhoto;
}

/**
 * Reorder photos in a gallery
 * @param {string} galleryId - Gallery ID
 * @param {Array<Object>} photoOrders - Array of { id, order } objects
 * @returns {Promise<Array>} - The updated photos
 */
export async function reorderPhotos(galleryId, photoOrders) {
  const updates = photoOrders.map(({ id, order }) => 
    db.photo.update({
      where: { id, galleryId },
      data: { order },
    })
  );
  
  return Promise.all(updates);
}

/**
 * Like a photo
 * @param {string} photoId - Photo ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - The created like
 */
export async function likePhoto(photoId, userId) {
  return db.like.create({
    data: {
      photoId,
      userId,
    },
  });
}

/**
 * Unlike a photo
 * @param {string} photoId - Photo ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - The deleted like
 */
export async function unlikePhoto(photoId, userId) {
  return db.like.deleteMany({
    where: {
      photoId,
      userId,
    },
  });
}

/**
 * Add a comment to a photo
 * @param {Object} data - Comment data
 * @returns {Promise<Object>} - The created comment
 */
export async function addComment({ photoId, userId, content }) {
  return db.comment.create({
    data: {
      photoId,
      userId,
      content,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
}

/**
 * Delete a comment
 * @param {string} id - Comment ID
 * @returns {Promise<Object>} - The deleted comment
 */
export async function deleteComment(id) {
  return db.comment.delete({
    where: { id },
  });
}

