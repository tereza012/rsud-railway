import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePage } from "@inertiajs/react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from 'zod';
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useAsset } from "@/lib/hooks/useAssetsFile";
import { twMerge } from "tailwind-merge";

export interface FileData {
    content: File
    type: string
}

interface InputFile {
    name: string
    value: FileData
}

const FileSchema = z.object({
    content: z.instanceof(File)
        .superRefine((file: File, ctx) => {
            if (file.size > (2 * 1024 * 1024)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Ukuran file tidak boleh lebih dari 2MB",
                });
            }

            if (file.name === '') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "File tidak boleh kosong",
                });
            }
        }),
    type: z.string().min(1),
})

const InputBuilder = ({
    name,
    callback,
    className,
    value,
    file_type,
    getErr
}: {
    name: string,
    className?: string,
    callback?: (name: string, value: FileData) => void,
    value?: FileData,
    file_type: string[],
    getErr: (hasErr: boolean) => void
}) => {
    const [file, setFile] = useState<File>(value?.content ?? new File([], ''))
    const [fileType, setFileType] = useState<string>(value?.type ?? '')
    const [currentValue, setCurrentValue] = useState<string>(value?.content?.name ?? '')

    const [err, setErr] = useState<z.infer<typeof FileSchema> | null>(null)

    useEffect(() => {
        if (value?.content) {
            setFile(value.content);
            setFileType(value.type);
            setCurrentValue(value.content.name)

            validateInput(value.content, value.type)
        }
    }, [value])

    useEffect(() => {
        if (value?.content) {
            setFile(value.content);
            setFileType(value.type);
            setCurrentValue(value.content.name)

            if (callback) callback(name, { content: value.content, type: value.type })
            validateInput(value.content, value.type)
        }
    }, [])

    useEffect(() => {
        if (value?.content) {
            setFile(value.content);
            setFileType(value.type);
            setCurrentValue(value.content.name)

            if (callback)
                callback(name, { content: value.content, type: value.type })
            validateInput(file, fileType)
        }
    }, [file, fileType])


    const handleChange = (event: any) => {
        if (event.target.files.length === 0) return;
        const selectedFile = event.target.files[0];
        setFile(selectedFile)
        validateInput(selectedFile, fileType)

        if (callback) callback(name, { content: selectedFile, type: fileType })
    };

    const validateInput = (selectedFile: File, selectedFileType: string) => {
        try {
            FileSchema.parse({ content: selectedFile, type: selectedFileType })
            getErr(err === null)
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErr(error);
                getErr(err === null)
            }
        }
    }

    const handleTypeChange = (selected: string) => {
        setFileType(selected)
        validateInput(file, selected);

        if (callback) callback(name, { content: file, type: selected })
    }

    return (

        <div className="flex flex-col gap-1 w-full">
            <div className="grid grid-cols-5 max-md:grid-cols-1 gap-1 w-full">
                <Label className="w-full col-span-4">
                    <p className="truncate max-w-[75%] text-sm">
                        {currentValue === "" ? "Dokumen" : currentValue}
                    </p>
                    <Input
                        type="file"
                        name={name}
                        id={name}
                        className={twMerge('w-full', className)}
                        aria-label={currentValue}
                        placeholder={currentValue}
                        accept="application/pdf"
                        onChange={handleChange}
                    />
                    {err && (
                        <span className="text-sm text-red-500">
                            {err.issues.map((item: any) => item.path.includes('content') ?
                                item.message :
                                null)
                            }
                        </span>
                    )}
                </Label>
                <Label className="w-full col-span-1">
                    Tipe Dokumen
                    <Select name={`${name}_type`} onValueChange={handleTypeChange} value={fileType}>
                        <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {file_type.map((item: string) => (
                                    <SelectItem key={item + (Date.now() % Math.random())} value={item}>{item.toUpperCase()}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {err && (
                        <span className="text-sm text-red-500">
                            {err.issues.map((item: any) => item.path.includes('type') ?
                                item.message :
                                null)
                            }
                        </span>
                    )}
                </Label>
            </div>
        </div >
    )
}

const FileBuilder = ({
    content,
    handler,
    file_type,
    getErr,
}: {
    content: FileData[],
    handler?: (inputs: FileData[]) => void,
    file_type: string[],
    getErr: (err: boolean) => void,
}) => {
    const name = 'file'
    const [input, setInput] = useState<InputFile[]>(
        content?.length > 0 ?
            content?.map((item: FileData) => {
                return { name: name, value: item }
            }) : [{ name, value: { content: new File([], ''), type: '' } }]
    )
    const [, forceUpdate] = useState(0);
    const memo = useMemo(() => input, [input])

    useEffect(() => {
        if (content.length > 0)
            setInput(content.map((item: FileData) => {
                return { name: name, value: item }
            }))
        forceUpdate((prev) => prev + 1);
    }, [content]);

    useEffect(() => {
        if (content.length > 0)
            setInput(content.map((item: FileData) => {
                return { name: name, value: item }
            }))
        forceUpdate((prev) => prev + 1);
    }, []);


    const handleAddInput = (name: string, value: FileData) => {
        setInput([...input, { name, value }])
    }

    const handleRemoveInput = (index: number) => {
        setInput(input.filter((_, i: number) => i !== index))
    }

    const handleInputChange = (name: string, value: FileData) => {
        const index = name.split('[')[1].replace(']', '')
        const newInputs = input.map((item: InputFile, i: number) => i === parseInt(index) ? { ...item, value } : item);

        setInput(newInputs)

        if (handler) {
            handler(newInputs.map((item: InputFile) => item.value))
        }
    }

    const obtainErr = (hasErr: boolean) => {
        getErr(hasErr)
    }

    return (
        <div className="flex gap-2 justify-center align-middle mt-2">
            <div className="flex flex-col gap-4 w-full">
                {
                    input.map((item: InputFile, i: number) =>
                        <div className="w-full grid grid-cols-10 gap-2 max-md:grid-cols-5" key={JSON.stringify(memo[i]) + i}>
                            <div className="w-full col-span-8 max-md:col-span-3">
                                <InputBuilder
                                    name={`${name}[${i}]`}
                                    callback={handleInputChange}
                                    className="w-full mt-1"
                                    value={item.value}
                                    file_type={file_type}
                                    getErr={obtainErr}
                                />
                            </div>
                            <div className="col-span-2 w-full h-full flex gap-2 max-md:flex-col justify-center">
                                <Button
                                    type="button"
                                    className="w-full max-md:h-full justify-center text-left font-normal bg-blue-500 fill-white mt-4 max-md:mt-0"
                                    onClick={() => handleAddInput(`${name}`, { content: new File([], ''), type: '' })}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                                    </svg>
                                </Button>
                                {
                                    i > 0 &&
                                    <Button
                                        type="button"
                                        className="w-full max-md:h-full justify-center text-left font-normal bg-red-500 hover:bg-red-600 fill-white mt-4 max-md:mt-0"
                                        onClick={() => handleRemoveInput(i)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                                            <path d="M5 11h14v2H5z"></path>
                                        </svg>
                                    </Button>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const PostData = async (data: any, id: number) => {
    const res = await axios.post(`/api/admin/training/phase3/${id}`, data);
    return res.data;
}

const checkDataChange = (current: FileData[], stateData: FileType[]) => {
    let isContentChanged: boolean[] = []

    if (current.length !== stateData.length) return true

    stateData.map((item: FileType, index: number) => {
        const contentValue = current.find((value: FileData) => value.content.name === item.files)?.content.name
        const typeValue = current.find((value: FileData) => value.content.name === item.files)?.type
        if (contentValue !== item.files || typeValue !== item.type) isContentChanged[index] = true
    })

    return isContentChanged.some((item: boolean) => item === true)
}

interface FileType {
    id: number
    files: string
    type: string
    url: string
}

export default function Documents({
    file_types,
    NextButton,
    PrevButton,
    fileData,
    trainingId,
}: {
    file_types: string[],
    NextButton: () => void,
    PrevButton: () => void,
    fileData: FileType[],
    trainingId: number,
}) {
    const [file, setFile] = useState<FileData[]>([])
    const [preloaded, setPreloaded] = useState<FileType[]>(fileData || [])
    const [canSubmit, setCanSubmit] = useState(false)
    console.log(preloaded)

    const { toast } = useToast();
    const csrf = usePage().props.csrf_token;

    const handleFileChange = useCallback((inputs: FileData[]) => {
        setFile(inputs)
    }, []);

    const {
        data: assets,
        error: errorAssets
    } = useAsset(
        preloaded.map((item: FileType) => item.url),
        "docsDataUpdate",
        preloaded.map((item: FileType) => item.files)
    )

    useEffect(() => {
        let msg: string = "Ada yang salah";
        console.log(errorAssets)
        if (errorAssets) {
            if (errorAssets.message.includes('404'))
                msg = "Tidak dapat menemukan file yang dibutuhkan"

            toast({
                title: "Error",
                description: msg,
                variant: "destructive",
                duration: 2000,
            });
        }


    }, [errorAssets])

    useEffect(() => {
        if (!assets) return;
        if (assets.length < 1) return
        if (errorAssets) return

        const preparedAsset = assets.map((item: File) => {
            const targetFile = preloaded.find((val: FileType) => val.files === item.name)

            if (preloaded.length <= assets.length && targetFile)
                return { content: item, type: targetFile.type }
        })
            .filter((item: any) => item !== undefined)

        // @ts-ignore
        setFile(preparedAsset)
    }, [assets])

    const handleNext = async () => {
        const isDataChanged = checkDataChange(file, preloaded)
        if (!isDataChanged && file.length > 0) {
            NextButton()
            return
        }

        const formData = new FormData();

        file.forEach((fileData: FileData, index: number) => {
            if (Object.keys(fileData).includes('id')) formData.append(`content[${index}]['id']`, fileData.id);
            if (!Object.keys(fileData).includes('id')) {
                formData.append(`content[${index}]['files']`, fileData.content);
                formData.append(`content[${index}]['file_type']`, fileData.type);
            }
        });
        // @ts-ignore
        formData.append("_token", csrf);
        console.log(formData)

        const result = await PostData(formData, trainingId);
        if (result.success) {
            toast({
                title: "Berhasil",
                description: result.message,
                variant: "default",
                duration: 5000,
            });

            //const preservedResult: DocsData[] = result.data.file.files.map((item: any, index: number) => {
            //    return { file_type: result.data.file.file_type[index], files: item, url: result.data.url[index] }
            //})

            NextButton()
        } else {
            toast({
                title: "Gagal",
                description: result.message,
                variant: "destructive",
                duration: 5000,
            });

            console.error("Error: ", result.data);
        }
    }

    const obtainErr = (hasErr: boolean) => {
        setCanSubmit(hasErr)
    }

    return (
        <TabsContent value="dokumen" className="w-full px-3 py-1" >
            <h4 className="text-lg font-bold">File Pendukung</h4>
            <div className="flex flex-col gap-3">
                <FileBuilder content={file} handler={handleFileChange} file_type={file_types} getErr={obtainErr} />
            </div>
            <div className="col-span-full flex justify-between mt-4">
                <Button type="button" className="w-fit justify-start text-left font-normal bg-slate-500 text-white" onClick={() => PrevButton()}>
                    &lt; Kembali
                </Button>

                <Button type="button" className="w-fit justify-start text-left font-normal bg-slate-500 text-white" disabled={!canSubmit} onClick={handleNext}>
                    Lanjutkan &gt;
                </Button>
            </div>
        </TabsContent >
    )
}

