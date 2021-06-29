module Pro
{

    /**
     * 资源释放类型
     */
    export enum ResReleaseType
    {
        /** 手动管理 */
        None = 0,
        /** 统一释放 */
        SceneChange,
        /** 引用管理 */
        Reference
    }

    /**
     * 资源加载请求
     */
    export class ResReqeust
    {

        /**
         * 返回参数(staute:是否加载成功,exParam:加载参数，data:如果url为单加载才返回的资源数据)
         */
        public listener: Function;
        public caller: any;
        public url: any;
        public priority = 1;
        public resType: string;
        public param: any;
        public releaseType: ResReleaseType;

        /**
         * @param priority (default = 1)加载的优先级，优先级高的优先加载。有0-4共5个优先级，0最高，4最低。
         */
        public load()
        {

            if (this.releaseType == ResReleaseType.Reference)
            {
                ResMgr.Inst.addAtlasReference(this.url);
            }
            Laya.loader.load(this.url, Laya.Handler.create(this, this.onLoadComplete), null, this.resType, this.priority);
        }

        private onLoadComplete(data: any)
        {
            let tmpResult = !(data == null || data == false);
            this.listener.call(this.caller, tmpResult, this.param, data);
        }

    }


    /**
     * 资源管理
     */
    export class ResMgr
    {

        /** 单例 */
        private static _Inst: ResMgr;
        public static get Inst()
        {
            if (ResMgr._Inst == null)
            { ResMgr._Inst = new ResMgr(); }
            return ResMgr._Inst;
        }

        constructor()
        {

        }


        /**
         * 初始化加载参数
         * @param url 加载的资源类与Laya.load中url参数一致
         * @param caller 加载完成回调实列
         * @param listener 加载完成回调方法，返回参数(staute:是否加载成功,exParam:加载参数，data:如果url为单加载才返回的资源数据)
         * @param exParam 额外参数，加载完成一并返回
         * @param resType 资源类型。比如：Loader.IMAGE。
         * @param releaseType 资源释放类型(Reference类型默认会添加一次引用，不用的时候，记得cutSingleResCountShare资源的引用)
         * @param priority (default = 1)加载的优先级，优先级高的优先加载。有0-4共5个优先级，0最高，4最低。
         */
        public load(url: any, caller: any, listener: Function, exParam = null, resType: string = null, releaseType: ResReleaseType = ResReleaseType.None, priority: number = 1): ResReqeust
        {
            if (url == null || url.length == 0)
            {
                listener.call(caller, true, exParam);
                return null;
            }
            if (typeof (url) == "string")
            {
                var res = Laya.loader.getRes(url)
                if (res)
                {
                    listener.call(caller, true, exParam);
                    return null;
                }
            }
            let tmpRequest = new ResReqeust();
            tmpRequest.caller = caller;
            tmpRequest.listener = listener;
            tmpRequest.url = url;
            tmpRequest.resType = resType;
            tmpRequest.param = exParam;
            tmpRequest.releaseType = releaseType;
            tmpRequest.priority = priority;
            tmpRequest.load();
            return tmpRequest;
        }

        /**
         * 释放一个资源
         * @param urls string或Array<string>
         * @param delayFrame 延迟释放帧数
         * @param releaseRef 释放资源引用
         */
        public unloadWithUrl(urls: any, delayFrame: number = 5, releaseRef = false)
        {
            if (urls == null) { return; }

            if (urls["push"] != null)
            {
                Laya.loader.cancelLoadByUrls(urls);
                if (delayFrame <= 0)
                {
                    urls.forEach(element => { this.clearResWithUrl(element, releaseRef) });
                }
                else
                {
                    Laya.timer.frameOnce(delayFrame, this, () =>
                    {
                        urls.forEach(element =>
                        {
                            this.clearResWithUrl(element, releaseRef)
                        })
                    });
                }
            }
            else
            {
                Laya.loader.cancelLoadByUrls([urls]);
                if (delayFrame <= 0)
                {
                    this.clearResWithUrl(urls, releaseRef);
                }
                else
                {
                    Laya.timer.frameOnce(delayFrame, this, () => { this.clearResWithUrl(urls, releaseRef); });
                }
            }
        }

        /**
         * 释放资源的内存
         * @param releaseRef 释放资源的壳
         */
        private clearResWithUrl(url: string, releaseRef: boolean)
        {
            (releaseRef || url.indexOf("normalEff") >= 0 || url.indexOf("battleEff") >= 0) ? Laya.loader.clearRes(url) : Laya.loader.clearTextureRes(url);
        }

        /** 单一资源添加引用计数管理:添加一次引用 */
        private addSingleResCountShare(key: string): void
        {
            if (!key) { return; }
            let tmpShareData = CountShare.getShareData(key);
            if (tmpShareData == null)
            {
                tmpShareData = new Public.CountShareData();
                tmpShareData.destroy = this.onAtlasDestory;
                tmpShareData["atlasUrl"] = key;
                CountShare.addShareData(key, tmpShareData);
            }
            CountShare.installShareData(key, tmpShareData);
        }

        /** 单一资源添加引用计数管理:减少一次引用 */
        private cutSingleResCountShare(key: string): void
        {
            if (!key) { return; }
            CountShare.uninstallShareData(key, null);
        }

        /** atlas释放 */
        private onAtlasDestory()
        {
            let tmpAtlasUrl = this["atlasUrl"] as string;
            //if(tmpIsRoleRes){logI("释放角色资源:"+tmpAtlasUrl);}
            ResMgr.Inst.unloadWithUrl(tmpAtlasUrl, 0);
        }

        //------------------------------------Atlas资源添加引用计数管理------------------------------------
        /** 给atlas添加一次引用 */
        public addAtlasReference(urls: any)
        {
            if (urls == null)
            {
                return;
            }

            if (urls.push != null)
            {
                urls.forEach(elment => { this.addSingleResCountShare(elment) });
            }
            else
            {
                this.addSingleResCountShare(urls);
            }
        }

        /** 给atlas减少一次引用 */
        public cutAtlasReference(urls: any)
        {
            if (urls == null)
            {
                return;
            }

            if (urls.push != null)
            {
                urls.forEach(elment =>
                {
                    // if(elment != "res/atlas/res/common.atlas")
                    // {
                    this.cutSingleResCountShare(elment)
                    // }
                }
                );
            }
            else
            {
                this.cutSingleResCountShare(urls);
            }
        }

        //--------------------------------------记录当前需要释放的资源-------------------------------------
        /** 当前加载过的特效资源 */
        private NeedReleaseResAry: Array<string> = [];

        /** 记录需要释放的特效资源 */
        public recordAutoReleaseRes(urls: any)
        {
            if (urls.push != null)
            {
                urls.forEach(url => { this.recordAutoReleaseResOne(url); });
            }
            else
            {
                this.recordAutoReleaseResOne(urls);
            }
        }

        private recordAutoReleaseResOne(url: string)
        {
            if (this.NeedReleaseResAry.indexOf(url) == -1)
            {
                this.NeedReleaseResAry.push(url);
            }
        }

        /** 场景切换自动释放资源 */
        public clearAutoReleaseRes()
        {

            //释放场景统一管理的资源
            ResMgr.Inst.unloadWithUrl([].concat(this.NeedReleaseResAry));
            this.NeedReleaseResAry.splice(0, this.NeedReleaseResAry.length);

            //强制回收自动图集(还需要大量测试，如果出现问题，需要把这个代码注释)
            logI("自动大图free")
            // let tmpAtlasMgr = Laya.AtlasResourceManager.instance;
            // tmpAtlasMgr.freeAll();
        }
    }
}