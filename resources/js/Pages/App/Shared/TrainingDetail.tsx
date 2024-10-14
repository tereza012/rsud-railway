import React from 'react';
import {Link, router, usePage} from "@inertiajs/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {TrainingStruct} from "@/lib/interfaces/trainingInterface";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {formatDateRange} from "@/Pages/App/Shared/Training.tsx";
import FileManager from "@/components/customs/FileManager.tsx";
import {Button} from "@/components/ui/button.tsx";

interface ActionProps {
    training: TrainingStruct;
    users_id: number;
    role: string;
    fileTypes: FileType[];
}

interface FileType {
    short: string;
    full: string;
}

const TrainingBuilder = ({training}: { training: TrainingStruct }) => {
    return (
        <div className="flex w-full max-md:flex-col max-md:gap-4 gap-10">
            {/* Kolom Kiri */}
            <div className="flex flex-col gap-2 w-full max-md:w-[100%]">
                {[
                    {id: 'name', label: 'Nama Pelatihan', value: training.name},
                    {id: 'capacity', label: 'Kapasitas', value: training.capacity},
                    {id: 'purpose', label: 'Tujuan', value: training.purpose, isTextarea: true},
                ].map(({id, label, value, isTextarea}) => (
                    <div className="flex flex-col gap-2 w-full" key={id}>
                        <Label htmlFor={id} className="font-semibold text-neutral-800 pt-4">{label}</Label>
                        {isTextarea ? (
                            <Textarea name={id} id={id} defaultValue={value} readOnly={true}/>
                        ) : (
                            <Input type="text" name={id} id={id} defaultValue={value} readOnly={true}/>
                        )}
                    </div>
                ))}
            </div>
            {/* Kolom Kanan */}
            <div className="flex flex-col gap-2 w-full max-md:w-[100%]">
                {[
                    {id: 'type', label: 'Jenis Pelatihan', value: training.type},
                    {
                        id: 'time',
                        label: 'Periode Pelatihan',
                        value: formatDateRange(training.training_start, training.training_end)
                    },
                ].map(({id, label, value}) => (
                    <div className="flex flex-col gap-2 w-full" key={id}>
                        <Label htmlFor={id} className="font-semibold text-neutral-800 pt-4">{label}</Label>
                        <Input type="text" name={id} id={id} defaultValue={value} readOnly={true}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SurveyLink = ({id}: { id: number }) => {
    const {survey, user} = usePage().props as any;

    return (
        <section className="flex flex-col gap-8">
            <div className="space-y-1">
                <p className="text-xl font-semibold">Isi Survey Kepemimpinan</p>
                <p className="text-sm text-neutral-500">Isi Survey untuk memberikan penilaian</p>
            </div>
            {!survey ? (
                <Link href={`/${user.role}/training/survey/${id}`}>
                    <Button>Isi Survey</Button>
                </Link>
            ) : (
                <Button disabled className="w-fit">Survey sudah diisi</Button>
            )}
        </section>
    );
}


const ActionComponent: React.FC<ActionProps> = ({training, users_id, role, fileTypes}) => {
    return (
        <section className="flex max-lg:flex-col justify-between gap-8 border-t py-8 px-4 max-sm:px-1">
            <div className="flex flex-col w-full space-y-10">
                <TrainingBuilder training={training}/>
                {(role === 'facilitator' || role === 'organizer') && <SurveyLink id={training.id}/>}
            </div>
            <FileManager training={training} users_id={users_id} role={role} fileTypes={fileTypes}/>
        </section>
    );
};

const TrainingDetail: React.FC = () => {
    const {user, training} = usePage().props as unknown as { user: any, training: TrainingStruct };

    const roleFileTypes: Record<string, FileType[]> = {
        facilitator: [
            {short: 'tpk', full: 'Tim Pelaksana Kegiatan'},
            {short: 'tot', full: 'Training of Trainers'},
            {short: 'spt', full: 'Surat Perintah Tugas'},
            {short: 'sk', full: 'Surat Keputusan'},
            {short: 'st', full: 'Surat Tugas'},
        ],
        controller: [
            {short: 'spt', full: 'Surat Perintah Tugas'},
            {short: 'sk', full: 'Surat Keputusan'},
            {short: 'score', full: 'Nilai sikap dan keaktifan pada peserta'}
        ],
        organizer: [
            {short: 'spt', full: 'Surat Perintah Tugas'},
            {short: 'sk', full: 'Surat Keputusan'},
            {short: 'report', full: 'Laporan Pelaksanaan'},

        ],
    };

    return (
        <div className="px-10">
            <Card className="w-full my-8 py-4">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold px-4">Detail Pelatihan</CardTitle>
                    <CardDescription className="px-4">Upload Berkas dan unduh berkas yang diperlukan untuk
                        pelatihan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ActionComponent
                        fileTypes={roleFileTypes[user.role]}
                        role={user.role}
                        users_id={user.id}
                        training={training as TrainingStruct}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default TrainingDetail;
