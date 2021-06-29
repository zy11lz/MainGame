module Pro
{

    /**
    * 
    * 技能预览描叙
    *
    */
    export class SkillBuffItemView extends ProUI.SkillReview.SkillBuffItemUI
    {
        private _data:cfg.BuffNewBuffCfgInfo;
         

        constructor()
        {
            super();
        }
        
        setData(buffid:string){
            let info=cfg.BuffNewBuffCfgData.getInfo(Number.parseInt(buffid));
            this.imgIcon.frame=info.buffType;
            this.lbl_name.text=info.buffName;
            this.lbl_des.text=info.desc;

           
            this.height=this.lbl_des.y+this.lbl_des.textField.textHeight+16;
        }

        showLine(bol:boolean){
            this.img_line.visible=bol;
        }



    }


}