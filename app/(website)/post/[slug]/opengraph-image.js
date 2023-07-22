import { ImageResponse } from "next/server";
import { getPostBySlug } from "@/lib/sanity/client";
import OgImage from "@/components/ogimage";
import fs from "fs";
import path from "path";

// Function to load any font from the "public/fonts" directory
async function loadFont(fontFilename) {
  const fontFilePath = path.join(
    process.cwd(),
    "public/fonts",
    fontFilename
  );
  const fontData = await fs.promises.readFile(fontFilePath);
  return fontData;
}

export default async function handler({ params }) {
  const post = await getPostBySlug(params.slug);

  // Load the desired font
  const interBold = await loadFont("Inter-Bold.otf");
  const interRegular = await loadFont("Inter-Regular.otf");

  return new ImageResponse(<OgImage post={post} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: interBold,
        style: "normal"
      },
      {
        name: "Inter",
        data: interRegular,
        style: "normal"
      }
      // You can add more fonts as needed
    ]
  });
}
