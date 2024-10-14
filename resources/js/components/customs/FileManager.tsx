import React from 'react';
import {useToast} from "@/components/ui/use-toast";
import {Upload, Download} from "lucide-react";
import {router} from '@inertiajs/react';
import type {File} from "@/lib/interfaces/fileInterface";
import type {TrainingStruct} from "@/lib/interfaces/trainingInterface.ts";

interface FileType {
    short: string;
    full: string;
}

interface FileManagerProps {
    training: TrainingStruct;
    users_id: number;
    role: string;
    fileTypes: FileType[];
}

const FileManager: React.FC<FileManagerProps> = ({training, users_id, role, fileTypes}) => {
    const {toast} = useToast();
    const files = training.files;

    const handleUpload = (fileType: FileType) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .xls, .xlsx';
        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const formData = new FormData();
                formData.append('training_id', training.id.toString());
                formData.append('users_id', users_id.toString());
                formData.append('files', file);
                formData.append('file_type', fileType.short);

                router.post(`/${role}/training`, formData, {
                    onSuccess: () => {
                        toast({
                            title: "Success",
                            description: `File ${file.name} berhasil diupload.`,
                            variant: "default",
                            duration: 5000,
                        });
                    },
                    onError: () => {
                        toast({
                            title: "Error",
                            description: `Terjadi kesalahan saat meng-upload file.`,
                            variant: "destructive",
                            duration: 5000,
                        });
                    },
                });
            }
        };
        input.click();
    };

    const handleDownload = (file: File) => {
        const link = document.createElement('a');
        link.href = `/storage/uploads/${file.file_type}/${file.files}`;
        link.setAttribute('download', `file_${file.file_type}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col py-6 gap-6 w-full">
            <p className="text-xl font-bold text-foreground">Kelola File</p>
            <div className="flex flex-col gap-6">
                {fileTypes.map((type, index) => {
                    const file = files?.find(file => file.file_type === type.short);
                    return (
                        <div key={index}
                             className="flex max-sm:flex-col max-sm:gap-2 items-center justify-between p-4 max-sm:px-2 max-sm:py-4 bg-card shadow-md rounded-lg">
                            <div>
                                <p className="font-medium text-neutral-800 text-lg">{type.short.toUpperCase()}</p>
                                <p className="text-sm text-muted-foreground">{type.full}</p>
                            </div>
                            <div className="flex gap-2">
                                {!file ? (
                                    <>
                                        {((type.short !== 'sk' && type.short !== 'st' && type.short !== 'report' && type.short !== 'spt') ||
                                            (type.short === 'spt' && role === 'facilitator')) ? (
                                            <div
                                                className="flex gap-2 rounded-full px-3 py-2 text-nowrap border transition ease-in-out duration-300 text-sm items-center cursor-pointer text-primary hover:bg-primary/10"
                                                onClick={() => handleUpload(type)}
                                            >
                                                Upload
                                                <Upload className="h-5 w-5"/>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-nowrap text-sm text-neutral-700">File Belum
                                                    tersedia</p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex max-sm:flex-col max-sm:gap-2 gap-2">
                                        <div
                                            className="flex gap-2 rounded-full text-nowrap px-3 py-2 border transition ease-in-out duration-300 text-sm items-center cursor-pointer text-primary hover:bg-primary/10"
                                            onClick={() => handleDownload(file)}
                                        >
                                            Download
                                            <Download className="h-5 w-5"/>
                                        </div>
                                        {((type.short !== 'sk' && type.short !== 'st' && type.short !== 'report' && type.short !== 'spt') ||
                                            (type.short === 'spt' && role === 'facilitator')) && (
                                            <div
                                                className="flex gap-2 rounded-full text-nowrap px-3 py-2 border transition ease-in-out duration-300 text-sm items-center cursor-pointer text-primary hover:bg-primary/10"
                                                onClick={() => handleUpload(type)}
                                            >
                                                Ganti File
                                                <Upload className="h-5 w-5"/>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FileManager;
