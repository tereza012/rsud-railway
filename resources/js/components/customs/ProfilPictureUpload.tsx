import React, {type FC, useEffect, useRef, useState} from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

interface ProfilPictureUploadProps {
    onFileChange: (file: File | string) => void;
    value?: string;
}

const ProfilPictureUpload: FC<ProfilPictureUploadProps> = ({
                                                               onFileChange,
                                                               value,
                                                           }) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [imgChange, setImgChange] = useState<string | ArrayBuffer | null>(
        null
    );
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 2 * 1024 * 1024) {
                setPreview(null);
                onFileChange("");

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }

                return;
            }

            onFileChange(selectedFile);
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result as string);
            };

            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    let imgPreview: any = value;
    if (value === '/storage/uploads/profile_picture/') {
        imgPreview =
            (preview as string) ??
            "https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png";
    }

    useEffect(() => {
        setImgChange(preview);
    }, [preview]);

    return (
        <div className="flex flex-col items-center gap-2">
            <Avatar
                className={`w-32 h-32 object-cover border border-gray-300 cursor-pointer`}
                onClick={handleAvatarClick}
            >
                <AvatarImage
                    src={imgChange ?? imgPreview}
                    alt="User Picture"
                    className="object-cover object-center"
                />
            </Avatar>
            <Label
                htmlFor="profile_picture"
                className="self-start w-full flex flex-col gap-2"
            >
                Foto Profil
            </Label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                name="profile_picture"
                ref={fileInputRef}
                className="w-full rounded-lg border-2 border-slate-500 text-slate-800 focus:border-blue-500"
                hidden={value !== undefined}
            />
            {value && (
                <Input
                    type="text"
                    name="gapenting"
                    value={"Klik untuk ubah profil"}
                    readOnly
                    onClick={handleAvatarClick}
                    className="w-full rounded-lg cursor-pointer border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
            )}
        </div>
    );
};

export default ProfilPictureUpload;
