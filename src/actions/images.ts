
"use server"

import { getFileUrl, uploadFile } from "@/lib/cloudeFlare";
import sharp from "sharp"

export async function uploadImage(imageURL: File): Promise<string> {
  const image = imageURL;
  const quality = 80;

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${timestamp}`;

  const arrayBuffer = await image.arrayBuffer();
  const compressedBuffer = await sharp(arrayBuffer)
    .resize(1200)
    .jpeg({ quality })
    .toBuffer();

  const fileContent = Buffer.from(compressedBuffer);
  await uploadFile(fileContent, filename, image.type);

  return getFileUrl(filename);
}