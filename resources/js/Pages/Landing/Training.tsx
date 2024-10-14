import React, { useState } from 'react'
import { Head } from '@inertiajs/react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';

const Landing = () => {
    return (
        <>
            <Head title="Pelatihan Page" />
            <div className='flex justify-center mt-10 dark:text-white'>
                <section className='w-full p-5 overflow-auto'>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Filter</AccordionTrigger>
                            <AccordionContent>
                                <Button className='w-full hover:text-blue-400 hover:bg-transparent bg-transparent border-0 shadow-transparent text-black flex justify-start align-middle'>Seminar</Button>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Sort</AccordionTrigger>
                            <AccordionContent>
                                <Button>Nama Belakang</Button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </div>
        </>
    );
}

export default Landing

