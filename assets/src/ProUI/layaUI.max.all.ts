
import View=Laya.View;
import Dialog=Laya.Dialog;
import EffectAnimation=Laya.EffectAnimation;
module ProUI.ActivityMain.ActivityBoss {
    export class ActivityBossPageViewUI extends View {
		public petNode:Laya.Image;
		public btnAdd:component.UIButton;
		public btnRankAward:component.UIButton;
		public lblName:component.UILabel;
		public btnTips:component.UIButton;
		public btnChallenge:component.UILabelButton;
		public btnSkipBattle:component.UILabelButton;
		public awardsList:component.UIList;
		public lblName1:component.UILabel;
		public lblName2:component.UILabel;
		public lblName3:component.UILabel;
		public btnRank:component.UIButton;
		public lblCanBuy:component.UILabel;
		public lblRemain:component.UILabel;
		public imgRedDotChallenge:Laya.Image;
		public imgRedDotSkip:Laya.Image;
		public htmlTimer:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("ActivityMain/ActivityBoss/ActivityBossPageView");

        }

    }
}

module ProUI.ActivityMain {
    export class ActivityMainUI extends View {
		public adjustBox:Laya.Box;
		public pageViewContainer:Pro.TableBarContiner;
		public tabGrp:component.UITab;
		public grpTurnBar:Laya.Box;
		public btnClose:component.UIButton;
		public topBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("ActivityMain/ActivityMain");

        }

    }
}

module ProUI.ActivityMain.ChargeRebate {
    export class MainUI extends View {
		public itemView:Pro.NorItemUI;
		public btnGetReward:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("ActivityMain/ChargeRebate/Main");

        }

    }
}

module ProUI.ActivityMain.ChildItemView {
    export class GradeFundItemUI extends Laya.Box {
		public imgPrize1:Laya.Image;
		public txtPrizeValue1:component.UILabel;
		public imgPrize2:Laya.Image;
		public txtPrizeValue2:component.UILabel;
		public txtCondition:component.UILabel;
		public btnGet:component.UIButton;
		public reddotGet:Laya.Image;
		public btnIsGet:component.UIButton;
		public btnNoCan:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/ChildItemView/GradeFundItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.ChildItemView {
    export class SignInItemUI extends Laya.Box {
		public norItem:Pro.NorItemUI;
		public btn:component.UIButton;
		public spMask:Laya.Image;
		public imgGet:Laya.Image;
		public imgAgain:Laya.Image;
		public effPos:Laya.Box;
		public imgCanGet:Laya.Image;
		public effCanGet:ProUI.Ani.efc.NodeBreatheUI;
		public reddot:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Ani.efc.NodeBreatheUI",ProUI.Ani.efc.NodeBreatheUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/ChildItemView/SignInItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.ClickGold {
    export class ClickGoldUI extends View {
		public btnHelp:component.UIButton;
		public itemsBox:component.UIItemBox;
		public txtTimer:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.ActivityMain.ClickGold.ItemViewUI",ProUI.ActivityMain.ClickGold.ItemViewUI);

            super.createChildren();
            this.loadUI("ActivityMain/ClickGold/ClickGold");

        }

    }
}

module ProUI.ActivityMain.ClickGold {
    export class ItemViewUI extends Laya.Box {
		public txtLeftCount:component.UILabel;
		public hboxGoldValue:Laya.HBox;
		public txtGoldValue:component.UILabel;
		public imgGet:Laya.Image;
		public btnFree:component.UILabelButton;
		public btnBuy:component.UIButton;
		public hboxPrice:Laya.HBox;
		public txtPrice:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/ClickGold/ItemView"], this, this);

        }

    }
}

module ProUI.ActivityMain.DayLimitBuy {
    export class DayLimitBuyUI extends View {
		public bgGiftGag:Laya.Image;
		public bgName:Laya.Image;
		public list:component.UIList;
		public downHem:Laya.Image;
		public oneKeyBuyBtn:component.UILabelButton;
		public discount:Laya.Image;
		public discountLbl:component.UILabel;
		public closeBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.DayLimitBuy.DayLimitBuyItemUI",ProUI.ActivityMain.DayLimitBuy.DayLimitBuyItemUI);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("ActivityMain/DayLimitBuy/DayLimitBuy");

        }

    }
}

module ProUI.ActivityMain.DayLimitBuy {
    export class DayLimitBuyItemUI extends View {
		public colorTitle:Laya.Image;
		public limitLbl:component.UILabel;
		public nameLbl:component.UILabel;
		public remainTimeLbl:component.UILabel;
		public giftDescLbl:component.UILabel;
		public buyBox:Laya.Box;
		public oldPriceLbl:component.UILabel;
		public buyBtn:component.UILabelButton;
		public boughtBox:Laya.Box;
		public list:component.UIList;
		public fourBox:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);

            super.createChildren();
            this.loadUI("ActivityMain/DayLimitBuy/DayLimitBuyItem");

        }

    }
}

module ProUI.ActivityMain.ExChangeShop {
    export class ExChangeShopUI extends View {
		public imgCurrency:Laya.Image;
		public txt_count:component.UILabel;
		public txt_time:component.UIHtmlText;
		public itemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.ExchangeShopPageItem",Pro.ExchangeShopPageItem);

            super.createChildren();
            this.loadUI("ActivityMain/ExChangeShop/ExChangeShop");

        }

    }
}

module ProUI.ActivityMain.ExChangeShop {
    export class ExchangeShopItemUI extends Laya.Box {
		public backBtn:component.UIButton;
		public txtName:component.UILabel;
		public htmlTxtLimit:component.UIHtmlText;
		public imgCurrency:Laya.Image;
		public txtCurrencyCount:component.UILabel;
		public itemUI:Pro.NorItemUI;
		public imgBargain:Laya.Image;
		public imgFullBack:Laya.Image;
		public imgFullLimt:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/ExChangeShop/ExchangeShopItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.H5Weal {
    export class CommonViewUI extends Laya.Box {
		public frameBanner:component.UIFrameImage;
		public listItems:component.UIItemBox;
		public imgGet:Laya.Image;
		public btnGo:component.UIButton;
		public txtBtnLabel:component.UILabel;
		public txtDesc:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/H5Weal/CommonView"], this, this);

        }

    }
}

module ProUI.ActivityMain.HuPa {
    export class HuPaCallPageUI extends View {
		public bg:Laya.Image;
		public list:component.UIList;
		public helpBtn:component.UIButton;
		public shopBtn:component.UIButton;
		public previewBtn:component.UIButton;
		public itemIcon:Laya.Image;
		public jumpBuyBtn:component.UIButton;
		public itemCount:component.UILabel;
		public actTimeLbl:component.UILabel;
		public wishBtn:component.UIButton;
		public wishFree:component.UILabel;
		public needBox:Laya.HBox;
		public needIcon1:Laya.Image;
		public needCount1:component.UILabel;
		public wishsBtn:component.UIButton;
		public needBox2:Laya.HBox;
		public needIcon2:Laya.Image;
		public needCount2:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("ActivityMain/HuPa/HuPaCallPage");

        }

    }
}

module ProUI.ActivityMain.HuPa {
    export class HuPaGiftPageUI extends View {
		public boxBanner:Laya.Box;
		public imgBanner:Laya.Image;
		public btn_help:component.UIButton;
		public txtBannerTips:component.UIHtmlText;
		public htmlTimer:component.UIHtmlText;
		public itemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.TimeLimit.PageItemView.BuyGiftsListItemUI",ProUI.ActivityMain.TimeLimit.PageItemView.BuyGiftsListItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/HuPa/HuPaGiftPage");

        }

    }
}

module ProUI.ActivityMain.HuPa {
    export class HuPaLiberateUI extends View {
		public bgImg:Laya.Image;
		public btn_close:component.UIButton;
		public needLbl:component.UILabel;
		public bo1:Laya.Image;
		public nameLbl1:component.UILabel;
		public bo2:Laya.Image;
		public nameLbl2:component.UILabel;
		public needIcon:Laya.Image;
		public btnLiberate:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("ActivityMain/HuPa/HuPaLiberate");

        }

    }
}

module ProUI.ActivityMain.HuPa {
    export class HuPaLiberateShowUI extends View {
		public footboard:Laya.Image;
		public imgVDraw:Laya.Image;
		public imgBorderFrame:component.UIFrameImage;
		public StarBox:Pro.StarIconBox;
		public imgPetType:component.UIFrameImage;
		public TipsImg:Laya.Image;
		public txtName:component.UILabel;
		public topAd:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("ActivityMain/HuPa/HuPaLiberateShow");

        }

    }
}

module ProUI.ActivityMain.HuPa {
    export class HuPaPreviewUI extends View {
		public IconImg:Laya.Image;
		public btnAvatarShow:component.UIButton;
		public tabGrp:component.UITab;
		public FunBox:Pro.TableBarContiner;
		public starBox:Pro.StarIconBox;
		public PetTypeImg:Laya.Image;
		public NameBox:Laya.HBox;
		public NameLB:component.UILabel;
		public ZhanliImg:Laya.Image;
		public ZhanLb:component.UILabel;
		public CloseBtn:component.UIButton;
		public upAttrListUI:Pro.UpAttrListUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.UpAttrListUI",Pro.UpAttrListUI);

            super.createChildren();
            this.loadUI("ActivityMain/HuPa/HuPaPreview");

        }

    }
}

module ProUI.ActivityMain.HuPa {
    export class HuPaShopUI extends View {
		public listItems:component.UIList;
		public imgCurrency:Laya.Image;
		public txtCurrencyCount:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.LimitHeroExChangeItem",Pro.LimitHeroExChangeItem);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("ActivityMain/HuPa/HuPaShop");

        }

    }
}

module ProUI.ActivityMain.HuPa {
    export class HuPaStoryUI extends Laya.Box {
		public panel:Laya.Panel;
		public storyHtml:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/HuPa/HuPaStory"], this, this);

        }

    }
}

module ProUI.ActivityMain.LianLianKan {
    export class LianLianKanItemUI extends View {
		public scaleBox:Laya.Box;
		public selectImg:component.UIFrameImage;
		public icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);

            super.createChildren();
            this.loadUI("ActivityMain/LianLianKan/LianLianKanItem");

        }

    }
}

module ProUI.ActivityMain.LianLianKan {
    export class LianLianKanMainUI extends View {
		public centerBox:Laya.Box;
		public imgBg:Laya.Image;
		public mainBox:Laya.Box;
		public contentBox:Laya.Box;
		public startBox:Laya.Box;
		public startMask:Laya.Image;
		public btnStart:component.UILabelButton;
		public lblMyRank:component.UILabel;
		public lblActEndTime:component.UILabel;
		public playBox:Laya.Box;
		public lblDoubleCount:component.UIBitmapText;
		public proTime:Laya.Image;
		public lblRemainTime:component.UILabel;
		public btnRefresh:component.UIButton;
		public lblRefreshCount:component.UILabel;
		public lblCurrScore:component.UILabel;
		public lblTopScore:component.UILabel;
		public endBox:Laya.Box;
		public endMask:Laya.Image;
		public lblDoubleSco:component.UILabel;
		public lblDelSco:component.UILabel;
		public lblTimeSco:component.UILabel;
		public btnNext:component.UILabelButton;
		public lblRank:component.UIBitmapText;
		public nextStageBox:Laya.Box;
		public btnGoOn:component.UILabelButton;
		public btnRank:component.UIButton;
		public btnHelp:component.UIButton;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("ActivityMain/LianLianKan/LianLianKanMain");

        }

    }
}

module ProUI.ActivityMain.LianLianKan {
    export class LianLianKanRankUI extends View {
		public tabGrp:component.UITab;
		public pageViewContainer:Pro.TableBarContiner;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("ActivityMain/LianLianKan/LianLianKanRank");

        }

    }
}

module ProUI.ActivityMain.LianLianKan {
    export class LianLianKanRankItemUI extends Laya.Image {
		public frame:Laya.Image;
		public imgFrameRank:component.UIFrameImage;
		public txtRank:Laya.Label;
		public viewPlayerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public txtScore:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/LianLianKan/LianLianKanRankItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.LianLianKan {
    export class LianLianKanRankPageUI extends Laya.Box {
		public imgEmpty:Laya.Image;
		public listView:component.UIList;
		public selfView:ProUI.ActivityMain.LianLianKan.LianLianKanRankItemUI;
		public txtNoRank:component.UILabel;
		public txtOverTime:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.LianLianKan.LianLianKanRankItemUI",ProUI.ActivityMain.LianLianKan.LianLianKanRankItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/LianLianKan/LianLianKanRankPage"], this, this);

        }

    }
}

module ProUI.ActivityMain.LianLianKan {
    export class LianLianKanRankRewardItemUI extends Laya.Box {
		public imgFrameRank:component.UIFrameImage;
		public listItems:component.UIItemBox;
		public txtRank:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/LianLianKan/LianLianKanRankRewardItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.LianLianKan {
    export class LianLianKanRankRewardPageUI extends Laya.Box {
		public txtOverTime:component.UILabel;
		public txtRank:component.UILabel;
		public listView:component.UIList;
		public listItems:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.LianLianKan.LianLianKanRankRewardItemUI",ProUI.ActivityMain.LianLianKan.LianLianKanRankRewardItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/LianLianKan/LianLianKanRankRewardPage"], this, this);

        }

    }
}

module ProUI.ActivityMain.LimitChargeGift {
    export class LimitChargeGiftUI extends View {
		public btnClose:component.UIButton;
		public htmlTimer:component.UIHtmlText;
		public listview:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.LimitChargeGift.LimitChargeGiftItemUI",ProUI.ActivityMain.LimitChargeGift.LimitChargeGiftItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/LimitChargeGift/LimitChargeGift");

        }

    }
}

module ProUI.ActivityMain.LimitChargeGift {
    export class LimitChargeGiftItemUI extends Laya.Box {
		public txtName:component.UILabel;
		public btnBuy:component.UIButton;
		public txtBtnPrice:component.UILabel;
		public imgFull:Laya.Image;
		public htmlLimit:component.UIHtmlText;
		public htmlLimitAll:component.UIHtmlText;
		public listItems:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/LimitChargeGift/LimitChargeGiftItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.MonthFund {
    export class LifelongFundUI extends Laya.Box {
		public frameBg:Laya.Image;
		public txtTips:component.UIHtmlText;
		public DetailedIntroduction:component.UIButton;
		public btnActive:component.UIButton;
		public txtPrice:component.UILabel;
		public btnIsGet:component.UIButton;
		public btnGet:component.UIButton;
		public list4View:component.UIItemBox;
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/MonthFund/LifelongFund"], this, this);

        }

    }
}

module ProUI.ActivityMain.MonthFund {
    export class MonthFundUI extends Laya.Box {
		public frameBg:component.UIFrameImage;
		public txtTotalCost:component.UIBitmapText;
		public txtTips:component.UIHtmlText;
		public txtTotalTitle:component.UILabel;
		public boxNoActive:Laya.Box;
		public txtNoActiveTips1:component.UILabel;
		public txtDiamonValue:component.UIBitmapText;
		public txtNoActiveTips2:component.UILabel;
		public btnActive:component.UIButton;
		public txtPrice:component.UILabel;
		public boxActive:Laya.Box;
		public norItem:Pro.NorItemUI;
		public btnGet:component.UIButton;
		public btnIsGet:component.UIButton;
		public txtGetDay:component.UILabel;
		public txtDate:component.UILabel;
		public txtActiveTips:component.UILabel;
		public btnPreview:component.UIButton;
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/MonthFund/MonthFund"], this, this);

        }

    }
}

module ProUI.ActivityMain.MonthFund {
    export class MonthFundItemUI extends Laya.Box {
		public norItem:Pro.NorItemUI;
		public txtDays:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/MonthFund/MonthFundItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.MonthFund {
    export class MonthFundPreviewUI extends View {
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.MonthFund.MonthFundPreviewItemUI",ProUI.ActivityMain.MonthFund.MonthFundPreviewItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/MonthFund/MonthFundPreview");

        }

    }
}

module ProUI.ActivityMain.MonthFund {
    export class MonthFundPreviewItemUI extends Laya.Box {
		public norItem:Pro.NorItemUI;
		public txtDays:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/MonthFund/MonthFundPreviewItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.MyWish {
    export class WishDropCardUI extends View {
		public selItemSmall:Laya.Image;
		public btnChengeItem:Laya.Box;
		public selItem:Pro.NorItemUI;
		public btnWishOne:component.UIButton;
		public wishFree:component.UILabel;
		public reddot1:Laya.Image;
		public needBox:Laya.HBox;
		public needIcon1:Laya.Image;
		public needCount1:component.UILabel;
		public btnWishTen:component.UIButton;
		public reddot2:Laya.Image;
		public needIcon2:Laya.Image;
		public needCount2:component.UILabel;
		public btnHelp:component.UIButton;
		public itemIcon:Laya.Image;
		public jumpBuyBtn:component.UIButton;
		public itemCount:component.UILabel;
		public itemBox:Laya.Box;
		public des:component.UIHtmlText;
		public progressHtml:component.UIHtmlText;
		public txt_time:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("ActivityMain/MyWish/WishDropCard");

        }

    }
}

module ProUI.ActivityMain.NewYear.RedEnvelope {
    export class RedEnvelopeUI extends View {
		public redEnvelopeAni:Laya.Box;
		public reBag:Laya.Image;
		public effShot:ProUI.Ani.efc.NodeWaggleUI;
		public redEnvelopeInfo:Laya.Box;
		public tabGrp:component.UITab;
		public closeBtn:component.UIButton;
		public itemList:component.UIList;
		public logBg:Laya.Image;
		public itemLog:component.UIHtmlText;
		public activityTime:component.UILabel;
		public aniPanel:Laya.Box;
		public skNode:Laya.Sprite;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("ProUI.Ani.efc.NodeWaggleUI",ProUI.Ani.efc.NodeWaggleUI);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeItemUI",ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/NewYear/RedEnvelope/RedEnvelope");

        }

    }
}

module ProUI.ActivityMain.NewYear.RedEnvelope {
    export class RedEnvelopeItemUI extends Laya.Box {
		public itemBtn:component.UIButton;
		public open:Laya.Image;
		public title:component.UILabel;
		public npcImg:Laya.Image;
		public petImg:Laya.Image;
		public noopen:Laya.Image;
		public frameImg:component.UIFrameImage;
		public time:Laya.Box;
		public timeLab:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/NewYear/RedEnvelope/RedEnvelopeItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.NewYear.RedEnvelope {
    export class RedEnvelopeRewardUI extends View {
		public guangAni:Laya.Sprite;
		public title:component.UILabel;
		public desc:component.UILabel;
		public petImg:Laya.Image;
		public npcImg:Laya.Image;
		public btnClose:component.UIButton;
		public rewardItem:Pro.NorItemUI;
		public itemList:component.UIList;
		public btnNext:component.UIButton;
		public rewardTime:component.UILabel;
		public starAni:Laya.Sprite;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeRewardItemUI",ProUI.ActivityMain.NewYear.RedEnvelope.RedEnvelopeRewardItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/NewYear/RedEnvelope/RedEnvelopeReward");

        }

    }
}

module ProUI.ActivityMain.NewYear.RedEnvelope {
    export class RedEnvelopeRewardItemUI extends Laya.Box {
		public nickName:component.UILabel;
		public imgIcon:Laya.Image;
		public openTime:component.UILabel;
		public itemCount:component.UILabel;
		public rewardItem:Pro.NorItemUI;
		public itemLv:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/NewYear/RedEnvelope/RedEnvelopeRewardItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.NewYear.SpringFestivalCumulativeLogin {
    export class CumulativeLoginUI extends View {
		public adBg:Laya.Image;
		public txt_day:component.UIHtmlText;
		public txt_time:component.UIHtmlText;
		public itemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.NewYear.SpringFestivalCumulativeLogin.CumulativeLoginListItemUI",ProUI.ActivityMain.NewYear.SpringFestivalCumulativeLogin.CumulativeLoginListItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/NewYear/SpringFestivalCumulativeLogin/CumulativeLogin");

        }

    }
}

module ProUI.ActivityMain.NewYear.SpringFestivalCumulativeLogin {
    export class CumulativeLoginListItemUI extends Laya.Box {
		public numberDay:component.UILabel;
		public btn_receive:component.UIButton;
		public imgGetReddot:Laya.Image;
		public txtBtnreceive:component.UILabel;
		public img_finish:Laya.Image;
		public itemBox:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/NewYear/SpringFestivalCumulativeLogin/CumulativeLoginListItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.OnlinePrize {
    export class OnlinePrizeUI extends View {
		public listView:component.UIList;
		public txtTimeTitle:component.UILabel;
		public txtTimer:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.OnlinePrize.OnlinePrizeItemUI",ProUI.ActivityMain.OnlinePrize.OnlinePrizeItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("ActivityMain/OnlinePrize/OnlinePrize");

        }

    }
}

module ProUI.ActivityMain.OnlinePrize {
    export class OnlinePrizeItemUI extends Laya.Box {
		public norItem:Pro.NorItemUI;
		public btn:component.UIButton;
		public spMask:Laya.Image;
		public effPos:Laya.Box;
		public imgGet:Laya.Image;
		public imgReddot:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/OnlinePrize/OnlinePrizeItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.PageView {
    export class GradeFundUI extends Laya.Box {
		public listView:component.UIList;
		public btnBuy:component.UIButton;
		public txtPirce:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.ChildItemView.GradeFundItemUI",ProUI.ActivityMain.ChildItemView.GradeFundItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/PageView/GradeFund"], this, this);

        }

    }
}

module ProUI.ActivityMain.PageView {
    export class SignInUI extends Laya.Box {
		public btnHelp:component.UIButton;
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.ChildItemView.SignInItemUI",ProUI.ActivityMain.ChildItemView.SignInItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/PageView/SignIn"], this, this);

        }

    }
}

module ProUI.ActivityMain.RankAct {
    export class GiftBuyItemUI extends Laya.Box {
		public listItems:component.UIList;
		public imgOver:Laya.Image;
		public btnDiamionBuy:component.UIButton;
		public txtDiamionCount:component.UILabel;
		public btnMoneyBuy:component.UIButton;
		public txtMoneyCount:component.UILabel;
		public htmlLimitCount:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/RankAct/GiftBuyItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.RankAct {
    export class MainViewUI extends Laya.Box {
		public bg:Laya.Image;
		public btnGift:component.UIButton;
		public btnHelp:component.UIButton;
		public tabGrp:component.UITab;
		public listRankReward:component.UIList;
		public listBuyGift:component.UIList;
		public listRank:component.UIList;
		public vboxContent:Laya.VBox;
		public txtLimitContent:component.UILabel;
		public boxTimer:Laya.Box;
		public txtTimer:component.UILabel;
		public boxMyRankView:Laya.Box;
		public txtMyRank:component.UILabel;
		public txtMyScoreInfo:component.UILabel;
		public boxBeforeLastView:Laya.Box;
		public txtBeforeLastValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.RankAct.RankRewardItemUI",ProUI.ActivityMain.RankAct.RankRewardItemUI);
			View.regComponent("ProUI.ActivityMain.RankAct.GiftBuyItemUI",ProUI.ActivityMain.RankAct.GiftBuyItemUI);
			View.regComponent("ProUI.ActivityMain.RankAct.RankItemUI",ProUI.ActivityMain.RankAct.RankItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/RankAct/MainView"], this, this);

        }

    }
}

module ProUI.ActivityMain.RankAct {
    export class PromptUI extends View {
		public imgTitle:component.UIFrameImage;
		public playerIcon:Pro.PlayerIconUI;
		public btnGo:component.UIButton;
		public txtNickname:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("ActivityMain/RankAct/Prompt");

        }

    }
}

module ProUI.ActivityMain.RankAct {
    export class RankItemUI extends Laya.Box {
		public frameImgRank:component.UIFrameImage;
		public txtRankNum:component.UILabel;
		public playerIcon:Pro.PlayerIconUI;
		public btnDetail:component.UIButton;
		public txtNickname:component.UILabel;
		public txtRankValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/RankAct/RankItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.RankAct {
    export class RankRewardItemUI extends Laya.Box {
		public frameImgRank:component.UIFrameImage;
		public txtRankNum:component.UILabel;
		public listItems:component.UIItemBox;
		public htmlExtraCondition:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/RankAct/RankRewardItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.RoadEvolve {
    export class RoadEvolvePageUI extends View {
		public itemIcon:Laya.Image;
		public jumpBuyBtn:component.UIButton;
		public itemCount:component.UILabel;
		public progress:Laya.Image;
		public proText:component.UILabel;
		public exchangeBtn:component.UIButton;
		public chanceBtn:component.UIButton;
		public helpBtn:component.UIButton;
		public des:component.UILabel;
		public wishBtn:component.UIButton;
		public wishFree:component.UILabel;
		public needBox:Laya.HBox;
		public needIcon1:Laya.Image;
		public needCount1:component.UILabel;
		public wishsBtn:component.UIButton;
		public needIcon2:Laya.Image;
		public needCount2:component.UILabel;
		public boxCells:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/RoadEvolve/RoadEvolvePage");

        }

    }
}

module ProUI.ActivityMain.SevenDay {
    export class SevenDayLoginUI extends View {
		public Player:Laya.Skeleton;
		public imgTitle:component.UIFrameImage;
		public tabGrp:component.UITab;
		public btn_close:component.UIButton;
		public btn_get:component.UIButton;
		public imgGetReddot:Laya.Image;
		public txtGetBtnLabel:component.UILabel;
		public itemBox:component.UIItemBox;
		public dayGrpBtns1:component.UIItemBox;
		public dayGrpBtns2:component.UIItemBox;
		public txt_current:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",Laya.Skeleton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.ActivityMain.SevenDay.SevenDayLoginItemUI",ProUI.ActivityMain.SevenDay.SevenDayLoginItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/SevenDay/SevenDayLogin");

        }

    }
}

module ProUI.ActivityMain.SevenDay {
    export class SevenDayLoginItemUI extends component.UIButton {
		public bg:Laya.Image;
		public img_select:Laya.Image;
		public imgFrameIcon:component.UIFrameImage;
		public txt_day:component.UILabel;
		public img_red:Laya.Image;
		public img_get:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/SevenDay/SevenDayLoginItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.SevenDay {
    export class SevenDayProgressUI extends View {
		public ActiveValueImg:Laya.Image;
		public txt_progress:component.UILabel;
		public itemBox:component.UIItemBox;
		public itemList:component.UIList;
		public tab:component.UITab;
		public btn_close:component.UIButton;
		public txt_time:component.UIHtmlText;
		public day_box:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.ProgressChestItemUI",Pro.ProgressChestItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.SevenDay.SevenDayProgressListItemUI",ProUI.ActivityMain.SevenDay.SevenDayProgressListItemUI);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("ProUI.ActivityMain.SevenDay.SevenDayProgressItemUI",ProUI.ActivityMain.SevenDay.SevenDayProgressItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/SevenDay/SevenDayProgress");

        }

    }
}

module ProUI.ActivityMain.SevenDay {
    export class SevenDayProgressItemUI extends component.UIButton {
		public img_Select:Laya.Image;
		public txt_name:component.UILabel;
		public img_icon:Laya.Image;
		public RedDotImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/SevenDay/SevenDayProgressItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.SevenDay {
    export class SevenDayProgressListItemUI extends Laya.Box {
		public txt_title:component.UIHtmlText;
		public btn_get:component.UIButton;
		public btn_go:component.UIButton;
		public btn_buy:component.UIButton;
		public txt_price:component.UILabel;
		public img_finish:Laya.Image;
		public itemBox:component.UIItemBox;
		public txt_count:component.UIHtmlText;
		public txt_basePrice:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/SevenDay/SevenDayProgressListItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.SonOfDestiny {
    export class SonOfDestinyUI extends View {
		public imgGet:Laya.Image;
		public btnClose:component.UIButton;
		public btnPetDetail:component.UIButton;
		public btnReward:component.UIButton;
		public txtRewardBtn:component.UILabel;
		public listView:component.UIItemBox;
		public txtProgress:component.UILabel;
		public htmlTimer:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.ActivityMain.SonOfDestiny.SonOfDestinyItemUI",ProUI.ActivityMain.SonOfDestiny.SonOfDestinyItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("ActivityMain/SonOfDestiny/SonOfDestiny");

        }

    }
}

module ProUI.ActivityMain.SonOfDestiny {
    export class SonOfDestinyItemUI extends Laya.Box {
		public norItem:Pro.NorItemUI;
		public txtTitle:component.UILabel;
		public btnGo:component.UIButton;
		public btnGetReward:component.UIButton;
		public imgGet:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/SonOfDestiny/SonOfDestinyItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageItemView {
    export class BuyGiftsListItemUI extends Laya.Box {
		public img_outOfPiont:Laya.Image;
		public TopBanner:Laya.Image;
		public bannerIcon:Laya.Image;
		public itemBox:component.UIItemBox;
		public btn_buy:component.UIButton;
		public imgBuyReddot:Laya.Image;
		public txt_price:component.UILabel;
		public img_soldOut:Laya.Image;
		public txt_limit:component.UIHtmlText;
		public txt_title:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/TimeLimit/PageItemView/BuyGiftsListItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageItemView {
    export class CommonListItemUI extends Laya.Box {
		public type1:Laya.Box;
		public txt_title:component.UIHtmlText;
		public btn_get:component.UIButton;
		public imgGetReddot:Laya.Image;
		public img_finish:Laya.Image;
		public btn_go:component.UIButton;
		public imgGetReddot1:Laya.Image;
		public itemBox:component.UIItemBox;
		public txt_progress:component.UIHtmlText;
		public type2:Laya.Box;
		public btn_get2:component.UIButton;
		public redDot:Laya.Image;
		public img_finish2:Laya.Image;
		public itemList:component.UIList;
		public itemList1:component.UIList;
		public reward:Pro.NorItemUI;
		public txt_progress2:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/TimeLimit/PageItemView/CommonListItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageItemView {
    export class LimitExchangeShopItemUI extends Laya.Box {
		public backBtn:component.UIButton;
		public txtName:component.UILabel;
		public htmlTxtLimit:component.UIHtmlText;
		public imgCurrency:Laya.Image;
		public txtCurrencyCount:component.UILabel;
		public itemUI:Pro.NorItemUI;
		public imgBargain:Laya.Image;
		public imgFullBack:Laya.Image;
		public imgFullLimt:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/TimeLimit/PageItemView/LimitExchangeShopItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageItemView {
    export class ResourcesBackListUI extends Laya.Box {
		public txtName:component.UILabel;
		public txtRecoverRatio:component.UILabel;
		public fourBox:component.UIItemBox;
		public itemList:component.UIList;
		public btn_free:component.UIButton;
		public txtFreeAdmission:component.UILabel;
		public btn_perfect:component.UIButton;
		public txtPay:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/TimeLimit/PageItemView/ResourcesBackList"], this, this);

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageView {
    export class BuyGiftsUI extends View {
		public itemList:component.UIList;
		public txt_time:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.TimeLimit.PageItemView.BuyGiftsListItemUI",ProUI.ActivityMain.TimeLimit.PageItemView.BuyGiftsListItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimit/PageView/BuyGifts");

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageView {
    export class CommonActivityPageUI extends View {
		public boxBanner:Laya.Box;
		public imgBanner:Laya.Image;
		public btn_help:component.UIButton;
		public txtBannerTips:component.UIHtmlText;
		public itemList:component.UIList;
		public htmlTimer:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI",ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimit/PageView/CommonActivityPage");

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageView {
    export class CountGiftsUI extends View {
		public frameImg:component.UIFrameImage;
		public btn_rank:component.UIButton;
		public btn_reward:component.UIButton;
		public itemList:component.UIList;
		public txt_time:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI",ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimit/PageView/CountGifts");

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageView {
    export class CountGiftsRewardUI extends View {
		public btnClose:component.UIButton;
		public listView:component.UIList;
		public txtMyRank:component.UILabel;
		public txtRewardTips:component.UILabel;
		public norItems:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.RankRewardPreviewUI",Pro.RankRewardPreviewUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimit/PageView/CountGiftsReward");

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageView {
    export class DiyGiftViewUI extends View {
		public des:component.UILabel;
		public closeBtn:component.UIButton;
		public title:component.UIHtmlText;
		public cancelBtn:component.UIButton;
		public saveBtn:component.UIButton;
		public itemListView:component.UIList;
		public NameLb:component.UILabel;
		public itemInfo:Pro.NorItemUI;
		public itemCount:component.UILabel;
		public panel:Laya.Panel;
		public DesLb:component.UIHtmlText;
		public selectList:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimit/PageView/DiyGiftView");

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageView {
    export class LimitExchangeUI extends View {
		public itemBox:component.UIItemBox;
		public txt_time:component.UIHtmlText;
		public txt_rules:component.UILabel;
		public imgCurrency:Laya.Image;
		public txt_count:component.UILabel;
		public btn_go:component.UIButton;
		public reddot:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimit/PageView/LimitExchange");

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageView {
    export class LimitExchangeShopUI extends View {
		public btn_close:component.UIButton;
		public imgCurrency:Laya.Image;
		public tab:component.UITab;
		public txt_count:component.UILabel;
		public txt_time:component.UIHtmlText;
		public itemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.ExchangeShopItem",Pro.ExchangeShopItem);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimit/PageView/LimitExchangeShop");

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageView {
    export class ResourcesBackUI extends View {
		public txtDayNume:component.UIHtmlText;
		public txtIntroduce:component.UILabel;
		public itemList:component.UIList;
		public btn_Help:component.UIButton;
		public btn_free:component.UIButton;
		public txtFreeAdmission:component.UILabel;
		public btn_perfect:component.UIButton;
		public txtPay:component.UILabel;
		public img_mask:Laya.Image;
		public img_NoResources:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.TimeLimit.PageItemView.ResourcesBackListUI",ProUI.ActivityMain.TimeLimit.PageItemView.ResourcesBackListUI);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimit/PageView/ResourcesBack");

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageView {
    export class RisingStarachievementsUI extends View {
		public btn_help:component.UIButton;
		public txt_time:component.UIHtmlText;
		public itemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI",ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimit/PageView/RisingStarachievements");

        }

    }
}

module ProUI.ActivityMain.TimeLimit.PageView {
    export class UpgradeGiftUI extends View {
		public btn_help:component.UIButton;
		public itemList:component.UIList;
		public txt_time:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI",ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimit/PageView/UpgradeGift");

        }

    }
}

module ProUI.ActivityMain.TimeLimitGift {
    export class TimeLimitGiftUI extends View {
		public btnBuy:component.UIButton;
		public txtBuyLable:component.UILabel;
		public tabBox:Laya.Box;
		public btnTabLeft:component.UIButton;
		public btnTabRight:component.UIButton;
		public tabGrp:component.UITab;
		public itemListReward:component.UIItemBox;
		public txtLimitCount:component.UILabel;
		public txtTimer:component.UILabel;
		public txtRebate:component.UIBitmapText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.ActivityMain.TimeLimitGift.TimeLimitItemUI",ProUI.ActivityMain.TimeLimitGift.TimeLimitItemUI);
			View.regComponent("UIBitmapText",component.UIBitmapText);

            super.createChildren();
            this.loadUI("ActivityMain/TimeLimitGift/TimeLimitGift");

        }

    }
}

module ProUI.ActivityMain.TimeLimitGift {
    export class TimeLimitItemUI extends Laya.Box {
		public norItemUI:Pro.NorItemUI;
		public itemCount:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/TimeLimitGift/TimeLimitItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.WelcomeWarOrder.ChildView {
    export class RewardItemUI extends Laya.Box {
		public btnGet:component.UIButton;
		public norItem:Pro.NorItemUI;
		public listAdvance:component.UIItemBox;
		public imgNormalGet:Laya.Image;
		public imgAdvanceGet:Laya.Image;
		public txtLevel:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/WelcomeWarOrder/ChildView/RewardItem"], this, this);

        }

    }
}

module ProUI.ActivityMain.WelcomeWarOrder {
    export class WarOrder6103UI extends View {
		public singleBtnGet:component.UIButton;
		public singleNorItem:Pro.NorItemUI;
		public singleListAdvance:component.UIItemBox;
		public singleImgNormalGet:Laya.Image;
		public singleImgAdvanceGet:Laya.Image;
		public singleLblScore:component.UILabel;
		public singleProBg:Laya.Image;
		public singlePro:Laya.Image;
		public singleIconBg:Laya.Image;
		public singleIcon:Laya.Image;
		public list:component.UIList;
		public btnWarOrder:component.UIButton;
		public btnTask:component.UIButton;
		public btnHelp:component.UIButton;
		public btnGet:component.UIButton;
		public redReceive:Laya.Image;
		public lblTime:component.UILabel;
		public lblScore:component.UILabel;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.WelcomeWarOrder.ChildView.RewardItemUI",ProUI.ActivityMain.WelcomeWarOrder.ChildView.RewardItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/WelcomeWarOrder/WarOrder6103");

        }

    }
}

module ProUI.ActivityMain.WelcomeWarOrder {
    export class WarOrder6105UI extends View {
		public singleBtnGet:component.UIButton;
		public singleNorItem:Pro.NorItemUI;
		public singleListAdvance:component.UIItemBox;
		public singleImgNormalGet:Laya.Image;
		public singleImgAdvanceGet:Laya.Image;
		public singleLblScore:component.UILabel;
		public singleProBg:Laya.Image;
		public singlePro:Laya.Image;
		public singleIconBg:Laya.Image;
		public singleIcon:Laya.Image;
		public list:component.UIList;
		public btnWarOrder:component.UIButton;
		public btnTask:component.UIButton;
		public btnHelp:component.UIButton;
		public btnGet:component.UIButton;
		public redReceive:Laya.Image;
		public lblTime:component.UILabel;
		public lblScore:component.UILabel;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.WelcomeWarOrder.ChildView.RewardItemUI",ProUI.ActivityMain.WelcomeWarOrder.ChildView.RewardItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/WelcomeWarOrder/WarOrder6105");

        }

    }
}

module ProUI.ActivityMain.WelcomeWarOrder {
    export class WarOrderChargeUI extends View {
		public btnClose:component.UIButton;
		public btnBuy:component.UIButton;
		public txtBuyPrice:component.UILabel;
		public listReward1:component.UIList;
		public listReward2:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("ActivityMain/WelcomeWarOrder/WarOrderCharge");

        }

    }
}

module ProUI.ActivityMain.ZeroBuy {
    export class TabBtnUI extends Laya.Box {
		public imgIcon:Laya.Image;
		public btn:component.UIButton;
		public imgSel:Laya.Image;
		public txtName:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ActivityMain/ZeroBuy/TabBtn"], this, this);

        }

    }
}

module ProUI.ActivityMain.ZeroBuy {
    export class ZeroBuyUI extends View {
		public ani1:Laya.FrameAnimation;
		public animationBox:Laya.Box;
		public btnClose:component.UIButton;
		public imgIsReturn:Laya.Image;
		public imgIsBuy:Laya.Image;
		public btnTabGrpLeft:component.UIButton;
		public btnTabGrpRight:component.UIButton;
		public btnBuy:component.UIButton;
		public imgBuyBtnFrame:component.UIFrameImage;
		public txtPrice3:component.UILabel;
		public imgTitle:Laya.Image;
		public listRewards:component.UIItemBox;
		public listTab:component.UIList;
		public htmlTimer:component.UIHtmlText;
		public htmlCondition:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",Laya.Skeleton);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ActivityMain.ZeroBuy.TabBtnUI",ProUI.ActivityMain.ZeroBuy.TabBtnUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("ActivityMain/ZeroBuy/ZeroBuy");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_1503_special3UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_1503_special3");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_1505_special3UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_1505_special3");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_1507_special3UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_1507_special3");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_2505_special1UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_2505_special1");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_2507_special1UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_2507_special1");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_2509_special3UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_2509_special3");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_4503_special1UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_4503_special1");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_4505_special1UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_4505_special1");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_4505_special3UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_4505_special3");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_5404_special3UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_5404_special3");

        }

    }
}

module ProUI.Ani.batEff {
    export class ani_5503_special3UI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/batEff/ani_5503_special3");

        }

    }
}

module ProUI.Ani.efc {
    export class NodeBreatheUI extends EffectAnimation {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{},"compId":1,"animations":[{"nodes":[{"target":1,"keyframes":{"alpha":[{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":1,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":1,"key":"alpha","index":12},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":1,"key":"alpha","index":24}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super();this.effectData =ProUI.Ani.efc.NodeBreatheUI.uiView;}
    }
}

module ProUI.Ani.efc {
    export class NodeWaggleUI extends EffectAnimation {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{},"compId":1,"animations":[{"nodes":[{"target":1,"keyframes":{"rotation":[{"value":-12,"tweenMethod":"linearNone","tween":true,"target":1,"key":"rotation","index":0},{"value":12,"tweenMethod":"linearNone","tween":true,"target":1,"key":"rotation","index":3},{"value":-12,"tweenMethod":"linearNone","tween":true,"target":1,"key":"rotation","index":6},{"value":12,"tweenMethod":"linearNone","tween":true,"target":1,"key":"rotation","index":9},{"value":0,"tweenMethod":"linearNone","tween":true,"target":1,"key":"rotation","index":11},{"value":0,"tweenMethod":"linearNone","tween":true,"target":1,"key":"rotation","index":18},{"value":-12,"tweenMethod":"linearNone","tween":true,"target":1,"key":"rotation","index":20}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super();this.effectData =ProUI.Ani.efc.NodeWaggleUI.uiView;}
    }
}

module ProUI.Ani.hero {
    export class ani_eff_diUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/hero/ani_eff_di");

        }

    }
}

module ProUI.Ani.utils {
    export class ani_boss_comingUI extends View {
		public ani1:Laya.FrameAnimation;
		public IconImg:Laya.Image;
		public EffBG:Laya.Box;
		public EffIconImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Ani/utils/ani_boss_coming");

        }

    }
}

module ProUI.Ani.utils {
    export class ani_normal_comingUI extends Laya.Box {
		public ani1:Laya.FrameAnimation;
		public img:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        
            Laya.ClassUtils.createByJson(View.uiMap["Ani/utils/ani_normal_coming"], this, this);

        }

    }
}

module ProUI.Ani.utils {
    export class ani_powerUpUI extends Laya.Box {
		public imgBg:Laya.Image;
		public hbox:Laya.HBox;
		public BasePowerLb:component.UIBitmapText;
		public UpPowerLb:component.UIBitmapText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIBitmapText",component.UIBitmapText);

            Laya.ClassUtils.createByJson(View.uiMap["Ani/utils/ani_powerUp"], this, this);

        }

    }
}

module ProUI.Ani.utils {
    export class ani_pvpStartUI extends Laya.Box {
		public LeftNameLb:component.UILabel;
		public RightNameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Ani/utils/ani_pvpStart"], this, this);

        }

    }
}

module ProUI.Artifact.ActiveInfo {
    export class UpgradeViewUI extends Laya.Box {
		public UpgradeBtn:component.UIButton;
		public imgRedDotUpgrade:Laya.Image;
		public btnGoFight:component.UIButton;
		public btnActive:component.UIButton;
		public btnReset:component.UIButton;
		public SkillIconImg:Laya.Image;
		public SkillNameLb:component.UILabel;
		public SkillDesLb:component.UILabel;
		public SkillLockLb:component.UILabel;
		public NameLb:component.UILabel;
		public txtEquip:component.UILabel;
		public UpgradeCostBox:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Artifact.CostItemUI",ProUI.Artifact.CostItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/ActiveInfo/UpgradeView"], this, this);

        }

    }
}

module ProUI.Artifact.AllList {
    export class ItemViewUI extends component.UIButton {
		public frameimgIcon:component.UIFrameImage;
		public effPos:Laya.Box;
		public imgReddot:Laya.Image;
		public imgEquip:Laya.Image;
		public txtName:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/AllList/ItemView"], this, this);

        }

    }
}

module ProUI.Artifact.AllList {
    export class MainUI extends View {
		public txtTitle:component.UILabel;
		public imgUnActiveProgress:Laya.Image;
		public listView:Laya.Box;
		public btnBuyGift:component.UIButton;
		public effBtnBuyGift:ProUI.Ani.efc.NodeWaggleUI;
		public NameLb:component.UILabel;
		public unactiveBox:Laya.Box;
		public imgUnactiveTips:Laya.Image;
		public lbUnActivePro:component.UILabel;
		public unactivelist:component.UIList;
		public activeBox:Laya.Box;
		public upgradeBox:Pro.ArtifactUpgradeTable;
		public btnShengying:component.UIButton;
		public imgRedDotShengying:Laya.Image;
		public btnHelp:component.UIButton;
		public btnAwake:component.UIButton;
		public reddotAwake:Laya.Image;
		public btnConvenant:component.UIButton;
		public reddotConvenant:Laya.Image;
		public upAttrListUI:Pro.UpAttrListUI;
		public btnTotemsRecharge:component.UIButton;
		public btnTotemsReddot:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Artifact.AllList.ItemViewUI",ProUI.Artifact.AllList.ItemViewUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Ani.efc.NodeWaggleUI",ProUI.Ani.efc.NodeWaggleUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("Pro.ArtifactUpgradeTable",Pro.ArtifactUpgradeTable);
			View.regComponent("Pro.UpAttrListUI",Pro.UpAttrListUI);

            super.createChildren();
            this.loadUI("Artifact/AllList/Main");

        }

    }
}

module ProUI.Artifact.AllList {
    export class UpgradeViewUI extends Laya.Box {
		public AtterInfoBox:Laya.Box;
		public AtkLb:component.UILabel;
		public BloodLb:component.UILabel;
		public ProgressImg:Laya.Image;
		public ProgressLb:component.UILabel;
		public UpgradeCostBox:component.UIItemBox;
		public UpgradeBtn:component.UIButton;
		public imgRedDotUpgrade:Laya.Image;
		public AutoUpgradeBtn:component.UIButton;
		public AutoUpgradeLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Artifact.CostItemUI",ProUI.Artifact.CostItemUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/AllList/UpgradeView"], this, this);

        }

    }
}

module ProUI.Artifact {
    export class CostItemUI extends Laya.Box {
		public IconImg:Laya.Image;
		public NumLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/CostItem"], this, this);

        }

    }
}

module ProUI.Artifact {
    export class MainUI extends View {
		public showAniNode:Laya.Image;
		public lockEffect:Laya.Image;
		public btnIcon:component.UIButton;
		public ArtifactAllBtn:component.UIButton;
		public txtFazhenLv:component.UILabel;
		public allLockProgressBox:Laya.Box;
		public imgAllLockProgress:Laya.Image;
		public txtAllLockProgress:component.UILabel;
		public txtTitle:component.UILabel;
		public SkillAddAttrBox:Laya.Image;
		public listSkillAddAttr:component.UIItemBox;
		public UnActiveBox:ProUI.Artifact.UnActiveInfo.MainUI;
		public ActiveSkillTableBox:Pro.ArtifactSkillTable;
		public ArrowItemUI:Pro.ArrorItemUI;
		public btnHelp:component.UIButton;
		public listTabBox:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Artifact.UnActiveInfo.MainUI",ProUI.Artifact.UnActiveInfo.MainUI);
			View.regComponent("Pro.ArtifactSkillTable",Pro.ArtifactSkillTable);
			View.regComponent("Pro.ArrorItemUI",Pro.ArrorItemUI);

            super.createChildren();
            this.loadUI("Artifact/Main");

        }

    }
}

module ProUI.Artifact.ShengyinInfo {
    export class AttrItemUI extends Laya.Box {
		public bg:Laya.Image;
		public iconType:ProUI.Utils.BattleAttrTypeUI;
		public txtValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/ShengyinInfo/AttrItem"], this, this);

        }

    }
}

module ProUI.Artifact.ShengyinInfo {
    export class MainUI extends Laya.Box {
		public btnClose:component.UIButton;
		public btnHelp:component.UIButton;
		public SureBtn:component.UIButton;
		public listAttr:component.UIItemBox;
		public CostItemUI:Pro.NorItemUI;
		public UseTimesLb:component.UIHtmlText;
		public txtNextLevelTips:component.UILabel;
		public upAttrListUI:Pro.UpAttrListUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Artifact.ShengyinInfo.AttrItemUI",ProUI.Artifact.ShengyinInfo.AttrItemUI);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.UpAttrListUI",Pro.UpAttrListUI);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/ShengyinInfo/Main"], this, this);

        }

    }
}

module ProUI.Artifact.Tips {
    export class AwakeTipsUI extends View {
		public listAttr:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.AttrInfoItem2UI",ProUI.Utils.AttrInfoItem2UI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Artifact/Tips/AwakeTips");

        }

    }
}

module ProUI.Artifact.Tips {
    export class SkillAttrItemUI extends Laya.Box {
		public txtValue:component.UILabel;
		public txtLevel:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/Tips/SkillAttrItem"], this, this);

        }

    }
}

module ProUI.Artifact.Tips {
    export class TipsUI extends Laya.Box {
		public imgIcon:Laya.Image;
		public txtName:component.UILabel;
		public txtDiscribe:component.UILabel;
		public vbox:Laya.VBox;
		public normal:Laya.Box;
		public listUpgradeAttr:component.UIItemBox;
		public skill:Laya.Box;
		public listSkillAttr:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Artifact.Tips.UpgradeAttrItemUI",ProUI.Artifact.Tips.UpgradeAttrItemUI);
			View.regComponent("ProUI.Artifact.Tips.SkillAttrItemUI",ProUI.Artifact.Tips.SkillAttrItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/Tips/Tips"], this, this);

        }

    }
}

module ProUI.Artifact.Tips {
    export class UpgradeAttrItemUI extends Laya.Box {
		public txtValue:component.UILabel;
		public iconType:ProUI.Utils.BattleAttrTypeUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/Tips/UpgradeAttrItem"], this, this);

        }

    }
}

module ProUI.Artifact.UnActiveInfo {
    export class ListItemUI extends Laya.Box {
		public rewardItem:Pro.NorItemUI;
		public RewardBtn:component.UIButton;
		public GoBtn:component.UIButton;
		public NameLb:component.UILabel;
		public FinishImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/UnActiveInfo/ListItem"], this, this);

        }

    }
}

module ProUI.Artifact.UnActiveInfo {
    export class MainUI extends Laya.Box {
		public ProgressBox:Laya.Box;
		public ProgressImg:Laya.Image;
		public ProgressImgMask:Laya.Image;
		public ProgressLb:component.UILabel;
		public UnActiveList:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Artifact.UnActiveInfo.ListItemUI",ProUI.Artifact.UnActiveInfo.ListItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Artifact/UnActiveInfo/Main"], this, this);

        }

    }
}

module ProUI.Bag {
    export class GodEquipRefineUI extends View {
		public btnClose:component.UIButton;
		public QABtn:component.UIButton;
		public RefineCostBox:component.UIItemBox;
		public ItemInfo:Pro.NorItemUI;
		public BaseInfoTypeImg:ProUI.Utils.BattleAttrTypeUI;
		public BaseInfoNameLb:component.UILabel;
		public BaseInfoValueLb:component.UILabel;
		public ItemNameLb:component.UILabel;
		public RefineTimesLb:component.UILabel;
		public RefineBeforeBox:component.UIItemBox;
		public RefineAfterBox:component.UIItemBox;
		public RefineBox:Laya.HBox;
		public SaveBtn:component.UIButton;
		public RefineBtn:component.UIButton;
		public LockCostBox:Laya.Box;
		public LockCostIconImg:Laya.Image;
		public LockCostNumLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("ProUI.Bag.GodEquipRefineItemUI",ProUI.Bag.GodEquipRefineItemUI);

            super.createChildren();
            this.loadUI("Bag/GodEquipRefine");

        }

    }
}

module ProUI.Bag {
    export class GodEquipRefineItemUI extends Laya.Box {
		public typeImg:ProUI.Utils.BattleAttrTypeUI;
		public frameImgUp:component.UIFrameImage;
		public ValueProImg:Laya.Image;
		public LockBtn:component.UIButton;
		public LockImg:Laya.Image;
		public NameLb:component.UILabel;
		public ValueProLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Bag/GodEquipRefineItem"], this, this);

        }

    }
}

module ProUI.Bag {
    export class GodEquipSellUI extends View {
		public StarChoiceBox:component.UIItemBox;
		public QuChoiceBox:component.UIItemBox;
		public SureBtn:component.UIButton;
		public CloseBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Bag/GodEquipSell");

        }

    }
}

module ProUI.Bag {
    export class ItemBatchActionUI extends View {
		public txtTitle:component.UILabel;
		public SureBtn:component.UIButton;
		public SureLb:component.UILabel;
		public SellInfoBox:Laya.HBox;
		public NumRewardImg:Laya.Image;
		public NumRewardLb:component.UILabel;
		public scrollBar:Pro.HsliderScrollBar;
		public NumLb:component.UILabel;
		public EquipItem:Pro.NorItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.HsliderScrollBar",Pro.HsliderScrollBar);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Bag/ItemBatchAction");

        }

    }
}

module ProUI.Bag {
    export class MainUI extends View {
		public skRoleClick:Laya.Box;
		public aniPos:Laya.Image;
		public scaleBg:Laya.Image;
		public ItemList:component.UIList;
		public btnEquipCombin:component.UIButton;
		public SellBtn:component.UIButton;
		public tabGrp:component.UITab;
		public sayPaoPao:Laya.Box;
		public txtSay:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UITab",component.UITab);
			View.regComponent("ProUI.Hero.HeroBag.TabItemUI",ProUI.Hero.HeroBag.TabItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Bag/Main");

        }

    }
}

module ProUI.Bag {
    export class NorEquipSellUI extends View {
		public ChoiceAllBtn:component.UIButton;
		public ChoiceAllImg:Laya.Image;
		public QuChoiceBox:component.UIItemBox;
		public StarChoiceBox:component.UIItemBox;
		public CloseBtn:component.UIButton;
		public SureBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);

            super.createChildren();
            this.loadUI("Bag/NorEquipSell");

        }

    }
}

module ProUI.Bag {
    export class NorEquipSellSureUI extends Laya.Box {
		public title:component.UIHtmlText;
		public SureBtn:component.UIButton;
		public CancelBtn:component.UIButton;
		public RewardItem:Pro.NorItemUI;
		public CostDesLb:component.UILabel;
		public TipsLb:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Bag/NorEquipSellSure"], this, this);

        }

    }
}

module ProUI.Bag {
    export class RuneEquipRefineUI extends View {
		public btnClose:component.UIButton;
		public QABtn:component.UIButton;
		public RefineCostBox:component.UIItemBox;
		public ItemInfo:Pro.NorItemUI;
		public BeforeRefineItem:ProUI.Bag.RuneEquipRefineItemUI;
		public AfterRefineItem:ProUI.Bag.RuneEquipRefineItemUI;
		public ItemNameLb:component.UILabel;
		public RefineBox:Laya.HBox;
		public RefineBtn:component.UIButton;
		public SaveBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.Bag.RuneEquipRefineItemUI",ProUI.Bag.RuneEquipRefineItemUI);

            super.createChildren();
            this.loadUI("Bag/RuneEquipRefine");

        }

    }
}

module ProUI.Bag {
    export class RuneEquipRefineItemUI extends Laya.Image {
		public lockAttributeBtn:component.UIButton;
		public imgLockBtn:Laya.Image;
		public attributeLockCost:Laya.Box;
		public imgAtteibutelLockCost:Laya.Image;
		public txtAtteibutelLockCost:component.UILabel;
		public AtterBox:component.UIItemBox;
		public SkillBox:component.UIItemBox;
		public boxLockCost:Laya.Box;
		public imgLockCost:Laya.Image;
		public txtLockCost:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.AtterItemInfoUI",ProUI.Utils.AtterItemInfoUI);
			View.regComponent("ProUI.Utils.SkillItemLongUI",ProUI.Utils.SkillItemLongUI);

            Laya.ClassUtils.createByJson(View.uiMap["Bag/RuneEquipRefineItem"], this, this);

        }

    }
}

module ProUI.BattleResult {
    export class BattleResultChallengeUI extends View {
		public boxWin:Laya.Box;
		public boxWinImg:Laya.Image;
		public boxLose:Laya.Box;
		public imgIconSelf:Laya.Image;
		public imgIconTar:Laya.Image;
		public imgChangeSelf:component.UIFrameImage;
		public txtScoreChangeSelf:component.UILabel;
		public imgChangeTar:component.UIFrameImage;
		public txtScoreChangeTar:component.UILabel;
		public txtNicknameSelf:component.UILabel;
		public txtScoreSelf:component.UILabel;
		public txtNicknameTar:component.UILabel;
		public txtScoreTar:component.UILabel;
		public btnHitDetail:component.UIButton;
		public listNorItem:component.UIItemBox;
		public btnOk:component.UIButton;
		public btnReturn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("BattleResult/BattleResultChallenge");

        }

    }
}

module ProUI.BattleResult {
    export class BattleResultLadderUI extends View {
		public boxWin:Laya.Box;
		public boxWinImg:Laya.Image;
		public boxLose:Laya.Box;
		public imgIconSelf:Laya.Image;
		public imgIconTar:Laya.Image;
		public imgChangeSelf:component.UIFrameImage;
		public imgChangeTar:component.UIFrameImage;
		public txtNicknameSelf:component.UILabel;
		public txtRankSelf:component.UILabel;
		public txtNicknameTar:component.UILabel;
		public txtRankTar:component.UILabel;
		public btnHitDetail:component.UIButton;
		public listNorItem:component.UIItemBox;
		public btnOk:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("BattleResult/BattleResultLadder");

        }

    }
}

module ProUI.BattleResult {
    export class FailUI extends View {
		public HeroCallBtn:component.UIButton;
		public HeroBagBtn:component.UIButton;
		public HeroEquipBtn:component.UIButton;
		public ArtifactBtn:component.UIButton;
		public TimeLb:component.UILabel;
		public CloseBtn:component.UIButton;
		public JumpTypeBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("BattleResult/Fail");

        }

    }
}

module ProUI.BattleResult {
    export class FriendFightResultUI extends View {
		public BGBox:Laya.Box;
		public boxWin:Laya.Box;
		public boxWinImg:Laya.Image;
		public boxLose:Laya.Box;
		public TipsImg:Laya.Image;
		public btnHitDetail:component.UIButton;
		public btnShareWorld:component.UIButton;
		public btnShareFaction:component.UIButton;
		public btnReplay:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("BattleResult/FriendFightResult");

        }

    }
}

module ProUI.BattleResult {
    export class HookWinUI extends View {
		public imgShape:Laya.Image;
		public BGBox:Laya.Box;
		public TipsImg:Laya.Image;
		public PlayerIconInfo:Pro.PlayerIconUI;
		public RewardList:component.UIList;
		public imgExpProgress:Laya.Image;
		public txtExpProgress:component.UILabel;
		public hboxBtns:Laya.HBox;
		public btnClose:component.UIButton;
		public btnNext:component.UIButton;
		public TimeLb:component.UILabel;
		public txtLv:component.UILabel;
		public txtFightName:component.UILabel;
		public txtHitValue:component.UILabel;
		public txtHeroName:component.UILabel;
		public btnTextAuto:component.UIButton;
		public hboxAuto:Laya.HBox;
		public btnEnd:component.UIButton;
		public btnAuto:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("BattleResult/HookWin");

        }

    }
}

module ProUI.BattleResult {
    export class StarTowerWinUI extends View {
		public BGBox:Laya.Box;
		public RewardList:component.UIItemBox;
		public txtFightName:component.UILabel;
		public txtTime:component.UIHtmlText;
		public hboxBtns:Laya.HBox;
		public btnClose:component.UIButton;
		public btnNext:component.UIButton;
		public btnTextAuto:component.UIButton;
		public hboxAuto:Laya.HBox;
		public btnEnd:component.UIButton;
		public btnAuto:component.UIButton;
		public TimeLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("BattleResult/StarTowerWin");

        }

    }
}

module ProUI.BattleResult {
    export class SucceedUI extends View {
		public BGBox:Laya.Box;
		public TipsImg:Laya.Image;
		public TtileImg:Laya.Image;
		public RewardList:component.UIList;
		public TimeLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("BattleResult/Succeed");

        }

    }
}

module ProUI.BattleVedio {
    export class BattleFightStatisticsUI extends View {
		public imgResultValue:component.UIFrameImage;
		public btnClose:component.UIButton;
		public btnWatch:component.UIButton;
		public txtNickname1:component.UILabel;
		public txtNickname2:component.UILabel;
		public listView1:component.UIList;
		public listView2:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.BattleVedio.ChildView.FightStatisticsPetItemViewUI",ProUI.BattleVedio.ChildView.FightStatisticsPetItemViewUI);

            super.createChildren();
            this.loadUI("BattleVedio/BattleFightStatistics");

        }

    }
}

module ProUI.BattleVedio {
    export class BattleVedioUI extends View {
		public txtWorshipCount:component.UILabel;
		public tabGrp:component.UITab;
		public btnClose:component.UIButton;
		public btnSelfRecord:component.UIButton;
		public btnCollect:component.UIButton;
		public pageViewContainer:Pro.TableBarContiner;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("BattleVedio/BattleVedio");

        }

    }
}

module ProUI.BattleVedio {
    export class BattleVedioCollectUI extends View {
		public imgEmpty:Laya.Image;
		public txtDes:component.UILabel;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.BattleVedioNormalItemView",Pro.BattleVedioNormalItemView);

            super.createChildren();
            this.loadUI("BattleVedio/BattleVedioCollect");

        }

    }
}

module ProUI.BattleVedio {
    export class BattleVedioSelfRecordUI extends View {
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.BattleVedioNormalItemView",Pro.BattleVedioNormalItemView);

            super.createChildren();
            this.loadUI("BattleVedio/BattleVedioSelfRecord");

        }

    }
}

module ProUI.BattleVedio.ChildView {
    export class DanItemViewUI extends Laya.Box {
		public playerIconLeft:Pro.PlayerIconUI;
		public imgResultLeft:component.UIFrameImage;
		public imgIconLeft:Laya.Image;
		public txtServerNameLeft:component.UILabel;
		public txtNicknameLeft:component.UILabel;
		public txtRankLeft:component.UILabel;
		public txtLevelLeft:component.UILabel;
		public playerIconRight:Pro.PlayerIconUI;
		public imgResultRight:component.UIFrameImage;
		public imgIconRight:Laya.Image;
		public txtServerNameRight:component.UILabel;
		public txtNicknameRight:component.UILabel;
		public txtRankRight:component.UILabel;
		public txtLevelRight:component.UILabel;
		public btnDetail:component.UIButton;
		public txtTime:component.UILabel;
		public txtType:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["BattleVedio/ChildView/DanItemView"], this, this);

        }

    }
}

module ProUI.BattleVedio.ChildView {
    export class DanPageViewUI extends Laya.Box {
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.DanRecordItemView",Pro.DanRecordItemView);

            Laya.ClassUtils.createByJson(View.uiMap["BattleVedio/ChildView/DanPageView"], this, this);

        }

    }
}

module ProUI.BattleVedio.ChildView {
    export class DanRecordDetailItemViewUI extends Laya.Box {
		public imgProgressLeft:Laya.Image;
		public imgProgressRight:Laya.Image;
		public imgResultLeft:Laya.Image;
		public imgResultRight:Laya.Image;
		public btnData:component.UIButton;
		public btnReplay:component.UIButton;
		public txtNameLeft:component.UILabel;
		public txtIndexLeft:component.UILabel;
		public txtIndexRight:component.UILabel;
		public txtNameRight:component.UILabel;
		public txtBout:component.UILabel;
		public txtTime:component.UILabel;
		public txtFightValueLeft:component.UILabel;
		public txtProgressLeft:component.UILabel;
		public txtFightValueRight:component.UILabel;
		public txtProgressRight:component.UILabel;
		public listHerosLeft:component.UIItemBox;
		public listHerosRight:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["BattleVedio/ChildView/DanRecordDetailItemView"], this, this);

        }

    }
}

module ProUI.BattleVedio.ChildView {
    export class FightStatisticsPetItemViewUI extends Laya.Box {
		public imgCure:Laya.Image;
		public imgAtk:Laya.Image;
		public imgHit:Laya.Image;
		public txtAtk:component.UILabel;
		public txtHit:component.UILabel;
		public txtCure:component.UILabel;
		public headView:Pro.NorItemUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["BattleVedio/ChildView/FightStatisticsPetItemView"], this, this);

        }

    }
}

module ProUI.BattleVedio.ChildView {
    export class NomalListItemUI extends Laya.Box {
		public imgResultL:component.UIFrameImage;
		public imgResultR:component.UIFrameImage;
		public btnYetLike:component.UIButton;
		public btnLike:component.UIButton;
		public imgReddotLike:Laya.Image;
		public btnUnCollect:component.UIButton;
		public btnCollect:component.UIButton;
		public btnData:component.UIButton;
		public btnReplay:component.UIButton;
		public btnShare:component.UIButton;
		public boxRank:Laya.Box;
		public txtRankL:component.UILabel;
		public txtRankR:component.UILabel;
		public hboxNicknameL:Laya.HBox;
		public txtNicknameL:component.UILabel;
		public txtLvL:component.UILabel;
		public hboxNicknameR:Laya.HBox;
		public txtNicknameR:component.UILabel;
		public txtLvR:component.UILabel;
		public boxAtkDef:Laya.Box;
		public txtPlayCount:component.UILabel;
		public txtTranspondCount:component.UILabel;
		public txtLikeCount:component.UILabel;
		public txtFightPowerL:component.UILabel;
		public txtFightPowerR:component.UILabel;
		public txtBoutValue:component.UILabel;
		public txtBattleType:component.UILabel;
		public txtTime:component.UILabel;
		public listHerosL:component.UIItemBox;
		public listHerosR:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["BattleVedio/ChildView/NomalListItem"], this, this);

        }

    }
}

module ProUI.BattleVedio.ChildView {
    export class NomalListPageViewUI extends Laya.Box {
		public chkBtnFilter:Pro.CheckButton;
		public imgEmpty:Laya.Image;
		public listView:component.UIList;
		public comboBox:Laya.Box;
		public btnComboBox:component.UIButton;
		public txtComboTitle:component.UILabel;
		public comboListPanel:Laya.Image;
		public comboListPanelMask:component.UIButton;
		public comboListView:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.CheckButton",Pro.CheckButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.BattleVedioNormalItemView",Pro.BattleVedioNormalItemView);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);

            Laya.ClassUtils.createByJson(View.uiMap["BattleVedio/ChildView/NomalListPageView"], this, this);

        }

    }
}

module ProUI.BattleVedio {
    export class DanRecordUI extends View {
		public btnClose:component.UIButton;
		public listEmpty:Laya.Image;
		public txtCurDan:component.UILabel;
		public txtDes:component.UILabel;
		public tabGrp:Pro.UITabExtend;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.DanRecordItemView",Pro.DanRecordItemView);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);
			View.regComponent("UIList",component.UIList);

            super.createChildren();
            this.loadUI("BattleVedio/DanRecord");

        }

    }
}

module ProUI.BattleVedio {
    export class DanRecordDetailUI extends View {
		public btnClose:component.UIButton;
		public txtNicknameLeft:component.UILabel;
		public txtNicknameRight:component.UILabel;
		public txtScore:component.UILabel;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.BattleVedio.ChildView.DanRecordDetailItemViewUI",ProUI.BattleVedio.ChildView.DanRecordDetailItemViewUI);

            super.createChildren();
            this.loadUI("BattleVedio/DanRecordDetail");

        }

    }
}

module ProUI.Challenge {
    export class ArenaEnterUI extends View {
		public jingjiBox:Laya.Box;
		public championBox:Laya.Box;
		public btnChampion:component.UIButton;
		public championImg:Laya.Image;
		public btnLoop:component.UIButton;
		public loopImg:Laya.Image;
		public btnShape:component.UIButton;
		public loopCountBg:Laya.Image;
		public btnHelp:component.UIButton;
		public btnRank:component.UIButton;
		public btnAddLoopCount:component.UIButton;
		public btnEnter:component.UIButton;
		public txtWorshipCount:component.UILabel;
		public btnEmbattle:component.UIButton;
		public boxAvatarList:Laya.Box;
		public txtLine1Title:component.UILabel;
		public txtLine1Content:component.UILabel;
		public txtLine1Content2:component.UILabel;
		public txtLine2Title:component.UILabel;
		public txtLine2Content:component.UILabel;
		public txtLine3Title:component.UILabel;
		public txtLine3Content:component.UILabel;
		public txtLine4Title:component.UILabel;
		public txtLine4Content:component.UILabel;
		public txtLine4Content2:component.UILabel;
		public txtLine5Title:component.UILabel;
		public txtLine5Content:component.UILabel;
		public closeBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.ArenaEnterRoleBox",Pro.ArenaEnterRoleBox);

            super.createChildren();
            this.loadUI("Challenge/ArenaEnter");

        }

    }
}

module ProUI.Challenge {
    export class ArenaEnterRoleBoxUI extends Laya.Box {
		public imgTitle:Laya.Image;
		public avatar:Laya.Box;
		public txtNickname:component.UILabel;
		public btnWorship:component.UIButton;
		public txtWorshipCount:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Challenge/ArenaEnterRoleBox"], this, this);

        }

    }
}

module ProUI.Challenge {
    export class ChallengeUI extends View {
		public tabGrp:component.UITab;
		public pageViewContainer:Pro.TableBarContiner;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Challenge/Challenge");

        }

    }
}

module ProUI.Challenge {
    export class ChallengeRecordUI extends View {
		public imgEmpty:Laya.Image;
		public btnClose:component.UIButton;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Challenge.ChildView.RecordItemViewUI",ProUI.Challenge.ChildView.RecordItemViewUI);

            super.createChildren();
            this.loadUI("Challenge/ChallengeRecord");

        }

    }
}

module ProUI.Challenge {
    export class ChallengeTargetInfoUI extends View {
		public btnClose:component.UIButton;
		public txtFightValue:component.UILabel;
		public viewPlayerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public txtScore:component.UILabel;
		public listPetView:component.UIItemBox;
		public btnAttack:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Challenge/ChallengeTargetInfo");

        }

    }
}

module ProUI.Challenge.ChildView {
    export class ChallengeItemViewUI extends Laya.Box {
		public btnAttack:component.UIButton;
		public imgReddot:Laya.Image;
		public imgFee:Laya.Image;
		public labelFree:component.UILabel;
		public viewPlayerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public txtFightValue:component.UILabel;
		public txtScore:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);

            Laya.ClassUtils.createByJson(View.uiMap["Challenge/ChildView/ChallengeItemView"], this, this);

        }

    }
}

module ProUI.Challenge.ChildView {
    export class ChallengeViewUI extends Laya.Box {
		public imgProgress:Laya.Image;
		public txtRank:component.UILabel;
		public txtScore:component.UILabel;
		public txtTicketCount:component.UILabel;
		public txtCount:component.UILabel;
		public listView:component.UIItemBox;
		public btnShop:component.UIButton;
		public btnAddCount:component.UIButton;
		public btnSkip:component.UIButton;
		public skipFlag:Laya.Image;
		public listProgressChest:component.UIItemBox;
		public btnBattleRecord:component.UIButton;
		public btnRefresh:component.UIButton;
		public txtRefreshBtnLabel:component.UILabel;
		public btnEmbattle:component.UIButton;
		public txtOverTime:component.UILabel;
		public previewBoxReward:Laya.Image;
		public previewBoxMaskBtn:component.UIButton;
		public itemListPreview:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Challenge.ChildView.ChallengeItemViewUI",ProUI.Challenge.ChildView.ChallengeItemViewUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.ProgressChestItemUI",Pro.ProgressChestItemUI);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Challenge/ChildView/ChallengeView"], this, this);

        }

    }
}

module ProUI.Challenge.ChildView {
    export class DailyRewardViewUI extends Laya.Box {
		public listView:component.UIList;
		public txtRank:component.UILabel;
		public listItems:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Challenge.ChildView.RewardItemViewUI",ProUI.Challenge.ChildView.RewardItemViewUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Challenge/ChildView/DailyRewardView"], this, this);

        }

    }
}

module ProUI.Challenge.ChildView {
    export class RankItemViewUI extends Laya.Image {
		public frame:Laya.Image;
		public imgFrameRank:component.UIFrameImage;
		public txtRank:Laya.Label;
		public btnWorship:component.UIButton;
		public reddot:Laya.Image;
		public txtWorshioValue:component.UILabel;
		public viewPlayerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public txtFightValue:component.UILabel;
		public txtDesc:component.UILabel;
		public txtScore:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);

            Laya.ClassUtils.createByJson(View.uiMap["Challenge/ChildView/RankItemView"], this, this);

        }

    }
}

module ProUI.Challenge.ChildView {
    export class RankRewardViewUI extends Laya.Box {
		public txtOverTime:component.UILabel;
		public txtRank:component.UILabel;
		public listView:component.UIList;
		public listItems:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Challenge.ChildView.RewardItemViewUI",ProUI.Challenge.ChildView.RewardItemViewUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Challenge/ChildView/RankRewardView"], this, this);

        }

    }
}

module ProUI.Challenge.ChildView {
    export class RankViewUI extends Laya.Box {
		public imgEmpty:Laya.Image;
		public listView:component.UIList;
		public selfView:ProUI.Challenge.ChildView.RankItemViewUI;
		public txtNoRank:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Challenge.ChildView.RankItemViewUI",ProUI.Challenge.ChildView.RankItemViewUI);

            Laya.ClassUtils.createByJson(View.uiMap["Challenge/ChildView/RankView"], this, this);

        }

    }
}

module ProUI.Challenge.ChildView {
    export class RecordItemViewUI extends Laya.Box {
		public imgChangeArrow:component.UIFrameImage;
		public btnWatch:component.UIButton;
		public viewPlayerIconEnemy:Pro.PlayerIconUI;
		public viewPlayerIconSelf:Pro.PlayerIconUI;
		public imgFrameResult:component.UIFrameImage;
		public txtResult:component.UILabel;
		public txtNicknameLeft:component.UILabel;
		public txtNicknameRight:component.UILabel;
		public txtTime:component.UILabel;
		public txtScoreChange:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Challenge/ChildView/RecordItemView"], this, this);

        }

    }
}

module ProUI.Challenge.ChildView {
    export class RewardItemViewUI extends Laya.Box {
		public imgFrameRank:component.UIFrameImage;
		public listItems:component.UIItemBox;
		public txtRank:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Challenge/ChildView/RewardItemView"], this, this);

        }

    }
}

module ProUI.Champion {
    export class ChampionUI extends View {
		public boxNoOpenView:Pro.ChampNoOpenTipView;
		public viewFighting:Pro.ChampFightingView;
		public viewGuess:Pro.ChampGuessView;
		public viewFinal32:Pro.ChampFinal32View;
		public viewRank:Pro.ChampRankView;
		public timeView:Pro.ChampTimeView;
		public viewBarrage:Pro.ChampBarrageView;
		public tabGrp:component.UITab;
		public btnReturn:component.UIButton;
		public btnShop:component.UIButton;
		public btnHelp:component.UIButton;
		public btnMyEmbattle:component.UIButton;
		public btnReward:component.UIButton;
		public btnRecord:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.ChampNoOpenTipView",Pro.ChampNoOpenTipView);
			View.regComponent("Pro.ChampFightingView",Pro.ChampFightingView);
			View.regComponent("Pro.ChampGuessView",Pro.ChampGuessView);
			View.regComponent("Pro.ChampFinal32View",Pro.ChampFinal32View);
			View.regComponent("Pro.ChampRankView",Pro.ChampRankView);
			View.regComponent("Pro.ChampTimeView",Pro.ChampTimeView);
			View.regComponent("Pro.ChampBarrageView",Pro.ChampBarrageView);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Champion/Champion");

        }

    }
}

module ProUI.Champion {
    export class ChampionGuessPanelUI extends View {
		public btnClose:component.UIButton;
		public btnReturn:component.UIButton;
		public btnConfirm:component.UIButton;
		public txtNickname:component.UILabel;
		public txtCanCount:component.UILabel;
		public txtGetCount:component.UILabel;
		public txtInputCount:component.UILabel;
		public scrollBar:Pro.HsliderScrollBar;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.HsliderScrollBar",Pro.HsliderScrollBar);

            super.createChildren();
            this.loadUI("Champion/ChampionGuessPanel");

        }

    }
}

module ProUI.Champion {
    export class ChampionMyGuessUI extends View {
		public btnClose:component.UIButton;
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Champion.ListItems.MyGuessListItemUI",ProUI.Champion.ListItems.MyGuessListItemUI);

            super.createChildren();
            this.loadUI("Champion/ChampionMyGuess");

        }

    }
}

module ProUI.Champion {
    export class ChampionPromptUI extends View {
		public btnClose:component.UIButton;
		public btnCancel:component.UIButton;
		public txtCountdown:component.UILabel;
		public btnEnter:component.UIButton;
		public listItems:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Champion/ChampionPrompt");

        }

    }
}

module ProUI.Champion {
    export class ChampionRecordUI extends View {
		public btnClose:component.UIButton;
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Champion.ListItems.RecordItemViewUI",ProUI.Champion.ListItems.RecordItemViewUI);

            super.createChildren();
            this.loadUI("Champion/ChampionRecord");

        }

    }
}

module ProUI.Champion {
    export class ChampionResultUI extends View {
		public txtRank:component.UIBitmapText;
		public txtJoinCount:component.UILabel;
		public txtWinCount:component.UILabel;
		public txtNickname:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Champion/ChampionResult");

        }

    }
}

module ProUI.Champion {
    export class ChampionRewardUI extends View {
		public btnClose:component.UIButton;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.RankRewardPreviewUI",Pro.RankRewardPreviewUI);

            super.createChildren();
            this.loadUI("Champion/ChampionReward");

        }

    }
}

module ProUI.Champion {
    export class ChampionSendBarrageUI extends View {
		public btnClose:component.UIButton;
		public btnSend:component.UIButton;
		public btnFastBarrage:component.UIButton;
		public imgNeed:Laya.Image;
		public txtNeed:component.UILabel;
		public btnBulletChat:Pro.SlideButton;
		public txtInput:Laya.TextInput;
		public popupViewMask:component.UIButton;
		public comboBoxListView:Laya.Image;
		public listCombo:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.SlideButton",Pro.SlideButton);
			View.regComponent("UIList",component.UIList);

            super.createChildren();
            this.loadUI("Champion/ChampionSendBarrage");

        }

    }
}

module ProUI.Champion {
    export class ChampionTop3UI extends View {
		public playerHeadList:Laya.Box;
		public txtTime:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Champion/ChampionTop3");

        }

    }
}

module ProUI.Champion.ChildView {
    export class BarrageViewUI extends Laya.Box {
		public btnEdit:component.UIButton;
		public boxShowView:Laya.Box;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.ChampBarrageView",Pro.ChampBarrageView);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Champion/ChildView/BarrageView"], this, this);

        }

    }
}

module ProUI.Champion.ChildView {
    export class FightingViewUI extends Laya.Box {
		public imgWinRight:Laya.Image;
		public imgWinLeft:Laya.Image;
		public playerIconL:Pro.PlayerIconUI;
		public playerIconR:Pro.PlayerIconUI;
		public txtNicknameL:component.UILabel;
		public txtLvL:component.UILabel;
		public txtNicknameR:component.UILabel;
		public txtLvR:component.UILabel;
		public imgEmbattleL:Laya.Image;
		public imgEmbattleR:Laya.Image;
		public listHerosL:component.UIItemBox;
		public listHerosR:component.UIItemBox;
		public imgVs:Laya.Image;
		public btnWatch:component.UIButton;
		public imgBtnWatch:component.UIFrameImage;
		public txtFightValueL:Laya.Label;
		public txtFightValueR:Laya.Label;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.ChampFightingView",Pro.ChampFightingView);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["Champion/ChildView/FightingView"], this, this);

        }

    }
}

module ProUI.Champion.ChildView {
    export class Final32ViewUI extends Laya.Box {
		public view4:Laya.Box;
		public playerList4:Laya.Box;
		public championBox:Laya.Image;
		public imgChampionIcon:Laya.Image;
		public btnList4:Laya.Box;
		public view32:Laya.Box;
		public playerList8:Laya.Box;
		public txtGroup:component.UILabel;
		public ArrowItemUI:Pro.ArrorItemUI;
		public btnList8:Laya.Box;
		public btnTab1:component.UIButton;
		public frameImgBtnTab1:component.UIFrameImage;
		public txtTabLabel1:component.UILabel;
		public btnTab2:component.UIButton;
		public frameImgBtnTab2:component.UIFrameImage;
		public txtTabLabel2:component.UILabel;
		public btnMyGuess:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.ArrorItemUI",Pro.ArrorItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["Champion/ChildView/Final32View"], this, this);

        }

    }
}

module ProUI.Champion.ChildView {
    export class GuessViewUI extends Laya.Box {
		public imgRightProgress:Laya.Image;
		public btnLeft:component.UIButton;
		public txtBtnLabelLeft:component.UILabel;
		public btnRight:component.UIButton;
		public txtBtnLabelRight:component.UILabel;
		public btnMyGuess:component.UIButton;
		public txtLeftNickname:component.UILabel;
		public txtRightNickname:component.UILabel;
		public txtLeftPercent:component.UILabel;
		public txtRightPercent:component.UILabel;
		public txtJettonCount:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Champion/ChildView/GuessView"], this, this);

        }

    }
}

module ProUI.Champion.ChildView {
    export class NoOpenTipViewUI extends Laya.Box {
		public txtNoOpenContent:component.UILabel;
		public htmlOpenTimer:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Champion/ChildView/NoOpenTipView"], this, this);

        }

    }
}

module ProUI.Champion.ChildView {
    export class RankViewUI extends Laya.Box {
		public imgEmpty:Laya.Image;
		public listView:component.UIList;
		public selfView:ProUI.Champion.ListItems.RankItemViewUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Champion.ListItems.RankItemViewUI",ProUI.Champion.ListItems.RankItemViewUI);

            Laya.ClassUtils.createByJson(View.uiMap["Champion/ChildView/RankView"], this, this);

        }

    }
}

module ProUI.Champion.ChildView {
    export class TimeViewUI extends Laya.Box {
		public flag:Laya.Image;
		public txtTitle:component.UILabel;
		public txtTimer:component.UILabel;
		public boxLb:Laya.Box;
		public txtTitle1:component.UILabel;
		public txtTimer1:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Champion/ChildView/TimeView"], this, this);

        }

    }
}

module ProUI.Champion.ListItems {
    export class BarrageSingleItemUI extends Laya.Box {
		public selfBg:Laya.Image;
		public label:Laya.Label;

        constructor(){ super();this.createUI();}
        createUI():void {
        
            Laya.ClassUtils.createByJson(View.uiMap["Champion/ListItems/BarrageSingleItem"], this, this);

        }

    }
}

module ProUI.Champion.ListItems {
    export class MyGuessListItemUI extends Laya.Box {
		public viewPlayerIconAtk:Pro.PlayerIconUI;
		public viewPlayerIconDef:Pro.PlayerIconUI;
		public imgJetton:Laya.Image;
		public txtTicketValue:component.UILabel;
		public imgWinAck:Laya.Image;
		public imgWinDef:Laya.Image;
		public txtRound:component.UILabel;
		public txtNicknameAtk:component.UILabel;
		public txtNicknameDef:component.UILabel;
		public btnWatch:component.UIButton;
		public txtContent:component.UILabel;
		public txtGuessTarget:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Champion/ListItems/MyGuessListItem"], this, this);

        }

    }
}

module ProUI.Champion.ListItems {
    export class RankItemViewUI extends Laya.Image {
		public frame:Laya.Image;
		public viewPlayerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public txtFightValue:component.UILabel;
		public txtScore:component.UILabel;
		public imgFrameRank:component.UIFrameImage;
		public txtRank:Laya.Label;
		public btnWorship:component.UIButton;
		public txtWorshioValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Champion/ListItems/RankItemView"], this, this);

        }

    }
}

module ProUI.Champion.ListItems {
    export class RecordItemViewUI extends Laya.Box {
		public viewPlayerIconAtk:Pro.PlayerIconUI;
		public viewPlayerIconDef:Pro.PlayerIconUI;
		public imgJetton:Laya.Image;
		public imgWinAck:Laya.Image;
		public imgWinDef:Laya.Image;
		public txtResult:component.UILabel;
		public txtNicknameAtk:component.UILabel;
		public txtNicknameDef:component.UILabel;
		public btnWatch:component.UIButton;
		public txtTime:component.UILabel;
		public txtScoreChange:component.UILabel;
		public imgChangeArrow:component.UIFrameImage;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["Champion/ListItems/RecordItemView"], this, this);

        }

    }
}

module ProUI.Chat {
    export class ChatInputUI extends Laya.Box {
		public InputBox:Laya.Box;
		public MsgInput:Laya.TextInput;
		public ChoiceFaceBtn:component.UIButton;
		public SendBtn:component.UIButton;
		public ExInfoBox:Laya.Box;
		public ExItemTab:component.UITab;
		public ExItemList:component.UIList;
		public ExEmojiList:component.UIList;
		public NoInputLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Chat/ChatInput"], this, this);

        }

    }
}

module ProUI.Chat {
    export class ItemCommonUI extends View {
		public StatueImgFrame:component.UIFrameImage;
		public htmlMsg:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Chat/ItemCommon");

        }

    }
}

module ProUI.Chat {
    export class ItemLeftUI extends View {
		public BGImg:Laya.Image;
		public PlayerIcon:Pro.PlayerIconUI;
		public htmlMsg:component.UIHtmlText;
		public txtName:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Chat/ItemLeft");

        }

    }
}

module ProUI.Chat {
    export class ItemPrivateUI extends component.UIButton {
		public CoverImg:Laya.Image;
		public IconInfo:Pro.PlayerIconUI;
		public NameLb:component.UILabel;
		public RedDotImg:Laya.Image;
		public DelBtn:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Chat/ItemPrivate"], this, this);

        }

    }
}

module ProUI.Chat {
    export class ItemRightUI extends View {
		public PlayerIcon:Pro.PlayerIconUI;
		public BGImg:Laya.Image;
		public htmlMsg:component.UIHtmlText;
		public txtName:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Chat/ItemRight");

        }

    }
}

module ProUI.Chat {
    export class MainUI extends View {
		public ani1:Laya.FrameAnimation;
		public tabGrp:component.UITab;
		public ChatBGImg:Laya.Image;
		public ChatList:component.UIChat;
		public ChatEmptyImg:Laya.Image;
		public InputLayer:Pro.ChatInput;
		public CloseBtn:component.UIButton;
		public PrivateChatList:component.UIList;
		public PrivateAddBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIChat",component.UIChat);
			View.regComponent("Pro.ChatInput",Pro.ChatInput);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Chat.ItemPrivateUI",ProUI.Chat.ItemPrivateUI);

            super.createChildren();
            this.loadUI("Chat/Main");

        }

    }
}

module ProUI.Common {
    export class AlertWinUI extends View {
		public image_con:Laya.Image;
		public TitleLb:component.UILabel;
		public FunBox:Laya.Box;
		public CloseBtn:component.UILabelButton;
		public SureBtn:component.UILabelButton;
		public DesLb:component.UIHtmlText;
		public chkBtnTodayRepeat:component.UIButton;
		public imgTodayRepeat:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Common/AlertWin");

        }

    }
}

module ProUI.Common {
    export class BigWaitUI extends View {
		public effNode:Laya.Box;
		public txtLabel:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Common/BigWait");

        }

    }
}

module ProUI.Common {
    export class ChangeNickNameUI extends View {
		public RandomNameBtn:component.UIButton;
		public ManBtn:component.UIButton;
		public ManImg:Laya.Image;
		public WomanBtn:component.UIButton;
		public WomanImg:Laya.Image;
		public NameInput:Laya.TextInput;
		public SureBtn:component.UIButton;
		public aniPos:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Common/ChangeNickName");

        }

    }
}

module ProUI.Common {
    export class FloatNoticeUI extends View {
		public bg:Laya.Image;
		public txt_bg:Laya.Sprite;
		public txt_desc:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Common/FloatNotice");

        }

    }
}

module ProUI.Common {
    export class GMUI extends View {
		public GMLIst:component.UIList;
		public closeBtn:component.UIButton;
		public ShowPanel:Laya.Panel;
		public showText:Laya.Text;
		public gmCmdInput:Laya.TextInput;
		public gmCmdSendBtn:component.UILabelButton;
		public AddItemIDInput:Laya.TextInput;
		public AddItemNumInput:Laya.TextInput;
		public AddPetIDInput:Laya.TextInput;
		public AddPetStarInput:Laya.TextInput;
		public AddPetNumInput:Laya.TextInput;
		public AddItemBtn:component.UILabelButton;
		public AddHeroBtn:component.UILabelButton;
		public payNum:Laya.TextInput;
		public btnPay:component.UILabelButton;
		public btnTime:component.UILabelButton;
		public inputYear:Laya.TextInput;
		public inputMonth:Laya.TextInput;
		public inputDay:Laya.TextInput;
		public inputHour:Laya.TextInput;
		public inputSecond:Laya.TextInput;
		public inputMinute:Laya.TextInput;
		public levelNum:Laya.TextInput;
		public btnLevel:component.UILabelButton;
		public btnMinconsole:component.UILabelButton;
		public imputHookStage:Laya.TextInput;
		public btnHookStage:component.UILabelButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",Laya.Text);
			View.regComponent("UIList",component.UIList);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Common/GM");

        }

    }
}

module ProUI.Common {
    export class GuideWinUI extends View {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public ani3:Laya.FrameAnimation;
		public ani4:Laya.FrameAnimation;
		public Touch:component.UIButton;
		public MaskLayer:Laya.Box;
		public ButtonLayer:Laya.Box;
		public Finger:Laya.Box;
		public OutClickEffImg:Laya.Image;
		public FingerEffImg:Laya.Image;
		public FingerArrowIcon:Laya.Box;
		public boxFingerTip:Laya.Box;
		public imgFingerTip:Laya.Image;
		public FingerTipLb:component.UILabel;
		public FingerBounds:Laya.Box;
		public ImgFingerBounds:Laya.Image;
		public Tips:Laya.Box;
		public imgNpc:Laya.Image;
		public HeadImg:Laya.Image;
		public CellImg1:Laya.Image;
		public CellImg2:Laya.Image;
		public JumpBtn:component.UIButton;
		public ExitBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Common/GuideWin");

        }

    }
}

module ProUI.Common {
    export class HelpUI extends View {
		public btnClose:component.UIButton;
		public listPanel:Laya.Panel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Common/Help");

        }

    }
}

module ProUI.Common {
    export class ItemAccessUI extends View {
		public btnClose:component.UIButton;
		public ItemBGImg:Laya.Image;
		public ItemList:component.UIList;
		public ItemInfoBox:Laya.Box;
		public ItemInfo:Pro.NorItemUI;
		public NameLb:component.UILabel;
		public HaveNumLb:component.UILabel;
		public panelDescLb:Laya.Panel;
		public ItemDesLb:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Common.ItemAccessInfoUI",ProUI.Common.ItemAccessInfoUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Common/ItemAccess");

        }

    }
}

module ProUI.Common {
    export class ItemAccessInfoUI extends Laya.Box {
		public GoBtn:component.UIButton;
		public NameLb:component.UILabel;
		public txtNoOpen:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Common/ItemAccessInfo"], this, this);

        }

    }
}

module ProUI.Common {
    export class LevelUpPanelUI extends View {
		public TipsImg:Laya.Image;
		public viewSystemOpen:Laya.Box;
		public imgTurnRemind:Laya.Image;
		public listOpenSytems:component.UIList;
		public txtSystemTitle:component.UILabel;
		public viewPrize:Laya.Box;
		public listPirzeView:component.UIItemBox;
		public txtLastLevel:component.UILabel;
		public txtNewLevel:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Common.LevelUpPanelSystemItemUI",ProUI.Common.LevelUpPanelSystemItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Common/LevelUpPanel");

        }

    }
}

module ProUI.Common {
    export class LevelUpPanelSystemItemUI extends Laya.Box {
		public imgNew:Laya.Image;
		public icon:Laya.Image;
		public txtName:component.UILabel;
		public txtDes:component.UILabel;
		public txtNextLv:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Common/LevelUpPanelSystemItem"], this, this);

        }

    }
}

module ProUI.Common {
    export class MinConsoleUI extends View {
		public btnClose:component.UIButton;
		public panel:Laya.Panel;
		public boxContent:Laya.Box;
		public txtContent:component.UILabel;
		public input:Laya.TextInput;
		public btnEnter:component.UIButton;
		public btnLast:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Common/MinConsole");

        }

    }
}

module ProUI.Common {
    export class NewSystemOpenPanelUI extends View {
		public TipsImg:Laya.Image;
		public centerBg:Laya.Image;
		public txtName:component.UILabel;
		public icon:Laya.Image;
		public txtDes:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Common/NewSystemOpenPanel");

        }

    }
}

module ProUI.Common {
    export class NextHookTipsUI extends View {
		public txtTitle:component.UILabel;
		public listView:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Common.NextHookTipsItemUI",ProUI.Common.NextHookTipsItemUI);

            super.createChildren();
            this.loadUI("Common/NextHookTips");

        }

    }
}

module ProUI.Common {
    export class NextHookTipsItemUI extends Laya.Box {
		public icon:Laya.Image;
		public txtName:component.UILabel;
		public txtValue:component.UILabel;
		public txtNewValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Common/NextHookTipsItem"], this, this);

        }

    }
}

module ProUI.Common {
    export class NextPreviewPromptUI extends View {
		public bg:component.UIFrameImage;
		public lightEff:Laya.Image;
		public imgTips:component.UIFrameImage;
		public imgCloseTips:Laya.Image;
		public norItem:Pro.NorItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Common/NextPreviewPrompt");

        }

    }
}

module ProUI.Common {
    export class NormalAwardUI extends View {
		public bg:Laya.Box;
		public bgBtn:Laya.Box;
		public aniPosImg:Laya.Image;
		public RewardList:component.UIList;
		public TipsImg:Laya.Image;
		public CallbackBox:Laya.Box;
		public needBox:Laya.Box;
		public txtNeedCount:component.UILabel;
		public imgNeedIcon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Common/NormalAward");

        }

    }
}

module ProUI.Common {
    export class NormalTipsUI extends View {
		public bg:Laya.Image;
		public txtContent:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Common/NormalTips");

        }

    }
}

module ProUI.Common {
    export class QuickAwardUI extends View {
		public TipsImg:Laya.Image;
		public TitleFrameImg:component.UIFrameImage;
		public ExpProImg:Laya.Image;
		public RewardList:component.UIList;
		public PlayerIconInfo:Pro.PlayerIconUI;
		public LvLb:component.UILabel;
		public TitleLb:component.UILabel;
		public HookTimeLb:component.UILabel;
		public ExpProLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Common/QuickAward");

        }

    }
}

module ProUI.Common {
    export class ReplacementUI extends View {
		public des:component.UILabel;
		public selItem:Pro.NorItemUI;
		public closeBtn:component.UIButton;
		public title:component.UILabel;
		public cancelBtn:component.UIButton;
		public saveBtn:component.UIButton;
		public itemListView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);

            super.createChildren();
            this.loadUI("Common/Replacement");

        }

    }
}

module ProUI.Common {
    export class RewardPreviewUI extends Laya.Box {
		public CloseBtn:component.UIButton;
		public TitleLb:component.UILabel;
		public RewardBox:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Common/RewardPreview"], this, this);

        }

    }
}

module ProUI.Common {
    export class ShapeTitleAwardUI extends View {
		public aniPosImg:Laya.Image;
		public imgIcon:Laya.Image;
		public listAttr:component.UIList;
		public btnClose:component.UIButton;
		public btnGoto:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Common/ShapeTitleAward");

        }

    }
}

module ProUI.Common {
    export class TroopBuyItemUI extends Laya.Box {
		public TitleLb:component.UILabel;
		public ShowMsgBox:Laya.HBox;
		public ShowMsg1Lb:component.UILabel;
		public ShowMsgIconImg:Laya.Image;
		public ShowMsg2Lb:component.UILabel;
		public CancelBtn:component.UIButton;
		public SureBtn:component.UIButton;
		public DonPrompt:Pro.CheckButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.CheckButton",Pro.CheckButton);

            Laya.ClassUtils.createByJson(View.uiMap["Common/TroopBuyItem"], this, this);

        }

    }
}

module ProUI.Convenant {
    export class ConvenantUI extends View {
		public btnHelp:component.UIButton;
		public bottomTitle:Laya.Image;
		public txtBottomTitle:component.UILabel;
		public unlockTips:Laya.Box;
		public btnGo:component.UIButton;
		public imgReddotGo:Laya.Image;
		public txtBtnLable:component.UILabel;
		public listNeedItems:component.UIItemBox;
		public TipsLb:component.UILabel;
		public fullTag:Laya.Image;
		public btnArtifact:component.UIButton;
		public btnTotemsRecharge:component.UIButton;
		public btnTotemsReddot:Laya.Image;
		public txtTitle:component.UILabel;
		public fightValueBar:Laya.Image;
		public txtFightValue:component.UILabel;
		public itemListBox:Laya.Box;
		public tipsBubble:Laya.Image;
		public upAttrListUI:Pro.UpAttrListUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.Convenant.ItemUI",ProUI.Convenant.ItemUI);
			View.regComponent("Pro.UpAttrListUI",Pro.UpAttrListUI);

            super.createChildren();
            this.loadUI("Convenant/Convenant");

        }

    }
}

module ProUI.Convenant {
    export class ConvenantTipsUI extends View {
		public txtFightValue:component.UILabel;
		public imgIcon:component.UIFrameImage;
		public txtName:component.UILabel;
		public listItems:component.UIItemBox;
		public selectTips:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Convenant.TipsAttrItemUI",ProUI.Convenant.TipsAttrItemUI);

            super.createChildren();
            this.loadUI("Convenant/ConvenantTips");

        }

    }
}

module ProUI.Convenant {
    export class ItemUI extends component.UIButton {
		public icon:component.UIFrameImage;
		public reddot:Laya.Image;
		public imgNameBg:Laya.Image;
		public txtName:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Convenant/Item"], this, this);

        }

    }
}

module ProUI.Convenant {
    export class TipsAttrItemUI extends Laya.Box {
		public btn:component.UIButton;
		public imgSel:Laya.Image;
		public imgType:ProUI.Utils.BattleAttrTypeUI;
		public txtAttrName:component.UILabel;
		public txtAttrValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Convenant/TipsAttrItem"], this, this);

        }

    }
}

module ProUI.CrossChallenge {
    export class CrossChallengeAwardUI extends View {
		public ItemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.EndlessTower.Prize.ListItemUI",ProUI.EndlessTower.Prize.ListItemUI);

            super.createChildren();
            this.loadUI("CrossChallenge/CrossChallengeAward");

        }

    }
}

module ProUI.CrossChallenge {
    export class CrossChallengeEmbattleUI extends View {
		public EatCoverBox:Laya.Box;
		public prompt:component.UILabel;
		public HeroList:component.UIList;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;
		public tabGrpZhenfa:component.UITab;
		public buzhenBox:Laya.Box;
		public ZhenxingBtn:ProUI.Utils.ZhengxingItemUI;
		public ChangZhenfaBtn:component.UIButton;
		public ZhenfaImg:Laya.Image;
		public HeroStoryBGBox:component.UIItemBox;
		public HeroOnStory:component.UIItemBox;
		public HeroOnEff:Laya.Image;
		public ArtifactBtn:component.UIButton;
		public ArtifactIconImg:Laya.Image;
		public ArtifactStatueImg:Laya.Image;
		public imgArtifactReddot:Laya.Image;
		public ZhanliImg:Laya.Image;
		public ZhanliLb:component.UILabel;
		public ShowStatueLb:component.UILabel;
		public AutoStoreBtn:component.UIButton;
		public previewBox:Laya.Box;
		public previewList:component.UIItemBox;
		public StartBattleBtn:component.UIButton;
		public SaveZhenfaBtn:component.UIButton;
		public HeroDragEff:Pro.NorItemUI;
		public HeroDragEffMini:Pro.NorItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UITab",component.UITab);
			View.regComponent("ProUI.Utils.ZhengxingItemUI",ProUI.Utils.ZhengxingItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("ProUI.CrossChallenge.CrossChallengeEmbattlePreviewItemUI",ProUI.CrossChallenge.CrossChallengeEmbattlePreviewItemUI);

            super.createChildren();
            this.loadUI("CrossChallenge/CrossChallengeEmbattle");

        }

    }
}

module ProUI.CrossChallenge {
    export class CrossChallengeEmbattlePreviewItemUI extends View {
		public lblTeam:component.UILabel;
		public heroList:component.UIItemBox;
		public ZhenxingBtn:ProUI.Utils.ZhengxingItemUI;
		public ChangZhenfaBtn:component.UIButton;
		public ZhenfaImg:Laya.Image;
		public btnArtifact:component.UIButton;
		public ArtifactIconImg:Laya.Image;
		public ArtifactStatueImg:Laya.Image;
		public lblPowera:component.UILabel;
		public btnHide:component.UIButton;
		public imgHideFlag:Laya.Image;
		public btnChangeTeam:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.Utils.ZhengxingItemUI",ProUI.Utils.ZhengxingItemUI);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("CrossChallenge/CrossChallengeEmbattlePreviewItem");

        }

    }
}

module ProUI.CrossChallenge {
    export class CrossChallengeFightUI extends View {
		public enemy:Pro.PlayerIconUI;
		public lblEnemyName:component.UILabel;
		public lblEnemyLv:component.UILabel;
		public lblEnemyScore:component.UILabel;
		public myself:Pro.PlayerIconUI;
		public lblMyselfName:component.UILabel;
		public lblMyselfLv:component.UILabel;
		public lblMyselfScore:component.UILabel;
		public previewList:component.UIItemBox;
		public enemyList:component.UIItemBox;
		public btnEmbattle:component.UIButton;
		public btnChallenge:component.UIButton;
		public lblChallenge:component.UILabel;
		public imgIcon:Laya.Image;
		public btnSkip:component.UIButton;
		public imgFlag:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.CrossChallenge.CrossChallengeFightItemUI",ProUI.CrossChallenge.CrossChallengeFightItemUI);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("CrossChallenge/CrossChallengeFight");

        }

    }
}

module ProUI.CrossChallenge {
    export class CrossChallengeFightItemUI extends View {
		public heroList:component.UIItemBox;
		public btnChangeTeam:component.UIButton;
		public lblTeamName:component.UILabel;
		public lblPowera:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("CrossChallenge/CrossChallengeFightItem");

        }

    }
}

module ProUI.CrossChallenge {
    export class CrossChallengeMainUI extends View {
		public ChallengeBox:Laya.Box;
		public lblCount:component.UILabel;
		public imgItem:Laya.Image;
		public btnAdd:component.UIButton;
		public btnRefresh:component.UIButton;
		public btnRecord:component.UIButton;
		public btnDefence:component.UIButton;
		public lblRank:component.UILabel;
		public lblScore:component.UILabel;
		public lblTimeDesc:component.UILabel;
		public lblEndTime:component.UILabel;
		public proBg:Laya.Image;
		public awardPro:Laya.Image;
		public lblAwardCount:component.UILabel;
		public awardBox:Laya.Box;
		public challengeAvatar:Laya.Box;
		public HonourBox:Laya.Box;
		public lblHonourRank:component.UILabel;
		public lblHistoryRank:component.UILabel;
		public awardPreview:Laya.Box;
		public prizeList:component.UIItemBox;
		public honourAvatar:Laya.Box;
		public btnChallenge:component.UIButton;
		public maskChallenge:Laya.Image;
		public challengeRed:Laya.Image;
		public btnHonour:component.UIButton;
		public maskHonour:Laya.Image;
		public honourRed:Laya.Image;
		public btnRank:component.UIButton;
		public btnRankAward:component.UIButton;
		public btnSwShop:component.UIButton;
		public btnHelp:component.UIButton;
		public closeBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.CrossChallenge.CrossChallengeSpineItemUI",ProUI.CrossChallenge.CrossChallengeSpineItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("CrossChallenge/CrossChallengeMain");

        }

    }
}

module ProUI.CrossChallenge {
    export class CrossChallengeResultUI extends View {
		public boxWin:Laya.Box;
		public boxWinImg:Laya.Image;
		public boxLose:Laya.Box;
		public imgIconSelf:Laya.Image;
		public imgIconTar:Laya.Image;
		public imgChangeSelf:component.UIFrameImage;
		public imgChangeTar:component.UIFrameImage;
		public txtNicknameSelf:component.UILabel;
		public txtRankSelf:component.UILabel;
		public txtNicknameTar:component.UILabel;
		public txtRankTar:component.UILabel;
		public btnHitDetail:component.UIButton;
		public btnOk:component.UIButton;
		public card1:Laya.Image;
		public award1:Pro.NorItemUI;
		public imgGet1:Laya.Image;
		public btnSelect1:component.UIButton;
		public lblPrice1:component.UILabel;
		public card2:Laya.Image;
		public award2:Pro.NorItemUI;
		public imgGet2:Laya.Image;
		public btnSelect2:component.UIButton;
		public lblPrice2:component.UILabel;
		public card3:Laya.Image;
		public award3:Pro.NorItemUI;
		public imgGet3:Laya.Image;
		public btnSelect3:component.UIButton;
		public lblPrice3:component.UILabel;
		public btnCrossChallenge:component.UIButton;
		public lblSelfChange:component.UILabel;
		public lblTarChange:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("CrossChallenge/CrossChallengeResult");

        }

    }
}

module ProUI.CrossChallenge {
    export class CrossChallengeSpineItemUI extends Laya.Box {
		public bg:Laya.Image;
		public topBox:Laya.Box;
		public txtNickname:component.UILabel;
		public imgRank:Laya.Image;
		public imgTitle:Laya.Image;
		public lblScore:component.UILabel;
		public btnWorship:component.UIButton;
		public icon:Laya.Image;
		public txtWorshipCount:component.UILabel;
		public avatar:Laya.Box;
		public imgPower:Laya.Image;
		public lblPower:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["CrossChallenge/CrossChallengeSpineItem"], this, this);

        }

    }
}

module ProUI.Dan.ChildItemView {
    export class HistroyRoleViewUI extends Laya.Box {
		public spHeroAvatar:Laya.Box;
		public imgTitle:Laya.Image;
		public boxFightValue:Laya.Image;
		public txtFightValue:component.UILabel;
		public txtNickname:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Dan/ChildItemView/HistroyRoleView"], this, this);

        }

    }
}

module ProUI.Dan.ChildItemView {
    export class RewardPreviewItemUI extends Laya.Box {
		public norItemListView:component.UIItemBox;
		public imgIcon:Laya.Image;
		public txtName:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Dan/ChildItemView/RewardPreviewItem"], this, this);

        }

    }
}

module ProUI.Dan.ChildItemView {
    export class SelectAreaItemViewUI extends Laya.Box {
		public imgIcon:Laya.Image;
		public txtName:component.UILabel;
		public btnSel:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Dan/ChildItemView/SelectAreaItemView"], this, this);

        }

    }
}

module ProUI.Dan {
    export class DanExploitsUI extends View {
		public btnLeft:component.UIButton;
		public btnRight:component.UIButton;
		public tabGrp:Pro.UITabExtend;
		public txtTarFightValue1:component.UILabel;
		public txtSeason:component.UILabel;
		public txtCurDan:component.UILabel;
		public txtTarFightValue2:component.UILabel;
		public txtMaxDan:component.UILabel;
		public txtNormalWinCount:component.UILabel;
		public txtNormalWinPercent:component.UILabel;
		public txtMaxHit:component.UILabel;
		public txtCurScore:component.UILabel;
		public txtMaxScore:component.UILabel;
		public txtKingWinCount:component.UILabel;
		public txtKingWinPercent:component.UILabel;
		public txtMaxSeriesWin:component.UILabel;
		public txtHeroName:component.UILabel;
		public txtTarNickname:component.UILabel;
		public norItemHero:Pro.NorItemUI;
		public playerIconTar:Pro.PlayerIconUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);

            super.createChildren();
            this.loadUI("Dan/DanExploits");

        }

    }
}

module ProUI.Dan {
    export class DanHistroyUI extends View {
		public playerNodes:Laya.Box;
		public btnShowArea:component.UIButton;
		public btnLeft:component.UIButton;
		public btnRight:component.UIButton;
		public txtTitle:component.UILabel;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ProUI.Dan.ChildItemView.HistroyRoleViewUI",ProUI.Dan.ChildItemView.HistroyRoleViewUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Dan/DanHistroy");

        }

    }
}

module ProUI.Dan {
    export class DanMainUI extends View {
		public imgDanTypeIcon:Laya.Image;
		public imgDanTextIcon:Laya.Image;
		public txtTimeTitle:component.UILabel;
		public txtTime:component.UILabel;
		public txtNextSeasonTips:component.UILabel;
		public txtMyRank:component.UILabel;
		public boxKingView:Laya.Box;
		public txtKingNoOpen:component.UILabel;
		public btnKingToNormal:component.UIButton;
		public boxUpgrade:Laya.Box;
		public txtNextDanName:component.UILabel;
		public txtUpgradeCondition:component.UILabel;
		public listUpgradeWinCount:component.UIItemBox;
		public boxUpgradeProgress:Laya.Box;
		public progressGreen:Laya.Image;
		public progressBlue:Laya.Image;
		public txtProgressValue:component.UILabel;
		public boxTopReward:Laya.Box;
		public btnTopFirstReward:component.UIButton;
		public htmlRewardTips:component.UIHtmlText;
		public listRewards:component.UIItemBox;
		public boxMatchView:Laya.Box;
		public btnBuyCount:component.UIButton;
		public btnMatch:component.UIButton;
		public txtMatchBuyCount:component.UILabel;
		public txtMatchCount:component.UILabel;
		public btnClose:component.UIButton;
		public tabBox:Laya.Box;
		public btnKing:component.UIButton;
		public btnNormal:component.UIButton;
		public leftBtns:Laya.VBox;
		public btnHelp:component.UIButton;
		public btnEmbattle:component.UIButton;
		public btnDanHelp:component.UIButton;
		public btnExploits:component.UIButton;
		public btnFaceSetting:component.UIButton;
		public rightBtns:Laya.VBox;
		public btnHistoryToplist:component.UIButton;
		public btnRecord:component.UIButton;
		public btnShop:component.UIButton;
		public btnReward:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Dan/DanMain");

        }

    }
}

module ProUI.Dan {
    export class DanMatchUI extends View {
		public imgHalfShape:Laya.Image;
		public btnClose:component.UIButton;
		public btnAddCount:component.UIButton;
		public txtMatchBuyCount:component.UILabel;
		public txtMatchCount:component.UILabel;
		public titleNormal:Laya.Box;
		public titleKing:Laya.Box;
		public txtType:component.UILabel;
		public txtCountdownSuffix:component.UILabel;
		public imgEmbattle:Laya.Image;
		public txtFightValue:component.UILabel;
		public imgDanIcon:Laya.Image;
		public imgFrameSex:component.UIFrameImage;
		public listHeros:component.UIItemBox;
		public txtNickname:component.UILabel;
		public txtDanName:component.UILabel;
		public tarInfoLeft:Laya.Box;
		public imgHalfShapeTar:Laya.Image;
		public imgDanIconTar:Laya.Image;
		public txtDanNameTar:component.UILabel;
		public tarInfoRight:Laya.Box;
		public imgEmbattleTar:Laya.Image;
		public txtFightValueTar:component.UILabel;
		public imgFrameSexTar:component.UIFrameImage;
		public listHerosTar:component.UIItemBox;
		public txtNicknameTar:component.UILabel;
		public imgEmpty:Laya.Image;
		public matchingEffect:component.UILabel;
		public imgVS:Laya.Image;
		public txtCountdown:component.UILabel;
		public btnEmbattle:component.UIButton;
		public btnStart:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Dan/DanMatch");

        }

    }
}

module ProUI.Dan {
    export class DanRewardPreviewUI extends View {
		public btnClose:component.UIButton;
		public txtDes:component.UILabel;
		public txtCurDan:component.UILabel;
		public tabGrp:Pro.UITabExtend;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Dan.ChildItemView.RewardPreviewItemUI",ProUI.Dan.ChildItemView.RewardPreviewItemUI);

            super.createChildren();
            this.loadUI("Dan/DanRewardPreview");

        }

    }
}

module ProUI.Dan {
    export class DanSelectAreaUI extends View {
		public btnClose:component.UIButton;
		public txtDes:component.UILabel;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Dan.ChildItemView.SelectAreaItemViewUI",ProUI.Dan.ChildItemView.SelectAreaItemViewUI);

            super.createChildren();
            this.loadUI("Dan/DanSelectArea");

        }

    }
}

module ProUI.DragonBall.ChildView {
    export class AttrItemUI extends Laya.Box {
		public imgType:ProUI.Utils.BattleAttrTypeUI;
		public txtName:component.UILabel;
		public txtValue:component.UILabel;
		public txtUnlockTips:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["DragonBall/ChildView/AttrItem"], this, this);

        }

    }
}

module ProUI.DragonBall.ChildView {
    export class BallItemUI extends component.UIButton {
		public icon:component.UIFrameImage;
		public effNode:Laya.Box;
		public reddot:Laya.Image;
		public txtLeve:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["DragonBall/ChildView/BallItem"], this, this);

        }

    }
}

module ProUI.DragonBall.ChildView {
    export class UpAttrItemUI extends Laya.Box {
		public imgType:ProUI.Utils.BattleAttrTypeUI;
		public txtValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["DragonBall/ChildView/UpAttrItem"], this, this);

        }

    }
}

module ProUI.DragonBall {
    export class DragonBallUI extends View {
		public bgEffNode:Laya.Box;
		public btnClose:component.UIButton;
		public btnHelp:component.UIButton;
		public ballItemBox:Laya.Box;
		public listAttrBox:component.UIItemBox;
		public bosSevenAttr:Laya.Box;
		public listSevenAttrs:component.UIItemBox;
		public txtUnlockTips:component.UILabel;
		public dragonGiftBtn:component.UIButton;
		public reddot:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.DragonBall.ChildView.BallItemUI",ProUI.DragonBall.ChildView.BallItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.DragonBall.ChildView.AttrItemUI",ProUI.DragonBall.ChildView.AttrItemUI);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);

            super.createChildren();
            this.loadUI("DragonBall/DragonBall");

        }

    }
}

module ProUI.DragonBall {
    export class UpLevelUI extends View {
		public btnClose:component.UIButton;
		public imgIcon:component.UIFrameImage;
		public txtName:component.UILabel;
		public txtLevel:component.UILabel;
		public txtCurAttr:component.UILabel;
		public txtCurAttr2:component.UILabel;
		public nextUpBox:Laya.Box;
		public listNextAttr:component.UIItemBox;
		public tipsSevenNoUp:Laya.Image;
		public btnUp:component.UIButton;
		public reddotUp:Laya.Image;
		public txtBtnUpLabel:component.UILabel;
		public needItemBox:Laya.Image;
		public imgNeedItemIcon:Laya.Image;
		public txtNeedItemCount:component.UILabel;
		public fullBox:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.DragonBall.ChildView.UpAttrItemUI",ProUI.DragonBall.ChildView.UpAttrItemUI);

            super.createChildren();
            this.loadUI("DragonBall/UpLevel");

        }

    }
}

module ProUI.EggHatch {
    export class EggHatchAddSpeedViewUI extends View {
		public btn_close:component.UIButton;
		public img_pro:Laya.Image;
		public lbl_progress:component.UILabel;
		public list_item:component.UIList;
		public lbl_speed:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.EggHatchAddSpeedItem",Pro.EggHatchAddSpeedItem);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("EggHatch/EggHatchAddSpeedView");

        }

    }
}

module ProUI.EggHatch {
    export class EggHatchMainViewUI extends View {
		public btn_close:component.UIButton;
		public btn_addSpeed:component.UIButton;
		public btn_cancel:component.UIButton;
		public btn_activity:component.UIButton;
		public btn_choice:component.UIButton;
		public img_pro:Laya.Image;
		public lbl_progress:component.UILabel;
		public btn_help:component.UIButton;
		public img_add:Laya.Image;
		public lbl_title:component.UILabel;
		public lbl_speed:component.UIHtmlText;
		public RedDotImg_group:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("EggHatch/EggHatchMainView");

        }

    }
}

module ProUI.EggHatch {
    export class EggHatchSelectViewUI extends View {
		public btn_close:component.UIButton;
		public costBox:ProUI.Utils.LongTroopItemUI;
		public HeroItemList:component.UIList;
		public btn_save:component.UIButton;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Utils.LongTroopItemUI",ProUI.Utils.LongTroopItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.EggHatch.item.EggHatchChoiceItemViewUI",ProUI.EggHatch.item.EggHatchChoiceItemViewUI);
			View.regComponent("UIItemBox",component.UIItemBox);

            super.createChildren();
            this.loadUI("EggHatch/EggHatchSelectView");

        }

    }
}

module ProUI.EggHatch {
    export class EggHatchSuccedViewUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("EggHatch/EggHatchSuccedView");

        }

    }
}

module ProUI.EggHatch.item {
    export class EggHatchAddSpeedItemViewUI extends View {
		public item:Pro.NorItemUI;
		public lbl_des:component.UILabel;
		public lbl_remain:component.UILabel;
		public btn_use:component.UIButton;
		public btn_used:component.UIButton;
		public btn_time:component.UIButton;
		public lbl_remainTime:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("EggHatch/item/EggHatchAddSpeedItemView");

        }

    }
}

module ProUI.EggHatch.item {
    export class EggHatchChoiceItemViewUI extends View {
		public norItem:Pro.NorItemUI;
		public newItem:ProUI.Utils.LongTroopItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.Utils.LongTroopItemUI",ProUI.Utils.LongTroopItemUI);

            super.createChildren();
            this.loadUI("EggHatch/item/EggHatchChoiceItemView");

        }

    }
}

module ProUI.Element.Detail {
    export class ListItemUI extends Laya.Box {
		public LockImg:Laya.Image;
		public FirstPassImg:Laya.Image;
		public RewardBox:component.UIItemBox;
		public FunBtn:component.UIButton;
		public NeedBuyBox:Laya.HBox;
		public NeedBuyImg:Laya.Image;
		public NeedBuyLb:component.UILabel;
		public NeedBuyTitleLb:component.UILabel;
		public FunLb:component.UILabel;
		public NameLb:component.UIBitmapText;
		public PowerLb:component.UILabel;
		public LockInfoLb:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Element/Detail/ListItem"], this, this);

        }

    }
}

module ProUI.Element.Detail {
    export class MainUI extends View {
		public CloseBtn:component.UIButton;
		public img_boss:component.UIFrameImage;
		public img_nameBG:component.UIFrameImage;
		public BuyTimesInfo:Pro.FightBuyTimes;
		public ItemList:component.UIList;
		public SkillBox:component.UIItemBox;
		public BossNameLb:component.UILabel;
		public KezhiInfoLb:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.FightBuyTimes",Pro.FightBuyTimes);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Element.Detail.ListItemUI",ProUI.Element.Detail.ListItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Element/Detail/Main");

        }

    }
}

module ProUI.Element {
    export class MainUI extends View {
		public RankBtn:component.UIButton;
		public HelpBtn:component.UIButton;
		public CloseBtn:component.UIButton;
		public BuyTimesInfo:Pro.FightBuyTimes;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Element.OpenTimeItemUI",ProUI.Element.OpenTimeItemUI);
			View.regComponent("Pro.FightBuyTimes",Pro.FightBuyTimes);

            super.createChildren();
            this.loadUI("Element/Main");

        }

    }
}

module ProUI.Element {
    export class OpenTimeItemUI extends component.UIButton {
		public frameBg:component.UIFrameImage;
		public frameHeadIconBg:component.UIFrameImage;
		public BossIconImg:Laya.Image;
		public NameLb:component.UILabel;
		public TimeTipsLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Element/OpenTimeItem"], this, this);

        }

    }
}

module ProUI.Embattle {
    export class ArtifactChoiceUI extends Laya.Box {
		public btnClose:component.UIButton;
		public ItemList:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Embattle.ArtifactItemUI",ProUI.Embattle.ArtifactItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Embattle/ArtifactChoice"], this, this);

        }

    }
}

module ProUI.Embattle {
    export class ArtifactItemUI extends Laya.Box {
		public DesBtn:component.UIButton;
		public FunBtn:component.UIButton;
		public FunLb:component.UILabel;
		public imgIcon:Laya.Image;
		public imgLock:Laya.Image;
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;
		public LockLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Embattle/ArtifactItem"], this, this);

        }

    }
}

module ProUI.Embattle {
    export class MainUI extends View {
		public EatCoverBox:Laya.Box;
		public prompt:component.UILabel;
		public HeroList:component.UIList;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;
		public ZhenxingBtn:ProUI.Utils.ZhengxingItemUI;
		public ChangZhenfaBtn:component.UIButton;
		public ZhenfaImg:Laya.Image;
		public HeroStoryBGBox:component.UIItemBox;
		public HeroOnStory:component.UIItemBox;
		public HeroOnEff:Laya.Image;
		public tabGrpZhenfa:component.UITab;
		public AutoStoreBtn:component.UIButton;
		public SaveZhenfaBtn:component.UIButton;
		public StartBattleBtn:component.UIButton;
		public ArtifactBtn:component.UIButton;
		public ArtifactIconImg:Laya.Image;
		public ArtifactStatueImg:Laya.Image;
		public imgArtifactReddot:Laya.Image;
		public ZhanliImg:Laya.Image;
		public ZhanliLb:component.UILabel;
		public ShowStatueLb:component.UILabel;
		public HeroDragEff:Pro.NorItemUI;
		public itemBox_defend:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Utils.ZhengxingItemUI",ProUI.Utils.ZhengxingItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UITab",component.UITab);
			View.regComponent("Pro.HeroDefendLocationSetItem",Pro.HeroDefendLocationSetItem);

            super.createChildren();
            this.loadUI("Embattle/Main");

        }

    }
}

module ProUI.Embattle {
    export class ZhenxingChangeUI extends Laya.Box {
		public CloseBtn:component.UIButton;
		public ItemList:component.UIList;
		public ItemSelectImg:Laya.Image;
		public ItemDefaultBox:Laya.Box;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Embattle.ZhenxingItemUI",ProUI.Embattle.ZhenxingItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Embattle/ZhenxingChange"], this, this);

        }

    }
}

module ProUI.Embattle {
    export class ZhenxingItemUI extends component.UIButton {
		public IconImg:Laya.Image;
		public LockImg:Laya.Image;
		public LockLb:component.UILabel;
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Embattle/ZhenxingItem"], this, this);

        }

    }
}

module ProUI.EndlessTower.ChoiceBuff {
    export class BuffItemUI extends Laya.Box {
		public IconImg:Laya.Image;
		public SureBtn:component.UIButton;
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["EndlessTower/ChoiceBuff/BuffItem"], this, this);

        }

    }
}

module ProUI.EndlessTower.ChoiceBuff {
    export class MainUI extends View {
		public ZhenXingImg:Laya.Image;
		public ZhenXingLb:component.UILabel;
		public FIghtStageLb:component.UILabel;
		public StorePetBox:component.UIItemBox;
		public BuffBox:component.UIItemBox;
		public autoBtn:component.UIButton;
		public autoImg:Laya.Image;
		public autoLbl:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.EndlessTower.ChoiceBuff.BuffItemUI",ProUI.EndlessTower.ChoiceBuff.BuffItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("EndlessTower/ChoiceBuff/Main");

        }

    }
}

module ProUI.EndlessTower {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public RewardShowBtn:component.UIButton;
		public RewardShowBox:component.UIItemBox;
		public HelpBtn:component.UIButton;
		public RankItemBtn:component.UIButton;
		public RankItemBox:component.UIItemBox;
		public RankRewardLb:component.UILabel;
		public MyRankLb:component.UILabel;
		public RankRewardList:component.UIItemBox;
		public PassRewardBtn:component.UIButton;
		public PassRewardBox:component.UIItemBox;
		public PassStageCountLb:component.UILabel;
		public PassStageCountTitleLb:component.UILabel;
		public FirstPassLb:component.UILabel;
		public MyOldRankLb:component.UIBitmapText;
		public FriendBtn:component.UIButton;
		public FightBtn:component.UIButton;
		public FightLb:component.UILabel;
		public FightStartLb:component.UILabel;
		public FightTodayPassLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.EndlessTower.RankItemUI",ProUI.EndlessTower.RankItemUI);
			View.regComponent("UIBitmapText",component.UIBitmapText);

            super.createChildren();
            this.loadUI("EndlessTower/Main");

        }

    }
}

module ProUI.EndlessTower.Prize {
    export class ListItemUI extends Laya.Box {
		public RewardBox:component.UIItemBox;
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["EndlessTower/Prize/ListItem"], this, this);

        }

    }
}

module ProUI.EndlessTower.Prize {
    export class MainUI extends View {
		public ItemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.EndlessTower.Prize.ListItemUI",ProUI.EndlessTower.Prize.ListItemUI);

            super.createChildren();
            this.loadUI("EndlessTower/Prize/Main");

        }

    }
}

module ProUI.EndlessTower {
    export class RankItemUI extends Laya.Box {
		public IconImg:component.UIFrameImage;
		public NameLb:component.UILabel;
		public StageLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["EndlessTower/RankItem"], this, this);

        }

    }
}

module ProUI.evolution {
    export class EvolutionEffectUpViewUI extends View {
		public footboard:Laya.Image;
		public imgVDraw:Laya.Image;
		public imgBorderFrame:component.UIFrameImage;
		public StarBox:Pro.StarIconBox;
		public imgPetType:component.UIFrameImage;
		public TipsImg:Laya.Image;
		public txtName:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("evolution/EvolutionEffectUpView");

        }

    }
}

module ProUI.evolution {
    export class EvolutionMainViewUI extends View {
		public btn_close:component.UIButton;
		public btn_evolution:component.UIButton;
		public btn_evolution_label:component.UILabel;
		public list:component.UIList;
		public btn_check:component.UIButton;
		public needItemBox:Laya.Box;
		public image_need_good:Laya.Image;
		public label_need_good:component.UILabel;
		public roleList:component.UIList;
		public btn_left:component.UIButton;
		public btn_right:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.EvolutionMainViewItem",Pro.EvolutionMainViewItem);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("Pro.EvolutionMainViewSkelItem",Pro.EvolutionMainViewSkelItem);

            super.createChildren();
            this.loadUI("evolution/EvolutionMainView");

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionApplyItemViewUI extends Laya.Box {
		public viewPlayerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public txtOnline:component.UILabel;
		public btnIgnore:component.UIButton;
		public btnAccept:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionApplyItemView"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionBossTabViewUI extends Laya.Box {
		public btn:component.UIButton;
		public imgIcon:Laya.Image;
		public imgLight:Laya.Image;
		public txtName:component.UILabel;
		public imgLock:Laya.Image;
		public imgPass:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionBossTabView"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionDonateItemUI extends Laya.Image {
		public imgIcon:component.UIFrameImage;
		public txtAddContri:component.UILabel;
		public txtAddExp:component.UILabel;
		public txtDes:component.UILabel;
		public imgNeed:Laya.Image;
		public txtNeed:component.UILabel;
		public btnDonate:component.UIButton;
		public btnNoCan:component.UIButton;
		public imgHave:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionDonateItem"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionListCreaterViewUI extends Laya.Box {
		public btnNeedLvRight:component.UIButton;
		public btnNeedLvLeft:component.UIButton;
		public btnVerifyRight:component.UIButton;
		public btnVerifyLeft:component.UIButton;
		public btnCreate:component.UIButton;
		public txtCreateNeedDiamond:component.UILabel;
		public txtCreateVerify:component.UILabel;
		public txtCreateNeedLv:component.UILabel;
		public txtCreateNeedVip:component.UILabel;
		public inputFactionContent:Laya.TextInput;
		public inputFactionName:Laya.TextInput;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionListCreaterView"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionListItemViewUI extends Laya.Box {
		public btnNoCondition:component.UIButton;
		public btnEnter:component.UIButton;
		public txtFactionName:component.UILabel;
		public txtNickname:component.UILabel;
		public txtCount:component.UILabel;
		public txtLv:component.UILabel;
		public txtCondition:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionListItemView"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionListListViewUI extends Laya.Box {
		public chkBoxOnlyUnder:Pro.CheckButton;
		public listViewFactionList:component.UIList;
		public imgListEmpty:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.CheckButton",Pro.CheckButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Faction.ChildView.FactionListItemViewUI",ProUI.Faction.ChildView.FactionListItemViewUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionListListView"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionListSearchViewUI extends Laya.Box {
		public childViewSearch:Laya.Box;
		public inputSearch:Laya.TextInput;
		public btnSearch:component.UIButton;
		public searchResultView:Laya.Box;
		public listViewSearchResult:component.UIList;
		public imgSearchEmpty:Laya.Image;
		public btnBackSearch:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Faction.ChildView.FactionListItemViewUI",ProUI.Faction.ChildView.FactionListItemViewUI);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionListSearchView"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionLivenessItemViewUI extends Laya.Box {
		public imgHasBeen:Laya.Image;
		public imgType:component.UIFrameImage;
		public btnGoto:component.UIButton;
		public txtName:component.UILabel;
		public txtCount:component.UILabel;
		public txtLiveness:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionLivenessItemView"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionLivenessRewardItemViewUI extends Laya.Box {
		public norItemListView:component.UIItemBox;
		public htmlContent:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionLivenessRewardItemView"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionLogTableCellUI extends Laya.Box {
		public htmlContent:component.UIHtmlText;
		public txtTime:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionLogTableCell"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionLogTableHeadUI extends Laya.Box {
		public txtDay:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionLogTableHead"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionMemberListItemViewUI extends Laya.Box {
		public back1:Laya.Image;
		public back2:Laya.Image;
		public viewPlayerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public txtOnlineTime:component.UILabel;
		public txtJob:component.UILabel;
		public txtQuestLv:component.UILabel;
		public txtTodayDonate:component.UILabel;
		public txtDonate:component.UILabel;
		public btnOperate:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionMemberListItemView"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionRankItemViewUI extends Laya.Box {
		public background1:Laya.Image;
		public imgFrameRank:component.UIFrameImage;
		public txtFactionName:component.UILabel;
		public txtChairmanName:component.UILabel;
		public txtLv:component.UILabel;
		public txtMember:component.UILabel;
		public txtFightValue:component.UILabel;
		public txtRank:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionRankItemView"], this, this);

        }

    }
}

module ProUI.Faction.ChildView {
    export class FactionSkillItemUI extends Laya.Box {
		public imgIcon:Laya.Image;
		public imgLight:Laya.Image;
		public txtLv:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Faction/ChildView/FactionSkillItem"], this, this);

        }

    }
}

module ProUI.Faction {
    export class FactionApplyListUI extends View {
		public btnClose:component.UIButton;
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Faction.ChildView.FactionApplyItemViewUI",ProUI.Faction.ChildView.FactionApplyItemViewUI);

            super.createChildren();
            this.loadUI("Faction/FactionApplyList");

        }

    }
}

module ProUI.Faction {
    export class FactionBossUI extends View {
		public btnClose:component.UIButton;
		public imgBg:Laya.Image;
		public btnHelp:component.UIButton;
		public btnAddCount:component.UIButton;
		public btnAddBuff:component.UIButton;
		public txtAddBuff:component.UILabel;
		public txtBuffTimer:component.UILabel;
		public btnAddBuffImg:component.UIButton;
		public btnRankReward:component.UIButton;
		public btnAssembly:component.UIButton;
		public txtBossTitle:component.UILabel;
		public txtCanBuyCount:component.UILabel;
		public txtCount:component.UILabel;
		public btnWatchDamage:component.UIButton;
		public txtDamageName1:component.UILabel;
		public txtDamageValue1:component.UILabel;
		public txtDamageName2:component.UILabel;
		public txtDamageValue2:component.UILabel;
		public txtDamageName3:component.UILabel;
		public txtDamageValue3:component.UILabel;
		public imgBossAvatar:Laya.Image;
		public viewBossInfo:Laya.Box;
		public imgProgressMask:Laya.Image;
		public imgBossIcon:Laya.Image;
		public txtBossName:component.UILabel;
		public txtBossProgress:component.UILabel;
		public imgKill:Laya.Image;
		public btnSweep:component.UIButton;
		public imgReddot:Laya.Image;
		public btnAttack:component.UIButton;
		public norItemViewDamage:component.UIItemBox;
		public norItemViewKill:component.UIItemBox;
		public listTabView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Faction.ChildView.FactionBossTabViewUI",ProUI.Faction.ChildView.FactionBossTabViewUI);

            super.createChildren();
            this.loadUI("Faction/FactionBoss");

        }

    }
}

module ProUI.Faction {
    export class FactionBossRankRewardUI extends View {
		public btnClose:component.UIButton;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.RankRewardPreviewUI",Pro.RankRewardPreviewUI);

            super.createChildren();
            this.loadUI("Faction/FactionBossRankReward");

        }

    }
}

module ProUI.Faction {
    export class FactionDonateUI extends View {
		public btnClose:component.UIButton;
		public imgProgress:Laya.Image;
		public btnHelp:component.UIButton;
		public txtLv:component.UILabel;
		public txtNextTips:component.UILabel;
		public txtTodayCount:component.UILabel;
		public listView:component.UIItemBox;
		public listProgressBox:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Faction.ChildView.FactionDonateItemUI",ProUI.Faction.ChildView.FactionDonateItemUI);
			View.regComponent("Pro.ProgressChestItemUI",Pro.ProgressChestItemUI);

            super.createChildren();
            this.loadUI("Faction/FactionDonate");

        }

    }
}

module ProUI.Faction {
    export class FactionDonateRewardUI extends View {
		public btnClose:component.UIButton;
		public btnOk:component.UIButton;
		public listPrize:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Faction/FactionDonateReward");

        }

    }
}

module ProUI.Faction {
    export class FactionEditNoticeUI extends View {
		public btnClose:component.UIButton;
		public btnOk:component.UIButton;
		public inputContent:Laya.TextInput;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Faction/FactionEditNotice");

        }

    }
}

module ProUI.Faction {
    export class FactionIssueRecruitUI extends View {
		public viewFee:Laya.Box;
		public txtNeedCount2:component.UILabel;
		public hboxDes:Laya.HBox;
		public txtNeedCount:component.UILabel;
		public viewFree:Laya.Box;
		public btnCancel:component.UIButton;
		public btnConfirm:component.UIButton;
		public txtLeftCount:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Faction/FactionIssueRecruit");

        }

    }
}

module ProUI.Faction {
    export class FactionListUI extends View {
		public aniPos:Laya.Image;
		public tabGrp:component.UITab;
		public pageViewContainer:Pro.TableBarContiner;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Faction/FactionList");

        }

    }
}

module ProUI.Faction {
    export class FactionLivenessUI extends View {
		public btnClose:component.UIButton;
		public imgExpProgress:Laya.Image;
		public viewCurAttr1:Laya.Box;
		public viewCurAttr2:Laya.Box;
		public viewNextAttr1:Laya.Box;
		public viewNextAttr2:Laya.Box;
		public btnRewardPreview:component.UIButton;
		public txtAttrEmpty:component.UILabel;
		public txtLv:component.UILabel;
		public txtLevelTips:component.UILabel;
		public txtExp:component.UILabel;
		public htmlLivenessValue:component.UIHtmlText;
		public listView:component.UIList;
		public noritemListView:component.UIItemBox;
		public btnGetReward:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Faction.ChildView.FactionLivenessItemViewUI",ProUI.Faction.ChildView.FactionLivenessItemViewUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Faction/FactionLiveness");

        }

    }
}

module ProUI.Faction {
    export class FactionLivenessRewardUI extends View {
		public btnClose:component.UIButton;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Faction.ChildView.FactionLivenessRewardItemViewUI",ProUI.Faction.ChildView.FactionLivenessRewardItemViewUI);

            super.createChildren();
            this.loadUI("Faction/FactionLivenessReward");

        }

    }
}

module ProUI.Faction {
    export class FactionLogUI extends View {
		public btnClose:component.UIButton;
		public imgEmpty:Laya.Image;
		public tableView:component.UITableView;
		public htmlTemplate:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UITableView",component.UITableView);
			View.regComponent("ProUI.Faction.ChildView.FactionLogTableHeadUI",ProUI.Faction.ChildView.FactionLogTableHeadUI);
			View.regComponent("ProUI.Faction.ChildView.FactionLogTableCellUI",ProUI.Faction.ChildView.FactionLogTableCellUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Faction/FactionLog");

        }

    }
}

module ProUI.Faction {
    export class FactionMainUI extends View {
		public btnRename:component.UIButton;
		public btnEditNotice:component.UIButton;
		public btnCopymap:component.UIButton;
		public btnSkill:component.UIButton;
		public btnWar:component.UIButton;
		public btnLiveness:component.UIButton;
		public btnRecruit:component.UIButton;
		public btnLog:component.UIButton;
		public btnMember:component.UIButton;
		public btnSetting:component.UIButton;
		public btnShop:component.UIButton;
		public btnRedPacket:component.UIButton;
		public btnDonate:component.UIButton;
		public btnRank:component.UIButton;
		public txtContent:component.UILabel;
		public txtFactionName:component.UILabel;
		public txtChair:component.UILabel;
		public txtLv:component.UILabel;
		public txtExp:component.UILabel;
		public txtMemberCount:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Faction/FactionMain");

        }

    }
}

module ProUI.Faction {
    export class FactionMembersUI extends View {
		public btnHelp:component.UIButton;
		public btnClose:component.UIButton;
		public txtCount:component.UILabel;
		public txtLeaderTip:component.UILabel;
		public listView:component.UIList;
		public btnWatchApply:component.UIButton;
		public reddotApply:Laya.Image;
		public btnExit:component.UIButton;
		public txtExitLabel:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Faction.ChildView.FactionMemberListItemViewUI",ProUI.Faction.ChildView.FactionMemberListItemViewUI);

            super.createChildren();
            this.loadUI("Faction/FactionMembers");

        }

    }
}

module ProUI.Faction {
    export class FactionOpMemberUI extends View {
		public btnClose:component.UIButton;
		public txtConten:component.UIHtmlText;
		public btnDemotion:component.UIButton;
		public btnRemove:component.UIButton;
		public btnAppoint:component.UIButton;
		public btnTransfer:component.UIButton;
		public btnImpeachmentPresident:component.UIButton;
		public consume:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Faction/FactionOpMember");

        }

    }
}

module ProUI.Faction {
    export class FactionRankUI extends View {
		public txtTitle:component.UILabel;
		public viewPlayerIconTop1:Pro.PlayerIconUI;
		public viewPlayerIconTop2:Pro.PlayerIconUI;
		public viewPlayerIconTop3:Pro.PlayerIconUI;
		public imgEmpty:Laya.Image;
		public hboxListHeader:Laya.HBox;
		public txtTopNickname1:component.UILabel;
		public txtTopNickname2:component.UILabel;
		public txtTopNickname3:component.UILabel;
		public listView:component.UIList;
		public selfview:ProUI.Faction.ChildView.FactionRankItemViewUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Faction.ChildView.FactionRankItemViewUI",ProUI.Faction.ChildView.FactionRankItemViewUI);

            super.createChildren();
            this.loadUI("Faction/FactionRank");

        }

    }
}

module ProUI.Faction {
    export class FactionRenameUI extends View {
		public btnClose:component.UIButton;
		public btnOk:component.UIButton;
		public txtNeedDiamond:component.UILabel;
		public inputName:Laya.TextInput;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Faction/FactionRename");

        }

    }
}

module ProUI.Faction {
    export class FactionSettingUI extends View {
		public btnClose:component.UIButton;
		public btnNeedLvRight:component.UIButton;
		public btnNeedLvLeft:component.UIButton;
		public btnVerifyRight:component.UIButton;
		public btnVerifyLeft:component.UIButton;
		public btnOk:component.UIButton;
		public txtCreateVerify:component.UILabel;
		public txtCreateNeedLv:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Faction/FactionSetting");

        }

    }
}

module ProUI.Faction {
    export class FactionSkillUI extends View {
		public btnHelp:component.UIButton;
		public btnClose:component.UIButton;
		public btnIllume:component.UIButton;
		public btnReset:component.UIButton;
		public attrList:component.UIItemBox;
		public txtLvTitle:component.UILabel;
		public txtLvValue:component.UILabel;
		public txtNeedDonate:component.UILabel;
		public txtNeedGold:component.UILabel;
		public hboxCurProp:Laya.HBox;
		public txtCurPropName:component.UILabel;
		public txtCurPropValue:component.UILabel;
		public iconList:Laya.Box;
		public tabGroup:component.UITab;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("ProUI.Faction.ChildView.FactionSkillItemUI",ProUI.Faction.ChildView.FactionSkillItemUI);
			View.regComponent("UITab",component.UITab);

            super.createChildren();
            this.loadUI("Faction/FactionSkill");

        }

    }
}

module ProUI.Faction {
    export class FactionSkillResetUI extends View {
		public btnClose:component.UIButton;
		public itemListView:component.UIItemBox;
		public btnCancel:component.UIButton;
		public btnConfirm:component.UIButton;
		public txtConfirmLabel:component.UILabel;
		public htmlContent:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Faction/FactionSkillReset");

        }

    }
}

module ProUI.FactionWar.ChildView {
    export class AddBuffAttrItemViewUI extends Laya.Box {
		public txtAttrName:component.UILabel;
		public txtFromValue:component.UILabel;
		public txtToValue:component.UILabel;
		public imgTo:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["FactionWar/ChildView/AddBuffAttrItemView"], this, this);

        }

    }
}

module ProUI.FactionWar.ChildView {
    export class EnemyListItemViewUI extends Laya.Image {
		public listStar:Laya.HBox;
		public txtNickname:component.UILabel;
		public txtFightValue:component.UILabel;
		public imgFort:component.UIFrameImage;
		public txtDestroyTips:component.UILabel;
		public btnAttack:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["FactionWar/ChildView/EnemyListItemView"], this, this);

        }

    }
}

module ProUI.FactionWar.ChildView {
    export class FactionListItemViewUI extends Laya.Image {
		public txtStatus:component.UILabel;
		public txtFactionNameLeft:component.UILabel;
		public txtServerNameLeft:component.UILabel;
		public txtRankLeft:component.UILabel;
		public txtFactionNameRight:component.UILabel;
		public txtServerNameRight:component.UILabel;
		public txtRankRight:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["FactionWar/ChildView/FactionListItemView"], this, this);

        }

    }
}

module ProUI.FactionWar.ChildView {
    export class FortRecordItemViewUI extends Laya.Image {
		public btnWatch:component.UIButton;
		public txtAttackName:component.UILabel;
		public txtTime:component.UILabel;
		public txtResult:component.UILabel;
		public txtEmbatle:component.UILabel;
		public txtFightValue:component.UILabel;
		public txtDifficulty:component.UILabel;
		public listPetView:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["FactionWar/ChildView/FortRecordItemView"], this, this);

        }

    }
}

module ProUI.FactionWar.ChildView {
    export class MainLoopBgUI extends Laya.Image {

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.FactionWar.ChildView.MainMemberFortViewUI",ProUI.FactionWar.ChildView.MainMemberFortViewUI);

            Laya.ClassUtils.createByJson(View.uiMap["FactionWar/ChildView/MainLoopBg"], this, this);

        }

    }
}

module ProUI.FactionWar.ChildView {
    export class MainMemberFortViewUI extends component.UIButton {
		public img:component.UIFrameImage;
		public vboxTop:Laya.VBox;
		public spAddbuff:Laya.Image;
		public listStar:Laya.Box;
		public txtNumber:component.UILabel;
		public txtNickname:component.UILabel;
		public txtFightValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["FactionWar/ChildView/MainMemberFortView"], this, this);

        }

    }
}

module ProUI.FactionWar.ChildView {
    export class RecordItemViewUI extends Laya.Image {
		public imgTitle:component.UIFrameImage;
		public txtTime:component.UILabel;
		public htmlContent:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["FactionWar/ChildView/RecordItemView"], this, this);

        }

    }
}

module ProUI.FactionWar.ChildView {
    export class ResultBoxItemViewUI extends component.UIButton {
		public winBox:Laya.Image;
		public loseBox:Laya.Image;
		public norItem:Pro.NorItemUI;
		public txtBg:Laya.Image;
		public txtNickname:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["FactionWar/ChildView/ResultBoxItemView"], this, this);

        }

    }
}

module ProUI.FactionWar {
    export class FactionWarUI extends View {
		public listBg:component.UIList;
		public spNoOpen:Laya.Image;
		public txtNoOpenTips:component.UILabel;
		public btnNoOpenAttackList:component.UIButton;
		public btnClose:component.UIButton;
		public btnHelp:component.UIButton;
		public spBothInfo:Laya.Box;
		public imgWinLeft:Laya.Image;
		public imgDeuceLeft:Laya.Image;
		public imgWinRight:Laya.Image;
		public imgDeuceRight:Laya.Image;
		public txtNicknameLeft:component.UILabel;
		public txtStarCountLeft:component.UILabel;
		public txtNicknameRight:component.UILabel;
		public txtStarCountRight:component.UILabel;
		public listRightBtns:Laya.VBox;
		public btnAttackList:component.UIButton;
		public btnEnemyList:component.UIButton;
		public btnReport:component.UIButton;
		public btnReward:component.UIButton;
		public btnResultBox:component.UIButton;
		public rankView:Laya.Image;
		public txtRankNickname1:component.UILabel;
		public txtRankNickname2:component.UILabel;
		public txtRankNickname3:component.UILabel;
		public btnWatchRank:component.UIButton;
		public spCountDown:Laya.Image;
		public txtCountDown:component.UILabel;
		public txtLeftCount:component.UILabel;
		public bottomBox:Laya.Box;
		public btnBattleField:component.UIButton;
		public txtBattleFieldLabel:component.UILabel;
		public txtBuffLevel:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.FactionWar.ChildView.MainLoopBgUI",ProUI.FactionWar.ChildView.MainLoopBgUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("FactionWar/FactionWar");

        }

    }
}

module ProUI.FactionWar {
    export class FactionWarEnemyInfoUI extends View {
		public btnClose:component.UIButton;
		public btnDefDetails:component.UIButton;
		public imgEmbattleIcon:Laya.Image;
		public listStar:Laya.HBox;
		public txtFightValue:component.UIBitmapText;
		public txtDefCount:component.UILabel;
		public txtEmbattleName:component.UILabel;
		public txtLeftCount:component.UILabel;
		public listPetView:component.UIItemBox;
		public listItemView:component.UIItemBox;
		public viewBuffInfo:Laya.Box;
		public imgLvProgress:Laya.Image;
		public btnAttack:component.UIButton;
		public txtLv:component.UILabel;
		public txtFortCount:component.UILabel;
		public listAddBuffAttr:component.UIItemBox;
		public viewAttackInfo:Laya.Box;
		public degreeList:Laya.HBox;
		public btnAttack1:component.UIButton;
		public btnAttack2:component.UIButton;
		public btnAttack3:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.FactionWar.ChildView.AddBuffAttrItemViewUI",ProUI.FactionWar.ChildView.AddBuffAttrItemViewUI);

            super.createChildren();
            this.loadUI("FactionWar/FactionWarEnemyInfo");

        }

    }
}

module ProUI.FactionWar {
    export class FactionWarEnemyListUI extends View {
		public btnClose:component.UIButton;
		public btnConfirm:component.UIButton;
		public txtLeftCount:component.UILabel;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.FactionWar.ChildView.EnemyListItemViewUI",ProUI.FactionWar.ChildView.EnemyListItemViewUI);

            super.createChildren();
            this.loadUI("FactionWar/FactionWarEnemyList");

        }

    }
}

module ProUI.FactionWar {
    export class FactionWarFactonListUI extends View {
		public btnClose:component.UIButton;
		public btnHelp:component.UIButton;
		public listView:component.UIList;
		public selfAttackItem:ProUI.FactionWar.ChildView.FactionListItemViewUI;
		public txtNoOpen:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.FactionWar.ChildView.FactionListItemViewUI",ProUI.FactionWar.ChildView.FactionListItemViewUI);

            super.createChildren();
            this.loadUI("FactionWar/FactionWarFactonList");

        }

    }
}

module ProUI.FactionWar {
    export class FactionWarFortRecordUI extends View {
		public btnClose:component.UIButton;
		public btnHelp:component.UIButton;
		public txtFightValue:component.UIBitmapText;
		public imgEmbattleIcon:Laya.Image;
		public imgListEmpty:Laya.Image;
		public txtEmbattleName:component.UILabel;
		public listPetView:component.UIItemBox;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.FactionWar.ChildView.FortRecordItemViewUI",ProUI.FactionWar.ChildView.FortRecordItemViewUI);

            super.createChildren();
            this.loadUI("FactionWar/FactionWarFortRecord");

        }

    }
}

module ProUI.FactionWar {
    export class FactionWarRecordUI extends View {
		public btnClose:component.UIButton;
		public btnConfirm:component.UIButton;
		public listView:component.UIList;
		public tabGrp:Pro.UITabExtend;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.FactionWar.ChildView.RecordItemViewUI",ProUI.FactionWar.ChildView.RecordItemViewUI);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);

            super.createChildren();
            this.loadUI("FactionWar/FactionWarRecord");

        }

    }
}

module ProUI.FactionWar {
    export class FactionWarResultBoxUI extends View {
		public btnHelp:component.UIButton;
		public imgListEmpty:Laya.Image;
		public boxNameTips:Laya.Box;
		public txtBoxName:component.UILabel;
		public txtOpenState:component.UILabel;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.FactionWar.ChildView.ResultBoxItemViewUI",ProUI.FactionWar.ChildView.ResultBoxItemViewUI);

            super.createChildren();
            this.loadUI("FactionWar/FactionWarResultBox");

        }

    }
}

module ProUI.FactionWar {
    export class FactionWarRewardUI extends View {
		public btnClose:component.UIButton;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.RankRewardPreviewUI",Pro.RankRewardPreviewUI);

            super.createChildren();
            this.loadUI("FactionWar/FactionWarReward");

        }

    }
}

module ProUI.Friend {
    export class AddFriendUI extends View {
		public imgListEmpty:Laya.Image;
		public txtEmptyLabel:component.UILabel;
		public btnSearch:component.UIButton;
		public btnRefresh:component.UIButton;
		public btnAddAll:component.UIButton;
		public txtFriendCount:component.UILabel;
		public txtTitle:component.UILabel;
		public inputNickname:Laya.TextInput;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Friend.ChildView.AddFriendItemViewUI",ProUI.Friend.ChildView.AddFriendItemViewUI);

            super.createChildren();
            this.loadUI("Friend/AddFriend");

        }

    }
}

module ProUI.Friend.ChildView {
    export class AddFriendItemViewUI extends Laya.Box {
		public viewPlayerIcon:Pro.PlayerIconUI;
		public btnWait:component.UIButton;
		public btnAddFriend:component.UIButton;
		public txtNickname:component.UILabel;
		public txtOnlineTime:component.UILabel;
		public txtFightDesc:component.UILabel;
		public txtFightValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Friend/ChildView/AddFriendItemView"], this, this);

        }

    }
}

module ProUI.Friend.ChildView {
    export class ApplyItemViewUI extends Laya.Box {
		public btnAgree:component.UIButton;
		public btnRefuse:component.UIButton;
		public viewPlayerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public txtOnlineTime:component.UILabel;
		public txtFightDesc:component.UILabel;
		public txtFightValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Friend/ChildView/ApplyItemView"], this, this);

        }

    }
}

module ProUI.Friend.ChildView {
    export class ApplyListPageViewUI extends Laya.Box {
		public txtCount:component.UILabel;
		public listView:component.UIList;
		public imgListEmpty:Laya.Image;
		public btnOneKeyOp:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Friend.ChildView.ApplyItemViewUI",ProUI.Friend.ChildView.ApplyItemViewUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Friend/ChildView/ApplyListPageView"], this, this);

        }

    }
}

module ProUI.Friend.ChildView {
    export class BlacklistItemViewUI extends Laya.Box {
		public viewPlayerIcon:Pro.PlayerIconUI;
		public btnDel:component.UIButton;
		public txtNickname:component.UILabel;
		public txtOnlineTime:component.UILabel;
		public txtFightDesc:component.UILabel;
		public txtFightValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Friend/ChildView/BlacklistItemView"], this, this);

        }

    }
}

module ProUI.Friend.ChildView {
    export class BlacklistPageViewUI extends Laya.Box {
		public txtCount:component.UILabel;
		public listView:component.UIList;
		public imgListEmpty:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Friend.ChildView.BlacklistItemViewUI",ProUI.Friend.ChildView.BlacklistItemViewUI);

            Laya.ClassUtils.createByJson(View.uiMap["Friend/ChildView/BlacklistPageView"], this, this);

        }

    }
}

module ProUI.Friend.ChildView {
    export class GiftItemViewUI extends Laya.Box {
		public viewPlayerIcon:Pro.PlayerIconUI;
		public btnAccept:component.UIButton;
		public btnReturnSend:component.UIButton;
		public txtNickname:component.UILabel;
		public txtOnlineTime:component.UILabel;
		public txtFightDesc:component.UILabel;
		public txtFightValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Friend/ChildView/GiftItemView"], this, this);

        }

    }
}

module ProUI.Friend.ChildView {
    export class GiftPageViewUI extends Laya.Box {
		public txtLoveCount:component.UILabel;
		public txtCount:component.UILabel;
		public listView:component.UIList;
		public btnQuickAccept:component.UIButton;
		public imgListEmpty:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Friend.ChildView.GiftItemViewUI",ProUI.Friend.ChildView.GiftItemViewUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Friend/ChildView/GiftPageView"], this, this);

        }

    }
}

module ProUI.Friend.ChildView {
    export class MyFriendItemViewUI extends Laya.Box {
		public viewPlayerIcon:Pro.PlayerIconUI;
		public btnPrivateChat:component.UIButton;
		public btnSend:component.UIButton;
		public btnDel:component.UIButton;
		public txtNickname:component.UILabel;
		public txtOnlineTime:component.UILabel;
		public txtFightDesc:component.UILabel;
		public txtFightValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Friend/ChildView/MyFriendItemView"], this, this);

        }

    }
}

module ProUI.Friend.ChildView {
    export class MyFriendPageViewUI extends Laya.Box {
		public txtLoveCount:component.UILabel;
		public txtFriendCount:component.UILabel;
		public btnQuickSend:component.UIButton;
		public btnCancelDel:component.UIButton;
		public btnDel:component.UIButton;
		public btnAddFriend:component.UIButton;
		public listView:component.UIList;
		public imgListEmpty:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Friend.ChildView.MyFriendItemViewUI",ProUI.Friend.ChildView.MyFriendItemViewUI);

            Laya.ClassUtils.createByJson(View.uiMap["Friend/ChildView/MyFriendPageView"], this, this);

        }

    }
}

module ProUI.Friend {
    export class FriendUI extends View {
		public tabGrp:component.UITab;
		public pageViewContainer:Pro.TableBarContiner;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Friend/Friend");

        }

    }
}

module ProUI.Fuben.BuyTimes {
    export class MainUI extends Laya.Box {
		public PlusBtn:component.UIButton;
		public TimeLb:component.UILabel;
		public BuyTimesLb:component.UILabel;
		public LastBuyTimesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/BuyTimes/Main"], this, this);

        }

    }
}

module ProUI.Fuben.Daily {
    export class AlertTipsUI extends Laya.Box {
		public CloseBtn:component.UIButton;
		public SureBtn:component.UIButton;
		public TIps1Box:Laya.HBox;
		public TIps3Box:Laya.HBox;
		public CostNumLb:component.UILabel;
		public CostBaseLb:component.UILabel;
		public TIps2Box:Laya.HBox;
		public CostIconImg:Laya.Image;
		public GetNumLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Daily/AlertTips"], this, this);

        }

    }
}

module ProUI.Fuben.Daily {
    export class ListItemUI extends Laya.Box {
		public FunBtn:component.UIButton;
		public reddotFreeAtk:Laya.Image;
		public NeedBuyBox:Laya.HBox;
		public NeedBuyImg:Laya.Image;
		public NeedBuyLb:component.UILabel;
		public NeedBuyTitleLb:component.UILabel;
		public FunLb:component.UILabel;
		public QuImgFrame:component.UIFrameImage;
		public TuiJianImg:Laya.Image;
		public QuLb:component.UILabel;
		public LockLb:component.UILabel;
		public RewardBox:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Daily/ListItem"], this, this);

        }

    }
}

module ProUI.Fuben.Daily {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public QABtn:component.UIButton;
		public FunBGImg:component.UIFrameImage;
		public FunWenziImg:component.UIFrameImage;
		public ItemSelectEffNode:Laya.Box;
		public TitleItemList:component.UIList;
		public FubenItemList:component.UIList;
		public LastEnterTimeLb:component.UILabel;
		public btnOneKeyAll:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Fuben.Daily.TitleItemUI",ProUI.Fuben.Daily.TitleItemUI);
			View.regComponent("ProUI.Fuben.Daily.ListItemUI",ProUI.Fuben.Daily.ListItemUI);

            super.createChildren();
            this.loadUI("Fuben/Daily/Main");

        }

    }
}

module ProUI.Fuben.Daily {
    export class TitleItemUI extends component.UIButton {
		public IconImg:component.UIFrameImage;
		public LockImg:Laya.Image;
		public RedDotImg:Laya.Image;
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Daily/TitleItem"], this, this);

        }

    }
}

module ProUI.Fuben.DropInfo.BossDrop {
    export class MainUI extends Laya.Box {
		public ItemTableView:component.UITableView;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UITableView",component.UITableView);
			View.regComponent("ProUI.Fuben.DropInfo.BossDrop.TableHeadUI",ProUI.Fuben.DropInfo.BossDrop.TableHeadUI);
			View.regComponent("ProUI.Fuben.DropInfo.DropItemUI",ProUI.Fuben.DropInfo.DropItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/DropInfo/BossDrop/Main"], this, this);

        }

    }
}

module ProUI.Fuben.DropInfo.BossDrop {
    export class TableHeadUI extends Laya.Box {
		public HeadBtn:component.UIButton;
		public HeadSelImg:Laya.Image;
		public SuoImg:Laya.Image;
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/DropInfo/BossDrop/TableHead"], this, this);

        }

    }
}

module ProUI.Fuben.DropInfo {
    export class DropItemUI extends Laya.Box {
		public NameLbBg:Laya.Image;
		public ItemList:component.UIList;
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/DropInfo/DropItem"], this, this);

        }

    }
}

module ProUI.Fuben.DropInfo.HookDrop {
    export class MainUI extends Laya.Box {
		public ItemList:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Fuben.DropInfo.DropItemUI",ProUI.Fuben.DropInfo.DropItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/DropInfo/HookDrop/Main"], this, this);

        }

    }
}

module ProUI.Fuben.DropInfo {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public ItemTab:Pro.UITabExtend;
		public FunBox:Pro.TableBarContiner;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Fuben/DropInfo/Main");

        }

    }
}

module ProUI.Fuben.Expedition.Choice {
    export class BoxItemUI extends Laya.Box {
		public BGFrameImg:component.UIFrameImage;
		public TitleFrameImg:component.UIFrameImage;
		public RewardItemBox:component.UIItemBox;
		public PowerImg:Laya.Image;
		public PowerLb:component.UIBitmapText;
		public ChoiceBtn:component.UIButton;
		public TipsLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Expedition/Choice/BoxItem"], this, this);

        }

    }
}

module ProUI.Fuben.Expedition.Choice {
    export class MainUI extends View {
		public DiffuctBox:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Fuben.Expedition.Choice.BoxItemUI",ProUI.Fuben.Expedition.Choice.BoxItemUI);

            super.createChildren();
            this.loadUI("Fuben/Expedition/Choice/Main");

        }

    }
}

module ProUI.Fuben.Expedition.Fight {
    export class MainUI extends View {
		public TItleLb:component.UILabel;
		public PassRecordBtn:component.UIButton;
		public FightBtn:component.UIButton;
		public PlayerNameLb:component.UILabel;
		public PlayerIconInfo:Pro.PlayerIconUI;
		public PowerLb:component.UIBitmapText;
		public StorePetBox:component.UIItemBox;
		public RewardBox:component.UIItemBox;
		public autoBtn:component.UIButton;
		public autoImg:Laya.Image;
		public autoLbl:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Fuben/Expedition/Fight/Main");

        }

    }
}

module ProUI.Fuben.Expedition {
    export class MainUI extends View {
		public MapInfo:ProUI.Fuben.Expedition.MapUI;
		public TItleLb:component.UILabel;
		public TodayRewardBox:component.UIItemBox;
		public HelpBtn:component.UIButton;
		public ShopBtn:component.UIButton;
		public SupportBtn:component.UIButton;
		public CloseBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ProUI.Fuben.Expedition.MapUI",ProUI.Fuben.Expedition.MapUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Fuben/Expedition/Main");

        }

    }
}

module ProUI.Fuben.Expedition {
    export class MapUI extends View {
		public MapLayer:component.UILayer;
		public BGImg:Laya.Image;
		public PointBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.UILayer",component.UILayer);
			View.regComponent("ProUI.Fuben.Expedition.PointItemUI",ProUI.Fuben.Expedition.PointItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            super.createChildren();
            this.loadUI("Fuben/Expedition/Map");

        }

    }
}

module ProUI.Fuben.Expedition {
    export class PointItemUI extends component.UIButton {

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Expedition/PointItem"], this, this);

        }

    }
}

module ProUI.Fuben.Expedition.Record {
    export class ListItemUI extends Laya.Box {
		public imgResultL:component.UIFrameImage;
		public imgResultR:component.UIFrameImage;
		public hboxNicknameL:Laya.HBox;
		public txtNicknameL:component.UILabel;
		public txtLvL:component.UILabel;
		public hboxNicknameR:Laya.HBox;
		public txtNicknameR:component.UILabel;
		public txtLvR:component.UILabel;
		public listHerosL:component.UIItemBox;
		public listHerosR:component.UIItemBox;
		public btnReplay:component.UIButton;
		public txtFightPowerL:component.UILabel;
		public txtFightPowerR:component.UILabel;
		public txtBoutValue:component.UILabel;
		public txtBattleType:component.UILabel;
		public txtTime:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Expedition/Record/ListItem"], this, this);

        }

    }
}

module ProUI.Fuben.Expedition.Record {
    export class MainUI extends View {
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Fuben.Expedition.Record.ListItemUI",ProUI.Fuben.Expedition.Record.ListItemUI);

            super.createChildren();
            this.loadUI("Fuben/Expedition/Record/Main");

        }

    }
}

module ProUI.Fuben.Expedition.Reward {
    export class MainUI extends Laya.Box {
		public CloseBtn:component.UIButton;
		public TitleLb:component.UILabel;
		public RewardBox:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Expedition/Reward/Main"], this, this);

        }

    }
}

module ProUI.Fuben.LiLian {
    export class ListItemUI extends Laya.Box {
		public bgImg:component.UIFrameImage;
		public btn:component.UIButton;
		public RedDotImg:Laya.Image;
		public DescLb:component.UILabel;
		public RewardItemList:component.UIItemBox;
		public lock:Laya.Box;
		public txtOpenCondition:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/LiLian/ListItem"], this, this);

        }

    }
}

module ProUI.Fuben.LiLian {
    export class MainUI extends View {
		public ItemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Fuben.LiLian.ListItemUI",ProUI.Fuben.LiLian.ListItemUI);

            super.createChildren();
            this.loadUI("Fuben/LiLian/Main");

        }

    }
}

module ProUI.Fuben.QuickFight {
    export class MainUI extends View {
		public bg:Laya.Box;
		public btnClose:component.UIButton;
		public HelpBtn:component.UIButton;
		public CostBox:Laya.HBox;
		public CostIconImg:Laya.Image;
		public CostNumLb:component.UILabel;
		public SureBtn:component.UIButton;
		public CostNumLb1:component.UILabel;
		public btnAddCount:component.UIButton;
		public btnGotoPrivilege:component.UIButton;
		public ItemList:component.UIList;
		public DescHtml:component.UIHtmlText;
		public TipHtml:component.UIHtmlText;
		public activityTipsHtml:component.UIHtmlText;
		public txtPrivilegeTime:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Fuben/QuickFight/Main");

        }

    }
}

module ProUI.Fuben.Redio {
    export class MainUI extends Laya.Box {
		public btnClose:component.UIButton;
		public RankItemBox:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Fuben.Redio.RankItemUI",ProUI.Fuben.Redio.RankItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Redio/Main"], this, this);

        }

    }
}

module ProUI.Fuben.Redio {
    export class RankItemUI extends Laya.Box {
		public imgTitleBg:Laya.Image;
		public shareBtn:component.UIButton;
		public SureBtn:component.UIButton;
		public NameLb:component.UILabel;
		public PassTimeLb:component.UILabel;
		public TitleLb:component.UILabel;
		public PlayerIconInfo:Pro.PlayerIconUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Redio/RankItem"], this, this);

        }

    }
}

module ProUI.Fuben.StagePrize {
    export class ListItemUI extends Laya.Box {
		public imgGetTag:Laya.Image;
		public btnGo:component.UIButton;
		public RewardBox:component.UIItemBox;
		public btnPrize:component.UIButton;
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/StagePrize/ListItem"], this, this);

        }

    }
}

module ProUI.Fuben.StagePrize {
    export class MainUI extends View {
		public frameImgTitle:component.UIFrameImage;
		public ItemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Fuben.StagePrize.ListItemUI",ProUI.Fuben.StagePrize.ListItemUI);

            super.createChildren();
            this.loadUI("Fuben/StagePrize/Main");

        }

    }
}

module ProUI.Fuben.Support.HelpMe {
    export class ListItemUI extends Laya.Box {
		public btnCancel:component.UIButton;
		public btnIsSel:component.UIButton;
		public btnSel:component.UIButton;
		public PetItemUI:Pro.NorItemUI;
		public PetJobLb:component.UILabel;
		public PetNameLb:component.UILabel;
		public PetPowerLb:component.UILabel;
		public txtFriendName:component.UILabel;
		public StatueLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Support/HelpMe/ListItem"], this, this);

        }

    }
}

module ProUI.Fuben.Support.HelpMe {
    export class MainUI extends Laya.Box {
		public imgEmpty:Laya.Image;
		public ItemList:component.UIList;
		public txtTips:component.UILabel;
		public btnAddFriend:component.UIButton;
		public btnFriend:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Fuben.Support.HelpMe.ListItemUI",ProUI.Fuben.Support.HelpMe.ListItemUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Support/HelpMe/Main"], this, this);

        }

    }
}

module ProUI.Fuben.Support {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public FunBox:Pro.TableBarContiner;
		public ItemTab:Pro.UITabExtend;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);

            super.createChildren();
            this.loadUI("Fuben/Support/Main");

        }

    }
}

module ProUI.Fuben.Support.ToHelp {
    export class ListItemUI extends Laya.Box {
		public ChoiceBtn:component.UIButton;
		public PetItemUI:Pro.NorItemUI;
		public PetJobLb:component.UILabel;
		public PetNameLb:component.UILabel;
		public PetPowerLb:component.UILabel;
		public StatueLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Support/ToHelp/ListItem"], this, this);

        }

    }
}

module ProUI.Fuben.Support.ToHelp {
    export class MainUI extends Laya.Box {
		public bgSelList:Laya.Image;
		public SelectInfoList:component.UIItemBox;
		public noSelect:Laya.Image;
		public TipsLb:component.UILabel;
		public bgWaitList:Laya.Image;
		public ItemList:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Fuben.Support.ToHelp.ListItemUI",ProUI.Fuben.Support.ToHelp.ListItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/Support/ToHelp/Main"], this, this);

        }

    }
}

module ProUI.Fuben.TeamCampaign.Choice {
    export class MainUI extends View {
		public txtName:component.UILabel;
		public listItem:component.UIList;
		public btnLeft:component.UIButton;
		public btnRight:component.UIButton;
		public btnSure:component.UIButton;
		public lbDiffName:component.UILabel;
		public LastTimeLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Fuben/TeamCampaign/Choice/Main");

        }

    }
}

module ProUI.Fuben.TeamCampaign.Fight {
    export class MainUI extends View {
		public FightBtn:component.UIButton;
		public TItleLb:component.UILabel;
		public PlayerNameLb:component.UILabel;
		public StorePetBox:component.UIItemBox;
		public RewardBox:component.UIItemBox;
		public PowerLb:component.UILabel;
		public txtDesc:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Fuben/TeamCampaign/Fight/Main");

        }

    }
}

module ProUI.Fuben.TeamCampaign {
    export class MainUI extends View {
		public scrollPanel:Laya.Panel;
		public MapLayer:Laya.Box;
		public TItleLb:component.UILabel;
		public BuffBtn:component.UIButton;
		public PetsBox:component.UIItemBox;
		public ExtralPrizeBox:Laya.Image;
		public ExtralPrizeList:component.UIList;
		public ChangZhenfaBtn:component.UIButton;
		public ZhenfaImg:Laya.Image;
		public ArtifactBtn:component.UIButton;
		public ArtifactIconImg:Laya.Image;
		public ArtifactStatueImg:Laya.Image;
		public FightPowerLb:component.UILabel;
		public LastTimeLb:component.UILabel;
		public SupportBtn:component.UIButton;
		public ShopBtn:component.UIButton;
		public CloseBtn:component.UIButton;
		public HelpBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ProUI.Fuben.TeamCampaign.MainMapItemUI",ProUI.Fuben.TeamCampaign.MainMapItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);

            super.createChildren();
            this.loadUI("Fuben/TeamCampaign/Main");

        }

    }
}

module ProUI.Fuben.TeamCampaign {
    export class MainMapItemUI extends Laya.Box {
		public btn:component.UIButton;
		public icon:Laya.Image;
		public txtName:component.UILabel;
		public imgProgress:Laya.Image;
		public txtProgress:component.UILabel;
		public imgFinish:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/TeamCampaign/MainMapItem"], this, this);

        }

    }
}

module ProUI.Fuben.TeamCampaign.PetChoice {
    export class MainUI extends View {
		public HeroList:component.UIList;
		public SureBtn:component.UIButton;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);

            super.createChildren();
            this.loadUI("Fuben/TeamCampaign/PetChoice/Main");

        }

    }
}

module ProUI.Fuben.TeamCampaign.Record {
    export class ListItemUI extends Laya.Box {
		public imgResultL:component.UIFrameImage;
		public imgResultR:component.UIFrameImage;
		public hboxNicknameL:Laya.HBox;
		public txtNicknameL:component.UILabel;
		public txtLvL:component.UILabel;
		public hboxNicknameR:Laya.HBox;
		public txtNicknameR:component.UILabel;
		public txtLvR:component.UILabel;
		public listHerosL:component.UIItemBox;
		public listHerosR:component.UIItemBox;
		public btnReplay:component.UIButton;
		public txtFightPowerL:component.UILabel;
		public txtFightPowerR:component.UILabel;
		public txtBoutValue:component.UILabel;
		public txtBattleType:component.UILabel;
		public txtTime:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/TeamCampaign/Record/ListItem"], this, this);

        }

    }
}

module ProUI.Fuben.TeamCampaign.Record {
    export class MainUI extends View {
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Fuben.Expedition.Record.ListItemUI",ProUI.Fuben.Expedition.Record.ListItemUI);

            super.createChildren();
            this.loadUI("Fuben/TeamCampaign/Record/Main");

        }

    }
}

module ProUI.Fuben.TeamCampaign.Reward {
    export class ListItemUI extends component.UIButton {
		public imgIcon:Laya.Image;
		public imgSelect:Laya.Image;
		public lbTips:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/TeamCampaign/Reward/ListItem"], this, this);

        }

    }
}

module ProUI.Fuben.TeamCampaign.Reward {
    export class MainUI extends Laya.Box {
		public CloseBtn:component.UIButton;
		public TitleLb:component.UIHtmlText;
		public RewardBox:component.UIItemBox;
		public autoBtn:component.UIButton;
		public autoImg:Laya.Image;
		public autoLbl:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Fuben.TeamCampaign.Reward.ListItemUI",ProUI.Fuben.TeamCampaign.Reward.ListItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Fuben/TeamCampaign/Reward/Main"], this, this);

        }

    }
}

module ProUI.GamesEnter {
    export class AcrossWarEnterUI extends View {
		public BGImg:Laya.Image;
		public listView:component.UIList;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.GamesEnterItemView",Pro.GamesEnterItemView);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("GamesEnter/AcrossWarEnter");

        }

    }
}

module ProUI.GamesEnter {
    export class GamesEnterItemViewUI extends Laya.Box {
		public imgBg:Laya.Image;
		public itemBox1:Laya.Box;
		public txtContent:component.UILabel;
		public listNorItem:component.UIList;
		public lock:Laya.Box;
		public txtOpenCondition:component.UILabel;
		public reddot:Laya.Image;
		public btn:component.UIButton;
		public itemBox2:Laya.Box;
		public leftBox:Laya.Box;
		public reddotLeft:Laya.Image;
		public listNorItemLeft:component.UIList;
		public txtContentLeft:component.UILabel;
		public txtOpenConditionLeft:component.UILabel;
		public btnLeft:component.UIButton;
		public rightBox:Laya.Box;
		public reddotRight:Laya.Image;
		public listNorItemRight:component.UIList;
		public txtContentRight:component.UILabel;
		public txtOpenConditionRight:component.UILabel;
		public btnRight:component.UIButton;
		public shadeLeft:Laya.Image;
		public shadeRight:Laya.Image;
		public shadeAll:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["GamesEnter/GamesEnterItemView"], this, this);

        }

    }
}

module ProUI.GamesEnter {
    export class SecretTravelEnterUI extends View {
		public listView:component.UIList;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.GamesEnterItemView",Pro.GamesEnterItemView);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("GamesEnter/SecretTravelEnter");

        }

    }
}

module ProUI.GmTools {
    export class IllustrationToolsUI extends View {
		public closeBtn:component.UIButton;
		public aniPos:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UILabelButton",component.UILabelButton);

            super.createChildren();
            this.loadUI("GmTools/IllustrationTools");

        }

    }
}

module ProUI.GodGift {
    export class GodGiftUI extends View {
		public btnClose:component.UIButton;
		public btnGetReward:component.UIButton;
		public listNoritem:component.UIItemBox;
		public htmlDesc:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("GodGift/GodGift");

        }

    }
}

module ProUI.GuessHero {
    export class GuessHeroMainUI extends View {
		public frame_bg:component.UIFrameImage;
		public panel_score:Laya.Box;
		public lbl_myRecord:component.UILabel;
		public lbl_currentScore:component.UILabel;
		public panel_ready:Laya.Box;
		public lbl_finishTime:component.UILabel;
		public lbl_myRank:component.UILabel;
		public list_rewards:component.UIList;
		public btn_go:component.UIButton;
		public panel_answer:Laya.Box;
		public image_hero:Laya.Image;
		public img_answer:Laya.Image;
		public lbl_answer:component.UILabel;
		public answerList:Laya.List;
		public lbl_remainTimes:component.UILabel;
		public frame_time:component.UIFrameImage;
		public panel_result:Laya.Box;
		public lbl_currentRank:component.UILabel;
		public lbl_rightGuessTimes:component.UILabel;
		public btn_again:component.UIButton;
		public btn_rank:component.UIButton;
		public btn_tip:component.UIButton;
		public btn_close:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.GuessHero.item.GuessHeroAnserBtnItemUI",ProUI.GuessHero.item.GuessHeroAnserBtnItemUI);

            super.createChildren();
            this.loadUI("GuessHero/GuessHeroMain");

        }

    }
}

module ProUI.GuessHero {
    export class GuessHeroRankMainUI extends View {
		public lbl_finishTime:component.UILabel;
		public panel_rewards:Laya.Box;
		public list_reward:component.UIList;
		public itemBox:component.UIItemBox;
		public panel_rank:Laya.Box;
		public list_rank:component.UIList;
		public box_mySelf:Laya.Box;
		public lbl_score:component.UILabel;
		public lbl_name:component.UILabel;
		public image_icon:Laya.Image;
		public imgHeadBorder:Laya.Image;
		public lbl_reward_rank2:component.UILabel;
		public lbl_rank:component.UILabel;
		public frame_rank:component.UIFrameImage;
		public tabGrp:component.UITab;
		public btn_close:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.GuessHeroRewardItem",Pro.GuessHeroRewardItem);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("Pro.GuessHeroRankItem",Pro.GuessHeroRankItem);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("GuessHero/GuessHeroRankMain");

        }

    }
}

module ProUI.GuessHero.item {
    export class GuessHeroAnserBtnItemUI extends View {
		public img_wrong:Laya.Image;
		public img_right:Laya.Image;
		public lbl_answer:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("GuessHero/item/GuessHeroAnserBtnItem");

        }

    }
}

module ProUI.GuessHero.item {
    export class GuessHeroRankItemUI extends View {
		public lbl_rank:component.UILabel;
		public frame_image:component.UIFrameImage;
		public lbl_name:component.UILabel;
		public lbl_score:component.UILabel;
		public image_icon:Laya.Image;
		public imgHeadBorder:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            super.createChildren();
            this.loadUI("GuessHero/item/GuessHeroRankItem");

        }

    }
}

module ProUI.GuessHero.item {
    export class GuessHeroRewardItemUI extends View {
		public frame_image:component.UIFrameImage;
		public lbl_des:component.UILabel;
		public itemBox:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("GuessHero/item/GuessHeroRewardItem");

        }

    }
}

module ProUI.Heavens {
    export class ChapterViewUI extends View {
		public mapBox:Laya.Box;
		public btn_help:component.UIButton;
		public btn_right:component.UIButton;
		public btn_left:component.UIButton;
		public img_select:Laya.Image;
		public txt_title:component.UILabel;
		public ActiveValueImg:Laya.Image;
		public rewardBox:component.UIItemBox;
		public txt_progress:component.UILabel;
		public frameImgRole:component.UIFrameImage;
		public imgRewardTitle:component.UIFrameImage;
		public txt_levelName:component.UILabel;
		public txt_power:component.UILabel;
		public rewardItemBox:component.UIItemBox;
		public btn_detail:component.UIButton;
		public btn_sweep:component.UIButton;
		public btn_fight:component.UIButton;
		public listCondition:component.UIItemBox;
		public btn_back:component.UIButton;
		public btn_addTimes:component.UIButton;
		public txt_count:component.UILabel;
		public txt_leftCount:component.UIHtmlText;
		public detailBox:Laya.Box;
		public bossTeam_1:component.UIItemBox;
		public bossTeam_2:component.UIItemBox;
		public prizeReviewPanel:Laya.Image;
		public prizeReviewPanelMask:component.UIButton;
		public prizeReviewBox:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.ProgressChestItemUI",Pro.ProgressChestItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Heavens/ChapterView");

        }

    }
}

module ProUI.Heavens.ChildPage {
    export class ChapterGroupItemUI extends Laya.Box {
		public firstArrow:Laya.Image;
		public chapter_1:ProUI.Heavens.ChildPage.ChapterItemUI;
		public chapter_2:ProUI.Heavens.ChildPage.ChapterItemUI;
		public chapter_3:ProUI.Heavens.ChildPage.ChapterItemUI;
		public chapter_4:ProUI.Heavens.ChildPage.ChapterItemUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Heavens.ChildPage.ChapterItemUI",ProUI.Heavens.ChildPage.ChapterItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Heavens/ChildPage/ChapterGroupItem"], this, this);

        }

    }
}

module ProUI.Heavens.ChildPage {
    export class ChapterItemUI extends Laya.Box {
		public chapter_btn:component.UIButton;
		public img_bg:Laya.Image;
		public img_finish:Laya.Image;
		public txt_name:component.UILabel;
		public btn_reward:component.UIButton;
		public reddotReward:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Heavens/ChildPage/ChapterItem"], this, this);

        }

    }
}

module ProUI.Heavens.ChildPage {
    export class ChapterMapItemUI extends component.UIButton {
		public frameIcon:component.UIFrameImage;
		public star_1:component.UIFrameImage;
		public star_2:component.UIFrameImage;
		public star_3:component.UIFrameImage;
		public txt_name:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Heavens/ChildPage/ChapterMapItem"], this, this);

        }

    }
}

module ProUI.Heavens.ChildPage {
    export class ChapterRewardListItemUI extends Laya.Box {
		public img_finish:Laya.Image;
		public btn_go:component.UIButton;
		public btn_get:component.UIButton;
		public itemBox:component.UIItemBox;
		public txt_title:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Heavens/ChildPage/ChapterRewardListItem"], this, this);

        }

    }
}

module ProUI.Heavens.ChildPage {
    export class GodEquipListItemUI extends Laya.Box {
		public itemInfo:Pro.NorItemUI;
		public txt_name:component.UIHtmlText;
		public txt_desc:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Heavens/ChildPage/GodEquipListItem"], this, this);

        }

    }
}

module ProUI.Heavens.GodEquip {
    export class GodEquipShopUI extends View {
		public btn_close:component.UIButton;
		public img_item_icon:Laya.Image;
		public txt_item_count:component.UILabel;
		public tab:component.UITab;
		public itemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.ShopItemView",Pro.ShopItemView);

            super.createChildren();
            this.loadUI("Heavens/GodEquip/GodEquipShop");

        }

    }
}

module ProUI.Heavens.GodEquip {
    export class GodEquipViewUI extends View {
		public btn_close:component.UIButton;
		public tab:component.UITab;
		public itemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Heavens.ChildPage.GodEquipListItemUI",ProUI.Heavens.ChildPage.GodEquipListItemUI);

            super.createChildren();
            this.loadUI("Heavens/GodEquip/GodEquipView");

        }

    }
}

module ProUI.Heavens.GodEquip {
    export class SuitMgrUI extends View {
		public btnClose:component.UIButton;
		public txtDiamon:component.UILabel;
		public boxCurSuit:Laya.Box;
		public txtCurName:component.UILabel;
		public listCurEquip:component.UIItemBox;
		public norItemCurHero:Pro.NorItemUI;
		public txtSuitDesc:component.UILabel;
		public btnQuickEquip:component.UIButton;
		public btnSave:component.UIButton;
		public listView:component.UIList;
		public viewProjectSelect:ProUI.Heavens.GodEquip.SuitProjectSelectUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.EquipItemUI",Pro.EquipItemUI);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Heavens.GodEquip.SuitMgrItemUI",ProUI.Heavens.GodEquip.SuitMgrItemUI);
			View.regComponent("ProUI.Heavens.GodEquip.SuitProjectSelectUI",ProUI.Heavens.GodEquip.SuitProjectSelectUI);

            super.createChildren();
            this.loadUI("Heavens/GodEquip/SuitMgr");

        }

    }
}

module ProUI.Heavens.GodEquip {
    export class SuitMgrItemUI extends Laya.Box {
		public openBox:Laya.Box;
		public listEquip:component.UIItemBox;
		public btnEditName:component.UIButton;
		public btnUse:component.UIButton;
		public txtSuitDesc:component.UILabel;
		public txtHeroTitle:component.UILabel;
		public txtHeroName:component.UILabel;
		public noopenBox:Laya.Box;
		public btnFeeOpen:component.UIButton;
		public txtFeeCount:component.UILabel;
		public txtFeeLabel:component.UILabel;
		public txtName:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.EquipItemUI",Pro.EquipItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Heavens/GodEquip/SuitMgrItem"], this, this);

        }

    }
}

module ProUI.Heavens.GodEquip {
    export class SuitProjectRenameUI extends View {
		public btnCancel:component.UIButton;
		public btnConfirm:component.UIButton;
		public inputName:Laya.TextInput;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Heavens/GodEquip/SuitProjectRename");

        }

    }
}

module ProUI.Heavens.GodEquip {
    export class SuitProjectSaveUI extends View {
		public btnClose:component.UIButton;
		public btnConfirm:component.UIButton;
		public btnTodayTips:component.UIButton;
		public imgTodayTips:Laya.Image;
		public listView:component.UIItemBox;
		public htmlDesc:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.EquipItemUI",Pro.EquipItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Heavens/GodEquip/SuitProjectSave");

        }

    }
}

module ProUI.Heavens.GodEquip {
    export class SuitProjectSelectUI extends Laya.Box {
		public bgMask:component.UIButton;
		public bg:Laya.Image;
		public listView:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Heavens/GodEquip/SuitProjectSelect"], this, this);

        }

    }
}

module ProUI.Heavens.GodEquip {
    export class SuitProjectUseUI extends View {
		public btnClose:component.UIButton;
		public btnConfirm:component.UIButton;
		public btnTodayTips:component.UIButton;
		public imgTodayTips:Laya.Image;
		public listView:component.UIItemBox;
		public htmlDesc:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.EquipItemUI",Pro.EquipItemUI);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Heavens/GodEquip/SuitProjectUse");

        }

    }
}

module ProUI.Heavens {
    export class MainUI extends View {
		public listView:component.UIList;
		public btn_addTimes:component.UIButton;
		public btn_rankView:component.UIButton;
		public btn_help:component.UIButton;
		public btn_back:component.UIButton;
		public btn_godEquipView:component.UIButton;
		public btn_store:component.UIButton;
		public btn_pray:component.UIButton;
		public reddot_pray:Laya.Image;
		public txt_count:component.UILabel;
		public txt_leftCount:component.UIHtmlText;
		public btn_embattle:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Heavens.ChildPage.ChapterGroupItemUI",ProUI.Heavens.ChildPage.ChapterGroupItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Heavens/Main");

        }

    }
}

module ProUI.Heavens.PageView {
    export class ChapterBattleResultUI extends View {
		public boxWin:Laya.Box;
		public txt_rules_1:component.UILabel;
		public img_star_content_1:Laya.Image;
		public txt_rules_2:component.UILabel;
		public img_star_content_2:Laya.Image;
		public txt_rules_3:component.UILabel;
		public img_star_content_3:Laya.Image;
		public itemBox:component.UIItemBox;
		public img_star_Title_2:Laya.Image;
		public img_star_Title_1:Laya.Image;
		public img_star_Title_3:Laya.Image;
		public btnHitDetail:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Heavens/PageView/ChapterBattleResult");

        }

    }
}

module ProUI.Heavens.PageView {
    export class ChapterMap_1UI extends View {
		public path_4:Laya.Box;
		public path_7:Laya.Box;
		public level_1:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_2:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_3:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_4:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_5:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_6:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_7:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_8:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_9:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_10:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public path_1:Laya.Box;
		public path_2:Laya.Box;
		public path_3:Laya.Box;
		public path_5:Laya.Box;
		public path_6:Laya.Box;
		public path_8:Laya.Box;
		public path_9:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ProUI.Heavens.ChildPage.ChapterMapItemUI",ProUI.Heavens.ChildPage.ChapterMapItemUI);

            super.createChildren();
            this.loadUI("Heavens/PageView/ChapterMap_1");

        }

    }
}

module ProUI.Heavens.PageView {
    export class ChapterMap_2UI extends View {
		public path_4:Laya.Box;
		public path_7:Laya.Box;
		public level_1:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_2:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_3:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_4:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_5:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_6:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_7:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_8:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_9:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public level_10:ProUI.Heavens.ChildPage.ChapterMapItemUI;
		public path_1:Laya.Box;
		public path_2:Laya.Box;
		public path_3:Laya.Box;
		public path_5:Laya.Box;
		public path_6:Laya.Box;
		public path_8:Laya.Box;
		public path_9:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ProUI.Heavens.ChildPage.ChapterMapItemUI",ProUI.Heavens.ChildPage.ChapterMapItemUI);

            super.createChildren();
            this.loadUI("Heavens/PageView/ChapterMap_2");

        }

    }
}

module ProUI.Heavens.PageView {
    export class ChapterRewardViewUI extends View {
		public btn_close:component.UIButton;
		public itemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Heavens.ChildPage.ChapterRewardListItemUI",ProUI.Heavens.ChildPage.ChapterRewardListItemUI);

            super.createChildren();
            this.loadUI("Heavens/PageView/ChapterRewardView");

        }

    }
}

module ProUI.Heavens.PageView {
    export class PrayRecordViewUI extends View {
		public btn_close:component.UIButton;
		public listSelf:component.UIList;
		public listServer:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Heavens/PageView/PrayRecordView");

        }

    }
}

module ProUI.Heavens.PageView {
    export class PrayViewUI extends View {
		public awardTextBg:Laya.Image;
		public baoXiang:Laya.Box;
		public btn_close:component.UIButton;
		public btn_left:component.UIButton;
		public btn_right:component.UIButton;
		public btn_detail:component.UIButton;
		public prayOneBox:Laya.HBox;
		public img_costOne:Laya.Image;
		public txt_costOne:component.UILabel;
		public img_costTen:Laya.Image;
		public txt_costTen:component.UILabel;
		public listTips:component.UIList;
		public rewardList:component.UIList;
		public btn_prayOne:component.UIButton;
		public btn_prayTen:component.UIButton;
		public discount:Laya.Image;
		public txt_free:component.UILabel;
		public txt_tips:component.UILabel;
		public txt_statueName:component.UILabel;
		public btn_addItem:component.UIButton;
		public img_item:Laya.Image;
		public txt_leftTimes:component.UIHtmlText;
		public txt_itemCount:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Heavens/PageView/PrayView");

        }

    }
}

module ProUI.Hero.HeroBag {
    export class HeroMaterialSelectUI extends Laya.Box {
		public btnClose:component.UIButton;
		public SureBtn:component.UIButton;
		public btnAutoSelect:component.UIButton;
		public title:component.UILabel;
		public HeroList:component.UIList;
		public SelectProLb:component.UILabel;
		public descLbl:component.UILabel;
		public desc2Lbl:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroBag/HeroMaterialSelect"], this, this);

        }

    }
}

module ProUI.Hero.HeroBag {
    export class HeroOptUI extends View {
		public imgVDraw:Laya.Image;
		public txtName:component.UILabel;
		public btn_opt:component.UIButton;
		public btn_back:component.UIButton;
		public pet_cur:Laya.Image;
		public PetInfo:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Hero/HeroBag/HeroOpt");

        }

    }
}

module ProUI.Hero.HeroBag {
    export class MainUI extends View {
		public aniPos:Laya.Image;
		public scaleBg:Laya.Image;
		public ItemTab:component.UITab;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;
		public HeroZhenxing:component.UIButton;
		public HeroItemList:component.UIList;
		public EmHeroBtn:component.UIButton;
		public imgReddotEmbattle:Laya.Image;
		public BagSpaceBox:Laya.Image;
		public AddSpaceBtn:component.UIButton;
		public BagSpaceLb:component.UILabel;
		public btnIllustration:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UITab",component.UITab);
			View.regComponent("ProUI.Hero.HeroBag.TabItemUI",ProUI.Hero.HeroBag.TabItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroBag/Main");

        }

    }
}

module ProUI.Hero.HeroBag {
    export class TabItemUI extends component.UIButton {
		public BGFrameImg:component.UIFrameImage;
		public IconFrameImg:component.UIFrameImage;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroBag/TabItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroCall.BigShow {
    export class MainUI extends View {
		public footboard:Laya.Image;
		public imgVDraw:Laya.Image;
		public imgBorderFrame:component.UIFrameImage;
		public StarBox:Pro.StarIconBox;
		public imgPetType:component.UIFrameImage;
		public TipsImg:Laya.Image;
		public txtName:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroCall/BigShow/Main");

        }

    }
}

module ProUI.Hero.HeroCall.ExpandResCall {
    export class MainUI extends Laya.Box {
		public CloseBtn:component.UIButton;
		public SureBtn:component.UIButton;
		public TIps1Box:Laya.HBox;
		public CostIconImg:Laya.Image;
		public TIps3Box:Laya.HBox;
		public CostNumLb:component.UILabel;
		public CostBaseLb:component.UILabel;
		public TIps2Box:Laya.HBox;
		public GetNumLb:component.UILabel;
		public GetNameLb:component.UILabel;
		public GetTimesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroCall/ExpandResCall/Main"], this, this);

        }

    }
}

module ProUI.Hero.HeroCall {
    export class ListItemUI extends Laya.Box {
		public BGFrameImg:component.UIFrameImage;
		public BGStatueImg:component.UIFrameImage;
		public BGStatueImg2:component.UIFrameImage;
		public OneCallBtn:component.UIButton;
		public OneCallImg:Laya.Image;
		public OneCallLb:component.UILabel;
		public OneCallFreeLb:component.UILabel;
		public reddotOneCall:Laya.Image;
		public TenCallBtn:component.UIButton;
		public reddotTenCall:Laya.Image;
		public TenCallImg:Laya.Image;
		public TenCallLb:component.UILabel;
		public ZheStatueImg:Laya.Image;
		public LastTimeHtmlTxt:component.UIHtmlText;
		public subDescBox:Laya.Box;
		public txt_callTime:component.UILabel;
		public txt_call:component.UILabel;
		public CallImg:Laya.Image;
		public CallImg2:Laya.Image;
		public CallLb:component.UILabel;
		public CallLb2:component.UILabel;
		public DesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIBitmapText",component.UIBitmapText);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroCall/ListItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroCall {
    export class ListItem1UI extends Laya.Box {
		public BGFrameImg:component.UIFrameImage;
		public LastTimeHtmlTxt:component.UIHtmlText;
		public BGguang:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroCall/ListItem1"], this, this);

        }

    }
}

module ProUI.Hero.HeroCall {
    export class MainUI extends View {
		public skRoleClick:Laya.Box;
		public aniPos:Laya.Image;
		public CloseBtn:component.UIButton;
		public HelpBtn:component.UIButton;
		public ScoreCallImg:Laya.Image;
		public ScoreCallProImg:Laya.Image;
		public ScoreCallBtn:component.UIButton;
		public ScoreCallBtnIcon:Laya.Image;
		public ScoreCallProLb:component.UILabel;
		public ItemList:component.UIList;
		public sayPaoPao:Laya.Box;
		public txtSay:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroCall.ListItemUI",ProUI.Hero.HeroCall.ListItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Hero/HeroCall/Main");

        }

    }
}

module ProUI.Hero.HeroCall {
    export class Main1UI extends View {
		public SkelBg:Laya.Image;
		public HelpBtn:component.UIButton;
		public RecommendBtn:component.UIButton;
		public ScoreCallImg:Laya.Image;
		public ScoreCallProImg:Laya.Image;
		public ScoreCallProLb:component.UILabel;
		public ScoreCallBtn:component.UIButton;
		public ScoreCallBtnIcon:Laya.Image;
		public BGStatueImg2:Laya.Image;
		public CallImg2:Laya.Image;
		public CallLb2:component.UILabel;
		public BGStatueImg:Laya.Image;
		public CallImg:Laya.Image;
		public CallLb:component.UILabel;
		public CardType:component.UIFrameImage;
		public DesLb:component.UILabel;
		public OneCallBtn:component.UIButton;
		public OneCallImg:Laya.Image;
		public OneCallLb:component.UILabel;
		public OneCallFreeLb:component.UILabel;
		public reddotOneCall:Laya.Image;
		public TenCallBtn:component.UIButton;
		public reddotTenCall:Laya.Image;
		public TenCallImg:Laya.Image;
		public TenCallLb:component.UILabel;
		public temp0:ProUI.Hero.HeroCall.ListItem1UI;
		public temp1:ProUI.Hero.HeroCall.ListItem1UI;
		public temp2:ProUI.Hero.HeroCall.ListItem1UI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("ProUI.Hero.HeroCall.ListItem1UI",ProUI.Hero.HeroCall.ListItem1UI);

            super.createChildren();
            this.loadUI("Hero/HeroCall/Main1");

        }

    }
}

module ProUI.Hero.HeroCall.Reward {
    export class MainUI extends View {
		public resultBox:Laya.Box;
		public rewardBg1:Laya.Image;
		public rewardBg2:Laya.Image;
		public aniPosImg:Laya.Image;
		public ItemBox:component.UIList;
		public btnGrpBox:Laya.Box;
		public CallBtn:component.UIButton;
		public CallLb:component.UILabel;
		public CloseBtn:component.UIButton;
		public ItemCostImg:Laya.Image;
		public ItemCostLb:component.UILabel;
		public heroAutoSplitBox:Laya.Box;
		public listHeroSplitItems:component.UIItemBox;
		public imgEff1:Laya.Image;
		public imgEff2:Laya.Image;
		public btnEffMask:component.UIButton;
		public shareBox:Laya.Box;
		public btnShare:component.UIButton;
		public ouLbl:component.UIBitmapText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIBitmapText",component.UIBitmapText);

            super.createChildren();
            this.loadUI("Hero/HeroCall/Reward/Main");

        }

    }
}

module ProUI.Hero.HeroCall.Rule {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public InfoPanel:Laya.Panel;
		public Info_des_1_box:Laya.Box;
		public ruleInfo_des_1_lb:component.UIHtmlText;
		public Info_des_2_box:Laya.Box;
		public ruleInfo_des_2_lb:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Hero/HeroCall/Rule/Main");

        }

    }
}

module ProUI.Hero.HeroCall.Rule {
    export class ruleInfo_lb_itemUI extends Laya.Box {
		public NameLb:component.UILabel;
		public ProbLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroCall/Rule/ruleInfo_lb_item"], this, this);

        }

    }
}

module ProUI.Hero.HeroCall.Rule {
    export class ruleInfo_prob_itemUI extends Laya.Image {
		public DesBtn:component.UIButton;
		public NameLb:component.UILabel;
		public ProbItemBox:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Hero.HeroCall.Rule.ruleInfo_lb_itemUI",ProUI.Hero.HeroCall.Rule.ruleInfo_lb_itemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroCall/Rule/ruleInfo_prob_item"], this, this);

        }

    }
}

module ProUI.Hero.HeroCall.RuleDetail {
    export class MainUI extends View {
		public ItemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroCall/RuleDetail/Main");

        }

    }
}

module ProUI.Hero.HeroCall.ScoreCall {
    export class MainUI extends Laya.Box {
		public SureBtn:component.UIButton;
		public btnClose:component.UIButton;
		public TipsLb:component.UILabel;
		public ItemUI:Pro.NorItemUI;
		public txtVipTips:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroCall/ScoreCall/Main"], this, this);

        }

    }
}

module ProUI.Hero.HeroCall.Share {
    export class MainUI extends View {
		public ouLbl:component.UIBitmapText;
		public nameLbl:component.UILabel;
		public ItemBox:component.UIList;
		public btnMask:component.UIButton;
		public PlayerIconImg:component.UIButton;
		public PlayerIconFrameImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Hero/HeroCall/Share/Main");

        }

    }
}

module ProUI.Hero.HeroCombin {
    export class MainUI extends View {
		public PetPreview:Laya.Box;
		public HelpBtn:component.UIButton;
		public btnClose:component.UIButton;
		public ItemList:component.UIList;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;
		public UpStarInfo:Pro.HeroUpStarLayer;
		public PetTypeImg:Laya.Image;
		public PetViewBtn:component.UIButton;
		public StarBox:Pro.StarIconBox;
		public PetLvLb:component.UILabel;
		public PetAtkLb:component.UILabel;
		public PetDefenseLb:component.UILabel;
		public PetHpLb:component.UILabel;
		public PetSpeedLb:component.UILabel;
		public PetNameLb:component.UILabel;
		public AttentionLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.HeroUpStarLayer",Pro.HeroUpStarLayer);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroCombin/Main");

        }

    }
}

module ProUI.Hero.HeroComment {
    export class ListItemUI extends Laya.Box {
		public HotImg:Laya.Image;
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;
		public LowNumLb:component.UILabel;
		public TopNumLb:component.UILabel;
		public TopBtn:component.UIButton;
		public LowBtn:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroComment/ListItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroComment {
    export class MainUI extends View {
		public LikeBtn:component.UIButton;
		public SendBtn:component.UIButton;
		public ItemUI:Pro.NorItemUI;
		public ItemList:component.UIList;
		public LikeNumLb:component.UILabel;
		public CommentTimesLb:component.UILabel;
		public MsgInput:Laya.TextInput;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroComment.ListItemUI",ProUI.Hero.HeroComment.ListItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroComment/Main");

        }

    }
}

module ProUI.Hero.HeroDataInfo {
    export class AtterExInfoUI extends Laya.Box {
		public GoBtn:component.UIButton;
		public TitleLb:component.UILabel;
		public NumLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDataInfo/AtterExInfo"], this, this);

        }

    }
}

module ProUI.Hero.HeroDataInfo {
    export class GodEquipTotalUI extends View {
		public imgBg:Laya.Image;
		public txtFightPower:component.UILabel;
		public boxAttr:Laya.Box;
		public listAttr:component.UIItemBox;
		public boxSpecial:Laya.Box;
		public txtSkillName:component.UILabel;
		public skillBox:Laya.Box;
		public imgSkillIcon:Laya.Image;
		public txtSkillDesc:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.AttrInfoItemUI",ProUI.Utils.AttrInfoItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroDataInfo/GodEquipTotal");

        }

    }
}

module ProUI.Hero.HeroDataInfo {
    export class MainUI extends View {
		public BGImg:Laya.Image;
		public BaseAtterBox:component.UIItemBox;
		public ExAtterBox:component.UIItemBox;
		public BottomBox:Laya.Box;
		public ZoomBtn:component.UIButton;
		public ZoomStatueImg:Laya.Image;
		public JIaChengBox:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.AttrInfoItem2UI",ProUI.Utils.AttrInfoItem2UI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Hero.HeroDataInfo.AtterExInfoUI",ProUI.Hero.HeroDataInfo.AtterExInfoUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroDataInfo/Main");

        }

    }
}

module ProUI.Hero.HeroDefend {
    export class HeroDefendAdvanceSucViewUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Hero/HeroDefend/HeroDefendAdvanceSucView");

        }

    }
}

module ProUI.Hero.HeroDefend {
    export class HeroDefendAdvanceViewUI extends View {
		public btn_close:component.UIButton;
		public list_ball:component.UIList;
		public list_hero:component.UIList;
		public lbl_slot:component.UILabel;
		public lbl_levelUp1:component.UILabel;
		public lbl_levelUp2:component.UILabel;
		public btn_sure:component.UIButton;
		public btn_cancel:component.UIButton;
		public UpgradeCostBox:component.UIItemBox;
		public list_hero_add:component.UIList;
		public list_ball_add:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Utils.AtterItemInfoUI",ProUI.Utils.AtterItemInfoUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.LongTroopItemUI",ProUI.Utils.LongTroopItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/HeroDefendAdvanceView");

        }

    }
}

module ProUI.Hero.HeroDefend {
    export class HeroDefendBookViewUI extends View {
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;
		public HeroItemList:component.UIList;
		public btn_close:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/HeroDefendBookView");

        }

    }
}

module ProUI.Hero.HeroDefend {
    export class HeroDefendChoiceViewUI extends View {
		public btn_choice:component.UIButton;
		public btn_close:component.UIButton;
		public list_hero:component.UIList;
		public lbl_noHeros:component.UILabel;
		public lbl_noHero:component.UILabel;
		public box_skill:Laya.Box;
		public lbl_des:component.UILabel;
		public itemUI:ProUI.Utils.SkillItemUI;
		public lbl_skilName:component.UILabel;
		public lbl_skillType:component.UILabel;
		public lbl_power:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/HeroDefendChoiceView");

        }

    }
}

module ProUI.Hero.HeroDefend {
    export class HeroDefendLocationSetViewUI extends View {
		public HeroList:component.UIList;
		public btn_plan:component.UIButton;
		public btn_save:component.UIButton;
		public btn_close:component.UIButton;
		public HeroOnStory:component.UIItemBox;
		public HeroOnEff:Laya.Image;
		public HeroDragEff:Pro.HeroDefendLocationSetItem;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.HeroDefendLocationSetItem",Pro.HeroDefendLocationSetItem);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/HeroDefendLocationSetView");

        }

    }
}

module ProUI.Hero.HeroDefend {
    export class HeroDefendPanelUI extends View {
		public img_ball:Laya.Image;
		public btn_locationSet:component.UIButton;
		public itemBox_skill:component.UIItemBox;
		public list_pet:component.UIList;
		public lbl_level:component.UILabel;
		public lbl_rank:component.UILabel;
		public list_ball:component.UIList;
		public list_addAttr:component.UIList;
		public lbl_name:component.UILabel;
		public img_preview:component.UILabel;
		public QABtn:component.UIButton;
		public lbl_power:component.UIBitmapText;
		public img_maxLevel:Laya.Image;
		public box_upgrade:Laya.Box;
		public btn_upgrade:component.UIButton;
		public RedDotImg_upgrade:Laya.Image;
		public lbl_btn_upgrade:component.UILabel;
		public UpgradeCostBox:component.UIItemBox;
		public btn_book:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.HeroDefendSkillItem",Pro.HeroDefendSkillItem);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.HeroDefendHeroItem",Pro.HeroDefendHeroItem);
			View.regComponent("ProUI.Utils.AtterItemInfoUI",ProUI.Utils.AtterItemInfoUI);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("ProUI.Utils.LongTroopItemUI",ProUI.Utils.LongTroopItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/HeroDefendPanel");

        }

    }
}

module ProUI.Hero.HeroDefend {
    export class HeroDefendPlanChoiceViewUI extends View {
		public list_plan:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.HeroDefendPlanChoiceItem",Pro.HeroDefendPlanChoiceItem);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/HeroDefendPlanChoiceView");

        }

    }
}

module ProUI.Hero.HeroDefend {
    export class HeroDefendPlanViewUI extends View {
		public btn_close:component.UIButton;
		public btn_locationSet:component.UIButton;
		public btn_save:component.UIButton;
		public list_plan:component.UIList;
		public loogTroopItem:ProUI.Utils.LongTroopItemUI;
		public HeroOnStory:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.HeroDefendPlanItem",Pro.HeroDefendPlanItem);
			View.regComponent("ProUI.Utils.LongTroopItemUI",ProUI.Utils.LongTroopItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.HeroDefendLocationSetItem",Pro.HeroDefendLocationSetItem);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/HeroDefendPlanView");

        }

    }
}

module ProUI.Hero.HeroDefend {
    export class HeroDefendPreviewViewUI extends View {
		public list:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.HeroDefendPreviewItem",Pro.HeroDefendPreviewItem);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/HeroDefendPreviewView");

        }

    }
}

module ProUI.Hero.HeroDefend.item {
    export class HeroDefendHeroItemUI extends View {
		public img_add:Laya.Image;
		public img_lock:Laya.Image;
		public itemUI:Pro.NorItemUI;
		public RedDotImg:Laya.Image;
		public lbl_name:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/item/HeroDefendHeroItem");

        }

    }
}

module ProUI.Hero.HeroDefend.item {
    export class HeroDefendPanelItemUI extends View {

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/item/HeroDefendPanelItem");

        }

    }
}

module ProUI.Hero.HeroDefend.item {
    export class HeroDefendPlanChoiceItemUI extends View {
		public lbl_name:component.UILabel;
		public btn_choice:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/item/HeroDefendPlanChoiceItem");

        }

    }
}

module ProUI.Hero.HeroDefend.item {
    export class HeroDefendPlanItemUI extends View {
		public lbl_title:component.UILabel;
		public HeroOnStory:component.UIItemBox;
		public btn_used:component.UIButton;
		public btn_open:component.UIButton;
		public IconImg:Laya.Image;
		public lbl_btnOpen:component.UILabel;
		public lbl_des:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.HeroDefendPlanListItem",Pro.HeroDefendPlanListItem);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/item/HeroDefendPlanItem");

        }

    }
}

module ProUI.Hero.HeroDefend.item {
    export class HeroDefendPreviewItemUI extends View {
		public list_ball:component.UIList;
		public list_hero:component.UIList;
		public lbl_rank:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Utils.AtterItemInfo2UI",ProUI.Utils.AtterItemInfo2UI);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/item/HeroDefendPreviewItem");

        }

    }
}

module ProUI.Hero.HeroDefend.item {
    export class HeroDefendSkillItemUI extends View {
		public img_add:Laya.Image;
		public img_lock:Laya.Image;
		public itemUI:ProUI.Utils.SkillItemUI;
		public lbl_name:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroDefend/item/HeroDefendSkillItem");

        }

    }
}

module ProUI.Hero.HeroDetail {
    export class FunLayer0UI extends Laya.Box {
		public DetailBtn:component.UIButton;
		public UpgradeBtn:component.UIButton;
		public UpgradeRedImg:Laya.Image;
		public UpgradeLb:component.UILabel;
		public UpAdvanceBtn:component.UIButton;
		public UpAdvanceRedImg:Laya.Image;
		public AtterInfoBox:Laya.Box;
		public frameJobType:component.UIFrameImage;
		public LvLb:component.UILabel;
		public AtkLb:component.UILabel;
		public DefenceLb:component.UILabel;
		public BloodLb:component.UILabel;
		public SpeedLb:component.UILabel;
		public PetJobLb:component.UILabel;
		public PetDescLb:component.UILabel;
		public AtkLb2:component.UILabel;
		public BloodLb2:component.UILabel;
		public DefenceLb2:component.UILabel;
		public SpeedLb2:component.UILabel;
		public RacialValue:component.UILabel;
		public UpgradeCostBox:component.UIItemBox;
		public SkillBox:component.UIItemBox;
		public StarBox:component.UIItemBox;
		public FullLevelImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.LongTroopItemUI",ProUI.Utils.LongTroopItemUI);
			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/FunLayer0"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail {
    export class FunLayer1UI extends Laya.Box {
		public UpStarInfo:Pro.HeroUpStarLayer;
		public UpType1Box:Laya.Box;
		public UpType1SkillBox:Laya.Box;
		public Type1NextLevelLb:component.UILabel;
		public Type1OldLevelLb:component.UILabel;
		public Type1UpAtterLb:component.UILabel;
		public UpType2Box:Laya.Box;
		public Type2NextLevelLb:component.UILabel;
		public Type2OldLevelLb:component.UILabel;
		public Type2UpAtterLb:component.UILabel;
		public Type2SkillBox:Laya.Box;
		public Type2NextSkillInfo:ProUI.Utils.SkillItemUI;
		public Type2OldSkillInfo:ProUI.Utils.SkillItemUI;
		public CurrentStarBox:Pro.StarIconBox;
		public NextStarBox:Pro.StarIconBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.HeroUpStarLayer",Pro.HeroUpStarLayer);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/FunLayer1"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail {
    export class FunLayer2UI extends Laya.Box {
		public introduceBtn:component.UIButton;
		public PreviewBtn:component.UIButton;
		public ShopBtn:component.UIButton;
		public ItemBox:Laya.Box;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.EquipItemUI",Pro.EquipItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/FunLayer2"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail {
    export class FunLayer3UI extends Laya.Box {
		public ItemBox:Laya.Box;
		public suitActiveBox:Laya.Box;
		public suitBox:Laya.Box;
		public starBox:Laya.Box;
		public btnHelp:component.UIButton;
		public btnShop:component.UIButton;
		public btnPray:component.UIButton;
		public btnBook:component.UIButton;
		public btnSuitMgr:component.UIButton;
		public btnTotalValue:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.EquipItemUI",Pro.EquipItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/FunLayer3"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.Horcrux {
    export class HorcruxItemUI extends component.UIButton {
		public IconImg:Laya.Image;
		public LvImg:Laya.Image;
		public LvLb:component.UILabel;
		public lock:Laya.Image;
		public hope:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/Horcrux/HorcruxItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.Horcrux {
    export class HorcruxSkillCellUI extends Laya.Box {
		public skillDesc:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/Horcrux/HorcruxSkillCell"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.Horcrux {
    export class HorcruxSucceUI extends View {
		public TipsImg:Laya.Image;
		public HorcruxItem:ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI;
		public HorcruxName:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI",ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroDetail/Horcrux/HorcruxSucce");

        }

    }
}

module ProUI.Hero.HeroDetail.Horcrux {
    export class HorcruxUpUI extends View {
		public closeBtn:component.UIButton;
		public upBtn:component.UILabelButton;
		public oldHorcrux:ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI;
		public newHorcrux:ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI;
		public PropIcon0:ProUI.Utils.BattleAttrTypeUI;
		public PropName0:component.UILabel;
		public PropNum0:component.UILabel;
		public PropNumNew0:component.UILabel;
		public PropIcon1:ProUI.Utils.BattleAttrTypeUI;
		public PropName1:component.UILabel;
		public PropNum1:component.UILabel;
		public PropNumNew1:component.UILabel;
		public PropIcon2:ProUI.Utils.BattleAttrTypeUI;
		public PropName2:component.UILabel;
		public PropNum2:component.UILabel;
		public PropNumNew2:component.UILabel;
		public skillLv:component.UILabel;
		public skillDesc:component.UIHtmlText;
		public needItem:Pro.NorItemUI;
		public needItemCount:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI",ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroDetail/Horcrux/HorcruxUp");

        }

    }
}

module ProUI.Hero.HeroDetail.Horcrux {
    export class HorcruxViewUI extends Laya.Image {
		public PropIcon0:ProUI.Utils.BattleAttrTypeUI;
		public PropIcon1:ProUI.Utils.BattleAttrTypeUI;
		public PropIcon2:ProUI.Utils.BattleAttrTypeUI;
		public PropLb0:component.UILabel;
		public PropLb1:component.UILabel;
		public PropLb2:component.UILabel;
		public Horcrux:ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI;
		public helpBtn:component.UIButton;
		public HorcruxDesc:component.UILabel;
		public HorcruxName:component.UILabel;
		public HorcruxScore:component.UIBitmapText;
		public HorcruxAwakeInfo:Laya.Box;
		public needItem:Pro.NorItemUI;
		public awakeBtn:component.UIButton;
		public proLb:component.UILabel;
		public HorcruxSkillDesc:component.UIChat;
		public HorcruxSkillCell:Laya.Box;
		public backdesc:component.UIHtmlText;
		public backdesc1:component.UILabel;
		public HorcruxUpInfo:Laya.Box;
		public upBtn:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI",ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIChat",component.UIChat);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/Horcrux/HorcruxView"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail {
    export class MainUI extends View {
		public IconImg:Laya.Image;
		public DoSomingBox:Laya.Box;
		public EquipBox:Laya.Box;
		public RuneBox:Laya.Box;
		public EquipAutoAllBtn:component.UIButton;
		public EquipAutoAllRedDotImg:Laya.Image;
		public EquipAutoAllLb:component.UILabel;
		public EquipAutoAllLbBox:Laya.HBox;
		public ShareBtn:component.UIButton;
		public LockBtn:component.UIButton;
		public LockOnImg:Laya.Image;
		public LockOffImg:Laya.Image;
		public btnEvolve:component.UIButton;
		public btnRebirth:component.UIButton;
		public btnStarRebirth:component.UIButton;
		public btnLiberate:component.UIButton;
		public Horcrux:ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI;
		public btnAvatarShow:component.UIButton;
		public CollocationBox:Laya.Box;
		public btnPreviewEvolution:component.UIButton;
		public btnReview:component.UIButton;
		public btnMaster:component.UIButton;
		public btnArchives:component.UIButton;
		public archivesRedDot:Laya.Image;
		public tabGrp:component.UITab;
		public FunBox:Pro.TableBarContiner;
		public starBox:Pro.StarIconBox;
		public PetTypeImg:Laya.Image;
		public NameBox:Laya.HBox;
		public NameLB:component.UILabel;
		public ZhanliImg:Laya.Image;
		public ZhanLb:component.UILabel;
		public ShowBtn:component.UIButton;
		public ChatBtn:component.UIButton;
		public ArrowItemUI:Pro.ArrorItemUI;
		public CloseBtn:component.UIButton;
		public upAttrListUI:Pro.UpAttrListUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.EquipItemUI",Pro.EquipItemUI);
			View.regComponent("Pro.UpAttrListUI",Pro.UpAttrListUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI",ProUI.Hero.HeroDetail.Horcrux.HorcruxItemUI);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.ArrorItemUI",Pro.ArrorItemUI);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Hero/HeroDetail/Main");

        }

    }
}

module ProUI.Hero.HeroDetail.Preview {
    export class HeroArchivesUI extends View {
		public CloseBtn:component.UIButton;
		public PetName:component.UILabel;
		public IconImg:Laya.Image;
		public StoryBtn:component.UIButton;
		public EvolutionBtn:component.UIButton;
		public RewardBtn:component.UIButton;
		public rewardItem:Pro.NorItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroDetail/Preview/HeroArchives");

        }

    }
}

module ProUI.Hero.HeroDetail.Preview {
    export class HeroEvolutionPreviewUI extends View {
		public btn_close:component.UIButton;
		public list:component.UIList;
		public roleList:component.UIList;
		public btn_left:component.UIButton;
		public btn_right:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.EvolutionMainViewItem",Pro.EvolutionMainViewItem);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("Pro.EvolutionMainViewSkelItem",Pro.EvolutionMainViewSkelItem);

            super.createChildren();
            this.loadUI("Hero/HeroDetail/Preview/HeroEvolutionPreview");

        }

    }
}

module ProUI.Hero.HeroDetail.Preview {
    export class HeroStoryUI extends View {
		public CloseBtn:component.UIButton;
		public IconImg:Laya.Image;
		public petTypeName:component.UILabel;
		public descName:component.UILabel;
		public petName:component.UILabel;
		public panel:Laya.Panel;
		public story:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Hero/HeroDetail/Preview/HeroStory");

        }

    }
}

module ProUI.Hero.HeroDetail.Rebirth {
    export class HeroHighStarRebornUI extends View {
		public closeBtn:component.UIButton;
		public htmlDes1:component.UIHtmlText;
		public htmlDes2:component.UIHtmlText;
		public tabGrp:component.UITab;
		public heroIcon:Pro.NorItemUI;
		public btnConfirm:component.UIButton;
		public confirmText:component.UILabel;
		public rebirthCount:component.UILabel;
		public highStarCount:Laya.HBox;
		public itemIcon:Laya.Image;
		public itemCount:component.UILabel;
		public hboxFee:Laya.HBox;
		public txtNeedDiamon:component.UILabel;
		public listView:Laya.Panel;
		public heroListView:component.UIItemBox;
		public itemListView:component.UIItemBox;
		public HighStarHeroInfo:Laya.Box;
		public heroIcon1:Pro.NorItemUI;
		public heroIcon2:Pro.NorItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);

            super.createChildren();
            this.loadUI("Hero/HeroDetail/Rebirth/HeroHighStarReborn");

        }

    }
}

module ProUI.Hero.HeroDetail.Rebirth {
    export class HeroRebirthUI extends View {
		public btnClose:component.UIButton;
		public itemListView:component.UIItemBox;
		public btnConfirm:component.UIButton;
		public htmlContent:component.UIHtmlText;
		public htmlCount:component.UIHtmlText;
		public hboxFee:Laya.HBox;
		public txtNeedDiamon:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Hero/HeroDetail/Rebirth/HeroRebirth");

        }

    }
}

module ProUI.Hero.HeroDetail.UpAdvance {
    export class AtterItemUI extends Laya.Box {
		public imgType:ProUI.Utils.BattleAttrTypeUI;
		public NameLb:component.UILabel;
		public CurValueLb:component.UILabel;
		public NextValueLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UpAdvance/AtterItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.UpAdvance {
    export class CostItemUI extends Laya.Box {
		public iconBg:Laya.Image;
		public IconImg:Laya.Image;
		public NumLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UpAdvance/CostItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.UpAdvance {
    export class MainUI extends Laya.Box {
		public btnClose:component.UIButton;
		public SureBtn:component.UIButton;
		public AtterBox:component.UIItemBox;
		public CostBox:component.UIItemBox;
		public SkillInfo:ProUI.Utils.SkillItemUI;
		public HaveSkillBox:Laya.Box;
		public HaveSkillNameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Hero.HeroDetail.UpAdvance.AtterItemUI",ProUI.Hero.HeroDetail.UpAdvance.AtterItemUI);
			View.regComponent("ProUI.Hero.HeroDetail.UpAdvance.CostItemUI",ProUI.Hero.HeroDetail.UpAdvance.CostItemUI);
			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UpAdvance/Main"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.UpStar {
    export class AttrItemUI extends Laya.Box {
		public imgAttrType:ProUI.Utils.BattleAttrTypeUI;
		public txtAttrValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UpStar/AttrItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.UpStar {
    export class FunLayerUpStarUI extends Laya.Box {
		public imgExpProgress:Laya.Image;
		public CurrentStarBox:Pro.StarIconBox;
		public NextStarBox:Pro.StarIconBox;
		public btnAddExp:component.UIButton;
		public btnUpStar:component.UIButton;
		public UpType1Box:Laya.Box;
		public Type1NextLevelLb:component.UILabel;
		public Type1OldLevelLb:component.UILabel;
		public Type1UpAtterLb:component.UILabel;
		public imgNeedItemIcon:Laya.Image;
		public norItemHero:Pro.NorItemUI;
		public listAddAttr:component.UIItemBox;
		public txtNeedItemCount:component.UILabel;
		public txtExpProgress:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.Hero.HeroDetail.UpStar.AttrItemUI",ProUI.Hero.HeroDetail.UpStar.AttrItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UpStar/FunLayerUpStar"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.UpStar {
    export class UpStarLayerUI extends Laya.Box {
		public UpStarBox:Laya.Box;
		public UpStarBtn:component.UIButton;
		public UpStarLb:component.UILabel;
		public imgUpStarReddot:Laya.Image;
		public UpStarNeedItemBox:Laya.HBox;
		public UpStarIconImg:Laya.Image;
		public UpStarNeedLb:component.UILabel;
		public CostItemBox:component.UIItemBox;
		public btnAuto:component.UIButton;
		public autoFlag:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Hero.HeroDetail.UpAdvance.CostItemUI",ProUI.Hero.HeroDetail.UpAdvance.CostItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UpStar/UpStarLayer"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.UseTalent {
    export class SelectInfoUI extends Laya.Box {
		public SureBtn:component.UIButton;
		public ItemList:component.UIList;
		public ItemSelectImg:Laya.Image;
		public CostBox:component.UIItemBox;
		public SelectItemUI:ProUI.Hero.HeroDetail.UseTalent.TalentLongItemUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroDetail.UseTalent.TalentItemUI",ProUI.Hero.HeroDetail.UseTalent.TalentItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.Hero.HeroDetail.UseTalent.TalentLongItemUI",ProUI.Hero.HeroDetail.UseTalent.TalentLongItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UseTalent/SelectInfo"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.UseTalent {
    export class TalentCostItemUI extends component.UIButton {
		public ani1:Laya.FrameAnimation;
		public IconImg:Laya.Image;
		public NumLb:component.UILabel;
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UseTalent/TalentCostItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.UseTalent {
    export class TalentItemUI extends component.UIButton {
		public ani1:Laya.FrameAnimation;
		public QuImg:Laya.Image;
		public IconImg:Laya.Image;
		public NameLb:component.UILabel;
		public boxCanLearn:Laya.Image;
		public boxRecommend:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UseTalent/TalentItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.UseTalent {
    export class TalentLongItemUI extends Laya.Image {
		public BGImg:Laya.Image;
		public IconImg:Laya.Image;
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UseTalent/TalentLongItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroDetail.UseTalent {
    export class UpgradeInfoUI extends Laya.Box {
		public UpgradeBtn:component.UIButton;
		public RemoveBtn:component.UIButton;
		public CurrentItemUI:ProUI.Hero.HeroDetail.UseTalent.TalentLongItemUI;
		public upgradeBox:Laya.Box;
		public NextItemUI:ProUI.Hero.HeroDetail.UseTalent.TalentLongItemUI;
		public CostBox:component.UIItemBox;
		public maxLvBox:Laya.Box;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Hero.HeroDetail.UseTalent.TalentLongItemUI",ProUI.Hero.HeroDetail.UseTalent.TalentLongItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Hero.HeroDetail.UseTalent.TalentCostItemUI",ProUI.Hero.HeroDetail.UseTalent.TalentCostItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroDetail/UseTalent/UpgradeInfo"], this, this);

        }

    }
}

module ProUI.Hero.HeroEquip.GodEquipSell {
    export class GodEquipSellUI extends View {
		public btnClose:component.UIButton;
		public norItem:Pro.NorItemUI;
		public btnCancel:component.UIButton;
		public btnConfirm:component.UIButton;
		public htmlContent:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Hero/HeroEquip/GodEquipSell/GodEquipSell");

        }

    }
}

module ProUI.Hero.HeroEquip.Suit {
    export class AtterItemUI extends Laya.Box {
		public TypeImg:ProUI.Utils.BattleAttrTypeUI;
		public hbox:Laya.HBox;
		public TitleLb:component.UILabel;
		public NumLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroEquip/Suit/AtterItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroEquip.Suit {
    export class ListEquipItemUI extends Laya.Image {
		public EquipInfo:Pro.NorItemUI;
		public AtterBox:component.UIItemBox;
		public FunBtn:component.UIButton;
		public FunLb:component.UILabel;
		public EquipNameLb:component.UILabel;
		public EquipLvLb:component.UILabel;
		public EquipScoreLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Hero.HeroEquip.Suit.AtterItemUI",ProUI.Hero.HeroEquip.Suit.AtterItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroEquip/Suit/ListEquipItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroEquip.Suit {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public title:component.UIHtmlText;
		public ItemList:component.UIList;
		public InEquipItem:ProUI.Hero.HeroEquip.Suit.ListEquipItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroEquip.Suit.ListEquipItemUI",ProUI.Hero.HeroEquip.Suit.ListEquipItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroEquip/Suit/Main");

        }

    }
}

module ProUI.Hero.HeroEquip.SuitGod {
    export class ListEquipItemUI extends Laya.Image {
		public EquipInfo:Pro.NorItemUI;
		public FunBtn:component.UIButton;
		public FunLb:component.UILabel;
		public EquipNameLb:component.UILabel;
		public txtValueBase:component.UILabel;
		public txtValueRand:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroEquip/SuitGod/ListEquipItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroEquip.SuitGod {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public ItemList:component.UIList;
		public InEquipItem:ProUI.Hero.HeroEquip.SuitGod.ListEquipItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroEquip.SuitGod.ListEquipItemUI",ProUI.Hero.HeroEquip.SuitGod.ListEquipItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroEquip/SuitGod/Main");

        }

    }
}

module ProUI.Hero.HeroEquip.SuitRune {
    export class ListEquipItemUI extends Laya.Image {
		public EquipInfo:Pro.NorItemUI;
		public FunBtn:component.UIButton;
		public FunLb:component.UILabel;
		public AtterBox:component.UIItemBox;
		public SkillBox:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Hero.HeroEquip.Suit.AtterItemUI",ProUI.Hero.HeroEquip.Suit.AtterItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroEquip/SuitRune/ListEquipItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroEquip.SuitRune {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public ItemList:component.UIList;
		public InEquipItem:ProUI.Hero.HeroEquip.SuitRune.ListEquipItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroEquip.SuitRune.ListEquipItemUI",ProUI.Hero.HeroEquip.SuitRune.ListEquipItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroEquip/SuitRune/Main");

        }

    }
}

module ProUI.Hero.HeroExchange.Call {
    export class CallRewardUI extends View {
		public aniPosImg:Laya.Image;
		public RewardList:component.UIList;
		public btnAgain:component.UIButton;
		public txtAgainLabel:component.UILabel;
		public btnClose:component.UIButton;
		public imgNeedIcon:Laya.Image;
		public txtNeedCount:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroExchange/Call/CallReward");

        }

    }
}

module ProUI.Hero.HeroExchange.Call {
    export class MainUI extends Laya.Box {
		public skRoleClick:Laya.Box;
		public aniPos:Laya.Image;
		public selectEffNodeParent:Laya.Box;
		public CallBox:Laya.Box;
		public btnOneCall:component.UIButton;
		public reddotOneBtn:Laya.Image;
		public hboxOneCall:Laya.HBox;
		public iconOneCall:Laya.Image;
		public txtOneCallLabel:component.UILabel;
		public btnTenCall:component.UIButton;
		public reddotTenCall:Laya.Image;
		public hboxTenCall:Laya.HBox;
		public iconTenCall:Laya.Image;
		public txtTenCallLabel:component.UILabel;
		public sayPaoPao:Laya.Box;
		public txtSay:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroExchange/Call/Main"], this, this);

        }

    }
}

module ProUI.Hero.HeroExchange.DreamPoints {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public imgResNum:Laya.Image;
		public ResNumLb:component.UILabel;
		public btnOneCall:component.UIButton;
		public introduceLb:component.UIHtmlText;
		public CallBox:Laya.Box;
		public ImageBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Hero/HeroExchange/DreamPoints/Main");

        }

    }
}

module ProUI.Hero.HeroExchange {
    export class MainUI extends View {
		public FunBox:Pro.TableBarContiner;
		public CloseBtn:component.UIButton;
		public ShuiJIngImg:Laya.Image;
		public JInghuaImg:Laya.Image;
		public JieJingImg:Laya.Image;
		public ShuiJIngLb:component.UILabel;
		public JInghuaLb:component.UILabel;
		public JieJingLb:component.UILabel;
		public HelpBtn:component.UIButton;
		public ItemTab:Pro.UITabExtend;
		public ShopBtn:component.UIButton;
		public RedDotImg:Laya.Image;
		public DreamPointsBtn:component.UIButton;
		public PointsImg:Laya.Image;
		public PointsLabe:component.UILabel;
		public integraRedDotImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);

            super.createChildren();
            this.loadUI("Hero/HeroExchange/Main");

        }

    }
}

module ProUI.Hero.HeroExchange.Reward {
    export class MainUI extends View {
		public ItemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroExchange/Reward/Main");

        }

    }
}

module ProUI.Hero.HeroExchange.Shop {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public ResIconImg:Laya.Image;
		public ResNumLb:component.UILabel;
		public ItemList:component.UIList;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.ShopItemView",Pro.ShopItemView);
			View.regComponent("UIItemBox",component.UIItemBox);

            super.createChildren();
            this.loadUI("Hero/HeroExchange/Shop/Main");

        }

    }
}

module ProUI.Hero.HeroExchange.Switch {
    export class MainUI extends Laya.Box {
		public SelectRoleItem:ProUI.Hero.HeroExchange.Switch.RoleItemUI;
		public NewRoleItem:ProUI.Hero.HeroExchange.Switch.RoleItemUI;
		public heroSelView:Laya.Box;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;
		public ItemList:component.UIList;
		public CancelBtn:component.UIButton;
		public SaveBtn:component.UIButton;
		public SureBtn:component.UIButton;
		public hboxSureBtn:Laya.HBox;
		public SureNeedIconImg:Laya.Image;
		public SureNeedNumLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Hero.HeroExchange.Switch.RoleItemUI",ProUI.Hero.HeroExchange.Switch.RoleItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroExchange/Switch/Main"], this, this);

        }

    }
}

module ProUI.Hero.HeroExchange.Switch {
    export class RoleItemUI extends Laya.Box {
		public PreView:Laya.Box;
		public effPos:Laya.Box;
		public BaseInfo:Laya.Box;
		public StarBox:Pro.StarIconBox;
		public hboxName:Laya.HBox;
		public HeroTypeImg:Laya.Image;
		public NameLb:component.UILabel;
		public LvLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroExchange/Switch/RoleItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroHoly {
    export class FunLayer0UI extends Laya.Box {
		public ExpProImg:Laya.Image;
		public SureBtn:component.UIButton;
		public imgRed:Laya.Image;
		public AtterBox:component.UIItemBox;
		public CostBox:component.UIItemBox;
		public ExpProLb:component.UILabel;
		public CostTipsLb:component.UILabel;
		public LvLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.AtterItemInfoUI",ProUI.Utils.AtterItemInfoUI);
			View.regComponent("ProUI.Hero.HeroDetail.UpAdvance.CostItemUI",ProUI.Hero.HeroDetail.UpAdvance.CostItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroHoly/FunLayer0"], this, this);

        }

    }
}

module ProUI.Hero.HeroHoly {
    export class FunLayer1UI extends Laya.Box {
		public AdvanceInfoBtn:component.UIButton;
		public StarBox:component.UIItemBox;
		public SkillBox:component.UIItemBox;
		public LockLb:component.UILabel;
		public img_arrow:Laya.Image;
		public UpAdvanceLayer:Laya.Box;
		public btnUp:component.UIButton;
		public hboxUpBtn:Laya.HBox;
		public imgIconNeed:Laya.Image;
		public txtUpLabel:component.UILabel;
		public imgReddotUp:Laya.Image;
		public selectHeroBox:Pro.HeroSelectBoxUI;
		public imgUpNeedItem:Laya.Image;
		public txtUpNeeditem:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);
			View.regComponent("Pro.HeroSelectBoxUI",Pro.HeroSelectBoxUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroHoly/FunLayer1"], this, this);

        }

    }
}

module ProUI.Hero.HeroHoly {
    export class FunLayerLockUI extends Laya.Box {
		public btnUnlock:component.UIButton;
		public Des1Lb:component.UILabel;
		public Des2Lb:component.UILabel;
		public selectHeroBox:Pro.HeroSelectBoxUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.HeroSelectBoxUI",Pro.HeroSelectBoxUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroHoly/FunLayerLock"], this, this);

        }

    }
}

module ProUI.Hero.HeroHoly {
    export class HeroSelectBoxUI extends Laya.Box {
		public norItem:Pro.NorItemUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroHoly/HeroSelectBox"], this, this);

        }

    }
}

module ProUI.Hero.HeroHoly {
    export class HolyReviewUI extends View {
		public img_icon:Laya.Image;
		public txt_name:component.UILabel;
		public TypeNameLb:component.UILabel;
		public itemBox:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Hero/HeroHoly/HolyReview");

        }

    }
}

module ProUI.Hero.HeroHoly {
    export class MainUI extends Laya.Box {
		public StoryBtn:component.UIButton;
		public IconImg:Laya.Image;
		public QABtn:component.UIButton;
		public btnBuyGift:component.UIButton;
		public effBuyGift:ProUI.Ani.efc.NodeWaggleUI;
		public TypeBox:component.UIItemBox;
		public TypeSelectImg:Laya.Image;
		public tabGrp:component.UITab;
		public AtterBox:component.UIItemBox;
		public ArrowItemUI:Pro.ArrorItemUI;
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;
		public FunBox:Pro.TableBarContiner;
		public upAttrListUI:Pro.UpAttrListUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Ani.efc.NodeWaggleUI",ProUI.Ani.efc.NodeWaggleUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Utils.AtterItemInfoUI",ProUI.Utils.AtterItemInfoUI);
			View.regComponent("Pro.ArrorItemUI",Pro.ArrorItemUI);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);
			View.regComponent("Pro.UpAttrListUI",Pro.UpAttrListUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroHoly/Main"], this, this);

        }

    }
}

module ProUI.Hero.HeroHolyInfo {
    export class ListItemUI extends Laya.Box {
		public img_currentBg:Laya.Image;
		public AtterBox:component.UIItemBox;
		public NameLb:component.UILabel;
		public img_current:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroHolyInfo/ListItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroHolyInfo {
    export class MainUI extends View {
		public ItemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroHolyInfo.ListItemUI",ProUI.Hero.HeroHolyInfo.ListItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroHolyInfo/Main");

        }

    }
}

module ProUI.Hero.HeroIllustration {
    export class AchieveUI extends View {
		public closeBtn:component.UIButton;
		public list:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroIllustration.AchieveItemUI",ProUI.Hero.HeroIllustration.AchieveItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroIllustration/Achieve");

        }

    }
}

module ProUI.Hero.HeroIllustration {
    export class AchieveItemUI extends Laya.Box {
		public ProgressInfo:Laya.Image;
		public ProgressImg:Laya.Image;
		public ProgressLb:component.UILabel;
		public GoBtn:component.UIButton;
		public RewardBtn:component.UIButton;
		public RewardBox:component.UIItemBox;
		public NameLb:component.UILabel;
		public FinishImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroIllustration/AchieveItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroIllustration {
    export class AttrUI extends View {
		public closeBtn:component.UIButton;
		public ProImg:Laya.Image;
		public real1:Laya.Sprite;
		public real2:Laya.Sprite;
		public real3:Laya.Sprite;
		public real4:Laya.Sprite;
		public giftBox0:Laya.Box;
		public giftBox1:Laya.Box;
		public giftBox2:Laya.Box;
		public giftBox3:Laya.Box;
		public giftBox4:Laya.Box;
		public giftBox5:Laya.Box;
		public box1:Laya.Box;
		public attrList:component.UIList;
		public box2:Laya.Box;
		public trammelList:component.UIList;
		public powerLbl:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Artifact.ShengyinInfo.AttrItemUI",ProUI.Artifact.ShengyinInfo.AttrItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroIllustration/Attr");

        }

    }
}

module ProUI.Hero.HeroIllustration {
    export class AttrItemUI extends Laya.Box {
		public RewardBox:component.UIItemBox;
		public AttrLbl:component.UILabel;
		public activeLbl:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroIllustration/AttrItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroIllustration {
    export class DownPetUI extends View {
		public closeBtn:component.UIButton;
		public downBtn:component.UILabelButton;
		public attrLbl:component.UILabel;
		public card:ProUI.Hero.HeroIllustration.ListItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("ProUI.Hero.HeroIllustration.ListItemUI",ProUI.Hero.HeroIllustration.ListItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroIllustration/DownPet");

        }

    }
}

module ProUI.Hero.HeroIllustration {
    export class ListItemUI extends Laya.Box {
		public colorBg:Laya.Image;
		public icon:Laya.Image;
		public petTypeIcon:component.UIFrameImage;
		public nameLbl:component.UILabel;
		public blackMask:Laya.Image;
		public flagImg:component.UIFrameImage;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroIllustration/ListItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroIllustration {
    export class MainUI extends View {
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;
		public list:component.UIList;
		public activeLbl:component.UILabel;
		public attrBtn:component.UILabelButton;
		public attrRedDot:Laya.Image;
		public achieveBtn:component.UILabelButton;
		public achieveRedDot:Laya.Image;
		public trammelBtn:component.UILabelButton;
		public helpBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroIllustration.ListItemUI",ProUI.Hero.HeroIllustration.ListItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UILabelButton",component.UILabelButton);

            super.createChildren();
            this.loadUI("Hero/HeroIllustration/Main");

        }

    }
}

module ProUI.Hero.HeroIllustration {
    export class TrammelUI extends View {
		public closeBtn:component.UIButton;
		public list:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroIllustration.TrammelItemUI",ProUI.Hero.HeroIllustration.TrammelItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroIllustration/Trammel");

        }

    }
}

module ProUI.Hero.HeroIllustration {
    export class TrammelItemUI extends Laya.Box {
		public RewardBox:component.UIItemBox;
		public nameLbl:component.UILabel;
		public AttrLbl:component.UILabel;
		public activeLbl:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroIllustration/TrammelItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroIllustration {
    export class UpPetUI extends View {
		public closeBtn:component.UIButton;
		public card:ProUI.Hero.HeroIllustration.ListItemUI;
		public upBtn:component.UILabelButton;
		public list:component.UIList;
		public attrLbl:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Hero.HeroIllustration.ListItemUI",ProUI.Hero.HeroIllustration.ListItemUI);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroIllustration/UpPet");

        }

    }
}

module ProUI.Hero.HeroLibrary.Detail {
    export class MainUI extends View {
		public PetVDrawImg:Laya.Image;
		public InfoBox:Laya.Box;
		public ShareBtn:component.UIButton;
		public StroyBtn:component.UIButton;
		public DetailBtn:component.UIButton;
		public CloseBtn:component.UIButton;
		public SkillBox:component.UIItemBox;
		public TitleNameLb:component.UILabel;
		public NameLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroLibrary/Detail/Main");

        }

    }
}

module ProUI.Hero.HeroLibrary.Library {
    export class MainUI extends View {
		public ItemTableView:component.UITableView;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;
		public CloseBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UITableView",component.UITableView);
			View.regComponent("ProUI.Hero.HeroLibrary.Library.TableItem.HeadUI",ProUI.Hero.HeroLibrary.Library.TableItem.HeadUI);
			View.regComponent("ProUI.Hero.HeroLibrary.Library.TableItem.CellUI",ProUI.Hero.HeroLibrary.Library.TableItem.CellUI);
			View.regComponent("ProUI.Hero.HeroLibrary.Library.TableItem.FootUI",ProUI.Hero.HeroLibrary.Library.TableItem.FootUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroLibrary/Library/Main");

        }

    }
}

module ProUI.Hero.HeroLibrary.Library {
    export class PetCardItemUI extends component.UIButton {
		public PetTypeImg:Laya.Image;
		public PetNameBox:Laya.HBox;
		public frameJobType:component.UIFrameImage;
		public PetNameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroLibrary/Library/PetCardItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroLibrary.Library.TableItem {
    export class CellUI extends Laya.Box {

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Hero.HeroLibrary.Library.PetCardItemUI",ProUI.Hero.HeroLibrary.Library.PetCardItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroLibrary/Library/TableItem/Cell"], this, this);

        }

    }
}

module ProUI.Hero.HeroLibrary.Library.TableItem {
    export class FootUI extends Laya.Box {

        constructor(){ super();this.createUI();}
        createUI():void {
        
            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroLibrary/Library/TableItem/Foot"], this, this);

        }

    }
}

module ProUI.Hero.HeroLibrary.Library.TableItem {
    export class HeadUI extends Laya.Box {
		public frameJobType:component.UIFrameImage;
		public PetNameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroLibrary/Library/TableItem/Head"], this, this);

        }

    }
}

module ProUI.Hero.HeroLibrary.Story {
    export class MainUI extends View {
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroLibrary/Story/Main");

        }

    }
}

module ProUI.Hero.HeroLibrary.VDraw {
    export class MainUI extends View {
		public MapLayer:Laya.Box;
		public PetVDrawImg:Laya.Image;
		public imgBg:Laya.Image;
		public btnRight:component.UIButton;
		public btnLeft:component.UIButton;
		public btnRoll:component.UIButton;
		public BackBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Hero/HeroLibrary/VDraw/Main");

        }

    }
}

module ProUI.Hero.HeroLibrary.VDraw {
    export class VDrawScrollBarUI extends Laya.Box {
		public imgBg:Laya.Image;
		public imgProgress:Laya.Image;
		public btnRight:component.UIButton;
		public btnLeft:component.UIButton;
		public btnRoll:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.HsliderScrollBar",Pro.HsliderScrollBar);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroLibrary/VDraw/VDrawScrollBar"], this, this);

        }

    }
}

module ProUI.Hero.HeroResonance {
    export class HeroResonanceUI extends View {
		public centerBox:Laya.Box;
		public levelBox:Laya.Box;
		public levelList:component.UIList;
		public sp4:Laya.Box;
		public lbllv4:component.UILabel;
		public sp5:Laya.Box;
		public lbllv5:component.UILabel;
		public sp2:Laya.Box;
		public lbllv2:component.UILabel;
		public sp3:Laya.Box;
		public lbllv3:component.UILabel;
		public sp1:Laya.Box;
		public lbllv1:component.UILabel;
		public itemClick:Laya.Image;
		public lblMaterial:component.UILabel;
		public imgMaterial:Laya.Image;
		public btnAddMaterial:component.UIButton;
		public starBox:Laya.Box;
		public noBox:Laya.Box;
		public lblStarDesc:component.UILabel;
		public optionBox:Laya.Box;
		public notMaxBox:Laya.Box;
		public newItem:Pro.NorItemUI;
		public oldItem:Pro.NorItemUI;
		public imgMax:Laya.Image;
		public btnDown:component.UIButton;
		public btnResonance2:component.UIButton;
		public currentPet:Pro.NorItemUI;
		public StarBox:Pro.StarIconBox;
		public starList:component.UIList;
		public tabGrpOption:component.UITab;
		public lblGridCout:component.UILabel;
		public btnClose:component.UIButton;
		public btnHelp:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroResonance.HeroResonanceItemUI",ProUI.Hero.HeroResonance.HeroResonanceItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UITab",component.UITab);

            super.createChildren();
            this.loadUI("Hero/HeroResonance/HeroResonance");

        }

    }
}

module ProUI.Hero.HeroResonance {
    export class HeroResonanceDownUI extends View {
		public btnSure:component.UIButton;
		public btnCancel:component.UIButton;
		public currentPet:Pro.NorItemUI;
		public toPet:Pro.NorItemUI;
		public lblDesc:component.UILabel;
		public lblStarDesc:component.UILabel;
		public lblCurLv:component.UILabel;
		public lblToLv:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroResonance/HeroResonanceDown");

        }

    }
}

module ProUI.Hero.HeroResonance {
    export class HeroResonanceItemUI extends View {
		public btn:component.UIButton;
		public imgLock:Laya.Image;
		public imgAdd:Laya.Image;
		public item:Pro.NorItemUI;
		public imgState:component.UIFrameImage;
		public imgMask:Laya.Image;
		public lblCdDesc:component.UILabel;
		public lblCDTime:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroResonance/HeroResonanceItem");

        }

    }
}

module ProUI.Hero.HeroResonance {
    export class HeroResonanceResultUI extends View {
		public imgTitle:Laya.Image;
		public pet:Pro.NorItemUI;
		public lblName:component.UILabel;
		public resonance1Box:Laya.Box;
		public lblOldLv:component.UILabel;
		public lblNewLv:component.UILabel;
		public resonance2Box:Laya.Box;
		public StarBoxOld:Pro.StarIconBox;
		public StarBoxNew:Pro.StarIconBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            super.createChildren();
            this.loadUI("Hero/HeroResonance/HeroResonanceResult");

        }

    }
}

module ProUI.Hero.HeroResonance {
    export class HeroResonanceSelectUI extends View {
		public list:component.UIList;
		public btnStage:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Hero/HeroResonance/HeroResonanceSelect");

        }

    }
}

module ProUI.Hero.HeroSplit {
    export class MainUI extends View {
		public skRoleClick:Laya.Box;
		public BtnClose:component.UIButton;
		public ItemList:component.UIList;
		public boxHeroPage:Laya.Box;
		public SplitCherkBtn:component.UIButton;
		public QuickSelectBtn:component.UIButton;
		public reddotQuickSelect:Laya.Image;
		public btnAutoSplit:component.UIButton;
		public imgAutoSplitNoSelect:Laya.Image;
		public imgAutoSplitSelect:Laya.Image;
		public txtHeroSelect:component.UILabel;
		public comboBox:Laya.Box;
		public comboBoxBtn:component.UIButton;
		public comboBoxBtnLable:component.UILabel;
		public comboBoxListView:Laya.Image;
		public btnComboboxMask:component.UIButton;
		public comboBoxList:component.UIItemBox;
		public boxSpinPage:Laya.Box;
		public NumChoiceBox:Laya.Box;
		public NumCutBtn:component.UIButton;
		public NumPlusBtn:component.UIButton;
		public NumMaxBtn:component.UIButton;
		public NumLb:Laya.TextInput;
		public SplitBtn:component.UIButton;
		public SplitLb:component.UILabel;
		public HelpBtn:component.UIButton;
		public ShopBtn:component.UIButton;
		public ItemTab:Pro.UITabExtend;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;
		public sayPaoPao:Laya.Box;
		public txtSay:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",Laya.Skeleton);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Hero/HeroSplit/Main");

        }

    }
}

module ProUI.Hero.HeroSplit.SplitInfo {
    export class MainUI extends View {
		public bgbox:Laya.Box;
		public TitleLb:component.UILabel;
		public CancelBtn:component.UIButton;
		public SureSplitBtn:component.UIButton;
		public SureBtn:component.UIButton;
		public DesLb:component.UIHtmlText;
		public RewardBox:component.UIList;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroSplit/SplitInfo/Main");

        }

    }
}

module ProUI.Hero.HeroStronger {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public tabGrp:component.UITab;
		public FunBox:Pro.TableBarContiner;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Hero/HeroStronger/Main");

        }

    }
}

module ProUI.Hero.HeroStronger.Question {
    export class MainUI extends Laya.Box {
		public ItemTableView:component.UITableView;
		public CalaHtml:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UITableView",component.UITableView);
			View.regComponent("ProUI.Hero.HeroStronger.Question.TableHeadUI",ProUI.Hero.HeroStronger.Question.TableHeadUI);
			View.regComponent("ProUI.Hero.HeroStronger.Question.TableCellUI",ProUI.Hero.HeroStronger.Question.TableCellUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/Question/Main"], this, this);

        }

    }
}

module ProUI.Hero.HeroStronger.Question {
    export class TableCellUI extends Laya.Box {
		public htmlDes:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/Question/TableCell"], this, this);

        }

    }
}

module ProUI.Hero.HeroStronger.Question {
    export class TableHeadUI extends Laya.Box {
		public FunBtn:component.UIButton;
		public FunLb:component.UILabel;
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/Question/TableHead"], this, this);

        }

    }
}

module ProUI.Hero.HeroStronger.ResGain {
    export class MainUI extends Laya.Box {
		public ItemTableView:component.UITableView;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UITableView",component.UITableView);
			View.regComponent("ProUI.Hero.HeroStronger.ResGain.TableHeadUI",ProUI.Hero.HeroStronger.ResGain.TableHeadUI);
			View.regComponent("ProUI.Hero.HeroStronger.ResGain.TableCellUI",ProUI.Hero.HeroStronger.ResGain.TableCellUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/ResGain/Main"], this, this);

        }

    }
}

module ProUI.Hero.HeroStronger.ResGain {
    export class TableCellUI extends Laya.Box {
		public GoBtn:component.UIButton;
		public ItemInfo:Pro.NorItemUI;
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/ResGain/TableCell"], this, this);

        }

    }
}

module ProUI.Hero.HeroStronger.ResGain {
    export class TableHeadUI extends Laya.Box {
		public FunBtn:component.UIButton;
		public FunLb:component.UILabel;
		public ItemInfo:Pro.NorItemUI;
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/ResGain/TableHead"], this, this);

        }

    }
}

module ProUI.Hero.HeroStronger.Stronger {
    export class ListItemUI extends Laya.Image {
		public ScoreProImg:Laya.Image;
		public GoBtn:component.UIButton;
		public frameImgIcon:component.UIFrameImage;
		public NameLb:component.UILabel;
		public ScoreNunLb:component.UILabel;
		public DesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/Stronger/ListItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroStronger.Stronger {
    export class MainUI extends Laya.Box {
		public SelectInfoImg:Laya.Image;
		public SelectInfoProImg:Laya.Image;
		public SelectInfoNameLb:component.UILabel;
		public SelectInfoProNumLb:component.UILabel;
		public PetItemBox:component.UIItemBox;
		public ItemSelectImg:Laya.Image;
		public ItemLIst:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroStronger.Stronger.ListItemUI",ProUI.Hero.HeroStronger.Stronger.ListItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/Stronger/Main"], this, this);

        }

    }
}

module ProUI.Hero.HeroStronger.TeamCommand {
    export class MainUI extends Laya.Box {
		public ItemTableView:component.UITableView;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UITableView",component.UITableView);
			View.regComponent("ProUI.Hero.HeroStronger.TeamCommand.TableHeadUI",ProUI.Hero.HeroStronger.TeamCommand.TableHeadUI);
			View.regComponent("ProUI.Hero.HeroStronger.TeamCommand.TableCellUI",ProUI.Hero.HeroStronger.TeamCommand.TableCellUI);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/TeamCommand/Main"], this, this);

        }

    }
}

module ProUI.Hero.HeroStronger.TeamCommand {
    export class TableCellUI extends Laya.Box {
		public htmlDes:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/TeamCommand/TableCell"], this, this);

        }

    }
}

module ProUI.Hero.HeroStronger.TeamCommand {
    export class TableHeadUI extends Laya.Box {
		public FunBtn:component.UIButton;
		public PetItemBox:component.UIItemBox;
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroStronger/TeamCommand/TableHead"], this, this);

        }

    }
}

module ProUI.Hero.HeroUpSuc {
    export class HeroNewSkillUI extends View {
		public bg:Laya.Box;
		public TipsImg:Laya.Image;
		public effNodePos:Laya.Box;
		public imgDesBg:Laya.Image;
		public iconBg:Laya.Image;
		public icon:Laya.Image;
		public txtName:component.UILabel;
		public txtDes:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroUpSuc/HeroNewSkill");

        }

    }
}

module ProUI.Hero.HeroUpSuc {
    export class HeroUpAdvanceSucUI extends View {
		public TipsImg:Laya.Image;
		public norItem:Pro.NorItemUI;
		public starList:component.UIItemBox;
		public listView:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("ProUI.Hero.HeroUpSuc.HeroUpSucAttrItemUI",ProUI.Hero.HeroUpSuc.HeroUpSucAttrItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroUpSuc/HeroUpAdvanceSuc");

        }

    }
}

module ProUI.Hero.HeroUpSuc {
    export class HeroUpStarSucUI extends View {
		public TipsImg:Laya.Image;
		public norItemOld:Pro.NorItemUI;
		public norItemNew:Pro.NorItemUI;
		public listViewAttr:component.UIItemBox;
		public listViewSkills:component.UIItemBox;
		public upSkillView:Laya.Box;
		public upSkill1:ProUI.Utils.SkillItemUI;
		public upSkill2:ProUI.Utils.SkillItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Hero.HeroUpSuc.HeroUpSucAttrItemUI",ProUI.Hero.HeroUpSuc.HeroUpSucAttrItemUI);
			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroUpSuc/HeroUpStarSuc");

        }

    }
}

module ProUI.Hero.HeroUpSuc {
    export class HeroUpSucAttrItemUI extends Laya.Image {
		public txtOldValue:component.UILabel;
		public txtNewValue:component.UILabel;
		public txtOldValueSub:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroUpSuc/HeroUpSucAttrItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroUpSuc {
    export class HolyActiveUI extends View {
		public bg:Laya.Box;
		public effNodePos:Laya.Box;
		public TipsImg:Laya.Image;
		public iconBg:Laya.Image;
		public icon:Laya.Image;
		public txtName:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroUpSuc/HolyActive");

        }

    }
}

module ProUI.Hero.HeroUpSuc {
    export class HolyUpAdvanceUI extends View {
		public bg:Laya.Box;
		public effNodePos:Laya.Box;
		public TipsImg:Laya.Image;
		public iconBg:Laya.Image;
		public icon:Laya.Image;
		public txtName:component.UILabel;
		public listAttr:component.UIItemBox;
		public imgDesBg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Hero/HeroUpSuc/HolyUpAdvance");

        }

    }
}

module ProUI.Hero.HeroUpSuc {
    export class HolyUpLevelUI extends View {
		public BGBox:Laya.Box;
		public TipsImg:Laya.Image;
		public listAttr:component.UIItemBox;
		public txtName:component.UILabel;
		public txtOldLv:component.UILabel;
		public txtNewLv:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Hero.HeroUpSuc.HeroUpSucAttrItemUI",ProUI.Hero.HeroUpSuc.HeroUpSucAttrItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Hero/HeroUpSuc/HolyUpLevel");

        }

    }
}

module ProUI.Hero.HeroViewInfo {
    export class MainUI extends View {
		public BGImg:Laya.Image;
		public PowerLb:component.UILabel;
		public DetailBtn:component.UIButton;
		public CommentsBtn:component.UIButton;
		public ItemInfo:Pro.NorItemUI;
		public StarBox:component.UIItemBox;
		public AtterBox:component.UIItemBox;
		public SkillBox:component.UIItemBox;
		public ExBox:Laya.Box;
		public TalentBox:component.UIItemBox;
		public EquipBox:component.UIItemBox;
		public RuneBox:component.UIItemBox;
		public GodEquipBox:component.UIItemBox;
		public GodEquipTipsLb:component.UILabel;
		public NameLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("ProUI.Utils.AttrInfoItemUI",ProUI.Utils.AttrInfoItemUI);
			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);
			View.regComponent("Pro.EquipItemUI",Pro.EquipItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroViewInfo/Main");

        }

    }
}

module ProUI.Hero.HeroZhenXing {
    export class ListItemUI extends Laya.Box {
		public ActiveImg:Laya.Image;
		public IconImg:Laya.Image;
		public ItemBox:component.UIItemBox;
		public txt_title:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Hero/HeroZhenXing/ListItem"], this, this);

        }

    }
}

module ProUI.Hero.HeroZhenXing {
    export class MainUI extends View {
		public TipsImg:Laya.Image;
		public topBox:Laya.Box;
		public KezhiLb:component.UILabel;
		public txt_totaAttr:component.UIHtmlText;
		public ItemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroZhenXing.ListItemUI",ProUI.Hero.HeroZhenXing.ListItemUI);

            super.createChildren();
            this.loadUI("Hero/HeroZhenXing/Main");

        }

    }
}

module ProUI.ItemCombin.Equip {
    export class AutoCombinUI extends View {
		public TitleLb:component.UILabel;
		public CancelBtn:component.UIButton;
		public SureBtn:component.UIButton;
		public RewardBox:component.UIItemBox;
		public DesImg:Laya.Image;
		public DesLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("ItemCombin/Equip/AutoCombin");

        }

    }
}

module ProUI.ItemCombin.Equip {
    export class MainUI extends Laya.Box {
		public tabGrp:component.UITab;
		public ItemList:component.UIList;
		public ItemSelectImg:Laya.Image;
		public OldItemInfo:Pro.NorItemUI;
		public NewItemInfo:Pro.NorItemUI;
		public ArrowTipImg:Laya.Image;
		public NumCutBtn:component.UIButton;
		public NumPlusBtn:component.UIButton;
		public NumRewardImg:Laya.Image;
		public NumLb:component.UILabel;
		public NumRewardLb:component.UILabel;
		public RecordBtn:component.UIButton;
		public AutoCombinBtn:component.UIButton;
		public CombinBtn:component.UIButton;
		public reddotCombinBtn:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["ItemCombin/Equip/Main"], this, this);

        }

    }
}

module ProUI.ItemCombin.Equip.Record {
    export class MainUI extends View {
		public imgEmpty:Laya.Image;
		public CloseBtn:component.UIButton;
		public ItemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ItemCombin.Equip.Record.RecordItemUI",ProUI.ItemCombin.Equip.Record.RecordItemUI);

            super.createChildren();
            this.loadUI("ItemCombin/Equip/Record/Main");

        }

    }
}

module ProUI.ItemCombin.Equip.Record {
    export class RecordItemUI extends Laya.Box {
		public CostIconImg:Laya.Image;
		public ItemBox:component.UIList;
		public CostTimeLb:component.UILabel;
		public CostNumLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ItemCombin/Equip/Record/RecordItem"], this, this);

        }

    }
}

module ProUI.ItemCombin {
    export class MainUI extends View {
		public FunBox:Pro.TableBarContiner;
		public CloseBtn:component.UIButton;
		public ItemTab:Pro.UITabExtend;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);

            super.createChildren();
            this.loadUI("ItemCombin/Main");

        }

    }
}

module ProUI.ItemCombin.Rune.Choice {
    export class ListItemUI extends Laya.Box {
		public ItemBtn:component.UIButton;
		public IconImg:Laya.Image;
		public SelectBtn:component.UIButton;
		public SelectImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["ItemCombin/Rune/Choice/ListItem"], this, this);

        }

    }
}

module ProUI.ItemCombin.Rune.Choice {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public SureBtn:component.UIButton;
		public img_empty:Laya.Image;
		public ItemList:component.UIList;
		public TipLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ItemCombin.Rune.Choice.ListItemUI",ProUI.ItemCombin.Rune.Choice.ListItemUI);

            super.createChildren();
            this.loadUI("ItemCombin/Rune/Choice/Main");

        }

    }
}

module ProUI.ItemCombin.Rune {
    export class MainUI extends Laya.Box {
		public SelectBox:Laya.Box;
		public CombinInfo:Laya.Box;
		public CombinCostImg:Laya.Image;
		public CombinProLb:component.UILabel;
		public CombinCostLb:component.UILabel;
		public CombinItem:ProUI.ItemCombin.Rune.RuneItemUI;
		public CombinProEffBox:Laya.Box;
		public CombinProImg:Laya.Image;
		public CombinNumBtn:component.UIButton;
		public CombinNumLb:component.UILabel;
		public RedDotCombine:Laya.Image;
		public HelpBtn:component.UIButton;
		public SkillBtn:component.UIButton;
		public AutoCombinBtn:component.UIButton;
		public CombinBtn:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.ItemCombin.Rune.RuneItemUI",ProUI.ItemCombin.Rune.RuneItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["ItemCombin/Rune/Main"], this, this);

        }

    }
}

module ProUI.ItemCombin.Rune.Reward {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public SureBtn:component.UIButton;
		public TipsLb:component.UILabel;
		public ItemUI:Pro.NorItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("ItemCombin/Rune/Reward/Main");

        }

    }
}

module ProUI.ItemCombin.Rune {
    export class RuneItemUI extends component.UIButton {
		public IconImg:Laya.Image;
		public PlusImg:Laya.Image;
		public EffImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["ItemCombin/Rune/RuneItem"], this, this);

        }

    }
}

module ProUI.ItemCombin.Rune.Skill {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public HelpBtn:component.UIButton;
		public ItemList:component.UIList;
		public ItemTab:Pro.UITabExtendShort;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Hero.HeroDetail.UseTalent.TalentItemUI",ProUI.Hero.HeroDetail.UseTalent.TalentItemUI);
			View.regComponent("Pro.UITabExtendShort",Pro.UITabExtendShort);

            super.createChildren();
            this.loadUI("ItemCombin/Rune/Skill/Main");

        }

    }
}

module ProUI.ItemReview {
    export class ExAtterItemInfoUI extends Laya.Box {
		public TypeImg:ProUI.Utils.BattleAttrTypeUI;
		public ValueLb:component.UILabel;
		public ActiveLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ItemReview/ExAtterItemInfo"], this, this);

        }

    }
}

module ProUI.ItemReview {
    export class GiftHeroSelectViewUI extends View {
		public heroTypeBox:component.UIItemBox;
		public heroTypeSelectImg:Laya.Image;
		public btn_close:component.UIButton;
		public btn_ok:component.UIButton;
		public txt_desc:component.UILabel;
		public itemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ItemReview.GiftSelectItemUI",ProUI.ItemReview.GiftSelectItemUI);

            super.createChildren();
            this.loadUI("ItemReview/GiftHeroSelectView");

        }

    }
}

module ProUI.ItemReview {
    export class GiftSelectItemUI extends Laya.Box {
		public btn_toggle:component.UIButton;
		public img_select:Laya.Image;
		public itemBox:component.UIItemBox;
		public petBoxLb:Laya.HBox;
		public PetJobLb:component.UILabel;
		public PetDescLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ItemReview/GiftSelectItem"], this, this);

        }

    }
}

module ProUI.ItemReview {
    export class GiftSelectViewUI extends View {
		public btn_close:component.UIButton;
		public btn_ok:component.UIButton;
		public txt_desc:component.UILabel;
		public itemList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.ItemReview.GiftSelectItemUI",ProUI.ItemReview.GiftSelectItemUI);

            super.createChildren();
            this.loadUI("ItemReview/GiftSelectView");

        }

    }
}

module ProUI.ItemReview {
    export class MainUI extends View {
		public BGImg:Laya.Image;
		public BaseBox:Laya.Box;
		public NameLb:component.UILabel;
		public TypeNameLb:component.UILabel;
		public ItemUI:Pro.NorItemUI;
		public AtterBox:Laya.Box;
		public AtterInfoBox:component.UIItemBox;
		public GodRandAtterBox:Laya.Box;
		public GodRandDesBtn:component.UILabelButton;
		public GodRandInfoBox:component.UIItemBox;
		public GodTipsLb:component.UILabel;
		public OneSuitBox:Laya.Box;
		public OneSuitNameLb:component.UILabel;
		public OneSuitInfoBox:component.UIItemBox;
		public OneSuitSkillBox:Laya.Box;
		public OneSuitSkillIcon:Laya.Image;
		public OneSuitSkillDesc:component.UILabel;
		public UsesBox:Laya.Box;
		public UsesTypeNameLb:component.UILabel;
		public RuneFunBox:Laya.Box;
		public RuneSkillInfoBox:Laya.Box;
		public RuneSkillBtn:component.UILabelButton;
		public RuneSkillListBox:component.UIItemBox;
		public RuneFunBtnBox:Laya.Box;
		public RuneCombinBtn:component.UILabelButton;
		public RuneResetBtn:component.UILabelButton;
		public RuneSplitBtn:component.UILabelButton;
		public RuneEquipBtn:component.UIButton;
		public RuneEquipLb:component.UILabel;
		public DesInfo:Laya.Box;
		public DesLb:component.UIHtmlText;
		public EquipedFunBox:Laya.Box;
		public EquipLeftBtn:component.UILabelButton;
		public EquipRightBtn:component.UIButton;
		public ItemFunBox:Laya.Box;
		public ItemFunBtnBox:Laya.Box;
		public GoFromBtn:component.UILabelButton;
		public SellBtn:component.UILabelButton;
		public UseBtn:component.UILabelButton;
		public HeroSpinFunBox:Laya.Box;
		public HeroSpinDetailBtn:component.UILabelButton;
		public HeroCombinBtn:component.UILabelButton;
		public GodEquipFunBox:Laya.Box;
		public GodEquipLeftBtn:component.UILabelButton;
		public GodEquipCenterBtn:component.UILabelButton;
		public GodEquipRightBtn:component.UILabelButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.AttrInfoItemUI",ProUI.Utils.AttrInfoItemUI);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("ProUI.ItemReview.ExAtterItemInfoUI",ProUI.ItemReview.ExAtterItemInfoUI);
			View.regComponent("ProUI.ItemReview.RuneSkillItemUI",ProUI.ItemReview.RuneSkillItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("ItemReview/Main");

        }

    }
}

module ProUI.ItemReview {
    export class RuneSkillItemUI extends Laya.Box {
		public BGImg:Laya.Image;
		public IconImg:Laya.Image;
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["ItemReview/RuneSkillItem"], this, this);

        }

    }
}

module ProUI.Ladder.ChildView {
    export class MainRoleItemUI extends Laya.Box {
		public txtNickname:component.UILabel;
		public txtNoopenTips:component.UILabel;
		public boxFightValue:Laya.Image;
		public txtFightValue:component.UILabel;
		public avatar:Laya.Box;
		public btnAttack:component.UIButton;
		public txtRank:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Ladder/ChildView/MainRoleItem"], this, this);

        }

    }
}

module ProUI.Ladder.ChildView {
    export class RecordPageNiubilityUI extends Laya.Box {
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Ladder.ChildView.RecordPageNiubilityItemUI",ProUI.Ladder.ChildView.RecordPageNiubilityItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Ladder/ChildView/RecordPageNiubility"], this, this);

        }

    }
}

module ProUI.Ladder.ChildView {
    export class RecordPageNiubilityItemUI extends Laya.Box {
		public playerIconL:Pro.PlayerIconUI;
		public playerIconR:Pro.PlayerIconUI;
		public txtNicknameL:component.UILabel;
		public txtRankL:component.UILabel;
		public txtRankR:component.UILabel;
		public txtNicknameR:component.UILabel;
		public txtTime:component.UILabel;
		public btnWatch:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Ladder/ChildView/RecordPageNiubilityItem"], this, this);

        }

    }
}

module ProUI.Ladder.ChildView {
    export class RecordPageSelfUI extends Laya.Box {
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Ladder.ChildView.RecordPageSelfItemUI",ProUI.Ladder.ChildView.RecordPageSelfItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Ladder/ChildView/RecordPageSelf"], this, this);

        }

    }
}

module ProUI.Ladder.ChildView {
    export class RecordPageSelfItemUI extends Laya.Box {
		public btnWatch:component.UIButton;
		public playerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public txtFightValue:component.UILabel;
		public txtResult:component.UILabel;
		public txtTime:component.UILabel;
		public txtRankChange:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Ladder/ChildView/RecordPageSelfItem"], this, this);

        }

    }
}

module ProUI.Ladder.ChildView {
    export class TopHeroRoleItemUI extends Laya.Box {
		public avatar:Laya.Box;
		public btnDetail:component.UIButton;
		public txtNickname:component.UILabel;
		public txtFactionName:component.UILabel;
		public btnWorship:component.UIButton;
		public txtWorshopValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Ladder/ChildView/TopHeroRoleItem"], this, this);

        }

    }
}

module ProUI.Ladder {
    export class LadderMainUI extends View {
		public roleItems:Laya.Box;
		public btnHelp:component.UIButton;
		public btnTopHero:component.UIButton;
		public reddotTopHero:Laya.Image;
		public btnRecord:component.UIButton;
		public btnReward:component.UIButton;
		public btnShop:component.UIButton;
		public btnRank:component.UIButton;
		public txtScoreValue:component.UILabel;
		public txtRank:component.UILabel;
		public btnClose:component.UIButton;
		public btnBuyCount:component.UIButton;
		public btnQuickAttack:component.UIButton;
		public btnRefresh:component.UIButton;
		public txtRefreshLabel:component.UILabel;
		public txtLeftBuyCount:component.UILabel;
		public txtLeftCount:component.UILabel;
		public txtCondition:component.UILabel;
		public txtTimeTitle:component.UILabel;
		public txtTime:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.LadderMainRoleItemView",Pro.LadderMainRoleItemView);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Ladder/LadderMain");

        }

    }
}

module ProUI.Ladder {
    export class LadderPreAttackUI extends View {
		public btnClose:component.UIButton;
		public txtFightValue:component.UIBitmapText;
		public txtVip:component.UIBitmapText;
		public viewPlayerIcon:Pro.PlayerIconUI;
		public imgFrameSex:component.UIFrameImage;
		public btnAttack:component.UIButton;
		public btnEmbattle:component.UIButton;
		public listPetView:component.UIItemBox;
		public txtRank:component.UILabel;
		public txtNickname:component.UILabel;
		public txtFaction:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Ladder/LadderPreAttack");

        }

    }
}

module ProUI.Ladder {
    export class LadderRecordUI extends View {
		public btnClose:component.UIButton;
		public tabGrp:Pro.UITabExtend;
		public pageViewContainer:Pro.TableBarContiner;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Ladder/LadderRecord");

        }

    }
}

module ProUI.Ladder {
    export class LadderRewardUI extends View {
		public btnClose:component.UIButton;
		public listView:component.UIList;
		public txtMyRank:component.UILabel;
		public txtRewardTips:component.UILabel;
		public norItems:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.RankRewardPreviewUI",Pro.RankRewardPreviewUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Ladder/LadderReward");

        }

    }
}

module ProUI.Ladder {
    export class LadderTopHeroUI extends View {
		public btnClose:component.UIButton;
		public role1:ProUI.Ladder.ChildView.TopHeroRoleItemUI;
		public role2:ProUI.Ladder.ChildView.TopHeroRoleItemUI;
		public role3:ProUI.Ladder.ChildView.TopHeroRoleItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Ladder.ChildView.TopHeroRoleItemUI",ProUI.Ladder.ChildView.TopHeroRoleItemUI);

            super.createChildren();
            this.loadUI("Ladder/LadderTopHero");

        }

    }
}

module ProUI.Mail {
    export class MainUI extends View {
		public tabGrp:component.UITab;
		public FunBox:Pro.TableBarContiner;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Mail/Main");

        }

    }
}

module ProUI.Mail.Notice {
    export class MainUI extends Laya.Box {
		public panel:Laya.Panel;
		public panelBox:Laya.Box;
		public htmlContent:component.UIHtmlText;
		public imgEmpty:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Mail/Notice/Main"], this, this);

        }

    }
}

module ProUI.Mail.Record {
    export class MailItemUI extends component.UIButton {
		public BGFrameImg:component.UIFrameImage;
		public BgTexture:Laya.Image;
		public RedDotImg:Laya.Image;
		public RewardImg:Laya.Image;
		public RewardIconImg:component.UIFrameImage;
		public NameLb:component.UILabel;
		public NoReadLb:component.UILabel;
		public TimeLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Mail/Record/MailItem"], this, this);

        }

    }
}

module ProUI.Mail.Record {
    export class MainUI extends Laya.Box {
		public GetAllBtn:component.UIButton;
		public DelReadedBtn:component.UIButton;
		public ItemList:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Mail.Record.MailItemUI",ProUI.Mail.Record.MailItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Mail/Record/Main"], this, this);

        }

    }
}

module ProUI.Mail.RecordInfo {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public MailStatueImg:component.UIFrameImage;
		public MailTitleLb:component.UILabel;
		public MailTimeLb:component.UILabel;
		public MailEffTimeLb:component.UILabel;
		public MailDesLb:component.UIHtmlText;
		public ExInfo:Laya.Box;
		public ExInfoReward:component.UIList;
		public DelMailBtn:component.UIButton;
		public GetRewardBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Mail/RecordInfo/Main");

        }

    }
}

module ProUI.Pay.DayFirstPay {
    export class DayFirstPayUI extends View {
		public btnPay:component.UIButton;
		public tabGrp:component.UITab;
		public btnGetReward:component.UIButton;
		public btnIsGet:component.UIButton;
		public listNoritem:component.UIItemBox;
		public hboxNeed:Laya.HBox;
		public txtLeftPay:component.UIBitmapText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIBitmapText",component.UIBitmapText);

            super.createChildren();
            this.loadUI("Pay/DayFirstPay/DayFirstPay");

        }

    }
}

module ProUI.Pay.FirstPay {
    export class DayItemUI extends Laya.Box {
		public listNorItem:component.UIItemBox;
		public imgGet:Laya.Image;
		public txtDays:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Pay/FirstPay/DayItem"], this, this);

        }

    }
}

module ProUI.Pay.FirstPay {
    export class FirstPayUI extends View {
		public bg:component.UIFrameImage;
		public txtHeroName:component.UILabel;
		public txtHeroStar:component.UILabel;
		public btnClose:component.UIButton;
		public btnGo:component.UIButton;
		public txtBtnLabel:component.UILabel;
		public imgReddot:Laya.Image;
		public listDayItems:component.UIItemBox;
		public txtPayValue:component.UILabel;
		public tabGrp:component.UITab;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Pay.FirstPay.DayItemUI",ProUI.Pay.FirstPay.DayItemUI);
			View.regComponent("UITab",component.UITab);

            super.createChildren();
            this.loadUI("Pay/FirstPay/FirstPay");

        }

    }
}

module ProUI.Pay.PageView {
    export class MonthCardViewUI extends View {
		public normalBox:Laya.Box;
		public superBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Pay/PageView/MonthCardView");

        }

    }
}

module ProUI.Pay.PageView {
    export class PayViewUI extends View {
		public vipChildView:Pro.PayVipChildView;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.PayVipChildView",Pro.PayVipChildView);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Pay.PageView.PayViewItemUI",ProUI.Pay.PageView.PayViewItemUI);

            super.createChildren();
            this.loadUI("Pay/PageView/PayView");

        }

    }
}

module ProUI.Pay.PageView {
    export class PayViewItemUI extends Laya.Box {
		public btn:component.UIButton;
		public icon:component.UIFrameImage;
		public extraBox:Laya.Image;
		public hboxExtra:Laya.HBox;
		public txtExtra:component.UILabel;
		public firstBox:Laya.Image;
		public txtDiamon:component.UILabel;
		public txtPirce:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Pay/PageView/PayViewItem"], this, this);

        }

    }
}

module ProUI.Pay.PageView {
    export class PrivilegeShopViewUI extends View {
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Pay.PageView.PrivilegeShopViewItemUI",ProUI.Pay.PageView.PrivilegeShopViewItemUI);

            super.createChildren();
            this.loadUI("Pay/PageView/PrivilegeShopView");

        }

    }
}

module ProUI.Pay.PageView {
    export class PrivilegeShopViewItemUI extends Laya.Box {
		public imgBoxIcon:component.UIFrameImage;
		public imgBuyOver:Laya.Image;
		public txtDes:component.UILabel;
		public txtLimitLabel:component.UILabel;
		public listNorItems:component.UIItemBox;
		public imgSelEff:Laya.Image;
		public effSel:ProUI.Ani.efc.NodeBreatheUI;
		public btnBuy:component.UIButton;
		public hboxDiamon:Laya.HBox;
		public txtLabelDiamon:component.UILabel;
		public txtLabelMoney:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("ProUI.Ani.efc.NodeBreatheUI",ProUI.Ani.efc.NodeBreatheUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Pay/PageView/PrivilegeShopViewItem"], this, this);

        }

    }
}

module ProUI.Pay.PageView {
    export class VipChildViewUI extends Laya.Box {
		public full:component.UIFrameImage;
		public noFull:Laya.Box;
		public hboxNext:Laya.HBox;
		public txtNeed:component.UIBitmapText;
		public txtNextLevel:component.UIBitmapText;
		public hboxNextPrize:Laya.HBox;
		public imgNextPrize:component.UIFrameImage;
		public txtVipLevel:component.UIBitmapText;
		public imgProgress:Laya.Image;
		public txtProgress:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Pay/PageView/VipChildView"], this, this);

        }

    }
}

module ProUI.Pay.PageView {
    export class VipPrivilegeItemUI extends Laya.Box {
		public htmlText:component.UIHtmlText;
		public tagNew:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Pay/PageView/VipPrivilegeItem"], this, this);

        }

    }
}

module ProUI.Pay.PageView {
    export class VipViewUI extends View {
		public vipChildView:Pro.PayVipChildView;
		public tabGrp:component.UITab;
		public listNoritemMonthCard:component.UIItemBox;
		public imgCardGet:Laya.Image;
		public btnCardActive:component.UIButton;
		public btnCardPirze:component.UIButton;
		public hboxPrivilegeTips:Laya.HBox;
		public txtNeed:component.UILabel;
		public txtTitle:component.UILabel;
		public listPrivilege:component.UIList;
		public listGiftItems:component.UIItemBox;
		public hboxOldPrice:Laya.HBox;
		public txtGiftOldPrize:component.UILabel;
		public imgDelLine:Laya.Image;
		public imgBuyGift:Laya.Image;
		public btnGiftBuy:component.UIButton;
		public hboxGiftPrice:Laya.HBox;
		public txtGiftPrice:component.UILabel;
		public imgReddotGiftPrize:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.PayVipChildView",Pro.PayVipChildView);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Pay.PageView.VipPrivilegeItemUI",ProUI.Pay.PageView.VipPrivilegeItemUI);

            super.createChildren();
            this.loadUI("Pay/PageView/VipView");

        }

    }
}

module ProUI.Pay {
    export class PayMainUI extends View {
		public btnClose:component.UIButton;
		public pageViewContainer:Pro.TableBarContiner;
		public tabGrp:component.UITab;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Pay/PayMain");

        }

    }
}

module ProUI.Pay {
    export class PayMainHighlightUI extends View {
		public pageViewContainer:Laya.Box;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Pay.PageView.PrivilegeShopViewItemUI",ProUI.Pay.PageView.PrivilegeShopViewItemUI);

            super.createChildren();
            this.loadUI("Pay/PayMainHighlight");

        }

    }
}

module ProUI.Pay.StrongerGift {
    export class PayStrongerGiftUI extends View {
		public btnClose:component.UIButton;
		public btnBuy:component.UIButton;
		public txtBuyLable:component.UILabel;
		public tabBox:Laya.Box;
		public imgTabLeftArrow:Laya.Image;
		public imgTabRightArrow:Laya.Image;
		public tabGrp:component.UITab;
		public itemListReward:component.UIItemBox;
		public htmlDesc:component.UIHtmlText;
		public txtLimitCount:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Pay/StrongerGift/PayStrongerGift");

        }

    }
}

module ProUI.Peak {
    export class PeakUI extends View {
		public ArrowItemUI:Pro.ArrorItemUI;
		public btnHelp:component.UIButton;
		public btnRank:component.UIButton;
		public btnClose:component.UIButton;
		public htmlCurTimer:component.UILabel;
		public htmlCurTimerTxt:component.UILabel;
		public htmlAllTimer:component.UILabel;
		public skillListView:component.UIItemBox;
		public activeBox:Laya.Box;
		public btnSkillIcon:component.UIButton;
		public btnAttack:component.UIButton;
		public btnBuyCount:component.UIButton;
		public txtLeftBuyCount:component.UILabel;
		public txtLeftCount:component.UILabel;
		public txtSkillName:component.UILabel;
		public txtSkillTips:component.UILabel;
		public txtLuckTips:component.UILabel;
		public aniNode:Laya.Sprite;
		public nameImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.ArrorItemUI",Pro.ArrorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.SkillSimpleItemUI",ProUI.Utils.SkillSimpleItemUI);

            super.createChildren();
            this.loadUI("Peak/Peak");

        }

    }
}

module ProUI.Peak {
    export class PeakEnterUI extends View {
		public htmlTimer:component.UIHtmlText;
		public itemView:component.UIItemBox;
		public btnEnter:component.UIButton;
		public reddotEnter:Laya.Image;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Peak/PeakEnter");

        }

    }
}

module ProUI.PlayerInfo {
    export class CDKeyExchangeUI extends View {
		public btn_close:component.UIButton;
		public btnConfirm:component.UIButton;
		public inputKey:Laya.TextInput;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("PlayerInfo/CDKeyExchange");

        }

    }
}

module ProUI.PlayerInfo.ItemView {
    export class BadgeSetShowItemUI extends Laya.Box {
		public btn:component.UIButton;
		public imgIcon:Laya.Image;
		public useTag:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["PlayerInfo/ItemView/BadgeSetShowItem"], this, this);

        }

    }
}

module ProUI.PlayerInfo.ItemView {
    export class ComplanChatItemUI extends Laya.Box {
		public btn:component.UIButton;
		public imgSel:Laya.Image;
		public txtContent:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["PlayerInfo/ItemView/ComplanChatItem"], this, this);

        }

    }
}

module ProUI.PlayerInfo.ItemView {
    export class HonorItemUI extends Laya.Box {
		public txtTitle:component.UILabel;
		public listBadge:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["PlayerInfo/ItemView/HonorItem"], this, this);

        }

    }
}

module ProUI.PlayerInfo.PageView {
    export class HomePageHonorUI extends Laya.Box {
		public imgProgress:Laya.Image;
		public btnSetShow:component.UIButton;
		public txtName:component.UILabel;
		public txtCount:component.UILabel;
		public txtCount2:component.UILabel;
		public txtProgress:component.UILabel;
		public txtPointCount:component.UILabel;
		public btnLevelIcon:component.UIButton;
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.PlayerInfo.ItemView.HonorItemUI",ProUI.PlayerInfo.ItemView.HonorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["PlayerInfo/PageView/HomePageHonor"], this, this);

        }

    }
}

module ProUI.PlayerInfo.PageView {
    export class HomePageInfoOtherUI extends Laya.Box {
		public txtLv:component.UILabel;
		public txtFans:component.UILabel;
		public txtFaction:component.UILabel;
		public txtGrade:component.UILabel;
		public txtNickname:component.UILabel;
		public txtProveinceName:component.UILabel;
		public txtCityName:component.UILabel;
		public listHeros:component.UIItemBox;
		public imgHead:Laya.Image;
		public imgHeadBorder:component.UIButton;
		public btnComplain:component.UIButton;
		public btnFans:component.UIButton;
		public btnCancelFans:component.UIButton;
		public btnAddFriend:component.UIButton;
		public btnPrivateChat:component.UIButton;
		public btnFansHelp:component.UIButton;
		public fansHelpView:Laya.Image;
		public txtFansHelpDes:component.UIHtmlText;
		public txtFansHelpDes2:component.UILabel;
		public txtFansHelpRank:component.UILabel;
		public imgFansPrizeFrame:Laya.Image;
		public txtFansPrizeName:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["PlayerInfo/PageView/HomePageInfoOther"], this, this);

        }

    }
}

module ProUI.PlayerInfo.PageView {
    export class HomePageInfoSelfUI extends Laya.Box {
		public imgBg:Laya.Image;
		public btnFansHelp:component.UIButton;
		public txtFans:component.UILabel;
		public txtGrade:component.UILabel;
		public txtLv:component.UILabel;
		public txtFaction:component.UILabel;
		public txtNickname:component.UILabel;
		public txtProveinceName:component.UILabel;
		public txtCityName:component.UILabel;
		public listHeros:component.UIItemBox;
		public imgHead:Laya.Image;
		public imgHeadBorder:component.UIButton;
		public imgHeadBtn:component.UIButton;
		public btnRename:component.UIButton;
		public btnShape:component.UIButton;
		public btnTitle:component.UIButton;
		public btnSetting:component.UIButton;
		public btnComboProveince:component.UIButton;
		public btnComboCity:component.UIButton;
		public popupViewMask:component.UIButton;
		public comboBoxListView:Laya.Image;
		public listCombo:component.UIList;
		public fansHelpView:Laya.Image;
		public txtFansHelpDes2:component.UILabel;
		public txtFansHelpRank:component.UILabel;
		public btnFansRank:component.UIButton;
		public imgFansPrizeFrame:Laya.Image;
		public txtFansPrizeName:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["PlayerInfo/PageView/HomePageInfoSelf"], this, this);

        }

    }
}

module ProUI.PlayerInfo {
    export class PlayerBadgeSetShowUI extends View {
		public imgEmpty:Laya.Image;
		public listShow:component.UIItemBox;
		public listWait:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.PlayerInfo.ItemView.BadgeSetShowItemUI",ProUI.PlayerInfo.ItemView.BadgeSetShowItemUI);

            super.createChildren();
            this.loadUI("PlayerInfo/PlayerBadgeSetShow");

        }

    }
}

module ProUI.PlayerInfo {
    export class PlayerBadgeTipsUI extends View {
		public imgIcon:Laya.Image;
		public txtName:component.UILabel;
		public txtCondition:component.UILabel;
		public txtTime:component.UILabel;
		public txtNickname:component.UILabel;
		public txtDesc:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("PlayerInfo/PlayerBadgeTips");

        }

    }
}

module ProUI.PlayerInfo {
    export class PlayerComplainUI extends View {
		public btnClose:component.UIButton;
		public btnHelp:component.UIButton;
		public btnConfirm:component.UIButton;
		public txtNickname:component.UILabel;
		public inputContent:Laya.TextInput;
		public grpBtnReason:Laya.List;
		public chatPanel:Laya.Panel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.CheckButton",Pro.CheckButton);

            super.createChildren();
            this.loadUI("PlayerInfo/PlayerComplain");

        }

    }
}

module ProUI.PlayerInfo {
    export class PlayerHomeUI extends View {
		public btnClose:component.UIButton;
		public titleLab:component.UILabel;
		public tab:component.UITab;
		public pageViewContainer:Pro.TableBarContiner;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UITab",component.UITab);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("PlayerInfo/PlayerHome");

        }

    }
}

module ProUI.PlayerInfo {
    export class PlayerHonorLevelUI extends View {
		public boxCur:Laya.Box;
		public imgIcon:Laya.Image;
		public txtName:component.UILabel;
		public txtNickname:component.UILabel;
		public txtExp:component.UILabel;
		public txtCount:component.UILabel;
		public boxNext:Laya.Box;
		public imgNextIcon:Laya.Image;
		public txtNextName:component.UILabel;
		public txtNextNeed:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("PlayerInfo/PlayerHonorLevel");

        }

    }
}

module ProUI.PlayerInfo {
    export class PlayerInfoUI extends View {
		public btnClose:component.UIButton;
		public viewPlayerIcon:Pro.PlayerIconUI;
		public imgFrameSex:component.UIFrameImage;
		public txtVipLv:component.UIBitmapText;
		public txtNickname:component.UILabel;
		public txtNickLv:component.UILabel;
		public txtGrading:component.UILabel;
		public txtFactionName:component.UILabel;
		public txtFightValue:component.UILabel;
		public btnHome:component.UIButton;
		public listView:component.UIItemBox;
		public btnBlacklist:component.UIButton;
		public txtBlacklistLabel:component.UILabel;
		public btnComplain:component.UIButton;
		public btnCompareAttack:component.UIButton;
		public btnPrivateChat:component.UIButton;
		public btnAddFriend:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("PlayerInfo/PlayerInfo");

        }

    }
}

module ProUI.PlayerInfo {
    export class RenameUI extends View {
		public btnCancel:component.UIButton;
		public btnConfirm:component.UIButton;
		public boxFee:Laya.HBox;
		public txtNeedDiamond:component.UILabel;
		public txtFree:component.UILabel;
		public inputName:Laya.TextInput;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("PlayerInfo/Rename");

        }

    }
}

module ProUI.PlayerInfo {
    export class SystemSettingUI extends View {
		public btnClose:component.UIButton;
		public txtServerName:component.UILabel;
		public txtUID:component.UILabel;
		public btnShare:component.UIButton;
		public btnCDKey:component.UIButton;
		public btnRecommend:component.UIButton;
		public btnBug:component.UIButton;
		public btnExitGame:component.UIButton;
		public btnChangeLogin:component.UIButton;
		public btnMusic:Pro.CheckButton;
		public btnSound:Pro.CheckButton;
		public btnVoice:Pro.CheckButton;
		public btnQuality:Pro.CheckButton;
		public btnAttackVerify:Pro.CheckButton;
		public btnTest2:component.UIButton;
		public btnTest1:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.CheckButton",Pro.CheckButton);

            super.createChildren();
            this.loadUI("PlayerInfo/SystemSetting");

        }

    }
}

module ProUI.Question {
    export class ChoiceItemUI extends component.UIButton {
		public txtIndex:component.UILabel;
		public txtContent:Laya.Label;
		public imgTrue:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Question/ChoiceItem"], this, this);

        }

    }
}

module ProUI.Question {
    export class QuestionUI extends View {
		public btnHelp:component.UIButton;
		public choceList:component.UIItemBox;
		public textTopicBox:Laya.Box;
		public input:Laya.TextInput;
		public btnConfirm:component.UIButton;
		public itemListView:component.UIItemBox;
		public txtStep:component.UILabel;
		public txtQuestion:component.UILabel;
		public htmlTimer:component.UIHtmlText;
		public txtDiamon:component.UILabel;
		public txtCoin:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Question.ChoiceItemUI",ProUI.Question.ChoiceItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Question/Question");

        }

    }
}

module ProUI.Rank.ClientServer {
    export class MainUI extends Laya.Box {
		public ItemList:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.RankMainItemView",Pro.RankMainItemView);

            Laya.ClassUtils.createByJson(View.uiMap["Rank/ClientServer/Main"], this, this);

        }

    }
}

module ProUI.Rank.Detail {
    export class ListItemUI extends Laya.Image {
		public frameBg:Laya.Image;
		public imgFrameRank:component.UIFrameImage;
		public playerView:Laya.Box;
		public playerIcon:Pro.PlayerIconUI;
		public SKname:component.UILabel;
		public txtNickname:component.UILabel;
		public headFightPowerBox:Laya.Box;
		public txtFightPower:component.UILabel;
		public noRank:component.UILabel;
		public txtRank:component.UILabel;
		public txtNormalValue1:component.UILabel;
		public txtNormalValue2:component.UILabel;
		public txtNormalValue3:component.UILabel;
		public hboxIconValue:Laya.HBox;
		public valueIcon:Laya.Image;
		public txtIconValue:component.UILabel;
		public worshipView:Laya.Box;
		public txtWorshipValue:component.UILabel;
		public btnWorship:component.UIButton;
		public txtWorshipCount:component.UILabel;
		public twoLineValueBox:Laya.Box;
		public twoLineValue1:component.UILabel;
		public twoLineValue2:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Rank/Detail/ListItem"], this, this);

        }

    }
}

module ProUI.Rank.Detail {
    export class RankDetailUI extends View {
		public txtTitle:component.UIHtmlText;
		public imgEmpty:Laya.Image;
		public viewPlayerIconTop1:Pro.PlayerIconUI;
		public viewPlayerIconTop2:Pro.PlayerIconUI;
		public viewPlayerIconTop3:Pro.PlayerIconUI;
		public txtTopNickname1:component.UILabel;
		public txtTopNickname2:component.UILabel;
		public txtTopNickname3:component.UILabel;
		public hboxListHeader:Laya.HBox;
		public selfInfoView:Pro.RankDetailItemView;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("Pro.RankDetailItemView",Pro.RankDetailItemView);
			View.regComponent("UIList",component.UIList);

            super.createChildren();
            this.loadUI("Rank/Detail/RankDetail");

        }

    }
}

module ProUI.Rank.DetailReward {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public tabGrp:component.UITab;
		public TitleLb:component.UIHtmlText;
		public FunBox:Pro.TableBarContiner;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Rank/DetailReward/Main");

        }

    }
}

module ProUI.Rank.DetailReward.Rank {
    export class MainUI extends Laya.Box {
		public imgEmpty:Laya.Image;
		public MyRankInfo:ProUI.Rank.DetailReward.Rank.RankItemUI;
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Rank.DetailReward.Rank.RankItemUI",ProUI.Rank.DetailReward.Rank.RankItemUI);
			View.regComponent("UIList",component.UIList);

            Laya.ClassUtils.createByJson(View.uiMap["Rank/DetailReward/Rank/Main"], this, this);

        }

    }
}

module ProUI.Rank.DetailReward.Rank {
    export class RankItemUI extends Laya.Image {
		public imgFrameRank:component.UIFrameImage;
		public playerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public txtFightValue:component.UILabel;
		public txtValueTitle:component.UILabel;
		public txtValue:component.UILabel;
		public txtRank:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Rank/DetailReward/Rank/RankItem"], this, this);

        }

    }
}

module ProUI.Rank.DetailReward.Reward {
    export class MainUI extends Laya.Box {
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Rank.DetailReward.Reward.RewardItemUI",ProUI.Rank.DetailReward.Reward.RewardItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Rank/DetailReward/Reward/Main"], this, this);

        }

    }
}

module ProUI.Rank.DetailReward.Reward {
    export class RewardItemUI extends Laya.Box {
		public imgFrameRank:component.UIFrameImage;
		public listItems:component.UIItemBox;
		public txtRank:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Rank/DetailReward/Reward/RewardItem"], this, this);

        }

    }
}

module ProUI.Rank {
    export class MainUI extends View {
		public tabGrp:component.UITab;
		public FunBox:Pro.TableBarContiner;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Rank/Main");

        }

    }
}

module ProUI.Rank {
    export class RankInfoItemUI extends Laya.Box {
		public imgBg:component.UIFrameImage;
		public btn:component.UIButton;
		public PlayerRankImg:Laya.Image;
		public imgFactionIcon:Laya.Image;
		public PlayerIcon:Pro.PlayerIconUI;
		public PlayerRankInfoLb:component.UILabel;
		public PlayerNameLb:component.UILabel;
		public emptyTag:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Rank/RankInfoItem"], this, this);

        }

    }
}

module ProUI.Risk.ChildView {
    export class RiskCallShopItemViewUI extends Laya.Box {
		public itemView:Pro.NorItemUI;
		public imgDiscount:Laya.Image;
		public txtDiscount:component.UILabel;
		public txtName:component.UILabel;
		public imgFull:Laya.Image;
		public btnBuy:component.UIButton;
		public imgPrice:Laya.Image;
		public txtPrice:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Risk/ChildView/RiskCallShopItemView"], this, this);

        }

    }
}

module ProUI.Risk.ChildView {
    export class RiskEventAnswerItemUI extends component.UIButton {
		public txtIndex:component.UILabel;
		public txtContent:Laya.Label;
		public imgTrue:Laya.Image;
		public imgFaild:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Risk/ChildView/RiskEventAnswerItem"], this, this);

        }

    }
}

module ProUI.Risk.ChildView {
    export class RiskEventDialogItemUI extends component.UIButton {
		public imgTrue:Laya.Image;
		public imgFaild:Laya.Image;
		public hboxContent:Laya.HBox;
		public txtContent:component.UILabel;
		public txtNeedLeft:component.UILabel;
		public imgNeedIcon:Laya.Image;
		public txtNeedRight:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Risk/ChildView/RiskEventDialogItem"], this, this);

        }

    }
}

module ProUI.Risk.ChildView {
    export class RiskGridAnimateUI extends Laya.Box {
		public image:Laya.Image;
		public boxBoss:Laya.Box;
		public imgIconBoss:Laya.Image;
		public imgBossFrame:component.UIFrameImage;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["Risk/ChildView/RiskGridAnimate"], this, this);

        }

    }
}

module ProUI.Risk.ChildView {
    export class RiskGridFloorViewUI extends Laya.Box {
		public listStatic:component.UIItemBox;
		public listAnimate:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Risk.ChildView.RiskGridStaticUI",ProUI.Risk.ChildView.RiskGridStaticUI);
			View.regComponent("ProUI.Risk.ChildView.RiskGridAnimateUI",ProUI.Risk.ChildView.RiskGridAnimateUI);

            Laya.ClassUtils.createByJson(View.uiMap["Risk/ChildView/RiskGridFloorView"], this, this);

        }

    }
}

module ProUI.Risk.ChildView {
    export class RiskGridStaticUI extends component.UIButton {
		public imgObstacle:Laya.Image;
		public imgMask:Laya.Image;
		public imgShadow:Laya.Image;
		public imgEventIcon:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Risk/ChildView/RiskGridStatic"], this, this);

        }

    }
}

module ProUI.Risk.ChildView {
    export class RiskRewardSumItemViewUI extends Laya.Image {
		public icon:Laya.Image;
		public txtName:component.UILabel;
		public txtCount:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Risk/ChildView/RiskRewardSumItemView"], this, this);

        }

    }
}

module ProUI.Risk.ChildView {
    export class RiskTargetRewardItemUI extends Laya.Box {
		public imgHasGet:Laya.Image;
		public btnGo:component.UIButton;
		public listNorItem:component.UIItemBox;
		public txtContent:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Risk/ChildView/RiskTargetRewardItem"], this, this);

        }

    }
}

module ProUI.Risk {
    export class RiskCallShopUI extends View {
		public btnClose:component.UIButton;
		public listView:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Risk.ChildView.RiskCallShopItemViewUI",ProUI.Risk.ChildView.RiskCallShopItemViewUI);

            super.createChildren();
            this.loadUI("Risk/RiskCallShop");

        }

    }
}

module ProUI.Risk {
    export class RiskDrugHpViewUI extends View {
		public btnCancel:component.UIButton;
		public btnConfirm:component.UIButton;
		public txtLeftCount:component.UILabel;
		public txtItemLeftCount:component.UILabel;
		public listHeros:Pro.RiskOperateHerosListView;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.RiskOperateHerosListView",Pro.RiskOperateHerosListView);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Risk/RiskDrugHpView");

        }

    }
}

module ProUI.Risk {
    export class RiskDrugKillViewUI extends View {
		public btnCancel:component.UIButton;
		public btnConfirm:component.UIButton;
		public txtLeftCount:component.UILabel;
		public txtItemLeftCount:component.UILabel;
		public listHeros:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            super.createChildren();
            this.loadUI("Risk/RiskDrugKillView");

        }

    }
}

module ProUI.Risk {
    export class RiskEventAnswerUI extends View {
		public btnClose:component.UIButton;
		public txtStep:component.UILabel;
		public txtQuestion:component.UILabel;
		public listAnswer:component.UIItemBox;
		public listCurReward:component.UIItemBox;
		public listAllReward:Pro.RiskOperateHerosListView;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Risk.ChildView.RiskEventAnswerItemUI",ProUI.Risk.ChildView.RiskEventAnswerItemUI);
			View.regComponent("Pro.RiskOperateHerosListView",Pro.RiskOperateHerosListView);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Risk/RiskEventAnswer");

        }

    }
}

module ProUI.Risk {
    export class RiskEventAnswerReadyUI extends View {
		public btnClose:component.UIButton;
		public btnEnter:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Risk/RiskEventAnswerReady");

        }

    }
}

module ProUI.Risk {
    export class RiskEventBoxUI extends View {
		public btnOpen:component.UIButton;
		public imgBox:component.UIFrameImage;
		public btnClose:component.UIButton;
		public listPreview:Pro.RiskOperateHerosListView;
		public itemKeyless:Pro.NorItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.RiskOperateHerosListView",Pro.RiskOperateHerosListView);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Risk/RiskEventBox");

        }

    }
}

module ProUI.Risk {
    export class RiskEventDialogUI extends View {
		public btnClose:component.UIButton;
		public txtQuestion:component.UILabel;
		public listAnswer:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.RiskEventDialogAnswerView",Pro.RiskEventDialogAnswerView);

            super.createChildren();
            this.loadUI("Risk/RiskEventDialog");

        }

    }
}

module ProUI.Risk {
    export class RiskEventGuessUI extends View {
		public btnClose:component.UIButton;
		public imgLeftHand:component.UIFrameImage;
		public imgRightHand:component.UIFrameImage;
		public txtContent:component.UILabel;
		public listTabJetton:component.UIList;
		public listTabHand:component.UIList;
		public guideArrow:Laya.Image;
		public txtGuide:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIList",component.UIList);

            super.createChildren();
            this.loadUI("Risk/RiskEventGuess");

        }

    }
}

module ProUI.Risk {
    export class RiskEventMysteryUI extends View {
		public btnClose:component.UIButton;
		public imgTargetIcon:component.UIFrameImage;
		public txtQuestion:component.UILabel;
		public listAnswer:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.RiskEventDialogAnswerView",Pro.RiskEventDialogAnswerView);

            super.createChildren();
            this.loadUI("Risk/RiskEventMystery");

        }

    }
}

module ProUI.Risk {
    export class RiskHeroSelectUI extends View {
		public txtFightPower:component.UILabel;
		public btnAutoEmbattle:component.UIButton;
		public btnEnter:component.UIButton;
		public listFight:component.UIItemBox;
		public listWait:component.UIList;
		public listTabType:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);

            super.createChildren();
            this.loadUI("Risk/RiskHeroSelect");

        }

    }
}

module ProUI.Risk {
    export class RiskMainUI extends View {
		public bgImg:Laya.Image;
		public floorView:Pro.RiskMainGridFloorView;
		public btnRank:component.UIButton;
		public btnHelp:component.UIButton;
		public txtTitle:component.UILabel;
		public btnTargetReward:component.UIButton;
		public imgTargetReward:component.UIFrameImage;
		public txtTarget:component.UILabel;
		public btnAddBuff:component.UIButton;
		public btnHpDrug:component.UIButton;
		public txtHpDrug:component.UILabel;
		public btnKillDrug:component.UIButton;
		public txtKillDrug:component.UILabel;
		public btnCallShop:component.UIButton;
		public txtCallShop:component.UILabel;
		public btnShop:component.UIButton;
		public btnClose:component.UIButton;
		public txtTimer:component.UILabel;
		public listHeros:Pro.RiskOperateHerosListView;
		public addBuffView:Laya.Image;
		public listAddBuff:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.RiskMainGridFloorView",Pro.RiskMainGridFloorView);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.RiskOperateHerosListView",Pro.RiskOperateHerosListView);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);

            super.createChildren();
            this.loadUI("Risk/RiskMain");

        }

    }
}

module ProUI.Risk {
    export class RiskPreBattleUI extends View {
		public txtFightPower:component.UILabel;
		public btnEnter:component.UIButton;
		public txtDefName:component.UILabel;
		public listHeros:Pro.RiskOperateHerosListView;
		public norItemAtk:Pro.NorItemUI;
		public norItemDef:Pro.NorItemUI;
		public chkBtnJumpBattle:Pro.CheckButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.RiskOperateHerosListView",Pro.RiskOperateHerosListView);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("Pro.CheckButton",Pro.CheckButton);

            super.createChildren();
            this.loadUI("Risk/RiskPreBattle");

        }

    }
}

module ProUI.Risk {
    export class RiskRewardSumUI extends View {
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Risk.ChildView.RiskRewardSumItemViewUI",ProUI.Risk.ChildView.RiskRewardSumItemViewUI);

            super.createChildren();
            this.loadUI("Risk/RiskRewardSum");

        }

    }
}

module ProUI.Risk {
    export class RiskShopUI extends View {
		public btnClose:component.UIButton;
		public txtTimer:component.UILabel;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.RiskShopItemView",Pro.RiskShopItemView);

            super.createChildren();
            this.loadUI("Risk/RiskShop");

        }

    }
}

module ProUI.Risk {
    export class RiskTargetRewardUI extends View {
		public btnClose:component.UIButton;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Risk.ChildView.RiskTargetRewardItemUI",ProUI.Risk.ChildView.RiskTargetRewardItemUI);

            super.createChildren();
            this.loadUI("Risk/RiskTargetReward");

        }

    }
}

module ProUI.Sail {
    export class DetailInfoUI extends View {
		public AutoSendBtn:component.UIButton;
		public SendBtn:component.UIButton;
		public HeroTypeBox:component.UIItemBox;
		public HeroTypeSelectImg:Laya.Image;
		public SailCondtionBox:component.UIItemBox;
		public btnGetPoint:component.UIButton;
		public SailCondtionStarBox:Laya.Image;
		public SailCondtionStarLb:component.UILabel;
		public HeroOnBGBox:component.UIItemBox;
		public HeroOnBox:component.UIItemBox;
		public HeroList:component.UIList;
		public SailCondtionLb:component.UILabel;
		public SailPointLb:component.UILabel;
		public SaillNeedTimeLb:component.UILabel;
		public HeroDragEff:Pro.NorItemUI;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);

            super.createChildren();
            this.loadUI("Sail/DetailInfo");

        }

    }
}

module ProUI.Sail {
    export class MainUI extends View {
		public ItemList:component.UIList;
		public InfoBox:Laya.Box;
		public InfoImg:Laya.Image;
		public btnPrivilege:component.UIButton;
		public ActiveValueImg:Laya.Image;
		public ActiveValueLb:component.UILabel;
		public SailJuanLb:component.UILabel;
		public QABtn:component.UIButton;
		public uiPrivilege:ProUI.Sail.SailPrivilegeTipViewUI;
		public RefreshBtn:component.UIButton;
		public RefreshFreeLb:component.UILabel;
		public RefreshCostBox:Laya.HBox;
		public RefreshCostImg:Laya.Image;
		public RefreshCostLb:component.UILabel;
		public btn_oneKeyGet:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Sail.SailInfoItemUI",ProUI.Sail.SailInfoItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Sail.SailPrivilegeTipViewUI",ProUI.Sail.SailPrivilegeTipViewUI);

            super.createChildren();
            this.loadUI("Sail/Main");

        }

    }
}

module ProUI.Sail {
    export class SailInfoItemUI extends Laya.Box {
		public BGImg:Laya.Image;
		public AcceptBtn:component.UIButton;
		public reddotAccept:Laya.Image;
		public SpeedBtn:component.UIButton;
		public SpeedLb:component.UILabel;
		public RewardBtn:component.UIButton;
		public InSailingImg:Laya.Image;
		public ProgressImg:Laya.Image;
		public ProgressLb:component.UILabel;
		public RewardBox:component.UIItemBox;
		public AcceptBox:Laya.Box;
		public AcceptCostLb:component.UILabel;
		public QuImg:component.UIFrameImage;
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["Sail/SailInfoItem"], this, this);

        }

    }
}

module ProUI.Sail {
    export class SailPrivilegeTipViewUI extends Laya.Box {
		public bg:Laya.Image;
		public bgMask:component.UIButton;
		public btnActive:component.UIButton;
		public txtTitle1:component.UILabel;
		public txtDes1:component.UIHtmlText;
		public txtActive1:component.UILabel;
		public txtTitle2:component.UILabel;
		public txtDes2:component.UIHtmlText;
		public txtActive2:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Sail/SailPrivilegeTipView"], this, this);

        }

    }
}

module ProUI.Scene.Battle {
    export class ArtifactItemUI extends Laya.Box {
		public imgIconGray:Laya.Image;
		public qiNumLab:component.UILabel;
		public tuteng_nengliang1:Laya.Image;
		public tuteng_nengliang2:Laya.Image;
		public tuteng_nengliang3:Laya.Image;
		public centerPos:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/Battle/ArtifactItem"], this, this);

        }

    }
}

module ProUI.Scene.Battle.Effect {
    export class BuffNameUI extends View {
		public NameLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/Battle/Effect/BuffName");

        }

    }
}

module ProUI.Scene.Battle.Effect {
    export class DefendSkillUI extends View {
		public img_bg:Laya.Image;
		public lbl_name:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/Battle/Effect/DefendSkill");

        }

    }
}

module ProUI.Scene.Battle.Effect {
    export class HurtNumUI extends View {
		public bg:Laya.Image;
		public numSp:component.UIBitmapText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIBitmapText",component.UIBitmapText);

            super.createChildren();
            this.loadUI("Scene/Battle/Effect/HurtNum");

        }

    }
}

module ProUI.Scene.Battle.Effect {
    export class RoleStatueUI extends View {
		public bloodProImg:Laya.Image;
		public LvImg:Laya.Image;
		public buffImg:Laya.Image;
		public frameImgPetType:component.UIFrameImage;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);

            super.createChildren();
            this.loadUI("Scene/Battle/Effect/RoleStatue");

        }

    }
}

module ProUI.Scene.Battle.Effect {
    export class SkillNameUI extends View {
		public ani1:Laya.FrameAnimation;
		public bg:Laya.Image;
		public IconImg:Laya.Image;
		public NameLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/Battle/Effect/SkillName");

        }

    }
}

module ProUI.Scene.Battle.Harm {
    export class HarmItemUI extends Laya.Box {
		public OwnPetItem:Pro.NorItemUI;
		public OtherPetItem:Pro.NorItemUI;
		public OwnBuffsBox:component.UIItemBox;
		public OtherBuffsBox:component.UIItemBox;
		public OwnBtn:component.UIButton;
		public OtherBtn:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/Battle/Harm/HarmItem"], this, this);

        }

    }
}

module ProUI.Scene.Battle.Harm {
    export class HeroBuffTipsUI extends View {
		public bg:Laya.Image;
		public listView:component.UIItemBox;
		public txtPetName:component.UILabel;
		public txtPetLv:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Scene.Battle.Harm.HeroBuffTipsItemUI",ProUI.Scene.Battle.Harm.HeroBuffTipsItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/Battle/Harm/HeroBuffTips");

        }

    }
}

module ProUI.Scene.Battle.Harm {
    export class HeroBuffTipsItemUI extends Laya.Box {
		public imgIcon:Laya.Image;
		public txtName:component.UILabel;
		public txtDesc:component.UILabel;
		public txtTimeOver:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/Battle/Harm/HeroBuffTipsItem"], this, this);

        }

    }
}

module ProUI.Scene.Battle.Harm {
    export class MainUI extends View {
		public ItemBox:component.UIItemBox;
		public OtherNameLb:component.UILabel;
		public OwnNameLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Scene.Battle.Harm.HarmItemUI",ProUI.Scene.Battle.Harm.HarmItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/Battle/Harm/Main");

        }

    }
}

module ProUI.Scene.Battle.item {
    export class BattleSkillItemUI extends View {
		public img_lock:Laya.Image;
		public itemUI:ProUI.Utils.SkillItemUI;
		public img_mask:Laya.Image;
		public lbl_time:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ProUI.Utils.SkillItemUI",ProUI.Utils.SkillItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/Battle/item/BattleSkillItem");

        }

    }
}

module ProUI.Scene.Battle {
    export class MainUI extends View {
		public VSBox:Laya.Box;
		public img_defend_enemy:Laya.Image;
		public lbl_defendLevel_enemy:component.UILabel;
		public itemBox_skill_enemy:component.UIItemBox;
		public img_defend_self:Laya.Image;
		public lbl_defendLevel_self:component.UILabel;
		public itemBox_skill_self:component.UIItemBox;
		public BuffBtn:component.UIButton;
		public btn_giveUpTeamOne:component.UIButton;
		public OwnZhenxingBtn:ProUI.Utils.ZhengxingItemUI;
		public OtherZhenxingBtn:ProUI.Utils.ZhengxingItemUI;
		public OwnZhenfaImg:Laya.Image;
		public OtherZhenfaImg:Laya.Image;
		public SpeedBtn:component.UIButton;
		public SpeedLb:component.UILabel;
		public JumpBtn:component.UIButton;
		public OwnNameLb:component.UILabel;
		public OtherNameLb:component.UILabel;
		public RoundLb:component.UILabel;
		public btn_skin_skill2:component.UIButton;
		public btn_skin_skill2_gray:Laya.Image;
		public TopBox:Laya.Box;
		public PassRewardBtn:component.UIButton;
		public PassRewardRed:Laya.Image;
		public EndlessBox:Laya.Box;
		public EndlessPassRewardBox:component.UIItemBox;
		public EndlessStageLb:component.UILabel;
		public EndlessBuffLb:component.UILabel;
		public EndlessPassRewardLb:component.UILabel;
		public EndlessExitBtn:component.UIButton;
		public EndlessRewardBtn:component.UIButton;
		public EndlessRewardLb:component.UILabel;
		public OwnArtifactUI:ProUI.Scene.Battle.ArtifactItemUI;
		public EnemyArtifactUI:ProUI.Scene.Battle.ArtifactItemUI;
		public HeavenBox:Laya.Box;
		public img_star_1:Laya.Image;
		public img_star_2:Laya.Image;
		public img_star_3:Laya.Image;
		public txt_rules_1:component.UILabel;
		public txt_rules_2:component.UILabel;
		public txt_rules_3:component.UILabel;
		public HeavenExitBtn:component.UIButton;
		public crossChallengeBox:Laya.Box;
		public lblCrossChallenge:component.UILabel;
		public iconCrossChallenge1:component.UIFrameImage;
		public resultCrossChallenge1:component.UIFrameImage;
		public iconCrossChallenge2:component.UIFrameImage;
		public resultCrossChallenge2:component.UIFrameImage;
		public iconCrossChallenge3:component.UIFrameImage;
		public resultCrossChallenge3:component.UIFrameImage;
		public activityBossBox:Laya.Box;
		public imgProBg:Laya.Image;
		public imgProHead:Laya.Image;
		public imgProTmp:Laya.Image;
		public imgPro:Laya.Image;
		public lblHp:component.UILabel;
		public iconBoss:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.BattleSkillItem",Pro.BattleSkillItem);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("ProUI.Utils.ZhengxingItemUI",ProUI.Utils.ZhengxingItemUI);
			View.regComponent("ProUI.Utils.LongTroopItemUI",ProUI.Utils.LongTroopItemUI);
			View.regComponent("ProUI.Scene.Battle.ArtifactItemUI",ProUI.Scene.Battle.ArtifactItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            super.createChildren();
            this.loadUI("Scene/Battle/Main");

        }

    }
}

module ProUI.Scene.City.HookBg {
    export class SceneInfo1UI extends Laya.Box {
		public nodePosList:Laya.Box;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Scene.City.HookBg.StageNodeUI",ProUI.Scene.City.HookBg.StageNodeUI);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/HookBg/SceneInfo1"], this, this);

        }

    }
}

module ProUI.Scene.City.HookBg {
    export class StageNodeUI extends Laya.Box {
		public nodeFrame:component.UIFrameImage;
		public imgTextBg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/HookBg/StageNode"], this, this);

        }

    }
}

module ProUI.Scene.City {
    export class MainUI extends View {
		public BaseBattleLayer:Laya.Box;
		public OnlinePrizeBtnInfo:Pro.OnlinePrizeButtonInfo;
		public BaseBattleCityLayer:Laya.Box;
		public systemPreview:Pro.SystemPreviewButton;
		public PlayerInfo:Pro.PlayerInfo;
		public FunInfo:Pro.FunInfo;
		public ChatLayer:Laya.Box;
		public ChatBtn:component.UIButton;
		public ChatRedDotImg:Laya.Image;
		public ChatRedDotLb:component.UILabel;
		public GMBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.OnlinePrizeButtonInfo",Pro.OnlinePrizeButtonInfo);
			View.regComponent("Pro.SystemPreviewButton",Pro.SystemPreviewButton);
			View.regComponent("Pro.PlayerInfo",Pro.PlayerInfo);
			View.regComponent("Pro.FunInfo",Pro.FunInfo);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/City/Main");

        }

    }
}

module ProUI.Scene.City {
    export class MapLongUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Scene/City/MapLong");

        }

    }
}

module ProUI.Scene.City {
    export class RoleStatueUI extends View {
		public bloodProImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Scene/City/RoleStatue");

        }

    }
}

module ProUI.Scene.City.Utils {
    export class ActivityEnterButtonUI extends component.UIButton {
		public effPos:Laya.Box;
		public reddot:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/Utils/ActivityEnterButton"], this, this);

        }

    }
}

module ProUI.Scene.City.Utils {
    export class aniActBtnEffectUI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Scene/City/Utils/aniActBtnEffect");

        }

    }
}

module ProUI.Scene.City.Utils {
    export class ArtifactInfoUI extends component.UIButton {
		public IconImg:Laya.Image;
		public ProImg:Laya.Image;
		public RedDotImg:Laya.Image;
		public ProLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/Utils/ArtifactInfo"], this, this);

        }

    }
}

module ProUI.Scene.City.Utils {
    export class FirstPayTipsUI extends Laya.Box {
		public btnFirstPay:component.UIButton;
		public htmlTimer:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/Utils/FirstPayTips"], this, this);

        }

    }
}

module ProUI.Scene.City.Utils {
    export class FunInfoUI extends View {
		public blackAlpha:Laya.Image;
		public FighterBtn:component.UIButton;
		public FightRedDotImg:Laya.Image;
		public HomeBtn:component.UIButton;
		public homeIcon:Laya.Image;
		public HomeRedDotImg:Laya.Image;
		public HeroBagBtn:component.UIButton;
		public HeroBagRedDotImg:Laya.Image;
		public ItemBagBtn:component.UIButton;
		public ItemBagRedDotImg:Laya.Image;
		public TraveBtn:component.UIButton;
		public TraveRedDotImg:Laya.Image;
		public FactionBtn:component.UIButton;
		public FactionRedDotImg:Laya.Image;
		public WeaponBtn:component.UIButton;
		public WeaponRedDotImg:Laya.Image;
		public bubbleTips:Pro.BubbleTipsView;
		public autoFightPop:Pro.BubbleTipsView;
		public openTipsTrave:component.UILabel;
		public openTipsWeapon:component.UILabel;
		public openTipsFaction:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.BubbleTipsView",Pro.BubbleTipsView);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/City/Utils/FunInfo");

        }

    }
}

module ProUI.Scene.City.Utils {
    export class HookChapterMapUI extends View {
		public bg:Laya.Image;
		public PetVDrawImg:Laya.Image;
		public chapterNameTxt:component.UILabel;
		public chapterProgressTxt:component.UILabel;
		public BackBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Scene/City/Utils/HookChapterMap");

        }

    }
}

module ProUI.Scene.City.Utils {
    export class HookInfoUI extends Laya.Box {
		public bg:Laya.Box;
		public QuickFightBtn:component.UIButton;
		public HeroStrengthBtn:component.UIButton;
		public btnAtkBoss:component.UIButton;
		public GoNewMapBtn:component.UIButton;
		public Checkpoint:component.UILabel;
		public DetailBtn:component.UILabelButton;
		public HookRewardBox:component.UIItemBox;
		public GetRewardBtn:component.UIButton;
		public GetRewardBox:Laya.Box;
		public rewardImg:Laya.Image;
		public HookTImeImg:Laya.Image;
		public HookProIMg:Laya.Image;
		public GetRewardLb:component.UILabel;
		public hboxSceneName:Laya.HBox;
		public imgSceneNameNum:Laya.Image;
		public imgSceneName:Laya.Image;
		public ItemList:component.UIList;
		public bubbleTips:Pro.BubbleTipsView;
		public AtkBossImage:Laya.Image;
		public AtkBossLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UILabelButton",component.UILabelButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Utils.LongTroopItemUI",ProUI.Utils.LongTroopItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("Pro.BubbleTipsView",Pro.BubbleTipsView);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/Utils/HookInfo"], this, this);

        }

    }
}

module ProUI.Scene.City.Utils {
    export class HookLayerUI extends View {
		public battleLayer:Pro.HookBattleLayer;
		public HookRightTop:Laya.Box;
		public hookTopBtnsBox:Laya.Box;
		public TaskBtn:component.UIButton;
		public TaskRedDotImg:Laya.Image;
		public PassRewardBtn:component.UIButton;
		public PassRewardRedDotImg:Laya.Image;
		public ChapterMapBtn:component.UIButton;
		public SailBtn:component.UIButton;
		public SailProImg:Laya.Image;
		public imgSailReddot:Laya.Image;
		public SailBGImg:Laya.Image;
		public SailProLb:component.UILabel;
		public firstPayTips:Pro.FirstPayTips;
		public HookLeftTop:Laya.Box;
		public LevelTarget:Pro.LevelTargetInfo;
		public HookInfo:Pro.HookInfo;
		public WorldLvBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.HookBattleLayer",Pro.HookBattleLayer);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.FirstPayTips",Pro.FirstPayTips);
			View.regComponent("Pro.LevelTargetInfo",Pro.LevelTargetInfo);
			View.regComponent("Pro.HookInfo",Pro.HookInfo);

            super.createChildren();
            this.loadUI("Scene/City/Utils/HookLayer");

        }

    }
}

module ProUI.Scene.City.Utils {
    export class HookSceneInfoLayerUI extends Laya.Box {
		public panel:Laya.Panel;
		public panelContent:Laya.Box;
		public nodeTitleLableBox:Laya.Box;
		public topLayer:Laya.Box;
		public roleBox:Laya.Box;

        constructor(){ super();this.createUI();}
        createUI():void {
        
            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/Utils/HookSceneInfoLayer"], this, this);

        }

    }
}

module ProUI.Scene.City.Utils {
    export class HookScenePrizeReviewUI extends Laya.Box {
		public norItemPreview:Pro.NorItemUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/Utils/HookScenePrizeReview"], this, this);

        }

    }
}

module ProUI.Scene.City.Utils {
    export class HookTipsUI extends Laya.Box {
		public TipsLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/Utils/HookTips"], this, this);

        }

    }
}

module ProUI.Scene.City.Utils {
    export class hupaBtnUI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Scene/City/Utils/hupaBtn");

        }

    }
}

module ProUI.Scene.City.Utils {
    export class LevelTargetUI extends component.UIButton {
		public skBg:Laya.Image;
		public btnBg:component.UIButton;
		public ProImg:Laya.Image;
		public norItem:Pro.NorItemUI;
		public ProLb:component.UILabel;
		public ProTarget1:component.UIHtmlText;
		public ProTarget2:component.UIHtmlText;
		public levelBtn:component.UIButton;
		public desBox:Laya.Box;
		public cloudBg:Laya.Image;
		public desLab:component.UIHtmlText;
		public RedDot:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/Utils/LevelTarget"], this, this);

        }

    }
}

module ProUI.Scene.City.Utils {
    export class newYearBtnUI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Scene/City/Utils/newYearBtn");

        }

    }
}

module ProUI.Scene.City.Utils {
    export class OnlinePrizeButtonUI extends Laya.Box {
		public bg:component.UIButton;
		public norItem:Pro.NorItemUI;
		public txtState:component.UILabel;
		public redDotImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/Utils/OnlinePrizeButton"], this, this);

        }

    }
}

module ProUI.Scene.City.Utils {
    export class PlayerInfoUI extends View {
		public topBg:Laya.Box;
		public ResCenter:Laya.Box;
		public PlayerIconImg:component.UIButton;
		public PlayerIconFrameImg:Laya.Image;
		public ExpProImg:Laya.Image;
		public vipIcon:Laya.Image;
		public txtVipLv:component.UIBitmapText;
		public Res_Gold_Btn:component.UIButton;
		public Res_Gold_BtnIcon:Laya.Image;
		public GoldImg:Laya.Image;
		public Res_Diamond_Btn:component.UIButton;
		public DiamondImg:Laya.Image;
		public Res_Exp_Btn:component.UIButton;
		public goldReddot:Laya.Image;
		public Res_Gold_Lb:component.UILabel;
		public PlayerNameLb:component.UILabel;
		public PlayerPowerLb:component.UILabel;
		public Res_Diamond_Lb:component.UILabel;
		public Res_Exp_Lb:component.UILabel;
		public PlayerLvLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/City/Utils/PlayerInfo");

        }

    }
}

module ProUI.Scene.City.Utils {
    export class SystemPreviewUI extends component.UIButton {
		public imgSystemPreviewIcon:Laya.Image;
		public systemPreviewEffPos:Laya.Box;
		public imgReddot:Laya.Image;
		public txtSystemPreviewName:component.UILabel;
		public txtSystemPreviewCondition:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/City/Utils/SystemPreview"], this, this);

        }

    }
}

module ProUI.Scene.City.Utils {
    export class ZhuChengUI extends View {
		public aniEndlessBuff:Laya.FrameAnimation;
		public mapInfo:Pro.ZhuChengMapInfo;
		public FunBox:Laya.Box;
		public TopLayer1:Laya.Box;
		public btnPay:component.UIButton;
		public imgReddotPay:Laya.Image;
		public btnWelfare:component.UIButton;
		public imgReddotWelfare:Laya.Image;
		public btnFund:component.UIButton;
		public reddotFund:Laya.Image;
		public txtFundTimer:component.UILabel;
		public btn_sevenDayLogin:component.UIButton;
		public reddotSevenLogin:Laya.Image;
		public sevenDayLoginAwardLab:component.UILabel;
		public btn_sevenDayProgress:component.UIButton;
		public reddotSevenAchieve:Laya.Image;
		public btnWarOrder:component.UIButton;
		public reddotWarOrder:Laya.Image;
		public btnZeroBuy:component.UIButton;
		public reddotZeroBuy:Laya.Image;
		public TopLayer2:Laya.Box;
		public btnTreasure:component.UIButton;
		public reddotTreasure:Laya.Image;
		public btnDayFirstPay:component.UIButton;
		public reddotDayFirstPay:Laya.Image;
		public btnPeak:component.UIButton;
		public reddotPeak:Laya.Image;
		public txtPeakTimer:component.UILabel;
		public btnSonOfDestiny:component.UIButton;
		public reddotSonOfDestiny:Laya.Image;
		public btnFirstPay:component.UIButton;
		public reddotFirstPay:Laya.Image;
		public btnLimitCharge:component.UIButton;
		public reddotLimitCharge:Laya.Image;
		public btn_shotTimeGifts:component.UIButton;
		public frameTimeGift:component.UIFrameImage;
		public effShotTimeGift:ProUI.Ani.efc.NodeWaggleUI;
		public reddotShortTimeGift:Laya.Image;
		public txt_shortGiftTime:component.UILabel;
		public TopLayer3:Laya.Box;
		public btnNewYear:component.UIButton;
		public reddotNewYear:Laya.Image;
		public pop:Laya.Image;
		public TopLayer4:Laya.Box;
		public btnRedEnvelope:component.UIButton;
		public redRedEnvelope:Laya.Image;
		public btnBullishRank:component.UIButton;
		public btnWelcomeWarOrder:component.UIButton;
		public redWelcomeWarOrder:Laya.Image;
		public btnCumulativeLogin:component.UIButton;
		public reddotCumulativeLogin:Laya.Image;
		public btnSmallGame:component.UIButton;
		public pop2:Laya.Image;
		public TopLayer5:Laya.Box;
		public btnLianLianKan:component.UIButton;
		public btnGuessHero:component.UIButton;
		public reddotGuessHero:Laya.Image;
		public btnWeekWelfare:component.UIButton;
		public reddotWeekWelfare:Laya.Image;
		public btnEvolutionWarOrder:component.UIButton;
		public redEvolutionWarOrder:Laya.Image;
		public btnHefu:component.UIButton;
		public reddotHefu:Laya.Image;
		public pop3:Laya.Image;
		public TopLayer6:Laya.Box;
		public btnLiuYi:component.UIButton;
		public reddotLiuYi:Laya.Image;
		public pop4:Laya.Image;
		public TopLayer7:Laya.Box;
		public btnDuanwu:component.UIButton;
		public reddotDuanwu:Laya.Image;
		public pop5:Laya.Image;
		public TopLayer8:Laya.Box;
		public RightLayer:Laya.Box;
		public btnDragonBall:component.UIButton;
		public reddotDragonBall:Laya.Image;
		public TopLeftLayer:Laya.Box;
		public TopLeftBtns:Laya.Box;
		public btnRankActivity:component.UIButton;
		public reddotRankActivity:Laya.Image;
		public btn_chargeRebate:component.UIButton;
		public btnShrink:component.UIButton;
		public btnRankBag:component.UIButton;
		public BottomLayer:Laya.Box;
		public Bottom1Box:Laya.Box;
		public VedioBtn:component.UIButton;
		public imgVedioRedDot:Laya.Image;
		public FriendBtn:component.UIButton;
		public imgFriendRedDot:Laya.Image;
		public MailBtn:component.UIButton;
		public MailRedDotImg:Laya.Image;
		public RankBtn:component.UIButton;
		public Bottom2Box:Laya.Box;
		public QuestBtn:component.UIButton;
		public TaskRedDodtImg:Laya.Image;
		public ControlBtn:component.UIButton;
		public btnChoiceEndBuffs:component.UIButton;
		public autoChoiceEndBuffsLbl:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.ZhuCheng",Pro.ZhuCheng);
			View.regComponent("Pro.ZhuChengMapInfo",Pro.ZhuChengMapInfo);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Scene.City.Utils.aniActBtnEffectUI",ProUI.Scene.City.Utils.aniActBtnEffectUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("ProUI.Ani.efc.NodeWaggleUI",ProUI.Ani.efc.NodeWaggleUI);
			View.regComponent("ProUI.Scene.City.Utils.newYearBtnUI",ProUI.Scene.City.Utils.newYearBtnUI);

            super.createChildren();
            this.loadUI("Scene/City/Utils/ZhuCheng");

        }

    }
}

module ProUI.Scene.City.Utils {
    export class ZhuchengMapInfoUI extends View {
		public floatageBuildAni1:Laya.FrameAnimation;
		public floatageBuildAni2:Laya.FrameAnimation;
		public bg:Laya.Image;
		public zjm_mmx:Laya.Sprite;
		public zjm_fdpp:Laya.Sprite;
		public zjm_kdy:Laya.Sprite;
		public zjm_pkq:Laya.Sprite;
		public zjm_pqlz:Laya.Sprite;
		public zjm_xbb:Laya.Sprite;
		public zjm_zdpp:Laya.Sprite;
		public ShopBtn:component.UIButton;
		public SecretShopBtn:component.UIButton;
		public QuestionnaireBtn:component.UIButton;
		public PetCombinBtn:component.UIButton;
		public PetCombinRedDotImg:Laya.Image;
		public CallBtn:component.UIButton;
		public CallRedDotImg:Laya.Image;
		public EquipCombinBtn:component.UIButton;
		public Reddot_Combine:Laya.Image;
		public PetLibBtn:component.UIButton;
		public PetExchangeBtn:component.UIButton;
		public reddotPetExchange:Laya.Image;
		public PetSplitBtn:component.UIButton;
		public SecretTravelBtn:component.UIButton;
		public SecretTravelRedDotImg:Laya.Image;
		public AcrossBatBtn:component.UIButton;
		public AcrossBatRedImg:Laya.Image;
		public StarTowerAdvBtn:component.UIButton;
		public reddotStarTowerAdv:Laya.Image;
		public StarTowerBtn:component.UIButton;
		public Reddot_starTower:Laya.Image;
		public AcrossSpaceBtn:component.UIButton;
		public ArenaBtn:component.UIButton;
		public AreaRedDotImg:Laya.Image;
		public ChampionshipsBtn:component.UIButton;
		public ChampionshipsRedDotImg:Laya.Image;
		public IllustrationBtn:component.UIButton;
		public IllustrationRedDotImg:Laya.Image;
		public ResonanceBtn:component.UIButton;
		public EggHatchBtn:component.UIButton;
		public EggHatchRedDotImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/City/Utils/ZhuchengMapInfo");

        }

    }
}

module ProUI.Scene.Login.ChoiceServer {
    export class MainUI extends View {
		public btnClose:component.UIButton;
		public TitleList:component.UIList;
		public ServerTable:component.UITableView;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Scene.Login.ChoiceServer.TitleItemUI",ProUI.Scene.Login.ChoiceServer.TitleItemUI);
			View.regComponent("UITableView",component.UITableView);
			View.regComponent("ProUI.Scene.Login.ChoiceServer.serverTableHeadUI",ProUI.Scene.Login.ChoiceServer.serverTableHeadUI);
			View.regComponent("ProUI.Scene.Login.ChoiceServer.serverTableCellUI",ProUI.Scene.Login.ChoiceServer.serverTableCellUI);

            super.createChildren();
            this.loadUI("Scene/Login/ChoiceServer/Main");

        }

    }
}

module ProUI.Scene.Login.ChoiceServer {
    export class serverTableCellUI extends Laya.Box {
		public TapBtn:component.UIButton;
		public IconImg:Laya.Image;
		public NameLb:component.UILabel;
		public LvLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/Login/ChoiceServer/serverTableCell"], this, this);

        }

    }
}

module ProUI.Scene.Login.ChoiceServer {
    export class serverTableHeadUI extends Laya.Box {
		public TapBtn:component.UIButton;
		public StatueFrameImg:component.UIFrameImage;
		public imgRole:Laya.Image;
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/Login/ChoiceServer/serverTableHead"], this, this);

        }

    }
}

module ProUI.Scene.Login.ChoiceServer {
    export class TitleItemUI extends component.UIButton {
		public NameLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/Login/ChoiceServer/TitleItem"], this, this);

        }

    }
}

module ProUI.Scene.Login {
    export class MainUI extends View {
		public BGImg:Laya.Image;
		public btnChoiceServer:component.UIButton;
		public serverStatueFrameImg:component.UIFrameImage;
		public serverNameLB:component.UILabel;
		public btnEnterGame:component.UIButton;
		public TestServerBox:Laya.Box;
		public TestServerInput:Laya.TextInput;
		public TestServerBtn:component.UIButton;
		public rightopBox:Laya.VBox;
		public btnpersonCenter:component.UIButton;
		public btnNotice:component.UIButton;
		public btnUserAgreement:component.UIButton;
		public accountMsgBox:Laya.Box;
		public inputAccount:Laya.TextInput;
		public inputPsw:Laya.TextInput;
		public btnRegist:component.UIButton;
		public btnLogin:component.UIButton;
		public btnguest:component.UIButton;
		public labtip:component.UILabel;
		public personInfoBox:Laya.Box;
		public btnPercenterClose:component.UIButton;
		public btnChangePsw:component.UIButton;
		public btnBindEmail:component.UIButton;
		public btnLoginOut:component.UIButton;
		public labPersonCentreAccount:component.UILabel;
		public labbindEmailTips:component.UILabel;
		public changePswBox:Laya.Box;
		public btnCloseChangePsw:component.UIButton;
		public inputOriginalPsw:Laya.TextInput;
		public inputNewPsw:Laya.TextInput;
		public inputConfirmPsw:Laya.TextInput;
		public btnConformChange:component.UIButton;
		public ChangePswTips:component.UILabel;
		public bindEmailBox:Laya.Box;
		public btnCloseBindEmail:component.UIButton;
		public inputBindEmail:Laya.TextInput;
		public inputBindEmailPsw:Laya.TextInput;
		public btnConformBind:component.UIButton;
		public labBindEmailTips:component.UILabel;
		public conformLoginOutBox:Laya.Box;
		public btnCloseLoginOut:component.UIButton;
		public btnConformLoginOut:component.UIButton;
		public Descript:component.UILabel;
		public leftTopBox:Laya.Box;
		public versionNum:component.UILabel;
		public agreeBox:Laya.Box;
		public agreeHtml:component.UIHtmlText;
		public agreeBtn:component.UIButton;
		public userAgreeFlag:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Scene/Login/Main");

        }

    }
}

module ProUI.Scene.Login {
    export class NoticeUI extends View {
		public panel:Laya.Panel;
		public html:component.UIHtmlText;
		public tabGrp:component.UITab;
		public titleLbl:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Scene/Login/Notice");

        }

    }
}

module ProUI.Scene.Login {
    export class UserAgreementUI extends View {
		public txtTitle:component.UILabel;
		public box2:Laya.Box;
		public tabGrp:component.UITab;
		public panel2:Laya.Panel;
		public html2:component.UIHtmlText;
		public knowBtn:component.UILabelButton;
		public box1:Laya.Box;
		public panel1:Laya.Panel;
		public html1:component.UIHtmlText;
		public noUseBtn:component.UILabelButton;
		public agreetBtn:component.UILabelButton;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabelButton",component.UILabelButton);

            super.createChildren();
            this.loadUI("Scene/Login/UserAgreement");

        }

    }
}

module ProUI.Scene.WorldMap {
    export class MainUI extends View {
		public MapNode:Laya.Box;
		public CloseBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);

            super.createChildren();
            this.loadUI("Scene/WorldMap/Main");

        }

    }
}

module ProUI.Scene.WorldMap {
    export class MapUI extends View {
		public BG:Laya.Box;
		public areaBox:Laya.Box;
		public chapterBox_1:Laya.Box;
		public chapterBox_2:Laya.Box;
		public chapterBox_3:Laya.Box;
		public chapterBox_4:Laya.Box;
		public chapterBox_5:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Scene.WorldMap.PageView.WorldMapItemUI",ProUI.Scene.WorldMap.PageView.WorldMapItemUI);

            super.createChildren();
            this.loadUI("Scene/WorldMap/Map");

        }

    }
}

module ProUI.Scene.WorldMap.PageView {
    export class WorldMapItemUI extends component.UIButton {
		public img_passed:Laya.Image;
		public img_lock:Laya.Image;
		public txt_progress:component.UILabel;
		public txt_name:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Scene/WorldMap/PageView/WorldMapItem"], this, this);

        }

    }
}

module ProUI.Shape.ChildView {
    export class PageViewHeadUI extends Laya.Box {
		public btnUse:component.UIButton;
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Shape.ChildView.PageViewIconItemUI",ProUI.Shape.ChildView.PageViewIconItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Shape/ChildView/PageViewHead"], this, this);

        }

    }
}

module ProUI.Shape.ChildView {
    export class PageViewHeadFrameUI extends Laya.Box {
		public btnUse:component.UIButton;
		public btnActive:component.UIButton;
		public listView:component.UIList;
		public viewActiveTip:Laya.Image;
		public activeTipIcon:Laya.Image;
		public activeTipCondition:component.UILabel;
		public activeTipTime:component.UILabel;
		public activeTipName:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Shape.ChildView.PageViewHeadFrameItemUI",ProUI.Shape.ChildView.PageViewHeadFrameItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Shape/ChildView/PageViewHeadFrame"], this, this);

        }

    }
}

module ProUI.Shape.ChildView {
    export class PageViewHeadFrameItemUI extends Laya.Box {
		public btn:component.UIButton;
		public icon:Laya.Image;
		public sel:Laya.Image;
		public using:Laya.Image;
		public txtName:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Shape/ChildView/PageViewHeadFrameItem"], this, this);

        }

    }
}

module ProUI.Shape.ChildView {
    export class PageViewIconItemUI extends Laya.Box {
		public btn:component.UIButton;
		public icon:Laya.Image;
		public sel:Laya.Image;
		public using:Laya.Image;
		public txtName:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Shape/ChildView/PageViewIconItem"], this, this);

        }

    }
}

module ProUI.Shape.ChildView {
    export class PageViewShapeUI extends Laya.Box {
		public btnUse:component.UIButton;
		public txtAttrEmpty:component.UILabel;
		public txtIsActivity:component.UILabel;
		public listCondition:component.UIItemBox;
		public listAttr:component.UIItemBox;
		public listView:component.UIList;
		public imgAvatar:Laya.Box;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Shape.ChildView.PageViewIconItemUI",ProUI.Shape.ChildView.PageViewIconItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Shape/ChildView/PageViewShape"], this, this);

        }

    }
}

module ProUI.Shape.ChildView {
    export class PageViewTitleUI extends Laya.Box {
		public btnGoto:component.UIButton;
		public btnUse:component.UIButton;
		public btnActive:component.UIButton;
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Shape.ChildView.PageViewTitleItemUI",ProUI.Shape.ChildView.PageViewTitleItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Shape/ChildView/PageViewTitle"], this, this);

        }

    }
}

module ProUI.Shape.ChildView {
    export class PageViewTitleItemUI extends Laya.Image {
		public sel:Laya.Image;
		public icon:Laya.Image;
		public using:Laya.Image;
		public txtActiveTip:component.UILabel;
		public listAttr:component.UIItemBox;
		public txtDes:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);

            Laya.ClassUtils.createByJson(View.uiMap["Shape/ChildView/PageViewTitleItem"], this, this);

        }

    }
}

module ProUI.Shape {
    export class ShapeDevUI extends View {
		public tabGroup:component.UITab;
		public pageViewContainer:Pro.TableBarContiner;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("Shape/ShapeDev");

        }

    }
}

module ProUI.Shop {
    export class FullPriceBuyUI extends View {
		public btnClose:component.UIButton;
		public btnLeft:component.UIButton;
		public btnRight:component.UIButton;
		public btnBuy:component.UIButton;
		public norItemView:Pro.NorItemUI;
		public txtName:component.UILabel;
		public txtBuyCount:component.UILabel;
		public txtDiamon:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Shop/FullPriceBuy");

        }

    }
}

module ProUI.Shop {
    export class HuPaShopItemViewUI extends Laya.Box {
		public backBtn:component.UIButton;
		public imgCurrency:Laya.Image;
		public txtName:component.UILabel;
		public htmlTxtLimit:component.UIHtmlText;
		public txtCurrencyCount:component.UILabel;
		public imgFullBack:Laya.Image;
		public itemUI:Pro.NorItemUI;
		public boxLearn:Laya.Image;
		public imgDiscount:Laya.Image;
		public txtDiscount:component.UILabel;
		public darkImage:Laya.Image;
		public imgFullLimt:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Shop/HuPaShopItemView"], this, this);

        }

    }
}

module ProUI.Shop {
    export class MainUI extends View {
		public btnHelp:component.UIButton;
		public tabMainGrp:component.UITab;
		public tabSubPage:component.UITab;
		public imgCurrency:Laya.Image;
		public txtCurrencyCount:component.UILabel;
		public imgListBg:Laya.Image;
		public listItems:component.UIList;
		public txtFreeCount:component.UILabel;
		public txtRefreshLimit:component.UILabel;
		public txtFreeFreshLable:component.UILabel;
		public txtFreeFreshTime:component.UILabel;
		public btnFreeRefresh:component.UIButton;
		public btnFeeRefresh:component.UIButton;
		public hboxBtnFeeRefresh:Laya.HBox;
		public imgRefreshBtnNeed:Laya.Image;
		public txtRefreshBtnNeed:component.UILabel;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.ShopItemView",Pro.ShopItemView);

            super.createChildren();
            this.loadUI("Shop/Main");

        }

    }
}

module ProUI.Shop {
    export class ScoreShopUI extends View {
		public btnClose:component.UIButton;
		public imgCurrency:Laya.Image;
		public txtCurrencyCount:component.UILabel;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.ShopItemView",Pro.ShopItemView);

            super.createChildren();
            this.loadUI("Shop/ScoreShop");

        }

    }
}

module ProUI.Shop {
    export class ShopBuyViewUI extends View {
		public btnClose:component.UIButton;
		public btnOk:component.UIButton;
		public btnCancel:component.UIButton;
		public scrollBar:Pro.HsliderScrollBar;
		public imgCurrency:Laya.Image;
		public txtCurrencyPrice:component.UILabel;
		public itemUI:Pro.NorItemUI;
		public txtBuyCount:component.UILabel;
		public txtName:component.UILabel;
		public txtLimit:component.UILabel;
		public txtCurrencyCount:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.HsliderScrollBar",Pro.HsliderScrollBar);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Shop/ShopBuyView");

        }

    }
}

module ProUI.Shop {
    export class ShopItemViewUI extends Laya.Box {
		public backBtn:component.UIButton;
		public imgCurrency:Laya.Image;
		public txtName:component.UILabel;
		public htmlTxtLimit:component.UIHtmlText;
		public txtCurrencyCount:component.UILabel;
		public imgFullBack:Laya.Image;
		public itemUI:Pro.NorItemUI;
		public boxLearn:Laya.Image;
		public imgDiscount:Laya.Image;
		public txtDiscount:component.UILabel;
		public darkImage:Laya.Image;
		public imgFullLimt:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Shop/ShopItemView"], this, this);

        }

    }
}

module ProUI.Shop {
    export class SpriteShopUI extends View {
		public skRoleClick:Laya.Box;
		public aniPos:Laya.Image;
		public btnFreeRefresh:component.UIButton;
		public txtBtnRefreshCount:component.UILabel;
		public btnFeeRefresh:component.UIButton;
		public imgRefreshNeedIcon:Laya.Image;
		public txtRefreshNeedValue:component.UILabel;
		public txtRefreshCount:component.UILabel;
		public listView:component.UIItemBox;
		public txtCountDown:component.UILabel;
		public sayPaoPao:Laya.Box;
		public txtSay:component.UIHtmlText;
		public closeBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.SpriteShopItemView",Pro.SpriteShopItemView);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Shop/SpriteShop");

        }

    }
}

module ProUI.Shop {
    export class SpriteShopItemViewUI extends Laya.Box {
		public itemUI:Pro.NorItemUI;
		public imgDiscount:Laya.Image;
		public imgFull:Laya.Image;
		public BuyBtn:component.UIButton;
		public hbox:Laya.HBox;
		public imgCurrency:Laya.Image;
		public txtCurrencyCount:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Shop/SpriteShopItemView"], this, this);

        }

    }
}

module ProUI.SkillReview {
    export class ExDesItemUI extends Laya.Box {

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["SkillReview/ExDesItem"], this, this);

        }

    }
}

module ProUI.SkillReview {
    export class MainUI extends View {
		public imgBg:Laya.Image;
		public BaseBox:Laya.Box;
		public NameLb:component.UILabel;
		public TypeNameLb:component.UILabel;
		public imgSkillIcon:Laya.Image;
		public FreezeLb:component.UIHtmlText;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("SkillReview/Main");

        }

    }
}

module ProUI.SkillReview {
    export class SkillBuffItemUI extends Laya.Box {
		public img_line:Laya.Image;
		public lbl_des:component.UILabel;
		public lbl_name:component.UILabel;
		public imgIcon:ProUI.Utils.BattleAttrTypeUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);

            Laya.ClassUtils.createByJson(View.uiMap["SkillReview/SkillBuffItem"], this, this);

        }

    }
}

module ProUI.SkillReview {
    export class SkillBuffMainViewUI extends View {
		public imgBg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("SkillReview/SkillBuffMainView");

        }

    }
}

module ProUI.SkillReview {
    export class SkillDesItemUI extends Laya.Box {
		public img_line:Laya.Image;
		public lbl_des:component.UILabel;
		public lbl_lv:component.UILabel;
		public btn_buff:component.UIButton;
		public lbl_unlock:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["SkillReview/SkillDesItem"], this, this);

        }

    }
}

module ProUI.StarTower.Fight {
    export class MainUI extends View {
		public TitleLb:component.UILabel;
		public RedioBtn:component.UIButton;
		public RewardBox:component.UIList;
		public FightBtn:component.UIButton;
		public SweepBtn:component.UIButton;
		public SweepInfoBox:Laya.Box;
		public SweepIconImg:Laya.Image;
		public SweepNumLb:component.UILabel;
		public chkBoxJumpEmbattle:Pro.CheckButton;
		public PreviewBox:Laya.Box;
		public DesLb:component.UILabel;
		public CommandPowerLb:component.UILabel;
		public FastestNameLb:component.UILabel;
		public LowestPowerNameLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.StarTower.Fight.RewardItemUI",ProUI.StarTower.Fight.RewardItemUI);
			View.regComponent("Pro.CheckButton",Pro.CheckButton);

            super.createChildren();
            this.loadUI("StarTower/Fight/Main");

        }

    }
}

module ProUI.StarTower.Fight {
    export class RewardItemUI extends Laya.Box {
		public ItemUI:Pro.NorItemUI;
		public FirstTipsImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["StarTower/Fight/RewardItem"], this, this);

        }

    }
}

module ProUI.StarTower {
    export class MainUI extends View {
		public MapBox:Laya.Box;
		public MapTopImg1:component.UIFrameImage;
		public MapTopImg2:component.UIFrameImage;
		public MapBottomImg:component.UIFrameImage;
		public TowerStartBox:Laya.Box;
		public imgStartBox:component.UIFrameImage;
		public TowerList:component.UIList;
		public TowerEndBox:Laya.Box;
		public imgBottomBox:component.UIFrameImage;
		public TowerSelBox:ProUI.StarTower.Map.EnterBoxUI;
		public TowerTipsBtn:component.UIButton;
		public imgTowerTipsIcon:Laya.Image;
		public InfoBtn:component.UIButton;
		public txtTitle:component.UILabel;
		public RankDetailBtn:component.UIButton;
		public RankItemBox:component.UIItemBox;
		public BottomBox:Laya.Box;
		public CloseBtn:component.UIButton;
		public RankBtn:component.UIButton;
		public ShopBtn:component.UIButton;
		public RewardBtn:component.UIButton;
		public reddot_rewards:Laya.Image;
		public BuyTimesInfo:Pro.FightBuyTimes;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.StarTower.Map.ItemCenterUI",ProUI.StarTower.Map.ItemCenterUI);
			View.regComponent("ProUI.StarTower.Map.EnterBoxUI",ProUI.StarTower.Map.EnterBoxUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.StarTower.RankItemUI",ProUI.StarTower.RankItemUI);
			View.regComponent("Pro.FightBuyTimes",Pro.FightBuyTimes);

            super.createChildren();
            this.loadUI("StarTower/Main");

        }

    }
}

module ProUI.StarTower.Map {
    export class EnterBoxUI extends View {
		public ani1:Laya.FrameAnimation;
		public imgFrame:component.UIFrameImage;
		public EffImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);

            super.createChildren();
            this.loadUI("StarTower/Map/EnterBox");

        }

    }
}

module ProUI.StarTower.Map {
    export class ItemCenterUI extends Laya.Box {
		public imgBg:component.UIFrameImage;
		public BGBtn:component.UIButton;
		public PassImg:Laya.Image;
		public SweepBox:Laya.Image;
		public SweepLb:component.UILabel;
		public hboxFeeSweep:Laya.HBox;
		public txtFeeSweep:component.UILabel;
		public LockImg:Laya.Image;
		public LvLb:component.UILabel;
		public FirstRewardBox1:Laya.Box;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("ProUI.StarTower.RewardItemUI",ProUI.StarTower.RewardItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["StarTower/Map/ItemCenter"], this, this);

        }

    }
}

module ProUI.StarTower {
    export class RankItemUI extends Laya.Box {
		public imgFrameRank:component.UIFrameImage;
		public NameLb:component.UILabel;
		public StageLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["StarTower/RankItem"], this, this);

        }

    }
}

module ProUI.StarTower {
    export class RewardItemUI extends Laya.Image {
		public norItem:Pro.NorItemUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["StarTower/RewardItem"], this, this);

        }

    }
}

module ProUI.SystemList {
    export class ItemUI extends component.UIButton {
		public bg:component.UIFrameImage;
		public bg_0:Laya.Image;
		public imgIcon:Laya.Image;
		public imgReddot:Laya.Image;
		public txtName:component.UILabel;
		public txtDes:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["SystemList/Item"], this, this);

        }

    }
}

module ProUI.SystemList {
    export class SystemOpenListUI extends View {
		public btnClose:component.UIButton;
		public txtDesc:component.UILabel;
		public listPrizeView:component.UIItemBox;
		public btnGoto:component.UIButton;
		public btnGetReward:component.UIButton;
		public imgGetReddot:Laya.Image;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.SystemList.ItemUI",ProUI.SystemList.ItemUI);

            super.createChildren();
            this.loadUI("SystemList/SystemOpenList");

        }

    }
}

module ProUI.Task {
    export class MainUI extends View {
		public tabGrp:component.UITab;
		public txtWeekTips:component.UILabel;
		public itemListBox:Laya.Image;
		public ItemList:component.UIList;
		public DailyTaskBox:Laya.Box;
		public ActiveValueImg:Laya.Image;
		public ActivteGiiftBox:component.UIItemBox;
		public ActiveValueLb:component.UILabel;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Task.TaskInfoItemUI",ProUI.Task.TaskInfoItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.ProgressChestItemUI",Pro.ProgressChestItemUI);

            super.createChildren();
            this.loadUI("Task/Main");

        }

    }
}

module ProUI.Task {
    export class TaskInfoItemUI extends Laya.Box {
		public ProgressInfo:Laya.Image;
		public ProgressImg:Laya.Image;
		public ProgressLb:component.UILabel;
		public GoBtn:component.UIButton;
		public RewardBtn:component.UIButton;
		public RewardBox:component.UIItemBox;
		public NameLb:component.UILabel;
		public FinishImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Task/TaskInfoItem"], this, this);

        }

    }
}

module ProUI.TaskWarOrder.ChildView {
    export class RewardUI extends Laya.Box {
		public btnAutoReward:component.UIButton;
		public reddotOneKey:Laya.Image;
		public htmlTimer:component.UIHtmlText;
		public listView:component.UIList;
		public boxUnlockAdvance:Laya.Box;
		public btnUnlockAdvance:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.TaskWarOrder.ChildView.RewardItemUI",ProUI.TaskWarOrder.ChildView.RewardItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["TaskWarOrder/ChildView/Reward"], this, this);

        }

    }
}

module ProUI.TaskWarOrder.ChildView {
    export class RewardItemUI extends Laya.Box {
		public btnNormal:component.UIButton;
		public btnAdvance:component.UIButton;
		public norItem:Pro.NorItemUI;
		public listAdvance:component.UIItemBox;
		public imgNormalGet:Laya.Image;
		public imgAdvanceGet:Laya.Image;
		public txtLevel:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["TaskWarOrder/ChildView/RewardItem"], this, this);

        }

    }
}

module ProUI.TaskWarOrder.ChildView {
    export class TaskUI extends Laya.Box {
		public listView:component.UIList;
		public tabGrp:component.UITab;
		public htmlTimer:component.UIHtmlText;
		public btnOneKeyAll:component.UIButton;
		public reddotOneKey:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.TaskWarOrder.ChildView.TaskItemUI",ProUI.TaskWarOrder.ChildView.TaskItemUI);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["TaskWarOrder/ChildView/Task"], this, this);

        }

    }
}

module ProUI.TaskWarOrder.ChildView {
    export class TaskItemUI extends Laya.Box {
		public norItem:Pro.NorItemUI;
		public htmlDesc:component.UIHtmlText;
		public txtProgress:component.UILabel;
		public imgIsGet:Laya.Image;
		public btnGo:component.UIButton;
		public btnGet:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["TaskWarOrder/ChildView/TaskItem"], this, this);

        }

    }
}

module ProUI.TaskWarOrder {
    export class WarOrderUI extends View {
		public imgProgress:Laya.Image;
		public txtProgress:component.UILabel;
		public htmlTimer:component.UIHtmlText;
		public txtLevel:component.UILabel;
		public tabGrp:component.UITab;
		public pageViewContainer:Pro.TableBarContiner;
		public btnUpAdvance:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.TableBarContiner",Pro.TableBarContiner);

            super.createChildren();
            this.loadUI("TaskWarOrder/WarOrder");

        }

    }
}

module ProUI.TaskWarOrder {
    export class WarOrderChargeUI extends View {
		public btnClose:component.UIButton;
		public btnBuy:component.UIButton;
		public txtBuyPrice:component.UILabel;
		public listReward1:component.UIList;
		public listReward2:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("TaskWarOrder/WarOrderCharge");

        }

    }
}

module ProUI.Temple {
    export class SkillItemUI extends component.UIButton {
		public icon:Laya.Image;
		public txtLv:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Temple/SkillItem"], this, this);

        }

    }
}

module ProUI.Temple {
    export class TempleUI extends View {
		public roleList:Laya.Box;
		public btnHelp:component.UIButton;
		public btnClose:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ProUI.Temple.TempleRoleViewUI",ProUI.Temple.TempleRoleViewUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Temple/Temple");

        }

    }
}

module ProUI.Temple {
    export class TemplePreAttackUI extends View {
		public btnClose:component.UIButton;
		public viewPlayerIcon:Pro.PlayerIconUI;
		public txtNickname:component.UILabel;
		public htmlCondition:component.UIHtmlText;
		public hboxTxtUpCount:Laya.HBox;
		public txtUpCount:component.UILabel;
		public listAttr:component.UIItemBox;
		public grpList:component.UIList;
		public btnChallenge:component.UIButton;
		public btnAttack:component.UIButton;
		public occupyTag:component.UILabel;
		public spBossAvatar:Laya.Box;
		public imgTitle:Laya.Image;
		public listSkillInitiative:component.UIList;
		public listSkillPassivity:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.CheckButton",Pro.CheckButton);
			View.regComponent("ProUI.Temple.SkillItemUI",ProUI.Temple.SkillItemUI);

            super.createChildren();
            this.loadUI("Temple/TemplePreAttack");

        }

    }
}

module ProUI.Temple {
    export class TempleRecordUI extends View {
		public btnClose:component.UIButton;
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Temple.TempleRecordItemViewUI",ProUI.Temple.TempleRecordItemViewUI);

            super.createChildren();
            this.loadUI("Temple/TempleRecord");

        }

    }
}

module ProUI.Temple {
    export class TempleRecordItemViewUI extends Laya.Box {
		public btnWatch:component.UIButton;
		public txtAttackName:component.UILabel;
		public txtFightValue:component.UILabel;
		public txtTime:component.UILabel;
		public txtEmbattle:component.UILabel;
		public txtResult:component.UIHtmlText;
		public listPet:component.UIItemBox;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Temple/TempleRecordItemView"], this, this);

        }

    }
}

module ProUI.Temple {
    export class TempleRoleViewUI extends Laya.Box {
		public spAvatar:Laya.Box;
		public imgTitle:Laya.Image;
		public txtNickname:component.UILabel;
		public btn:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Temple/TempleRoleView"], this, this);

        }

    }
}

module ProUI.Treasure {
    export class ProgressItemUI extends Laya.Box {
		public btnIcon:component.UIButton;
		public txtCount:component.UILabel;
		public txtNum:component.UILabel;
		public reddot:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Treasure/ProgressItem"], this, this);

        }

    }
}

module ProUI.Treasure {
    export class RandomAllTipsUI extends Laya.Box {
		public listView:component.UIList;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Treasure.RandomAllTipsItemUI",ProUI.Treasure.RandomAllTipsItemUI);

            Laya.ClassUtils.createByJson(View.uiMap["Treasure/RandomAllTips"], this, this);

        }

    }
}

module ProUI.Treasure {
    export class RandomAllTipsItemUI extends Laya.Box {
		public txtName:component.UILabel;
		public txtValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Treasure/RandomAllTipsItem"], this, this);

        }

    }
}

module ProUI.Treasure {
    export class TreasureUI extends View {
		public turntableBg:component.UIFrameImage;
		public tabGrp:component.UITab;
		public btnShop:component.UIButton;
		public imgNeedIcon1:Laya.Image;
		public txtItemCount:component.UILabel;
		public imgProgress:Laya.Image;
		public listProgressItems:component.UIItemBox;
		public imgNeedIcon2:Laya.Image;
		public imgNeedIcon3:Laya.Image;
		public txtMoreNeedCount:component.UILabel;
		public listRecodBgImg:Laya.Image;
		public listRecord:component.UIList;
		public boxCells:Laya.Box;
		public imgTurnSel:Laya.Image;
		public btnShowAll:component.UIButton;
		public btnHelp:component.UIButton;
		public btnClose:component.UIButton;
		public btnTreasure:component.UIButton;
		public btnRefresh:component.UIButton;
		public txtFreeLabel:component.UILabel;
		public hboxFee:Laya.HBox;
		public txtFeePrice:component.UILabel;
		public btnMoreTreasure:component.UIButton;
		public txtMoreBtnLabel:component.UILabel;
		public txtProgressValue:component.UILabel;
		public txtTimer:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("ProUI.Treasure.ProgressItemUI",ProUI.Treasure.ProgressItemUI);
			View.regComponent("UIList",component.UIList);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("Treasure/Treasure");

        }

    }
}

module ProUI.Treasure {
    export class TreasureAwardUI extends View {
		public aniPosImg:Laya.Image;
		public RewardList:component.UIList;
		public btnClose:component.UIButton;
		public btnAgain:component.UIButton;
		public txtAgainLabel:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Treasure/TreasureAward");

        }

    }
}

module ProUI.Utils {
    export class ArrowItemUI extends Laya.Box {
		public ArrLeftBtn:component.UIButton;
		public ArrRightBtn:component.UIButton;
		public ArrRightRedDotImg:Laya.Image;
		public ArrLeftRedDotImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.ArrorItemUI",Pro.ArrorItemUI);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/ArrowItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class AtterItemInfoUI extends Laya.Box {
		public imgType:ProUI.Utils.BattleAttrTypeUI;
		public TitleLb:component.UILabel;
		public NumLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/AtterItemInfo"], this, this);

        }

    }
}

module ProUI.Utils {
    export class AtterItemInfo2UI extends View {
		public imgType:ProUI.Utils.BattleAttrTypeUI;
		public TitleLb:component.UILabel;
		public NumLb:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("Utils/AtterItemInfo2");

        }

    }
}

module ProUI.Utils {
    export class AttrInfoItemUI extends Laya.Box {
		public imgType:ProUI.Utils.BattleAttrTypeUI;
		public txtValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/AttrInfoItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class AttrInfoItem2UI extends Laya.Box {
		public imgType:ProUI.Utils.BattleAttrTypeUI;
		public txtTitle:component.UILabel;
		public txtValue:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("ProUI.Utils.BattleAttrTypeUI",ProUI.Utils.BattleAttrTypeUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/AttrInfoItem2"], this, this);

        }

    }
}

module ProUI.Utils {
    export class BattleAttrTypeUI extends component.UIFrameImage {

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/BattleAttrType"], this, this);

        }

    }
}

module ProUI.Utils {
    export class BubbleTipsUI extends Laya.Box {
		public box:Laya.Box;
		public bg:Laya.Image;
		public txtTips:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/BubbleTips"], this, this);

        }

    }
}

module ProUI.Utils {
    export class CheckButtonUI extends Laya.Box {
		public btn:component.UIButton;
		public sel:Laya.Image;
		public label:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.CheckButton",Pro.CheckButton);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/CheckButton"], this, this);

        }

    }
}

module ProUI.Utils {
    export class CommonHelpViewUI extends Laya.Image {
		public htmlContent:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/CommonHelpView"], this, this);

        }

    }
}

module ProUI.Utils {
    export class EquipItemUI extends component.UIButton {
		public ani1:Laya.FrameAnimation;
		public bg:Laya.Image;
		public IconImg:Laya.Image;
		public PlusImg:Laya.Image;
		public godequipSuitTypeImg:component.UIFrameImage;
		public StarBox:Pro.StarIconBox;
		public NumLb:component.UILabel;
		public NameLb:component.UILabel;
		public LvLb:component.UILabel;
		public RedDotImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/EquipItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class HelpItemUI extends Laya.Box {
		public titleBg:Laya.Image;
		public txtContent:component.UIHtmlText;
		public txtTitle:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/HelpItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class HelpItemTitleUI extends Laya.Box {
		public txtTitle:component.UIHtmlText;
		public txtContent:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/HelpItemTitle"], this, this);

        }

    }
}

module ProUI.Utils {
    export class HelpSpriteUI extends View {
		public aniPos:Laya.Sprite;
		public paopaoBox:Laya.Box;
		public paopaoBg:Laya.Image;
		public sayLab:component.UIHtmlText;
		public clickSp:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIHtmlText",component.UIHtmlText);

            super.createChildren();
            this.loadUI("Utils/HelpSprite");

        }

    }
}

module ProUI.Utils {
    export class HSliderScrollBarUI extends Laya.Box {
		public imgBg:Laya.Image;
		public imgProgress:Laya.Image;
		public btnMax:component.UIButton;
		public btnRight:component.UIButton;
		public btnLeft:component.UIButton;
		public btnRoll:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.HsliderScrollBar",Pro.HsliderScrollBar);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/HSliderScrollBar"], this, this);

        }

    }
}

module ProUI.Utils {
    export class LongTroopItemUI extends component.UIButton {
		public ani1:Laya.FrameAnimation;
		public IconImg:Laya.Image;
		public NumLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/LongTroopItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class NorTroopItemUI extends Laya.Box {
		public BGImg:Laya.Image;
		public evolveImg:component.UIFrameImage;
		public IconImg:Laya.Image;
		public frameImgHeroGroupType:component.UIFrameImage;
		public GodEquipSuitTypeImg:component.UIFrameImage;
		public petTypeIcon:component.UIFrameImage;
		public frameImgHeroSpin:component.UIFrameImage;
		public StarBox:Pro.StarIconBox;
		public SelectStatueImg:Laya.Image;
		public SailingStatueImg:Laya.Image;
		public ZhanStatueImg:Laya.Image;
		public NumBgImg:Laya.Image;
		public NumLb:component.UILabel;
		public topCenterTextBox:Laya.Image;
		public txtTopCenter:component.UILabel;
		public DieImg:Laya.Image;
		public BloodBgImg:Laya.Image;
		public BloodImg:Laya.Image;
		public BloodLb:component.UILabel;
		public LockImg:Laya.Image;
		public support:component.UILabel;
		public activityTag:Laya.Image;
		public LvLb:component.UILabel;
		public NameLb:component.UILabel;
		public PlusStatueImg:Laya.Image;
		public RedDotImg:Laya.Image;
		public iconNew:Laya.Image;
		public img_state:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/NorTroopItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class OuTipsUI extends Laya.Box {
		public box:Laya.Box;
		public bg:Laya.Image;
		public nameLbl:component.UILabel;
		public ouHtml:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/OuTips"], this, this);

        }

    }
}

module ProUI.Utils {
    export class PlayerIconUI extends component.UIButton {
		public imgHeadIcon:Laya.Image;
		public imgHeadBorder:Laya.Image;
		public spLv:Laya.Image;
		public txtLv:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/PlayerIcon"], this, this);

        }

    }
}

module ProUI.Utils {
    export class ProgressChestItemUI extends Laya.Box {
		public btn:component.UIButton;
		public icon:component.UIFrameImage;
		public NumLb:component.UILabel;
		public bubbleRoot:Laya.Image;
		public bubbleItem:Laya.Image;
		public bubbleNum:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.ProgressChestItemUI",Pro.ProgressChestItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/ProgressChestItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class RankRewardPreviewItemUI extends Laya.Box {
		public imgFrameRank:component.UIFrameImage;
		public norItemListView:component.UIItemBox;
		public txtRank:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/RankRewardPreviewItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class ShareChatItemUI extends Laya.Box {
		public AcrossBtn:component.UIButton;
		public WorldBtn:component.UIButton;
		public UnionBtn:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/ShareChatItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class SkillItemUI extends component.UIButton {
		public IconImg:Laya.Image;
		public LvImg:Laya.Image;
		public LvLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/SkillItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class SkillItemLongUI extends Laya.Box {
		public BGImg:Laya.Image;
		public IconImg:Laya.Image;
		public lockBtn:component.UIButton;
		public imgLock:Laya.Image;
		public NameLb:component.UILabel;
		public DesLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/SkillItemLong"], this, this);

        }

    }
}

module ProUI.Utils {
    export class SkillSimpleItemUI extends component.UIButton {
		public IconImg:Laya.Image;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/SkillSimpleItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class SlideButtonUI extends Laya.Box {
		public btn:component.UIButton;
		public selBg:Laya.Image;
		public sel:Laya.Image;
		public label:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.SlideButton",Pro.SlideButton);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/SlideButton"], this, this);

        }

    }
}

module ProUI.Utils {
    export class UITabExtendUI extends component.UITab {

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/UITabExtend"], this, this);

        }

    }
}

module ProUI.Utils {
    export class UITabExtendShortUI extends component.UITab {

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.UITabExtendShort",Pro.UITabExtendShort);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/UITabExtendShort"], this, this);

        }

    }
}

module ProUI.Utils {
    export class UpAttrlistUI extends component.UIItemBox {

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIBitmapText",component.UIBitmapText);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/UpAttrlist"], this, this);

        }

    }
}

module ProUI.Utils {
    export class WorldLvItemUI extends Laya.Box {
		public LvLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/WorldLvItem"], this, this);

        }

    }
}

module ProUI.Utils {
    export class ZhengxingItemUI extends component.UIButton {
		public IconImg:Laya.Image;
		public UpStatueImg:Laya.Image;
		public DownImg:Laya.Image;
		public TitleLb:component.UILabel;
		public UpStatueLb:component.UILabel;
		public DownStatueLb:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["Utils/ZhengxingItem"], this, this);

        }

    }
}

module ProUI.WeekChampion.ChildView {
    export class BarrageViewUI extends Laya.Box {
		public btnEdit:component.UIButton;
		public boxShowView:Laya.Box;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.WeekChampBarrageView",Pro.WeekChampBarrageView);
			View.regComponent("UIButton",component.UIButton);

            Laya.ClassUtils.createByJson(View.uiMap["WeekChampion/ChildView/BarrageView"], this, this);

        }

    }
}

module ProUI.WeekChampion.ChildView {
    export class FightingViewUI extends Laya.Box {
		public imgWinRight:Laya.Image;
		public imgWinLeft:Laya.Image;
		public playerIconL:Pro.PlayerIconUI;
		public playerIconR:Pro.PlayerIconUI;
		public txtNicknameL:component.UILabel;
		public txtLvL:component.UILabel;
		public txtNicknameR:component.UILabel;
		public txtLvR:component.UILabel;
		public imgEmbattleL:Laya.Image;
		public imgEmbattleR:Laya.Image;
		public listHerosL:component.UIItemBox;
		public listHerosR:component.UIItemBox;
		public imgVs:Laya.Image;
		public btnWatch:component.UIButton;
		public imgBtnWatch:component.UIFrameImage;
		public txtFightValueL:Laya.Label;
		public txtFightValueR:Laya.Label;
		public battlesnBtn:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("Pro.WeekChampFightingView",Pro.WeekChampFightingView);
			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["WeekChampion/ChildView/FightingView"], this, this);

        }

    }
}

module ProUI.WeekChampion.ChildView {
    export class Final32ViewUI extends Laya.Box {
		public view8:Laya.Box;
		public playerList4:Laya.Box;
		public championBtnList8:Laya.Box;
		public championBox:Laya.Image;
		public imgChampionIcon:Laya.Image;
		public view64:Laya.Box;
		public playerList8:Laya.Box;
		public txtGroup:component.UILabel;
		public ArrowItemUI:Pro.ArrorItemUI;
		public btnList8:Laya.Box;
		public btnTab1:component.UIButton;
		public frameImgBtnTab1:component.UIFrameImage;
		public txtTabLabel1:component.UILabel;
		public btnTab2:component.UIButton;
		public frameImgBtnTab2:component.UIFrameImage;
		public txtTabLabel2:component.UILabel;
		public btnMyGuess:component.UIButton;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.ArrorItemUI",Pro.ArrorItemUI);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            Laya.ClassUtils.createByJson(View.uiMap["WeekChampion/ChildView/Final32View"], this, this);

        }

    }
}

module ProUI.WeekChampion.ChildView {
    export class GuessViewUI extends Laya.Box {
		public btnMyGuess:component.UIButton;
		public MyGuess:Laya.Box;
		public imgRightProgress:Laya.Image;
		public btnLeft:component.UIButton;
		public txtBtnLabelLeft:component.UILabel;
		public btnRight:component.UIButton;
		public txtBtnLabelRight:component.UILabel;
		public txtLeftNickname:component.UILabel;
		public txtRightNickname:component.UILabel;
		public txtLeftPercent:component.UILabel;
		public txtRightPercent:component.UILabel;
		public txtJettonCount:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["WeekChampion/ChildView/GuessView"], this, this);

        }

    }
}

module ProUI.WeekChampion.ChildView {
    export class NoOpenTipViewUI extends Laya.Box {
		public txtNoOpenContent:component.UILabel;
		public htmlOpenTimer:component.UIHtmlText;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);

            Laya.ClassUtils.createByJson(View.uiMap["WeekChampion/ChildView/NoOpenTipView"], this, this);

        }

    }
}

module ProUI.WeekChampion.ChildView {
    export class RankViewUI extends Laya.Box {
		public imgEmpty:Laya.Image;
		public listView:component.UIList;
		public selfView:ProUI.Champion.ListItems.RankItemViewUI;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Champion.ListItems.RankItemViewUI",ProUI.Champion.ListItems.RankItemViewUI);

            Laya.ClassUtils.createByJson(View.uiMap["WeekChampion/ChildView/RankView"], this, this);

        }

    }
}

module ProUI.WeekChampion.ChildView {
    export class TimeViewUI extends Laya.Box {
		public flag:Laya.Image;
		public txtTitle:component.UILabel;
		public txtTimer:component.UILabel;
		public boxLb:Laya.Box;
		public txtTitle1:component.UILabel;
		public txtTimer1:component.UILabel;

        constructor(){ super();this.createUI();}
        createUI():void {
        			View.regComponent("UILabel",component.UILabel);

            Laya.ClassUtils.createByJson(View.uiMap["WeekChampion/ChildView/TimeView"], this, this);

        }

    }
}

module ProUI.WeekChampion {
    export class WeekChampionUI extends View {
		public boxNoOpenView:Pro.WeekChampNoOpenTipView;
		public viewFighting:Pro.WeekChampFightingView;
		public viewGuess:Pro.WeekChampGuessView;
		public viewFinal64:Pro.WeekChampFinal32View;
		public viewRank:Pro.WeekChampRankView;
		public timeView:Pro.WeekChampTimeView;
		public viewBarrage:Pro.WeekChampBarrageView;
		public tabGrp:component.UITab;
		public btnReturn:component.UIButton;
		public btnShop:component.UIButton;
		public btnHelp:component.UIButton;
		public btnMyEmbattle:component.UIButton;
		public btnReward:component.UIButton;
		public btnRecord:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.WeekChampNoOpenTipView",Pro.WeekChampNoOpenTipView);
			View.regComponent("Pro.WeekChampFightingView",Pro.WeekChampFightingView);
			View.regComponent("Pro.WeekChampGuessView",Pro.WeekChampGuessView);
			View.regComponent("Pro.WeekChampFinal32View",Pro.WeekChampFinal32View);
			View.regComponent("Pro.WeekChampRankView",Pro.WeekChampRankView);
			View.regComponent("Pro.WeekChampTimeView",Pro.WeekChampTimeView);
			View.regComponent("Pro.WeekChampBarrageView",Pro.WeekChampBarrageView);
			View.regComponent("UITab",component.UITab);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("WeekChampion/WeekChampion");

        }

    }
}

module ProUI.WeekChampion {
    export class WeekChampionArenaTop3UI extends View {
		public championBox:Laya.Box;
		public btnShape:component.UIButton;
		public btnHelp:component.UIButton;
		public btnRank:component.UIButton;
		public btnEnter:component.UIButton;
		public txtWorshipCount:component.UILabel;
		public btnEmbattle:component.UIButton;
		public boxAvatarList:Laya.Box;
		public txtLine1Title:component.UILabel;
		public txtLine1Content:component.UILabel;
		public txtLine1Content2:component.UILabel;
		public txtLine2Title:component.UILabel;
		public txtLine2Content:component.UILabel;
		public txtLine3Title:component.UILabel;
		public txtLine3Content:component.UILabel;
		public txtLine4Title:component.UILabel;
		public txtLine4Content:component.UILabel;
		public txtLine4Content2:component.UILabel;
		public txtLine5Title:component.UILabel;
		public txtLine5Content:component.UILabel;
		public closeBtn:component.UIButton;
		public shopBtn:component.UIButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.WeekChampArenaEnterRole",Pro.WeekChampArenaEnterRole);

            super.createChildren();
            this.loadUI("WeekChampion/WeekChampionArenaTop3");

        }

    }
}

module ProUI.WeekChampion {
    export class WeekChampionGuessPanelUI extends View {
		public btnClose:component.UIButton;
		public btnReturn:component.UIButton;
		public btnConfirm:component.UIButton;
		public txtNickname:component.UILabel;
		public txtCanCount:component.UILabel;
		public txtGetCount:component.UILabel;
		public txtInputCount:component.UILabel;
		public scrollBar:Pro.HsliderScrollBar;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.HsliderScrollBar",Pro.HsliderScrollBar);

            super.createChildren();
            this.loadUI("WeekChampion/WeekChampionGuessPanel");

        }

    }
}

module ProUI.WeekChampion {
    export class WeekChampionMyGuessUI extends View {
		public btnClose:component.UIButton;
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Champion.ListItems.MyGuessListItemUI",ProUI.Champion.ListItems.MyGuessListItemUI);

            super.createChildren();
            this.loadUI("WeekChampion/WeekChampionMyGuess");

        }

    }
}

module ProUI.WeekChampion {
    export class WeekChampionPromptUI extends View {
		public btnClose:component.UIButton;
		public btnCancel:component.UIButton;
		public txtCountdown:component.UILabel;
		public btnEnter:component.UIButton;
		public listItems:component.UIItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIHtmlText",component.UIHtmlText);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);

            super.createChildren();
            this.loadUI("WeekChampion/WeekChampionPrompt");

        }

    }
}

module ProUI.WeekChampion {
    export class WeekChampionRecordUI extends View {
		public btnClose:component.UIButton;
		public imgEmpty:Laya.Image;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("ProUI.Champion.ListItems.RecordItemViewUI",ProUI.Champion.ListItems.RecordItemViewUI);

            super.createChildren();
            this.loadUI("WeekChampion/WeekChampionRecord");

        }

    }
}

module ProUI.WeekChampion {
    export class WeekChampionResultUI extends View {
		public txtRank:component.UIBitmapText;
		public txtJoinCount:component.UILabel;
		public txtWinCount:component.UILabel;
		public resultBox:Laya.HBox;
		public txtNickname:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("WeekChampion/WeekChampionResult");

        }

    }
}

module ProUI.WeekChampion {
    export class WeekChampionRewardUI extends View {
		public btnClose:component.UIButton;
		public listView:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.RankRewardPreviewUI",Pro.RankRewardPreviewUI);

            super.createChildren();
            this.loadUI("WeekChampion/WeekChampionReward");

        }

    }
}

module ProUI.WeekChampion {
    export class WeekChampionSendBarrageUI extends View {
		public btnClose:component.UIButton;
		public btnSend:component.UIButton;
		public btnFastBarrage:component.UIButton;
		public imgNeed:Laya.Image;
		public txtNeed:component.UILabel;
		public btnBulletChat:Pro.SlideButton;
		public txtInput:Laya.TextInput;
		public popupViewMask:component.UIButton;
		public comboBoxListView:Laya.Image;
		public listCombo:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("Pro.SlideButton",Pro.SlideButton);
			View.regComponent("UIList",component.UIList);

            super.createChildren();
            this.loadUI("WeekChampion/WeekChampionSendBarrage");

        }

    }
}

module ProUI.WeekChampion {
    export class WeekChampionTop3UI extends View {
		public playerHeadList:Laya.Box;
		public txtTime:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Pro.PlayerIconUI",Pro.PlayerIconUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("WeekChampion/WeekChampionTop3");

        }

    }
}

module ProUI.WeekWelfare.item {
    export class WeekWelfareItemViewUI extends View {
		public frame_day:component.UIFrameImage;
		public img_lose:Laya.Image;
		public img_get:Laya.Image;
		public btn_get:component.UIButton;
		public img_btn_lose:Laya.Image;
		public img_btn_receive:Laya.Image;
		public itemBox:component.UIItemBox;
		public lbl_remain:component.UILabel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIFrameImage",component.UIFrameImage);
			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("Pro.NorItemUI",Pro.NorItemUI);
			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("WeekWelfare/item/WeekWelfareItemView");

        }

    }
}

module ProUI.WeekWelfare {
    export class WeekWelfareMainViewUI extends View {
		public btn_close:component.UIButton;
		public lbl_show:component.UILabel;
		public lbl_time:component.UILabel;
		public eggList:component.UIList;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIList",component.UIList);
			View.regComponent("Pro.WeekWelfareitem",Pro.WeekWelfareitem);

            super.createChildren();
            this.loadUI("WeekWelfare/WeekWelfareMainView");

        }

    }
}

module ProUI._temp {
    export class resPlaceUI extends View {

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UILabel",component.UILabel);

            super.createChildren();
            this.loadUI("_temp/resPlace");

        }

    }
}

module ProUI._temp {
    export class tempprefabUI extends View {

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("UIButton",component.UIButton);
			View.regComponent("Pro.HsliderScrollBar",Pro.HsliderScrollBar);
			View.regComponent("UILabel",component.UILabel);
			View.regComponent("UIBitmapText",component.UIBitmapText);
			View.regComponent("Pro.UITabExtend",Pro.UITabExtend);
			View.regComponent("UITab",component.UITab);
			View.regComponent("Pro.StarIconBox",Pro.StarIconBox);
			View.regComponent("UIItemBox",component.UIItemBox);
			View.regComponent("UIFrameImage",component.UIFrameImage);

            super.createChildren();
            this.loadUI("_temp/tempprefab");

        }

    }
}

module ProUI._temp {
    export class TestUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("_temp/Test");

        }

    }
}
