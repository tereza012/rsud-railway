import QuestionText from "@/components/customs/QuestionText";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function EvaluationTab(
    {
        NextButton,
        PrevButton,
        trainingId,
    }: {
        NextButton: () => void,
        PrevButton: () => void,
        trainingId: number,
    }
) {
    const [variables, setVariables] = useState<string[]>([]);
    const [canSubmit, setCanSubmit] = useState(false);

    const handleInputChange = (value: string[]) => {
        setVariables(value);
    };

    const handleError = (hasErr: boolean) => {
        console.log('hasErr', hasErr)
        setCanSubmit(hasErr === true)
    }

    const handleNext = () => {
        router.remember(variables, 'Admin/Training/Craete/Phase-7')
        NextButton()
    }

    return (
        <TabsContent value="evaluation" className="w-full px-3 py-1">
            <h4 className="text-lg font-bold">Variabel Evaluasi</h4>
            <div className="flex flex-col gap-3">
                <QuestionText
                    content={variables}
                    handler={handleInputChange}
                    name="variables"
                    isRepeater={true}
                    getErr={handleError}
                    blockButton={false}
                    isQuestion={true}
                    answer_name="answer"
                />
            </div>
            <div className="col-span-full flex justify-between mt-2">
                <Button type="button" className="w-fit justify-start text-left font-normal bg-slate-500 text-white" onClick={() => PrevButton()}>
                    &lt; Kembali
                </Button>

                <Button type="button" className="w-fit justify-start text-left font-normal bg-slate-500 text-white" onClick={handleNext} disabled={!canSubmit}>
                    Lanjutkan &gt;
                </Button>
            </div>
        </TabsContent >

    )
}
