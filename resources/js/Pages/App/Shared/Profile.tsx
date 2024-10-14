import React, {type FC, useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import {usePage} from "@inertiajs/react";
import type {user, userInfo} from "@/lib/interfaces/userInterface.ts";
import {facilitatorSchema, userSchema} from "@/lib/schema/userSchema.ts";
import type {File} from "@/lib/interfaces/fileInterface.ts";
import UsersDocs from "@/components/customs/UsersDocs.tsx";
import FilesFormBuilder from "@/components/customs/FilesFormBuilder.tsx";
import ProfileFormBuilder from "@/components/customs/ProfileFormBuilder.tsx";
import {toast} from "@/components/ui/use-toast.ts";

const Profile: FC = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [isOpened, setIsOpened] = useState(false);
    const props = usePage().props;
    const user = props.user as user;
    const userInfo = user.user_info as userInfo;
    const role = user.role as
        | "organizer"
        | "controller"
        | "facilitator"
        | "user";
    const files = user.files as File[];
    const [file, setFile] = useState(files);

    console.log(props.cv);

    const schema = role === "facilitator" ? facilitatorSchema : userSchema;
    // @ts-ignore
    let haveFiles = false;

    if (props.cv !== undefined) {
        haveFiles = !!props.cv;
    }
    return (
        <div className="px-10">
            <Card className="w-full my-8 py-4">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold px-4">
                        Profile
                    </CardTitle>
                    <CardDescription className="px-4">
                        Kelola informasi profil anda, termasuk detail pribadi
                        dan file.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {haveFiles ? (
                        <section className="flex gap-8 border-t py-10">
                            <div className="flex flex-col gap-4 w-[calc(100vh-85vh)]">
                                <h3
                                    className={`transition ease-in-out duration-300 text-lg pl-4 pr-6 py-2 rounded-xl cursor-pointer ${
                                        activeTab === "profile"
                                            ? "bg-blue-500 text-white"
                                            : ""
                                    }`}
                                    onClick={() => setActiveTab("profile")}
                                >
                                    Profile
                                </h3>
                                <h3
                                    className={`transition ease-in-out duration-300 text-lg pl-4 pr-6 py-2 rounded-xl cursor-pointer ${
                                        activeTab === "file"
                                            ? "bg-blue-500 text-white"
                                            : ""
                                    }`}
                                    onClick={() => setActiveTab("file")}
                                >
                                    File
                                </h3>
                            </div>
                            {activeTab === "profile" && (
                                <ProfileFormBuilder
                                    user={user}
                                    userInfo={userInfo}
                                    role={role}
                                    props={props}
                                    schema={schema}
                                />
                            )}
                            {activeTab === "file" && (
                                <FilesFormBuilder
                                    role={role}
                                    existingFiles={file}
                                    onFilesChange={setFile}
                                    props={props}
                                />
                            )}
                        </section>
                    ) : (
                        <section className="flex gap-8 border-t py-10 px-4">
                            <p>
                                Lengkapi File anda terlebih dahulu{" "}
                                <span
                                    className="text-blue-500 underline cursor-pointer"
                                    onClick={() => setIsOpened(true)}
                                >
                                    disini
                                </span>
                            </p>
                            {isOpened && (
                                <UsersDocs
                                    dialogClose={() => setIsOpened(false)}
                                    isOpen={isOpened}
                                />
                            )}
                        </section>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
