import InputText from "@/components/customs/InputText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import type { TrainingCreationTab, TrainingPhase } from "@/Pages/App/Admin/Training";
import { router } from "@inertiajs/react";
import { useEffect, useState, type ReactElement } from "react";

interface PropsInterface {
    SubmitTraining: () => void,
    PrevButton: () => void,
    phaseCategory: TrainingCreationTab[]
}

const CardBuilder = (component_props: TrainingCreationTab) => {
    const { tooltip, svg, currentState } = component_props;

    const phaseCompleted = currentState ? "Selesai" : "Belum selesai";
    const phaseColor = currentState ? "border-4 border-primary" : "";

    const svgColor = currentState ? "fill-primary" : "fill-slate-500";

    return (
        <Card className={`${phaseColor}`}>
            <CardHeader>
                <CardTitle>{tooltip}</CardTitle>
                <CardDescription className={currentState ? "text-primary font-semibold" : ""}>{phaseCompleted}</CardDescription>
                <div className={`flex justify-center items-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-1/4 h-1/4 ${svgColor}`}>
                        {svg}
                    </svg>
                </div>
            </CardHeader>
        </Card>
    )
}
export default function SummaryTab(
    {
        SubmitTraining,
        PrevButton,
        phaseCategory,
    }: PropsInterface
) {
    const [variables, setVariables] = useState<string[]>([]);
    const [canSubmit, setCanSubmit] = useState(false);

    const handleInputChange = (value: string[]) => {
        setVariables(value);
    };

    useEffect(() => {
        const preparedPhaseData = phaseCategory.map((tab: any) => tab.currentState)
        preparedPhaseData.pop()

        setCanSubmit(
            preparedPhaseData.every((item: boolean) => item === true)
        );
    }, [])

    const handleError = (hasErr: boolean) => {
        console.log('hasErr', hasErr)
        setCanSubmit(hasErr === true)
    }

    const handleNext = () => {
        SubmitTraining();
    }

    return (
        <TabsContent value="summarize" className="w-full px-3 py-1">
            <h4 className="text-lg font-bold">Evaluasi</h4>
            <div className="flex flex-col gap-3">
                <div className="grid    grid-cols-2 gap-2">
                    {phaseCategory.map((tab, index) => tab.name !== "summarize" && (
                        <CardBuilder
                            key={new Date().getTime() + index}
                            {...tab}
                        />
                    ))}
                </div>
            </div>
            <div className="col-span-full flex justify-between mt-2">
                <Button type="button" className="w-fit justify-start text-left font-normal bg-slate-500 text-white" onClick={() => PrevButton()}>
                    &lt; Kembali
                </Button>

                <Button type="button" className="w-fit justify-start text-left gap-2 font-normal bg-primary disabled:bg-blue-300 text-white" onClick={handleNext} disabled={!canSubmit}>
                    Kirim
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-primary-foreground">
                        <path d="M20.56 3.34a1 1 0 0 0-1-.08l-17 8a1 1 0 0 0-.57.92 1 1 0 0 0 .6.9L8 15.45v6.72L13.84 18l4.76 2.08a.93.93 0 0 0 .4.09 1 1 0 0 0 .52-.15 1 1 0 0 0 .48-.79l1-15a1 1 0 0 0-.44-.89zM18.1 17.68l-5.27-2.31L16 9.17l-7.65 4.25-2.93-1.29 13.47-6.34z" />
                    </svg>
                </Button>
            </div>
        </TabsContent >

    )
}
