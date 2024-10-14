import React, {useRef, useState} from 'react'
import {Head, Link} from '@inertiajs/react';
import {ArrowRightIcon} from '@radix-ui/react-icons';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"

import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';

const chartConfig = {
    amountTrainees: {
        label: "Jumlah Peserta",
        color: "#2563eb",
    },
} satisfies ChartConfig

interface Training {
    id: number,
    name: string,
    desc: string,
    img: string,
    amountTrainees: number,
    created_at: string,
    updated_at: string,
}

export const trainings: Training[] = [
    {
        id: 1,
        name: 'Pelatihan 1',
        desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        created_at: '2013-01-01',
        updated_at: '2023-01-01',
        img: '/storage/assets/placeholder/wp_2.jpg',
        amountTrainees: 50,
    },
    {
        id: 2,
        name: 'Pelatihan 2',
        desc: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
        created_at: '2014-01-01',
        updated_at: '2023-01-01',
        img: '/storage/assets/placeholder/wp_2.jpg',
        amountTrainees: 100,

    },
    {
        id: 3,
        name: 'Pelatihan 3',
        desc: 'lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        created_at: '2015-01-01',
        updated_at: '2023-01-01',
        img: '/storage/assets/placeholder/wp_2.jpg',
        amountTrainees: 75,

    },
    {
        id: 4,
        name: 'Pelatihan 4',
        desc: 'lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        created_at: '2016-01-01',
        updated_at: '2023-01-01',
        img: '/storage/assets/placeholder/wp_2.jpg',
        amountTrainees: 80,

    },
    {
        id: 5,
        name: 'Pelatihan 5',
        desc: 'lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        created_at: '2017-01-01',
        updated_at: '2023-01-01',
        img: '/storage/assets/placeholder/wp_2.jpg',
        amountTrainees: 46,

    },
    {
        id: 6,
        name: 'Pelatihan 6',
        desc: 'lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        created_at: '2018-01-01',
        updated_at: '2023-01-01',
        img: '/storage/assets/placeholder/wp_2.jpg',
        amountTrainees: 120,

    },
    {
        id: 7,
        name: 'Pelatihan 7',
        desc: 'lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        created_at: '2019-01-01',
        updated_at: '2023-01-01',
        img: '/storage/assets/placeholder/wp_2.jpg',
        amountTrainees: 30,

    },
    {
        id: 8,
        name: 'Pelatihan 8',
        desc: 'lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        created_at: '2020-01-01',
        updated_at: '2023-01-01',
        img: '/storage/assets/placeholder/wp_2.jpg',
        amountTrainees: 98,

    },
    {
        id: 9,
        name: 'Pelatihan 9',
        desc: 'lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        created_at: '2021-01-01',
        updated_at: '2023-01-01',
        img: '/storage/assets/placeholder/wp_2.jpg',
        amountTrainees: 450,

    },
    {
        id: 10,
        name: 'Pelatihan 10',
        desc: 'lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        created_at: '2022-01-01',
        updated_at: '2023-01-01',
        img: '/storage/assets/placeholder/wp_2.jpg',
        amountTrainees: 321,

    },
]

const Landing = () => {
    return (
        <>
            <Head title="Home"/>
            <section
                className={`bg-[url('/storage/app/public/assets/P1100938.JPG')] bg-cover bg-no-repeat bg-center w-full h-[calc(100vh-6vh)] max-md:h-[calc(100vh-35vh)] max-h-full relative`}>
                <div className='w-full h-full absolute bg-slate-900 opacity-60 select-none z-0'/>
                <div className='w-full h-full p-5 my-auto text-center flex justify-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-white text-2xl z-[1]'>
                            <strong> INSTALASI PENDIDIKAN DAN PELATIHAN </strong>
                        </h1>
                        <p className='text-slate-200 text-xl z-[1]'>
                            RSUD Prambanan
                        </p>
                        <Link href="/trainings"
                              className='group mt-3 text-blue-400 hover:text-sky-500 max-md:text-lg text-2xl flex justify-center align-middle transition-all duration-150 font-bold gap-2 z-[1]'>
                            Baca Selengkapnya
                            <ArrowRightIcon className='max-md:w-7 max-md:h-7 w-8 h-8 transition-all duration-200'/>
                        </Link>

                    </div>
                </div>
            </section>

            <section
                className="w-full h-[calc(100vh-5vh)] max-md:h-[calc(100vh-50vh)] max-h-[calc(100vh-30vh)] relative mt-10">
                <div className='w-full h-full p-5 px-20 my-auto text-center flex justify-center'>
                    {section2Builder()}
                </div>
            </section>

            <section className="w-full h-fit mt-2">
                <div className='w-full h-full p-5 my-auto text-center flex justify-center'>
                    <div className='w-full h-full'>
                        <h3 className='text-slate-800 text-4xl z-[1] w-fit break-keep text-center pl-4 uppercase mx-auto'>
                            <strong>Galeri Pelatihan</strong>
                        </h3>
                        <div className='w-full h-full flex justify-center gap-2 py-5 lg:px-10 md:px-10'>
                            <Carousel opts={{
                                align: "start",
                            }}
                                      className="w-5/6 h-full max-w-lh max-md:max-w-md">
                                <CarouselContent>
                                    {trainings.map((training) => <CarouselItem
                                        className="max-sm:basis-full md:basis-1/2 lg:basis-1/2 xl:basis-3/5 h-full">{trainingsCard(training)}</CarouselItem>)}
                                </CarouselContent>
                                <CarouselPrevious/>
                                <CarouselNext/>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="w-full h-[calc(100vh-6vh)] max-md:h-[calc(100vh-35vh)] max-h-[calc(100vh-35vh)] mt-2 overflow-hidden">
                <div className='w-full h-full p-5 my-auto text-center flex justify-center'>
                    <div className='w-full'>
                        <h3 className='text-slate-800 text-4xl z-[1] w-fit break-keep text-center pl-4 uppercase mx-auto'>
                            <strong>Statistik Pelatihan</strong>
                        </h3>
                        <div className='mt-2 overflow-scroll'>
                            {statBuilder(trainings)}
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full h-[calc(100vh-5vh)] max-md:h-[calc(100vh-30vh)] max-h-[calc(100vh-20vh)] mt-2">
                <div className='w-full h-full p-5 my-auto text-center flex justify-center'>
                    <div className='w-full h-full'>
                        <h3 className='text-slate-800 text-4xl z-[1] w-fit break-keep text-center pl-4 uppercase mx-auto'>
                            <strong>Daftar Pelatihan</strong>
                        </h3>
                        <div
                            className='mt-5 px-3 py-5 overflow-scroll grid grid-cols-3 gap-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-h-[calc(100%-20%)] border-2 border-slate-200 rounded-xl'>
                            {trainings.map((training) => availableTrainings(training))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

const section2Builder = () => {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] max-w-full rounded-lg border"
        >
            <ResizablePanel defaultSize={50}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <img
                                src="/storage/assets/placeholder/wp_2.jpg"
                                className='w-full object-cover object-center h-[calc(100vh-20vh)] max-md:h-[calc(100vh-40vh)] max-h-[calc(100%-1%)] rounded-l-lg'
                                alt="dirut-accepting-sk"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Direktur menerima SK</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={50}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <img
                                src="/storage/assets/placeholder/wp_1.jpg"
                                className='w-full object-cover object-center h-[calc(100vh-20vh)] max-md:h-[calc(100vh-40vh)] max-h-[calc(100%-1%)] rounded-r-lg'
                                alt="diruts-sk"/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>SK Direktur</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

const trainingsCard = ({id, name, desc, img, created_at, updated_at}: Training) => {
    return (
        <>
            <Card className="w-full h-full bg-slate-50" key={id}>
                <CardHeader>
                    <img src={img}
                         className='w-full object-cover object-center h-[calc(100%-50%)] max-h-[calc(100%-70&)] rounded-lg'
                         alt="training-card-img"/>
                </CardHeader>
                <CardContent className='max-h-56'>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription className='truncate'>{desc}</CardDescription>

                </CardContent>
            </Card>
        </>
    )
}

export const availableTrainings = ({id, name, desc, img, created_at, updated_at}: Training) => {
    return (
        <>
            <Card className="w-full p-0 bg-slate-50" key={id}>
                <CardHeader className='relative'>
                    <Badge className='w-fit h-fit absolute top-10 left-8 bg-blue-500'>
                        Seminar
                    </Badge>
                    <img src={img}
                         className='w-full object-cover object-center h-[calc(100vh-50vh)] max-h-[calc(100vh-70vh)] rounded-lg'
                         alt="dirut-accepting-sk"/>
                </CardHeader>
                <CardContent className='max-h-56'>
                    <CardTitle className='text-start'>{name}</CardTitle>
                    <CardDescription className='text-start truncate'>{desc}</CardDescription>
                    <div className='flex justify-start items-center gap-2 mt-3'>
                        <Badge
                            className='w-fit h-fit bg-transparent hover:bg-transparent text-blue-500 border-blue-500 border-2'>
                            Transformasi Kesehatan
                        </Badge>
                    </div>

                    <CardDescription className='flex justify-start items-center gap-2 mt-2'>
                        <span className='flex justify-center items-center text-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 fill-slate-300'>
                                <path
                                    d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z"/>
                            </svg>
                            12 JPL
                        </span>
                        <span className='flex justify-center items-center text-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 fill-slate-300'>
                                <path
                                    d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z"/>
                            </svg>
                            13 SKP
                        </span>
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    <Button
                        className='w-full mt-3 max-md:text-lg text-2xl flex justify-center align-middle transition-all duration-200 font-bold gap-2 z-[1] bg-blue-500 text-white hover:bg-blue-400 hover:border-transparent'>
                        Detail
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

const statBuilder = (trainings: Training[]) => {
    const modifiedTrainings: Training[] = []

    trainings.forEach((training) => {
        const date = new Date(training.created_at);

        const current = training
        current.created_at = date.getFullYear().toString();
        modifiedTrainings.push(current)
    })

    return (
        <>
            <ChartContainer config={chartConfig} className="h-[calc(100vh-55vh)] w-full">
                <BarChart accessibilityLayer data={modifiedTrainings}>
                    <CartesianGrid vertical={true}/>
                    < XAxis
                        dataKey="created_at"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 4)}
                    />
                    <ChartTooltip content={<ChartTooltipContent/>}/>
                    <Bar dataKey="amountTrainees" fill="var(--color-amountTrainees)" radius={4}/>
                </BarChart>
            </ChartContainer>
        </>
    );
}

export default Landing

