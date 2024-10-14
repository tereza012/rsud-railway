import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {useCallback, useEffect, useState} from "react";
import InputBuilder, {
    type FileData,
} from "@/components/customs/InputFileBuilder";
import {usePage} from "@inertiajs/react";
import axios from "axios";
import {useToast} from "@/components/ui/use-toast";

const ControllerFileBuilder = ({
                                   obtainSk,
                               }: {
    obtainSk: (sk: FileData[]) => void;
}) => {
    const [skFile, setSkFile] = useState<FileData[]>([]);

    const handleSkChange = useCallback((inputs: FileData[]) => {
        setSkFile(inputs);
        obtainSk(inputs);
    }, []);

    const obtainErr = (hasErr: boolean) => {
        console.error("Error: ", hasErr);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="w-full">
                <span className="font-semibold">SK</span>
                <InputBuilder
                    name="sk-file"
                    handler={handleSkChange}
                    file_type={["sk"]}
                    getErr={obtainErr}
                    content={skFile}
                />
            </div>
        </div>
    );
};

const FacilitatorFileBuilder = ({
                                    obtainBankAccount,
                                    obtainNpwp,
                                }: {
    obtainBankAccount: (bankAccount: FileData[]) => void;
    obtainNpwp: (npwp: FileData[]) => void;
}) => {
    const [bankAccount, setBankAccount] = useState<FileData[]>([]);
    const [npwp, setNpwp] = useState<FileData[]>([]);

    const handleBankAccountChange = useCallback((inputs: FileData[]) => {
        setBankAccount(inputs);
        obtainBankAccount(inputs);
    }, []);

    const handleNpwpChange = useCallback((inputs: FileData[]) => {
        setNpwp(inputs);
        obtainNpwp(inputs);
    }, []);

    const obtainErr = (hasErr: boolean) => {
        console.error("Error: ", hasErr);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="w-full">
                <span className="font-semibold">Rekening Bank</span>
                <InputBuilder
                    name="bank-account"
                    handler={handleBankAccountChange}
                    file_type={["rekening"]}
                    getErr={obtainErr}
                    content={bankAccount}
                />
            </div>
            <div className="w-full">
                <span className="font-semibold">NPWP</span>
                <InputBuilder
                    name="npwp"
                    handler={handleNpwpChange}
                    file_type={["npwp"]}
                    getErr={obtainErr}
                    content={npwp}
                />
            </div>
        </div>
    );
};

const OrganizerFileBuilder = ({
                                  obtainSk,
                              }: {
    obtainSk: (sk: FileData[]) => void;
}) => {
    const [skFile, setSkFile] = useState<FileData[]>([]);

    const handleSkChange = useCallback((inputs: FileData[]) => {
        setSkFile(inputs);
        obtainSk(inputs);
    }, []);

    const obtainErr = (hasErr: boolean) => {
        console.error("Error: ", hasErr);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="w-full">
                <span className="font-semibold">SK</span>
                <InputBuilder
                    name="sk-file"
                    handler={handleSkChange}
                    file_type={["sk"]}
                    getErr={obtainErr}
                    content={skFile}
                />
            </div>
        </div>
    );
};

export default function UsersDocs({
                                      dialogClose,
                                      isOpen,
                                  }: {
    dialogClose: (status: boolean) => void;
    isOpen: boolean;
}) {
    const {toast} = useToast();
    const props = usePage().props;
    // @ts-ignore
    const {role} = props.user; // NOTE: You Know why that @ts-ignore is there

    let certificateLabel = "";
    if (role === "controller") certificateLabel = "Pengendali Pelatihan";

    if (role === "user") certificateLabel = "Pelatihan";

    const [isDialogUp, setIsDialogUp] = useState(isOpen);

    const [cvFile, setCvFile] = useState<FileData[]>([]);
    const [diplomaFile, setDiplomaFile] = useState<FileData[]>([]);
    const [certificateFile, setCertificateFile] = useState<FileData[]>([]);
    const [skFile, setSkFile] = useState<FileData[]>([]);
    const [bankAccount, setBankAccount] = useState<FileData[]>([]);
    const [npwp, setNpwp] = useState<FileData[]>([]);

    const handleCvChange = useCallback((inputs: FileData[]) => {
        setCvFile(inputs);
    }, []);

    const handleSkChange = useCallback((inputs: FileData[]) => {
        setSkFile(inputs);
    }, []);

    const handleDiplomaChange = useCallback((inputs: FileData[]) => {
        setDiplomaFile(inputs);
    }, []);

    const handleCertificateChange = useCallback((inputs: FileData[]) => {
        setCertificateFile(inputs);
    }, []);

    const obtainErr = (hasErr: boolean) => {
        console.error("Error: ", hasErr);
    };

    const dialogCloseUp = (isOpen: boolean) => {
        if (isOpen) {
            setIsDialogUp(isOpen);
            dialogClose(isOpen);
            window.location.reload();
        }
    };

    const handleBankAccountChange = useCallback((inputs: FileData[]) => {
        setBankAccount(inputs);
    }, []);

    const handleNpwpChange = useCallback((inputs: FileData[]) => {
        setNpwp(inputs);
    }, []);

    useEffect(() => {
    }, []);

    const handleSend = async () => {
        let preparedData: FileData[] = [...cvFile, ...diplomaFile];

        switch (role) {
            case "facilitator":
                preparedData = [...preparedData, ...bankAccount];
                preparedData = [...preparedData, ...npwp];
                break;
            case "controller":
                preparedData = [...preparedData, ...skFile, ...certificateFile];
                break;
            case "organizer":
                preparedData = [...preparedData, ...skFile, ...certificateFile];
                break;
            default:
                preparedData = [...preparedData, ...certificateFile];
                break;
        }

        console.log(preparedData);

        const formData = new FormData();

        preparedData.forEach((fileData, index) => {
            formData.append(`files[${index}]`, fileData.content);
            formData.append(`file_type[${index}]`, fileData.type);
        });

        try {
            const response = await axios.post("/api/user/docs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const result = response.data;
            console.log(result);

            if (result.success)
                toast({
                    title: "Dokumen berhasil dikirim",
                    description: result.message,
                    duration: 5000,
                })
            else
                toast({
                    title: "Dokumen gagal dikirim",
                    description: result.message,
                    duration: 5000,
                })

            dialogCloseUp(true)

        } catch (error) {
            if (error.response) {
                // Log the exact validation errors from the server response
                console.log('Error posting data:', error.response.data); // This should give you more info on why the request fails
            } else {
                console.log('Error:', error.message);
            }
        }

    };

    return (
        <Dialog open={isDialogUp} onOpenChange={dialogCloseUp}>
            <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden rounded">
                <DialogHeader>
                    <DialogTitle>Dokumen</DialogTitle>
                    <DialogDescription>
                        Lengkapi dokumen berikut:
                    </DialogDescription>
                </DialogHeader>
                <div
                    className="flex flex-col items-center space-x-2 gap-2 h-[70vh] px-2 overflow-y-scroll overflow-x-hidden">
                    <div className="w-full">
                        <span className="font-semibold">CV</span>
                        <InputBuilder
                            name="cv-file"
                            handler={handleCvChange}
                            file_type={["cv"]}
                            getErr={obtainErr}
                            isRepeater={false}
                            content={cvFile}
                        />
                    </div>
                    <div className="w-full">
                        <span className="font-semibold">Ijazah</span>
                        <InputBuilder
                            name="diploma-file"
                            handler={handleDiplomaChange}
                            file_type={["ijazah"]}
                            getErr={obtainErr}
                            content={diplomaFile}
                        />
                    </div>
                    {role !== "facilitator" && (
                        <div className="w-full">
                            <span className="font-semibold">
                                Sertifikat {certificateLabel}
                            </span>
                            <InputBuilder
                                name="certificate-file"
                                handler={handleCertificateChange}
                                file_type={["sertifikat"]}
                                getErr={obtainErr}
                                content={certificateFile}
                            />
                        </div>
                    )}
                    {role === "organizer" && (
                        <OrganizerFileBuilder obtainSk={handleSkChange}/>
                    )}
                    {role === "facilitator" && (
                        <FacilitatorFileBuilder
                            obtainBankAccount={handleBankAccountChange}
                            obtainNpwp={handleNpwpChange}
                        />
                    )}
                    {role === "controller" && (
                        <ControllerFileBuilder obtainSk={handleSkChange}/>
                    )}
                </div>
                <DialogFooter className="mb-5 gap-2">
                    <Button
                        type="button"
                        variant="default"
                        className="w-1/2 max-md:w-full"
                        onClick={handleSend}
                    >
                        Kirim
                    </Button>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="destructive"
                            className="w-1/2 max-md:w-full"
                            onClick={() => dialogCloseUp(true)}
                        >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
