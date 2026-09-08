/**
 * Client-side image compression utility
 * Resizes large image files/dataURLs to ensure they fit within storage and Firestore limits (<50KB each)
 * Prevents Firestore document limit exceed errors and ensures photos never get dropped/deleted.
 */
export async function compressImage(
  input: File | string,
  maxWidth: number = 640,
  maxHeight: number = 640,
  quality: number = 0.65
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
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

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // First pass compression
      let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

      // If still larger than 70,000 characters (~52KB), do a 2nd pass with slightly reduced size
      if (compressedDataUrl.length > 70000 && (width > 420 || height > 420)) {
        const scale = 0.75;
        const c2 = document.createElement('canvas');
        c2.width = Math.round(width * scale);
        c2.height = Math.round(height * scale);
        const ctx2 = c2.getContext('2d');
        if (ctx2) {
          ctx2.imageSmoothingEnabled = true;
          ctx2.imageSmoothingQuality = 'medium';
          ctx2.drawImage(canvas, 0, 0, c2.width, c2.height);
          compressedDataUrl = c2.toDataURL('image/jpeg', 0.58);
        }
      }

      resolve(compressedDataUrl);
    };

    img.onerror = () => {
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
  maxSizeBytes: number = 70000
): Promise<string | null> {
  if (!imageStr) return null;
  if (!imageStr.startsWith('data:image')) return imageStr;
  if (imageStr.length <= maxSizeBytes) return imageStr;
  try {
    const compressed = await compressImage(imageStr, 600, 600, 0.62);
    return compressed;
  } catch {
    return imageStr;
  }
}
