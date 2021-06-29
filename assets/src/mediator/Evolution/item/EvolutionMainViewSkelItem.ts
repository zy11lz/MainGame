module Pro
{

    export class EvolutionMainViewSkelItem extends Laya.Box
    {
        public btn_image: Laya.Image;
        public other_image: Laya.Image;
        public current_image: Laya.Image;
        public arrows_image: Laya.Image;
        public name_label: component.UILabel;
        public des_label: component.UILabel;



        private _sk: SkeletonPlayer;




        constructor()
        {
            super();
        }
        onAwake()
        {


            this.btn_image = this.getChildByName("btn_image") as Laya.Image;
            this.other_image = this.getChildByName("other_image") as Laya.Image;
            this.current_image = this.getChildByName("current_image") as Laya.Image;
            this.arrows_image = this.getChildByName("arrows_image") as Laya.Image;
            this.name_label = this.getChildByName("name_label") as component.UILabel;
            this.des_label = this.getChildByName("des_label") as component.UILabel;

        }

        onEnable()
        {
            if (!this._sk)
            {
                this._sk = new SkeletonPlayer();
                this._sk.mouseEnabled = false;
                this._sk.mouseThrough = true;
                this._sk.pos(this.other_image.x, this.other_image.y);
                this.addChild(this._sk);
                this._sk.on(LayaEvent.STOPPED, this, this._onSkStop);
            }


        }
        onDisable()
        {
            if (this._sk)
            {
                this._sk.off(LayaEvent.STOPPED, this, this._onSkStop);
                this._sk.removeSelf();
                this._sk.releaseSkel();
                this._sk = null;
            }
        }
        private _onSkStop(e: LayaEvent)
        {
            this._sk.play("standby_loop", true);
        }
        /**
         *
         * @param data 皮肤表数据
         * @param isSelf 当前模型
         * @param isLast 最后进阶的模型
         */
        setData(data: cfg.PetSkinCfgInfo, isSelf: boolean, isLast: boolean, evolve: number)
        {
            let showScale: number = data.showScale * 0.7;
            this.name_label.text = data.fileName;
            if (this._sk)
            {
                this._sk.scale(showScale, showScale);
                this._sk.setRes(UrlMgr.getModelSkUrl(data.skelName));
                this._sk.play(data.firstAct ? data.firstAct : "win_loop", false);
            }
            this.current_image.visible = isSelf;
            this.other_image.visible = !isSelf;
            this.arrows_image.visible = !isLast;

            let txt: string = Global.getLangStr("evolution_tip_des_1" + evolve);
            if (isSelf)
            {
                txt = "(当前)" + txt;
            }
            this.des_label.text = txt;
        }

    }

}