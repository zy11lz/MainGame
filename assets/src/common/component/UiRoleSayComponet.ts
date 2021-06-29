/*
* name;
*/
class UiRoleSayComponet
{
    private type: number;
    private txtSay: component.UIHtmlText;
    private sayPaoPao: Laya.Box;
    private clickBox: Laya.Box;

    constructor(type: number, txtSay: component.UIHtmlText, sayPaoPao: Laya.Box, clickBox: Laya.Box)
    {
        this.type = type;
        this.txtSay = txtSay;
        this.sayPaoPao = sayPaoPao;
        this.clickBox = clickBox;
        this.clickBox.on(LayaEvent.CLICK, this, this.onSkRoleClick);
    }

    private onSkRoleClick()
    {
        this.uiRoleSay();
    }

    private sayText(msg: string)
    {
        this.clearUiRoleSay();
        this.sayPaoPao.visible = true;
        this.txtSay.showText = this.txtSay.innerHTML = msg;
        var showTime = cfg.UiRoleSayCfgData.getShowTimeByUiType(this.type);
        Laya.timer.once(showTime, this, this.hideUiRoleSayTxt);
        var gapTime = cfg.UiRoleSayCfgData.getGapTimeByUiType(this.type);
        Laya.timer.once(gapTime, this, this.uiRoleSay);
    }

    uiRoleSay()
    {
        var sayTxt: string = cfg.UiRoleSayCfgData.getSayTxt(this.type);
        this.sayText(sayTxt);
    }

    eventSay()
    {
        var str = cfg.UiRoleSayCfgData.getEventSayByUiType(this.type);
        this.sayText(str);
    }

    clearUiRoleSay()
    {
        this.hideUiRoleSayTxt();
        Laya.timer.clear(this, this.hideUiRoleSayTxt);
        Laya.timer.clear(this, this.uiRoleSay);
    }

    private hideUiRoleSayTxt()
    {
        this.sayPaoPao.visible = false;
    }
}