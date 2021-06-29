
module Pro
{
	/**
	 * 召唤
	 */
	export class HeroExchangeCallTabel extends ProUI.Hero.HeroExchange.Call.MainUI implements ITableView
	{

		/** 上次选择得 */
		SelectIndex: number = -1;
		/** 上次召唤的数量 */
		LastIsTen = false;

		/** 特效 */
		Eff_show_List: Array<EffNode> = [];
		Eff_card_select_1: EffNode;
		Eff_card_select_2: EffNode;
		uiRoleSayComponent: UiRoleSayComponet;

		BALL_ANIS: Array<string> = ["dsq_jinglinqiu_effect_loop", "cjq_jinglinqiu_effect_loop", "jinglinqiu_effect_loop", "dsq_jinglinqiu_effect_loop"];
		BALL_SKES: Array<string> = ["chouka/buzhuo/menghuanqiu", "chouka/buzhuo/menghuanqiu", "chouka/buzhuo/menghuanqiu", "chouka/buzhuo/buzhuo"];

		// 龙骨动画列表，
		skeList: Array<SkeletonPlayer> = [];

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			let i = 0;
			for (const elment of this.CallBox._children)
			{
				let tmpCallBtn = elment.getChildByName("call") as component.UIButton;
				let tmpCherkBtn = elment.getChildByName("cherk") as component.UIButton;
				tmpCallBtn.onClick(this, this.onCallFunClick);
				tmpCherkBtn.onClick(this, this.onCallCherkClick);

				this.setBallState(elment, false);

				// let sk = new Pro.SkeletonPlayer();
				// sk.load(UrlMgr.getSpineSceneUrl("UIeffect/chouka"));
				// elment.addChild(sk);
				// sk.playByIndex(2, true);
				// sk.pos(100,200)
				// sk.blendMode = "lighter";

				// sk.pos();
				// sk.scale();
				// sk.zOrder = -1;

				let tmpBall = elment.getChildByName("ball") as Laya.Image;
				tmpBall.skin = "";
				tmpBall.y = 0;

				let sk = new SkeletonPlayer();
				sk.play(this.BALL_ANIS[i], true);
				tmpBall.addChild(sk);
				sk.pos(tmpBall.width / 2, tmpBall.height / 2);
				sk.scale(0.8, 0.8);
				sk.load(UrlMgr.getSpineSceneUrl(this.BALL_SKES[i]));

				this.skeList.push(sk);

				++i;
			};
			this.uiRoleSayComponent = new UiRoleSayComponet(UiRoleSayType.XIAN_ZHI, this.txtSay, this.sayPaoPao, this.skRoleClick);
			this.initAni();
		}

		private initAni()
		{
			// let sk = new Pro.SkeletonPlayer();
            // sk.load(UrlMgr.getSpineSceneUrl("npc/menghuanchouka/menghuanchouka"));
            // this.aniPos.addChild(sk);
			// sk.playByIndex(0,true);
		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			EventMgr.on(CmdEvent.Call_Update, this, this.refreshCallBtn);
			EventMgr.on(CmdEvent.Common_ShowPrize, this, this.onShowPrize);
			this.btnOneCall.onClick(this, this.onSureClick);
			this.btnTenCall.onClick(this, this.onSureTenClick);
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			EventMgr.off(CmdEvent.Call_Update, this, this.refreshCallBtn);
			EventMgr.off(CmdEvent.Common_ShowPrize, this, this.onShowPrize);
			this.uiRoleSayComponent.clearUiRoleSay();
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			if (this.Eff_show_List.length == 0)
			{
				// this.CallBox._children.forEach(elment =>
				// {
				// 	let tmpEffNodeParent = elment.getChildByName("call") as component.UIButton;
				// 	let tmpCallID = parseInt(elment.name) + 1;
				// 	let tmpEffPos = new Laya.Point(70 + (tmpCallID > 2 ? 10 : 0), 80);
				// 	let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_heroExchange_card_" + tmpCallID, tmpEffPos, -1, 1, 1, tmpEffNodeParent, false, ResReleaseType.Reference, true);
				// 	this.Eff_show_List.push(tmpEffNode);
				// });
				{
					let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_heroExchange_cardSelect_1", new Laya.Point(377, 77), -1, 1, 1, this.selectEffNodeParent, false, ResReleaseType.Reference);
					this.Eff_show_List.push(tmpEffNode);
					this.Eff_card_select_1 = tmpEffNode;
					this.Eff_card_select_1.visible = false;
				}
				{
					let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_heroExchange_cardSelect_2", new Laya.Point(377, 77), -1, 1, 1, this.selectEffNodeParent, false, ResReleaseType.Reference);
					this.Eff_show_List.push(tmpEffNode);
					this.Eff_card_select_2 = tmpEffNode;
					this.Eff_card_select_2.visible = false;
				}
			}
			this.refreshCallBtn();
			this.uiRoleSayComponent.uiRoleSay();
			
			for(let i = 0;i < this.skeList.length; ++i){
				this.skeList[i].visible = true;
			}
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

			if (this.Eff_show_List.length > 0)
			{
				this.Eff_show_List.forEach(elment =>
				{
					EffectMgr.Inst.releaseEffect(elment)
				});
				this.Eff_show_List.splice(0, this.Eff_show_List.length);
				this.Eff_card_select_1 = null;
				this.Eff_card_select_2 = null;
			}

			if (this.SelectIndex != -1)
			{

				let tmpOldSelectImg = this.CallBox.getChildAt(this.SelectIndex) as Laya.Image;
				tmpOldSelectImg.y = 2;

				this.SelectIndex = -1;
			}

			for(let i = 0;i < this.skeList.length; ++i){
				this.skeList[i].visible = false;
			}

			for (const elment of this.CallBox._children)
			{
				this.setBallState(elment, false);
			};
		}

		//-------------------------------召唤展示----------------------------------
		private onShowPrize(value: Pb_God.PBG2CCommonShowPrize)
		{
			if (value.doingtype != Pb_God._emDoingType.DoingType_PetCall2)
			{
				return;
			}

			let tmpCallType = CallDataMgr.getXZCallTypeAry()[this.SelectIndex];
			let needItem = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(tmpCallType, this.LastIsTen ? 10 : 1)[0];
			let mapCallBack =  new ds.StringMap<CallBack>();
            mapCallBack.put("确定",null);
			let str =  this.LastIsTen  ? 'hero_msg30' :'hero_msg29' 
            mapCallBack.put(Global.getLangStr(str),new CallBack(this, this.onAgain,[tmpCallType, this.LastIsTen]));
            AwardOpenUtils.showAwardOpen(value.item as any,null,{itemid:needItem.itemid,itemcount:needItem.itemcount},mapCallBack);
			//  UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroExchangeCallReward, value.item, [tmpCallType, this.LastIsTen]));
		}

		/** 再来 */
        private onAgain(args): void
        {
            let isTen: boolean = args[1];
            let callType: number = args[0];
            CallDataMgr.sendCall(callType, isTen)
        }

		setData($data: any): void
		{

		}

		/** 页签组件销毁 */
		dispose(): void
		{
			for(let i = 0;i < this.skeList.length; ++i){
				this.skeList[i].destroy();
			}
			this.skeList.splice(0, this.skeList.length);
		}

		//-------------------------------------------------------------------------------------------
		/** 刷新召唤按钮状态 */
		refreshCallBtn()
		{
			let SelectIndex = this.SelectIndex;
			let isSeleType = SelectIndex != -1;
			if (!isSeleType) { SelectIndex = 0; }

			let callType = CallDataMgr.getXZCallTypeAry()[SelectIndex];
			let tmpOneNeedItem = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(callType, 1)[0];
			let tmpTenNeedItem = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(callType, 10)[0];

			Global.setResIconWithItemID(this.iconOneCall, CfgID.ResType.Item, tmpOneNeedItem.itemid);
			Global.setResIconWithItemID(this.iconTenCall, CfgID.ResType.Item, tmpTenNeedItem.itemid);
			this.txtOneCallLabel.text = tmpOneNeedItem.itemcount + Global.getLangStr("ui_HeroCall_msg12");
			this.txtTenCallLabel.text = tmpTenNeedItem.itemcount + Global.getLangStr("ui_HeroCall_msg12");
			this.hboxOneCall.refresh();
			this.hboxTenCall.refresh();

			this.reddotOneBtn.visible =  Global.isFullAllRes([tmpOneNeedItem], false);
			this.reddotTenCall.visible = Global.isFullAllRes([tmpTenNeedItem], false);
		}

		/** 确定召唤 */
		onSureClick()
		{
			if (this.SelectIndex == -1)
			{
				TipsUtils.showTipsByLanId("tips_msg30");
				return;
			}
			let tmpCallType = CallDataMgr.getXZCallTypeAry()[this.SelectIndex];
			if (CallDataMgr.sendCall(tmpCallType, false))
			{
				this.LastIsTen = false;
			}
		}

		/** 确定10次召唤 */
		onSureTenClick()
		{
			if (this.SelectIndex == -1)
			{
				TipsUtils.showTipsByLanId("tips_msg30");
				return;
			}
			let tmpCallType = CallDataMgr.getXZCallTypeAry()[this.SelectIndex];
			if (CallDataMgr.sendCall(tmpCallType, true))
			{
				this.LastIsTen = true;
				this.uiRoleSayComponent.eventSay();
			}
		}

		/** 选择一个准备召唤 */
		onCallFunClick(btn: component.UIButton)
		{
			let tmpSelectIndex = parseInt(btn.parent.name);
			if (this.SelectIndex == tmpSelectIndex)
			{
				return;
			}

			if (this.SelectIndex != -1)
			{
				let tmpOldSelectImg = this.CallBox.getChildAt(this.SelectIndex) as Laya.Image;
				// tmpOldSelectImg.y = 2;
				// let tmpOldCherkBtn = tmpOldSelectImg.getChildByName("cherk") as component.Image;

				this.setBallState(tmpOldSelectImg, false);
			}

			let tmpNewSelectImg = this.CallBox.getChildAt(tmpSelectIndex) as Laya.Image;
			// tmpNewSelectImg.y = -22;
			this.setBallState(tmpNewSelectImg, true);

			this.SelectIndex = tmpSelectIndex;

			this.Eff_card_select_1.visible = false;
			this.Eff_card_select_2.visible = false;

			let tmpCardParentPosX = this.CallBox.x + (btn.parent as Laya.Box).x + (btn.parent as Laya.Box).width / 2;

			if (this.SelectIndex == 0 || this.SelectIndex == 3)
			{
				this.Eff_card_select_1.visible = true;
				this.Eff_card_select_1.x = tmpCardParentPosX;
				this.Eff_card_select_1.scaleX = this.SelectIndex == 0 ? 1 : -1;
			}
			else
			{
				this.Eff_card_select_2.visible = true;
				this.Eff_card_select_2.x = tmpCardParentPosX;
				this.Eff_card_select_2.scaleX = this.SelectIndex == 1 ? 1 : -1;
			}

			this.refreshCallBtn();
		}

		/** 选择一个查看召唤 */
		onCallCherkClick(btn: component.UIButton)
		{
			let tmpIndex = parseInt(btn.parent.name);
			let tmpCallType = CallDataMgr.getXZCallTypeAry()[tmpIndex];
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroExchangeReward, tmpCallType));
		}

		setBallState(target: Laya.Box, selected:boolean)
		{
			// base
			let tmpBase = target.getChildByName("base") as Laya.Image;
			tmpBase.skin = selected ? "res/seerpalace/xianzhishengdian_dizuo_02.png" : "res/seerpalace/xianzhishengdian_dizuo_01.png";

			// light
			let tmpLight = target.getChildByName("light") as Laya.Image;
			tmpLight.visible = selected;

			// text
			let tmpCherk = target.getChildByName("cherk") as component.UIButton;
			let tmpCherkText = tmpCherk.getChildByName("text") as component.UILabel;
			tmpCherkText.color = selected ? "#f13c55" : "#616465";

			let tmpBall = target.getChildByName("ball") as Laya.Image;
			tmpBall.y = selected ? -20 : 0;
		}
	}
}