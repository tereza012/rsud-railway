import { useEffect, useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { TabsContent } from "@radix-ui/react-tabs"
import { PostDataTrainingStaff, UserSelectedTableBuilder, UserSelectorBuilder, type FileUpload, type UserType } from "../TraininMembersFile"
import { Button } from "@/components/ui/button"
import { useAsset } from "@/lib/hooks/useAssetsFile"
import type { DocsData, StaffData } from "@/Pages/App/Admin/Training"
import { toast } from "@/components/ui/use-toast"

export default function ControllerTab({
    controller,
    storedData,
    NextButton,
    PrevButton,
    obtainData,
}: {
    controller: UserType[],
    storedData: StaffData[],
    NextButton: () => void,
    PrevButton: () => void,
    obtainData: (data: StaffData[]) => void,
}) {
    const [selected, setSelected] = useState<UserType[]>([])
    const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([])

    const csrf = usePage().props.csrf_token;

    const {
        data: assets,
        isLoading: loadingAssets,
        error: errorAssets
    } = useAsset(
        storedData.flatMap((item: StaffData) => item.files.map((val: DocsData) => val.url)),
        "contsData",
        storedData.flatMap((item: StaffData) => item.files.map((val: DocsData) => val.files))
    )

    useEffect(() => {
        if (storedData.length < 1) return;

        let selectedOrganizer: UserType[] = []
        const selOrganizer: number[] = []

        storedData.map((item: StaffData) => {
            selOrganizer.push(item.id)
        })

        controller.map((item: UserType) => {
            if (selOrganizer.some((org: number) => org == item.id)) {
                selectedOrganizer.push(item)
            }
        })

        setSelected(selectedOrganizer)
    }, [])

    useEffect(() => {
        if (!assets) return
        if (assets.length < 1) return

        const preparedFiles = assets.map((item: File) => {
            const userData = storedData.find((content: StaffData) => content.files.find((file: DocsData) => file.files === item.name))
            if (!userData) return

            const fileType = item.name.split('_')[1]

            return { content: item, type: fileType, user_id: userData.id }
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

        const result = await PostDataTrainingStaff(formData, 6);
        if (result.success) {
            toast({
                title: "Berhasil",
                description: result.message,
                variant: "default",
                duration: 5000,
            });

            const preservedResult: StaffData[] = result.data.controller.map((item: any, index: number) => {
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

            obtainData(preservedResult)
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
        setUploadedFiles(value)
    }

    return (
        <TabsContent value="pengendali" className="w-full px-3 py-1">
            <h4 className="text-lg font-bold">Pengendali</h4>
            <div className="flex flex-col gap-3">
                <UserSelectorBuilder selectedTargets={selected} trainingTargets={controller} callback={handleTargetChange} />
                {
                    selected.length > 0 &&
                    <UserSelectedTableBuilder selected={selected} obtainValue={getFiles} storedData={uploadedFiles} />
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
