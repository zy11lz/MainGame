
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
	export class GodDeployData_auto extends GodDeployDataMgrBase
	{
		constructor()
		{
			super()
			//失败才返回
			EventMgr.on(Cmd.S2C_GodDeploy_Common_Ack.cmdName, this, this.onCommon_Ack)
			//返回地址数据 PBGodDeployTopList
			EventMgr.on(Cmd.S2C_GodDeploy_TopList.cmdName, this, this.onTopList)
			//返回点赞数据 PBLikeInfo
			EventMgr.on(Cmd.S2C_GodDeploy_LikeInfo.cmdName, this, this.onLikeInfo)
		}
		/*****
		 *失败才返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{
			
		}
		/*****
		 *返回地址数据 PBGodDeployTopList
		 * @param PBGodDeployTopList
		 * 		petid			uint32	精灵id（对应排行榜id）
		 * 		detail			PBGodDeployTopListDetail	排行信息
		 * 		talent			PBGodDeployPetTalent	天赋信息
		 * 		godequip			PBGodDeployPetGodEquip	神装套装信息
		 * 		zhenfa			PBGodDeployZhenfa	阵容推荐
		 */
		protected onTopList(value: Pb_God.PBGodDeployTopList): void
		{
			
		}
		/*****
		 *返回点赞数据 PBLikeInfo
		 * @param PBLikeInfo
		 * 		petid			uint32	精灵id（对应排行榜id）
		 * 		petsn			uint32	精灵sn
		 * 		likesum			uint32	点赞数
		 */
		protected onLikeInfo(value: Pb_God.PBLikeInfo): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}