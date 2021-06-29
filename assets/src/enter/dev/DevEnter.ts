/* eslint-disable no-console */
/*
* name;
*/
class DevEnter extends BaseEnter
{
    onLoadingBgComplete()
    {
        // throw new Error("Method not implemented.");
    }
    gmLoginInfo: string = "";
    constructor()
    {
        super(-1, {}, -1);
        GlobalData.isRelease = false;
        //控制台输出用， logI(...); logW(...); logE(...);
        logE("控制台输出用， logI(...); logW(...); logE(...);  不推荐用console.log, ");
        logE("不推荐用Laya.Dictionary, 使用  ds.StringMap<...>");
        logE("所有资源的url，都放在UrlMgr 里管理");
        logE("所有属性数据类型必须明确， 减少使用any， 和以[\"key\"] 的方式访问属性 ");
        logE("不推荐使用匿名函数， ");
        this.initLaya();
        // 这里用在调试工具里登录外网玩家账号，
        // gmLoginInfo的信息是 后台生成的，

        // this.gmLoginInfo = "?debug=true&uid=3243&platformid=2122004&time=1607307208569&sign=236a97811421de79feffe19642bf9b07";
        //  this.gmLoginInfo = "?debug=true&uid=155049978&platformid=2122050&time=1620826061661&sign=58800fb594cea2d7bc07e78ff8d72ab8";
        if (this.gmLoginInfo != "")
        {
            this.initGMLogin(2);
        } else
        {
            var game = new Pro.GameMain(1, {});
        }
    }

    initGMLogin(platformType: number)
    {
        platformType = platformType == null ? 2 : platformType;
        Laya.loader.load("http://update.kairong5.com/version/" + platformType + "/config.json?v =" + Math.random(),
            Laya.Handler.create(this, this.onPlatInfoLoad), null, Laya.Loader.JSON);
    }

    onPlatInfoLoad(aa, bb)
    {
        var parms = this.getParams();
        aa["__PLATFORM_ID__"] = parms["platformid"];
        window["__CONFIG__"] = aa;
        var game = new Pro.GameMain(1, {}, this.gmLoginInfo);
    }

    getParams()
    {
        var url = this.gmLoginInfo;      //获取url中"?"符后的字串
        var parms = {};
        if (url.indexOf("?") != -1)
        {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++)
            {
                parms[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return parms;
    }
}

if (window["devFlag"] && window["devFlag"] == true)
{
    console.log("devEnter")
    setTimeout(function ()
    {
        var dev = new DevEnter();
    }, 500);
}