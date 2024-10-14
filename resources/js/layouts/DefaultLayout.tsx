import NavigationMenuDemo from "@/components/customs/navbar";
import { Toaster } from "@/components/ui/toaster";
import { usePage } from "@inertiajs/react";
import React from "react"
    ;
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const props = usePage().props;

    return (
        <>
            <NavigationMenuDemo />
            <div className="bg-base-200 text-base-content mt-14">
                <main>{children}</main>
                <Toaster />
            </div>
            <footer
                className={`w-full p-5 my-auto text-center max-md:py-2 flex justify-center mt-5 bg-blue-600 ${props.current_page == "login" ||
                    props.current_page == "register"
                    ? "hidden"
                    : ""
                    }`}
            >
                <span className="text-center text-white">
                    &copy; Copyright RSUD Prambanan 2024
                </span>
            </footer>
        </>
    )
}
