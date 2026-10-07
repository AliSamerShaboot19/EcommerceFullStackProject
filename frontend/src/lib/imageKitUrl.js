import { IKCore } from "imagekitio-react";

const imagekit = new IKCore({
  urlEndpoint: "https://ik.imagekit.io/satcdtbcb",
});

/**
 
 * @param {string} originalImageUrl 
 * @param {number} width 
 */

export const getOptimizedImageUrl = (originalImageUrl, width = 500) => {
  if (!originalImageUrl) return "";

  return imagekit.url({
    src: originalImageUrl,
    transformation: [
      {
        width: width.toString(),
        quality: "80",
      },
    ],
  });
};
