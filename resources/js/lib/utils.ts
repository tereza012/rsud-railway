import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export interface UserProps {
    id: number
    name: string
    email: string
    role: string
    avatar: string
}

export const getBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

/**
 * Decode base64 string back to file
 * @param base64 base64 string
 * @returns blob
 */
export const decodeBase64 = (base64: string, fileName: string, type: string) => {
    let pos = base64.indexOf(';base64,');
    let b64 = base64.substring(pos + 8);

    const imageContent = atob(b64);
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);

    for (let n = 0; n < imageContent.length; n++) {
        view[n] = imageContent.charCodeAt(n);
    }

    const blob = new Blob([buffer], { type });
    return new File([blob], fileName, { lastModified: new Date().getTime(), type });
}
