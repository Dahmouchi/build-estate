"use server";

import prisma from "@/lib/prisma";

// ------------------ Categories ------------------
export async function listAmenityCategories() {
  try {
    return await prisma.amenityCategory.findMany({
      include: { amenities: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error listing categories:", error);
    throw new Error("Impossible de charger les catégories");
  }
}

export async function createAmenityCategory(name: string) {
  try {
    return await prisma.amenityCategory.create({
      data: { name },
    });
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Impossible de créer la catégorie");
  }
}

export async function updateAmenityCategory(id: string, name: string) {
  try {
    return await prisma.amenityCategory.update({
      where: { id },
      data: { name },
    });
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Impossible de modifier la catégorie");
  }
}

export async function deleteAmenityCategory(id: string) {
  try {
    return await prisma.amenityCategory.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Impossible de supprimer la catégorie");
  }
}

// ------------------ Amenities ------------------
export async function listAmenities() {
  try {
    return await prisma.amenity.findMany({
      include: { category: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error listing amenities:", error);
    throw new Error("Impossible de charger les équipements");
  }
}

export async function createAmenity(
  name: string,
  icon: string,
  categoryId: string
) {
  try {
    return await prisma.amenity.create({
      data: { name, icon, categoryId },
    });
  } catch (error) {
    console.error("Error creating amenity:", error);
    throw new Error("Impossible de créer l’équipement");
  }
}

export async function updateAmenity(
  id: string,
  data: { name?: string; icon?: string; categoryId?: string }
) {
  try {
    return await prisma.amenity.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating amenity:", error);
    throw new Error("Impossible de modifier l’équipement");
  }
}

export async function deleteAmenity(id: string) {
  try {
    return await prisma.amenity.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting amenity:", error);
    throw new Error("Impossible de supprimer l’équipement");
  }
}
