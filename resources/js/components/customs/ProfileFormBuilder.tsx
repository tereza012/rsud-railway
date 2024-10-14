import ProfilPictureUpload from "@/components/customs/ProfilPictureUpload.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import InputSelect from "@/components/customs/InputSelect.tsx";
import ProvinceRegencySelect from "@/components/customs/ProvinceRegencySelect.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {user, userInfo} from '@/lib/interfaces/userInterface.ts';
import React, {useState} from "react";
import {useForm} from "@felte/react";
import {validator} from "@felte/validator-zod";
import {z} from "zod";
import {router} from "@inertiajs/react";

function ProfileFormBuilder({user, userInfo, role, props, schema}: {
    user: user,
    userInfo: userInfo,
    role: string,
    props: any,
    schema: z.ZodObject<any>
}) {

    const errorBe = props.errors;
    const [userData, setUserData] = useState<user>(user);
    const [personalData, setPersonalData] = useState<userInfo>(userInfo);

    const handleSubmit = (values: z.infer<typeof schema>) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('username', values.username);
        formData.append('phone', values.phone);
        formData.append('email', values.email);
        formData.append('password', values?.password);
        formData.append('gender', values.gender);
        formData.append('nip', values.nip);
        formData.append('employee_position', values.employee_position);
        formData.append('institution', values.institution);
        formData.append('institution_address', values.institution_address);
        formData.append('employee_status', values.employee_status);
        formData.append('last_education', values.last_education);
        formData.append('profile_picture', values?.profile_picture);

        formData.append('province', values?.province);
        formData.append('regency', values?.regency);
        formData.append('residence_address', values?.residence_address);
        formData.append('golongan', values?.golongan);
        formData.append('nakes_type', values?.nakes_type);

        formData.append('npwp', values?.npwp);
        formData.append('bank_number', values?.bank_number);
        formData.append('bank_name', values?.bank_name);
        formData.append('owner_name', values?.owner_name);

        formData.append('_token', props.csrf_token);
        formData.append('_method', 'PUT');

        router.post(`/${user.role}/profile/${user.id}`, formData);
    }

    let {form, errors, isSubmitting} = useForm({
        extend: validator<z.infer<typeof schema>>({
            schema: schema,
        }),
        onSubmit: handleSubmit,
        onError: (errors) => {
            console.log(errors);
        }
    })

    return (
        <form ref={form} className="flex flex-col w-full gap-4 px-8 justify-center items-center">
            <div className='lg:w-[80vh] max-lg:w-full flex flex-col gap-4'>
                <ProfilPictureUpload
                    onFileChange={(file) => console.log(file)}
                    value={personalData.profile_picture}/>
                <span className="text-sm text-red-500">{errors().profile_picture || errorBe.profile_picture}</span>

                <Label htmlFor='name'>Nama</Label>
                <Input
                    type="text"
                    name="name"
                    id='name'
                    placeholder="Masukkan Nama Anda"
                    defaultValue={userData.name}
                    onChange={(e: any) => setUserData({...userData, name: e.target.value})}
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-sm text-red-500">{errors().name || errorBe.name}</span>

                <Label htmlFor='username'>Username</Label>
                <Input
                    type="text"
                    name="username"
                    id='username'
                    placeholder="Masukkan Username Anda"
                    defaultValue={userData.username}
                    onChange={(e: any) => setUserData({...userData, username: e.target.value})}
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-sm text-red-500">{errors().username || errorBe.username}</span>

                <Label htmlFor='phone'>Phone</Label>
                <Input
                    type="tel"
                    name="phone"
                    id='phone'
                    placeholder="Masukkan Nomor Telepon Anda"
                    defaultValue={userData.phone}
                    onChange={(e: any) => setUserData({...userData, phone: e.target.value})}
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"
                />
                <span className="text-sm text-red-500">{errors().phone || errorBe.phone}</span>

                <Label htmlFor='email'>Email</Label>
                <Input
                    type="email"
                    name="email"
                    id='email'
                    placeholder="Masukkan Email Anda"
                    defaultValue={userData.email}
                    onChange={(e: any) => setUserData({...userData, email: e.target.value})}
                    className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                <span className="text-sm text-red-500">{errors().email || errorBe.email}</span>

                <Label htmlFor='password'>Password</Label>
                <Input type="password" name="password" id='password'
                       placeholder="Kosongi jika tidak ingin mengganti password"
                       className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                <span className="text-sm text-red-500">{errors().password || errorBe.password}</span>

                <Label htmlFor='gender'>Jenis Kelamin</Label>
                <InputSelect
                    items={['Laki-laki', 'Perempuan']}
                    name={'gender'}
                    placeholder={'Jenis Kelamin'}
                    value={personalData.gender}
                    onValueChange={(value) => setPersonalData({...personalData, gender: value})}
                />
                <span className="text-sm text-red-500">{errors().gender || errorBe.gender}</span>

                <Label htmlFor='nip'>NIP</Label>
                <Input type="text" name="nip" id='nip' placeholder="Masukkan NIP Anda"
                       defaultValue={personalData.nip}
                       onChange={(e: any) => setPersonalData({...personalData, nip: e.target.value})}
                       className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                <span className="text-sm text-red-500">{errors().nip || errorBe.nip}</span>

                <Label htmlFor='employee_position'>Jabatan</Label>
                <Input type="text" name="employee_position" id='employee_position'
                       placeholder="Masukkan Jabatan Anda"
                       defaultValue={personalData.employee_position}
                       onChange={(e: any) => setPersonalData({...personalData, employee_position: e.target.value})}
                       className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                <span className="text-sm text-red-500">{errors().employee_position || errorBe.employee_position}</span>

                <Label htmlFor='institution'>Institusi</Label>
                <Input type="text" name="institution" id='institution'
                       placeholder="Masukkan Institusi Anda"
                       defaultValue={personalData.institution}
                       onChange={(e: any) => setPersonalData({...personalData, institution: e.target.value})}
                       className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                <span className="text-sm text-red-500">{errors().institution || errorBe.institution}</span>

                {role == 'user' && (
                    <>
                        <Label htmlFor='institution_address'>Alamat Institusi</Label>
                        <Input type="text" name="institution_address" id='institution_address'
                               placeholder="Masukkan Alamat Institusi Anda"
                               defaultValue={personalData.institution_address}
                               onChange={(e: any) => setPersonalData({
                                   ...personalData,
                                   institution_address: e.target.value
                               })}
                               className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                        <span
                            className="text-sm text-red-500">{errors().institution_address || errorBe.institution_address}</span>
                    </>
                )}

                <Label htmlFor='employee_status'>Status Pegawai</Label>
                <Input type="text" name="employee_status" id='employee_status'
                       placeholder="Masukkan Status Pegawai Anda"
                       defaultValue={personalData.employee_status}
                       onChange={(e: any) => setPersonalData({...personalData, employee_status: e.target.value})}
                       className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                <span className="text-sm text-red-500">{errors().employee_status || errorBe.employee_status}</span>

                <Label htmlFor='last_education'>Pendidikan Terakhir</Label>
                <InputSelect
                    items={props.lastEducationEnum as string[]}
                    name='last_education'
                    placeholder='Pendidikan Terakhir'
                    value={personalData.last_education}
                    onValueChange={(value) => setPersonalData({...personalData, last_education: value})}
                />
                <span className="text-sm text-red-500">{errors().last_education || errorBe.last_education}</span>

                {role == 'user' && (
                    <>
                        <Label htmlFor='golongan'>Golongan</Label>
                        <InputSelect
                            items={props.golonganEnum as string[]}
                            name="golongan"
                            placeholder="Golongan"
                            value={personalData.golongan}
                            onValueChange={(value) => setPersonalData({...personalData, golongan: value})}
                        />
                        <span className="text-sm text-red-500">{errors().golongan || errorBe.golongan}</span>

                        <Label htmlFor='nakes_type'>Tipe Nakes</Label>
                        <InputSelect
                            items={props.nakesEnum as string[]}
                            name="nakes_type"
                            placeholder="Tipe Nakes"
                            value={personalData.nakes_type}
                            onValueChange={(value) => setPersonalData({...personalData, nakes_type: value})}
                        />
                        <span className="text-sm text-red-500">{errors().nakes_type || errorBe.nakes_type}</span>

                        <Label htmlFor='residence_address'> Alamat Tinggal</Label>
                        <Input
                            type="text"
                            name="residence_address"
                            id='residence_address'
                            placeholder="Masukkan Alamat Tinggal Anda"
                            defaultValue={personalData.residence_address}
                            onChange={(e: any) => setPersonalData({...personalData, residence_address: e.target.value})}
                            className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                        <span className="text-sm text-red-500">{errors().residence_address}</span>

                        <ProvinceRegencySelect valueRegen={userInfo.regency}
                                               valueProv={userInfo.province} errorsProv={errors().province}
                                               errorsRegen={errors().regency}/>
                    </>
                )}

                {role === 'facilitator' && (
                    <>
                        <Label htmlFor='npwp'>NPWP</Label>
                        <Input type="text" name="npwp" id='npwp' placeholder="Masukkan NPWP Anda"
                               defaultValue={personalData.npwp}
                               onChange={(e: any) => setPersonalData({...personalData, npwp: e.target.value})}
                               className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                        <span className="text-sm text-red-500">{errors().npwp || errorBe.npwp}</span>

                        <Label htmlFor='bank_number'>Nomor Rekening</Label>
                        <Input type="text" name="bank_number" id='bank_number'
                               placeholder="Masukkan Nomor Rekening Anda"
                               defaultValue={personalData.bank_number}
                               onChange={(e: any) => setPersonalData({...personalData, bank_number: e.target.value})}
                               className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                        <span className="text-sm text-red-500">{errors().bank_number || errorBe.bank_number}</span>

                        <Label htmlFor='bank_name'>Nama Bank</Label>
                        <Input type="text" name="bank_name" id='bank_name'
                               placeholder="Masukkan Nama Bank Anda"
                               defaultValue={personalData.bank_name}
                               onChange={(e: any) => setPersonalData({...personalData, bank_name: e.target.value})}
                               className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                        <span className="text-sm text-red-500">{errors().bank_name || errorBe.bank_name}</span>

                        <Label htmlFor='owner_name'>Nama Pemilik Rekening</Label>
                        <Input type="text" name="owner_name" id='owner_name'
                               placeholder="Masukkan Nama Pemilik Rekening Anda"
                               defaultValue={personalData.owner_name}
                               onChange={(e: any) => setPersonalData({...personalData, owner_name: e.target.value})}
                               className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"/>
                        <span className="text-sm text-red-500">{errors().owner_name || errorBe.owner_name}</span>
                    </>
                )}
                <Button type="submit" className="self-end mt-6" disabled={isSubmitting()}>Submit</Button>
            </div>
        </form>
    );
}

export default ProfileFormBuilder;
