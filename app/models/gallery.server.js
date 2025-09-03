import { db } from "~/utils/db.server";

/**
 * Create a new gallery
 * @param {Object} data - Gallery data
 * @returns {Promise<Object>} - The created gallery
 */
export async function createGallery({ userId, title, description, templateId }) {
  return db.gallery.create({
    data: {
      userId,
      title,
      description,
      templateId,
    },
  });
}

/**
 * Get a gallery by ID
 * @param {string} id - Gallery ID
 * @returns {Promise<Object|null>} - The gallery or null
 */
export async function getGalleryById(id) {
  return db.gallery.findUnique({
    where: { id },
    include: {
      photos: {
        orderBy: { order: "asc" },
      },
      template: true,
    },
  });
}

/**
 * Get galleries by user ID
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - List of galleries
 */
export async function getGalleriesByUserId(userId) {
  return db.gallery.findMany({
    where: { userId },
    include: {
      photos: {
        select: {
          id: true,
        },
      },
      template: {
        select: {
          name: true,
          thumbnail: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Update a gallery
 * @param {string} id - Gallery ID
 * @param {Object} data - Gallery data to update
 * @returns {Promise<Object>} - The updated gallery
 */
export async function updateGallery(id, data) {
  return db.gallery.update({
    where: { id },
    data,
  });
}

/**
 * Delete a gallery
 * @param {string} id - Gallery ID
 * @returns {Promise<Object>} - The deleted gallery
 */
export async function deleteGallery(id) {
  return db.gallery.delete({
    where: { id },
  });
}

/**
 * Publish a gallery
 * @param {string} id - Gallery ID
 * @returns {Promise<Object>} - The published gallery
 */
export async function publishGallery(id) {
  return db.gallery.update({
    where: { id },
    data: { published: true },
  });
}

/**
 * Unpublish a gallery
 * @param {string} id - Gallery ID
 * @returns {Promise<Object>} - The unpublished gallery
 */
export async function unpublishGallery(id) {
  return db.gallery.update({
    where: { id },
    data: { published: false },
  });
}

/**
 * Get published galleries
 * @param {number} limit - Maximum number of galleries to return
 * @returns {Promise<Array>} - List of published galleries
 */
export async function getPublishedGalleries(limit = 10) {
  return db.gallery.findMany({
    where: { published: true },
    include: {
      photos: {
        take: 1,
        orderBy: { order: "asc" },
      },
      user: {
        select: {
          email: true,
        },
      },
      template: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });
}

/**
 * Get a public gallery by ID
 * @param {string} id - Gallery ID
 * @returns {Promise<Object|null>} - The gallery or null
 */
export async function getPublicGalleryById(id) {
  return db.gallery.findFirst({
    where: {
      id,
      published: true,
    },
    include: {
      photos: {
        orderBy: { order: "asc" },
        include: {
          likes: {
            select: {
              id: true,
              userId: true,
            },
          },
          comments: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      },
      user: {
        select: {
          email: true,
        },
      },
      template: true,
    },
  });
}

