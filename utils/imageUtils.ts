/**
 * Converts an image URL to a Base64 string.
 * This handles CORS issues by ensuring the image is requested with anonymous cross-origin policy.
 */
export const urlToBase64 = async (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Limit size to avoid huge payloads to Gemini which might timeout or exceed limits
      const maxDim = 1024;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      // Get data URL and strip the prefix to get pure base64
      const dataURL = canvas.toDataURL('image/jpeg', 0.8);
      const base64 = dataURL.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      resolve(base64);
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};