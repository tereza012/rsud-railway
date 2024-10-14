import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Link, router, usePage} from "@inertiajs/react";
import React, {useState} from "react";
import {type UserProps} from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {
    NavigationMenu,
    NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import {Toaster} from "@/components/ui/toaster";

interface RoleLink {
    URL: string;
    label: string;
    role: string;
}

const links: RoleLink[] = [
    {URL: "/director/training", label: "Pelatihan", role: "director"},
    {URL: "/facilitator/profile", label: "Profile", role: "facilitator"},
    {URL: "/facilitator/training", label: "Pelatihan", role: "facilitator"},
    {URL: "/controller/profile", label: "Profile", role: "controller"},
    {URL: "/controller/training", label: "Pelatihan", role: "controller"},
    {URL: "/organizer/profile", label: "Profile", role: "organizer"},
    {URL: "/organizer/training", label: "Pelatihan", role: "organizer"},
    {URL: "/admin/", label: "Dashboard", role: "admin"},
    {URL: "/admin/training", label: "Pelatihan", role: "admin"},
];

export default function AuthorizedLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavBar/>
            <div className="bg-base-200 text-base-content mt-16 px-5 gap-2">
                <BreadCumb/>
                <main className="mt-2">{children}</main>
                <Toaster/>
            </div>
        </>
    );
}

const Drawer = () => {
    const props = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    const {role}: UserProps = props.user as UserProps;
    const userRole = role;


    router.on('finish', () => {
        if (isOpen)
            handleClose(!isOpen);
    })

    const handleClose = (state: boolean) => {
        setIsOpen(state);
    };

    return (
        <Sheet
            open={isOpen}
            onOpenChange={handleClose}

        >
            <SheetTrigger className="text-black hover:scale-110 px-2 py-1 transition-all duration-150">
                <HamburgerMenuIcon className="h-8 w-8" onClick={() => handleClose(isOpen)}/>
            </SheetTrigger>
            <SheetContent className="w-1/2 max-md:w-full" side="left">
                <SheetHeader>
                    <SheetTitle className="px-2 py-1 max-sm:w-full max-sm:px-14">
                        <img
                            src="https://rsudprambanan.slemankab.go.id/wp-content/uploads/2023/07/cropped-rsudprambanan-e1716391678419.png"
                            alt="logo"
                            className="w-full h-full"
                        />
                    </SheetTitle>
                    <div className="grid gap-3 py-10">
                        {
                            links.map(({URL, label, role}) => {
                                if (role !== userRole) return;
                                return (
                                    <Link
                                        href={URL}
                                        className="w-full h-fit border-b-2 border-b-transparent hover:text-blue-400 hover:border-b-blue-400 transition-all duration-150"
                                        key={label + '_' + role + '_' + new Date().getTime() % Math.random()}
                                    >
                                        {label}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </SheetHeader>
                <SheetFooter className="absolute bottom-1 left-0 w-[98%] flex justify-center">
                    <Link
                        href="/logout"
                        className="flex justify-center gap-2 py-4 w-full h-fit border-b-transparent border-b-2 hover:text-blue-500 transition-all duration-150 group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 group-hover:fill-blue-500"
                            viewBox="0 0 24 24"
                        >
                            <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
                            <path
                                d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
                        </svg>
                        Keluar
                    </Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

interface Link {
    URL: string;
    label: string;
}

const BreadCrumbContentLoader = () => {
    const props = usePage().props;
    const current_page = String(props.current_page).toString();
    const links: Link[] = [];

    const linkBuilder = (link: string) => {
        if (links.length > 2) return;

        const dispatchedLink = link.split("/");
        dispatchedLink.map((urlName, index) => {
            switch (index) {
                case 0:
                    links.push({
                        URL: urlName,
                        label: urlName.includes("\{") ? window.location.href.split("/")[index] : urlName
                    });
                    break;
                default:
                    const currentUri = dispatchedLink
                        .slice(0, index + 1)
                        .join("/");

                    const indexOfParams = currentUri
                        .split("/")
                        .filter((item) => item.length > 0)
                        .filter((item) => !item.includes("\{"))
                        .length;
                    const preparedUrl = currentUri.includes("\{") ?
                        currentUri.split('/').filter((item) => !item.includes('\{')).join('/')
                        + '/' +
                        window.location.pathname.split("/").filter((item) => item.length > 0)[indexOfParams]
                        :
                        currentUri

                    links.push({
                        URL: preparedUrl,
                        label: urlName.includes("\{") ? window.location.pathname.split("/").filter((item) => item.length > 0)[indexOfParams] : urlName
                    });
                    break;
            }
        });
    };

    const BreadCrumbItemBuilder = ({
                                       index,
                                       value,
                                       link,
                                   }: {
        index: number;
        value: Link;
        link: string;
    }) => {
        const isCurrentPage = link === value.URL;

        return (
            <>
                {index > 0 ? <BreadcrumbSeparator className="py-2"/> : null}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild className="text-black uppercase py-2">
                        <Link
                            disabled={isCurrentPage}
                            href={`/${value.URL}`}
                            className={link === value.URL ? "font-bold" : ""}
                        >
                            {value.label}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </>
        );
    };

    linkBuilder(current_page);
    return links.map((value, index) => (
        <BreadCrumbItemBuilder
            key={
                index.toString() +
                "_" +
                new Date().getMilliseconds() +
                Math.random().toString()
            }
            index={index}
            value={value}
            link={current_page}
        />
    ));
};

const BreadCumb = () => {
    return (
        <React.StrictMode>
            <Breadcrumb>
                <BreadcrumbList>{BreadCrumbContentLoader()}</BreadcrumbList>
            </Breadcrumb>
        </React.StrictMode>
    );
};

const NavBar = () => {
    return (
        <NavigationMenu
            className="py-1 fixed top-0 w-auto max-w-full shadow-slate-200 drop-shadow-sm shadow-md bg-white transition-all duration-300 z-50">
            <NavigationMenuList
                className={`w-screen max-h-12 flex justify-start max-lg:px-0 max-w-full transition-all duration-300`}>
                <div className={`flex justify-start pl-1`}>
                    <Drawer/>
                </div>

                <div className={`flex justify-start w-5/6`}>
                    <Link href="/" className="py-1 w-60 h-full">
                        <img
                            src="https://rsudprambanan.slemankab.go.id/wp-content/uploads/2023/07/cropped-rsudprambanan-e1716391678419.png"
                            alt="logo"
                            className="w-full h-full"
                        />
                    </Link>
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
