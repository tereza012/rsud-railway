import { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
    Select as Sel,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Select from "react-select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "@felte/react";
import { z } from "zod";
import { validator } from "@felte/validator-zod";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export const TrainingCreateSchemaValue = z
    .object({
        type: z.string().min(1),
        description: z.string().min(1),
        name: z.string().min(1),
        purpose: z.string().min(1),
        signup_start: z.coerce.date(),
        signup_end: z.coerce.date(),
        training_start: z.coerce.date(),
        training_end: z.coerce.date(),
        batch: z.number().min(1),
        capacity: z.number().min(1),
        skp: z.number().min(1),
        jpl: z.number().min(0),
        cost: z.number().min(1),
        cp: z.string().min(1),
        whatsapp_link: z.string().min(1),
        competences: z.array(z.string().min(1)).nonempty(),
        target_type: z.array(z.string().min(1)).nonempty(),
    })
    .superRefine(({ signup_start, signup_end, training_start }: any, ctx) => {
        const signStart = new Date(signup_start);
        const signEnd = new Date(signup_end);
        const trainStart = new Date(training_start);

        if (trainStart < signStart && trainStart < signEnd) {
            ctx.addIssue({
                code: "custom",
                message:
                    "Periode pelatihan tidak boleh kurang dari periode pendaftaran",
                path: ["training_start"],
            });
        }
    });

const TrainingTypesBuilder = ({
    selectedTypes,
    trainingTypes,
    callback,
}: {
    selectedTypes: string;
    trainingTypes: string[];
    callback: (selected: string) => void;
}) => {
    const [selected, setSelected] = useState<string>(selectedTypes);
    const handleChange = (value: string) => {
        setSelected(value);
        callback(value);
    };

    useEffect(() => {
        if (selectedTypes === "" || !selectedTypes) return;
        setSelected(selectedTypes);
    }, [selectedTypes]);

    return (
        <Label className="text-sm font-medium flex flex-col gap-1 col-span-1 max-md:col-span-full">
            Jenis Pelatihan
            <Sel name="type" value={selected} onValueChange={handleChange}>
                <SelectTrigger className="w-full">
                    <SelectValue
                        placeholder={
                            selected ? selected : "Pilih Jenis Pelatihan"
                        }
                        aria-label={selected}
                    />
                </SelectTrigger>
                <SelectContent>
                    {trainingTypes.map((item: string) => (
                        <SelectItem
                            key={new Date().getTime() % Math.random()}
                            value={item}
                        >
                            {item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Sel>
        </Label>
    );
};

interface TraineeTarget {
    id?: number,
    target_type: string,
}

const TraineesTargetsBuilder = ({
    selectedTargets,
    trainingTargets,
    callback,
}: {
    selectedTargets?: TraineeTarget[];
    trainingTargets: string[];
    callback: (selected: string[]) => void;
}) => {
    const [selected, setSelected] = useState<string[]>([]);
    const options: { value: string; label: string }[] = [];
    const [preloaded, setPreloaded] = useState<TraineeTarget[]>(selectedTargets || []);

    trainingTargets.map((item: string) => {
        options.push({ value: item, label: item });
    });

    const modifyPreload = (item: string[]) => {
        const filteredPreload = preloaded.filter((val: any) => item.some((someVal: any) => val.target_type === someVal));
        const filteredItem = item.filter((val: any) => !filteredPreload.some((someVal: any) => val === someVal.target_type));

        const preparedValues: any[] = [...filteredPreload];
        filteredItem.map((item: any) => {
            preparedValues.push({ target_type: item });
        });

        return preparedValues;
    }

    const handleChange = (content: any) => {
        const values = content.map((item: any) => item.value);

        const preparedValues = modifyPreload(values);
        console.log(preparedValues)

        setSelected(values);
        callback(values);
    };

    return (
        <Select
            defaultValue={options.map(
                (item: any) =>
                    preloaded?.map((item: any) => item.target_type).includes(item.value) ? item : null
            ).filter(item => item !== null)}
            isMulti
            name={`target_type[${selected.length - 1 >= 0 ? selected.length - 1 : 0
                }]`}
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Target Peserta (Tenaga Medis dll)"
            onChange={handleChange}
        />
    );
};

const RangeDateTimeBuilder = ({
    name,
    className,
    callback,
    presetDate,
}: {
    name: string;
    className: string;
    callback: (rangeDate: DateRange | undefined, name: string) => void;
    presetDate: DateRange;
}) => {
    const [date, setDate] = useState<DateRange>({
        from: presetDate?.from || new Date(),
        to: presetDate?.to || addDays(new Date(), 2),
    });

    const changeDate = (date: DateRange | undefined) => {
        if (!date) return;
        setDate(date);

        if (callback && date?.to) callback(date, name);
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date?.from, "LLL dd, y")} - {" "}
                                    {format(date?.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date?.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={changeDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
            <Input
                type="text"
                name={`${name}_start`}
                value={(date?.from)?.toString()}
                placeholder="Periode Pelatihan"
                hidden
                readOnly
                className="hidden"
            />
            <Input
                type="text"
                name={`${name}_end`}
                value={date.to ? (date?.to)?.toString() : ""}
                placeholder="Periode Pelatihan"
                hidden
                readOnly
                className="hidden"
            />
        </div>
    );
};

interface InputText {
    name: string;
    value: string;
}

const InputBuilder = ({
    name,
    callback,
    className,
    value,
    err,
}: {
    name: string;
    className?: string;
    callback?: (name: string, value: string) => void;
    value?: string;
    err: string | null;
}) => {
    const [currentValue, setCurrentValue] = useState<string>(value ?? "");

    const handleChange = (event: any) => {
        setCurrentValue(event.target.value);
        // if (callback) callback(name, event.target.value);
    };
    const handleKeyDown = (event: any) => {
        if (event.key !== 'Enter') return;
        if (callback) callback(name, event.target.value);
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <Input
                type="text"
                name={name}
                className={className}
                placeholder=""
                defaultValue={currentValue}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />
            <span className="text-xs text-slate-400">*Tekan Enter untuk Konfirmasi</span>
            <span className="text-sm text-red-500">{err}</span>
        </div>
    );
};

interface CompetencesContent {
    id?: number;
    name_competences: string;
}

const CompetencesBuilder = ({
    content,
    handler,
    errors,
}: {
    content: CompetencesContent[];
    handler?: (inputs: CompetencesContent[]) => void;
    errors: string[] | null | null[];
}) => {
    const name = "competences";
    const [preloaded, setPreloaded] = useState<CompetencesContent[]>(content || []);
    const [input, setInput] = useState<InputText[]>(
        content.length > 0
            ? content?.map((item: CompetencesContent) => {
                return { name: name, value: item.name_competences };
            })
            : [{ name, value: "" }]
    );

    const handleAddInput = (name: string, value: string, index: number) => {
        setInput([...input, { name, value }]);
    };

    const handleRemoveInput = (index: number) => {
        setInput(input.filter((item: InputText, i: number) => i !== index));
    };

    const dismantleInput = (item: InputText[]) => {
        const filteredPreload = preloaded
            .filter((val: CompetencesContent) =>
                item.some((someVal: InputText) =>
                    val.name_competences === someVal.value
                )
            );
        const filteredItem = item.filter(
            (val: InputText) =>
                !filteredPreload.some(
                    (someVal: CompetencesContent) =>
                        val.value === someVal.name_competences
                )
        );

        const preparedValues: any[] = [...filteredPreload];
        filteredItem.map((item: InputText) => {
            preparedValues.push({ name_competences: item.value });
        });

        return preparedValues;
    };

    const handleInputChange = (name: string, value: string) => {
        const dispatchedName = name.split("[")[1].replace("]", "");
        const newInputs = input.map((item: InputText, i: number) => {
            if (i === Number.parseInt(dispatchedName)) {
                return { ...item, value: value };
            }

            return item;
        })

        setInput(newInputs);

        if (handler) {
            const parsedInput = dismantleInput(newInputs);
            handler(parsedInput);
        }
    };

    //useEffect(() => {
    //    if (content.length > 0)
    //        setInput(content.map((item: CompetencesContent) => {
    //            return { name: name, value: item.name_competences }
    //        }))
    //    forceUpdate((prev) => prev + 1);
    //}, []);
    //
    //useEffect(() => {
    //    if (content.length > 0)
    //        setInput(
    //            content.map((item: CompetencesContent) => {
    //                return { name: name, value: item.name_competences };
    //            })
    //        );
    //    forceUpdate((prev) => prev + 1);
    //}, [content]);

    return (
        <div className="flex gap-2 justify-center align-middle">
            <Label className="flex flex-col gap-1 w-full">
                <span className="text-sm font-bold">Kompetensi</span>
                {
                    input && input.map((item: InputText, i: number) => {
                        return (
                            <div className="flex gap-2 w-full" key={JSON.stringify(item) + i}>
                                <InputBuilder
                                    name={`${name}[${i}]`}
                                    callback={handleInputChange}
                                    className="w-full"
                                    value={item.value}
                                    err={errors && errors.keys.length > 0 ? errors[i] : null}
                                />
                                <Button
                                    type="button"
                                    className="w-fit justify-start text-left font-normal bg-blue-500 fill-white"
                                    onClick={() =>
                                        handleAddInput(`${name}`, "", input.length)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                                    </svg>
                                </Button>
                                {i > 0 && (
                                    <Button
                                        type="button"
                                        className="w-fit justify-start text-left font-normal bg-red-500 fill-white"
                                        onClick={() => handleRemoveInput(i)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M5 11h14v2H5z"></path>
                                        </svg>
                                    </Button>
                                )}
                            </div>
                        )
                    })
                }
            </Label>
        </div>
    );
};

const PostData = async (data: any, id: number) => {
    const res = await axios.post(`/api/admin/training/phase1/${id}`, data);
    console.log(res);
    return res.data;
}

export default function TrainingTab({
    NextButton,
    training,
    trainingTypes,
    trainingTargets,
}: {
    NextButton: () => void;
    training: any;
    trainingTypes: string[];
    trainingTargets: string[];
}) {
    const props = usePage().props;
    const csrf = props.csrf_token;
    const [formStatus, setFormStatus] = useState(false);
    const [formStores, setFormStores] = useState<any>(
        training ||
        {
            name: "",
            description: "",
            purpose: "",
            signup_start: new Date(),
            signup_end: addDays(new Date(), 2),
            training_start: new Date(),
            training_end: addDays(new Date(), 2),
            type: "",
            batch: 0,
            capacity: 0,
            skp: 0,
            jpl: 0,
            cost: 0,
            cp: "",
            whatsapp_link: "",
            competences: [],
            target_type: [],
        });
    const { toast } = useToast();

    const handleSubmit = async (
        value: z.infer<typeof TrainingCreateSchemaValue>,
        ctx: any
    ) => {
        ctx.event.preventDefault();

        if (value.target_type[0] === "") {
            toast({
                title: "Gagal",
                description: "Target peserta tidak boleh kosong",
                variant: "destructive",
                duration: 5000,
            });
            ctx.abort();
        }

        const body = {
            name: formStores.name,
            description: formStores.description,
            purpose: formStores.purpose,
            signup_start: format(formStores.signup_start, "yyyy-MM-dd"),
            signup_end: format(formStores.signup_end, "yyyy-MM-dd"),
            training_start: format(formStores.training_start, "yyyy-MM-dd"),
            training_end: format(formStores.training_end, "yyyy-MM-dd"),
            type: formStores.type,
            batch: formStores.batch,
            capacity: formStores.capacity,
            skp: formStores.skp,
            jpl: formStores.jpl,
            cost: formStores.cost,
            cp: formStores.cp,
            whatsapp_link: formStores.whatsapp_link,
            competences: formStores.competences,
            target_type: formStores.target_type,
            _method: 'PUT',
            _csrf: csrf,
        }

        const result = await PostData(body, training.id);
        console.log(result);
        if (result.success) {
            toast({
                title: "Berhasil",
                description: result.message,
                variant: "default",
                duration: 5000,
            });

            setFormStatus(true);

            router.reload({ only: ['training'] })
            NextButton();
        } else {
            toast({
                title: "Gagal",
                description: result.message,
                variant: "destructive",
                duration: 5000,
            });
        }
    };

    let { form, errors, isSubmitting, setFields } = useForm({
        extend: validator<z.infer<typeof TrainingCreateSchemaValue>>({
            schema: TrainingCreateSchemaValue,
        }),
        onSubmit: handleSubmit,
        onError: (errors) => {
            console.error(errors);
        },
    });

    const handleInputChange = (event: any) => {
        setFormStores({
            ...formStores,
            [event.target.name]: event.target.value,
        });
    };

    const handleDateRangeChange = (
        date: DateRange | undefined,
        name: string
    ) => {
        if (date?.from) {
            setFormStores({ ...formStores, [`${name}_start`]: date?.from });
            switch (name) {
                case "signup":
                    setFields('signup_start', date.from);
                    break;
                case "training":
                    setFields('training_start', date.from);
                    break;
            }
        }
        if (date?.to) {
            setFormStores({ ...formStores, [`${name}_end`]: date?.to });
            switch (name) {
                case "signup":
                    setFields('signup_end', date.to);
                    break;
                case "training":
                    setFields('training_end', date.to);
                    break;
            }
        }
    };

    const handleCompetencesChange = (inputs: CompetencesContent[]) => {
        console.log(inputs);
        setFormStores({ ...formStores, competences: inputs });
    };

    const handleTypeChange = (selected: string) => {
        setFormStores({ ...formStores, type: selected });
    };

    const handleTargetChange = (selected: any[]) => {
        setFormStores({ ...formStores, target_type: selected });
    };

    return (
        <TabsContent value="training" className="w-full px-3 py-1">
            <h4 className="text-lg font-bold">Detail Pelatihan</h4>
            <div className="flex flex-col gap-3">
                <form
                    ref={form}
                    className="grid max-md:grid-cols-1 grid-cols-2 gap-4 py-2"
                >
                    <Input
                        type="text"
                        readOnly
                        name="_token"
                        className="hidden"
                        value={csrf?.toString()}
                    />
                    <TrainingTypesBuilder
                        selectedTypes={formStores.type}
                        trainingTypes={trainingTypes}
                        callback={handleTypeChange}
                    />
                    <Label>
                        <span className="text-sm font-bold">
                            Nama Pelatihan
                        </span>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Nama Pelatihan"
                            defaultValue={formStores.name}
                            onChange={handleInputChange}
                        />
                        <span className="text-sm text-red-500">
                            {errors().name}
                        </span>
                    </Label>
                    <Label>
                        <span className="text-sm font-bold">
                            Deskripsi Pelatihan
                        </span>
                        <Input
                            type="text"
                            name="description"
                            placeholder="Deskripsi Pelatihan"
                            defaultValue={formStores?.description}
                            onChange={handleInputChange}
                        />
                        <span className="text-sm text-red-500">
                            {errors().description}
                        </span>
                    </Label>
                    <Label className="text-sm font-medium flex flex-col gap-1 col-span-1 max-md:col-span-full">
                        Target Peserta
                        <TraineesTargetsBuilder
                            selectedTargets={
                                formStores && formStores.target_type
                            }
                            trainingTargets={trainingTargets}
                            callback={handleTargetChange}
                        />
                        <span className="text-sm text-red-500">
                            {errors()?.target_type}
                        </span>
                    </Label>
                    <Label
                        className="mb-2"
                    >
                        <span className="text-sm font-bold">
                            Tujuan Pelatihan
                        </span>
                        <Textarea
                            name="purpose"
                            className="h-full"
                            placeholder="Tujuan Pelatihan"
                            defaultValue={formStores && formStores.purpose}
                            onChange={handleInputChange}
                        />
                        <span
                            className="text-sm text-red-500"
                            key={new Date().getTime() % Math.random()}
                        >
                            {errors().purpose}
                        </span>
                    </Label>
                    <div className="w-full">
                        <CompetencesBuilder
                            content={formStores.competences}
                            errors={errors()?.competences ?? null}
                            handler={handleCompetencesChange}
                        />
                    </div>
                    <Label>
                        <span className="text-sm font-bold">
                            Periode Pendaftaran
                        </span>
                        <RangeDateTimeBuilder
                            name="signup"
                            className="w-full"
                            presetDate={
                                {
                                    from: new Date(formStores.signup_start),
                                    to: new Date(formStores.signup_end),
                                }
                            }
                            callback={handleDateRangeChange}
                        />
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-red-500">
                                {errors().signup_start}
                            </span>
                            <span className="text-sm text-red-500">
                                {errors().signup_end}
                            </span>
                        </div>
                    </Label>
                    <Label>
                        <span className="text-sm font-bold">
                            Periode Pelatihan
                        </span>
                        <RangeDateTimeBuilder
                            name="training"
                            className="w-full"
                            presetDate={
                                {
                                    from: new Date(formStores.training_start),
                                    to: new Date(formStores.training_end),
                                }
                            }
                            callback={handleDateRangeChange}
                        />
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-red-500">
                                {errors().training_start}
                            </span>
                            <span className="text-sm text-red-500">
                                {errors().training_end}
                            </span>
                        </div>
                    </Label>
                    <Label>
                        <span className="text-sm font-bold">
                            Gelombang / Batch
                        </span>
                        <Input
                            type="number"
                            name="batch"
                            placeholder="Gelombang / Batch"
                            defaultValue={formStores ? formStores.batch : null}
                            onChange={handleInputChange}
                        />
                        <span className="text-sm text-red-500">
                            {errors().batch}
                        </span>
                    </Label>
                    <Label>
                        <span className="text-sm font-bold">
                            Kuota Pelatihan
                        </span>
                        <Input
                            type="number"
                            name="capacity"
                            placeholder="Kuota Pelatihan"
                            defaultValue={formStores ? formStores.capacity : null}
                            onChange={handleInputChange}
                        />
                        <span className="text-sm text-red-500">
                            {errors().capacity}
                        </span>
                    </Label>
                    <Label>
                        <span className="text-sm font-bold">
                            Biaya Pelatihan
                        </span>
                        <Input
                            type="number"
                            name="cost"
                            placeholder="Kuota Pelatihan"
                            defaultValue={formStores ? formStores.cost : null}
                            onChange={handleInputChange}
                        />
                        <span className="text-sm text-red-500">
                            {errors().cost}
                        </span>
                    </Label>
                    <Label>
                        <span className="text-sm font-bold">Jumlah SKP</span>
                        <Input
                            type="number"
                            name="skp"
                            placeholder="Jumlah SKP"
                            defaultValue={formStores ? formStores.skp : null}
                            onChange={handleInputChange}
                        />
                        <span className="text-sm text-red-500">
                            {errors().skp}
                        </span>
                    </Label>
                    <Label>
                        <span className="text-sm font-bold">Jumlah JPL</span>
                        <Input
                            type="number"
                            name="jpl"
                            placeholder="Jumlah JPL"
                            defaultValue={formStores ? formStores.jpl : null}
                            onChange={handleInputChange}
                        />
                        <span className="text-sm text-red-500">
                            {errors().jpl}
                        </span>
                    </Label>
                    <Label>
                        <span className="text-sm font-bold">CP</span>
                        <Input
                            type="text"
                            name="cp"
                            placeholder="CP"
                            defaultValue={formStores ? formStores.cp : null}
                            onChange={handleInputChange}
                        />
                        <span className="text-sm text-red-500">
                            {errors().cp}
                        </span>
                    </Label>
                    <Label className="max-md:col-span-1 col-span-full">
                        <span className="text-sm font-bold">
                            Link WA (WhatsApp)
                        </span>
                        <Input
                            type="url"
                            name="whatsapp_link"
                            placeholder="Link WA"
                            defaultValue={formStores ? formStores.whatsapp_link : null}
                            onChange={handleInputChange}
                        />
                        <span className="text-sm text-red-500">
                            {errors().whatsapp_link}
                        </span>
                    </Label>
                    <div className="col-span-full flex justify-end">
                        <Button
                            type="submit"
                            className="w-fit justify-start text-left font-normal bg-slate-500 text-white"
                            disabled={isSubmitting()}
                        >
                            Lanjutkan
                        </Button>
                    </div>
                </form>
            </div>
        </TabsContent>
    );
}

