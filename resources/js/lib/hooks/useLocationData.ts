// hooks/useLocationData.ts
import { useQuery } from '@tanstack/react-query';

// Tipe data untuk provinsi
export interface Province {
    id: string;
    name: string;
}

// Tipe data untuk kabupaten/kota
export interface Regency {
    id: string;
    province_id: string;
    name: string;
}

// Fetch daftar provinsi
const fetchProvinces = async (): Promise<Province[]> => {
    const response = await fetch('/api/provinces');
    if (!response.ok) throw new Error('Failed to fetch provinces');
    return await response.json();
};

// Fetch daftar kabupaten/kota berdasarkan ID provinsi
const fetchRegencies = async (provinceId: string): Promise<Regency[]> => {
    const response = await fetch(`/api/regencies/${provinceId}`);
    if (!response.ok) throw new Error('Failed to fetch regencies');
    return await response.json();
};

// Hook untuk mengambil provinsi
export const useProvinces = () => {
    return useQuery<Province[], Error>({
        queryKey: ['provinces'],
        queryFn: fetchProvinces,
    });
};

// Hook untuk mengambil kabupaten/kota
export const useRegencies = (provinceId: string) => {
    return useQuery<Regency[], Error>({
        queryKey: ['regencies', provinceId],
        queryFn: () => fetchRegencies(provinceId),
        enabled: !!provinceId,
    });
};
