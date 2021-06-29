/**
  * 面板弹出管理类
  * 面板弹出的管理类
  */
module Pro.PopUpManager
{

    /**
    * 添加面板方法
    *  @param panel       		面板
    *  @param dark        		背景是否变黑
    * @param backMaskType 是否带遮罩背景(0-无背景  1-黑色半透背景  2-透明遮罩  3-不透明背景)
    *  @param popUpWidth      	指定弹窗宽度，定位使用
    *  @param popUpHeight      	指定弹窗高度，定位使用
    *  @param effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    export function addPopUp(panelMed: BaseMediator, effectType: number = 0, backMaskType: number, popUpWidth: number = 0, popUpHeight: number = 0): void
    {
        //移除UI
        var panel = panelMed.getUI();
        Laya.Tween.clearTween(panel);
        panel.removeSelf();

        //需要添加的层
        let tmpAddUILayer = panelMed.getAddUILayer();
        let ToParent: Laya.Sprite;
        if (tmpAddUILayer == BaseAddLayer.RootUI)
        {
            ToParent = LayerManager.Inst;
        }
        else if (tmpAddUILayer == BaseAddLayer.BaseUI)
        {
            ToParent = LayerManager.Inst.baseUILayer;
        }
        else if (tmpAddUILayer == BaseAddLayer.CenterUI)
        {
            ToParent = LayerManager.Inst.centerUILayer;
        }
        else if (tmpAddUILayer == BaseAddLayer.TopUI)
        {
            ToParent = LayerManager.Inst.topUILayer;
        }

        //显示窗口
        ToParent.addChild(panel);
        // panel.height = ToParent.height;

        //记录当前窗口的尺寸
        if (popUpWidth != 0)
        {
            panel.width = popUpWidth;
        }
        if (popUpHeight != 0)
        {
            panel.height = popUpHeight;
        }
        if (popUpWidth == 0 && popUpHeight == 0)
        {
            popUpWidth = panel.width;
            popUpHeight = panel.height;
        }

        PopUpManager.popUpUIAction(panel, effectType, backMaskType);
    }

    /**
     * 移除面板方法
     * panel       		面板
     * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     */
    export function removePopUp(panelMed: BaseMediator, effectType: number = 0): void
    {
        PopUpManager.removeUIAction(panelMed.getUI(), effectType, true, false);
    }

    /**
     * 弹出一个UI(所有弹出UI，用这个方法)
     * @param effectType  0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     * @param backMaskType 是否带遮罩背景(0-无背景  1-黑色半透背景  2-透明遮罩  3-不透明背景)
     * @return 返回遮罩Sprite，方便对背景点击控制
     */
    export function popUpUIAction(panel: Laya.Sprite, effectType: number = 1, backMaskType: number = 1): component.UIButton
    {
        //父节点信息
        let parentUI = panel.parent as Laya.UIComponent;
        let parentUIWidth = parentUI.width;
        let parentUIHeigth = parentUI.height;
        if (parentUIWidth == 0 || parentUIHeigth == 0)
        {
            parentUIWidth = GameConfig.curWidth();
            parentUIHeigth = GameConfig.curHeight();
        }

        //-----------------------------------------遮罩层------------------------------------------------
        let darkSprite: component.UIButton = null;
        if (backMaskType)
        {
            //初始化遮罩层
            darkSprite = panel["darkSprite"] as component.UIButton;
            if (darkSprite == null)
            {
                darkSprite = new component.UIButton();
                darkSprite["scaleDown"] = 1;
                darkSprite["scaleUp"] = 1;
                darkSprite.anchorX = 0;
                darkSprite.anchorY = 0;
                darkSprite.name = "darkUI";
                panel["darkSprite"] = darkSprite;
            }
            else
            {
                Laya.Tween.clearTween(darkSprite);
            }
            parentUI.addChild(darkSprite);
            parentUI.setChildIndex(darkSprite, parentUI.getChildIndex(panel));

            //吃掉点击事件
            darkSprite.mouseEnabled = true;
            darkSprite.width = parentUIWidth;
            darkSprite.height = parentUIHeigth + GameConfig.WinCenterY;
            darkSprite.y = -GameConfig.WinCenterY / 2;
            darkSprite.visible = true;
            darkSprite.graphics.clear();

            //设置黑色遮罩
            if (backMaskType != 2)
            {
                darkSprite.graphics.drawRect(0, 0, darkSprite.width, darkSprite.height, "#000000");
                if (backMaskType == 1)
                {
                    darkSprite.alpha = 0.7;
                    //Laya.Tween.to(darkSprite, { alpha: 0.7 }, 150 );
                }
                else if (backMaskType == 3)
                {
                    darkSprite.alpha = 1;
                    //Laya.Tween.to(darkSprite, { alpha: 1 }, 150 );
                }
            }
        }

        //-----------------------------------------UI弹出动画------------------------------------------------
        //重置属性
        panel.scaleX = 1;
        panel.scaleY = 1;
        panel.x = 0;
        panel.y = 0;
        panel.alpha = 1;
        panel.visible = true;

        //将弹窗放置在屏幕中心
        var leftX: number = parentUIWidth / 2 - panel.width / 2;
        var upY: number = parentUIHeigth / 2 - panel.height / 2;

        //以下是弹窗动画
        switch (effectType)
        {
            case 0:
                panel.x = leftX;
                panel.y = upY;
                break;
            case 1:
                panel.alpha = 0;
                panel.scaleX = 0.5;
                panel.scaleY = 0.5;
                panel.x = leftX + panel.width / 4;
                panel.y = upY + panel.height / 4;
                Laya.Tween.to(panel, { alpha: 1, scaleX: 1, scaleY: 1, x: leftX, y: upY }, 300, Laya.Ease.backOut);
                break;
            case 2:
                panel.alpha = 0;
                panel.scaleX = 0.5;
                panel.scaleY = 0.5;
                panel.x = leftX + panel.width / 4;
                panel.y = upY + panel.height / 4;
                Laya.Tween.to(panel, { alpha: 1, scaleX: 1, scaleY: 1, x: leftX, y: upY }, 600, Laya.Ease.elasticOut);
                break;
            case 3:
                panel.x = leftX - GameConfig.curWidth() / 2;
                panel.y = upY;
                Laya.Tween.to(panel, { x: leftX }, 300, Laya.Ease.backOut);
                break;
            case 4:
                panel.x = leftX + GameConfig.curWidth();
                panel.y = upY;
                Laya.Tween.to(panel, { x: leftX }, 500, Laya.Ease.cubicOut);
                break;
            case 5:
                panel.x = leftX;
                panel.y = upY - GameConfig.curHeight();
                Laya.Tween.to(panel, { y: upY }, 500, Laya.Ease.cubicOut);
                break;
            case 6:
                panel.x = leftX;
                panel.y = upY + GameConfig.curHeight();
                Laya.Tween.to(panel, { y: upY }, 500, Laya.Ease.cubicOut);
                break;
            default:
                panel.x = leftX;
                panel.y = upY;
                break;
        }

        return darkSprite;
    }

    /**
     * 移除一个UI(所有弹出UI，用这个方法)
     * @param effectType 0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
     * @param remove 当移除动画结束后是否将UI从父节点移除或隐藏
     */
    export function removeUIAction(panel: Laya.Sprite, effectType: number = 1, remove: boolean = false, destroy: boolean = false)
    {
        //移除遮罩
        let darkSprite = panel["darkSprite"];
        if (darkSprite)
        {
            Laya.Tween.clearTween(darkSprite);
            if (effectType > 0)
            {
                Laya.Tween.to(darkSprite, { alpha: 0 }, 300, Laya.Ease.linearIn, Laya.Handler.create(null, function ()
                {
                    darkSprite.removeSelf();
                }));
            }
            else
            {
                darkSprite.removeSelf();
            }
        }

        //移除回调
        let removeFun = function ()
        {
            if (destroy)
            {
                panel.removeSelf();
                panel.offAll();
                panel.destroy();
                panel = null;
            }
            else
            {
                if (remove)
                {
                    panel.removeSelf();
                    panel.offAll();
                }
                else
                {
                    panel.visible = false;
                }
            }
        }

        //以下是弹窗动画
        Laya.Tween.clearTween(panel);

        switch (effectType)
        {
            case 0:
                removeFun();
                break;
            case 1:
            case 2:
                Laya.Tween.to(panel, { alpha: 0, scaleX: 0, scaleY: 0, x: panel.x + panel.width / 2, y: panel.y + panel.height / 2 }, 300,
                    Laya.Ease.linearIn, Laya.Handler.create(null, removeFun));
                break;
            case 3:
                Laya.Tween.to(panel, { x: GameConfig.curWidth() }, 500, Laya.Ease.cubicOut, Laya.Handler.create(null, removeFun));
                break;
            case 4:
                Laya.Tween.to(panel, { x: -GameConfig.curWidth() }, 500, Laya.Ease.cubicOut, Laya.Handler.create(null, removeFun));
                break;
            case 5:
                Laya.Tween.to(panel, { y: GameConfig.curHeight() }, 500, Laya.Ease.cubicOut, Laya.Handler.create(null, removeFun));
                break;
            case 6:
                Laya.Tween.to(panel, { y: -GameConfig.curHeight() }, 500, Laya.Ease.cubicOut, Laya.Handler.create(null, removeFun));
                break;
            default:
                break;
        }
    }
}


