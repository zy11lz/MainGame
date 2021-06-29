module Pro
{
    export class FramePlayerDataMgr extends EventDispatcher
    {
        private static _instace: FramePlayerDataMgr;
        public static get instace(): FramePlayerDataMgr
        {
            if (FramePlayerDataMgr._instace == null)
            {
                FramePlayerDataMgr._instace = new FramePlayerDataMgr();
            }
            return FramePlayerDataMgr._instace;
        }

        private _frameDataMap: ds.StringMap<Array<string>>;

        constructor()
        {
            super();
            this._frameDataMap = new ds.StringMap<Array<string>>()
        }

        public getData(respath: string)
        {
            var tempActionList: string[] = this._frameDataMap.get(respath);
            if (tempActionList == null)
            {
                 let tempAtlasData = Laya.loader.getRes(respath);
                 if(tempAtlasData != null)
                 {
                   this.initFrameData(respath);
                    tempActionList = this._frameDataMap.get(respath);
                 }
            }
            if(tempActionList == null)
            {
                ResMgr.Inst.load(respath, this, this.onLoadResComplete, [respath], null, ResReleaseType.Reference);
            }
            return tempActionList;
        }

        onLoadResComplete(isLoaded: boolean, args: Array<string>)
        {
            if (isLoaded)
            {
                var url = args[0];
                this.initFrameData(url);
                this.event(LayaEvent.COMPLETE, url)
            }
        }

        private initFrameData(respath: string)
        {
            var frameList: string[];
            let tempAtlasData = Laya.loader.getRes(respath);
            if (tempAtlasData)
            {
                let actionFrames: Array<any> = tempAtlasData["frames"];
                frameList = new Array<string>();
                for (let framekey in actionFrames)
                {
                    frameList.push(framekey);
                }
                frameList.sort(this.actionFrameSort);
                this._frameDataMap.put(respath, frameList);
            }
        }

        private actionFrameSort(aName: string, bName: string)
        {
            aName = aName.split(".")[0];
            bName = bName.split(".")[0];
            if (Number(aName) > Number(bName))
            {
                return 1;
            }
            return -1
        }

        unRef(_respath: string)
        {
        }

        addRef(_respath: string)
        {
        }


    }
}