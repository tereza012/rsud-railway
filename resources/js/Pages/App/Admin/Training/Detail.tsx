import { useState } from "react";
import type { TrainingCreationTab } from "../Training";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { TabsTrigger } from "@radix-ui/react-tabs";
import TrainingTab from "@/components/customs/Admins/Training/Tabs/Update/Detail";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { Tooltip } from "@/components/ui/tooltip";
import { Head } from "@inertiajs/react";
import type { DateRange } from "react-day-picker";
import ScheduleTab from "@/components/customs/Admins/Training/Tabs/Update/Schedule";
import Documents from "@/components/customs/Admins/Training/Tabs/Update/Documents";
import OrganizerTab from "@/components/customs/Admins/Training/Tabs/Update/OrganizerTab";
import FacilitatorTab from "@/components/customs/Admins/Training/Tabs/Update/FacilitatorTab";
import ControllerTab from "@/components/customs/Admins/Training/Tabs/Update/ControllerTab";
import EvaluationTab from "@/components/customs/Admins/Training/Tabs/EvaluationTab";

export interface FileStruct {
    id?: number;
    files: string;
    file_type: string;
    url: string;
}

export interface StaffStruct {
    id?: number;
    user_id: number;
    files: FileStruct[]
}

const DetailTraining = ({
    title,
    training,
    targets,
    file_types,
    training_types,
    facilitator,
    organizer,
    controller,
}: {
    title: string;
    training: any
    training_types: string[];
    targets: string[];
    file_types: string[];
    organizer: any[];
    facilitator: any[];
    controller: any[];
}) => {
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
        {
            name: "evaluation",
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
    const [trainingPeriod, setTrainingPeriod] = useState<DateRange | undefined>({
        from: training?.training_start,
        to: training?.training_end,
    });

    const prepareTrainingData = () => {
        const {
            trainee,
            trainee_targets,
            competences,
            training_organizer,
            signup_start,
            signup_end,
            training_start,
            training_end,
            files,
            ...rest
        } = training;
        const preparedTraining = {
            ...rest,
            signup_start: new Date(signup_start),
            signup_end: new Date(signup_end),
            training_start: new Date(training_start),
            training_end: new Date(training_end),
            competences: competences,
            target_type: trainee_targets,
        };

        return preparedTraining;
    }

    const prepareFiles = (files: any[]) => {
        const preparedFiles = files.map((value: any) => {
            if (!value.users_id && value.training_id) {
                return ({
                    id: value.id,
                    files: value.files,
                    type: value.file_type,
                    url: `/storage/uploads/${value.file_type}/${value.files}`
                })
            }
        }).filter((value: any) => value !== undefined)

        // NOTE: My language server kinda broke so, let this one be there
        // @ts-ignore
        return preparedFiles;
    }

    const prepareOrganizerData = (
        trainingOrganizer: any,
        files: any[],
        staffRole: 'organizer' | 'facilitator' | 'controller',
        trainingID?: string
    ): StaffStruct[] => {
        const filteredData = trainingOrganizer.filter((item: any) => item.user.role == staffRole);
        let preparedData: StaffStruct[] = filteredData.map((item: any) => ({
            id: item.id,
            user_id: item.user.id,
            files: files.map((value: any) =>
                (value.users_id == item.user.id) &&
                {
                    id: value.id,
                    files: value.files,
                    type: value.file_type,
                    url: value.url,
                }
            )
            .filter((value: any) => value !== undefined)
            .filter((value: any) => typeof value !== 'boolean')
        }))

        return preparedData;
    }


    const TrainingCreationTabBuilder = ({
        name,
        tooltip,
        svg,
        disabled,
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

    const TabContentBuilder = (sel: string) => {
        //const index = tabs.findIndex((tab: any) => tab.name === sel);
        //if (index !== 0 && tabs[index - 1].currentState === false) {
        //    return (flutter run -d web-server
        //        <p className="text-center text-lg py-4">Silahkan selesaikan tahap sebelum melanjutkan</p>
        //    )
        //}
        const trainingID = training.id;

        let preparedTrainingData = prepareTrainingData();
        let filesData = prepareFiles(training.files);

        let organizerData: StaffStruct[] = prepareOrganizerData(
            training.training_organizer,
            training.files,
            'organizer',
            trainingID
        );
        let facilitatorData: StaffStruct[] = prepareOrganizerData(
            training.training_organizer,
            training.files,
            'facilitator',
            trainingID
        );
        let controllerData: StaffStruct[] = prepareOrganizerData(
            training.training_organizer,
            training.files,
            'controller',
            trainingID
        );

        if (selectedTab === "training") {
            return (
                <TrainingTab
                    NextButton={NextButtonHandler}
                    training={preparedTrainingData}
                    trainingTypes={training_types}
                    trainingTargets={targets}
                />
            );
        }

        if (selectedTab === "materi" && trainingPeriod) {
            return (
                <ScheduleTab
                    NextButton={NextButtonHandler}
                    PrevButton={PrevButtonHandler}
                    trainingPeriod={trainingPeriod}
                    trainingId={trainingID}
                    scheduleData={preparedTrainingData.training_schedule}
                />
            );
        }
        //
        if (selectedTab === "dokumen") {
            return (
                <Documents
                    file_types={file_types}
                    NextButton={NextButtonHandler}
                    PrevButton={PrevButtonHandler}
                    trainingId={trainingID}
                    fileData={filesData}
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
                    trainingId={trainingID}
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
                    trainingId={trainingID}
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
                    trainingId={trainingID}
                />
            );
        }
        if (selectedTab === "evaluation") {
            return (
                <EvaluationTab
                    trainingId={trainingID}
                    NextButton={NextButtonHandler}
                    PrevButton={PrevButtonHandler}
                />
            );
        }
    };

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Card className="w-full pt-2 pb-1 px-2">
                <Tabs
                    defaultValue={selectedTab}
                    value={selectedTab}
                    onValueChange={setSelectedTab}
                    className="w-full h-fit"
                >
                    <TabsList
                        className="grid w-full h-fit gap-1 grid-cols-7 bg-primary text-white mb-4 p-2
                    mx-auto rounded-lg transition-all duration-150
                    ">
                        {tabs.map((tab) => (
                            <TrainingCreationTabBuilder
                                {...tab}
                                key={new Date().getTime() % Math.random()}
                            />
                        ))}
                    </TabsList>
                    {TabContentBuilder(selectedTab)}
                </Tabs>
            </Card>
        </>
    )
}

export default DetailTraining;
