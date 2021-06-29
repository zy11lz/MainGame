
module Pro
{
	/**
	 * 邮箱列表
	 */
	export class MailRecordTabel extends ProUI.Mail.Record.MainUI implements ITableView
	{

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.GetAllBtn.onClick(this, this.onGetAllClick);
			this.DelReadedBtn.onClick(this, this.onDelReadedClick);
		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			EventMgr.on(EventNotify.Mail_Changed, this, this.show);
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			EventMgr.off(EventNotify.Mail_Changed, this, this.show);
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			this.initMailList();
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		setData($data: any): void
		{

		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}

		//------------------------------------------------------------------------------------
		initMailList()
		{
			this.ItemList.onRefresh(MailDataMgr.getMailCount(), this, this.mailItemOnRefresh);
			this.GetAllBtn.visible = MailDataMgr.getMailCount() > 0;
			this.DelReadedBtn.visible = MailDataMgr.getMailCount() > 0;
		}

		mailItemOnRefresh(item: ProUI.Mail.Record.MailItemUI, index: number)
		{

			let mailInfo: Pb_God.PBMail = MailDataMgr.getMailByIndex(index);

			item.RedDotImg.visible = mailInfo.item.length > 0 && mailInfo.state != Pb_God._emMailState.MailState_Reward;
			item.NameLb.text = mailInfo.title.length > 0 ? mailInfo.title : cfg.MailCfgData.getMailTitleByMailType(mailInfo.type);
			item.NoReadLb.visible = mailInfo.state == Pb_God._emMailState.MailState_NoRead;
			item.BGFrameImg.frame = item.NoReadLb.visible ? 2 : 1;
			item.BgTexture.gray = item.NoReadLb.visible ? false : true;
			item.TimeLb.text = Global.getTimeLengthString(TimeController.currTimer / 1000 - mailInfo.sendtime) + Global.getLangStr("common_ago");
			item.RewardIconImg.frame = item.NoReadLb.visible ? 1 : 3;

			item.onClick(this, () =>
			{
				if (mailInfo.state == Pb_God._emMailState.MailState_NoRead)
				{
					MailSend.read(mailInfo.mailid);
				}
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_MailDetail, mailInfo));
			});
		}

		onGetAllClick()
		{
			MailSend.rewardAll();
		}

		onDelReadedClick()
		{
			MailSend.deleteAll();
		}
	}
}