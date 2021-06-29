
module Pro
{
    /**
     * 场景切换管理
     */
    export class SceneMgr
    {
        private static _inst: SceneMgr;
        public static get Inst()
        {
            if (SceneMgr._inst == null)
            { SceneMgr._inst = new SceneMgr(); }

            return SceneMgr._inst;
        }

        public init()
        {
            EventMgr.on(EventNotify.Open_Main, this, this.open_Main);
            EventMgr.on(EventNotify.Open_Login, this, this.open_Login);
            EventMgr.on(EventNotify.Screen_Resize, this, this.screen_Resize);

            EventMgr.on(EventNotify.Scene_BACK_MAINUI, this, this.Scene_BACK_MAINUI_Called);
        }


        private open_Main(): void
        {
            this.cleanSceneRes();
            //设置加载进度界面
            EventMgr.trigger(EventNotify.LoadingUI_Open, 1);
            ResMgr.Inst.load(EntryResLoadController.resConfig.main, this, this.loadConfigMain);
        }

        loadConfigMain()
        {
            EventMgr.trigger(EventNotify.LoadingUI_Close);
            //NorItemTrulyUI
            let tmpCacheNorItemAry = 50 - Laya.Pool.getPoolBySign("NorItemTrulyUI").length;
            if (tmpCacheNorItemAry > 0)
            {
                for (let i = 0; i < tmpCacheNorItemAry; i++)
                {
                    Public.PoolMgr.recoverItem("NorItemTrulyUI", new NorItemTrulyUI());
                }
            }
            //主界面
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Main));
            //播放背景音效
            SoundMgr.Inst().playMusicByType(Pro.ScenceSoundType.CITY);

            //设置当前所在场景
            GlobalData.MInScene = GlobalData.StandScene.Main;
        }

        private open_Login(): void
        {
            this.cleanSceneRes();

            ResMgr.Inst.load(EntryResLoadController.resConfig.login, this, () =>
            {
                EventMgr.trigger(EventNotify.LoadingUI_Close);
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Login));
                GlobalData.MInScene = GlobalData.StandScene.Login;
            });
        }

        /** 收回场景 */
        private Scene_BACK_MAINUI_Called(toMainStatue = null)
        {
            //回收战斗
            BattleMgr.Inst.exitAllBattle();
            //回收新手引导
            GuideMgr.Inst.reset();
            // //回收场景资源
            // this.cycleScene();
            //设置加载进度界面
            EventMgr.trigger(EventNotify.LoadingUI_Open, 1);
            if (toMainStatue == "BackLogin")
            {
                EventMgr.trigger(EventNotify.Open_Login);
            }
            else
            {
                EventMgr.trigger(EventNotify.Open_Main, toMainStatue);
            }

        }

        private screen_Resize(): void
        {

        }

        public cleanSceneRes()
        {

            //消毁所有UI
            UIManager.Inst.destroyAllUI();

            //清空模型数据
            ResMgr.Inst.clearAutoReleaseRes();

            //loader全局释放
            // Laya.loader.clearUnLoaded();
            //Laya的LoaderManager clearUnLoaded 底层有个BUG， 在clearUnLoaded以后， 正在使用的Loader加载器的事件没有移除，
            // 就会导致_loadcount数字异常、ResInfo重复回池，从而引发一系列问题。
            { //没办法，不能等他们改正BUG了，只能自己先临时处理了
                for (var i = 0; i < 5; i++)
                {
                    var infos = Laya.loader["_resInfos"][i];
                    for (var j = infos.length - 1; j > -1; j--)
                    {
                        var info = infos[j];
                        if (info)
                        {
                            info.offAll();
                            // Laya.loader["_infoPool"]push(info);
                        }
                    }
                    infos.length = 0;
                }
                Laya.LoaderManager["_resMap"] = {};
            }

            //释放配置表定义的
            let keys = "";
            if (GlobalData.MInScene == GlobalData.StandScene.Login)
            {
                keys = "login";
            }
            else if (GlobalData.MInScene == GlobalData.StandScene.Main)
            {
                keys = "mainRelease";
            }
            else if (GlobalData.MInScene == GlobalData.StandScene.Battle)
            {
                keys = "battle";
            }
            if (keys.length > 0)
            {
                var obj = EntryResLoadController.resConfig;
                let reslist = obj[keys];
                for (let i = 0; i < reslist.length; i++)
                {
                    this.uiResDispose(reslist[i]);
                }
            }
        }

        /**
         * 2d清除资源
         */
        private uiResDispose(assetsUrl: string)
        {
            //清除缓存包括sprite，不可再次使用(有引用计数判断)
            //Laya.loader.clearRes( assetsUrl );

            //直接清除sprite上的图，直接清空
            Laya.loader.clearTextureRes(assetsUrl);
        }
    }
}
