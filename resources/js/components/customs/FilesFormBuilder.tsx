import React, {type FC, useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Download, Plus, Trash2, Upload} from 'lucide-react';
import {Input} from '@/components/ui/input.tsx';
import {fileTypeConfig, FileTypeEnum} from "@/lib/enum/FileTypeEnum.ts";
import type {File, FilesFormBuilderProps} from "@/lib/interfaces/fileInterface.ts";
import {router} from "@inertiajs/react";
import {Document, Page} from "react-pdf";


const FilesFormBuilder: FC<FilesFormBuilderProps> = ({role, existingFiles, onFilesChange, props}) => {
    const [files, setFiles] = useState<File[]>(existingFiles);
    const errors = props.errors;

    const handleSubmit = () => {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`files[${index}]`, file.files);
            formData.append(`file_type[${index}]`, file.file_type);
        });
        formData.append('_token', props.csrf_token);
        formData.append('_method', 'PUT');

        console.log('Submitting form data:', formData);
        router.post(`/${role}/profile/${props.user.id}`, formData);
    }


    useEffect(() => {
        onFilesChange(files);
        console.log(files);
    }, [files, onFilesChange]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, id: string, type: FileTypeEnum) => {
        const newFile = event.target.files?.[0];
        if (newFile) {
            setFiles(prevFiles => prevFiles.map(file =>
                file.id === id ? {...file, files: newFile} : file
            ));
        }
    };

    const removeFile = (id: string, type: FileTypeEnum) => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
    };

    const addFileInput = (file_type: FileTypeEnum) => {
        const config = fileTypeConfig[role].find(c => c.type === file_type);
        if (config) {
            const currentCount = files.filter(f => f.file_type === file_type).length;
            if (currentCount < config.max) {
                setFiles([...files, {id: Math.random().toString(36).substr(2, 9), files: '', file_type}]);
            }
        }
    };


    const renderFileInput = ({id, files, file_type}: File, type: FileTypeEnum) => {
        const isExistingFile = typeof files === 'string';

        const handleDownload = () => {
            const link = document.createElement('a');
            link.href = `/storage/uploads/${file_type}/${files}`;
            link.setAttribute('download', `file_${file_type}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        return (
            <div key={id} className="flex gap-2 items-center w-full">
                {isExistingFile && files != "" ? (
                    <>
                        <Input
                            type="text"
                            name={`files[${id}]`}
                            value={files.split('_').pop() || ''}
                            readOnly
                            className="flex-grow"
                        />
                        {/*<div className="w-full flex justify-center max-h-[52vh] overflow-scroll">*/}
                        {/*// TODO COMPLETE THIS*/}

                        {/*<Document*/}
                        {/*    file={`/storage/uploads/${file_type}/${files}`}*/}
                        {/*    className="mt-2 h-full w-full"*/}
                        {/*>*/}
                        {/*    <Page*/}
                        {/*        pageNumber={4}*/}
                        {/*        renderTextLayer={false}*/}
                        {/*        renderAnnotationLayer={false}*/}
                        {/*        className="h-full overflow-hidden rounded shadow-slate-300 shadow-xl"*/}
                        {/*    />*/}
                        {/*</Document>*/}
                        {/*</div>*/}
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => document.getElementById(`file-${id}`)?.click()}
                        >
                            <Download className="h-4 w-4" onClick={handleDownload}/>
                        </Button>
                    </>
                ) : (
                    <input
                        type="file"
                        accept="application/pdf"
                        name="files[]"
                        id={`file-${id}`}
                        onChange={(e) => handleFileChange(e, id, type)}
                        className="mt-1 block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                    />
                )}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(id, type)}
                >
                    <Trash2 className="h-4 w-4"/>
                </Button>
                <input type="text" value={type} name="file_type[]" readOnly hidden/>
            </div>
        );
    };

    return (
        <div>
            {fileTypeConfig[role].map(({type, max}) => {
                const filesOfType = files.filter(file => file.file_type === type);
                const showAddButton = filesOfType.length < max;

                return (
                    <div key={type} className="flex flex-col gap-2 mb-4">
                        <Label htmlFor={`file-${type}`}>{type.toUpperCase()}</Label>
                        {filesOfType.map((file) => renderFileInput(file, type))}
                        {showAddButton && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addFileInput(type)}
                                className="mt-2"
                            >
                                <Plus className="h-4 w-4 mr-2"/> Add {type.toUpperCase()}
                            </Button>
                        )}
                    </div>
                );
            })}
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </div>
    );
};

export default FilesFormBuilder;
