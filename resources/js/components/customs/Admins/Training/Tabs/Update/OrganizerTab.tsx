import { TabsContent } from "@/components/ui/tabs";
import Select from 'react-select';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { router, usePage } from "@inertiajs/react";
import type { StaffData } from "@/Pages/App/Admin/Training";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Document, Page } from "react-pdf";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { z } from "zod";
import { useAsset } from "@/lib/hooks/useAssetsFile";
import type { FileStruct, StaffStruct } from "@/Pages/App/Admin/Training/Detail";

interface Organizer {
    id: number
    email: string
    username: string
    name: string
    phone: string
    role: string
    updated_at: Date
    created_at: Date
}
const OrganizerSelectBuilder = ({ selectedTargets, trainingTargets, callback }: { selectedTargets?: Organizer[], trainingTargets: Organizer[], callback: (selected: Organizer[]) => void }) => {
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

const DrawerBuilder = ({
    file,
    file_type,
}: {
    file: File,
    file_type: string,
}) => {
    let fileURL: string | null = null

    if (file)
        fileURL = URL.createObjectURL(file)

    return (
        <Drawer>
            <DrawerContent className="z-[999999999999999999999999]">
                <DrawerHeader>
                    <DrawerTitle>
                        Tampilan Awal Dokumen{" "}
                        {file_type.toUpperCase()}
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
    );
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

const OrganizerTableBuilder = ({
    selected,
    obtainValue,
    storedData,
}: {
    selected: Organizer[],
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

    useEffect(() => {
        if (storedData.length > 0) {
            setFiles(storedData)
        }
    }, [storedData])

    useEffect(() => {
        if (storedData.length > 0) {
            selected.map((item: Organizer) => {
                const preparedFiles: FileUpload[] = []
                storedData.map((file: FileUpload) => {
                    if (file.user_id == item.id) {
                        preparedFiles.push(file)
                    }
                })
                setFiles(preparedFiles)
            })
        } else {
            const preparedInitialFiles: FileUpload[] = []
            selected.map(((item: Organizer) => {
                addNewFile(item.id, new File([], ''), 'spt')
                addNewFile(item.id, new File([], ''), 'sk')
            }))

            setFiles(preparedInitialFiles)
        }
    }, [])

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
                {selected.map((item: Organizer, index: number) => (
                    <TableRow key={item.username + item.id + new Date().getTime()}>
                        <TableCell className="font-medium">
                            {index + 1}
                        </TableCell>
                        <TableCell className="flex gap-2">
                            {item.name}
                        </TableCell>
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
        </Table >
    );
}

const PostData = async (formData: FormData, trainingId: number) => {
    const data = await axios.post(`/admin/training/${trainingId}/phase4`, formData)
    return data.data
}

const callAssets = async (url: string[], assetName: string[]) => {
    const result = url.map(async (item: string, index: number) => {
        const response = await fetch(item);
        if (!response.ok) throw new Error('Failed to fetch provinces');
        const blob = await response.blob();
        const file = new File([blob], assetName[index], { type: blob.type });
        return file
    })

    return Promise.all(result)
}

export const parseFile = (file: FileUpload[], preloaded: StaffStruct[]) => {
    let preparedPreload = preloaded.filter((val: StaffStruct) =>
        file.some((someVal: FileUpload) =>
            val.files.some((subSome: FileStruct) =>
                subSome.files === someVal.content.name
            )
        )
    )

    preparedPreload = preparedPreload.map((item: StaffStruct) => {
        item.files = item.files.filter((val: FileStruct) =>
            file.some((someVal: FileUpload) =>
                val.files === someVal.content.name
            )
        )
        return item
    })

    const filteredUploaded = file.filter((val: FileUpload) =>
        !preparedPreload.some((someVal: StaffStruct) =>
            someVal.files.some((subSome: FileStruct) =>
                subSome.files === val.content.name
            )
        )
    )

    const preparedData: StaffStruct[] = preparedPreload.map((item: StaffStruct) => {
        const files: FileStruct[] = item.files;
        const filteredUpload = filteredUploaded.filter((val: FileUpload) =>
            val.user_id === item.user_id
        )

        filteredUpload.map((val: FileUpload) => {
            files.push({
                files: val.content.name,
                file_type: val.type,
                url: URL.createObjectURL(val.content)
            })
        })

        return {
            id: item.id,
            user_id: item.user_id,
            files: files
        }
    })

    const preparedHasAll = preparedData.some((val: StaffStruct) =>
        filteredUploaded.some((someVal: FileUpload) =>
            val.files.some((subSome: FileStruct) =>
                subSome.files === someVal.content.name
            )
        )
    )

    if (!preparedHasAll) {
        filteredUploaded.map((val: FileUpload) => {
            if (!preparedData.some((prep: StaffStruct) => prep.user_id === val.user_id)) {
                preparedData.push({
                    user_id: val.user_id,
                    files: [{
                        files: val.content.name,
                        file_type: val.type,
                        url: URL.createObjectURL(val.content)
                    }]
                })
            }

            if (preparedData.some((item: StaffStruct) => item.user_id === val.user_id)) {
                const hasFile = preparedData.find((item: StaffStruct) =>
                    item.user_id === val.user_id)
                    ?.files.some((file: FileStruct) => file.files === val.content.name)

                if (hasFile) return

                const target = preparedData.find((item: StaffStruct) => item.user_id === val.user_id)
                if (target) {
                    target.files.push({
                        files: val.content.name,
                        file_type: val.type,
                        url: URL.createObjectURL(val.content)
                    })
                }
            }
        })
    }

    return preparedData
}

export default function OrganizerTab({
    organizer,
    organizersData,
    NextButton,
    PrevButton,
    trainingId,
}: {
    organizer: Organizer[],
    organizersData: StaffStruct[],
    NextButton: () => void,
    PrevButton: () => void,
    trainingId: number,
}) {
    const { toast } = useToast();
    const csrf = usePage().props.csrf_token;

    const [selected, setSelected] = useState<Organizer[]>(organizer || [])
    const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([])
    const [preloaded, setPreloaded] = useState<StaffStruct[]>(organizersData || [])

    useEffect(() => {
        if (organizersData.length < 1) return;

        let selectedOrganizer: Organizer[] = []
        const selOrganizer: number[] = []

        organizersData.map((item: StaffStruct) => {
            if (item.user_id) selOrganizer.push(item.user_id)
        })

        organizer.map((item: Organizer) => {
            if (selOrganizer.some((org: number) => org == item.id)) {
                selectedOrganizer.push(item)
            }
        })

        organizersData.map(async (item: StaffStruct) => {
            const assets = await callAssets(
                item.files.map((file: FileStruct) => file.url),
                item.files.map((file: FileStruct) => file.files)
            )

            if (!assets) return
            if (assets?.length < 1) return

            const preparedFiles: FileUpload[] = assets.map((file: File, index: number) => {
                const preparedFile: FileUpload = {
                    user_id: item.user_id,
                    content: file,
                    type: item.files[index].file_type
                }

                return preparedFile
            })

            setUploadedFiles(preparedFiles)
        })

        setSelected(selectedOrganizer)

    }, [])

    const {
        data: assets,
        error: errorAssets
    } = useAsset(
        preloaded.flatMap((item: StaffStruct) => item.files.map((val: FileStruct) => val.url)),
        "docsDataUpdate",
        preloaded.flatMap((item: StaffStruct) => item.files.map((val: FileStruct) => val.files))
    )

    useEffect(() => {
        let msg: string = "Ada yang salah";
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
        if (!assets) return
        if (assets.length < 1) return

        const preparedFiles = assets.map((item: File) => {
            const userData = preloaded.find((content: StaffStruct) =>
                content.files.find((file: FileStruct) =>
                    file.files === item.name
                )
            )
            if (!userData) return

            const fileType = item.name.split('_')[1]
            return { content: item, type: fileType, user_id: userData.user_id }
        })

        if (preparedFiles.some((item: FileUpload | undefined) => !item)) return;

        setUploadedFiles(preparedFiles)
    }, [assets])

    const handleTargetChange = (result: any[]) => {
        setSelected(result)
    }
    const handleNext = async () => {
        const formData = new FormData();
        const inputtedUserId: number[] = []

        uploadedFiles.map((item: FileUpload, index: number) => {
            if (!inputtedUserId.some((id: number) => id === item.user_id))
                formData.append(`content[${index}][users_id]`, item.user_id)

            if (inputtedUserId.some((id: number) => id === item.user_id)) {
                formData.append(`content[${index - 1}][files][${index}]`, item.content)
                formData.append(`content[${index - 1}][file_type][${index}]`, item.type)
            }
            else {
                formData.append(`content[${index}][files][${index}]`, item.content)
                formData.append(`content[${index}][file_type][${index}]`, item.type)
            }

            inputtedUserId.push(item.user_id)
        })

        formData.append("_token", csrf);
        formData.append("_method", "PUT");

        const result = await PostData(formData, trainingId);
        if (result.success) {
            toast({
                title: "Berhasil",
                description: result.message,
                variant: "default",
                duration: 5000,
            });

            const preservedResult: StaffData[] = result.data.organizer_data.map((item: any, index: number) => {
                const preparedOrganizer: StaffData = {
                    id: item.users_id,
                    files: item.files.map((file: any) => {
                        return {
                            files: file,
                            type: item.file_type[index],
                            url: item.url[index]
                        }
                    })
                }
                return preparedOrganizer
            })

            router.reload({ only: ['organizer', 'training'] })

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

    const getFiles = (value: FileUpload[]) => {
        const preparedValue = parseFile(value, preloaded)
        console.log(preparedValue)
        //setPreloaded(preparedValue)

        setUploadedFiles(value)
    }

    return (
        <TabsContent value="penyelenggara" className="w-full px-3 py-1">
            <h4 className="text-lg font-bold">Penyelenggara</h4>
            <div className="flex flex-col gap-3">
                <OrganizerSelectBuilder selectedTargets={selected} trainingTargets={organizer} callback={handleTargetChange} />
                {
                    selected.length > 0 &&
                    <OrganizerTableBuilder selected={selected} obtainValue={getFiles} storedData={uploadedFiles} />
                }
            </div>
            <div className="col-span-full flex justify-between mt-2">
                <Button type="button" className="w-fit justify-start text-left font-normal bg-slate-500 text-white" onClick={() => PrevButton()}>
                    &lt; Kembali
                </Button>

                <Button type="button" className="w-fit justify-start text-left font-normal bg-slate-500 text-white" onClick={handleNext}>
                    Lanjutkan &gt;
                </Button>
            </div>
        </TabsContent>

    )
}

