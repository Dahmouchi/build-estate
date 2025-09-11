"use server";

import prisma from "@/lib/prisma";

export async function listServices() {
  try {
    return await prisma.additionalService.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error listing services:", error);
    throw new Error("Impossible de charger les services");
  }
}

export async function createService(name: string, icon: string) {
  try {
    return await prisma.additionalService.create({
      data: { name, icon },
    });
  } catch (error) {
    console.error("Error creating service:", error);
    throw new Error("Impossible de créer le service");
  }
}

export async function updateService(
  id: string,
  data: { name?: string; icon?: string }
) {
  try {
    return await prisma.additionalService.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    throw new Error("Impossible de modifier le service");
  }
}

export async function deleteService(id: string) {
  try {
    return await prisma.additionalService.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    throw new Error("Impossible de supprimer le service");
  }
}
