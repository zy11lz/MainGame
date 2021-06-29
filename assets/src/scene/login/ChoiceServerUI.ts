/* eslint-disable no-console */
module Pro
{
    /**
    * 登陆切换服务器
    * @author jason.xu
    */
    export class ChoiceServerUI extends ProUI.Scene.Login.ChoiceServer.MainUI implements
        component.UITableViewDataSource, component.UITableViewDelegate
    {

        ///////////静态/////////////
        private static _instance: Pro.ChoiceServerUI;
        private _currentSection: number;

        public static show(parent: Laya.Node): void
        {
            if (this._instance == null)
            {
                this._instance = new ChoiceServerUI();
            }
            parent.addChild(this._instance);
            PopUpManager.popUpUIAction(this._instance, 1, 2);
            this._instance.show();
        }

        public static closeUI(): void
        {
            if (this._instance)
            {
                PopUpManager.removeUIAction(this._instance, 1, true, true);
                this._instance.closeUI();
                this._instance = null;
            }
        }

        ///////////类/////////////
        /** 当前选中区域的服务器列表 */
        private _areaHostList: GameServerHostData[] = [];
        /** 当前选中的服务器区域索引（最左边的列表） */
        private _mainAreaIndex = 0;


        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {
        }
        private addEvent(): void
        {
            this.btnClose.onClick(this, () =>
            {
                ChoiceServerUI.closeUI();
            });

        }

        public show(): void
        {
            EventMgr.on(EnumHttpApi.query_player, this, this.onPlayerData);
            if (ServerListDataMgr.isFixHostDatas || ServerListDataMgr.isInitServerList)
            {
                this.refreshView();
            } else
            {
                HttpServer.serverList();
            }
        }

        closeUI()
        {
            EventMgr.off(EnumHttpApi.query_player, this, this.onPlayerData);
        }

        public refreshView(): void
        {
            let areaList = ServerListDataMgr.gameServerAreaDataList;
            this._mainAreaIndex = 0;
            this.TitleList.onRefresh(areaList.length + 2, this,
                (item: ProUI.Scene.Login.ChoiceServer.TitleItemUI, index: number) =>
                {
                    if (index < 2)
                    {
                        item.NameLb.text = Global.getLangStr("choiceServerTitle" + index);
                    } //推荐 角色
                    else
                    {
                        item.NameLb.text = areaList[index - 2].areaName;
                    }
                    item.onClick(this, () =>
                    {
                        this._mainAreaIndex = index;
                        this.TitleList.refresh();
                        this.refreshServerTable();
                    });
                    item.skin = this._mainAreaIndex == index ? "res/login/denglu_pic08.png" : "";
                    item.NameLb.color = this._mainAreaIndex == index ? "#fffced" : "#f13b54";
                });
            this.refreshServerTable();
        }


        refreshServerTable()
        {
            //第1个推荐列表  第2个角色所在列表 从第3个开始才是所有服务器列表
            if (this._mainAreaIndex == 0)
            {
                this._areaHostList = ServerListDataMgr.getRecommendServerList();
            }
            else if (this._mainAreaIndex == 1)
            {
                this._areaHostList = ServerListDataMgr.getRoleServerList();
            }
            else
            {
                this._areaHostList = this.getOtherServerList(this._mainAreaIndex - 2);
            }

            Laya.timer.frameOnce(3, this, () =>
            {
                this.ServerTable.setDelegate(this, this);
                this.ServerTable.setSectionAllIsOn(false);
                this.ServerTable.reloadData();
            });
        }


        /** 获取其它分组的服务器列表 */
        private getOtherServerList(areaIndex: number): GameServerHostData[]
        {
            let areaData = ServerListDataMgr.gameServerAreaDataList[areaIndex];
            return areaData.hostList;
        }

        /** 选择服务器 */
        private selServerHostByInfo(info: GameServerHostData): void
        {
            ServerListDataMgr.loginHostId = info.real;
            Public.LStorageMgr.GetInst().setLocalData("loginHostId", ServerListDataMgr.loginHostId);
            LoginServerMgr.logOut(false);
            // ThirdMgr.reportH5SDKData(3); //3-选服上报
            //当前选择的服务器地址
            EventMgr.trigger(EventNotify.Change_ServerSel_Succeed);
            ChoiceServerUI.closeUI();
            // // 上报选择服务器事件
            // let serverId = parseInt(info.real);
            // let userId= ThirdMgr.sdkSystem.getUserId();
            // ThirdMgr.sdkSystem.trackSelectServer(serverId, userId);
        }

        //------------------------------------------- 控制视图绘制 ---------------------------------------------
        /** 获取 Cell 高度，未设置则使用默认高度 */
        tabelView_heightForRowAtIndexPath(tableView: component.UITableView, indexPath: component.UIIndexPath): number
        {
            return 72;
        }
        /** 获取当前段落头部的高度 */
        tabelView_heightForHeaderInSection(tableView: component.UITableView, section: number): number
        {
            return 72;
        }
        /** 获取当前段落底部的高度 */
        tabelView_heightForFooterInSection(tableView: component.UITableView, section: number): number
        {
            return 0;
        }

        //--------------------------------------------控制视图数据---------------------------------------
        /** 获取段落总个数 */
        tabelView_numberOfSectionsInTableView(tableView: component.UITableView): number
        {
            return this._areaHostList.length;
        }

        /** 获取当前段落Cell的个数 */
        tabelView_numberOfRowsInSection(tableView: component.UITableView, section: number): number
        {
            return 1;
        }

        /** 刷新一个当前段落CellItem */
        tabelView_cellForRowWithRender(tableView: component.UITableView, indexPath: component.UIIndexPath, itemUI: ProUI.Scene.Login.ChoiceServer.serverTableCellUI): void
        {
            if (!Pro.ChoiceServerUI._instance)
            {
                return;
            }
            //异常处理
            let tmpHostInfo = this._areaHostList[indexPath.section];
            //拉取此服务器的角色信息
            let roleInfo = ServerListDataMgr.getPlayerInfo(tmpHostInfo.real);// this._playerInfoMap.get(tmpHostInfo.real);
            itemUI.NameLb.text = roleInfo ? roleInfo.playername : "";
            itemUI.LvLb.text = roleInfo ? ("Lv." + roleInfo.level) : "";
            if (roleInfo)
            {
                Global.setResIconWithItemID(itemUI.IconImg, Pro.CfgID.ResType.Player_Icon, roleInfo.head);
            }
            itemUI.TapBtn.onClick(this, () =>
            {
                this.selServerHostByInfo(tmpHostInfo);
            });
        }

        /** 刷新一个当前段落头部Item */
        tabelView_cellForHeadWithRender(tableView: component.UITableView, section: number, itemUI: ProUI.Scene.Login.ChoiceServer.serverTableHeadUI): void
        {
            if (!Pro.ChoiceServerUI._instance)
            {
                return;
            }
            //异常处理
            let tmpHostInfo = this._areaHostList[section];
            if (tmpHostInfo)
            {
                itemUI.NameLb.text = "S" + tmpHostInfo.real;
                itemUI.DesLb.text = tmpHostInfo.show;
                itemUI.StatueFrameImg.frame = tmpHostInfo.status;
                itemUI.imgRole.visible = ServerListDataMgr.checkHostRecord(tmpHostInfo.real);
                itemUI.TapBtn.on(Laya.Event.CLICK, this, this.onItemUiClick, [tableView, section])
            }

        }

        onItemUiClick(tableView: component.UITableView, section: number)
        {
            let tmpHostInfo = this._areaHostList[section];
            if (PlatformData.platVarSelfLogin)
            {
                this.selServerHostByInfo(tmpHostInfo);
            } else
            {
                if (ServerListDataMgr.checkHostRecord(tmpHostInfo.real))
                {
                    this._currentSection = section;
                    var roleInfo = ServerListDataMgr.getPlayerInfo(tmpHostInfo.real);
                    if (roleInfo)
                    {
                        this.openRoelInfo();
                    } else
                    {
                        HttpServer.queryPlayer(tmpHostInfo.real);
                    }
                } else
                {
                    this.selServerHostByInfo(tmpHostInfo);
                }
            }
        }

        onPlayerData(statue: number, data: any)
        {
            if (statue == 0 && data.code == 0)
            {
                this.openRoelInfo();
                return;
            }
            let tmpHostInfo = this._areaHostList[this._currentSection];
            this.selServerHostByInfo(tmpHostInfo);
        }

        openRoelInfo()
        {
            let isTableOn = !this.ServerTable.getSectionIsOn(this._currentSection);
            this.ServerTable.setSectionIsOn(this._currentSection, isTableOn, true);
            if (isTableOn)
            {
                this.ServerTable.scrollSectionByHead(this._currentSection, component.UITableViewScrollPosition.Top, false);
            }
        }

        /** 刷新一个当前段落尾部Item */
        tabelView_cellForFootWithRender(tableView: component.UITableView, section: number, itemUI: any): void
        {

        }

    }
}