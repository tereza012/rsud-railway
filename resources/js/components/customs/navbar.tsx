import React, { useState } from "react"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { HomeIcon, PersonIcon, CalendarIcon, BarChartIcon, EnvelopeClosedIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'

import { Link, usePage } from "@inertiajs/react"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"

interface NavItem {
    name: string
    href: string
    icon: React.ReactNode
}

const iconClass = "w-5 h-5 mr-1"
const NavItems: NavItem[] = [
    { name: "Beranda", href: "/", icon: <HomeIcon className={iconClass} /> },
    { name: "Profil", href: "/profile", icon: <PersonIcon className={iconClass} /> },
    { name: "Agenda Pelatihan", href: "/trainings", icon: <CalendarIcon className={iconClass} /> },
    { name: "Statistik", href: "/stats", icon: <BarChartIcon className={iconClass} /> },
    { name: "Kontak", href: "/contact", icon: <EnvelopeClosedIcon className={iconClass} /> },
];

const NavItem = ({ name, href, icon }: NavItem) => {
    const page = usePage();
    const currentPage = new String(page.props.current_page).toString();
    const pageName = currentPage !== "/" ? href.replaceAll("/", "") : href;

    return (
        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${pageName === (currentPage) ? "text-sky-600 text-accent-foreground border-b-sky-600 border-b-2 transition-all duration-300" : ""} max-lg:w-full rounded-b-none cursor-pointer hover:text-blue-600 hover:border-b-blue-600 hover:border-b-2 hover:rounded-b-none`} href={href}>
            {icon} {name}
        </NavigationMenuLink>
    )
}

export default function NavigationMenuDemo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavigationMenu className="py-1 fixed top-0 w-auto max-w-full shadow-slate-200 drop-shadow-sm shadow-md bg-white transition-all duration-300">
            <NavigationMenuList className={`
                    w-screen max-h-10 flex justify-between max-lg:px-0 px-2 max-w-full max-lg:block transition-all duration-300
                `}>
                <div className={`
                        flex justify-start w-2/12 bg-white max-ld:w-full max-lg:h-0 max-lg:overflow-hidden transition-all duration-30 focus-visible:py-1
                    `}>
                    <img src="https://rsudprambanan.slemankab.go.id/wp-content/uploads/2023/07/cropped-rsudprambanan-e1716391678419.png" alt="logo" className="w-full h-full" />

                </div>

                <div className="justify-between w-full bg-white h-0 hidden max-lg:flex max-lg:h-fit overflow-hidden">
                    <img src="https://rsudprambanan.slemankab.go.id/wp-content/uploads/2023/07/cropped-rsudprambanan-e1716391678419.png" alt="logo" className="w-full max-lg:w-40" />

                    <Button className="bg-white hover:bg-white group cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        <HamburgerMenuIcon className="w-7 h-7 stroke-black group-hover:stroke-blue-400 transition-all duration-300" />
                    </Button>
                </div>

                <div className={`
                        flex justify-center w-11/12 bg-white max-lg:w-full max-lg:h-0 max-lg:overflow-hidden transition-all duration-300 ${isOpen ? "max-lg:h-44 max-lg:block" : ""}
                    `}>
                    {NavItems.map((item, index) => <NavItem key={index} {...item} />)}
                </div>
                <div className={`
                    flex justify-end w-1/12 bg-white max-lg:w-full max-lg:h-0 max-lg:overflow-hidden transition-all duration-300 ${isOpen ? "max-lg:h-9 max-lg:flex max-lg:justify-center" : ""}
                    `}
                >
                    {userNavItem()}
                </div>

            </NavigationMenuList >
        </NavigationMenu >
    )
}

const userNavItem = () => {
    const page = usePage()
    const isAuthorized = page.props.user ? true : false

    return (
        <NavigationMenuItem className="max-lg:w-full">
            <DropdownMenu>
                <DropdownMenuTrigger className="max-lg:w-full max-lg:text-left">
                    {isAuthorized ? (
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    ) : (
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} group/lgn ${page.props.current_page === 'login' ? "text-sky-600 text-accent-foreground border-b-sky-600 border-b-2 transition-all duration-300" : ""} cursor-pointer hover:text-blue-600 hover:border-b-blue-600 hover:border-b-2 hover:rounded-b-none max-lg:w-full`} href="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClass}} mr-1 ${page.props.current_page === 'login' ? "fill-sky-600" : ""} group-hover/lgn:fill-blue-500`} viewBox="0 0 24 24" >
                                <path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z" />
                                <path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z" /></svg>
                            Masuk
                        </NavigationMenuLink>
                    )}
                </DropdownMenuTrigger>
                {isAuthorized ? userMenu() : ""}
            </DropdownMenu >
        </NavigationMenuItem >
    )
}

const userMenu = () => {
    return (
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
    )
}
