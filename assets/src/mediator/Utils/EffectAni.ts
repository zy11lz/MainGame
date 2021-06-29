/* eslint-disable no-loop-func */

module Pro
{
    /**
     * 特效动画
     */
    export class EffectAni
    {
        private static _Inst: EffectAni;
        public static get Inst()
        {
            if (EffectAni._Inst == null)
            {
                EffectAni._Inst = new EffectAni();
            }
            return EffectAni._Inst;
        }

        /** 全屏手指点击 */
        private _itemBag: Laya.Image;
        private _itemBagSkin: string = 'res/mainui/icon_beibao.png';

        constructor()
        {

        }

        /** 初始化 */
        public init()
        {

        }

        // 是否背包道具
        private isBagItem(itemid)
        {
            return itemid != CfgID.ItemID.Gold && itemid != CfgID.ItemID.Diamond && itemid != CfgID.ItemID.Exp && itemid != CfgID.ItemID.PetExp
        }

        /**
         *
         * @param startPos        开始坐标
         * @param endPos          结束坐标
         * @param itemInfo        通用道具信息 or 伙伴星级信息
         * @param parent          父类层级
         */
        public showEff_Reward_Fly(startPos: Laya.Point, endPos: Laya.Point, itemInfo: any, parent: Laya.Sprite = LayerManager.Inst.effectLayer)
        {
            let itemCount = this.isBagItem(itemInfo.itemid) ? 1 : 10;
            for (let i = 0; i < itemCount; i++)
            {
                this.fly(i, itemInfo, parent, startPos, endPos)
            }
        }

        fly(index: number, itemInfo, parent: Laya.Sprite, startPos: Laya.Point, endPos: Laya.Point)
        {
            let itemCount = this.isBagItem(itemInfo.itemid) ? 1 : 10;
            let itemIcon: NorItemUI | Laya.Image;
            // 没有itemid 为伙伴星级
            if (!itemInfo.itemid || this.isBagItem(itemInfo.itemid))
            {
                var norItemUI = new NorItemUI();
                itemIcon = norItemUI;
                if (!itemInfo.itemid)
                {
                    // 伙伴星级
                    norItemUI.setPetStarInfo(itemInfo);
                }
                else
                {
                    // 通用道具
                    norItemUI.setItemInfo(itemInfo, true);
                }
                this.showItemBagAni(parent, endPos);
            } else
            {
                itemIcon = new Laya.Image();
                Global.setResIconWithItemID(itemIcon, CfgID.ResType.Item, itemInfo.itemid);
                itemIcon.anchorX = 0.5;
                itemIcon.anchorY = 0.5;
            }

            parent.addChild(itemIcon);
            itemIcon.scaleX = 0;
            itemIcon.scaleY = 0;
            let startPosX = startPos.x + (itemCount == 1 ? 0 : (Global.getRandomNum(0, 150) - 50));
            let startPosY = startPos.y - (itemCount == 1 ? 0 : (Global.getRandomNum(0, 150) - 50));
            itemIcon.pos(startPosX, startPosY);
            Laya.Tween.to(itemIcon, { x: startPosX, y: startPosY, scaleX: 1, scaleY: 1 }, 100, Laya.Ease.quadInOut,
                Laya.Handler.create(this, () =>
                {
                    // 道具和经验不做曲线动画
                    if (this.isBagItem(itemInfo.itemid) || itemInfo.itemid == CfgID.ItemID.Exp || itemInfo.itemid == CfgID.ItemID.PetExp)
                    {
                        Laya.Tween.to(itemIcon, { x: endPos.x, y: endPos.y, scaleX: 0, scaleY: 0 }, 800, Laya.Ease.quadInOut, Laya.Handler.create(this, () =>
                        {
                            itemIcon.removeSelf();
                        }));
                    }
                    else
                    {
                        let arr = this.getBezier(new Laya.Point(startPosX, startPosY), endPos, -80, Global.getRandomNum(-15, 15));
                        let arrayPoint = this.createBezierPoints(arr, 40);
                        let index = 0
                        Laya.timer.frameLoop(1, this, function ()
                        {
                            if (index > arrayPoint.length - 1)
                            {
                                itemIcon.removeSelf();
                                index = 0;
                                return;
                            }
                            itemIcon.pos(arrayPoint[index].x, arrayPoint[index].y)
                            itemIcon.scaleX = 1 - (1 * (index / 50))
                            itemIcon.scaleY = 1 - (1 * (index / 50))
                            index++
                        }.bind(this, itemIcon))
                    }
                }
                ), 20 * index);
        }

        showItemBagAni(parent: Laya.Sprite, endPos: Laya.Point)
        {
            // 虚拟背包
            if (!this._itemBag)
            {
                this._itemBag = new Laya.Image()
                this._itemBag.anchorX = 0.5;
                this._itemBag.anchorY = 0.5;
                this._itemBag.skin = this._itemBagSkin;
                parent.addChild(this._itemBag);
            }
            Laya.Tween.clearAll(this._itemBag);
            this._itemBag.alpha = 0
            this._itemBag.pos(endPos.x, endPos.y);
            Laya.Tween.to(this._itemBag, { alpha: 1 }, 400, Laya.Ease.quadOut, Laya.Handler.create(this, () =>
            {
                Laya.Tween.to(this._itemBag, { scaleX: 1.3, scaleY: 1.3 }, 50, Laya.Ease.quadOut, Laya.Handler.create(this, () =>
                {
                    Laya.Tween.to(this._itemBag, { scaleX: 1, scaleY: 1 }, 50, Laya.Ease.quadOut, Laya.Handler.create(this, () =>
                    {
                        Laya.Tween.to(this._itemBag, { alpha: 0 }, 300, Laya.Ease.quadOut, null, 500)
                    }))
                }))
            }), 500);
        }


        /**
         *  return  起点 顶点1  顶点2 终点
         * @param startPoint
         * @param endPoint
         * @param height
         * @param angle
         */
        public getBezier(startPoint, endPoint, height, angle)
        {
            let points = [];
            // 把角度转换为弧度
            let radian = angle * 3.14159 / 90;
            // 第一个控制点为抛物线左半弧的中点
            let q1x = startPoint.x + (endPoint.x - startPoint.x) / 4;
            let q1 = new Laya.Point(q1x, height + startPoint.y + Math.sin(radian) * q1x);
            // 第二个控制点为整个抛物线的中点
            let q2x = startPoint.x + (endPoint.x - startPoint.x) / 2;
            let q2 = new Laya.Point(q2x, height + startPoint.y + Math.sin(radian) * q2x);
            points.push(startPoint, q2, endPoint);
            // 曲线配置
            return points;
        }

        public createBezierPoints(anchorpoints, pointsAmount): Array<any>
        {
            var points = [];
            for (var i = 0; i < pointsAmount; i++)
            {
                var point = this.multiPointBezier(anchorpoints, i / pointsAmount);
                points.push(point);
            }
            return points;
        }


        private multiPointBezier(points, t): any
        {
            let len: number = points.length;
            let x: number = 0, y: number = 0;
            for (let i: number = 0; i < len; i++)
            {
                let point: any = points[i];
                x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
            }
            return { x: x, y: y };
        }

        private erxiangshi(start: number, end: number): number
        {
            let cs: number = 1, bcs: number = 1;
            while (end > 0)
            {
                cs *= start;
                bcs *= end;
                start--;
                end--;
            }
            return (cs / bcs);
        };

        public addAwardBoxAni(target: any, offX: number = 0, offY: number = 0, scale: number = 0.8)
        {
            if (target["awardBoxAni"])
            {
                return;
            }
            let sk = new Pro.SkeletonPlayer();
            sk.load(UrlMgr.getSpineSceneUrl("UIeffect/baoxiangguang"));
            target.parent.addChild(sk);
            sk.playByIndex(0, true);
            sk.pos(target.x + offX, target.y + offY);
            sk.scale(scale, scale);
            // sk.zOrder = -1;
            target["awardBoxAni"] = sk;
        }

        public removeAwardBoxAni(target)
        {
            if (target["awardBoxAni"])
            {
                target["awardBoxAni"].removeSelf();
                target["awardBoxAni"] = null;
            }
        }
    }
}