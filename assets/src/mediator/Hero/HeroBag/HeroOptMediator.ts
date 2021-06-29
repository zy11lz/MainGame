module Pro
{
    /**
     * 界面说明： 英雄三选一（动画）
    * @author lz
    */
    export class HeroOptMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Hero.HeroBag.HeroOptUI;

        // 已选中奖励列表
        private select_groupID: number = 2; // 默认为2

        // 礼包内数据
        private gift_arr: cfg.ItemGiftPackCfgInfo[];

        // 初始坐标
        private heroPos_arr:   Point[] = [];

        // 当前精灵位置排序
        private curHeroSort_arr: Array<number> = null;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroBag.HeroOptUI, 1,BaseAddLayer.TopUI);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            for (let img of this.UIPanel.PetInfo._children) {
                let imag =  img as Laya.Image   
                if(imag._children){
                    let sk = imag._children[0] as SkeletonPlayer;
                    sk.offAll();
                    sk.removeSelf();
                    sk = null;
                }
            }
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btn_opt.onClick(this, this.onOkClick);
            this.UIPanel.btn_back.onClick(this, this.closeUI);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            let itemData: Pb_God.PBItem = this.UIOpenData.customObject;
            this.gift_arr = cfg.ItemGiftPackCfgData.getGiftInfoArrayByItemID(itemData.itemid);
            this.initImgPos();
            this.initPet();
            this.select_groupID = 2;
        }

        private initImgPos()
        {
            if(this.heroPos_arr.length < 1)
            {
                for (var index = 0; index < this.UIPanel.PetInfo._children.length; index++)
                {
                    let img = this.UIPanel.PetInfo.getChildByName(`pet_${index+1}`) as Laya.Image;
                    this.heroPos_arr[index] = new Laya.Point(img.x,img.y);
                }
            }
            else
            {
                for (var index = 0; index < this.UIPanel.PetInfo._children.length; index++)
                {
                    let img = this.UIPanel.PetInfo.getChildByName(`pet_${index+1}`) as Laya.Image;
                    img.x =  this.heroPos_arr[index].x;
                    img.y =  this.heroPos_arr[index].y;
                }
            }
        }

        private initPet():void
        {
            this.curHeroSort_arr = [];
            for (var index = 0; index < this.gift_arr.length; index++)
            {
                let img = this.UIPanel.PetInfo.getChildByName(`pet_${index+1}`) as Laya.Image;
                let rewards = cfg.ItemGiftPackCfgData.getAddItemAryByInfo(this.gift_arr[index]);
                let itemInfo = cfg.ItemCfgData.getInfo(rewards[0].itemid);
                let skinIfo = cfg.PetCfgData.getSkinInfoByPetID(Number(itemInfo.useParam.split("_")[0]));
                let skelName = skinIfo.skelName;
                let sk:SkeletonPlayer = new SkeletonPlayer();
                Laya.Tween.to(sk, { alpha: 1 }, 400);
                sk.on(LayaEvent.CLICK, this, this.onSkClick,[index + 1]);
                sk.pos(img.width / 2, img.height / 3);
                sk.load(UrlMgr.getModelSkUrl(skelName));
                let showscale = skinIfo.showScale;
                sk.scale(showscale,showscale);
                img.addChild(sk);
                this.curHeroSort_arr.push(index + 1);
                sk.play(index == 1 ? "win_loop" : "standby_loop", true);
                img.scale(1,1);
            }
            let img = this.UIPanel.PetInfo.getChildByName(`pet_${2}`) as Laya.Image;
            img.skin = "";
            img.scale(1.2,1.2);
        }

        private onSkClick(index): void
        {
            if(this.curHeroSort_arr.indexOf(index) == 1)return; 
            this.select_groupID = index; 
            switch(this.curHeroSort_arr.indexOf(index))
            {
                case 0:         // 点击了左边的精灵
                    this.clickLeft();
                    break;
                case 2:         // 点击了右边的精灵
                    this.clickRight();
                    break;
                default:
                    this.moveAni()
                    break;
            }
        }

        private clickLeft():void
        {
            let num = this.curHeroSort_arr[this.curHeroSort_arr.length - 1];
            this.curHeroSort_arr.pop();
            this.curHeroSort_arr.unshift(num);
            this.moveAni()
        }

        private clickRight():void
        {
            let num = this.curHeroSort_arr[0];
            this.curHeroSort_arr.shift();
            this.curHeroSort_arr.push(num);
            this.moveAni()
        }

        private moveAni():void
        {
            this.UIPanel.pet_cur.alpha = 0;
            for (let i = 0; i < 3; i++)
            {
                let img = this.UIPanel.PetInfo.getChildByName(`pet_${i + 1}`) as Laya.Image;
                let pos = this.heroPos_arr[this.curHeroSort_arr.indexOf(i + 1)] ;
                img.skin = 'res/herobag/pic_dizuo02.png';
                let showscale = this.curHeroSort_arr.indexOf(i + 1) == 1 ? 1.2 : 1;
                Laya.Tween.to(img, { alpha: 1 ,x:pos.x,y:pos.y,scaleX: showscale, scaleY:showscale}, 400, Laya.Ease.quadOut, Laya.Handler.create(this, ()=>
                {
                    this.UIPanel.pet_cur.alpha = 1;
                    if(this.curHeroSort_arr.indexOf(i + 1) == 1)
                    {
                        img.skin = "";
                        img.zOrder = 1;
                    }
                    else
                    {
                        img.skin = 'res/herobag/pic_dizuo02.png';
                        img.zOrder = 2 + i;
                    }
                    let sk = img.getChildAt(0) as SkeletonPlayer;
                    if(sk)
                    {
                        sk.play(this.curHeroSort_arr.indexOf(i + 1) == 1 ? "win_loop" : "standby_loop", true);
                    }
                }), 100);
            }
        }


        // 确认选择
        private onOkClick(): void
        {
            if (this.select_groupID == 0)
            {
                // 选中数量不足
                TipsUtils.showTips(Global.getLangStr("ui_ItemReview_msg11", 1));
                return;
            }

            //判断英雄背包格子
            if (PetDataMgr.getPetList().length + 1 > PetDataMgr.getSpaceNum())
            {
                TipsUtils.showTipsByLanId("hero_msg24");
                this.closeUI();
                return;
            }
            let itemData: Pb_God.PBItem = this.UIOpenData.customObject;
            ItemSend.bag_Use(itemData.itemsn, 1, [this.select_groupID]);
            this.closeUI();
        }
    }
}