module Pro{

    export class EvolutionMainViewItem extends Laya.Box{
        public imgIcon:component.UIFrameImage;
        public txtAttr:component.UILabel;
        public txtAttrValue:component.UILabel;

        constructor(){
            super();
        }
        onAwake(){
            this.imgIcon=this.getChildByName("imgIcon") as component.UIFrameImage;
            this.txtAttr=this.getChildByName("txtAttr") as component.UILabel;
            this.txtAttrValue=this.getChildByName("txtAttrValue") as component.UILabel;
        }
        setData(data:cfg.AddAtterInfo){
            let value:string=data.value>0?"+"+data.value:data.value.toString();
            this.txtAttrValue.text=value;
            this.imgIcon.frame=data.type;
            this.txtAttr.text= cfg.BattleCfgData.getDescByAttrType(data.type);

        }

    }

}