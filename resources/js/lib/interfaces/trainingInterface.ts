import type {File} from "@/lib/interfaces/fileInterface.ts";

interface TrainingStruct {
    files?: File[];
    batch: number;
    capacity: number;
    cost: string;
    cp: string;
    created_at: string;
    description: string;
    id: number;
    is_accept: number;
    jpl: number;
    name: string;
    purpose: string;
    signup_end: string;
    signup_start: string;
    skp: number;
    training_end: string;
    training_start: string;
    type: string;
    updated_at: string;
    whatsapp_link: string;
}

export type {TrainingStruct};
