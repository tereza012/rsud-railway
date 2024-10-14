import UsersDocs from "@/components/customs/UsersDocs";
import { Button } from "@/components/ui/button";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard() {
    const props = usePage().props;
    const [isDialogUp, setIsDialogUp] = useState(false);

    const handleDialogChange = (isOpen: boolean) => {
        setIsDialogUp(isOpen);
    };

    console.log(props); // WARNING:Remove this pipsqueak after testing

    return (
        <>
            <Head title="Dashboard" />
            {isDialogUp && (
                <UsersDocs
                    dialogClose={handleDialogChange}
                    isOpen={isDialogUp}
                />
            )}
            <div className="flex h-fit max-md:px-5">
                <div className="py-5 text-left w-full h-full flex flex-col justify-center items-stretch align-middle">
                    <h1 className="text-3xl font-bold mb-7">Dashboard</h1>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <p className="font-bold">
                                Lengkapi Dokumen anda
                                <Button
                                    variant="link"
                                    className="ml-1 pl-0 font-semibold text-blue-500"
                                    onClick={() => handleDialogChange(true)}
                                >
                                    Klik disini
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
