module Pro {
    export class GuessHeroRankItem extends ProUI.GuessHero.item.GuessHeroRankItemUI {

        public _data: any;

        onAwake() {


        }

        public setData(data: Pb_God.PBTopListDetail) {
            this.lbl_name.text = data.playerdisplay.playername;
            this.image_icon.skin = Global.getHeadPathWithIconName(data.playerdisplay.headicon);
            this.lbl_score.text = data.info.value.toString(10);


            Global.setResIconWithItemID(this.image_icon, CfgID.ResType.Player_Icon, data.playerdisplay.head);
            //边框
            Global.setResHeadBorder(this.imgHeadBorder, data.playerdisplay.headicon);

            if (data.info.rank < 4) {
                this.frame_image.frame = data.info.rank;
                this.frame_image.visible = true;
                this.lbl_rank.text = "";

            } else {
                this.frame_image.visible = false;
                this.lbl_rank.text = data.info.rank.toString();

            }



        }








    }



}