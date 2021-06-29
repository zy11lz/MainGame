module Pro
{
    export class HpQueueInfo
    {
        hpInfo: Pb_God.PBFightActionHP;
        bgRes: string;
        numRes: NumResInfo;
        constructor(hpInfo: Pb_God.PBFightActionHP, bgRes: string, numRes: NumResInfo)
        {
            this.hpInfo = hpInfo;
            this.bgRes = bgRes;
            this.numRes = numRes;
        }
    }
}