import { TabsContent } from "@/components/ui/tabs";
import Select from 'react-select';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Document, Page } from "react-pdf";
import axios from "axios";

export interface UserType {
    id: number
    email: string
    username: string
    name: string
    phone: string
    role: string
    updated_at: Date
    created_at: Date
}

export const PostDataTrainingStaff = async (formData: FormData, phaseNumber: number) => {
    const data = await axios.post(`/api/admin/training/phase${phaseNumber}`, formData)

    return data.data
}

export const UserSelectorBuilder = ({
    selectedTargets,
    trainingTargets,
    callback
}: {
    selectedTargets?: UserType[],
    trainingTargets: UserType[],
    callback: (selected: UserType[]) => void
}) => {
    const [selected, setSelected] = useState<number[]>([])
    const options: { value: string, label: string, }[] = []

    trainingTargets.map((item: any) => {
        options.push({ value: item.id, label: item.name })
    });

    const handleChange = (content: { label: string, value: string }[]) => {
        const values = content.map((item: any) => item.value)
        const result = trainingTargets.filter(((item: any) => values.some((t: any) => t === item.id)))

        setSelected(values)
        if (typeof values !== 'undefined')
            callback(result)
    }

    return (
        <Select
            value={options.map((item: any) => selectedTargets?.some((t: any) => t.id === item.value) && item)}
            isMulti
            name={`organizer[${selected.length - 1 >= 0 ? selected.length - 1 : 0}]`}
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Target Peserta (Tenaga Medis dll)"
            onChange={handleChange}
        />
    )
}

export interface FileUpload {
    user_id: number
    content: File
    type: string
}

const FileSchema = z.object({
    content: z.instanceof(File).superRefine((file: File, ctx) => {
        if (file.size > 2 * 1024 * 1024) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Ukuran file ${file.name} tidak boleh lebih dari 2MB`,
            });
        }

        if (file.name === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "File tidak boleh kosong",
            });
        }
    }),
    user_id: z.number(),
});

export const UserSelectedTableBuilder = ({
    selected,
    obtainValue,
    storedData,
}: {
    selected: UserType[],
    obtainValue: (value: FileUpload[]) => void
    storedData: FileUpload[],
}) => {
    const [err, setErr] = useState<z.infer<typeof FileSchema> | null>(null);
    const [files, setFiles] = useState<FileUpload[]>([])

    const handleChangeSPT = (event: any) => {
        if (event.target.files.length === 0) return

        const file = event.target.files[0]
        const splittedName = event.target.name.split('_')
        const id = parseInt(splittedName[splittedName.length - 1])

        const preparedFiles: FileUpload = {
            user_id: id,
            content: file,
            type: 'spt'
        }

        let newInput: FileUpload[] = files.filter((item: FileUpload) => item.type != 'spt' || item.user_id != id)

        validateInput([...newInput, preparedFiles])

        setFiles([...newInput, preparedFiles])
        obtainValue([...newInput, preparedFiles])
    }

    const handleChangeSK = (event: any) => {
        if (event.target.files.length === 0) return

        const file = event.target.files[0]
        const splittedName = event.target.name.split('_')
        const id = parseInt(splittedName[splittedName.length - 1])

        const preparedFiles: FileUpload = {
            user_id: id,
            content: file,
            type: 'sk'
        }
        let newInput: FileUpload[] = files.filter((item: FileUpload) => item.user_id != id || item.type != 'sk')

        validateInput([...newInput, preparedFiles])

        setFiles([...newInput, preparedFiles])
        obtainValue([...newInput, preparedFiles])
    }

    const addNewFile = (user_id: number, file: File, fileType: string,) => {
        const preparedFiles: FileUpload = {
            user_id: user_id,
            content: file,
            type: fileType
        }
        setFiles([...files, preparedFiles])
    }

    const validateInput = (payload: FileUpload[]) => {
        payload.map((item: FileUpload) => {
            try {
                FileSchema.parse({ content: item.content, type: item.type, user_id: item.user_id })
                //getErr(err === null);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    setErr(error);
                    //getErr(err === null);
                }
            }
        })
    };


    useEffect(() => {
        if (storedData.length > 0) {
            setFiles(storedData)
        }
    }, [storedData])

    useEffect(() => {
        if (storedData.length > 0) return

        const preparedInitialFiles: FileUpload[] = []
        selected.map(((item: UserType) => {
            addNewFile(item.id, new File([], ''), 'spt')
            addNewFile(item.id, new File([], ''), 'sk')
        })
        )

        setFiles(preparedInitialFiles)
    }, [])


    const downloadSpt = (id: number) => {
        console.log(files.filter((item: FileUpload) => item.type === 'spt'))
    }

    const downloadSpk = (id: number) => {
        console.log(files.filter((item: FileUpload) => item.type === 'sk'))
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-fit">No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead hidden>Download SPT &amp; SPK</TableHead>
                    <TableHead hidden className="text-right">
                        Upload SPT &amp; SPK
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {selected.map((item, index) => (
                    <TableRow key={item.username + item.id + new Date().getTime()}>
                        <TableCell className="font-medium">
                            {index + 1}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2">
                                {
                                    files.find((file: FileUpload) => file.type == 'spt' && file.content.size > 0 && file.user_id == item.id) ?
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild className="my-auto">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`w-6 h-6 ${err ? 'fill-red-500' : ''}`}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                                                        <path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
                                                    </svg>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-white p-2 border-2 border-primary">
                                                    <div className="w-full flex justify-center max-h-[52vh] overflow-scroll">
                                                        {err ?
                                                            <span className="text-sm text-red-500">
                                                                {err.issues.map((item: any) =>
                                                                    item.path.includes("content")
                                                                        ? item.message
                                                                        : null
                                                                )}
                                                            </span>
                                                            :

                                                            <Document
                                                                file={URL.createObjectURL(storedData.find((file: FileUpload) =>
                                                                    item.id == file.user_id &&
                                                                    file.type == 'spt'
                                                                )?.content ?? new File([], ""))}
                                                                className="mt-2 h-full w-full"
                                                            >
                                                                <Page
                                                                    pageNumber={1}
                                                                    renderTextLayer={false}
                                                                    renderAnnotationLayer={false}
                                                                    className="h-full overflow-hidden rounded shadow-slate-300 shadow-xl"
                                                                />
                                                            </Document>
                                                        }
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        :
                                        ""
                                }
                                <Button className="bg-blue-500 text-white fill-white mr-1 gap-1" onClick={() => document.getElementById('spt_u_' + item.id)?.click()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M13 19v-4h3l-4-5-4 5h3v4z" /><path d="M7 19h2v-2H7c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.756 2.673-3.015l.581-.102.192-.558C8.149 8.274 9.895 7 12 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-3v2h3c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5z" />
                                    </svg>
                                    Upload SPT
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                {
                                    files.find((file: FileUpload) => file.type === 'sk' && file.content.size > 0 && file.user_id == item.id) ?
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild className="my-auto">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`w-6 h-6 ${err ? 'fill-red-500' : ''}`}
                                                        viewBox="0 0 24 24">
                                                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /><path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
                                                    </svg>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-white p-2 border-2 border-primary">
                                                    <div className="w-full flex justify-center max-h-[52vh] overflow-scroll">
                                                        {err ?
                                                            <span className="text-sm text-red-500">
                                                                {err.issues.map((item: any) =>
                                                                    item.path.includes("content")
                                                                        ? item.message
                                                                        : null
                                                                )}
                                                            </span>
                                                            :

                                                            <Document
                                                                file={URL.createObjectURL(storedData.find((file: FileUpload) =>
                                                                    item.id == file.user_id &&
                                                                    file.type == 'sk'
                                                                )?.content ?? new File([], ""))}
                                                                className="mt-2 h-full w-full"
                                                            >
                                                                <Page
                                                                    pageNumber={1}
                                                                    renderTextLayer={false}
                                                                    renderAnnotationLayer={false}
                                                                    className="h-full overflow-hidden rounded shadow-slate-300 shadow-xl"
                                                                />
                                                            </Document>
                                                        }
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        :
                                        ""
                                }
                                <Button className="bg-blue-500 text-white fill-white mt-1 gap-1" onClick={() => document.getElementById('sk_u_' + item.id)?.click()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M13 19v-4h3l-4-5-4 5h3v4z" /><path d="M7 19h2v-2H7c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.756 2.673-3.015l.581-.102.192-.558C8.149 8.274 9.895 7 12 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-3v2h3c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5z" />
                                    </svg>
                                    Upload SK
                                </Button>
                            </div>
                            <Input
                                type="file"
                                name={`spt_u_${item.id}`}
                                id={`spt_u_${item.id}`}
                                className="hidden"
                                accept="application/pdf"
                                onChange={handleChangeSPT}
                            />
                            <Input
                                type="file"
                                name={`sk_u_${item.id}`}
                                id={`sk_u_${item.id}`}
                                className="hidden"
                                accept="application/pdf"
                                onChange={handleChangeSK}
                            />

                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
