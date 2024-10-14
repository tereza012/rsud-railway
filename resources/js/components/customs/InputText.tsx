import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@uidotdev/usehooks";

interface InputData {
    name: string;
    value: string;
}

const InputSchema = z.object({
    content: z.string().min(1, "Input tidak boleh kosong"),
});

const InputBuilder = ({
    name,
    callback,
    className,
    value,
    getErr,
}: {
    name: string;
    className?: string;
    callback?: (name: string, value: string) => void;
    value?: string;
    getErr: (hasErr: boolean) => void;
}) => {
    const [currentValue, setCurrentValue] = useState<string>(value ?? "");
    const [err, setErr] = useState<z.infer<typeof InputSchema> | null>(null);

    const handleChange = (event: any) => {
        validateInput(event.target.value);

        setCurrentValue(event.target.value);
        // if (callback) callback(name, event.target.value);
    };
    const handleKeyDown = (event: any) => {
        if (event.key !== 'Enter') return;
        validateInput(event.target.value);

        if (callback) callback(name, event.target.value);
    }

    const validateInput = (content: string) => {
        try {
            InputSchema.parse({ content });
            getErr(err === null);
        } catch (error) {
            if (error instanceof z.ZodError) {
                // @ts-ignore
                setErr(error);
                getErr(err === null);
            }
        }
    };

    return (
        <div className="flex flex-col gap-1 w-full">
            <Input
                type="text"
                name={name}
                className={className}
                placeholder=""
                value={currentValue}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onClick={(e) => validateInput(e.target.value)}
            />
            <span className="text-xs text-slate-400">*Tekan Enter untuk Konfirmasi</span>
            {err && (

                <span className="text-sm text-red-500" key={err.issues[0].path.includes("content")}>
                    {err.issues.map((item: any) =>
                        item.path.includes("content") ? item.message : null
                    )}
                </span>
            )}
        </div>
    );
};


const InputText = ({
    content,
    handler,
    getErr,
    name,
    isRepeater = true,
    blockButton = false,
}: {
    content: string[];
    handler?: (inputs: string[]) => void;
    getErr: (err: boolean) => void;
    name: string;
    isRepeater?: boolean;
    blockButton?: boolean;
}) => {
    const [input, setInput] = useState<InputData[]>(
        content?.length > 0
            ? content?.map((item: string) => {
                return { name: name, value: item };
            })
            : [{ name, value: "" }]
    );
    const [, forceUpdate] = useState(0);
    const memo = useMemo(() => input, [input]);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (content.length > 0)
            setInput(
                content.map((item: string) => {
                    return { name: name, value: item };
                })
            );
        forceUpdate((prev) => prev + 1);
    }, [content]);

    useEffect(() => {
        if (content.length > 0)
            setInput(
                content.map((item: string) => {
                    return { name: name, value: item };
                })
            );
        forceUpdate((prev) => prev + 1);
    }, []);

    const handleAddInput = (name: string, value: string) => {
        setInput([...input, { name, value }]);
    };

    const handleRemoveInput = (index: number) => {
        setInput(input.filter((_, i: number) => i !== index));
    };

    const handleInputChange = (name: string, value: string) => {
        const index = name.split("[")[1].replace("]", "");
        const newInputs = input.map((item: InputData, i: number) => {
            if (i === parseInt(index))
                return { ...item, value: value };

            return item;
        });

        setInput(newInputs);

        if (handler) {
            handler(newInputs.map((item: InputData) => item.value));
        }
    };

    const obtainErr = (hasErr: boolean) => {
        getErr(hasErr);
    };

    if (!isRepeater)
        return (
            <div className="flex gap-2 justify-center align-middle mt-2">
                <div className="flex flex-col gap-1 w-full align-bottom">
                    {input.map((item: InputData, i: number) => (
                        <div
                            className="flex gap-2 w-full max-md:flex-col"
                            key={JSON.stringify(memo[i]) + i}
                        >
                            <InputBuilder
                                name={`${name}[${i}]`}
                                callback={handleInputChange}
                                className="w-full mt-1"
                                value={item.value}
                                getErr={obtainErr}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )

    return (
        <div className="flex gap-2 justify-center align-middle mt-2">
            <div className="flex flex-col gap-1 w-full align-bottom">
                {input.map((item: InputData, i: number) => (
                    <div
                        className={`flex gap-2 w-full ${blockButton && 'max-md:flex-col'}`}
                        key={JSON.stringify(memo[i]) + i}
                    >
                        <InputBuilder
                            name={`${name}[${i}]`}
                            callback={handleInputChange}
                            className="w-full mt-1"
                            value={item.value}
                            getErr={obtainErr}
                        />
                        <div
                            className={`flex
                                ${isDesktop && blockButton ? "flex-col" : "gap-2"}
                                h-full
                                ${i > 0 ? "justify-end" : "justify-start"}`
                            }
                        >
                            <Button
                                type="button"
                                className={`w-fit  "max-md:w-full"
                                     justify-center text-center font-normal bg-blue-500 fill-white mt-1`}
                                onClick={() =>
                                    handleAddInput(`${name}`, "")
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                                </svg>
                            </Button>
                            {i > 0 && (
                                <Button
                                    type="button"
                                    className={`w-fit "max-md:w-full"
                                         justify-center text-center font-normal bg-red-500 fill-white mt-1`}
                                    onClick={() => handleRemoveInput(i)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 11h14v2H5z"></path>
                                    </svg>
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InputText;
