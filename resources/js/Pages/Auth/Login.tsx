import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Head, Link, usePage, router} from "@inertiajs/react";
import Turnstile, {useTurnstile} from "react-turnstile";
import {useForm} from "@felte/react";
import React, {useEffect} from "react";
import {validator} from "@felte/validator-zod";
import {z} from "zod";
import {Checkbox} from "@/components/ui/checkbox";
import {useToast} from "@/components/ui/use-toast"
import type {PageProps as InertiaPageProps} from '@inertiajs/core';

const schema = z.object({
    username: z.string().min(1, "Username tidak boleh kosong"),
    password: z.string().min(1, "Password tidak boleh kosong"),
    remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

interface PageProps extends InertiaPageProps {
    turnstile_site_key: string;
    csrf_token: string;
    errors: Record<string, string>;
    flash: { message?: string };
}

export default function Login() {
    const {turnstile_site_key, csrf_token, errors: propErrors, flash} = usePage<PageProps>().props;
    const {toast} = useToast();
    const turnstile = useTurnstile();

    const {form, errors, isSubmitting} = useForm<FormValues>({
        extend: validator({schema}),
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value?.toString() ?? '');
            });
            formData.append('_token', csrf_token);
            router.post('/login', formData);
        },
    });

    useEffect(() => {
        Object.entries(propErrors).forEach(([key, value]) => {
            toast({
                description: value,
                variant: "destructive",
                duration: 5000,
            });
        });

        if (flash?.message) {
            toast({
                description: flash.message,
                variant: "default",
                className: "bg-green-600 text-white fill-white",
                duration: 5000,
            });
        }
    }, [propErrors, flash, toast]);

    const handleCaptchaVerify = (token: string) => {
        fetch("/api/captcha", {
            method: "POST",
            body: JSON.stringify({token}),
        }).then(async (response) => {
            const json = await response.json();
            if (!response.ok && !json.status) {
                turnstile.reset();
            }
        });
    };

    return (
        <>
            <Head title="Masuk"/>
            <div className="flex h-[calc(100vh-8.2vh)] max-md:h-fit gap-3 max-md:px-5">
                <div className="py-5 text-center w-1/3 max-md:hidden bg-black bg-no-repeat bg-cover bg-center rounded"/>
                <div
                    className="py-5 text-left w-2/3 max-md:w-full p-5 h-full flex flex-col justify-center items-stretch align-middle">
                    <h1 className="text-3xl font-bold mb-7">Masuk</h1>
                    <form ref={form} className="flex flex-col gap-3 w-full h-full">
                        <FormField name="username" label="Username" type="text" errors={errors}/>
                        <FormField name="password" label="Password" type="password" errors={errors}/>

                        <Turnstile
                            sitekey={turnstile_site_key}
                            language='id'
                            onVerify={handleCaptchaVerify}
                        />

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" name="remember"/>
                            <Label htmlFor="remember">Ingat saya</Label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-400 transition-all duration-200 disabled:bg-slate-500"
                            disabled={isSubmitting()}
                        >
                            Masuk
                        </Button>
                    </form>
                    <p className="text-center text-slate-500 mt-2">
                        Belum punya akun?
                        <Link href="/register"
                              className="text-center text-blue-500 hover:text-blue-400 transition-all duration-200 ml-1 font-bold">
                            Buat Sekarang
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

interface FormFieldProps {
    name: keyof FormValues;
    label: string;
    type: string;
    errors: ReturnType<typeof useForm<FormValues>>['errors'];
}

const FormField: React.FC<FormFieldProps> = ({name, label, type, errors}) => (
    <>
        <Label htmlFor={name}>{label}</Label>
        <Input
            type={type}
            name={name}
            placeholder={label}
            className="w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500 px-3 py-2"
            id={name}
        />
        <span className="text-red-500">{errors()[name]}</span>
    </>
);
