import { db } from "~/utils/db.server";

/**
 * Get all templates
 * @returns {Promise<Array>} - List of templates
 */
export async function getAllTemplates() {
  return db.template.findMany({
    orderBy: { name: "asc" },
  });
}

/**
 * Get a template by ID
 * @param {string} id - Template ID
 * @returns {Promise<Object|null>} - The template or null
 */
export async function getTemplateById(id) {
  return db.template.findUnique({
    where: { id },
  });
}

/**
 * Create initial templates
 * This function is used to seed the database with initial templates
 * @returns {Promise<Array>} - The created templates
 */
export async function createInitialTemplates() {
  const templates = [
    {
      name: "Classic",
      description: "A clean, minimalist design that puts your photos front and center.",
      thumbnail: "/images/templates/classic.jpg",
      cssClass: "template-classic",
    },
    {
      name: "Modern",
      description: "Bold typography and dynamic layouts for a contemporary feel.",
      thumbnail: "/images/templates/modern.jpg",
      cssClass: "template-modern",
    },
    {
      name: "Playful",
      description: "Fun, colorful design perfect for showcasing pets with personality.",
      thumbnail: "/images/templates/playful.jpg",
      cssClass: "template-playful",
    },
    {
      name: "Elegant",
      description: "Sophisticated design with refined typography and subtle animations.",
      thumbnail: "/images/templates/elegant.jpg",
      cssClass: "template-elegant",
    },
    {
      name: "Vintage",
      description: "Nostalgic design with retro elements and warm color palette.",
      thumbnail: "/images/templates/vintage.jpg",
      cssClass: "template-vintage",
    },
  ];
  
  // Check if templates already exist
  const existingCount = await db.template.count();
  if (existingCount > 0) {
    return db.template.findMany();
  }
  
  // Create templates
  return db.$transaction(
    templates.map(template => 
      db.template.create({
        data: template,
      })
    )
  );
}

