import { useQuery } from "@tanstack/react-query";

const fetchAsset = async (url: string[], assetName: string[]): Promise<File[]> => {
    const errors: any[] = []

    const result = url.map(async (item: string, index: number) => {
        const response = await fetch(item);
        if (response.status !== 200)
            errors.push(new Error(`Something went wrong (${response.status}) \n for ${assetName[index]}`))
        if (response.status === 200) {
            const blob = await response.blob();
            const file = new File([blob], assetName[index], { type: blob.type });
            return file
        }
    })
    if (errors.length > 0) throw errors;

    if (result.length > 0)
        return Promise.all(result.filter(item => item !== undefined))
};

export const useAsset = (url: string[], accesableName: string, assetName: string[]) => {
    if (url.length < 1) return { data: [], isLoading: false, error: null };
    return useQuery<File[], Error>({
        queryKey: [accesableName],
        queryFn: () => fetchAsset(url, assetName),
        staleTime: Infinity,
        retry: false,
    });
};

