import ReactBigCalendar, { type Lecture } from "@/components/customs/CalendarForm";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

interface Schedule {
    desc_schedule: string
    end_at: number
    id?: number
    materi_name: string
    start_at: number
}

const PostData = async (data: any, id: number) => {
    const res = await axios.post(`/admin/training/${id}/phase2`, data);
    return res.data;
}

const preparePreload = (scheduleData: Schedule[]) => {
    const prepareData: Lecture[] = scheduleData.map((item: any) => ({
        title: item.materi_name,
        description: item.desc_schedule,
        start: new Date(item.start_at),
        end: new Date(item.end_at),
    }));

    return prepareData;
}

export default function ScheduleTab({
    NextButton,
    PrevButton,
    trainingPeriod,
    scheduleData,
    trainingId,
}: {
    NextButton: () => void;
    PrevButton: () => void;
    trainingPeriod: DateRange | undefined;
    scheduleData: Schedule[];
    trainingId: number;
}) {
    const [preloaded, setPreloaded] = useState<Schedule[]>(scheduleData || []);
    const [formData, setFormData] = useState<Schedule[]>(scheduleData || [])
    const [trainingSchedule, setTrainingSchedule] = useState<Lecture[]>(preparePreload(scheduleData) || []);
    const [trainingPeriodState,] = useState<
        DateRange | undefined
    >(trainingPeriod || { from: new Date(), to: addDays(new Date(), 2) });

    const { toast } = useToast();
    const csrf = usePage().props.csrf_token;

    const prepareData = (data: Lecture[], preload: Schedule[]) => {
        const filteredPreloaded = preload
            .filter((item: Schedule) =>
                !data.some((subItem: Lecture) =>
                    new Date(item.start_at) === subItem.start
                    && new Date(item.end_at) === subItem.end
                    && item.desc_schedule === subItem.description
                )
            );
        const filteredData = data.filter((item: Lecture) =>
            !filteredPreloaded.some((subItem: Schedule) =>
                new Date(subItem.start_at) === item.start
                && new Date(subItem.end_at) === item.end
                && item.description === subItem.desc_schedule
            ));

        const preparedData: Schedule[] = [...filteredPreloaded];
        filteredData.map((item: Lecture) => {
            preparedData.push({
                start_at: item.start.getTime(),
                end_at: item.end.getTime(),
                desc_schedule: item.description || "",
                materi_name: item.title,
            });
        });

        return preparedData
    }

    const handleSchedule = (schedules: Lecture[]) => {
        console.log(schedules)
        const prepared = prepareData(schedules, preloaded);

        setTrainingSchedule(schedules);
        setFormData(prepared);
    };

    const handleNext = async () => {
        const preparedBody = {
            _token: csrf,
            _method: 'PUT',
            schedule_content: formData,
        };

        const result = await PostData(preparedBody, trainingId);
        if (result.success) {
            toast({
                title: "Berhasil",
                description: result.message,
                variant: "default",
                duration: 5000,
            });

            NextButton();
        } else {
            toast({
                title: "Gagal",
                description: result.message,
                variant: "destructive",
                duration: 5000,
            });
        }
    };

    //useEffect(() => {
    //    if (scheduleData.length > 0) {
    //        const prepareData: Lecture[] = scheduleData.map((item: any) => ({
    //            title: item.materi_name,
    //            description: item.desc_schedule,
    //            start: new Date(item.start_at),
    //            end: new Date(item.end_at),
    //        }));
    //
    //        setTrainingSchedule(prepareData);
    //    }
    //}, [scheduleData]);

    return (
        <TabsContent value="materi" className="w-full px-3 py-1">
            <h4 className="text-lg font-bold">Jadwal dan Materi</h4>
            <span className="text-sm font-bold">
                {(trainingPeriodState?.from?.toLocaleString().split(' ')[0])?.replaceAll('-', '/')} -{" "}
                {(trainingPeriodState?.to?.toLocaleString().split(' ')[0])?.replaceAll('-', '/')}
            </span>
            <div className="flex flex-col gap-3">
                <div className="grid max-md:grid-cols-1 grid-cols-2 gap-4 py-2">
                    <div className="col-span-full">
                        {trainingPeriodState &&
                            trainingPeriodState.from &&
                            trainingPeriodState.to ? (
                            <ReactBigCalendar
                                minDate={trainingPeriodState?.from}
                                maxDate={trainingPeriodState?.to}
                                obtainSchedule={handleSchedule}
                                stores={trainingSchedule}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="col-span-full flex justify-between">
                        <Button
                            type="button"
                            className="w-fit justify-start text-left font-normal bg-slate-500 text-white"
                            onClick={() => PrevButton()}
                        >
                            &lt; Kembali
                        </Button>

                        <Button
                            type="button"
                            className="w-fit justify-start text-left font-normal bg-slate-500 text-white"
                            onClick={handleNext}
                        >
                            Lanjutkan &gt;
                        </Button>
                    </div>
                </div>
            </div>
        </TabsContent>
    );
}
