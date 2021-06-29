module Pro
{
    /**
     * 界面说明： 精英通天塔主界面
     * 目前此界面的内容和普通精英塔的内容基本一致， 之所以拆出一个单独的mediator，是在部分战斗逻辑中，需要判定对应的界面。 同时也是为后续针对精英塔的扩展做一些准备。
    * @author jason.xu
    */
    export class StarTowerMainAdvMediator extends StarTowerMainMediator
    {

        // /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        // public autoLoadAtlas(): Array<any> {
        //     return [UrlMgr.getAtlas('')];
        // }
        constructor()
        {
            super();
            this._type = 2;
            this._battleType = Pb_God._emBattleType.BattleType_Tower2;
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [
                "res/startower/tongtianta_bg03.jpg",
                "res/startower/tongtianta_bg04.jpg",
                "res/startower/tongtianta_pic11.png",
                "res/startower/tongtianta_pic12.png",
                "res/startower/tongtianta_pic13.png",
                "res/startower/tongtianta_pic14.png"
            ];
        }

    }
}