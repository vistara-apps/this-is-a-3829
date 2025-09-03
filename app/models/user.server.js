import { db } from "~/utils/db.server";
import { hashPassword } from "~/utils/session.server";

/**
 * Create a new user
 * @param {Object} data - User data
 * @returns {Promise<Object>} - The created user
 */
export async function createUser({ email, password }) {
  const passwordHash = await hashPassword(password);
  
  return db.user.create({
    data: {
      email,
      passwordHash,
    },
  });
}

/**
 * Get a user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object|null>} - The user or null
 */
export async function getUserById(id) {
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      subscriptionTier: true,
      createdAt: true,
    },
  });
}

/**
 * Get a user by email
 * @param {string} email - User email
 * @returns {Promise<Object|null>} - The user or null
 */
export async function getUserByEmail(email) {
  return db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      subscriptionTier: true,
      createdAt: true,
    },
  });
}

/**
 * Update a user's subscription tier
 * @param {string} id - User ID
 * @param {string} subscriptionTier - New subscription tier
 * @returns {Promise<Object>} - The updated user
 */
export async function updateUserSubscriptionTier(id, subscriptionTier) {
  return db.user.update({
    where: { id },
    data: { subscriptionTier },
  });
}

/**
 * Get user statistics
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User statistics
 */
export async function getUserStats(userId) {
  const [
    galleryCount,
    photoCount,
    likeCount,
    commentCount,
    challengeCount,
  ] = await Promise.all([
    db.gallery.count({ where: { userId } }),
    db.photo.count({ where: { gallery: { userId } } }),
    db.like.count({ where: { userId } }),
    db.comment.count({ where: { userId } }),
    db.challenge.count({ where: { createdBy: userId } }),
  ]);
  
  return {
    galleryCount,
    photoCount,
    likeCount,
    commentCount,
    challengeCount,
  };
}

/**
 * Update user profile
 * @param {string} id - User ID
 * @param {Object} data - Profile data to update
 * @returns {Promise<Object>} - The updated user
 */
export async function updateUserProfile(id, data) {
  const updateData = {};
  
  // Only include fields that are provided
  if (data.email) updateData.email = data.email;
  if (data.password) updateData.passwordHash = await hashPassword(data.password);
  
  return db.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      subscriptionTier: true,
      createdAt: true,
    },
  });
}

