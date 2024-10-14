import React, {type ReactElement, useEffect, useRef, useState} from "react";
import {Head, router, usePage} from "@inertiajs/react";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useForm} from "@felte/react";
import {validator} from "@felte/validator-zod";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import InputSelect from "@/components/customs/InputSelect.tsx";
import ProvinceRegencySelect from "@/components/customs/ProvinceRegencySelect.tsx";
import {Button} from "@/components/ui/button.tsx";
import ProfilPictureUpload from "@/components/customs/ProfilPictureUpload.tsx";

interface Role {
    id: number;
    label: string;
    value: string;
    svg: ReactElement;
}

const roles: Role[] = [
    {
        id: 1,
        label: "Peserta",
        value: "user",
        svg: (
            <path
                d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
        ),
    },
    {
        id: 2,
        label: "Penyelenggara",
        value: "organizer",
        svg: (
            <path
                d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z"></path>
        ),
    },
    {
        id: 3,
        label: "Fasilitator",
        value: "facilitator",
        svg: (
            <>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
                </g>
            </>
        ),
    },
    {
        id: 4,
        label: "Pengendali",
        value: "controller",
        svg: (
            <path
                d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
        ),
    },
];

const maxFileSize = 2 * 1024 * 1024;

const baseSchema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong"),
    username: z
        .string()
        .min(1, "Nama Pengguna tidak boleh kosong")
        .transform((val) =>
            val.toLowerCase().replaceAll(" ", "").replaceAll("/", "/")
        ),
    email: z.string().email("Email tidak boleh kosong"),
    password: z
        .string()
        .min(8, "Kata Sandi tidak boleh kosong")
        .superRefine((val, ctx) => {
            if (val.length < 8) {
                ctx.addIssue({
                    code: "custom",
                    message: "Kata Sandi harus minimal 8 karakter",
                    path: ["password"],
                });
            }
        }),
    password_confirmation: z
        .string()
        .min(1, "Konfirmasi Kata Sandi tidak boleh kosong"),
    role: z.string().min(1, "Peran tidak boleh kosong"),
    phone: z.coerce
        .string()
        .min(1, "Nomor Telepon tidak boleh kosong")
        .max(20, "Nomor Telepon tidak boleh lebih dari 20 karakter"),
    gender: z.enum(["Laki-laki", "Perempuan"], {
        required_error: "Gender harus dipilih",
        invalid_type_error: "Gender tidak valid",
    }),
    nip: z
        .string()
        .length(18, "Nomor Induk Pegawai harus terdiri dari tepat 18 digit")
        .regex(/^\d+$/, "Nomor Induk Pegawai harus terdiri dari digit saja"),
    employee_position: z.string().min(1, "Posisi Pegawai tidak boleh kosong"),
    institution: z.string().min(1, "Institusi tidak boleh kosong"),
    employee_status: z.string().min(1, "Status Pegawai tidak boleh kosong"),
    last_education: z.enum(["D1", "D2", "D3", "D4", "S1", "S2", "S3"], {
        required_error: "Pendidikan terakhir harus dipilih",
        invalid_type_error: "Pendidikan terakhir tidak valid",
    }),
    profile_picture: z.instanceof(File).superRefine((file, ctx) => {
        if (file.size > maxFileSize) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Ukuran file tidak boleh lebih dari 2MB",
            });
        }
    }),
});

const facilitatorSchema = baseSchema.extend({
    npwp: z
        .string()
        .length(16, "NPWP harus terdiri dari tepat 16 digit")
        .regex(/^\d+$/, "NPWP harus terdiri dari digit saja"),
    bank_number: z.coerce
        .number()
        .min(1, "Nomor Bank tidak boleh kosong")
        .transform(String),
    bank_name: z.string().min(1, "Nama Bank tidak boleh kosong"),
    owner_name: z.string().min(1, "Nama Pemilik tidak boleh kosong"),
});

const userSchema = baseSchema.extend({
    golongan: z.enum(
        [
            "1A",
            "2A",
            "3A",
            "4A",
            "5A",
            "6A",
            "7A",
            "8A",
            "9A",
            "1B",
            "2B",
            "3B",
            "4B",
            "5B",
            "6B",
            "7B",
            "8B",
            "9B",
            "1C",
            "2C",
            "3C",
            "4C",
            "5C",
            "6C",
            "7C",
            "8C",
            "9C",
            "1D",
            "2D",
            "3D",
            "4D",
            "5D",
            "6D",
            "7D",
            "8D",
            "9D",
        ],
        {
            invalid_type_error: "Golongan tidak valid",
        }
    ),
    institution_address: z.string().min(1, "Alamat Institusi tidak boleh kosong"),
    nakes_type: z.enum(
        [
            "Tenaga Medis",
            "Tenaga Psikologi Klinis",
            "Tenaga Keperawatan",
            "Tenaga Kebidanan",
            "Tenaga Kefarmasian",
            "Tenaga Kesehatan Masyarakat",
            "Tenaga Kesehatan Lingkungan",
            "Tenaga Gizi",
            "Tenaga Keterapian Fisik",
            "Tenaga Keteknisian Medis",
            "Tenaga Teknologi Biomedika",
            "Tenaga Kesehatan Tradisional",
        ],
        {
            invalid_type_error: "Nakes tidak valid",
            required_error: "Nakes harus dipilih",
        }
    ),
    residence_address: z.string().min(1, "Alamat tidak boleh kosong"),
    province: z.string().min(1, "Provinsi tidak boleh kosong"),
    regency: z.string().min(1, "Kabupaten/Kota tidak boleh kosong"),
});

const defaultSelected = roles[0];
let presentRole: Role = defaultSelected;

const RoleSelect = ({
                        roles,
                        emitRoleChange,
                        currentSelected,
                    }: {
    roles: Role[];
    emitRoleChange: (role: Role) => void;
    currentSelected: Role;
}) => {
    let [selected, setSelected] = useState(currentSelected);

    const roleBuilder = (currentRole: Role) => {
        const {id, label, value, svg} = currentRole;

        const handleSelect = () => {
            presentRole = currentRole;
            setSelected(currentRole);
            emitRoleChange(currentRole);
        };

        return (
            <Label
                key={id}
                className={`w-full col-span-1 rounded-md border-2 pb-2 transition ease-in-out duration-300 ${
                    selected === currentRole
                        ? "border-blue-500"
                        : "border-slate-200"
                }`}
            >
                <div className="flex w-full gap-2 justify-center relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-10 h-10 rounded-full p-2 transition ease-in-out duration-300' ${
                            selected === currentRole
                                ? "fill-blue-500"
                                : "fill-slate-400"
                        }`}
                        viewBox="0 0 24 24"
                    >
                        {svg}
                    </svg>
                    <RadioGroupItem
                        value={value}
                        className={`absolute top-1 right-2 transition ease-in-out duration-300 ${
                            selected === currentRole ? "border-blue-500" : ""
                        }`}
                        id={`role${id}`}
                        onClick={handleSelect}
                    />
                </div>
                <p
                    className={`text-center w-full transition ease-in-out duration-300 ${
                        selected === currentRole
                            ? "text-blue-500"
                            : "text-slate-400"
                    }`}
                >
                    {label}
                </p>
            </Label>
        );
    };

    return <>{roles.map(roleBuilder)}</>;
};

const UserFormBuilder = ({
                             emitRoleChange,
                             currentSelected,
                         }: {
    emitRoleChange: (role: Role) => void;
    currentSelected: Role;
}) => {
    const [next, setNext] = useState<boolean>(false);
    const [profilePicture, setProfilePicture] = useState<File | string>("");
    const [schema, setSchema] = useState(baseSchema);

    const props = usePage().props;
    const errorBe = props.errors;
    const genders: string[] = props.gender as string[];
    const educations: string[] = props.last_education as string[];
    const golongan: string[] = props.golongan as string[];
    const nakes: string[] = props.nakes_type as string[];
    const csrf = props.csrf_token;

    useEffect(() => {
        switch (currentSelected?.value) {
            case "facilitator":
                setSchema(facilitatorSchema);
                break;
            case "user":
                setSchema(userSchema);
                break;
            default:
                setSchema(baseSchema);
        }
    }, [currentSelected]);

    console.log(schema === facilitatorSchema);

    const submitHandler = (values: z.infer<typeof schema>) => {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("role", presentRole.value);
        formData.append("name", values.name);
        formData.append("username", values.username);
        formData.append("phone", values.phone);
        formData.append("password_confirmation", values.password_confirmation);
        formData.append("gender", values.gender);
        formData.append("nip", values.nip);
        formData.append("employee_position", values.employee_position);
        formData.append("employee_status", values.employee_status);
        formData.append("institution", values.institution);
        formData.append("profile_picture", values.profile_picture);
        formData.append("last_education", values.last_education);
        formData.append("_token", csrf);


        if (presentRole.value === "user") {
            formData.append('institution_address', values.institution_address)
            formData.append("golongan", values.golongan);
            formData.append("nakes_type", values.nakes_type);
            formData.append("residence_address", values.residence_address);
            formData.append("province", values.province);
            formData.append("regency", values.regency);
        }

        if (presentRole.value === "facilitator") {
            formData.append("npwp", values.npwp);
            formData.append("bank_number", values.bank_number);
            formData.append("bank_name", values.bank_name);
            formData.append("owner_name", values.owner_name);
        }

        router.post("/register", formData);
    };

    const submitErrorHandler = (errors: z.infer<typeof userSchema>) => {
        console.log(errors);
    };

    let {form, errors, isSubmitting, setFields} = useForm({
        extend: validator<z.infer<typeof schema>>({schema: schema}),
        onSubmit: submitHandler,
        onError: submitErrorHandler,
    });

    console.log(errors(), errorBe);

    return (
        <form method="POST" ref={form}>
            <div
                className={`flex flex-col gap-3 fade-in ${
                    next ? "hidden" : ""
                }`}
            >
                <h1 className="text-2xl font-semibold">Daftar</h1>
                <h3 className="text-lg">Daftar sebagai</h3>
                <RadioGroup
                    name="role"
                    defaultValue={currentSelected.value}
                    className="grid grid-cols-4 max-md:grid-cols-2 gap-3 p-2"
                >
                    <RoleSelect
                        roles={roles}
                        emitRoleChange={emitRoleChange}
                        currentSelected={currentSelected}
                    />
                </RadioGroup>

                <Label htmlFor="name">Nama</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Masukkan Nama Anda"
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">
                    {errors().name || errorBe.name}
                </span>

                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Masukkan Email Anda"
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">
                    {errors().email || errorBe.email}
                </span>

                <Label htmlFor="username">Nama Pengguna</Label>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Masukkan Nama Pengguna Anda"
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">
                    {errors().username || errorBe.username}
                </span>

                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Masukkan Nomor Telepon Anda"
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">
                    {errors().phone || errorBe.phone}
                </span>

                <Label htmlFor="password">Kata Sandi</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Masukkan Kata Sandi Anda"
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />

                <span className="text-red-500 text-sm">
                    {errors().password || errorBe.password}
                </span>
                <Label htmlFor="password_confirmation">
                    Konfirmasi Kata Sandi
                </Label>
                <Input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="Konfirmasi Kata Sandi Anda"
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">
                    {errors().password_confirmation ||
                        errorBe.password_confirmation}
                </span>
                <span
                    className="self-end rounded-xl px-5 cursor-pointer py-2 bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200"
                    onClick={() => setNext(true)}
                >
                    Next
                </span>
            </div>
            <div
                className={`flex flex-col gap-3 transition ease-in-out duration-300 ${
                    next ? "fade-in" : "fade-out hidden"
                }`}
            >
                <h1 className="text-2xl font-semibold">Data Pribadi</h1>
                <ProfilPictureUpload onFileChange={setProfilePicture}/>
                <span className="text-red-500 text-sm">
                    {errors().profile_picture || errorBe.profile_picture}
                </span>

                <Label htmlFor="gender">Gender</Label>
                <InputSelect
                    items={genders}
                    name="gender"
                    placeholder="Gender"
                />
                <span className="text-red-500 text-sm">
                    {errors().gender || errorBe.gender}
                </span>

                <Label htmlFor="nip">Nomor Induk Pegawai</Label>
                <Input
                    type="text"
                    name="nip"
                    id="nip"
                    placeholder="Masukkan Nomor Induk Pegawai Anda"
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">
                    {errors().nip || errorBe.nip}
                </span>

                <Label htmlFor="employee_position">Posisi Pegawai</Label>
                <Input
                    type="text"
                    name="employee_position"
                    id="employee_position"
                    placeholder="Masukkan Posisi Pegawai Anda"
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">
                    {errors().employee_position || errorBe.employee_position}
                </span>

                <Label htmlFor="institution">Institusi</Label>
                <Input
                    type="text"
                    name="institution"
                    id="institution"
                    placeholder="Masukkan Institusi Anda"
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">
                    {errors().institution || errorBe.institution}
                </span>

                {presentRole.value === "user" && (
                    <>
                        <Label htmlFor='institution_address'>Alamat Institusi</Label>
                        <Input type="text" name="institution_address" id='institution_address'
                               placeholder="Masukkan Alamat Institusi Anda"
                               className={`w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500`}/>
                        <span className="text-red-500 text-sm">
                            {errors().institution || errorBe.institution}
                        </span>
                    </>
                )}

                <Label htmlFor="employee_status">Status Pegawai</Label>
                <Input
                    type="text"
                    name="employee_status"
                    id="employee_status"
                    placeholder="Masukkan Status Pegawai Anda"
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-red-500 text-sm">
                    {errors().employee_status || errorBe.employee_status}
                </span>

                <Label htmlFor="last_education">Pendidikan Terakhir</Label>
                <InputSelect
                    items={educations}
                    name="last_education"
                    placeholder="Pendidikan Terakhir"
                />
                <span className="text-red-500 text-sm">
                    {errors().last_education || errorBe.last_education}
                </span>

                {presentRole.value == 'user' && (
                    <>
                        <Label htmlFor="golongan">Golongan</Label>
                        <InputSelect
                            items={golongan}
                            name="golongan"
                            placeholder="Golongan"
                        />
                        <span className="text-red-500 text-sm">
                    {errors().golongan || errorBe.golongan}
                </span>

                        <Label htmlFor="nakes_type">Nakes</Label>
                        <InputSelect
                            items={nakes}
                            name="nakes_type"
                            placeholder="Nakes"
                        />
                        <span className="text-red-500 text-sm">
                    {errors().nakes_type || errorBe.nakes_type}
                </span>
                        <Label htmlFor="residence_address">Alamat</Label>
                        <Input
                            type="text"
                            name="residence_address"
                            id="residence_address"
                            placeholder="Masukkan Alamat Anda"
                            className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                        />
                        <span className="text-red-500 text-sm">
                    {errors().residence_address || errorBe.residence_address}
                </span>
                        <ProvinceRegencySelect
                            errorsProv={errors().province}
                            errorsRegen={errors().regency}
                        />
                    </>
                )}

                {presentRole.value == 'facilitator' && (
                    <>
                        <Label htmlFor="npwp">NPWP</Label>
                        <Input
                            type="text"
                            name="npwp"
                            id="npwp"
                            placeholder="Masukkan NPWP Anda"
                            className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                        />
                        <span className="text-red-500 text-sm">
                    {errors().npwp || errorBe.npwp}
                </span>
                        <Label htmlFor="bank_number">Nomor Bank</Label>
                        <Input
                            type="number"
                            name="bank_number"
                            id="bank_number"
                            placeholder="Masukkan Nomor Bank Anda"
                            className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                        />
                        <span className="text-red-500 text-sm">
                    {errors().bank_number || errorBe.bank_number}
                </span>
                        <Label htmlFor="bank_name">Nama Bank</Label>
                        <Input
                            type="text"
                            name="bank_name"
                            id="bank_name"
                            placeholder="Masukkan Nama Bank Anda"
                            className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                        />
                        <span className="text-red-500 text-sm">
                    {errors().bank_name || errorBe.bank_name}
                </span>
                        <Label htmlFor="owner_name">Nama Pemilik</Label>
                        <Input
                            type="text"
                            name="owner_name"
                            id="owner_name"
                            placeholder="Masukkan Nama Pemilik Anda"
                            className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                        />
                        <span className="text-red-500 text-sm">
                    {errors().owner_name || errorBe.owner_name}
                </span>
                    </>
                )}

                <div className="flex gap-2 w-full justify-end">
                    <span
                        className="rounded-xl px-5 cursor-pointer py-1 text-sm flex items-center bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200"
                        onClick={() => setNext(false)}
                    >
                        Back
                    </span>
                    <Button
                        type="submit"
                        className="rounded-xl px-5 cursor-pointer py-2 bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200"
                        disabled={isSubmitting()}
                    >
                        Daftar
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default function Register() {
    const [role, setRoles] = useState<Role>(presentRole);

    return (
        <>
            <Head title="Daftar"/>

            <div className="flex h-[calc(100vh-6.7vh)] max-md:h-fit gap-3 max-md:px-5 overflow-hidden">
                <div
                    className="py-5 text-center w-2/3 max-md:hidden bg-[url('/public/storage/wallpaper1.jpeg')] bg-no-repeat bg-cover bg-center rounded-tr"/>
                <div className="p-5 text-left w-2/3 max-md:w-full overflow-y-auto">
                    <UserFormBuilder
                        emitRoleChange={setRoles}
                        currentSelected={role}
                    />
                </div>
            </div>
        </>
    );
}
