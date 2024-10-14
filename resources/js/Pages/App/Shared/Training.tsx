import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {router, usePage} from "@inertiajs/react";
import type {TrainingStruct} from "@/lib/interfaces/trainingInterface";
import {format, parseISO} from 'date-fns';
import {id} from "date-fns/locale";
import Pagination from "@/components/customs/Pagination.tsx";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {z} from "zod";
import {useForm} from "@felte/react";

interface TableBuilderProps {
    trainings: TrainingStruct[];
    user: any;
    currentPage: number;
    lastPage: number;
    total: number;
    onPageChange: (page: number) => void;
}

export const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "d MMMM yyyy", {locale: id});
};

export const formatDateRange = (startDate: string, endDate: string) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

const TableBuilder: React.FC<TableBuilderProps> = (
    {
        trainings,
        user,
        currentPage,
        lastPage,
        total,
        onPageChange
    }) => {
    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };

    return (
        <div className="flex flex-col gap-2 overflow-auto w-full">
            <Table>
                <TableHeader className="bg-neutral-200">
                    <TableRow>
                        <TableHead className="w-[5%] text-center text-neutral-800 rounded-tl-lg">No</TableHead>
                        <TableHead className="w-[10%] text-neutral-800">Nama Pelatihan</TableHead>
                        <TableHead className="w-[10%] text-neutral-800">Jenis Pelatihan</TableHead>
                        <TableHead className="w-[30%] text-neutral-800">Tujuan</TableHead>
                        <TableHead className="w-[8%] text-center text-neutral-800">Kapasitas</TableHead>
                        <TableHead className="w-[25%] text-neutral-800">Periode Pelatihan</TableHead>
                        <TableHead className="w-[10%] text-neutral-800 rounded-tr-lg">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trainings.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center font-semibold text-neutral-700">
                                Data Pelatihan tidak ada
                            </TableCell>
                        </TableRow>
                    ) : (
                        trainings.map((training, index) => (
                            <TableRow className="font-medium" key={training.id}>
                                <TableCell className="text-center">{(currentPage - 1) * 10 + index + 1}</TableCell>
                                <TableCell className="truncate max-w-[10vw]" title={training.name}>
                                    {training.name}
                                </TableCell>
                                <TableCell className="break-words">{training.type}</TableCell>
                                <TableCell className="break-words" title={training.purpose}>
                                    {truncateText(training.purpose, 15)}
                                </TableCell>
                                <TableCell className="text-center">{training.capacity}</TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {formatDateRange(training.training_start, training.training_end)}
                                </TableCell>
                                <TableCell>
                                    <a href={`/${user.role}/training/${training.id}`}
                                       className="text-sm text-blue-500 px-4 py-3 bg-neutral-100 rounded-full hover:brightness-95 transition ease-in-out duration-300">
                                        Detail
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                total={total}
                onPageChange={onPageChange}
            />
        </div>
    );
}

const Training: React.FC = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const {
        trainings,
        currentPage,
        lastPage,
        total,
        user,
        search,
        startDate: initialStartDate,
        endDate: initialEndDate,
    } = usePage().props;
    const {toast} = useToast();

    let errors: string = '';

    useEffect(() => {
        // @ts-ignore
        setSearchTerm(search || '');
        // @ts-ignore
        setStartDate(initialStartDate || '');
        // @ts-ignore
        setEndDate(initialEndDate || '');
    }, [search, initialStartDate, initialEndDate]);

    const handlePageChange = (page: number) => {
        setScrollPosition(window.scrollY);
        // @ts-ignore
        if (page > 0 && page <= lastPage) {
            // @ts-ignore
            router.get(`/${user.role}/training`, {page, search: searchTerm, startDate, endDate}, {
                preserveState: true,
                replace: true
            });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(endDate)

        if (startDate > endDate && endDate && startDate) {
            errors = `Tanggal mulai (${startDate}) tidak boleh lebih besar dari tanggal selesai (${endDate})`;
        } else if (endDate < startDate && endDate && startDate) {
            errors = `Tanggal selesai (${endDate}) tidak boleh lebih kecil dari tanggal mulai (${startDate})`;
        }

        if (errors !== '') {
            toast({
                title: "Gagal memfilter data",
                description: errors,
                variant: "destructive",
                duration: 5000,
            });

        } else {
            // @ts-ignore
            router.get(`/${user.role}/training`, {page: 1, search: searchTerm, startDate, endDate}, {
                preserveState: true,
                replace: true
            });
        }
    };

    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [trainings]);

    return (
        <div className="px-10">
            <Card className="w-full my-8 py-4">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold px-4">
                        Pelatihan
                    </CardTitle>
                    <div className="flex justify-between gap-4 max-lg:flex-col max-lg:gap-5">
                        <CardDescription className="px-4">
                            Lihat histori pelatihan yang telah anda ikuti.
                        </CardDescription>
                        <form onSubmit={handleSearch}
                              className="flex items-start max-lg:px-4 justify-end space-x-2 max-lg:space-x-0 mb-4 max-lg:flex-col max-lg:gap-3">
                            <div
                                className="flex items-center space-x-2 max-lg:space-x-0 max-lg:space-y-2 max-lg:flex-col max-lg:justify-start">
                                <Label className="text-sm whitespace-nowrap max-lg:self-start">Mulai:</Label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                                    className="w-fit self-start"
                                />
                            </div>
                            <div
                                className="flex items-center space-x-2 max-lg:space-x-0 max-lg:space-y-2 max-lg:flex-col max-lg:justify-start">
                                <Label className="text-sm whitespace-nowrap max-lg:self-start">Sampai:</Label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                                    className="w-fit"
                                />
                            </div>
                            <div
                                className="flex max-sm:flex-col max-sm:gap-2 items-center space-x-2 max-lg:justify-start">
                                <Input
                                    type="text"
                                    placeholder="Cari pelatihan... "
                                    value={searchTerm}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                    className="w-fit"
                                />
                                <Button type="submit" className="max-sm:self-start">Filter</Button>
                            </div>
                        </form>
                    </div>
                </CardHeader>
                <CardContent>
                    <section className="flex flex-col w-full">
                        <TableBuilder
                            trainings={trainings as TrainingStruct[]}
                            user={user}
                            currentPage={currentPage as number}
                            lastPage={lastPage as number}
                            total={total as number}
                            onPageChange={handlePageChange}
                        />
                    </section>
                </CardContent>
            </Card>
        </div>
    );
};

export default Training;
