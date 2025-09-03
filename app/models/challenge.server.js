import { db } from "~/utils/db.server";

/**
 * Create a new challenge
 * @param {Object} data - Challenge data
 * @returns {Promise<Object>} - The created challenge
 */
export async function createChallenge({ title, description, startDate, endDate, createdBy }) {
  return db.challenge.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      createdBy,
    },
  });
}

/**
 * Get a challenge by ID
 * @param {string} id - Challenge ID
 * @returns {Promise<Object|null>} - The challenge or null
 */
export async function getChallengeById(id) {
  return db.challenge.findUnique({
    where: { id },
    include: {
      creator: {
        select: {
          email: true,
        },
      },
      submissions: {
        include: {
          user: {
            select: {
              email: true,
            },
          },
          photo: true,
        },
      },
    },
  });
}

/**
 * Get active challenges
 * @returns {Promise<Array>} - List of active challenges
 */
export async function getActiveChallenges() {
  const now = new Date();
  
  return db.challenge.findMany({
    where: {
      startDate: { lte: now },
      endDate: { gte: now },
    },
    include: {
      creator: {
        select: {
          email: true,
        },
      },
      submissions: {
        select: {
          id: true,
        },
      },
    },
    orderBy: { endDate: "asc" },
  });
}

/**
 * Get upcoming challenges
 * @returns {Promise<Array>} - List of upcoming challenges
 */
export async function getUpcomingChallenges() {
  const now = new Date();
  
  return db.challenge.findMany({
    where: {
      startDate: { gt: now },
    },
    include: {
      creator: {
        select: {
          email: true,
        },
      },
    },
    orderBy: { startDate: "asc" },
  });
}

/**
 * Get past challenges
 * @param {number} limit - Maximum number of challenges to return
 * @returns {Promise<Array>} - List of past challenges
 */
export async function getPastChallenges(limit = 10) {
  const now = new Date();
  
  return db.challenge.findMany({
    where: {
      endDate: { lt: now },
    },
    include: {
      creator: {
        select: {
          email: true,
        },
      },
      submissions: {
        select: {
          id: true,
        },
      },
    },
    orderBy: { endDate: "desc" },
    take: limit,
  });
}

/**
 * Submit a photo to a challenge
 * @param {Object} data - Submission data
 * @returns {Promise<Object>} - The created submission
 */
export async function submitToChallenge({ challengeId, userId, photoId }) {
  return db.submission.create({
    data: {
      challengeId,
      userId,
      photoId,
    },
    include: {
      photo: true,
    },
  });
}

/**
 * Remove a submission from a challenge
 * @param {string} challengeId - Challenge ID
 * @param {string} userId - User ID
 * @param {string} photoId - Photo ID
 * @returns {Promise<Object>} - The deleted submission
 */
export async function removeSubmission(challengeId, userId, photoId) {
  return db.submission.deleteMany({
    where: {
      challengeId,
      userId,
      photoId,
    },
  });
}

/**
 * Get user submissions for a challenge
 * @param {string} challengeId - Challenge ID
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - List of submissions
 */
export async function getUserSubmissions(challengeId, userId) {
  return db.submission.findMany({
    where: {
      challengeId,
      userId,
    },
    include: {
      photo: true,
    },
  });
}

