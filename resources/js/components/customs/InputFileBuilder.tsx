import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Document, Page } from "react-pdf";
import { useMediaQuery } from "@uidotdev/usehooks";

export interface FileData {
    content: File;
    type: string;
    fake_url?: string;
}

interface InputFile {
    name: string;
    value: FileData;
}

const FileSchema = z.object({
    content: z.instanceof(File).superRefine((file: File, ctx) => {
        if (file.size > 2 * 1024 * 1024) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Ukuran file tidak boleh lebih dari 2MB",
            });
        }

        if (file.name === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "File tidak boleh kosong",
            });
        }
    }),
    type: z.string().min(1),
});

const InputBuilder = ({
    name,
    callback,
    className,
    value,
    file_type,
    getErr,
    acceptFile = "application/pdf",
}: {
    name: string;
    className?: string;
    callback?: (name: string, value: FileData) => void;
    value?: FileData;
    file_type: string[];
    getErr: (hasErr: boolean) => void;
    acceptFile?: string;
}) => {
    const [file, setFile] = useState<File>(value?.content ?? new File([], ""));
    const [fileType, setFileType] = useState<string>(value?.type ?? "");
    const [currentValue, setCurrentValue] = useState<string>(
        value?.content?.name ?? ""
    );
    const [fileURL, setFileURL] = useState<string | null>(
        value?.fake_url ?? null
    );

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [err, setErr] = useState<z.infer<typeof FileSchema> | null>(null);

    useEffect(() => {
        if (value?.content) {
            setFile(value.content);
            setFileType(value.type);
            setCurrentValue(value.content.name);

            validateInput(value.content, value.type);
        }
    }, [value]);

    useEffect(() => {
        if (value?.content) {
            setFile(value.content);
            setFileType(value.type);
            setCurrentValue(value.content.name);

            if (callback)
                callback(name, {
                    content: value.content,
                    type: value.type,
                    fake_url: value.fake_url,
                });
            validateInput(value.content, value.type);
        }
    }, []);

    useEffect(() => {
        if (value?.content) {
            setFile(value.content);
            setFileType(value.type);
            setCurrentValue(value.content.name);

            if (callback)
                callback(name, {
                    content: value.content,
                    type: value.type,
                    fake_url: value.fake_url,
                });
            validateInput(file, fileType);
        }
    }, [file, fileType]);

    const handleChange = (event: any) => {
        if (event.target.files.length === 0) return;
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        validateInput(selectedFile, fileType);
        setFileURL(URL.createObjectURL(selectedFile));

        if (callback)
            callback(name, {
                content: selectedFile,
                type: fileType,
                fake_url: URL.createObjectURL(selectedFile),
            });
    };

    const validateInput = (selectedFile: File, selectedFileType: string) => {
        try {
            FileSchema.parse({ content: selectedFile, type: selectedFileType });
            getErr(err === null);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErr(error);
                getErr(err === null);
            }
        }
    };

    const handleTypeChange = (selected: string) => {
        setFileType(selected);
        validateInput(file, selected);

        if (callback)
            callback(name, {
                content: file,
                type: selected,
                fake_url: URL.createObjectURL(file),
            });
    };

    const handleDrawerHover = (status: boolean) => {
        if (!file) return;

        setDrawerOpen(status);
    };

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-1 w-full max-md:flex-col">
                <Label className="w-full">
                    <div className="flex justify-start align-middle w-full">
                        <p className="truncate max-w-[75%]">
                            {currentValue === "" ? "Dokumen" : currentValue}
                        </p>
                        {currentValue !== "" && (
                            <span
                                className="text-sm fill-slate-400"
                                onMouseOver={
                                    drawerOpen
                                        ? undefined
                                        : () => handleDrawerHover(true)
                                }
                                onMouseOut={
                                    drawerOpen
                                        ? undefined
                                        : () => handleDrawerHover(false)
                                }
                                onClick={() => handleDrawerHover(!drawerOpen)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                                </svg>
                            </span>
                        )}
                    </div>
                    <Input
                        type="file"
                        name={name}
                        id={name}
                        className={className}
                        aria-label={currentValue}
                        placeholder={currentValue}
                        accept={acceptFile}
                        onChange={handleChange}
                    />
                    {err && (
                        <span className="text-sm text-red-500">
                            {err.issues.map((item: any) =>
                                item.path.includes("content")
                                    ? item.message
                                    : null
                            )}
                        </span>
                    )}
                </Label>
                <Label className="max-md:w-full w-1/3">
                    Tipe Dokumen
                    <Select
                        name={`${name}_type`}
                        onValueChange={handleTypeChange}
                        value={fileType}
                    >
                        <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="Pilih Dokumen" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {file_type.map((item: string) => (
                                    <SelectItem
                                        key={
                                            item + (Date.now() % Math.random())
                                        }
                                        value={item}
                                    >
                                        {item.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {err && (
                        <span className="text-sm text-red-500">
                            {err.issues.map((item: any) =>
                                item.path.includes("type") ? item.message : null
                            )}
                        </span>
                    )}
                </Label>
                {fileURL && (
                    <Drawer open={drawerOpen} onOpenChange={handleDrawerHover}>
                        <DrawerContent className="z-[999999999999999999999999]">
                            <DrawerHeader>
                                <DrawerTitle>
                                    Tampilan Awal Dokumen{" "}
                                    {file_type[0].toUpperCase()}
                                </DrawerTitle>
                                <DrawerDescription>
                                    Ini merupakan halaman pertama (1) dari
                                    dokumen yang telah dibuat.
                                    <br />
                                    <b>{file.name}</b>
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="w-full flex justify-center max-h-[52vh] overflow-scroll">
                                <Document
                                    file={fileURL}
                                    className="mt-2 h-full w-full"
                                >
                                    <Page
                                        pageNumber={1}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        className="h-full overflow-hidden rounded shadow-slate-300 shadow-xl"
                                    />
                                </Document>
                            </div>
                        </DrawerContent>
                    </Drawer>
                )}
            </div>
        </div>
    );
};

const FileBuilder = ({
    content,
    handler,
    file_type,
    getErr,
    name,
    isRepeater = true,
    acceptFile,
}: {
    content: FileData[];
    handler?: (inputs: FileData[]) => void;
    file_type: string[];
    getErr: (err: boolean) => void;
    name: string;
    isRepeater?: boolean;
    acceptFile?: string;
}) => {
    const [input, setInput] = useState<InputFile[]>(
        content?.length > 0
            ? content?.map((item: FileData) => {
                return { name: name, value: item };
            })
            : [{ name, value: { content: new File([], ""), type: "" } }]
    );
    const [, forceUpdate] = useState(0);
    const memo = useMemo(() => input, [input]);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (content.length > 0)
            setInput(
                content.map((item: FileData) => {
                    return { name: name, value: item };
                })
            );
        forceUpdate((prev) => prev + 1);
    }, [content]);

    useEffect(() => {
        if (content.length > 0)
            setInput(
                content.map((item: FileData) => {
                    return { name: name, value: item };
                })
            );
        forceUpdate((prev) => prev + 1);
    }, []);

    const handleAddInput = (name: string, value: FileData) => {
        setInput([...input, { name, value }]);
    };

    const handleRemoveInput = (index: number) => {
        setInput(input.filter((_, i: number) => i !== index));
    };

    const handleInputChange = (name: string, value: FileData) => {
        const index = name.split("[")[1].replace("]", "");
        const newInputs = input.map((item: InputFile, i: number) =>
            i === parseInt(index) ? { ...item, value } : item
        );

        setInput(newInputs);

        if (handler) {
            handler(newInputs.map((item: InputFile) => item.value));
        }
    };

    const obtainErr = (hasErr: boolean) => {
        getErr(hasErr);
    };

    if (!isRepeater)
        return (
            <div className="flex gap-2 justify-center align-middle mt-2">
                <div className="flex flex-col gap-1 w-full align-bottom">
                    {input.map((item: InputFile, i: number) => (
                        <div
                            className="flex gap-2 w-full max-md:flex-col"
                            key={JSON.stringify(memo[i]) + i}
                        >
                            <InputBuilder
                                name={`${name}[${i}]`}
                                acceptFile={acceptFile}
                                callback={handleInputChange}
                                className="w-full mt-1"
                                value={item.value}
                                file_type={file_type}
                                getErr={obtainErr}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );

    return (
        <div className="flex gap-2 justify-center align-middle mt-2">
            <div className="flex flex-col gap-1 w-full align-bottom">
                {input.map((item: InputFile, i: number) => (
                    <div
                        className="flex gap-2 w-full max-md:flex-col"
                        key={JSON.stringify(memo[i]) + i}
                    >
                        <InputBuilder
                            name={`${name}[${i}]`}
                            acceptFile={acceptFile}
                            callback={handleInputChange}
                            className="w-full mt-1"
                            value={item.value}
                            file_type={file_type}
                            getErr={obtainErr}
                        />
                        <div
                            className={`flex ${isDesktop ? "flex-col" : "gap-2"
                                } h-full ${i > 0 ? "justify-end" : "justify-between"
                                }`}
                        >
                            <Button
                                type="button"
                                className={`w-fit ${i > 0 ? "max-md:w-1/3" : "max-md:w-full"
                                    } justify-center text-center font-normal bg-blue-500 fill-white mt-4`}
                                onClick={() =>
                                    handleAddInput(`${name}`, {
                                        content: new File([], ""),
                                        type: "",
                                    })
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
                                    className={`w-fit ${i > 0 ? "max-md:w-1/3" : "max-md:w-full"
                                        } justify-center text-center font-normal bg-red-500 fill-white mt-4`}
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

export default FileBuilder;
