import {FileTypeEnum} from "@/lib/enum/FileTypeEnum.ts";

interface File {
    id: string;
    users_id?: number;
    training_id?: number;
    files: any;
    file_type: FileTypeEnum;
}

interface FilesFormBuilderProps {
    role: 'organizer' | 'controller' | 'facilitator' | 'user';
    existingFiles: File[];
    onFilesChange: (files: File[]) => void;
    props: any;
}

export type {File, FilesFormBuilderProps};
