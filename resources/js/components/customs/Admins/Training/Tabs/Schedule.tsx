import ReactBigCalendar, { type Lecture } from "@/components/customs/CalendarForm";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

const PostData = async (data: any) => {
    const res = await axios.post("/api/admin/training/phase2", data);
    return res.data;
}

export default function ScheduleTab({
    NextButton,
    PrevButton,
    trainingPeriod,
    obtainData,
    scheduleData,
}: {
    NextButton: () => void;
    PrevButton: () => void;
    trainingPeriod: DateRange | undefined;
    obtainData: (data: any[]) => void;
    scheduleData: any[];
}) {
    const [trainingSchedule, setTrainingSchedule] = useState<Lecture[]>([]);
    const [trainingPeriodState, setTrainingPeriod] = useState<
        DateRange | undefined
    >({
        from: trainingPeriod?.from,
        to: trainingPeriod?.to,
    });

    const { toast } = useToast();
    const csrf = usePage().props.csrf_token;

    const handleSchedule = (schedules: Lecture[]) => {
        setTrainingSchedule(schedules);
        console.log("SCHEDULE DATA", schedules);
    };

    const handleNext = async () => {
        const newBody =
            trainingSchedule.map((item: Lecture) => ({
                materi_name: item.title,
                desc_schedule: item.description,
                start_at: format(item.start, "yyyy-MM-dd HH:mm:ss"),
                end_at: format(item.end, "yyyy-MM-dd HH:mm:ss"),
            }))

        const preparedBody = {
            _token: csrf,
            schedule_content: newBody,
        };

        const result = await PostData(preparedBody);
        if (result.success) {
            toast({
                title: "Berhasil",
                description: result.message,
                variant: "default",
                duration: 5000,
            });

            obtainData(newBody);
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

    useEffect(() => {
        setTrainingPeriod(trainingPeriod);

        if (scheduleData.length > 0) {
            const prepareData: Lecture[] = scheduleData.map((item: any) => ({
                title: item.materi_name,
                description: item.desc_schedule,
                start: new Date(item.start_at),
                end: new Date(item.end_at),
            }));

            setTrainingSchedule(prepareData);
        }
    }, []);

    useEffect(() => {
        if (scheduleData.length > 0) {
            const prepareData: Lecture[] = scheduleData.map((item: any) => ({
                title: item.materi_name,
                description: item.desc_schedule,
                start: new Date(item.start_at),
                end: new Date(item.end_at),
            }));

            setTrainingSchedule(prepareData);
        }
    }, [scheduleData]);

    return (
        <TabsContent value="materi" className="w-full px-3 py-1">
            <h4 className="text-lg font-bold">Jadwal dan Materi</h4>
            <span className="text-sm font-bold">
                {trainingPeriodState?.from?.toLocaleDateString()} -{" "}
                {trainingPeriodState?.to?.toLocaleDateString()}
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
