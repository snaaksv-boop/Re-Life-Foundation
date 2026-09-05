/**
 * Client-side image compression utility
 * Resizes large image files/dataURLs to ensure they fit within storage and Firestore limits (<100KB)
 */
export async function compressImage(
  input: File | string,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.72
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Do not set crossOrigin for data URLs as it can cause security warnings in some mobile browsers
    if (typeof input === 'string' && !input.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.max(1, Math.round(width * ratio));
        height = Math.max(1, Math.round(height * ratio));
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(typeof input === 'string' ? input : '');
        return;
      }

      // Smooth rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Export as JPEG with controlled quality
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      // If error loading or non-image format, resolve with original if string
      if (typeof input === 'string') {
        resolve(input);
      } else {
        reject(new Error('Failed to load image for compression'));
      }
    };

    if (typeof input === 'string') {
      img.src = input;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('FileReader error'));
      reader.readAsDataURL(input);
    }
  });
}

export async function ensureSafeImageSize(
  imageStr: string | null | undefined,
  maxSizeBytes: number = 250000
): Promise<string | null> {
  if (!imageStr) return null;
  if (!imageStr.startsWith('data:image')) return imageStr;
  if (imageStr.length <= maxSizeBytes) return imageStr;
  try {
    const compressed = await compressImage(imageStr, 720, 720, 0.68);
    return compressed;
  } catch {
    return imageStr;
  }
}
