/*
* name;
*/
class DevLoader extends BaseEnter
{
    onLoadingBgComplete()
    {
    }
    constructor()
    {
        super(-1, {}, -1);
        this.loadEngine();
    }

    loadEngine()
    {
        var load: JsLoader = new JsLoader();
        load.load("code/libs.js?v=" + Math.random(), EnterLoadSign.libs, this, this.onEngineLoad, false)
    }
    onEngineLoad = () =>
    {
        this.initLaya();
        this.loadCode();
    }

    //---------------- 3. 加载项目代码  ----------------------
    loadCode()
    {
        var load: JsLoader = new JsLoader();
        load.load("code/code.js?v=" + Math.random(), EnterLoadSign.code, this, this.onCodeLoad, false)
    }

    onCodeLoad = (e) =>
    {
        // GlobalData.isRelease = true;
        var gameMain = new Pro.GameMain(1, {});
    }
}


