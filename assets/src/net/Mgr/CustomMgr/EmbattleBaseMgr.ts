
module Pro.Net
{

	/**
	 * 阵法数据操作管理器
	 */
	export class EmbattleBaseMgr
	{

		constructor()
		{
			Global.EventsNotifyControl(this.listensEvents(), false);
		}

		//-----------------------------管理自定义事件-----------------------------------
		/** 本类监听消息列表 */
		private listensEvents(): Array<any>
		{
			return [
				Cmd.S2C_Pet_Set_Zhenfa_Ack, this, this.S2C_Pet_Set_Zhenfa_Ack,
			]
		}

		//-----------------------------------阵法------------------------------------
		/** 所有布阵信息 */
		public BuZhenList: Array<BuZhenInfo> = new Array<BuZhenInfo>();
		/** 当前操作的布阵类型 */
		private BuZhenCurType: number = -1;
		/** 当前暂存的布阵信息 */
		private CurBuzhenDic: ds.StringMap<BuZhenInfo> = new ds.StringMap<BuZhenInfo>();

		/** 初始化 */
		public init(zhenInfo: Pb_God.PBPlayerZhenfa)
		{
			this.CurBuzhenDic.clear();
			this.BuZhenList.splice(0, this.BuZhenList.length);
			for (let i = 0; i < zhenInfo.zhenfainfo.length; i++)
			{
				let tmpInfo = zhenInfo.zhenfainfo[i];
				this.addNewBuZhen(tmpInfo.id, tmpInfo.type, tmpInfo.posdata, tmpInfo.artifactid);
			}
			PetDataMgr.refreshOnStoreHeroForMainLine();
		}

		/**
		 * 添加一个新的布阵
		 * @param zhengfaid   阵法id
		 * @param teamType    布阵类型
		 * @param posdata     上阵角色sn
		 * @param artifactid  神器ID
		 */
		public addNewBuZhen(zhengfaid: number, teamType: number, posdata?: Pb_God.PBPlayerZhenfaPos[], artifactid: number = 0): BuZhenInfo
		{

			let tempInfo = new Net.BuZhenInfo(zhengfaid, teamType, posdata, artifactid);
			if (posdata == null)
			{
				let tmpMainLine = this.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
				if (tmpMainLine != null)
				{
					tempInfo.switchZhenfaId(zhengfaid, tmpMainLine.getPosData(true, true));
					tempInfo.setZhenxingId(tmpMainLine.getZhenxingId().concat());
				}
			}
			this.BuZhenList.push(tempInfo);

			return tempInfo;
		}

		/**
		 * 清空当前操作缓存
		 */
		public clearCurBuZhen()
		{
			this.CurBuzhenDic.clear();
			this.BuZhenCurType = -1;
		}

		/**
		 * 切换当前操作的阵法
		 * */
		public switchCurBuZhen(teamType: Pb_God._emZhenfaType)
		{
			if (this.BuZhenCurType == teamType)
			{
				return;
			}
			this.BuZhenCurType = teamType;
			if (!this.CurBuzhenDic.containsKey(teamType))
			{
				let tmpInfo = this.getBuZhenInfo(teamType);
				this.CurBuzhenDic.put(teamType, tmpInfo.clone());
			}
		}

		/**
		 * 保存当前布阵信息
		 */
		public saveCurBuZhenInfo(tipsSucceed: boolean): boolean
		{
			let tmpInfo = this.getCurBuZhenInfo();
			if (tmpInfo.getOnStoreNum() == 0)
			{
				TipsUtils.showTipsByLanId("tips_msg57");
				return false;
			}
			this.getBuZhenInfo(this.BuZhenCurType).copy(tmpInfo);
			PetSend.set_Zhenfa_Ask(tmpInfo.getTeamType(), tmpInfo.getZhenfaId(), tmpInfo.getPosData(false), tmpInfo.getArtifactId());
			if (tipsSucceed)
			{
				TipsUtils.showTipsByLanId("tips_msg58");
			}
			if (this.BuZhenCurType == Pb_God._emZhenfaType.ZhenfaType_Zhuxian)
			{ PetDataMgr.refreshOnStoreHeroForMainLine(); }
			EventMgr.trigger(EventNotify.Embattle_Save, this.BuZhenCurType);
			return true;
		}

		/**
		 * 请求保存指定类型阵型
		 * @param buZhenType
		 */
		public saveBuZhenInfoByType(buZhenType: Pb_God._emZhenfaType, need_check: boolean): void
		{
			let tmpInfo = this.CurBuzhenDic.get(buZhenType);
			if (!tmpInfo)
			{
				return;
			}
			if (need_check && tmpInfo.getOnStoreNum() == 0)
			{
				TipsUtils.showTipsByLanId("tips_msg57");
				return;
			}
			this.getBuZhenInfo(buZhenType).copy(tmpInfo);
			PetSend.set_Zhenfa_Ask(tmpInfo.getTeamType(), tmpInfo.getZhenfaId(), tmpInfo.getPosData(false), tmpInfo.getArtifactId());
		}

		/** 根据阵法类型，取得英雄列表 */
		public getHerosByType(type: Pb_God._emZhenfaType): Net.hero[]
		{
			let tmpZhanFa = EmbattleDataMgr.getBuZhenInfo(type);
			if (!tmpZhanFa) { return []; }
			let ret = [];
			for (var posData of tmpZhanFa.getPosData())
			{
				let hero = tmpZhanFa.getHeroByStorePosInfo(posData);
				if (hero) { ret.push(hero); }
			}
			return ret;
		}

		/** 获取当前布阵信息 */
		public getCurBuZhenInfo(): BuZhenInfo
		{
			return this.CurBuzhenDic.get(this.BuZhenCurType);
		}

		/** 根据类型获取当前布阵信息 */
		public getCurBuZhenInfoByType(type: Pb_God._emZhenfaType): BuZhenInfo
		{
			return this.CurBuzhenDic.get(type);
		}

		public setCurBuZhenInfoByType(tType:Pb_God._emZhenfaType,buzhenInfo:BuZhenInfo)
		{
			this.CurBuzhenDic.put(tType,buzhenInfo);
		}

		/** 获取布阵信息 */
		public getBuZhenInfo(teamType: Pb_God._emZhenfaType): BuZhenInfo
		{
			let result = this.BuZhenList.filter(elment => elment.getTeamType() == teamType);
			return result.length > 0 ? result[0] : null;
		}
		/**获取英雄所在的布阵信息 */
		public getBuZhenInfoBySn(sn: Long):BuZhenInfo[]{
			let result = this.BuZhenList.filter(elment => {
				return elment.getStoredWithSameHeroSn(sn)? true: false;
			})
			return result.length > 0 ? result : null;

		}

		/** 获取阵法所有操作个数 */
		public getEmbattleMaxNum(): number
		{
			return 9;
		}

		//----------------------------------Event------------------------------------

		/** 阵法跟新成功 */
		private S2C_Pet_Set_Zhenfa_Ack(tmpClass: Pb_God.PBPlayerZhenfaInfo)
		{
			let tmpInfo = this.getBuZhenInfo(tmpClass.type);
			if (tmpInfo == null)
			{
				this.addNewBuZhen(tmpClass.id, tmpClass.type, tmpClass.posdata, tmpClass.artifactid);
				if (tmpClass.type == Pb_God._emZhenfaType.ZhenfaType_Zhuxian)
				{ PetDataMgr.refreshOnStoreHeroForMainLine(); }
			}
		}

	}
}