module Pro {
    export class GuessHeroRewardItem extends ProUI.GuessHero.item.GuessHeroRewardItemUI {

        public _data: any;

        onAwake() {


        }

        public setData(data: cfg.ToplistRewardCfgInfo,preData: cfg.ToplistRewardCfgInfo) {
            let addItemList: cfg.AddItemInfo[] = cfg.AddItemInfo.parse(data.reward);
            this.itemBox.onRefresh(addItemList.length, this, (itemUI: NorItemUI, index: number) => {
                itemUI.setItemInfo(addItemList[index]);
            })
            if(data.rank<4){
                this.lbl_des.text="";
                this.frame_image.visible=true;
                this.frame_image.frame=data.rank;

            }else{
                this.lbl_des.text=preData.rank+1+"~"+data.rank;
                this.frame_image.visible=false;
            }
        }








    }



}