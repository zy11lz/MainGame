
module Pro
{
	/**
	 * 奖励界面弹出弹出
	 */
	export class AwardOpenUIData extends BaseOpenUIData
	{
		public ItemList: Array<cfg.AddItemInfo>;		/* | Pb_God.PBItemInfo*/
		public PetList: Pb_God.PBPetStar[];
		public CallbackMap: ds.StringMap<CallBack>;  	/**key：按钮文字 */ 
		public CustomJson: any;					 		/** 携带显示参数 */
		constructor(PanelName: string)
		{
			super(PanelName);
		}
	}

	/** PanelNotify.Open_NormalAward
	 * 奖励界面弹出工具类，用于临时存放奖励数据，在合适的时候再弹出来（有某些特定的场合下，是需要锁定奖励，延后弹出的） */
	export class AwardOpenUtils
	{
		private static _locking = false;
		private static _saveOpenData: AwardOpenUIData = null;
		private static _itemLists: Array<cfg.AddItemInfo>; // 10毫秒间隔内获取的道具
		private static _petLists:  Array<Pb_God.PBPetStar>;
		public static setLock(lock: boolean)
		{
			this._locking = lock;
			//解锁时，把没弹出的内容弹出来
			if (!lock)
			{
				if (this._saveOpenData)
					this.OpenUI(this._saveOpenData);
				this._saveOpenData = null;
			}
		}

		private static OpenUI(uiData: AwardOpenUIData): void
		{
			UIManager.Inst.forceOpen(uiData);
		}

		/**
		 * 设置普通奖励提
		 * @param itemList          物品奖励信息
		 * @param petList           伙伴奖励信息
		 * @param customJson      携带参数 
		 * @param callbackMap       key：按钮文字 
		 */
		public static showAwardOpen(itemList: cfg.AddItemInfo[], petList: Pb_God.PBPetStar[],customJson: any = null, callbackMap: ds.StringMap<CallBack> = null): void
		{
			let uiOpenData = new AwardOpenUIData(PanelNotify.Open_NormalAward);
			uiOpenData.ItemList = itemList;
			uiOpenData.PetList = petList;
			uiOpenData.CallbackMap = callbackMap;
			uiOpenData.CustomJson = customJson;
			if (this._locking)
			{
				this._saveOpenData = uiOpenData;
			} else
			{
				this.OpenUI(uiOpenData);
			}
		}

		/**
		 * 设置普通奖励（100毫秒间隔内奖励累计显示）
		 * @param itemList          物品奖励信息
		 * @param petList           伙伴奖励信息
		 * @param delaytime         延迟间隔时间
		 */
		public static showTimeAwardOpen(itemList: cfg.AddItemInfo[], petList: Pb_God.PBPetStar[] = null, delaytime: number = 150): void
		{
			if(!this._itemLists)this._itemLists = [];
			if(!this._petLists)this._petLists = [];
			if(itemList)this._itemLists = this._itemLists.concat(itemList);
			if(petList)this._petLists = this._petLists.concat(petList);
			let itemLen: number = this._itemLists.length;
			let petLen: number = this._petLists.length;
			setTimeout(function ()
			{
				if (itemLen == this._itemLists.length && petLen == this._petLists.length)
				{
					let uiOpenData = new AwardOpenUIData(PanelNotify.Open_NormalAward);
					uiOpenData.ItemList = this._itemLists;
					uiOpenData.PetList = this._petLists;
					this.OpenUI(uiOpenData);
					this._itemLists = [];
					this._petLists = [];
				}
			}.bind(this, itemLen,petLen), delaytime);
		}
	}
}