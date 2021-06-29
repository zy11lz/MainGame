module Pro {
    export class HeroDefendPreviewItem extends ProUI.Hero.HeroDefend.item.HeroDefendPreviewItemUI {

        onAwake() {
            this.list_ball.setDragStatue(false);
            this.list_hero.setDragStatue(false);
            

        }
        setData(rank:number){
            let rankInfo:cfg.DefendRankCfgInfo=cfg.DefendRankCfgData.getInfo(rank);
            //let levelInfo:cfg.DefendLevelCfgInfo=cfg.DefendLevelCfgData.getInfo(rankInfo.maxLevel);
            
            this.lbl_rank.text=Global.getLangStr("HeroDefendMsg5",rankInfo.rank,rankInfo.maxLevel);

            let colorStr:string="#5d565d";
            if(rank==DefendDataMgr.rank){
                colorStr="#34aa28";
            }else if(rank>DefendDataMgr.rank){
                colorStr="#818181";
            }

            let titleStr:string="#5d565d";
            if(rank==DefendDataMgr.rank){
                titleStr="#5d565d";
            }else if(rank>DefendDataMgr.rank){
                titleStr="#818181";
            }


            //属性加成列表
            let attrAry: Array<cfg.AddAtterInfo>=cfg.DefendLevelCfgData.getAddBaseAttrAryByIndex(rankInfo.maxLevel);
            this.list_ball.onRefresh(attrAry.length,this,(itemUI: ProUI.Utils.AtterItemInfoUI, index: number) =>
            {
                let tmpAtterID = attrAry[index].type;
                itemUI.imgType.frame = tmpAtterID;
                itemUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
                itemUI.NumLb.text = attrAry[index].value.toString() ;
                itemUI.NumLb.color = colorStr;
                itemUI.TitleLb.color = titleStr;
            });

            let attrAry2: Array<cfg.AddAtterInfo>=cfg.DefendLevelCfgData.getAddPetAttrAryByIndex(rankInfo.maxLevel);
            this.list_hero.onRefresh(attrAry2.length,this,(itemUI: ProUI.Utils.AtterItemInfoUI, index: number) =>
			{
				let tmpAtterID = attrAry2[index].type;
				itemUI.imgType.frame = tmpAtterID;
				itemUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
				itemUI.NumLb.text = attrAry2[index].value.toString() ;
				itemUI.NumLb.color = colorStr;
				itemUI.TitleLb.color = titleStr;
            });




        }





    }
}