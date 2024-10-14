import React, {useState} from 'react';
import {useForm} from '@felte/react';
import {useToast} from "@/components/ui/use-toast";
import {router, usePage} from '@inertiajs/react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";

const surveyQuestions = [
    {
        question: 'Kepala Unit Pelatihan memiliki visi dan misi pengembangan jangka Panjang',
        fieldName: 'question1',
    },
    {
        question: 'Kepala Unit Pelatihan memiliki kemampuan dalam pengambilan keputusan strategis',
        fieldName: 'question2',
    },
    {
        question: 'Kepala Unit Pelatihan melakukan pengelolaan sumber daya manusia yang transparan dan akuntabel',
        fieldName: 'question3',
    },
    {
        question: 'Kepala Unit Pelatihan berupaya melakukan pengembangan sarana dan prasarana penunjang pembelajaran',
        fieldName: 'question4',
    },
    {
        question: 'Kepala Unit Pelatihan memiliki komitmen pimpinan dalam peningkatan mutu penyelenggaraan pelatihan',
        fieldName: 'question5',
    },
    {
        question: 'Kepala Unit Pelatihan mampu membangun jejaring untuk mendorong terwujudnya tujuan organisasi',
        fieldName: 'question6',
    },
    {
        question: 'Kepala Unit Pelatihan mampu mendorong profesionalisme pegawai',
        fieldName: 'question7',
    },
    {
        question: 'Kepala Unit Pelatihan memiliki mekanisme penyampaian feedback bagi manajemen institusi',
        fieldName: 'question8',
    },
    {
        question: 'Kepala Unit Pelatihan mendorong inovasi untuk pencapaian tujuan organisasi',
        fieldName: 'question9',
    },
    {
        question: 'Kepala Unit Pelatihan mempunyai Integritas pimpinan',
        fieldName: 'question10',
    },
];

const SurveyForm: React.FC = () => {
    const {toast} = useToast();
    const {props} = usePage();
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

    const {form, reset} = useForm({
        onSubmit: (values) => {
            // Format data sebelum dikirim
            const formattedResponses = surveyQuestions.map((question, index) => ({
                training_id: props.trainingId,
                // @ts-ignore
                users_id: props.user.id,
                question: question.question,
                survey_type: "leadership",
                score: values[question.fieldName],
                suggestion: values[`${question.fieldName}_suggestion`] || null,
            }));

            // @ts-ignore
            router.post(`/${props.user.role}/training/survey`, {
                // @ts-ignore
                responses: formattedResponses,
                // @ts-ignore
                comment: {
                    training_id: props.trainingId,
                    // @ts-ignore
                    users_id: props.user.id,
                    comment: values.comment || null,
                    survey_type: "criticism_and_suggestion",
                },
            }, {
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Survey submitted successfully.",
                        variant: "default",
                    });
                    reset();
                    // @ts-ignore
                    window.location = `/${props.user.role}/training/${props.trainingId}`
                },
                onError: () => {
                    toast({
                        title: "Error",
                        description: "An error occurred while submitting the survey.",
                        variant: "destructive",
                    });
                },
            });
        },
    });

    const handleRadioChange = (fieldName: string) => {
        setAnsweredQuestions(prev => {
            const newSet = new Set(prev);
            newSet.add(fieldName);
            return newSet;
        });
    };

    const isSubmitDisabled = answeredQuestions.size < surveyQuestions.length;

    return (
        <div className="px-4">
            <Card className="w-full my-8 py-4">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold px-4">
                        KUESIONER SURVEI KEPEMIMPINAN KEPALA UNIT PELATIHAN RSUD PRAMBANAN
                    </CardTitle>
                    <CardDescription className="px-4">
                        Isi survei untuk memberikan penilaian dan saran terkait kepemimpinan kepala unit pelatihan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form ref={form} className="space-y-4">
                        {surveyQuestions.map((question, index) => (
                            <Card key={index} className="mb-4">
                                <CardHeader className="bg-gray-50 p-4">
                                    <CardTitle className="text-lg font-semibold">
                                        {(index + 1) + ". " + question.question}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-2">
                                        {["Sangat Baik", "Baik", "Cukup", "Kurang", "Sangat Kurang"].map(
                                            (option, i) => (
                                                <Label key={i} className="flex items-center gap-2">
                                                    <Input
                                                        type="radio"
                                                        name={question.fieldName}
                                                        value={i + 1} // Use index as value
                                                        required
                                                        className="mr-2 h-4 w-4"
                                                        onChange={() => handleRadioChange(question.fieldName)}
                                                    />
                                                    {option}
                                                </Label>
                                            )
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <Label className="font-medium">Saran:</Label>
                                        <Textarea
                                            name={`${question.fieldName}_suggestion`}
                                            className="w-full p-2 border rounded-md mt-1"
                                            rows={2}
                                            placeholder="Masukkan saran Anda"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Card className="my-4">
                            <CardHeader className="bg-gray-50 p-2">
                                <CardTitle className="text-lg font-semibold">
                                    Kritik dan Saran Umum
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <Textarea
                                    name="comment"
                                    className="w-full p-2 border rounded-md"
                                    rows={3}
                                    placeholder="Masukkan kritik dan saran Anda"
                                />
                            </CardContent>
                        </Card>

                        <Button
                            type="submit"
                            disabled={isSubmitDisabled}
                            className={`px-3 py-1 bg-primary text-white rounded-md transition duration-300 ${
                                isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
                            }`}
                        >
                            Submit Survey
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default SurveyForm;
