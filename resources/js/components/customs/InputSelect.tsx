import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import React, {type FC} from "react";

interface InputSelectProps {
    items: string[];
    name: string;
    placeholder: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    isLoading?: false | true | boolean;
    value?: string;
}

const InputSelect: FC<InputSelectProps> = (
    {
        items,
        name,
        placeholder,
        onValueChange,
        disabled = false,
        isLoading,
        value
    }
) => {
    return (
        <Select
            name={name}
            onValueChange={onValueChange}
            disabled={disabled}
            defaultValue={value}
        >
            <SelectTrigger
                className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500">
                <SelectValue placeholder={`Pilih ${placeholder}`}/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{placeholder}</SelectLabel>
                    {items.map((item: string) => (
                        <SelectItem key={item} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default InputSelect;
