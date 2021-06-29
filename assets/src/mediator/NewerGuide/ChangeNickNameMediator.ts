
module Pro
{
	/**
	*  新手引导取名称
	*/
	export class ChangeNickNameMediator extends BaseMediator implements IMediator
	{

		/** UI面板 */
		UIPanel: ProUI.Common.ChangeNickNameUI;

		private _sk: SkeletonPlayer;


		/**  服务器上已经使用过的玩家名字 */
		// private _useNameMap = new ds.StringMap<string>();

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Common.ChangeNickNameUI, 0, BaseAddLayer.TopUI);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			// this.UIPanel.NameInput.timer
			if (this._sk)
			{
				this._sk.removeSelf();
				this._sk = null;
			}
			this.closePanel();
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return ["res/guide/renameBg.png"];
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.ManBtn.onClick(this, this.onSexChoice);
			this.UIPanel.WomanBtn.onClick(this, this.onSexChoice);
			this.UIPanel.RandomNameBtn.onClick(this, this.onRandomName);
			this.UIPanel.SureBtn.onClick(this, this.onSure);

			this.initAni();
			this.initConch();
		}

		private initConch()
		{
			if (conch)
			{
				this.UIPanel.NameInput.on(Laya.Event.BLUR, this, () =>
				{
					this.adjustConchPos();
				})
			}
		}

		private adjustConchPos()
		{
			// if (conch)
			// {
			// 	this.UIPanel.NameInput.timer.frameOnce(1, this, () =>
			// 	{
			// 		this.UIPanel.NameInput["_tf"].graphics["_one"] && (this.UIPanel.NameInput["_tf"].graphics["_one"].y -= 4);
			// 	})
			// }
		}

		private initAni()
		{
			let sk = new Pro.SkeletonPlayer();
			sk.load(UrlMgr.getSpineSceneUrl("npc/boshi/boshi"));
			this.UIPanel.aniPos.addChild(sk);
			sk.playByIndex(0, true);
			sk.pos(0, -32);
			this._sk = sk;
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(CmdEvent.Common_PlayerRenameAck, this, this.onCommonRenameAck);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.onSexChoice(this.UIPanel.ManBtn);
			this.onRandomName();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 性别选择 */
		onSexChoice(btn: component.UIButton)
		{
			this.UIPanel.ManImg.visible = btn == this.UIPanel.ManBtn;
			this.UIPanel.WomanImg.visible = btn == this.UIPanel.WomanBtn;
		}

		/** 随机名称 */
		onRandomName()
		{
			//不在客户端查重了
			var strName = cfg.PlayerNameNameCfgData.getRandomName(this.UIPanel.ManImg.visible ? 0 : 1);
			this.UIPanel.NameInput.text = strName;
			this.adjustConchPos();
		}

		/** 确定改名 */
		onSure()
		{
			let tempStr = this.UIPanel.NameInput.text;
			tempStr = tempStr.replace(/\s*/g, ""); //去掉空白字符
			if (!tempStr)
			{
				TipsUtils.showTipsByLanId("tips_msg14");
				return;
			}

			if (Global.GetStrByteLen(tempStr) > 12)
			{
				TipsUtils.showTipsByLanId("tips_msg34");
				return;
			}

			if (FilterHelper.Inst.containStr(this.UIPanel.NameInput.text))
			{
				TipsUtils.showTipsByLanId("tips_msg15");
				return;
			}
			tempStr = tempStr.replace(/\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|[\u2000-\u2fff]/g, "")

			CommonSend.playerRename(tempStr, this.UIPanel.ManImg.visible ? 0 : 1);

			// 第一次创建角色上报数据

			let roleName: string = tempStr;

			ThirdMgr.sdkSystem.trackCreateRole(roleName);
			ThirdMgr.sdkSystem.trackRoleLogin(roleName);
		}

		/** 命名成功 */
		onCommonRenameAck()
		{
			this.closeUI();
			GuideMgr.Inst.nextActive();
		}
	}
}