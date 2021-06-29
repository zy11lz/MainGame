
module Pro
{
	/**
	 * 邮箱内公告
	 */
	export class MailNoticeTabel extends ProUI.Mail.Notice.MainUI implements ITableView
	{
		private _isShow = false;
		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			//纵向滚动
			this.panel.vScrollBarSkin = null;
		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			EventMgr.on(EnumHttpApi.bulletin, this, this.onBulletin)
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			EventMgr.off(EnumHttpApi.bulletin, this, this.onBulletin)
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			this._isShow = true;
			this.panel.visible = false;
			HttpServer.bulletin();
		}

		onBulletin()
		{
			if (!this._isShow)
			{
				return;
			}
			if (NoticeDataMgr.isHaveNotice())
			{
				let str = NoticeDataMgr.getNoticeByIndex(0).content;//  arr[0]["Content"];
				this.imgEmpty.visible = false;
				this.panel.visible = true;
				str = str.replace(/[\n]/g, "<br>"); //换行换成html的格式
				str = StringUtils.formatPlatDescString(str);

				if (PlatformData.agreement && PlatformData.agreement == "pingu")
				{
					if (PlatformData.channelId == "oppo" || PlatformData.channelId == "vivo")
					{

					} else
					{
						//渠道的特殊要求
						str = str.replace("如有任何问题，请联系官方客服：349273877", "");
					}
				}

				this.htmlContent.showText = this.htmlContent.innerHTML = str;
				this.panelBox.height = this.htmlContent.contextHeight;
			}
			else
			{
				this.imgEmpty.visible = true;
				this.panel.visible = false;
			}
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{
			this._isShow = false;
		}

		setData($data: any): void
		{

		}

		/** 页签组件销毁 */
		dispose(): void
		{
			this._isShow = false;
		}
	}
}