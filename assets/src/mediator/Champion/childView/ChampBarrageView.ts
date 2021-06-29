module Pro
{

    /**
    * 冠军赛界面-弹幕视图
    * @author jason.xu
    */
    export class ChampBarrageView extends ProUI.Champion.ChildView.BarrageViewUI
    {
        //缓存弹幕数据
        private cacheBarrageDatas: Pb_God.PBChampionDanmu[] = [];
        /** 自己临时发送的弹幕去重 */
        private _selfTemporaryList: string[] = [];
        /** 当前拉取到的弹幕位置 */
        private _curIndex = 0;
        /** 一次请求的数量 */
        private _singlePullCount = 30;
        /** 向服务器的请求中断， 可能是正在请求中，数据还没回，也有可能是服务器的数据已经请求完了 */
        private _isPullStop = false;
        /** 当前正在跑的文本 */
        private _cells: BarrageTextBox[] = [];

        /** 颜色池 */
        private _colors = ["#FFFFFF", "#17f000", "#fff6e8", "#d76601", "#ff0000"];
        private _pools: BarrageTextBox[] = [];

        constructor()
        {
            super();
            this.init();
            this.addUIEvent();
        }

        private init()
        {
        }

        private addUIEvent(): void
        {
           
            this.btnEdit.onClick(this, this.onClickEdit);
        }


        private onClickEdit(): void
        {
            let sendView = new ChampSendBarragePanel();
            sendView.show(this.boxShowView);
        }

        private addDataEvent(): void
        {
            //查询弹幕返回		PBG2CChampionQueryDanmuAck
            EventMgr.on(CmdEvent.Champion_QueryDanmuAck, this, this.onQueryDanmuAck);
            EventMgr.on(EventNotify.Champion_AddSelfBarrage, this, this.onAddSelfBarrage);

        }

        private removeDataEvent(): void
        {
            EventMgr.off(CmdEvent.Champion_QueryDanmuAck, this, this.onQueryDanmuAck);
            EventMgr.off(EventNotify.Champion_AddSelfBarrage, this, this.onAddSelfBarrage);
        }

        /** 拉取弹幕数据 */
        private pullData(): void
        {
            if (this._isPullStop) { return; }
            this._isPullStop = true;
            ChampionSend.queryDanmuAsk(this._curIndex, this._singlePullCount);
        }

        /*****
         *查询弹幕返回		PBG2CChampionQueryDanmuAck
         * @param PBG2CChampionQueryDanmuAck
         * 		danmu			PBChampionDanmu	列表
         */
        protected onQueryDanmuAck(value: Pb_God.PBG2CChampionQueryDanmuAck): void
        {
            //拉到了对应数量的，表示后面还可以再拉， 标记一下
            if (value.danmu.length >= this._singlePullCount) { this._isPullStop = false; }
            for (var el of value.danmu)
            {
                let isSelf = el.playerid == PlayerDataMgr.uid;
                //去掉自己刚刚发送的那条
                if (isSelf && this._selfTemporaryList.indexOf(el.msg) >= 0) { continue; }
                this.cacheBarrageDatas.push(el);
            }
        }

        /** 添加一条自己发送的弹幕 */
        private onAddSelfBarrage(msg: string): void
        {
            //模拟一条自己的数据，插到队列中间。
            let data = new Pb_God.PBChampionDanmu();
            data.index = 0;
            data.msg = msg;
            data.playerid = PlayerDataMgr.uid;
            this.cacheBarrageDatas.unshift(data);
            this._selfTemporaryList.push(msg);
        }

        public hide(): void
        {
            this.visible = false;
            this.removeDataEvent();
            Laya.timer.clear(this, this.loopLogic);
        }
        public show(): void
        {
            this.visible = true;
            this.addDataEvent();
            this.refreshView();
            Laya.timer.loop(1, this, this.loopLogic);
        }
        private refreshView(): void
        {

        }

        /** 下一次发起弹幕的剩余时间(帧) */
        private _tick = 1000;
        /** 循环驱动弹幕发射以及检查有没有新数据 */
        private loopLogic(): void
        {
            let delta = Laya.timer.delta;
            this._tick -= delta;
            if (this._tick <= 0)
            {
                this._tick = Global.getRandomNum(1200, 2500);
                this.sendBarrage();
            }
            //hander move
            for (let i = this._cells.length - 1; i >= 0; i--)
            {
                var label = this._cells[i];
                label.x -= label.moveSpeed * delta;
                if (label.x <= -label.width)
                {
                    label.removeSelf();
                    this._pools.push(label);
                    this._cells.splice(i, 1);
                }
            }
        }

        /** 定时器回调 发射一条弹幕 */
        private sendBarrage(): void
        {
            if (this.cacheBarrageDatas.length <= 0)
            { //没有数据的时候，检查当前请求的进度，看是否还可以再拉到新的弹幕列表
                this.pullData();
                return;
            }
            let info = this.cacheBarrageDatas.shift();
            let isSelf = info.playerid == PlayerDataMgr.uid;

            let label = this.getLabel();
            label.y = 40 * this.getBeginPosYIndex();
            label.x = this.boxShowView.width;
            label.setText(info.msg, isSelf);
            label.moveSpeed = Global.getRandomNum(80, 130) / 1000;  //每1毫秒移动的坐标
            this._cells.push(label);
        }

        //创建一个弹幕文本
        private getLabel(): BarrageTextBox
        {
            let ret: BarrageTextBox;
            if (this._pools.length > 0)
            {
                ret = this._pools.shift();
            } else
            {
                ret = new BarrageTextBox();
            }
            ret.setTextColor(this._colors[Global.getRandomNum(0, this._colors.length)]);
            this.boxShowView.addChild(ret);
            return ret;
        }
        private _randomPosArr = [0];
        private _lastPos = -1;
        /** 取得一个弹幕文字的发射位置 */
        private getBeginPosYIndex(): number
        {
            let pos; //第几行,  从0123中随机抽离出1个数字，抽完后重新再来。
            if (this._randomPosArr.length == 1)
            {
                pos = this._randomPosArr[0];
                this._randomPosArr = [0, 1, 2, 3];
            } else
            {
                let index = Global.getRandomNum(0, this._randomPosArr.length);
                pos = this._randomPosArr[index];
                this._randomPosArr.splice(index, 1);
            }
            if (pos == this._lastPos) { pos = this.getBeginPosYIndex(); } //保证不在同一行连着出现
            this._lastPos = pos;
            return pos;
        }


        public cleanUp(): void
        {
            this.removeDataEvent();
            Laya.timer.clear(this, this.loopLogic);
            for (var label of this._pools)
            {
                label.destroy();
            }
            this._pools = [];
            this.cacheBarrageDatas = [];
            this._selfTemporaryList = [];
            this._curIndex = 0;
            this._isPullStop = false;
        }
    }

    /** 一条弹幕的文本信息 */
    class BarrageTextBox extends ProUI.Champion.ListItems.BarrageSingleItemUI
    {

        constructor()
        {
            super();
        }
        /** 每一毫秒移动的距离 */
        public moveSpeed: number = 1;
        /** 设置文本内容 */
        public setText(value: string, isSelf: boolean): void
        {
            this.label.text = value;
            this.selfBg.visible = isSelf;
            this.width = this.label.width + 10;
        }
        public setTextColor(value: string): void
        {
            this.label.color = value;
        }
    }
}