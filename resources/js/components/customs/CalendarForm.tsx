import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useToast } from "@/components/ui/use-toast";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

moment.locale("id-ID");
const localizer = momentLocalizer(moment);

export interface Lecture {
    title: string;
    description?: string;
    start: Date;
    end: Date;
}

const events: Lecture[] = [];

const DialogBuilder = ({
    obtainValue,
    openState,
    onClose,
    start,
    end,
}: {
    obtainValue: (data: any) => void;
    openState: boolean;
    onClose: () => void;
    start: Date;
    end: Date;
}) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const [open, setOpen] = useState(openState);
    const [formdata, setFormdata] = useState<{ title: string; desc: string }>({
        title: "",
        desc: "",
    });
    const [formError, setFormError] = useState({
        title: formdata.title.length < 1 ? "Masukkan nama materi" : null,
        desc: formdata.desc.length < 1 ? "Masukkan deskripsi materi" : null,
    });

    const startDate = format(start, "yyyy-MM-dd");
    const startTime = format(start, "HH:mm");
    const endDate = format(end, "yyyy-MM-dd");
    const endTime = format(end, "HH:mm");

    const handleClose = (event: any) => {
        onClose();
        setOpen(false);
    };

    const handleError = (error: any) => {
        setFormError({
            ...formError,
            [error.target.id]:
                formdata[error.target.id].length < 1
                    ? `${error.target.id} tidak boleh kosong`
                    : null,
        });
    };

    const handleChange = (event: any) => {
        setFormdata({
            ...formdata,
            [event.target.id]: event.target.value,
        });
        handleError(event);
    };

    const handleSubmit = () => {
        if (formError.title || formError.desc) return;

        obtainValue(formdata);
        setOpen(false);
        onClose();
    };

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="w-1/2">
                    <DialogHeader>
                        <DialogTitle>Materi</DialogTitle>
                        <DrawerDescription className="grid grid-cols-6">
                            <span className="col-span-full text-left">Tentukan Materi pada</span>
                            <span className="text-sm flex gap-4 col-span-3">
                                <span className="flex flex-col items-center">
                                    <span>{startDate}</span>
                                    <span>{startTime}</span>
                                </span>
                                <span>-</span>
                                <span className="flex flex-col items-center col-span-3">
                                    <span>{endDate}</span>
                                    <span>{endTime}</span>
                                </span>
                            </span>
                        </DrawerDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Nama Materi
                            </Label>
                            <Input
                                id="title"
                                value={formdata.title}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                            <span className="text-sm w-full text-red-500 col-span-full text-end">
                                {formError.title}
                            </span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="desc" className="text-right">
                                Deskripsi
                            </Label>
                            <Textarea
                                id="desc"
                                value={formdata.desc}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                            <span className="text-sm w-full text-red-500 col-span-full text-end">
                                {formError.desc}
                            </span>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="default"
                            className="text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-300"
                            onClick={handleSubmit}
                        >
                            Simpan
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="destructive">
                                Batalkan
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={handleClose}>
            <DrawerContent className="">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Materi</DrawerTitle>
                    <DrawerDescription className="grid grid-cols-6">
                        <span className="col-span-full text-left">Tentukan Materi pada</span>
                        <span className="text-sm flex gap-4 col-span-3">
                            <span className="flex flex-col items-center">
                                <span>{startDate}</span>
                                <span>{startTime}</span>
                            </span>
                            <span>-</span>
                            <span className="flex flex-col items-center col-span-3">
                                <span>{endDate}</span>
                                <span>{endTime}</span>
                            </span>
                        </span>
                    </DrawerDescription>
                </DrawerHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="title"
                            className="text-right col-span-1"
                        >
                            Nama Materi
                        </Label>
                        <Input
                            id="title"
                            value={formdata.title}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                        <span className="text-sm w-full text-red-500 col-span-full text-center">
                            {formError.title}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Deskripsi
                        </Label>
                        <Textarea
                            id="desc"
                            value={formdata.desc}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                        <span className="text-sm w-full text-red-500 col-span-full text-center">
                            {formError.desc}
                        </span>
                    </div>
                </div>
                <DrawerFooter className="pt-2">
                    <Button
                        variant="default"
                        className="text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-300"
                        onClick={handleSubmit}
                    >
                        Simpan
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="destructive">Batalkan</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default function ReactBigCalendar({
    minDate,
    maxDate,
    obtainSchedule,
    stores,
}: {
    minDate: Date;
    maxDate: Date;
    obtainSchedule: (schedules: Lecture[]) => void;
    stores: Lecture[];
}) {
    const [eventsData, setEventsData] = useState(events);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [removeData, setRemoveData] = useState<Lecture | null>(null);

    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>(new Date());
    const { toast } = useToast();

    useEffect(() => {
        if (stores.length > 0) {
            setEventsData(stores);
        }
    }, [stores]);

    useEffect(() => {
        if (stores.length > 0) {
            setEventsData(stores);
        }
    }, []);

    const handleDialogValue = ({
        title,
        desc,
    }: {
        title: string;
        desc: string;
    }) => {
        const schedule = {
            title: title,
            description: desc,
            start: start,
            end: end,
        };
        setEventsData([...eventsData, schedule]);

        const eventArray = [...eventsData, schedule];
        obtainSchedule(eventArray);
    };

    // const handleSelect = ({ start, end }: { start: Date, end: Date }) => {
    const handleSelect = (props: any) => {
        const { start, end } = props;
        setStart(start);
        setEnd(end);

        if (start < minDate || start > maxDate) {
            toast({
                title: "Peringatan",
                description:
                    "Waktu dimulai tidak boleh kurang dari waktu pelatihan berjalan",
                variant: "destructive",
                duration: 2000,
            });
            return;
        }

        if (end > maxDate) {
            toast({
                title: "Peringatan",
                description:
                    "Waktu berakhir tidak boleh lebih dari waktu pelatihan berjalan",
                variant: "destructive",
                duration: 2000,
            });
            return;
        }

        if (dialogOpen) setDialogOpen(false);

        setDialogOpen(true);
    };

    const handleRemove = (data: Lecture) => {
        if (!data) return;

        setRemoveData(data);
        setRemoveDialogOpen(true);
    };

    const handleDialogRemove = () => {
        setEventsData(eventsData.filter((event) => event !== removeData));
        setRemoveData(null);
        setRemoveDialogOpen(false);

        const eventArray = eventsData.filter((event) => event !== removeData);
        obtainSchedule(eventArray);
    };

    const DestructiveDialogBuilder = ({
        remove,
        openState,
    }: {
        remove: () => void;
        openState: boolean;
    }) => {
        const [open, setOpen] = useState(openState);

        const handleClose = () => {
            setOpen(false);
        };

        const handleSubmit = () => {
            remove();
            setOpen(false);
        };

        return (
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="w-1/2">
                    <DialogHeader>
                        <DialogTitle>Hapus Materi</DialogTitle>
                        <DialogDescription>
                            Apakah anda yakin ingin menghapus Materi ini?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleSubmit}
                        >
                            Yakin
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <>
            {dialogOpen && (
                <DialogBuilder
                    obtainValue={handleDialogValue}
                    openState={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    start={start}
                    end={end}
                />
            )}
            {removeDialogOpen && (
                <DestructiveDialogBuilder
                    remove={handleDialogRemove}
                    openState={removeDialogOpen}
                />
            )}

            <div className="dark:bg-slate-700 dark:text-white">
                <Calendar
                    views={["day", "agenda", "work_week", "month"]}
                    selectable
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={eventsData}
                    style={{ height: "100vh" }}
                    onSelectEvent={handleRemove}
                    onSelectSlot={handleSelect}
                />
            </div>
        </>
    );
}
