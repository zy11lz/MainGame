module Pro
{

    /**
    * 
    * 技能预览描叙
    *
    */
    export class SkillDesItemView extends ProUI.SkillReview.SkillDesItemUI
    {
		private _data:cfg.SkillNewSkillCfgInfo;
		/**当前技能的等级 */
		private _skillLv:number;

        constructor()
        {
            super();
            this.init();
        }
        private init()
        {

            this.btn_buff.onClick(this, this.onClickHandler);
        }

        private onClickHandler()
        {

            Pro.UIManager.Inst.forceOpen(new Pro.BaseOpenUIData(PanelNotify.Open_SkillBuff,this._data));


        }
        setData(data:cfg.SkillNewSkillCfgInfo,UIOpenData:SkillReviewOpenUIData,tmpSkillLv:number,index:number){
            this._data=data;
			
			this._skillLv=tmpSkillLv;

            let tmpColor:string="#5d565d";

            if(UIOpenData.isUnlock&&data.skillLevel==tmpSkillLv){
                tmpColor="#47b13c";
			}
			// else if(data.skillLevel>tmpSkillLv){
            //     tmpColor="#8c8168";
            // }
                
			this.lbl_des.color=tmpColor;
			this.lbl_des.text=data.des;

			let addTarBuff=cfg.SkillNewSkillCfgData.getAddTarBuffIndex(data.skillIndex);
            this.btn_buff.visible=addTarBuff.length>0;
            this.btn_buff.y=this.lbl_des.y+(this.lbl_des.textField.textHeight>>1);

            this.lbl_lv.text="LV."+data.skillLevel;
            this.lbl_lv.y=this.btn_buff.y-12;


            this.height=this.lbl_des.y+this.lbl_des.textField.textHeight+40;

            

            //技能等级
			if (UIOpenData.skinID > 0)
			{
				let tmpSkillAry = cfg.PetSkinCfgData.getAddSkillAryById(UIOpenData.skinID);
				let tmpSkillIndex = -1;
				for (let i = 0; i < tmpSkillAry.length; i++)
				{
					if (tmpSkillAry[i].value1 == data.skillID)
					{
						tmpSkillIndex = i + 1;
					}
				}
				//没有激活，第一个的显示
				if (!UIOpenData.isUnlock)
				{
					if(index==0){
						this.activeCondition(tmpSkillIndex);
					}else{
						this.upgradeCondition(tmpSkillIndex);
					}
				}
				else if(data.skillLevel>tmpSkillLv){
					this.upgradeCondition(tmpSkillIndex);
				}
				else 
				{
					this.lbl_unlock.showText ="";
				}
				
			}
			else{//守护技能
				if(data.skillLevel>tmpSkillLv){
					let defendinfo:cfg.DefendSkillCfgInfo=cfg.DefendSkillCfgData.getInfoBySkillidLevelGroup(data.skillID+"_"+data.skillLevel);
					if(defendinfo){
						this.lbl_unlock.showText = Global.getLangStr("item_review_msg19",defendinfo.petStar);
					}
					else{
						this.lbl_unlock.showText = "";
					}
				}else{
					this.lbl_unlock.showText = "";
				}
				

				




			}
		}
		
		showLine(bol:boolean){
            this.img_line.visible=bol;
		}


		/**
		 * 升级技能
		 * @param tmpSkillIndex 技能索引从1开始
		 */
		upgradeCondition(tmpSkillIndex:number){
			let tmpStar = 0;
			for (let i = 0; i < cfg.PetUpsartSkillCfgData.getDataAll().length; i++)
			{

				let tmpInfo = cfg.PetUpsartSkillCfgData.getDataAll()[i];
				let tmpAry = cfg.PetUpsartSkillCfgData.getAddSkillAryById(tmpInfo.star);

				for (let j = 0; j < tmpAry.length; j++)
				{
					if (tmpAry[j].value1 == tmpSkillIndex && tmpAry[j].value2 >= this._data.skillLevel)
					{
						tmpStar = tmpInfo.star;
						break;
					}
				}

				if (tmpStar > 0)
				{
					break;
				}
			}
			this.lbl_unlock.showText = Global.getLangStr("skill_msg2", tmpStar);
		}
		/**
		 * 激活技能
		 * @param tmpSkillIndex 技能索引从1开始
		 */
		activeCondition(tmpSkillIndex:number){
			let tmpAdvance = 0;
			for (let i = 0; i < cfg.PetAdvanceCfgData.getDataAll().length; i++)
			{

				let tmpInfo = cfg.PetAdvanceCfgData.getDataAll()[i];
				let tmpAry = cfg.PetAdvanceCfgData.getAddSkillAryById(tmpInfo.advance);

				for (let j = 0; j < tmpAry.length; j++)
				{
					if (tmpAry[j].value1 == tmpSkillIndex)
					{
						tmpAdvance = tmpInfo.advance;
						break;
					}
				}

				if (tmpAdvance > 0)
				{
					break;
				}
			}
			this.lbl_unlock.showText = Global.getLangStr("skill_msg1", tmpAdvance);



		}


		






    }


}