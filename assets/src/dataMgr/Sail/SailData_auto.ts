
/**
*
*  根据 proto 文件自动生成的代码
*
* 【**不可手动修改此类**】，
*
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的proto文件】
*
* @author liuYang.AutoCreater
*
*/

module Pro
{
	export class SailData_auto extends SailDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用错误返回
			EventMgr.on(Cmd.S2C_Sail_Common.cmdName, this, this.onCommon)
			//	 刷新返回 	PBG2CSailRefresh
			EventMgr.on(Cmd.S2C_Sail_Refresh.cmdName, this, this.onRefresh)
			//	 接取返回		PBPlayerSailInfo
			EventMgr.on(Cmd.S2C_Sail_Accpet.cmdName, this, this.onAccpet)
			//	 完成返回		PBU32
			EventMgr.on(Cmd.S2C_Sail_DelAccpet.cmdName, this, this.onDelAccpet)
		}
		/*****
		 *	 通用错误返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *	 刷新返回 	PBG2CSailRefresh
		 * @param PBG2CSailRefresh
		 * 		dayfreecount			uint32	 免费次数
		 * 		daybuycount			uint32	 购买次数
		 * 		refresh			PBPlayerSailIndex	 刷新的数据
		 */
		protected onRefresh(value: Pb_God.PBG2CSailRefresh): void
		{
			let tempIndex = 0;
			while (tempIndex < this.sail.refresh.length)
			{
				if (this.getSailInfo(this.sail.refresh[tempIndex].sn) == null)
				{
					this.sail.refresh.splice(tempIndex, 1);
				}
				else
				{
					tempIndex++;
				}
			}
			this.sail.refresh = this.sail.refresh.concat(value.refresh);
			this.sail.dayfreecount = value.dayfreecount;
			this.refreshSailList(true);
			SoundMgr.Inst().playSound("refresh");
		}
		/*****
		 *	 接取返回		PBPlayerSailInfo
		 * @param PBPlayerSailInfo
		 * 		sn			uint32	 sn
		 * 		index			uint32	 索引 配置表中
		 * 		endtime			uint32	 结束时间
		 * 		petsn			uint64	 派遣伙伴sn
		 */
		protected onAccpet(value: Pb_God.PBPlayerSailInfo): void
		{
			//删除刷新列表
			{
				let tempIndex = -1;
				for (let i = 0; i < this.sail.refresh.length; i++)
				{
					if (this.sail.refresh[i].sn == value.sn)
					{
						tempIndex = i;
						break;
					}
				}
				if (tempIndex != -1)
				{
					this.sail.refresh.splice(tempIndex, 1);
				}
			}
			this.sail.accpet.push(value);
			//接取任务时，不需要抛出事件刷新列表，只需要排序即可
			this.refreshSailList(true);
			this.reddotModel.refresh();
		}
		/*****
		 *	 完成返回		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDelAccpet(value: Pb_God.PBU32): void
		{
			//删除刷新列表
			{
				let tempIndex = -1;
				for (let i = 0; i < this.sail.refresh.length; i++)
				{
					if (this.sail.refresh[i].sn == value.value)
					{
						tempIndex = i;
						break;
					}
				}
				if (tempIndex != -1)
				{
					this.sail.refresh.splice(tempIndex, 1);
				}
			}

			//删除接受列表
			{
				let tempIndex = -1;
				for (let i = 0; i < this.sail.accpet.length; i++)
				{
					if (this.sail.accpet[i].sn == value.value)
					{
						tempIndex = i;
						break;
					}
				}
				if (tempIndex != -1)
				{
					this.sail.accpet.splice(tempIndex, 1);
				}
			}

			this.refreshSailList(true);
			this.reddotModel.refresh();
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}