/**
  * 全局数据存储
  */

module GlobalData
{
  /** 玩家当前所在场景 */

  export enum StandScene
  {
    Default,
    Login,
    Main,
    Battle
  }

  export var isUseWebgl:boolean = false;

  /** 是否已经进入游戏（加载完必备资源） */
  export var isLoadGame = false;

  /** 玩家基本数据是否已经加载完成 */
  export var MDataLoadedData = false;

  /** 调试环境下是否打印网络通信 */
  export var isPringNetMsg = true;
  /** 调试环境下是否打印战斗数据 */
  export var isPringBattleInfo = false;

  /** 玩家所在场景 */
  export var MInScene: StandScene = StandScene.Default;

  /** 是否读取本地配置 */
  export var loadConfigLocal: boolean = true;


  /** 外网测试服特殊标记，可处理一些额外的调试信息 */
  export var testServerTag = false;

  /** 货币与钻石的换算比例 */
  export var moneyToDiamon = 10;

  /** 游戏版本号 */
  export var Version: string = "1.0.0.4";

   /** 游戏版本号 */
  export var MainVersion: number = -1;

  /** 前端关键版本标记(不做显示，仅作标记判定) */
  export var VersionNumber: string = null;

  /** 设备信息 */
  export var deviceInfo = null;

  export var isShowDebugInfo:boolean = true;


  /** 是否发布版本， 保持格式不动，发布脚本会自动修改成true */
  GlobalData.isRelease = false;

  /** 是否采用menifest(version.json)版本控制资源加载 */
  // export var isFileNameVersion = false; //默认为false 在发布时脚本自动判定处理， 所以保持格式不要动。
  export function getUuid(){
    let key = Pro.EnumLocalStorageKey.UUID;
    let uuid = Laya.LocalStorage.getItem(key);
    if (!uuid)
    {
      uuid =  Global.getUUID();
      Laya.LocalStorage.setItem(key,uuid);
    }
    return uuid;

  }


}