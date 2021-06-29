module Pro
{

    /**
    * 模块：通用排行榜界面，列表元素
    * @author jason.xu
    */
    export class RankDetailItemView extends ProUI.Rank.Detail.ListItemUI
    {

        private _playerdisplay: Pb_God.PBPlayerDisplay;
        constructor()
        {
            super();
            this.init();
        }

        private init()
        {
        }

        public hideAllChildren(): void
        {
            this.noRank.visible = false;
            this.txtRank.visible = false;
            this.imgFrameRank.visible = false;
            // this.playerIcon.visible = false;
            // this.txtNickname.visible = false;
            this.txtNormalValue1.visible = false;
            this.txtNormalValue2.visible = false;
            this.txtNormalValue3.visible = false;
            this.hboxIconValue.visible = false;
            this.worshipView.visible = false;
            this.headFightPowerBox.visible = false;
            this.twoLineValueBox.visible = false;
            this.txtNickname.centerY = 0;
        }

        /** 排名 */
        public setRankValue(value: number): void
        {
            this.noRank.visible = false;
            this.txtRank.visible = false;
            this.imgFrameRank.visible = false;
            if (value <= 0)
            {
                this.noRank.visible = true;
            } else if (value <= 3)
            {
                this.imgFrameRank.visible = true;
                this.imgFrameRank.frame = value;
            } else
            {
                this.setLabelText(this.txtRank, value + "");
            }
        }

        /**显示基本数据
         * @param playerdisplay  传入null时，显示玩家自己信息
         */
        public setPlayerData(playerdisplay: Pb_God.PBPlayerDisplay = null, isCross: boolean = false): void
        {
            this._playerdisplay = playerdisplay;
            if (playerdisplay)
            {
                let crossName = isCross ? `[S${ playerdisplay.worldid }]` : "";
                this.setLabelText(this.SKname, crossName);
                this.setLabelText(this.txtNickname, playerdisplay.playername);
                this.playerIcon.visible = true;
                this.playerIcon.setPlayerDisplayInfo(playerdisplay);
            } else
            {
                this.setLabelText(this.txtNickname, PlayerDataMgr.name);
                this.playerIcon.visible = true;
                this.playerIcon.setSimpleInfo(ShapeDataMgr.iconId, ShapeDataMgr.iconFrameID, PlayerDataMgr.gender, 0);
            }
        }

        /** 把普通文本用个数组圈起来，方便取用 */
        private _nomalLabelList: component.UILabel[] = [];
        private _valueWidthList: number[];
        private _posMove = 0;
        /** 设置列表数值 */
        public setTabelData(type: Pb_God._emTopListType, info: Pb_God.PBTopListInfo): void
        {
            this.setRankValue(info ? info.rank : 0);
            if (!info) return;
            //根据不同排行榜类型，显示不同的内容
            switch (type)
            {
                case Pb_God._emTopListType.TopListType_Hook: //  个人剧情进度;
                    let stageId = Global.longToNumber(info.value);
                    let sceneid = cfg.HookStageCfgData.getSceneIDByStageID(stageId);
                    let scenename = cfg.HookSceneCfgData.getSceneNameBySceneID(sceneid);
                    this.addNormalValueLabel(scenename + stageId);
                    break;
                case Pb_God._emTopListType.TopListType_Train1: //  试练塔;
                case Pb_God._emTopListType.TopListType_Train2: //  试练塔;
                    let showStage = cfg.TrainTowerCfgData.getStageShowByStageID(info.value.toNumber())
                    this.addNormalValueLabel(showStage);
                    var timeStr = Global.GetRemindTime(Global.longToNumber(info.subvalue), 4);
                    this.addNormalValueLabel(timeStr);
                    break;
                case Pb_God._emTopListType.TopListType_Faction: //  公会单独界面处理，此需忽略;
                    break;
                case Pb_God._emTopListType.TopListType_Challenge: //  竞技场;
                    this.addIconValueLabel(info.value, "res/common/pic_huizhang.png");
                    // this.addNormalValueLabel(info.value, true);
                    break;
                case Pb_God._emTopListType.TopListType_Figthpower: //  个人战力;
                case Pb_God._emTopListType.TopListType_BWFigthpower: //  跨服个人战力;
                    this.addIconValueLabel(info.value, "res/common/pic_zhanli.png");
                    break;
                case Pb_God._emTopListType.TopListType_Element: //  元素神殿;
                    this.addNormalValueLabel(info.value);
                    break;
                case Pb_God._emTopListType.TopListType_Risk: //  神界冒险;
                    this.addNormalValueLabel(info.subvalue);
                    this.addNormalValueLabel(info.value);
                    break;
                case Pb_God._emTopListType.TopListType_PlayerLevel: //  玩家等级
                    this.addNormalValueLabel(info.value);
                    break;
                case Pb_God._emTopListType.TopListType_Champion: //  冠军赛
                    this.addNormalValueLabel(info.value);
                    break;
                case Pb_God._emTopListType.TopListType_BWWeekChampion: //  周冠军赛
                    this.addNormalValueLabel(info.value);
                    break;
                case Pb_God._emTopListType.TopListType_BWFctionWar: //公会战
                    this.addNormalValueLabel(info.value);
                    this.addNormalValueLabel(info.subvalue);
                    break;
                case Pb_God._emTopListType.TopListType_BWLadder: //  跨服天梯
                    this.showHeadFightPower(info.value);
                    this.addNormalValueLabel(info.factionname || Global.getLangStr("faction_none"));
                    break;
                case Pb_God._emTopListType.TopListType_Sail://远航
                case Pb_God._emTopListType.TopListType_ClickGold://点金
                case Pb_God._emTopListType.TopListType_Expedition://远征
                case Pb_God._emTopListType.TopListType_Raid://快速作战
                case Pb_God._emTopListType.TopListType_RiskCount://神界冒险
                case Pb_God._emTopListType.TopListType_HeavenStar:// 天界副本星数
                case Pb_God._emTopListType.TopListType_BWChallenge: //  竞技场;
                case Pb_God._emTopListType.TopListType_AcitivtyBoss://限时挑战
                    this.addNormalValueLabel(info.value);
                    break;
            }
        }

        /** 设置列表项所占用的宽度配置 */
        public setTableWidthList(valueWidthList: Array<number>): void
        {
            this._valueWidthList = valueWidthList.slice(0);
            this._nomalLabelList = [this.txtNormalValue1, this.txtNormalValue2, this.txtNormalValue3];
            let w1 = this._valueWidthList.shift();
            let w2 = this._valueWidthList.shift();
            //玩家头像昵称放在第二格的中间
            this.playerView.x = w1 + (w2 >> 1);
            //具体数值从第三个开始
            this._posMove = w1 + w2;
        }

        /** 设置一个居中的元件，并且移动标记位 */
        private addNodePos(node: any): void
        {
            let nWidth = this._valueWidthList.shift() || 0;
            node.x = this._posMove + (nWidth >> 1);
            this._posMove += nWidth;
        }

        /** 增加数值显示  (普通文本)
            @param value 具体数值
            @param isSpecific 是否为特殊值显示， 其实就是把颜色调成屎黄色
         */
        public addNormalValueLabel(value: number | Long | string)
        {
            let label = this._nomalLabelList.shift();
            this.setLabelText(label, value + "");
            this.addNodePos(label);
        }

        /** 增加带小图标显示的数值文本
            @param value 具体数值
            @param icon 图标skin路径
            @param isSpecific 是否为特殊值显示， 其实就是把颜色调成屎黄色
             */
        public addIconValueLabel(value: number | Long | string, icon: string): void
        {
            this.valueIcon.skin = icon;
            this.hboxIconValue.visible = true;
            this.txtIconValue.text = value + "";
            this.hboxIconValue.refresh();
            this.addNodePos(this.hboxIconValue);
        }

        /** 增加带膜拜按钮的数值显示 */
        public addWorshipValue(value: number | Long | string, worshipCount: number): void
        {
            this.worshipView.visible = true;
            this.addNodePos(this.worshipView);
            this.txtWorshipValue.text = value + "";
            this.txtWorshipCount.text = worshipCount + "";
            let isCanWorship = this._playerdisplay && this._playerdisplay.playerid != PlayerDataMgr.uid && !ChallengeDataMgr.checkPlayerLike(this._playerdisplay.playerid) &&
                !ChallengeDataMgr.isLikeMax();
            this.btnWorship.disabled = !isCanWorship;
            this.btnWorship.onClick(this, () =>
            {
                this.btnWorship.disabled = true;
                ChallengeSend.like(this._playerdisplay.playerid);
            })
        }

        /** 显示头像下的战斗力 */
        public showHeadFightPower(value: number | Long | string): void
        {
            this.headFightPowerBox.visible = true;
            this.txtNickname.centerY = -16;
            this.txtFightPower.text = value + "";
        }

        /** 在同一列显示两行文字的 */
        public addTwoLineValue(value1: number | Long | string, value2: number | Long | string): void
        {
            this.twoLineValueBox.visible = true;
            this.twoLineValue1.text = value1 + "";
            this.twoLineValue2.text = value2 + "";
            this.addNodePos(this.twoLineValueBox);
        }




        /** 文本显示 */
        private setLabelText(label: Laya.Label, text: string): void
        {
            label.visible = !!text;
            label.text = text;
        }
    }
}