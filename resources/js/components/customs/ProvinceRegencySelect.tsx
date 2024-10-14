import React, {useState, useEffect, useMemo} from "react";
import InputSelect from "./InputSelect";
import {Label} from "@/components/ui/label.tsx";
import {useProvinces, useRegencies} from "@/lib/hooks/useLocationData.ts";

const ProvinceRegencySelect = ({errorsProv, errorsRegen, valueProv, valueRegen}: {
    errorsProv?: string[] | null;
    errorsRegen?: string[] | null;
    valueProv?: string;
    valueRegen?: string;
}) => {
    const {data: provinces, isLoading: loadingProvinces, error: errorProvinces} = useProvinces();

    const provinceMap = useMemo(() => {
        return provinces?.reduce((map, province) => {
            map[province.name] = province.id;
            return map;
        }, {} as Record<string, string>) || {};
    }, [provinces]);

    const getProvinceId = (name: string) => {
        return provinceMap[name];
    };

    const [currentProvince, setCurrentProvince] = useState<string>(valueProv || '');
    const [selectedProvince, setSelectedProvince] = useState<string>(
        getProvinceId(currentProvince)
        ||
        ''
    );

    const {data: regencies, isLoading: loadingRegencies, error: errorRegencies} = useRegencies(selectedProvince);
    const [selectedRegency, setSelectedRegency] = useState<string>(valueRegen || '');

    const handleProvinceChange = (name: string) => {
        const id = provinceMap[name];
        setCurrentProvince(name);
        setSelectedProvince(id);
    };

    useEffect(() => {
        if (valueProv) {
            const id = getProvinceId(valueProv);
            setSelectedProvince(id);
        }
    }, [provinceMap]);
    return (
        <>
            <Label htmlFor='province'>Provinsi</Label>
            <InputSelect
                items={provinces?.map(province => province.name) || []}
                name="province"
                placeholder="Provinsi"
                onValueChange={handleProvinceChange}
                disabled={loadingProvinces}
                isLoading={loadingProvinces}
                value={currentProvince}
            />
            {errorsProv && <span className="text-red-500 text-sm">{errorsProv || errorProvinces?.message}</span>}

            <Label htmlFor='regency' className={`mt-3`}>Kabupaten/Kota</Label>
            <InputSelect
                items={regencies?.map(regency => regency.name) || []}
                name="regency"
                placeholder="Kabupaten/Kota"
                disabled={!selectedProvince && loadingRegencies}
                isLoading={loadingRegencies}
                onValueChange={setSelectedRegency}
                value={selectedRegency}
            />
            {errorsRegen && <span className="text-red-500 text-sm">{errorsRegen || errorRegencies?.message}</span>}
        </>
    );
};

export default ProvinceRegencySelect;
