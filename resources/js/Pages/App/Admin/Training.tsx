import { useEffect, useState, type ReactElement } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import TrainingTab, {
    TrainingCreateSchemaValue,
} from "@/components/customs/Admins/Training/Tabs/training";
import ScheduleTab from "@/components/customs/Admins/Training/Tabs/Schedule";
import { type DateRange } from "react-day-picker";
import { z } from "zod";
import Documents from "@/components/customs/Admins/Training/Tabs/Documents";
import OrganizerTab from "@/components/customs/Admins/Training/Tabs/OrganizerTab";
import FacilitatorTab from "@/components/customs/Admins/Training/Tabs/FacilitatorTab";
import ControllerTab from "@/components/customs/Admins/Training/Tabs/ControllerTab";
import SummaryTab from "@/components/customs/Admins/Training/Tabs/Summary";
import { toast } from "@/components/ui/use-toast";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/customs/ErrBoundary";

export interface TrainingPhase {
    phase_1: any;
    phase_2: any;
    phase_3: any;
    phase_4: any;
    phase_5: any;
    phase_6: any;
}

interface CurrentProps {
    title: string;
    trainings: any[];
    facilitator: any[];
    organizer: any[];
    controller: any[];
    normal_user: any[];
    training_types: string[];
    targets: string[];
    file_types: string[];
    phase_data: TrainingPhase;
}

export interface TrainingCreationTab {
    name: string;
    tooltip: string;
    svg: ReactElement;
    currentState: boolean;
    disabled: boolean;
}

export interface DocsData {
    file_type: string;
    files: string;
    url: string;
}

export interface StaffData {
    id: number;
    files: DocsData[];
}

const TableBuilder = ({
    title,
    trainings,
    facilitator,
    normal_user,
}: CurrentProps) => {
    const [accordionVal, setAccordionVal] = useState("");

    const handleAccordion = (id: number) => {
        if (accordionVal === `accord-item-${id}`) {
            setAccordionVal("");
            return;
        }

        setAccordionVal(`accord-item-${id}`);
    };

    return (
        <Accordion
            type="single"
            collapsible
            value={accordionVal}
            onValueChange={setAccordionVal}
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-fit">No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead hidden>Download SPT &amp; SPK</TableHead>
                        <TableHead hidden className="text-right">
                            Upload SPT &amp; SPK
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trainings.map((training, index) => (
                        <>
                            <TableRow
                                key={
                                    training.name +
                                    "_" +
                                    training.type +
                                    "_" +
                                    new Date(training.created_at).getTime() +
                                    (index + 1 + Math.random())
                                }
                            >
                                <TableCell className="font-medium">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{training.name}</TableCell>
                                <TableCell></TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        className="bg-blue-500 text-white"
                                        onClick={() =>
                                            handleAccordion(training.id)
                                        }
                                    >
                                        <p className="flex gap-2 justify-center align-middle items-center">
                                            <span>Detail</span>
                                            <svg
                                                className="w-6 h-6 fill-primary-foreground"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 1.993C6.486 1.994 2 6.48 2 11.994c0 5.513 4.486 9.999 10 10 5.514 0 10-4.486 10-10s-4.485-10-10-10.001zm0 18.001c-4.411-.001-8-3.59-8-8 0-4.411 3.589-8 8-8.001 4.411.001 8 3.59 8 8.001s-3.589 8-8 8z"></path>
                                                <path d="M13 8h-2v4H7.991l4.005 4.005L16 12h-3z" />
                                            </svg>
                                        </p>
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow className="border-none border-0">
                                <TableCell
                                    colSpan={9}
                                    key={
                                        index +
                                        "_" +
                                        training.name +
                                        "_" +
                                        training.type +
                                        "_" +
                                        new Date(training.created_at).getTime() +
                                        (index + 1 + Math.random())
                                    }
                                    className="border-0 border-none w-full"
                                >
                                    <AccordionItem
                                        value={`accord-item-${training.id}`}
                                        className="w-full flex flex-col col-span-full"
                                    >
                                        <AccordionContent>
                                            Accordion Item {training.id}
                                        </AccordionContent>
                                    </AccordionItem>
                                </TableCell>
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </Accordion>
    );
};

const NewTrainingTab = (props: CurrentProps) => {
    const {
        training_types,
        targets,
        file_types,
        organizer,
        facilitator,
        controller,
        phase_data,
    } = props;
    const properties = usePage().props;

    let [tabs, setTabs] = useState<TrainingCreationTab[]>([
        {
            name: "training",
            tooltip: "Pelatihan",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                >
                    <path d="M2 3h2v18H2zm18 0h2v18h-2zM5 13h2v1h2v-1h2v1h2v-1h4v1h2v-4h-2v1h-4v-1h-2v1H9v-1H7v1H5zm0-9v4h2V7h8v1h2V7h2V5h-2V4h-2v1H7V4zm0 13v3h2v-1h2v1h2v-1h8v-2h-8v-1H9v1H7v-1H5z"></path>
                </svg>
            ),
            currentState: false,
            disabled: false,
        },
        {
            name: "materi",
            tooltip: "Materi & Jadwal",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"></path>
                    <path d="M7 10v2h10V9H7z"></path>
                </svg>
            ),
            currentState: false,
            disabled: false,
        },
        {
            name: "dokumen",
            tooltip: "Dokumen",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path d="M12.186 14.552c-.617 0-.977.587-.977 1.373 0 .791.371 1.35.983 1.35.617 0 .971-.588.971-1.374 0-.726-.348-1.349-.977-1.349z"></path>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.155 17.454c-.426.354-1.073.521-1.864.521-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432.42.312.684.81.684 1.522 0 .775-.282 1.309-.672 1.639zm2.99.546c-1.2 0-1.901-.906-1.901-2.058 0-1.211.773-2.116 1.967-2.116 1.241 0 1.919.929 1.919 2.045-.001 1.325-.805 2.129-1.985 2.129zm4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174-1.397 0-2.117-.869-2.117-2.021 0-1.379.983-2.146 2.207-2.146.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338 0 .809.48 1.318 1.296 1.318zM14 9h-1V4l5 5h-4z"></path>
                    <path d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018.828.006 1.367-.449 1.367-1.415.006-.84-.485-1.284-1.271-1.284z"></path>
                </svg>
            ),
            currentState: false,
            disabled: false,
        },
        {
            name: "penyelenggara",
            tooltip: "Penyelenggara",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path d="M17.988 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h11.988zM9 5h6v2H9V5zm5.25 6.25A2.26 2.26 0 0 1 12 13.501c-1.235 0-2.25-1.015-2.25-2.251S10.765 9 12 9a2.259 2.259 0 0 1 2.25 2.25zM7.5 18.188c0-1.664 2.028-3.375 4.5-3.375s4.5 1.711 4.5 3.375v.563h-9v-.563z"></path>
                </svg>
            ),
            currentState: false,
            disabled: false,
        },
        {
            name: "fasilitator",
            tooltip: "Fasilitator",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z"></path>
                </svg>
            ),
            currentState: false,
            disabled: false,
        },
        {
            name: "pengendali",
            tooltip: "Pengendali",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path d="M21.986 9.74a3.193 3.193 0 0 0-.008-.088A5.003 5.003 0 0 0 17 5H7a4.97 4.97 0 0 0-4.987 4.737c-.01.079-.013.161-.013.253v6.51c0 .925.373 1.828 1.022 2.476A3.524 3.524 0 0 0 5.5 20c1.8 0 2.504-1 3.5-3 .146-.292.992-2 3-2 1.996 0 2.853 1.707 3 2 1.004 2 1.7 3 3.5 3 .925 0 1.828-.373 2.476-1.022A3.524 3.524 0 0 0 22 16.5V10c0-.095-.004-.18-.014-.26zM7 12.031a2 2 0 1 1-.001-3.999A2 2 0 0 1 7 12.031zm10-5a1 1 0 1 1 0 2 1 1 0 1 1 0-2zm-2 4a1 1 0 1 1 0-2 1 1 0 1 1 0 2zm2 2a1 1 0 1 1 0-2 1 1 0 1 1 0 2zm2-2a1 1 0 1 1 0-2 1 1 0 1 1 0 2z"></path>
                </svg>
            ),
            currentState: false,
            disabled: false,
        },
        // {
        //     name: "evaluation",
        //     tooltip: "Evaluasi",
        //     svg: (
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             className="w-6 h-6"
        //             viewBox="0 0 24 24"
        //         >
        //             <path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h4l-1.8 2.4 1.6 1.2 2.7-3.6h3l2.7 3.6 1.6-1.2L16 18h4c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 16V5h16l.001 11H4z"></path>
        //             <path d="M6 12h4v2H6z"></path>
        //         </svg>
        //     ),
        //     currentState: false,
        //     disabled: false,
        // },
        {
            name: "summarize",
            tooltip: "Evaluasi",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h4l-1.8 2.4 1.6 1.2 2.7-3.6h3l2.7 3.6 1.6-1.2L16 18h4c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 16V5h16l.001 11H4z"></path>
                    <path d="M6 12h4v2H6z"></path>
                </svg>
            ),
            currentState: false,
            disabled: false,
        },
    ]);

    let [selectedTab, setSelectedTab] = useState("training");
    let [allTab, setAllTab] = useState(tabs);

    const TrainingCreationTabBuilder = ({
        name,
        tooltip,
        svg,
        disabled,
        currentState,
    }: TrainingCreationTab) => {
        return (
            <TooltipProvider key={name + new Date().getTime()}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <TabsTrigger
                            value={name}
                            disabled={disabled}
                            className={`${selectedTab === name
                                ? "bg-slate-100 fill-black"
                                : "fill-white"
                                }  rounded py-1 px-2 transition-all duration-150 flex flex-col justify-center items-center`}
                            onClick={() => setSelectedTab(name)}
                        >
                            {svg}
                        </TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent
                        className="bg-white p-1 rounded-md mt-1 shadow-md shadow-slate-500"
                        side="bottom"
                    >
                        <p className="text-sm text-black">{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    };
    const NextButtonHandler = (): void => {
        const index = tabs.findIndex((tab) => tab.name === selectedTab);
        if (index === tabs.length - 1 || index === -1) return;

        tabs[index].currentState = true;
        let tabToReplace = tabs[index + 1];
        tabToReplace.currentState = false;
        setAllTab(
            tabs.map((tab: any) =>
                tab.name === selectedTab ? tabToReplace : tab
            )
        );

        setSelectedTab(tabs[index + 1].name);
    };

    const PrevButtonHandler = (): void => {
        const index = tabs.findIndex((tab) => tab.name === selectedTab);
        if (index === 0 || index === -1) return;

        setSelectedTab(tabs[index - 1].name);
    };

    const SubmitTraining = async (): Promise<void> => {
        const { competences, ...filterredTrainingData } = { ...trainingData };
        const newTrainingData = {
            ...filterredTrainingData,
            name_competences: competences,
        };

        let training_organizer: number[] = [];

        const orgnaizerPreserved = organizerData.flatMap((item: StaffData) => {
            const { files } = item;
            training_organizer.push(item.id);
            const preparedFile = files.map((file: DocsData) => {
                return {
                    users_id: item.id,
                    files: file.files,
                    file_type: file.file_type,
                };
            });

            return preparedFile;
        });

        const facilitatorPreserved = facilitatorData.flatMap(
            (item: StaffData) => {
                const { files } = item;
                training_organizer.push(item.id);
                const preparedFile = files.flatMap((file: DocsData) => {
                    return {
                        users_id: item.id,
                        files: file.files,
                        file_type: file.file_type,
                    };
                });

                return preparedFile;
            }
        );

        const controllerPreserved = controllerData.flatMap(
            (item: StaffData) => {
                const { files } = item;
                training_organizer.push(item.id);
                const preparedFile = files.flatMap((file: DocsData) => {
                    return {
                        users_id: item.id,
                        files: file.files,
                        file_type: file.file_type,
                    };
                });

                return preparedFile;
            }
        );

        const body = {
            ...newTrainingData,
            files: fileData,
            training_schedule: scheduleData,
            training_organizer: training_organizer,
            organizer_data: orgnaizerPreserved,
            facilitator_data: facilitatorPreserved,
            controller_data: controllerPreserved,
        };

        console.log("body", body);

        try {
            router.post("/admin/training", body);
        } catch (error) {
            console.log("error", error);
        }
    };

    const [trainingPeriod, setTrainingPeriod] = useState<DateRange | undefined>(
        undefined
    );
    const [trainingData, setTrainingData] = useState<
        z.infer<typeof TrainingCreateSchemaValue> | undefined
    >(undefined);
    const [scheduleData, setScheduleData] = useState<any[]>([]);
    const [fileData, setFileData] = useState<DocsData[]>([]);
    const [organizerData, setOrganizerData] = useState<StaffData[]>([]);
    const [facilitatorData, setFacilitatorData] = useState<StaffData[]>([]);
    const [controllerData, setControllerData] = useState<StaffData[]>([]);

    const handleTrainingSubmit = (formdata: any) => {
        setTrainingData(formdata);
        const trainingPeriods: DateRange = {
            from: new Date(formdata.training_start),
            to: new Date(formdata.training_end),
        };

        setTrainingPeriod(trainingPeriods);

        const competencesNew = {
            competences: {
                name_competences: formdata.name_competences,
            },
        };
        const trainee_targets = {
            trainee_targets: {
                target_type: formdata.target_type,
            },
        };
        const { competences, target_type, ...newObj } = formdata;
        phase_data.phase_1 = {
            ...competencesNew,
            ...trainee_targets,
            training: {
                ...newObj,
            },
        };
    };

    const handleScheduleSubmit = (data: any[]) => {
        setScheduleData(data);
        phase_data.phase_2 = {
            schedule: {
                schedule_content: data,
            },
        };
    };

    const handleDocsSubmit = (data: DocsData[]) => {
        setFileData(data);
        const files = data.map((item: DocsData) => item.files);
        const typess = data.map((item: DocsData) => item.file_type);
        const prepare_phase_3 = {
            file: {
                files,
                file_type: typess,
            },
            url: data.map((item: DocsData) => item.url),
        };
        phase_data.phase_3 = prepare_phase_3;
    };

    const handleOrganizerSubmit = (data: StaffData[]) => {
        setOrganizerData(data);
        phase_data.phase_4 = { organizer_data: data };
    };

    const handleFacilitatorSubmit = (data: StaffData[]) => {
        setFacilitatorData(data);
        console.log("data", data);
        phase_data.phase_5 = { facilitator: data }
    };

    const handleControllerSubmit = (data: StaffData[]) => {
        setControllerData(data);
        phase_data.phase_6 = { controller: data }
    };

    const setTabCompleteByIndex = (index: number) => {
        if (index === -1) return;

        const tab = tabs[index];
        tab.currentState = true;
        let tabToReplace = tabs[index + 1];
        tabToReplace.currentState = false;
        setAllTab(
            tabs.map((tab: any) => (tab.name === tab.name ? tabToReplace : tab))
        );
    };

    useEffect(() => {
        if (phase_data.phase_1) {
            const item = phase_data.phase_1;
            const prepareData = {
                ...item.training,
                competences: item.competences.name_competences,
                target_type: item.trainee_targets.target_type,
            };
            setTrainingData(prepareData);
            setTrainingPeriod({
                from: new Date(item.training.training_start),
                to: new Date(item.training.training_end),
            });

            const i = tabs.findIndex((tab: any) => tab.name === "training");
            setTabCompleteByIndex(i);
        }

        if (phase_data.phase_2) {
            const item = phase_data.phase_2;
            const prepareData = [...item.schedule.schedule_content];
            setScheduleData(prepareData);

            const i = tabs.findIndex((tab: any) => tab.name === "materi");
            setTabCompleteByIndex(i);
        }

        if (phase_data.phase_3) {
            const phase_3 = phase_data.phase_3;
            const { file, url } = phase_3;

            console.log(file);
            const preparedData: DocsData[] = file.files.map(
                (value: any, index: number) => {
                    return {
                        file_type: file.file_type[index],
                        files: value,
                        url: url[index],
                    };
                }
            );

            setFileData(preparedData);

            const i = tabs.findIndex((tab: any) => tab.name === "dokumen");
            setTabCompleteByIndex(i);
        }

        if (phase_data.phase_4) {
            const item = phase_data.phase_4.organizer_data;

            const preservedResult: StaffData[] = item.map((value: any) => {
                const preparedOrganizer: StaffData = {
                    id: parseInt(value.users_id),
                    files: value.files.map((file: DocsData, index: number) => {
                        return {
                            files: file,
                            file_type: value.file_type[index],
                            url: value.url[index],
                        };
                    }),
                };

                return preparedOrganizer;
            });

            setOrganizerData(preservedResult);

            const i = tabs.findIndex(
                (tab: any) => tab.name === "penyelenggara"
            );
            setTabCompleteByIndex(i);
        }

        if (phase_data.phase_5) {
            const item = phase_data.phase_5.facilitator;
            const preservedResult: StaffData[] = item.map((value: any) => {
                const preparedOrganizer: StaffData = {
                    id: parseInt(value.users_id),
                    files: value.files.map((file: DocsData, index: number) => {
                        return {
                            files: file,
                            file_type: value.file_type[index],
                            url: value.url[index],
                        };
                    }),
                };

                return preparedOrganizer;
            });

            setFacilitatorData(preservedResult);

            const i = tabs.findIndex((tab: any) => tab.name === "fasilitator");
            setTabCompleteByIndex(i);
        }

        if (phase_data.phase_6) {
            const item = phase_data.phase_6.controller;

            const preservedResult: StaffData[] = item.map((value: any) => {
                const preparedOrganizer: StaffData = {
                    id: parseInt(value.users_id),
                    files: value.files.map((file: DocsData, index: number) => {
                        return {
                            files: file,
                            file_type: value.file_type[index],
                            url: value.url[index],
                        };
                    }),
                };

                return preparedOrganizer;
            });

            setControllerData(preservedResult);

            const i = tabs.findIndex((tab: any) => tab.name === "pengendali");
            setTabCompleteByIndex(i);
        }
    }, []);

    const TabContentBuilder = (sel: string) => {
        const index = tabs.findIndex((tab: any) => tab.name === sel);
        if (index !== 0 && tabs[index - 1].currentState === false) {
            return (
                <p className="text-center text-lg py-4">Silahkan selesaikan tahap sebelum melanjutkan</p>
            )
        }

        if (selectedTab === "training") {
            return (
                <TrainingTab
                    NextButton={NextButtonHandler}
                    handleTrainingSubmit={handleTrainingSubmit}
                    trainingData={trainingData}
                    trainingTargets={targets}
                    trainingTypes={training_types}
                />
            );
        }

        // if (!trainingID) return;

        if (selectedTab === "materi" && trainingPeriod) {
            return (
                <ScheduleTab
                    NextButton={NextButtonHandler}
                    PrevButton={PrevButtonHandler}
                    trainingPeriod={trainingPeriod}
                    obtainData={handleScheduleSubmit}
                    scheduleData={scheduleData}
                />
            );
        }

        if (selectedTab === "dokumen") {
            return (
                <Documents
                    file_types={file_types}
                    NextButton={NextButtonHandler}
                    PrevButton={PrevButtonHandler}
                    obtainValue={handleDocsSubmit}
                    fileData={fileData}
                />
            );
        }

        if (selectedTab === "penyelenggara") {
            return (
                <OrganizerTab
                    organizer={organizer}
                    organizersData={organizerData}
                    NextButton={NextButtonHandler}
                    PrevButton={PrevButtonHandler}
                    obtainData={handleOrganizerSubmit}
                />
            );
        }

        if (selectedTab === "fasilitator") {
            return (
                <FacilitatorTab
                    facilitator={facilitator}
                    storedData={facilitatorData}
                    NextButton={NextButtonHandler}
                    PrevButton={PrevButtonHandler}
                    obtainData={handleFacilitatorSubmit}
                />
            );
        }
        if (selectedTab === "pengendali") {
            return (
                <ControllerTab
                    controller={controller}
                    storedData={controllerData}
                    NextButton={NextButtonHandler}
                    PrevButton={PrevButtonHandler}
                    obtainData={handleControllerSubmit}
                />
            );
        }

        if (selectedTab === "summarize") {
            return (
                <SummaryTab
                    SubmitTraining={SubmitTraining}
                    PrevButton={PrevButtonHandler}
                    phaseCategory={tabs}
                />
            );
        }
    };

    return (
        <TabsContent value="newTR">
            <Card className="w-full pt-2 pb-1 px-2">
                <Tabs
                    defaultValue={selectedTab}
                    value={selectedTab}
                    onValueChange={setSelectedTab}
                    className="w-full"
                >
                    <TabsList className="grid w-full gap-1 grid-cols-7 bg-primary text-white mb-4 p-2 mx-auto rounded-lg transition-all duration-150">
                        {tabs.map((tab) => (
                            <TrainingCreationTabBuilder
                                {...tab}
                                key={new Date().getTime() % Math.random()}
                            />
                        ))}
                    </TabsList>
                    <ErrorBoundary fallback={<p>Something went wrong</p>}>
                        {TabContentBuilder(selectedTab)}
                    </ErrorBoundary>
                </Tabs>
            </Card>
        </TabsContent>
    );
};

const OrganizeTrainingTab = (props: CurrentProps) => {
    return (
        <TabsContent value="organizeTR">
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Pelatihan</CardTitle>
                </CardHeader>
                <CardContent>
                    <TableBuilder {...props} />
                </CardContent>
            </Card>
        </TabsContent>
    );
};

const NavigationBuilder = (props: CurrentProps) => {
    const defaultTab = "organizeTR";
    let [selectedTab, setSelectedTab] = useState(defaultTab);

    return (
        <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-2/3 gap-2 grid-cols-2 bg-primary text-white mb-4 p-2 mx-auto rounded-lg transition-all duration-150">
                <TabsTrigger
                    value="newTR"
                    className={`${selectedTab === "newTR" ? "bg-slate-100 text-black" : ""
                        } rounded py-1 px-2 transition-all duration-150`}
                    onClick={() => setSelectedTab("newTR")}
                >
                    Tambah Pelatihan
                </TabsTrigger>
                <TabsTrigger
                    value="organizeTR"
                    className={`${selectedTab === "organizeTR"
                        ? "bg-slate-100 text-black"
                        : ""
                        } rounded py-1 px-2 transition-all duration-150`}
                    onClick={() => setSelectedTab("organizeTR")}
                >
                    Kelola Pelatihan
                </TabsTrigger>
            </TabsList>
            <NewTrainingTab {...props} />
            <OrganizeTrainingTab {...props} />
        </Tabs>
    );
};

export default function Training(props: CurrentProps) {
    const originalProps = usePage().props;

    const {
        title,
        trainings,
        facilitator,
        normal_user,
        training_types,
        targets,
        organizer,
    } = props;

    useEffect(() => {
        console.log("originalProps", originalProps);
        if (Object.keys(originalProps.errors).length > 0) {
            const errors = originalProps.errors;

            Object.keys(errors).map((item: any) => {
                toast({
                    title: "Error",
                    description: errors[item],
                    variant: "destructive",
                    duration: 5000,
                });
            });
        }
    }, [originalProps]);

    return (
        <>
            <Head title="Pelatihan" />
            <div className="flex flex-col items-center justify-center gap-5 p-5">
                <NavigationBuilder {...props} />
            </div>
        </>
    );
}
