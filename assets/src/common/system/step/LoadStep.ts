module Pro
{
    export class LoadStep
    {
        id: number;
        stepName: string;
        constructor(id: number, stepName: string)
        {
            this.id = id;
            this.stepName = stepName;
        }
        static configLoad: LoadStep = new LoadStep(1, "configLoad")
        static login_Res: LoadStep = new LoadStep(2, "login_Res")
    }
}
