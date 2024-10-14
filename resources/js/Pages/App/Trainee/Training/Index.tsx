import Pagination from "@/components/customs/Pagination"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { TrainingStruct } from "@/lib/interfaces/trainingInterface"
import { Head, router, usePage } from "@inertiajs/react"
import { Component, useState } from "react"

interface Training {
    id: number,
    name: string,
    description: string,
    img: string,
    amountTrainees: number,
    type: string,
    jpl: number,
    skp: number,
    created_at: string,
    updated_at: string,
}

export const AvailableTrainings = ({
    id,
    name,
    description,
    img,
    created_at,
    updated_at,
    type,
    amountTrainees,
    jpl,
    skp,
}: Training) => {
    return (
        <>
            <Card className="w-full p-0 bg-slate-50" key={id}>
                <CardHeader className='relative'>
                    <Badge className='w-fit h-fit absolute top-10 left-8 bg-blue-500'>
                        {type}
                    </Badge>
                    <img src={img}
                        className='w-full object-cover object-center h-[calc(100vh-50vh)] max-h-[calc(100vh-70vh)] rounded-lg'
                        alt="dirut-accepting-sk" />
                </CardHeader>
                <CardContent className='max-h-56'>
                    <CardTitle className='text-start'>{name}</CardTitle>
                    <CardDescription className='text-start truncate'>{description}</CardDescription>
                    <div className='flex justify-start items-center gap-2 mt-3'>
                        <Badge
                            className='w-fit h-fit bg-transparent hover:bg-transparent text-blue-500 border-blue-500 border-2'>
                            Kapasitas {amountTrainees} Orang
                        </Badge>
                    </div>
                    <CardDescription className='flex justify-start items-center gap-2 mt-2'>
                        <span className='flex justify-center items-center text-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 fill-slate-400'>
                                <path
                                    d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z" />
                            </svg>
                            {jpl} JPL
                        </span>
                        <span className='flex justify-center items-center text-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 fill-slate-400'>
                                <path
                                    d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z" />
                            </svg>
                            {skp} SKP
                        </span>
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    <Button
                        className='w-full mt-3 max-md:text-lg text-lg flex justify-center
                        align-middle transition-all duration-200 font-semibold gap-2 z-[1]
                        bg-blue-500 text-white hover:bg-blue-400 hover:border-transparent
                        '>
                        Detail
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export const DummyCard = ({ id }: { id: number }) => {
    return (
        <>
            <Card className="w-full p-0 bg-slate-50 flex align-middle justify-center" key={id}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-slate-400" viewBox="0 0 24 24">
                    <path d="M12 2C6.486 2 2 6.486 2 12c.001 5.515 4.487 10.001 10 10.001 5.514 0 10-4.486 10.001-10.001 0-5.514-4.486-10-10.001-10zm0 18.001c-4.41 0-7.999-3.589-8-8.001 0-4.411 3.589-8 8-8 4.412 0 8.001 3.589 8.001 8-.001 4.412-3.59 8.001-8.001 8.001z">
                    </path>
                </svg>
            </Card>
        </>
    )
}

const ParticipatedTraining = (
    {
        trainings,
        currentPage,
        lastPage,
        total,
    }: Properties
) => {
    const { user } = usePage().props

    const [scrollPosition, setScrollPosition] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handlePageChange = (page: number) => {
        setScrollPosition(window.scrollY);
        // @ts-ignore
        if (page > 0 && page <= lastPage) {
            router.get(`/${user.role}/training`, { page, search: searchTerm, startDate, endDate }, {
                preserveState: true,
                replace: true
            });
        }
    };

    return (
        <div>
            <h1>Riwayat Pelatihan</h1>
            <div
                className='mt-5 px-3 py-5 overflow-scroll grid grid-cols-3 gap-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-h-[calc(100%-20%)] border-2 border-slate-200 rounded-xl'>

                {
                    trainings.map((training: TrainingStruct, index: number) => (
                        <AvailableTrainings
                            {...training}
                            key={index}
                            img="/storage/assets/placeholder/wp_2.jpg"
                            amountTrainees={training.capacity}
                        />
                    ))
                }
            </div>
            <div
                className='mt-5 px-3 border-2 border-slate-200 rounded-xl mb-3'>
                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    total={total}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

interface Properties {
    trainings: TrainingStruct[];
    history_training: {
        trainings: TrainingStruct[];
        user: any;
        currentPage: number;
        lastPage: number;
        total: number;
        onPageChange: (page: number) => void;
        page_title: string;

    };
    user: any;
    currentPage: number;
    lastPage: number;
    total: number;
    onPageChange: (page: number) => void;
    page_title: string;
}

const ListTraining = (
    {
        trainings,
        currentPage,
        lastPage,
        total,
    }: Properties
) => {
    const { user } = usePage().props

    const [scrollPosition, setScrollPosition] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handlePageChange = (page: number) => {
        setScrollPosition(window.scrollY);
        // @ts-ignore
        if (page > 0 && page <= lastPage) {
            router.get(`/${user.role}/training`, { page, search: searchTerm, startDate, endDate }, {
                preserveState: true,
                replace: true
            });
        }
    };

    return (
        <div>
            <h1>Daftar Pelatihan</h1>
            <div
                className='mt-5 px-3 py-5 overflow-scroll grid grid-cols-3 gap-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-h-[calc(100%-20%)] border-2 border-slate-200 rounded-xl'>

                {
                    trainings.map((training: TrainingStruct, index: number) => (
                        <AvailableTrainings
                            {...training}
                            key={index}
                            img="/storage/assets/placeholder/wp_2.jpg"
                            amountTrainees={training.capacity}
                        />
                    ))
                }
            </div>
            <div
                className='mt-5 px-3 border-2 border-slate-200 rounded-xl mb-3'>
                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    total={total}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

const UserTrainingIndex = (
    {
        trainings,
        history_training,
        currentPage,
        lastPage,
        total,
        page_title,
    }: Properties
) => {
    const tabList: {
        name: string,
        label: string,
        component: Component
    }[] = [
            {
                name: "training_list",
                label: "Daftar Pelatihan"
                component: <ListTraining trainings={trainings} currentPage={currentPage} lastPage={lastPage} total={total} />,
            },
            {
                name: "training_history",
                label: "Riwayat Pelatihan"
                component: <ParticipatedTraining trainings={history_training.trainings} currentPage={history_training.currentPage} lastPage={history_training.lastPage} total={history_training.total} />,
            }
        ];


    return (
        <>
            <Head>
                <title>{page_title}</title>
            </Head>
            <Tabs defaultValue={tabList[0].name} className="flex gap-5">
                <TabsList className="block max-w-[22%] h-fit border-2 border-slate-200 rounded-xl'">
                    {tabList.map((item, index) => (
                        <TabsTrigger value={item.name} key={index}>{item.label}</TabsTrigger>
                    ))}
                </TabsList>
                {tabList.map((item, index) => (
                    <TabsContent value={item.name} key={index}>{item.component}</TabsContent>
                ))}
            </Tabs>
        </>
    )
}

export default UserTrainingIndex
