/**
  * 游戏公用方法汇总
  * 使用方法如：Global.setCookie()
  */
module Global
{

    //=======================================================================================

    /** 根据语言包key取得当前语言版本的对应文字
     * 语言文字配置中，可支持{n}的格式化文本。
     */
    export var getLangStr = function (lanKey: string, ...args): string
    {
        //目前直接使用中文即可
        let text = I18n.zh[lanKey];
        if (!text) text = cfg.TextConfigCfgData.getChineseById(lanKey);
        if (text) return Global.FormatString(text, ...args);

        // if (!GlobalData.isRelease) logE("language key error!", lanKey);
        return lanKey;
    }

    /** 数字转中文 */
    export function numberToChinese(num: number): string
    {
        //(中文环境特有的方法， 此处暂不处理中文包，做国际化版本时依情况而定)
        let numList = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        if (num < 10) return numList[num];

        //此处只处理100以内即可
        let unit = "十";
        let tempValue = Math.floor(num / 10);
        let ret = "";
        if (tempValue > 1) ret += numList[tempValue];
        ret += unit;
        tempValue = num % 10; //个位
        if (tempValue != 0) ret += numList[tempValue];
        return ret;
    }

    /** 
     * 消息集合统一添加和移除,eventList=【eventID,caller,listener】,isOff=是否移除消息 
     * @param eventList 【eventID,caller,listener】
     * @param isOff 是否移除消息
     * */
    export function EventsNotifyControl(eventList: Array<any>, isOff: boolean)
    {
        for (let i = 0; i < eventList.length; i += 3)
        {
            var eventType: any = eventList[i];
            if (typeof (eventType) != "string" && typeof (eventType) != "number")
            {
                eventType = eventType.cmdName;
            }
            if (isOff)
            {
                Public.EventMgr.off(eventType, eventList[i + 1], eventList[i + 2]);
            }
            else
            {
                Public.EventMgr.on(eventType, eventList[i + 1], eventList[i + 2]);
            }
        }
    }

    /** 
     * 给sprite下的子节点排序 
     * @param parent*/
    export function sortSpriteNode(parent: Laya.Node)
    {
        let tmpChilden = parent._children.concat([]);
        tmpChilden.sort(
            function (a: Laya.Sprite, b: Laya.Sprite)
            {
                let tmpASpecialZ = a["specailZOrder"] != null ? a["specailZOrder"] : 0;
                let tmpBSpecialZ = b["specailZOrder"] != null ? b["specailZOrder"] : 0;
                if (tmpASpecialZ != tmpBSpecialZ) { return tmpASpecialZ - tmpBSpecialZ; }
                else if (a.y != b.y) { return a.y - b.y; }
                else if (a.x != b.x) { return b.x - a.x; }
                else { return a.height - b.height; }
            }
        );
        tmpChilden.forEach(element => { parent.addChild(element); });
    }


    // export function sortSpineSpriteNode(parent: spine.SpineLayer)
    // {
    //     let tmpChilden = parent._children.concat([]);
    //     tmpChilden.sort(
    //         function (a: Laya.Sprite, b: Laya.Sprite)
    //         {
    //             let tmpASpecialZ = a["specailZOrder"] != null ? a["specailZOrder"] : 0;
    //             let tmpBSpecialZ = b["specailZOrder"] != null ? b["specailZOrder"] : 0;
    //             if (tmpASpecialZ != tmpBSpecialZ) { return tmpASpecialZ - tmpBSpecialZ; }
    //             else if (a.y != b.y) { return a.y - b.y; }
    //             else if (a.x != b.x) { return a.x - b.x; }
    //             else { return a.height - b.height; }
    //         }
    //     );
    //     tmpChilden.forEach(element => { parent.addSkel(element); });
    // }

    /**
     * 自动布局Sprite中显示中的子节点
     * @param parent 父几点
     * @param drawDir 绘制防线，hor:横向布局，vel:纵向布局
     * @param space 间隔
     * @param align 布局方式 left:靠左/靠上，center:剧中，right:靠右/靠下
     */
    export function autoLayoutSpriteNode(parent: Laya.Sprite, drawDir: string = "hor", space: number = 20, align: string = "left")
    {

        let items = [];
        let maxWidth = 0;
        let maxHeight = 0;
        for (let i = 0, n = parent.numChildren; i < n; i++)
        {
            let item = parent.getChildAt(i) as Laya.Sprite;
            if (item && item.visible)
            {
                items.push(item);
                maxWidth += item.width * item.scaleX + space;
                maxHeight += item.height * item.scaleY + space;
            }
        }
        maxWidth -= space;
        maxHeight -= space;

        let tmpDetal = 0;
        for (let i = 0; i < items.length; i++)
        {

            let item = items[i];

            //横向排列
            if (drawDir == "hor")
            {
                let moveDetal = tmpDetal + item.width * item.scaleX * (isNaN(item.anchorX) ? 0 : item.anchorX);
                if (align == "left")
                {
                    item.x = moveDetal;
                }
                else if (align == "center")
                {
                    item.x = (parent.width - maxWidth) * 0.5 + moveDetal;
                }
                else if (align == "right")
                {
                    item.x = parent.width - maxWidth + moveDetal;
                }
                tmpDetal += item.width * item.scaleX + space;
            }//纵向排列
            else if (drawDir == "vel")
            {
                let moveDetal = tmpDetal + item.height * item.scaleY * (isNaN(item.anchorY) ? 0 : item.anchorY);
                //从上到下
                if (align == "left")
                {
                    item.y = moveDetal;
                }//中
                else if (align == "center")
                {
                    item.y = (parent.height - maxHeight) * 0.5 + moveDetal;
                }//从下到上
                else if (align == "right")
                {
                    item.y = parent.height - maxHeight + moveDetal;
                }
                tmpDetal += item.height * item.scaleY + space;
            }
        }
    }

    /**
     * 初始化一个Long数据
     */
    export function initLongFromValue(value: number | string, unsign: boolean = true): Long
    {
        let long = window["Long"];
        return long.fromValue(value, unsign) as Long;
    }

    /** 将PB里面的long转成number */
    export function longToNumber(value: number | Long): number
    {
        if (typeof (value) == "string") return Number(value);
        if (typeof (value) != "number") return (value as Long).toNumber();
        return value as number;
    }

    /** value为0的时候，获取默认值 */
    export function getNoZeroValue(value: number, defaut: number): number
    {
        if (value == 0)
        {
            return defaut;
        }
    }

    /** 将数值取最小整数(负数会先取正在取整) */
    export function floor(value: number): number
    {
        let tiveNum = value < 0 ? -1 : 1;
        return Math.floor(Math.abs(value)) * tiveNum;
    }

    /** 将数值取最大整整数(负数会先取正在取整) */
    export function ceil(value: number): number
    {
        let tiveNum = value < 0 ? -1 : 1;
        return Math.ceil(Math.abs(value)) * tiveNum;
    }

    /** 将数据折短 显示成 xx亿 或者 xx万的形式 */
    export function numberToTuckString(value: number): string
    {
        //中文环境折算成亿、万等， 其它语言环境的折算方式不一样，故此处无需导出语言包。
        //大于1亿转成xx亿（取两位小数并抹掉末尾的0）
        if (value >= 100000000)
        {
            var fixedValue = (value / 100000000).toFixed(2); //保留2位小数(1.13亿)
            //去掉小数点后面多余的0
            return parseFloat(fixedValue) + "亿";
        }
        if (value >= 100000) return Math.floor(value / 10000) + "万";
        return value + "";
    }

    /** 将百分比数字转换成百分比字符串
     * @param value 传入0.5，返回50%
     * @param fractionDigits 有效小数位
     *  */
    export function parsePercentNum(value: number, fractionDigits: number = 2): string
    {
        value = value || 0;
        value *= 100;
        if (value <= 0) return Math.floor(value) + "%";
        let ret = value.toFixed(fractionDigits);
        //去掉小数点后面多余的0
        return parseFloat(ret) + "%";
    }

    /** 将带有key列表数据转换成StringMap形式
     * @param list 对应的列表
     * @param key 列表元素的key
     * @param sourceMap 源映射表，可直接覆盖旧的表， 值入null时，会创建新的返回。
     * @param isClearSource 有传入源表时，是否需要先清理。
     */
    export function listToStringMapData<T>(list: Array<T>, key: string = "id", sourceMap: ds.StringMap<T> = null, isClearSource: boolean = true): ds.StringMap<T>
    {
        if (!list) list = [];
        let ret = sourceMap;
        if (!ret) ret = new ds.StringMap<T>();
        else if (isClearSource) ret.clear();
        if (!list) return ret;
        for (var el of list)
        {
            ret.put(el[key], el);
        }
        return ret;
    }
    /** 将列表转换成StringMap形式（用于对数组元素查找比遍历更多的场合）     * 
     * @param list 对应的列表
     * @param sourceMap 源映射表，可直接覆盖旧的表， 值入null时，会创建新的返回。
     * @param isClearSource 有传入源表时，是否需要先清理。
     */
    export function listToStringMap<T>(list: Array<T>, sourceMap: ds.StringMap<T> = null, isClearSource: boolean = true): ds.StringMap<T>
    {
        let ret = sourceMap;
        if (!ret) ret = new ds.StringMap<T>();
        else if (isClearSource) ret.clear();
        if (!list) return ret;
        for (var el of list)
        {
            ret.put(el + "", el);
        }
        return ret;
    }

    /** json格式转换成URL的参数 */
    export function jsonToUrlParam(obj: any, encode: boolean = false): string
    {
        let retArr: string[] = [];
        for (let key in obj)
        {
            if (encode)
            {
                retArr.push(encodeURI(key) + "=" + encodeURI(obj[key]));
            }
            else
            {
                retArr.push(key + "=" + obj[key]);
            }
        }
        return retArr.join("&");
    }

    /**
     * 位运算-检测是否存在相同位
     * @param mark 参考值
     * @param bit 对比位
     */
    export function cherkBit(mark: number, bit: number): boolean
    {
        return (mark & Global.initBit(bit)) > 0;
    }

    /**
     * 位运算-右移位
     * @param bit 移动位数
     */
    export function initBit(bit: number): number
    {
        return 1 << bit;
    }

    /** 将战斗属性添加到字典中 */
    export function recordAtterInfoToDic(tmpAttType: number, value: number, valuePer: number, stAttr: Laya.Dictionary)
    {
        let tmpAttrInfo = stAttr.get(tmpAttType) as cfg.AddAtterInfo;
        if (tmpAttrInfo == null)
        {
            tmpAttrInfo = new cfg.AddAtterInfo();
            tmpAttrInfo.type = tmpAttType;
            stAttr.set(tmpAttType, tmpAttrInfo);
        }
        tmpAttrInfo.value += value;
        tmpAttrInfo.valuePer += valuePer;
    }

    /** 职业对应攻击类型 */
    export function getSkillAttackType(uJobType: number): number
    {
        if (uJobType == Pb_God._emPetJobType.PetJobType_Fashi || uJobType == Pb_God._emPetJobType.PetJobType_FuZhu)
        {
            return Pb_God._emSkillAttackType.SkillAttackType_Magical;
        }
        return Pb_God._emSkillAttackType.SkillAttackType_Physical;
    }

    /** 战斗类型对应录像类型 */
    export function getVideoType(uBattleType: number): number
    {
        let uVideoType = 0;
        switch (uBattleType)
        {
            case Pb_God._emBattleType.BattleType_Hook:
                uVideoType = Pb_God._emVideoType.VideoType_Hook;
                break;
            case Pb_God._emBattleType.BattleType_Tower:
                uVideoType = Pb_God._emVideoType.VideoType_Tower;
                break;
            case Pb_God._emBattleType.BattleType_Tower2:
                uVideoType = Pb_God._emVideoType.VideoType_Tower2;
                break;
            case Pb_God._emBattleType.BattleType_Challenge:
                uVideoType = Pb_God._emVideoType.VideoType_Challenge;
                break;
            case Pb_God._emBattleType.BattleType_Temple:
                uVideoType = Pb_God._emVideoType.VideoType_Temple;
                break;
            case Pb_God._emBattleType.BattleType_FactionWar:
                uVideoType = Pb_God._emVideoType.VideoType_FactionWar;
                break;
            case Pb_God._emBattleType.BattleType_Risk:
                uVideoType = Pb_God._emVideoType.VideoType_Risk;
                break;
            case Pb_God._emBattleType.BattleType_Dan:
                uVideoType = Pb_God._emVideoType.VideoType_Dan;
                break;
            case Pb_God._emBattleType.BattleType_Ladder:
                uVideoType = Pb_God._emVideoType.VideoType_Ladder;
                break;
            case Pb_God._emBattleType.BattleType_Champion:
                uVideoType = Pb_God._emVideoType.VideoType_Champion;
                break;
            case Pb_God._emBattleType.BattleType_WeekChampion:
                uVideoType = Pb_God._emVideoType.VideoType_WeekChampion;
                break;
            case Pb_God._emBattleType.BattleType_Expedition:
                uVideoType = Pb_God._emVideoType.VideoType_PlayerExpdition;
                break;
            case Pb_God._emBattleType.BattleType_FightEachOther:
                uVideoType = Pb_God._emVideoType.VideoType_PlayerQiecuo;
                break;
            default:
                break;
        }

        return uVideoType;
    }

    //=========================================角色相关========================================
    /** 角色站立中心 */
    export function getHeroStandCenter(): Laya.Point
    {
        return new Laya.Point(GameConfig.curWidth() / 2, GameConfig.WinHeight / 2 - 30);
    }

    /** 
     * 战斗角色站立坐标 
     * @param standIndex 站立索引
     * @param isOwer 是否友方
     * */
    export function getHeroStandPos(standIndex: number, isOwer: boolean): Laya.Point
    {
        let tmpCol = Math.floor(standIndex / 10) - 1;//当前行
        let tmpRow = standIndex % 10 - 1;//当前列
        let centerPos = Global.getHeroStandCenter();
        let tmpPos: Laya.Point;
        if (isOwer)
        {
            tmpPos = new Laya.Point(centerPos.x - 120 - tmpRow * GameConfig.HeroStandHorSpace, centerPos.y + tmpCol * GameConfig.HeroStandVelSpace);
        }
        else
        {
            tmpPos = new Laya.Point(centerPos.x + 120 + tmpRow * GameConfig.HeroStandHorSpace, centerPos.y + tmpCol * GameConfig.HeroStandVelSpace);
        }
        if (tmpCol == 0)
        {
            tmpPos.x += GameConfig.HeroStandGradient;
        }

        if (tmpCol == 2)
        {
            tmpPos.x -= GameConfig.HeroStandGradient;
        }
        return tmpPos;
    }

    export function getHeroStandPos2(standIndex: number, isOwer: boolean): Laya.Point
    {
        let middleRow = 3;
        let tmpRow = Math.floor(standIndex / 10);//当前行
        let tmpCol = standIndex % 10;//当前列

        let centerPos = Global.getHeroStandCenter();
        let tmpPos: Laya.Point;
        if (isOwer)
        {
            tmpPos = new Laya.Point(centerPos.x - 98 - (tmpCol - 1) * GameConfig.HeroStandHorSpace2 - (tmpRow - middleRow) * GameConfig.HeroStandGradient2, centerPos.y + (tmpRow - middleRow) * GameConfig.HeroStandVelSpace2);
        }
        else
        {
            tmpPos = new Laya.Point(centerPos.x + 98 + (tmpCol - 1) * GameConfig.HeroStandHorSpace2 + (tmpRow - middleRow) * GameConfig.HeroStandGradient2, centerPos.y + (tmpRow - middleRow) * GameConfig.HeroStandVelSpace2);
        }

        return tmpPos;
    }







    /** 
     * 获取距离目标最近的目标点 
     * @param startPos 起始坐标
     * @param targetPos 目标坐标
     * @param limitDistance 距离目标最近距离
     * */
    export function getNPCNearPos(startPos: Laya.Point, targetPos: Laya.Point, limitDistance: number): Laya.Point
    {
        let tmpDistance = targetPos.distance(startPos.x, startPos.y);
        let tmpMoveSize = new Laya.Point(targetPos.x - startPos.x, targetPos.y - startPos.y);
        let tmpRota = Math.asin(Math.abs(tmpMoveSize.y / tmpDistance));// * 180 / Math.PI;
        let tmpLimit = tmpDistance - limitDistance;
        if (tmpLimit <= 0) { tmpLimit = 0 }
        let tmpMoveNear = new Laya.Point(tmpLimit * Math.cos(tmpRota) * (tmpMoveSize.x > 0 ? 1 : -1),
            tmpLimit * Math.sin(tmpRota) * (tmpMoveSize.y > 0 ? 1 : -1));
        return Global.PointPlus(startPos, tmpMoveNear);
    }

    /** 
     * 获取起始点到目标点的角度
     * @param startPos 起始坐标
     * @param targetPos 目标坐标
     */
    export function getNearRotation(startPos: Laya.Point, targetPos: Laya.Point): number
    {
        let tmpDistance = targetPos.distance(startPos.x, startPos.y);
        let tmpMoveSize = new Laya.Point(targetPos.x - startPos.x, targetPos.y - startPos.y);
        let tmpRota = Math.asin(Math.abs(tmpMoveSize.y / tmpDistance)) * 180 / Math.PI;
        return tmpRota;
    }

    //===========================================================================================================
    /** 
     * 创建一个BaseRole用于显示角色动画形象 
     * @param parentNode 显示节点
     * */
    export function createBaseRoleForPreview(parentNode: Laya.Sprite, showShadow: boolean = true): Pro.BaseRole
    {
        let roleInfo = new Pro.BaseRole(showShadow);
        if (showShadow)
        {
            // roleInfo.shadeUI.scale(1, 1);
            // parentNode.addChild(roleInfo.shadeUI);
        }
        roleInfo.pos(parentNode.width / 2, parentNode.height / 2);
        // parentNode.addChild(roleInfo);
        roleInfo.setParent(parentNode);
        return roleInfo;
    }

    /**
     * 回收一个BaseRole对象
     */
    export function removeBaseRole(roleInfo: Pro.BaseRole)
    {
        if (roleInfo == null)
        {
            return;
        }
        roleInfo.recycleRes();
    }


    /**
     * 随机形象展示
     */
    export function setRoleShowByRandom(roleInfo: Pro.BaseRole)
    {
        if (roleInfo == null)
        {
            return;
        }
        let allShape = cfg.PetSkinCfgData.getAllList();
        let shapeCfgInfo = allShape[Global.getRandomNum(0, allShape.length)];
        roleInfo.resetRes(shapeCfgInfo.id, Pro.RoleResType.Show, true);
    }

    //============================================================================================================

    /** 
     * 获取角色属性列表中某个属性值
     * @param tepAtterAry 角色属性列表
     * @param type 属性ID
     * */
    export function getAtterValue(tepAtterAry: Array<cfg.AddAtterInfo | Pb_God.PBAttrInfo>, type: Pb_God._emBattleAttribute): number
    {
        if (tepAtterAry == null)
        {
            return 0;
        }
        for (let i = 0; i < tepAtterAry.length; i++)
        {
            let tmpInfo = tepAtterAry[i];
            if (tmpInfo.type == type)
            {
                if (tmpInfo.value["toNumber"] != null)
                {
                    return Math.floor(Global.longToNumber(tmpInfo.value) / BATTER_ATTR_PERCENT);
                }
                return tepAtterAry[i].value as number;
            }
        }
        return 0;
    }

    /** 获取完整的属性显示（攻击  +100）
     * @param strSpace 属性名字与属性值之间的间隔填充
     */
    export function getFullAttrValueString(attr: cfg.AddAtterInfo, strSpace: string = "+", scale: number = 1): string
    {
        if (!attr) return "";
        let attrName = cfg.BattleCfgData.getDescByAttrType(attr.type);
        let attrValue = Global.getAttrValueString(attr,scale);
        return attrName + strSpace + attrValue;
    }


    /** 解析该属性值是数值成加还是百分比加成  获取属性值字符串展示(+100) 
     * @param scale 属性值乘以倍率
    */
    export function getAttrValueString(attr: cfg.AddAtterInfo, scale: number = 1): string
    {
        if (!attr) return "0";
        return Global.getAttrValueStringSub(attr.type, attr.value, attr.valuePer, scale);
    }

    /** 获取属性显示文字
     * @param valuePer 万分比数值
     * @param scale 显示倍率
     * @param percentFractionDigits 如果是百分比显示，保留小数点后几位数  比如2位数： 51.12%
     */
    export function getAttrValueStringSub(attrType: Pb_God._emBattleAttribute, value: number, valuePer: number, scale: number = 1, percentFractionDigits: number = 2): string
    {
        if (valuePer)
        {
            return Global.parsePercentNum(valuePer / 10000 * scale, percentFractionDigits);
        } else
        {
            //除了前4个，其它也是百分比显示
            if (attrType <= Pb_God._emBattleAttribute.BattleAttribute_Speed)
            {
                return Math.floor(value + 0.5) * scale + "";  //四舍五入
            } else
            {
                return Global.parsePercentNum(value / 10000 * scale, percentFractionDigits);
            }
        }
    }

    /** 根据服务器id获取服务器名字
     * 待配置完善
     */
    export function getWorldNameByWorldId(worldid: number): string
    {
        var strName = "服";
        return `[S${ worldid }]${ strName }`;
    }

    /** 根据分段进度列表获取对应的整体进度值 */
    export function getTotalProgressByChildValueList(childValueList: number[], value: number): number
    {
        let childCount = childValueList.length;
        let progress: number = 0;
        let tempValue: number = 0;
        let singleProgress = 1 / childCount;
        for (var i = 0; i < childCount; i++)
        {
            let childValue = childValueList[i];
            if (value >= childValue)
            {
                progress += singleProgress;
                tempValue = childValue;
            } else
            {
                progress += singleProgress * (value - tempValue) / (childValue - tempValue);
                break;
            }
        }
        return progress;
    }

    /** 设置进度条mask
     * @param bar 需要设置的进度条（有遮罩时也可传入遮罩来处理）
     * @param value 进度值（0-1）
     */
    export function setProgressBarMask(bar: Laya.UIComponent | Laya.Sprite, value: number): void
    {
        Global.setProgressBar(bar.mask, value, bar.width);
    }
    /** 设置进度条
     * @param bar 需要设置的进度条（有遮罩时也可传入遮罩来处理）
     * @param value 进度值（0-1）
     * @param maxWidth 进度条最大宽度， 有值时修改进度条实际宽度来实现拉伸， 无值时修改进度条的scaleX来实现拉伸
     */
    export function setProgressBar(bar: Laya.UIComponent | Laya.Sprite | laya.display.Sprite, value: number, maxWidth: number = 0): void
    {
        if (maxWidth <= 0)
        {
            bar.scaleX = Math.max(0.01, Math.min(1, value));
        } else
        {
            value = value >= 1 ? 1 : value;
            bar.width = Math.max(1, formatNum(maxWidth * value));
        }
        bar.repaint();
    }

    /**
     * 精度计算
     * @param f 浮点数
     * @param digit 保存位数
     */
    export function formatNum(f, digit = 2): number
    {
        var m = Math.pow(10, digit);
        return parseInt(f * m + "", 10) / m;
    }

    //=========================================物品数据相关========================================
    /** 检查道具列表中，是否有足够的道具
     * 与isFullAllRes的差别在于，此方法内的列表，只需要有一种满足条件即可。  与、或的区别
     */
    export function isFullSingleRes(costItemAry: Array<cfg.AddItemInfo>, attentionUI: boolean = true): boolean
    {
        if (costItemAry == null)
        {
            return true;
        }
        //从最后一个开始检查， 道具不足时，只提示第一个的即可，
        for (let i = costItemAry.length - 1; i >= 0; i--)
        {
            let tempInfo = costItemAry[i];
            if (Global.isFullRes(tempInfo.itemid, tempInfo.itemcount, attentionUI && i == 0))
            {
                return true;
            }
        }

        return false;
    }

    /** 
     * 消耗的资源是否足够
     * @param costItemAry 消耗列表
     * @param attentionUI 资源不够，是否自动弹出提示
     * */
    export function isFullAllRes(costItemAry: Array<cfg.AddItemInfo>, attentionUI: boolean = true): boolean
    {
        if (costItemAry == null)
        {
            return true;
        }

        for (let i = 0; i < costItemAry.length; i++)
        {
            let tempInfo = costItemAry[i];
            if (!Global.isFullRes(tempInfo.itemid, tempInfo.itemcount, attentionUI))
            {
                return false;
            }
        }

        return true;
    }

    /** 
     * 当前资源是否足够 
     * @param costItemID 道具ID
     * @param costItemNum 道具个数
     * @param attentionUI 资源不够，是否自动弹出提示
     * */
    export function isFullRes(costItemID: number, costItemNum: number, attentionUI: boolean = true)
    {

        let isFull = this.getItemNum(costItemID) >= costItemNum;
        if (attentionUI && !isFull)
        {
            if (costItemID == Pro.CfgID.ItemID.Diamond)
            {
                let itemNameStr = cfg.ItemCfgData.getNameById(costItemID);
                Pro.TipsUtils.showTipsByLanId("bag_msg7", itemNameStr);
                Pro.PlatformDataMgr.openChargeUI();
            }
            else
            {
                Pro.UIManager.Inst.forceOpen(new Pro.BaseOpenUIData(Pro.PanelNotify.Open_ItemAccess, costItemID));
            }
            Global.log("资源不足~ID:" + costItemID);
            if (costItemID == Pro.CfgID.ItemID.Diamond)
            {
                // 提示钻石不足时更新限时礼包按钮
                Public.LStorageMgr.GetInst().setLocalData("curTimeLimit", '3');
            }
        }
        return isFull;
    }

    /**
     * 根据道具ID获取道具个数
     * @param itemID 道具ID
     */
    export function getItemNum(itemID: number): number
    {
        let itemType = cfg.ItemCfgData.getTypeById(itemID);
        if (itemType == Pb_God._emItemType.ItemType_Resource)
        {
            return Pro.PlayerDataMgr.getExpendNum(itemID);
        }
        else
        {
            return Pro.ItemDataMgr.getBagItemNum(itemID);
        }
    }

    /** 
     * 获取物品的品质等级
     * @param resType 资源类型
     * @param itemID 星星个数
     * */
    export function getResQuNum(resType: Pro.CfgID.ResType, resSubID: number): number
    {
        let tempItem_Qu = 1;
        if (resType == Pro.CfgID.ResType.Item)
        {
            tempItem_Qu = cfg.ItemCfgData.getTypeById(resSubID) == Pb_God._emItemType.ItemType_GodEquip ? 5 : cfg.ItemCfgData.getQualityById(resSubID);
        }
        else if (resType == Pro.CfgID.ResType.Talent)
        {
            tempItem_Qu = cfg.SkillNewTalentUpgradeCfgData.getLevelBySkillIndex(resSubID);
        }
        else if (resType == Pro.CfgID.ResType.Skill)
        {
            let tmpSkillID = cfg.SkillNewSkillCfgData.getSkillIDBySkillIndex(resSubID);
            let tmpSkillLv = cfg.SkillNewSkillCfgData.getSkillLevelBySkillIndex(resSubID);
            if (Global.floor(tmpSkillID / 100000) == 4)
            {
                tempItem_Qu = tmpSkillLv;
            }
            else
            {
                tempItem_Qu = 1;
            }
        }
        tempItem_Qu = Math.max(0, tempItem_Qu);
        return tempItem_Qu;
    }

    /**
     * 获取英雄立绘图标资源
     */
    export function getResPetVDrawSkin(petID: number): string
    {
        return "res/Unpack/Icon/PetVDraw/" + cfg.PetCfgData.getSkinInfoByPetID(petID) + ".png";
    }

    /** 获取英雄卡片图标资源 */
    export function getResPetCardSkin(petID: number): string
    {
        return "res/Unpack/Icon/PetCard/c" + petID + ".png";
    }

    /** 获取圣物图标资源 */
    export function getResHolyIconSkin(petType: number, advanceLv: number): string
    {
        return "res/Unpack/Icon/heroHoly/icon_shengwu" + petType + "_" + Math.floor((advanceLv + 1) / 2) + ".png";
    }

    /**
     * 设置英雄职业名称
     * @param imageComponet Laya.Image
     * @param petJobType 种族类型
     */
    export function getResPetJobTypeName(petJobType: Pb_God._emPetJobType): string
    {
        return Global.getLangStr("pet_jobtype_name_" + petJobType);
    }

    /**
     * 设置英雄种族图标
     * @param imageComponet Laya.Image
     * @param petType 种族类型
     */
    export function setResPetType(imageComponet: Laya.Image, petType: Pb_God._emPetType)
    {
        imageComponet.skin = "res/common/common_pettype_" + petType + ".png";
    }


    /**
     * 设置英雄种族组合图标(职业和阵营共用一个图标)
     */
    export function setResPetGroupType(imageComponet: component.UIFrameImage, petId: number)
    {
        let petType = cfg.PetCfgData.getPetTypeByPetID(petId);
        let petJobType = cfg.PetCfgData.getPetJobTypeByPetID(petId);
        imageComponet.frame = petType + (petJobType - 1) * 5;
    }

    /**
     * 设置英雄种族阵营图标(职业和阵营共用一个图标)
     */
    export function setResPetPetID(imageComponet: component.UIFrameImage, petId: number)
    {
        let petType = cfg.PetCfgData.getPetTypeByPetID(petId);
        imageComponet.frame = petType;
    }

    export function setPetType(icon: component.UIFrameImage, petType: number)
    {
        icon.frame = petType;
    }
    export function setEvolveImg(icon: component.UIFrameImage, evolve: number = 0)
    {
        icon.frame = evolve + 1;
    }

    /**
     * 设置队伍阵法图标
     */
    export function setResPetZhengfa(imageComponet: Laya.Image, zhengfaID: number)
    {
        if (zhengfaID == 0) zhengfaID = 1;
        imageComponet.skin = "res/Unpack/form/form_icon_" + zhengfaID + ".png";
    }

    /**
     * 设置队伍阵型图标
     */
    export function setResPetZhengxing(zhengItemUI: ProUI.Utils.ZhengxingItemUI, zhengIDAry: Array<number>, showTitleTips: boolean = true)
    {

        if (zhengIDAry.length == 0)
        {
            zhengItemUI.UpStatueImg.visible = zhengItemUI.UpStatueLb.visible = false;
            zhengItemUI.DownImg.visible = zhengItemUI.DownStatueLb.visible = false;
            zhengItemUI.IconImg.skin = "res/common/pic_11.png";
        }
        else if (zhengIDAry.length == 1)
        {
            let tmpFormID = zhengIDAry[0];
            if (tmpFormID == 0)
            {
                zhengItemUI.UpStatueImg.visible = zhengItemUI.UpStatueLb.visible = false;
                zhengItemUI.DownImg.visible = zhengItemUI.DownStatueLb.visible = false;
                zhengItemUI.IconImg.skin = "res/common/common_zhengxin_1.png";
            }
            else
            {
                zhengItemUI.UpStatueImg.visible = zhengItemUI.UpStatueLb.visible = true;
                zhengItemUI.DownImg.visible = zhengItemUI.DownStatueLb.visible = false;
                Global.setResPetType(zhengItemUI.IconImg, cfg.BattleFormationAttrCfgData.getPetTypeByID(tmpFormID));
                zhengItemUI.UpStatueLb.text = cfg.BattleFormationAttrCfgData.getTypeCountByID(tmpFormID).toString();
            }
        }
        else
        {
            //id为 cs_battle表的阵型id
            //通过阵型id获得图片id  [id,[id，图片id]，] 
            let formation = [
                [2, [5, 10], [9, 11], [13, 9], [17, 8]],
                [6, [1, 10], [9, 5], [13, 6], [17, 7]],
                [10, [1, 11], [5, 5], [13, 4], [17, 2]],
                [14, [1, 9], [5, 6], [9, 4], [17, 3]],
                [18, [1, 8], [5, 7], [9, 2], [13, 3]],
            ]

            /**图片id */
            let PictureId: number

            for (let i = 0; i < formation.length; i++)
            {
                //+1的对比是因为相同精灵的3/2阵型和2/2阵型用的同一张图，但是2/2比3/2阵型的值少1
                if (zhengIDAry[0] == formation[i][0] || zhengIDAry[0] + 1 == formation[i][0])
                {
                    for (let j = 1; j < 5; j++)
                    {
                        if (zhengIDAry[1] == formation[i][j][0] || zhengIDAry[1] == formation[i][j][0] + 1)
                        {
                            zhengItemUI.IconImg.skin = "res/common/common_zhengxin_" + formation[i][j][1] + ".png";
                            PictureId = formation[i][j][1];
                        }
                    }
                }

            }

            zhengItemUI.UpStatueImg.visible = zhengItemUI.UpStatueLb.visible = true;
            zhengItemUI.DownImg.visible = zhengItemUI.DownStatueLb.visible = true;
            //  zhengItemUI.IconImg.skin = "res/common/common_zhengxin_8.png";

            //这里存了图片id及图片上半部分颜色所代表的精灵类型：[图片id，精灵类型]，注意：因为图片头部颜色和精灵类型相关连，所以图片的命名和上部颜色代表的精灵类型不可更改
            //感觉以后优化成色块显色比较好，现在的逻辑比较担心图片改了属性就对不上了
            let formationPictureHeadType = [[0, 0], [1, 0], [2, 3], [3, 4], [4, 4], [5, 2], [6, 2], [7, 2], [8, 5], [9, 4], [10, 2], [11, 3]];
            //没有值造成的原因是阵型没有变动所以没有赋值，获取当前的图片id即可
            if (!PictureId)
            {
                let skin = zhengItemUI.IconImg.skin;
                PictureId = +skin[skin.length - 1];
                for (let i = 0; i < formationPictureHeadType.length; i++)
                {
                    let skin1 = "res/common/common_zhengxin_" + formationPictureHeadType[i][0] + ".png";
                    if (skin == skin1)
                    {
                        PictureId = formationPictureHeadType[i][0];
                    }
                }

            }
            // 当前图片上半部颜色代表的精灵类型是否对应当前数量所对应的精灵类型，如果不对应调换数字上下位置
            if (formationPictureHeadType[PictureId][1] == cfg.BattleFormationAttrCfgData.getPetTypeByID(zhengIDAry[0]))
            {
                zhengItemUI.UpStatueLb.text = cfg.BattleFormationAttrCfgData.getTypeCountByID(zhengIDAry[0]).toString();
                zhengItemUI.DownStatueLb.text = cfg.BattleFormationAttrCfgData.getTypeCountByID(zhengIDAry[1]).toString();
            } else
            {
                zhengItemUI.UpStatueLb.text = cfg.BattleFormationAttrCfgData.getTypeCountByID(zhengIDAry[1]).toString();
                zhengItemUI.DownStatueLb.text = cfg.BattleFormationAttrCfgData.getTypeCountByID(zhengIDAry[0]).toString();
            }

        }
        zhengItemUI.TitleLb.visible = showTitleTips && zhengIDAry.length == 0;
    }

    /** 设置玩家头像边框 */
    export function setResHeadBorder(imageComponet: Laya.Image, id: number)
    {
        //这里处理一下动态头像框
        let skinInfo = cfg.ShapeHeadIconCfgData.getInfo(id);
        let aniFrameSk = imageComponet["__aniFrame__"];
        if (skinInfo && skinInfo.showAni)
        {
            if (!aniFrameSk)
            {
                aniFrameSk = new Pro.SkeletonPlayer();
                imageComponet["__aniFrame__"] = aniFrameSk;
                imageComponet.addChild(aniFrameSk)
                aniFrameSk.playByIndex(0, true);
                aniFrameSk.scale(0.6, 0.6);
            }
            imageComponet.skin = "";
            aniFrameSk.setRes(Pro.UrlMgr.getSpineSceneUrl(`touxiangkuang/${ skinInfo.aniName }`))
            return;
        }
        if (aniFrameSk)
        {
            aniFrameSk.removeSelf();
            imageComponet["__aniFrame__"] = null;
        }
        imageComponet.skin = `res/Unpack/Icon/PlayerFrame/${ id }.png`;
    }

    /** 设置称号资源 */
    export function setResShapeTitle(imageComponet: Laya.Image, id: number)
    {
        let iconName = cfg.ShapeTitleCfgData.getIconNameByID(id);
        imageComponet.skin = `res/Unpack/Icon/Title/${ iconName }.png`;
    }

    /** 设置形象半身像资源(此半身像形象为静态图，并非动画) 兼容旧数据 显示皮卡丘*/
    export function setResCard(imageComponet: Laya.Image, shapeId: number)
    {
        shapeId == 0 ? shapeId = 14503 : shapeId;
        imageComponet.skin = `res/Unpack/Icon/card_new/${ shapeId }.png`;
    }

    /**
     * 
     * @param imageComponet 
     * @param shapeId 兼容旧数据 显示皮卡丘
     */
    export function setResBigCard(imageComponet: Laya.Image, shapeId: number)
    {
        shapeId == 0 ? shapeId = 14503 : shapeId;
        imageComponet.skin = `res/Unpack/Icon/BigCard/${ shapeId }.png`;
    }

    /** 显示技能信息 */
    export function setSkilItem(itemUI: ProUI.Utils.SkillItemUI, skillId: number, skillLv: number, showLv: boolean, skinId: number = 0, isUnlock: boolean = true): void
    {
        let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(skillId, skillLv);
        itemUI.LvLb.text = tmpSkillInfo.skillLevel.toString();
        itemUI.LvImg.visible = showLv;
        Global.setResIconWithItemID(itemUI.IconImg, Pro.CfgID.ResType.Skill, tmpSkillInfo.skillIndex);
        itemUI.onClick(this, () =>
        {
            Pro.UIManager.Inst.forceOpen(new Pro.SkillReviewOpenUIData(skinId, tmpSkillInfo.skillIndex, isUnlock));
        });
    }

    /**
     * 显示技能列表
     * @param skillComponent 显示技能Icon的UIItemBox
     * @param skillIndexAry  技能索引列表
     */
    export function setSkillBoxWithIDList(skillComponent: component.UIItemBox, skillIndexAry: Array<number>, showLv: boolean)
    {
        skillComponent.onRefresh(skillIndexAry.length, this, (tmpUI: ProUI.Utils.SkillItemUI, index: number) =>
        {
            let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfo(skillIndexAry[index]);
            tmpUI.LvLb.text = tmpSkillInfo.skillLevel.toString();
            tmpUI.LvImg.visible = showLv;
            Global.setResIconWithItemID(tmpUI.IconImg, Pro.CfgID.ResType.Skill, tmpSkillInfo.skillIndex);
            tmpUI.onClick(this, () =>
            {
                Pro.UIManager.Inst.forceOpen(new Pro.SkillReviewOpenUIData(0, tmpSkillInfo.skillIndex));
            });
        });
    }

    /**
     * 显示技能列表
     * @param skillComponent 显示技能Icon的UIItemBox
     * @param showLock 是否显示(升级、解锁)状态
     * @param petID 伙伴ID
     * @param petAdvance 伙伴阶数
     * @param petStar 伙伴星级
     */
    export function setSkillBoxWithPetInfo(skillComponent: component.UIItemBox, showLock: boolean, skinID: number, petAdvance: number, petStar: number, showLv: boolean)
    {

        let tmpSkillAry = cfg.PetSkinCfgData.getAddSkillAryById(skinID);
        let tmpSKillNum = tmpSkillAry == null ? 0 : tmpSkillAry.length;
        let tmpSkillOpen = cfg.PetAdvanceCfgData.getAddSkillAryById(petAdvance);
        let tmpSkillLvs = cfg.PetUpsartSkillCfgData.getAddSkillAryById(petStar);

        skillComponent.onRefresh(tmpSKillNum, this, (tmpUI: ProUI.Utils.SkillItemUI, index: number) =>
        {

            let tmpIsOpend = true;
            let tmpSkillLv = 1;

            let maxLevel = cfg.SkillNewSkillCfgData.getMaxLevelBySkillId(tmpSkillAry[index].value1);
            if (showLock)
            {
                tmpIsOpend = index < tmpSkillOpen.length;
                tmpSkillLv = 1;
                if (tmpIsOpend)
                {
                    tmpSkillLv = tmpSkillOpen[index].value2;
                }
                if (tmpSkillLvs != null)
                {
                    tmpSkillLv = tmpSkillLvs[index].value2;
                }
                if (maxLevel < tmpSkillLv) tmpSkillLv = maxLevel;
            }
            else
            {
                tmpSkillLv = maxLevel;
            }

            Global.setSkilItem(tmpUI, tmpSkillAry[index].value1, tmpSkillLv, showLv, skinID, tmpIsOpend);
            tmpUI.gray = !tmpIsOpend;
        });

    }

    /** 刷新技能列表显示，只显示已经开启的技能 */
    export function setOpenSkillBoxWithPetInfo(skillListView: component.UIItemBox, skinId: number, petAdvance: number, petStar: number): void
    {
        let skillList = cfg.PetSkinCfgData.getAddSkillAryById(skinId);
        //进阶开启的技能
        let advanceSkills = cfg.PetAdvanceCfgData.getAddSkillAryById(petAdvance);
        //星级提升的技能等级
        let starSkills = cfg.PetUpsartSkillCfgData.getAddSkillAryById(petStar);
        let openSkillList: cfg.SkillNewSkillCfgInfo[] = [];
        for (let i = 0; i < skillList.length; i++)
        {
            let el = skillList[i];
            let skillId = el.value1;
            let isOpen = i < advanceSkills.length;
            if (!isOpen) continue;
            let skillLevel = 0;
            if (starSkills) skillLevel = starSkills[i].value2;
            else skillLevel = advanceSkills[i].value2;
            openSkillList.push(cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(skillId, skillLevel))
        }
        skillListView.onRefresh(openSkillList.length, null, (itemUI: ProUI.Utils.SkillSimpleItemUI, index: number) =>
        {
            let skillInfo = openSkillList[index];
            Global.setResIconWithItemID(itemUI.IconImg, Pro.CfgID.ResType.Skill, skillInfo.skillIndex);
            itemUI.onClick(this, () =>
            {
                Pro.UIManager.Inst.forceOpen(new Pro.SkillReviewOpenUIData(skinId, skillInfo.skillIndex, true));
            });
        })
    }

    /** 
     * 给Image设置品质框 
     * @param imageComponet Laya.Image
     * @param quNum 品质等级
     * */
    export function setResQuWithNum(imageComponet: Laya.Image, quNum: number): string
    {
        quNum = quNum > 5 ? 5 : quNum;
        let imgPath = `res/common/propicon_100_0${ quNum + 1 }.png`;
        let imgRes = Laya.loader.getRes(imgPath) as Laya.Texture;
        if (imgRes == null)
        {
            logI("imgResNoFind:" + imgPath);
            return;
        }
        imageComponet.skin = imgPath;
    }

    export function setIllustrationCardQuWithNum(img: Laya.Image, quNum: number)
    {
        quNum = quNum > 5 ? 5 : quNum;
        let imgPath = `res/heroIllustration/propicon_100_0${ quNum + 1 }.png`;
        let imgRes = Laya.loader.getRes(imgPath) as Laya.Texture;
        if (imgRes == null)
        {
            logI("img:" + imgPath);
            return;
        }
        img.skin = imgPath;
    }

    /**
     * 给文本框设置颜色
     * @param lbl 
     * @param quNum 品质等级 
     */
    export function setColorWithNum(lbl: component.UILabel, quNum: number): void
    {
        quNum = quNum > 5 ? 5 : quNum;
        let colorList = ["#777777", "#66806e", "#4c7399", "#734c80", "#b27700", "#d03c4d"];
        lbl.stroke = 2;
        lbl.strokeColor = colorList[quNum];
    }

    /** 
     *  给物品设置品质框
     * @param imageComponet Laya.Image
     * @param resType 资源类型
     * @param resSubID 子ID
     * */
    export function setResQuWithItemID(imageComponet: Laya.Image, resType: Pro.CfgID.ResType, resSubID: number)
    {
        let tempItem_Qu = Global.getResQuNum(resType, resSubID);
        Global.setResQuWithNum(imageComponet, tempItem_Qu);
    }

    /**
     * 给物品lbl设置品质颜色
     * @param lbl 
     * @param resType 资源类型 
     * @param resSubID 子ID
     */
    export function setColorWithItemID(lbl: component.UILabel, resType: Pro.CfgID.ResType, resSubID: number)
    {
        let tempItem_Qu = Global.getResQuNum(resType, resSubID);
        Global.setColorWithNum(lbl, tempItem_Qu);
    }

    /** 
     * 获取物品的品质颜色
     * */
    export function getResQuColor(qu: number): string
    {
        return ["#009e00", "#009e00", "#109af2", "#d618ff", "#ff6600", "#e60000", "#e60000", "#e60000"][qu];
    }

    // /** 
    //  * 设置英雄阵营文字颜色
    //  * */
    // export function setPetTypeTextColor(label: component.UILabel = null, petType: number = 0): string {
    //     let color       = ["#ffffff", "#37dcff", "#ff4d4d", "#10ec4e", "#ffd325", "#f695ff"][petType];
    //     let strokeColor = ["#673811", "#0a3a5c", "#650808", "#0a4019", "#63300a", "#5d0855"][petType];
    //     if (label) {
    //         label.color = color;
    //         label.strokeColor = strokeColor;
    //     }
    //     return color;
    // }

    export function getItemIconById(resSubID: number)
    {
        //显示伙伴碎片
        let tmpItemType = cfg.ItemCfgData.getTypeById(resSubID);
        if (tmpItemType == Pb_God._emItemType.ItemType_Pet)
        {

            let tmpSubType = cfg.ItemCfgData.getSubTypeById(resSubID) as Pb_God._emItemPetType;
            let tmpCombinId = cfg.ItemCfgData.getCompoundIDById(resSubID);

            //合成指定伙伴
            if (tmpSubType == Pb_God._emItemPetType.ItemPetType_PetID)
            {
                let head = cfg.PetSkinCfgData.getIconNameById(cfg.PetCfgData.getBaseSkinByPetID(tmpCombinId));
                return "res/Unpack/Icon/Head_new/" + head + ".png";
            }
        }

        return "res/Unpack/Icon/Item/" + cfg.ItemCfgData.getIconNameById(resSubID);
    }

    /** 
     * 给物品设置资源图标
     * @param imageComponet Laya.Image
     * @param resType 资源类型
     * @param resSubID 子ID
     * */
    export function setResIconWithItemID(imageComponet: Laya.Image, resType: Pro.CfgID.ResType, resSubID: number)
    {
        let imgPath = "";
        if (resType == Pro.CfgID.ResType.Item)
        {

            //显示伙伴碎片
            let tmpItemType = cfg.ItemCfgData.getTypeById(resSubID);
            if (tmpItemType == Pb_God._emItemType.ItemType_Pet)
            {

                let tmpSubType = cfg.ItemCfgData.getSubTypeById(resSubID) as Pb_God._emItemPetType;
                let tmpCombinId = cfg.ItemCfgData.getCompoundIDById(resSubID);

                //合成指定伙伴
                if (tmpSubType == Pb_God._emItemPetType.ItemPetType_PetID)
                {
                    Global.setResIconWithItemID(imageComponet, Pro.CfgID.ResType.Pet, cfg.PetCfgData.getBaseSkinByPetID(tmpCombinId));
                    return;
                }
            }

            imgPath = "res/Unpack/Icon/Item/" + cfg.ItemCfgData.getIconNameById(resSubID);
        }
        else if (resType == Pro.CfgID.ResType.Pet)
        {
            let head = cfg.PetSkinCfgData.getIconNameById(resSubID);
            imgPath = Global.getHeadPathWithIconName(head);
        }
        else if (resType == Pro.CfgID.ResType.Player_Icon)
        {
            imgPath = Global.getHeadPathWithIconName(cfg.PetSkinCfgData.getIconNameById(resSubID || 1));
        }
        else if (resType == Pro.CfgID.ResType.Skill)
        {
            let tmpSkillID = cfg.SkillNewSkillCfgData.getSkillIDBySkillIndex(resSubID);
            let tmpSkillLv = cfg.SkillNewSkillCfgData.getSkillLevelBySkillIndex(resSubID);
            //符文技能
            if (Global.floor(tmpSkillID / 100000) == 4)
            {
                imgPath = "res/Unpack/Icon/Skill/" + tmpSkillID + "_" + tmpSkillLv + ".png";
            }
            else
            {
                imgPath = "res/Unpack/Icon/Skill/" + tmpSkillID + ".png";
            }
        }
        else if (resType == Pro.CfgID.ResType.Talent)
        {
            let skillID = cfg.SkillNewTalentUpgradeCfgData.getSkillIDBySkillIndex(resSubID);
            let skillLv = cfg.SkillNewTalentUpgradeCfgData.getLevelBySkillIndex(resSubID);
            imgPath = "res/Unpack/Icon/Skill/" + skillID + "_" + skillLv + ".png";
        }
        else if (resType == Pro.CfgID.ResType.Artifact)
        {
            imgPath = "res/Unpack/Icon/Artifact/" + resSubID + ".png";
        }
        else if (resType == Pro.CfgID.ResType.ArtifactIcon)
        {
            imgPath = "res/Unpack/Icon/ArtifactIcon/" + resSubID + ".png";
        }
        else if (resType == Pro.CfgID.ResType.ArtifactHalfShape)
        {
            imgPath = "res/Unpack/Icon/ArtifactHalfShape/" + resSubID + ".png";
        }
        else if (resType == Pro.CfgID.ResType.ArtifactHead)
        {
            imgPath = "res/Unpack/Icon/ArtifactHead/" + resSubID + ".png";
        }
        else if (resType == Pro.CfgID.ResType.Buff)
        {
            let iconImg = cfg.BuffNewBuffCfgData.getIconByID(resSubID);
            imgPath = "res/battle/" + iconImg + ".png";
        }
        imageComponet.skin = imgPath;
    }

    /** 设置头像图标 */
    export function getHeadPathWithIconName(iconName: string | number): string
    {
        /**兼容一下旧数据 显示皮卡丘 */
        iconName == 0 ? iconName = 14503 : iconName;
        return "res/Unpack/Icon/Head_new/" + iconName + ".png";
    }

    /** 根据段位id取得段位的大图资源 */
    export function setDanBigIcon(img: Laya.Image, danId: number): void
    {
        let type = cfg.DanUpgradeCfgData.getTypeByDanID(danId);
        img.skin = `res/Unpack/Icon/Dan/bigtype_${ type }.png`;
    }

    /** 根据段位id取得段位的普通图资源 */
    export function setDanNormalIcon(img: Laya.Image, danId: number): void
    {
        img.skin = `res/Unpack/Icon/Dan/normal_${ danId }.png`;
    }

    /** 根据段位id取得段位大图上的文字资源 */
    export function setDanTextIcon(img: Laya.Image, danId: number): void
    {
        img.skin = `res/Unpack/Icon/Dan/text_${ danId }.png`;
    }

    /** 获取UI背景路径 */
    export function getUIBGPathWithName(name: string): string
    {
        let tmpUrl = cfg.UiconfigUibgCfgData.getUIBGNameWithPanel(name);
        if (tmpUrl == null)
        {
            return null;
        }
        return "res/Unpack/uibg/" + tmpUrl;
    }

    /** 获取UI背景路径 */
    export function getUIBGPathWithResUrl(tmpUrl: string): string
    {
        return "res/Unpack/uibg/" + tmpUrl;
    }

    /** 获取战斗背景路径 */
    export function getFightBGPathWithResUrl(tmpUrl: string): string
    {
        return "res/Unpack/FightBG/" + tmpUrl;
    }

    /** 获取Boss来袭背景路径 */
    export function getBossComingBGPathWithResUrl(bossBustID: number): string
    {
        return "res/Unpack/BossBust/" + bossBustID + ".png";
    }

    /**
     * 给资源类型的道具设置小图标  比如钻石、金币等
     */
    export function setResSmallIconWithItemID(imageComponet: Laya.Image, itemid: number): void
    {
        imageComponet.skin = "res/Unpack/Icon/Itemmini" + "/" + cfg.ItemCfgData.getIconNameById(itemid);
    }

    /** 
     * 判断当前资源状态显示资源需求文字的提示颜色
     * @param lbComonent   文字显示对象
     * @param itemID       道具ID
     * @param itemNum      道具个数
     * @param isCost       表示消耗元素
     * @param normalColor  道具充足颜色
     * @param emptyColor   道具不足颜色
     * */
    export function setResNumWithItemInfo(lbComonent: component.UILabel | component.UIBitmapText,
        itemID: number, itemNum: number, isShowTotle: boolean = false,
        isCost: boolean = false, normalColor?: string, emptyColor?: string)
    {

        let tmpAllNum = this.getItemNum(itemID);
        if (lbComonent.align != null && normalColor != null && emptyColor != null)
        {
            let labelUI = lbComonent as component.UILabel;
            if (isCost)
            {
                labelUI.color = tmpAllNum >= itemNum ? normalColor : emptyColor;
            }
            else
            {
                labelUI.color = normalColor;
            }
        }
        lbComonent.text = (!isShowTotle ? "" : Global.numberToTuckString(tmpAllNum) + "/") + Global.numberToTuckString(itemNum);
    }

    /** 绘制一行奖励表
     * @param ItemParent 绘制的层
     * @param ModelUI 模板UI的类名
     * @param RewardList 奖励列表
     * @param alignSpaceX 横向间隔
     * @param valignSpaceY 纵向间隔
     * @param align 横向排列方式
     * @param valign 纵向排列方式
     * @param isShowDesc 点击按钮显示描述
     * @param isCost 显示数字是否为消耗
     * @param normalColor  道具充足颜色
     * @param emptyColor   道具不足颜色
     * @param caller 按钮点击接受对象
     * @param listener 按钮反馈方法
     * @return 返回当前显示成几行
     */
    export function drawRewardView(ItemParent: Laya.Sprite, ModelUI: any, RewardList: Array<cfg.AddItemInfo>,
        alignSpaceX: number = 20, valignSpaceY: number = 20, align: string = "left", valign: string = "top",
        isShowDesc: boolean = false, isCost: boolean = false, normalColor = null, emptyColor = null,
        caller: any = null, listener: Function = null): number
    {

        let itemCount = RewardList == null ? 0 : RewardList.length;
        let itemSpaceX = 0, itemSpaceY = 0, colMax = -1, rowMax = 0, colIndex = 0, rowOfColNum = 0;

        for (let i = 0; i < itemCount; i++)
        {
            let NewItem = ItemParent.getChildAt(i) as any;
            if (NewItem == null)
            {
                NewItem = new ModelUI();
                ItemParent.addChild(NewItem);
            }
            NewItem.name = i.toString();
            NewItem.visible = true;

            //获取当前最大最大列数和最大行数
            if (colMax == -1)
            {
                itemSpaceX = NewItem.width + alignSpaceX;
                itemSpaceY = NewItem.height + valignSpaceY;

                //只显示一行
                if (Math.ceil(ItemParent.height / itemSpaceY) == 1)
                {
                    rowMax = 1;
                    colMax = itemCount;
                }
                else
                {
                    colMax = ItemParent.width / itemSpaceX;
                    let addNum = colMax - Math.floor(colMax) >= 0.7 ? 1 : 0;
                    colMax = Math.floor(colMax) + addNum;
                    rowMax = Math.ceil(itemCount / colMax);
                }
            }

            //当前显示的行数
            if (i > 0 && i % colMax == 0)
            {
                colIndex++;
            }
            //当前行显示的总列数
            rowOfColNum = (colIndex * colMax + colMax) <= itemCount ? colMax : (itemCount - colIndex * colMax);

            //计算坐标
            let showX = 0;
            let showY = 0;

            //列坐标
            if (align == "left")
            {
                showX = NewItem.width / 2;
            }
            else if (align == "center")
            {
                showX = ItemParent.width / 2 - itemSpaceX * (rowOfColNum - 1) / 2;
            }
            else
            {
                showX = ItemParent.width - itemSpaceX * rowOfColNum + NewItem.width / 2;
            }
            showX += (i % rowOfColNum) * itemSpaceX;

            //行坐标
            if (valign == "top")
            {
                showY = NewItem.height / 2;
            }
            else if (valign == "center")
            {
                showY = ItemParent.height / 2 - itemSpaceY * (rowMax - 1) / 2;
            }
            else
            {
                showY = ItemParent.height - rowMax * itemSpaceY + NewItem.height / 2;
            }
            showY += colIndex * itemSpaceY;

            //设置坐标
            NewItem.pos(showX, showY);

            //按照奖励模板显示信息
            let tmpData = RewardList[i];
            if (tmpData == null)
            {
                continue;
            }
            Global.drawItemUI(NewItem, tmpData, isShowDesc, isCost, normalColor, emptyColor, caller, listener);
        }

        //隐藏多余的
        for (let i = 0; i < ItemParent.numChildren; i++)
        {
            let tempTran = ItemParent.getChildAt(i) as Laya.Sprite;
            if (i >= itemCount)
            {
                tempTran.visible = false;
            }
        }

        return rowMax;
    }




    var itemInfos: cfg.AddItemInfo[] = [];
    var itemInfoStr: string = "";
    /** 根据道具或消耗品的获取来源，判断并弹出道具获得的tips */
    export function showItemTipsByDoingType(doingType: Pb_God._emDoingType, itemid: number, itemCount: number): void
    {
        if (itemCount <= 0) return;
        switch (doingType)
        {
            case Pb_God._emDoingType.DoingType_Like:
            case Pb_God._emDoingType.DoingType_Video:
            case Pb_God._emDoingType.DoingType_WeekChampion:
            case Pb_God._emDoingType.DoingType_UnlockPet:
                // case Pb_God._emDoingType.DoingType_Shop:  //商城在商城模块有做提示处理
                // case Pb_God._emDoingType.DoingType_Risk:
                // case Pb_God._emDoingType.DoingType_Risk:
                Pro.TipsUtils.showItemTips(itemid, itemCount);
                break;
            case Pb_God._emDoingType.DoingType_WeekLiveness:
            case Pb_God._emDoingType.DoingType_Liveness:
            case Pb_God._emDoingType.DoingType_Artifact:
            case Pb_God._emDoingType.DoingType_SystemOpen:
            case Pb_God._emDoingType.DoingType_Weal:
                itemInfoStr += `${ itemid }_${ itemCount };`
                setTimeout(function ()
                {
                    if (itemInfoStr.length > 1)
                    {
                        let itemInfos = cfg.AddItemInfo.parse(itemInfoStr.substr(0, itemInfoStr.length - 1));
                        for (let i = 0; i < itemInfos.length; i++) 
                        {
                            let pos = new Point(Laya.stage.width / 2 + (i - itemInfos.length + 1) * 108 / 2 + (i * 108), Laya.stage.height / 2);
                            EventMgr.trigger(Pro.EventNotify.Award_Effect_Fly, itemInfos[i], pos)
                        }
                    }
                    itemInfoStr = "";
                }.bind(this), 10);
                break;
            case Pb_God._emDoingType.DoingType_Achieve:
                Pro.AwardOpenUtils.showTimeAwardOpen(cfg.AddItemInfo.parse(`${ itemid }_${ itemCount }`));
                break;
            case Pb_God._emDoingType.DoingType_Risk:
                Pro.TipsUtils.showItemTips(itemid, itemCount);
                itemInfoStr += `${ itemid }_${ itemCount };`
                setTimeout(function ()
                {
                    if (itemInfoStr.length > 1)
                    {
                        let itemInfos = cfg.AddItemInfo.parse(itemInfoStr.substr(0, itemInfoStr.length - 1));
                        for (let i = 0; i < itemInfos.length; i++) 
                        {
                            let pos = new Point(Laya.stage.width / 2 + (i - itemInfos.length + 1) * 108 / 2 + (i * 108), Laya.stage.height / 2);
                            EventMgr.trigger(Pro.EventNotify.Award_Effect_Fly, itemInfos[i], pos)
                        }
                        itemInfoStr = "";
                    }
                }.bind(this), 10);
        }
    }

    /** 道具弹出tips文本 */
    export function getItemTipsString(itemId: number, itemCount: number): string
    {
        let itemName = cfg.ItemCfgData.getNameById(itemId);
        let ret = Global.FormatString("<font color='#e67c00'>{0}</font>", itemName);
        if (itemCount > 1) ret += "<font color='#4d9c6d'>x" + itemCount + "</font>";
        return ret;
    }


    /**
     * 刷新显示一个道具UI
     * @param NewItem Item UI模板
     * @param tmpData 数据源
     * @param isShowDesc 点击按钮显示描述
     * @param isShowTotal 显示背包数量
     * @param isCost 显示数字是否为消耗
     * @param normalColor  道具充足颜色
     * @param emptyColor   道具不足颜色
     * @param caller 按钮点击接受对象
     * @param listener 按钮反馈方法
     */
    export function drawItemUI(NewItem: any, tmpData: cfg.AddItemInfo, isShowDesc: boolean = false,
        isShowTotal: boolean = false, isCost: boolean = false, normalColor = null, emptyColor = null,
        caller: any = null, listener: Function = null)
    {
        Global.drawItemUIWithID(NewItem, tmpData.itemid, tmpData.itemcount, isShowDesc, isShowTotal, isCost, normalColor, emptyColor, caller, listener);
    }

    /**
     * 刷新显示一个道具UI
     * @param NewItem Item UI模板
     * @param tmpData 数据源
     * @param isShowDesc 点击按钮显示描述
     * @param isShowTotal 显示背包数量
     * @param isCost 显示数字是否为消耗
     * @param caller 按钮点击接受对象
     * @param listener 按钮反馈方法
     */
    export function drawItemUIWithID(NewItem: any, ItemID: number, ItemNum: number, isShowDesc: boolean = false,
        isShowTotal: boolean = false, isCost: boolean = false, normalColor = null, emptyColor = null,
        caller: any = null, listener: Function = null)
    {

        //加入点击事件
        if (NewItem.onClick != null)
        {
            if (listener != null)
            {
                NewItem.onClick(caller, listener);
            }
            if (isShowDesc)
            {
                NewItem.onTips(cfg.ItemCfgData.getDescById(ItemID));
            }
        }

        //显示品质框
        if (NewItem.skin != null)
        {
            Global.setResQuWithItemID(NewItem, Pro.CfgID.ResType.Item, ItemID);
        }

        //显示图标
        if (NewItem.IconImg != null)
        {
            Global.setResIconWithItemID(NewItem.IconImg, Pro.CfgID.ResType.Item, ItemID);
        }

        //显示个数
        if (NewItem.NumLb != null)
        {
            Global.setResNumWithItemInfo(NewItem.NumLb, ItemID, ItemNum, isShowTotal, isCost, normalColor, emptyColor);
            NewItem.NumLb.visible = ItemNum > 0;
        }

        //显示名称
        if (NewItem.NameLb != null)
        {
            NewItem.NameLb.text = cfg.ItemCfgData.getNameById(ItemID);
        }
    }

    /** UI上展示伙伴上阵列表 */
    export function setPetEmbattleList(listView: component.UIItemBox, battledisplay: Pb_God.PBBattleDisplay, battlesn: Long): void
    {
        let posMapSn = new ds.StringMap<string>();
        for (var el of battledisplay.posdata)
        {
            posMapSn.put(el.pos, el.petsn + "");
        }
        let snMapPet = Global.listToStringMapData(battledisplay.petdisplay, "sn");
        let posArr = listView.align == "right" ? [1, 4, 7, 2, 5, 8, 3, 6, 9] : [7, 4, 1, 8, 5, 2, 9, 6, 3];
        // let posArr = [7, 4, 1, 8, 5, 2, 9, 6, 3];
        listView.onRefresh(9, this, (item: Pro.NorItemUI, index: number) =>
        {
            //站立位置
            let storeIndex = posArr[index];
            //上阵角色
            let tempHeroSn = posMapSn.get(storeIndex);
            if (tempHeroSn)
            {
                let tmpHeroInfo = snMapPet.get(tempHeroSn);
                item.setPetInfo(tmpHeroInfo, false);
                if (battlesn != null)
                {
                    item.onClick(this, () =>
                    {
                        Pro.VideoSend.queryBattlePet(battlesn, tmpHeroInfo.sn,null);
                    });
                };
            }
            else
            {
                item.setEmptyInfo();
            }
        });
    }

    /** UI上展示伙伴上阵列表 */
    export function setEmbattleListByBattlePetInfo(listView: component.UIItemBox, battlepet: Pb_God.PBBattlePetInfo[]): void
    {
        let posMapPet = Global.listToStringMapData(battlepet, "pos");
        let posArr = listView.align == "right" ? [1, 4, 7, 2, 5, 8, 3, 6, 9] : [7, 4, 1, 8, 5, 2, 9, 6, 3];
        listView.onRefresh(9, this, (item: Pro.NorItemUI, index: number) =>
        {
            //站立位置
            let storeIndex = posArr[index];
            //上阵角色
            let tmpHeroInfo = posMapPet.get(storeIndex);
            if (tmpHeroInfo)
            {
                item.setPetInfo(tmpHeroInfo.pet.display, false);
            }
            else
            {
                item.setEmptyInfo();
            }
        });
    }


    /** 跟据离级时间获取时间格式显示(在线 / n小时前 / n天前)
     *  可取返回值给文本赋值，也可传入参数自动赋值并修改文本的颜色。
     * @param offlinetime 下线时间  单位秒
     * @param label 文本组件， 有传递参数时，会设置对应文本的内容，和修改在线的颜色。
     * @param offlineColor 离线颜色 默认（橙色）
     */
    export function getOfflineTimeString(offlinetime: number, label: Laya.Label = null, offlineColor: string = "#5d565d")
    {
        let ret = "";
        if (offlinetime == 0)
        {
            if (label) label.color = "#05ab3c"; //绿色
            ret = Global.getLangStr("common_online");  //在线
        } else
        {
            if (label) label.color = offlineColor; //橙色
            let hour = Math.floor((Pro.TimeController.currTimer / 1000 - offlinetime) / 3600);
            if (hour < 1)
                ret = Global.getLangStr("common_offline"); //离线";
            else if (hour >= 24)
                ret = Global.getLangStr("common_offsetDay", Math.floor(hour / 24));  // + "n天前";
            else
                ret = Global.getLangStr("common_offsetHour", hour); // + "n小时前";
        }
        if (label) label.text = ret;
        return ret;
    }

    /** 获取时长显示（1天以上显示n天  1小时以上显示n小时  1分钟以上显示n分钟  否则显示n秒） , 传入单位秒*/
    export function getTimeLengthString(time: number): string
    {
        if (time >= 24 * 3600) return Math.floor(time / 24 / 3600) + Global.getLangStr("common_day");
        if (time >= 3600) return Math.floor(time / 3600) + Global.getLangStr("common_hour");
        if (time >= 60) return Math.floor(time / 60) + Global.getLangStr("common_minute");
        return Math.ceil(time) + Global.getLangStr("common_second");
    }

    /** 
     * 获取完整时间格式(毫秒)（设计方法多，直接看实际实现代码）
     * @param time 时间戳(毫秒)
     * @param type 显示类型
     * */
    export function getFormatTimeString(time: number, type: number = 1): string
    {
        let str: string = "";
        let date: Date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        // 补零
        let strMonth = Global.ToFitZero(month, 2);
        let strDay = Global.ToFitZero(day, 2);
        let strHour = Global.ToFitZero(hour, 2);
        let strMinute = Global.ToFitZero(minute, 2);
        let strSecond = Global.ToFitZero(second, 2);

        if (type == 2)
            return Global.FormatString("{0}-{1}-{2}", year, month, day);
        else if (type == 3)
            return Global.FormatString("{0}:{1}:{2}", strHour, strMinute, strSecond);
        else if (type == 4)
            return Global.FormatString("{0}-{1}-{2} {3}:{4}:{5}", year, month, day, strHour, strMinute, strSecond);
        else if (type == 5)
            return Global.FormatString("{0}.{1}.{2} {3}:{4}:{5}", year, month, day, strHour, strMinute, strSecond);
        else if (type == 6)
            return Global.FormatString("{0}月{1}日{2}:{3}", month, day, strHour, strMinute);
        else if (type == 7)
            return Global.FormatString("{0}:{1}", strHour, strMinute);
        else if (type == 8)
            return Global.FormatString("{0}月{1}日{2}时{3}分", strMonth, strDay, strHour, strMinute);
        else if (type == 9)
            return Global.FormatString("{0}年{1}月{2}日", year, strMonth, strDay);
        else if (type == 10)
            return Global.FormatString("{0}月{1}日", strMonth, strDay);

        // 默认格式 格式为yyyy-MM-dd hh:mm
        str = Global.FormatString("{0}-{1}-{2} {3}:{4}", year, month, day, strHour, strMinute);

        return str;
    }

    /** 
     * 获取剩余时间(秒) 格式(时:分:秒)（设计方法多，直接看实际实现代码）
     * @param time 时间差(秒)
     * @param type 显示类型
     * */
    export function GetRemindTime(time: number, type: number = 1): string
    {
        if (time < 0)
        {
            time = 0;
        }
        let day = Math.floor(time / 86400);   // 天
        time = time - (day * 86400);
        let hour = Math.floor(time / 3600);   // 时
        time = time - (hour * 3600);
        let minute = Math.floor(time / 60);   // 分
        let second = Math.floor(time - (minute * 60)); // 秒

        let dayStr = Global.ToFitZero(day, 2);
        let hourStr = Global.ToFitZero(hour, 2);
        let minuteStr = Global.ToFitZero(minute, 2);
        let secondStr = Global.ToFitZero(second, 2);

        let longHourStr = Global.ToFitZero(hour + day * 24, 2); //把天数合并进小时内显示

        if (type == 2)
            return Global.FormatString("{0}{1}:{2}:{3}", day, hourStr, minuteStr, secondStr);
        else if (type == 3)
            return Global.FormatString("{0}:{1}", longHourStr, minuteStr);
        else if (type == 4)
            return Global.FormatString("{0}:{1}:{2}", longHourStr, minuteStr, secondStr);
        else if (type == 5)
            return Global.FormatString("{0}:{1}", minuteStr, secondStr);
        else if (type == 6)
            return Global.FormatString("{0}:{1}:{2}:{3}", dayStr, hourStr, minuteStr, secondStr);
        else if (type == 7) //hh:mm:ss   将day缩进至hh内显示。
            return Global.FormatString("{0}:{1}:{2}", longHourStr, minuteStr, secondStr);
        else if (type == 8)
            return Global.FormatString("{0}小时{1}分", longHourStr, minuteStr);
        else if (type == 9) //剩余时长大于1天时，时间精确到小时；剩余时于小于1天时，时间精确到秒
        {
            if (day > 0)
                return Global.FormatString("{0}天{1}时", day, hourStr);
            else
                return Global.FormatString("{0}:{1}:{2}", hourStr, minuteStr, secondStr);
        }
        else if (type == 10)
        {
            if (day > 0)
                return Global.FormatString("{0}天{1}:{2}:{3}", day, hourStr, minuteStr, secondStr);
            return Global.FormatString("{0}:{1}:{2}", hourStr, minuteStr, secondStr);
        }

        let str: string = "";
        if (day > 0)
            str = Global.FormatString("{0}天{1}时{2}分{3}秒", day, hour, minute, second);
        else if (hour > 0)
            str = Global.FormatString("{0}时{1}分{2}秒", hour, minute, second);
        else if (minute > 0)
            str = Global.FormatString("{0}分{1}秒", minute, second);
        else if (second >= 0)
            str = Global.FormatString("{0}秒", second);

        return str;
    }

    /** 
     * 获取目标时间与当前时间距离的天数(不足1天时返回小时)
     * @param time 时间戳(毫秒)
     * */
    export function getTargetDaysTime(time: number): string
    {
        let nowTime = Public.TimeMgr.Inst.currTimer;
        let badTime = (time - nowTime) / 1000;
        if (badTime <= 0) return "0小时";

        let day = Math.floor(badTime / 86400);   // 天
        badTime = badTime - (day * 86400);
        let hour = Math.floor(badTime / 3600);   // 时
        badTime = badTime - (hour * 3600);
        let minute = Math.floor(badTime / 60);   // 分
        let second = Math.floor(badTime - (minute * 60)); // 秒

        if (day <= 0)
        { //不足1天
            if (minute > 0 || second > 0)
            {
                hour = hour + 1;
            }
            return hour + Global.getLangStr("common_hour");
        }
        if (hour > 0 || minute > 0 || second > 0)
        {
            day = day + 1;
        }
        return day + Global.getLangStr("common_day");
    }

    /** 
     * 返回某个时间距离当前时间的天数,在同一天返回0
     * @param time 时间戳(毫秒)
     * */
    export function getTargetDaysTime1(time: number): number
    {
        if (!time) return 0;
        let zeroTimeNumber = getZeroTimeNumber(time);
        let zeroTimeNumber1 = getZeroTimeNumber(Pro.TimeController.currTimer);
        let Day = Math.abs(zeroTimeNumber - zeroTimeNumber1) / 1000 / 60 / 60 / 24;
        return Math.round(Day);

    }

    /** 取得某个时间点的N天的24点的时间
     * @param time 时间 毫秒
     * @param laterDay 天数  当天是1， 第二天是2，以此类推
     */
    export function getLaterDayTime(time: number, laterDay: number): number
    {
        let endDate = new Date(time + (laterDay - 1) * 24 * 3600 * 1000);
        endDate.setHours(23, 59, 59, 999); //延伸到当天的23:59:59
        return endDate.getTime();
    }

    /**震屏效果临时变量 */
    var vibrateObj = {
        x: 0, y: 0, rotation: 0, view: null
    };

    /**
    * 调用该方法前，请将view的描点设置为中心点
    * 震屏效果
    * 三个变量：x水平方向  5,y垂直方向  5,rotation旋转角度  10
    * @param view
    * @param time  持续时间 以毫秒为单位
    */
    export function vibrateScreen(view: Laya.Sprite, time?: number): void
    {
        if (vibrateObj.view)
        {
            Laya.timer.clearAll(vibrateObj);
            //说明上一次的动画还没完成
            vibrateObj.view.x = vibrateObj.x;
            vibrateObj.view.y = vibrateObj.y;
            vibrateObj.view.rotation = vibrateObj.rotation;
        }
        //先清除该对象上的缓和时间
        vibrateObj.x = view.x;
        vibrateObj.y = view.y;
        vibrateObj.rotation = view.rotation;
        vibrateObj.view = view;

        //定义参数  
        var count = time ? (time / 10) : 50;
        var loop = 0;//震动次数  
        var offX;
        var offY;
        var dir = 1;//震动方向。1正，-1反  
        var rotation;

        Laya.timer.loop(10, vibrateObj, function ()
        {
            loop++;
            //随机获取震动方向  
            dir = Math.random() > .5 ? 1 : -1;
            //随机获取X轴移动量  
            offX = Math.random() * 5 * dir + vibrateObj.x;
            //随机获取Y轴移动量  
            offY = Math.random() * 5 * dir * -1 + vibrateObj.y;
            // rotation = Math.random() * 5 * dir + vibrateObj.rotation;
            Laya.Tween.to(view, { x: offX, y: offY, rotation: rotation }, 10, Laya.Ease.linearNone, Laya.Handler.create(vibrateObj, function ()
            {
                if (loop > count)
                {
                    Laya.timer.clearAll(vibrateObj);
                    view.x = vibrateObj.x;
                    view.y = vibrateObj.y;
                    view.rotation = vibrateObj.rotation;
                    vibrateObj.view = null;
                    return;
                }
            }));
        });
    }

    /**
     * 获取不规则进度条的刻度值 返回一个小于1的值
     * @param value 当前值 
     * @param progress 不规则刻度 最后一个为总刻度 
     */
    export function getSpecialProgressValue(value: number, progress: number[], realPro?: number[])
    {
        let ret = 0;
        for (let i = 0; i < progress.length; i++)
        {
            //刻度值
            let pro = progress[i];

            //刻度位置 如果不传默认是常规位置
            let real = realPro ? (realPro[i] - (i == 0 ? 0 : realPro[i - 1])) / realPro[realPro.length - 1] : (pro - (i == 0 ? 0 : progress[i - 1])) / progress[progress.length - 1];

            if (value < pro)
            {
                let last = i == 0 ? 0 : progress[i - 1];
                ret += (value - last) / (pro - last) * real;
                break;
            }
            ret += real;
        }
        return ret;
    }


    /**
     * 延迟执行对应方法 同一帧多次调用只会执行一次
     * @param event_key 
     * @param args 
     */
    export function CallEventLater(event_key: number | string, ...args: any[])
    {
        Laya.timer.callLater(EventMgr, EventMgr.trigger, [event_key].concat(args));
    }

    export function Uint8ArrayToString(array)
    {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = array.length;
        i = 0;
        while (i < len)
        {
            c = array[i++];
            switch (c >> 4)
            {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;

    }

    /**
     * 获取当前章节地图资源
     */
    export function getChapterMapSkin(petID: string): string
    {
        return `res/Unpack/hookScene/${ petID }/`;
    }
}




