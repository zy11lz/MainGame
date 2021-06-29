module Pro
{
    export enum ServerStat
    {
        // 状态（0 未开放不显示 1 火 2 正常 3 火+未开放 4 正常+未开放  ）
        close = 0,
        hot = 1,
        open = 2,
        hot_close = 3,
        normal_close = 4
    }

    /** 游戏服务器列表结构 */
    export class GameServerHostData
    {
        /** 区域ID（对应一个GameServerAreaData） */
        public area: string;
        public syncOpenServerTime: string;
        public ip: string;
        /** 显示的名字 */
        public show: string;
        /** 服务器id */
        public real: string;
        /** 状态（0 未开放不显示 1 火 2 正常 3 火+未开放 4 正常+未开放  ） */
        public status: ServerStat;
    }
    /** 游戏服务器列表分区结构（一个分区对应多个服务器） */
    export class GameServerAreaData
    {
        public areaId: string;
        public areaName: string;
        public hostList: GameServerHostData[] = [];
    }

    class ServerListDataMgrCls
    {
        getFistServerId(): number
        {
            if (this._allServerList && this._allServerList.length)
            {
                var data: Pro.GameServerHostData = this._allServerList[0]
                return parseInt(data.real);
            }
            return 0;
        }


        /** 推荐服务器id */
        private recommendHostIds: string[] = [];
        /** 服务器id与服务器数据的映射 */
        private gameServerDataMap = new ds.StringMap<Pro.GameServerHostData>();
        /** 服务器区域id与区域数据的映射 */
        private gameServerAreaDataMap = new ds.StringMap<Pro.GameServerAreaData>();
        public gameServerAreaDataList: Pro.GameServerAreaData[] = [];


        /** 当前登陆的服务器id */
        public loginHostId: string = null;


        /** 服务器的世界id */
        public logicworldid: number = 0;
        private loginedHostArr: string[] = [];

        private loginHostRecordsMap = new ds.StringMap<number>();

        /** 自定义服务器列表（不通过地址去拉取，用于调试环境，或者特殊的测试环境） */
        public isFixHostDatas = false;
        /** 已经拉取到服务器列表 */
        public isInitServerList = false;


        /** 临时保存角色的详细信息 */
        private _playerInfoMap = new ds.StringMap<any>();
        private _allServerList: Pro.GameServerHostData[] = [];



        /** 添加一个调试地址 */
        debugAddHostData(serverId: string, ip: string): void
        {
            let data: Pro.GameServerHostData = new Pro.GameServerHostData();
            let areaData = this.gameServerAreaDataList[0];
            data.area = areaData.areaId;
            data.show = "临时测试";
            data.status = 2;
            data.ip = ip;
            data.real = serverId;
            areaData.hostList.push(data);
            this.gameServerDataMap.put(data.real, data);
            this.loginHostId = data.real;
        }

        onGetServerList(obj)
        {
            this.gameServerAreaDataMap.clear();
            this.gameServerDataMap.clear();
            this.gameServerAreaDataList = [];

            this.isInitServerList = true;
            for (var areaObj of obj.areas)
            {
                let areaData: Pro.GameServerAreaData = new Pro.GameServerAreaData();
                areaData.areaId = areaObj.area_id;
                areaData.areaName = areaObj.area_name;
                this.gameServerAreaDataMap.put(areaData.areaId, areaData);
                this.gameServerAreaDataList.push(areaData);
            }

            /**找到有自己登陆记录的服务器，找不到则把当前记当的登陆换成推荐的*/
            let isFindLocal = false;
            //**最后一个正常的服务器*/
            let lastOneNomalId = "";
            /**最后一个火爆但是能进的服务器*/
            let lastOneId = "";
            let serverInfo: Pro.GameServerHostData
            for (serverInfo of obj.servers)
            {
                //0 未开放不显示 1 火 2 正常 3 火+未开放 4 正常+未开放
                //不在同一平台
                //2020-11-14 18:30, 和 方冰， 殷学顺， 李界华， 开会讨论，
                if (serverInfo.status == ServerStat.close)
                {
                    continue;
                }
                this.gameServerDataMap.put(serverInfo.real, serverInfo);
                if (serverInfo.status == ServerStat.open || serverInfo.status == ServerStat.hot)
                {
                    this._allServerList.push(serverInfo)
                }
                let areaData: Pro.GameServerAreaData = this.gameServerAreaDataMap.get(serverInfo.area);
                if (areaData)
                {
                    areaData.hostList.push(serverInfo);
                    let serverStatus = serverInfo.status;
                    if (serverStatus == ServerStat.open) //2
                    {
                        lastOneNomalId = serverInfo.real;
                    }
                    if (serverStatus == ServerStat.hot)
                    {
                        lastOneId = serverInfo.real;
                    }
                    if (this.loginHostId == serverInfo.real)
                    {
                        isFindLocal = true;
                    }
                }
            }
            if (obj.default)
            {
                this.recommendHostIds = obj.default.split(",");
            }
            else if (lastOneNomalId)
            {
                this.recommendHostIds = [lastOneNomalId];
            }
            else if (lastOneId)
            {
                this.recommendHostIds = [lastOneId];
            }
            else
            {
                this.recommendHostIds = [];
            }

            if (!isFindLocal || this.loginHostId == null || this.loginHostId == "0")
            {
                this.loginHostId = this.recommendHostIds[0];
            }

            //删除名下没有服务器的大区
            for (let index = this.gameServerAreaDataList.length - 1; index >= 0; index--)
            {
                let areaData: Pro.GameServerAreaData = this.gameServerAreaDataList[index];
                if (areaData.hostList.length == 0)
                {
                    this.gameServerAreaDataList.splice(index, 1);
                    this.gameServerAreaDataMap.remove(areaData.areaId);
                }
            }
        }

        onGetServerStat()
        {

        }

        /** 根据服务器id获取服务器状态数据 */
        getServerHostInfo(serverId: string): Pro.GameServerHostData
        {
            let ret = this.gameServerDataMap.get(serverId);
            return ret;
        }


        /** 获取当前服务器信息 */
        getLoginHostInfo(): Pro.GameServerHostData
        {
            if (!this.loginHostId)
            {
                this.initLoginHostIdForce();
            }
            if (!this.loginHostId)
            {
                return null;
            }
            //状态（{0  未开启,  1维护，2新服，3良好，4爆满, 5白名单}）
            let ret = this.getServerHostInfo(this.loginHostId);
            if (ret == null && this.recommendHostIds != null && this.recommendHostIds.length > 0)
            {
                ret = this.getServerHostInfo(this.recommendHostIds[0]);
            }
            return ret;
        }

        initLoginHostIdForce()
        {
            if (this.recommendHostIds && this.recommendHostIds.length)
            {
                this.loginHostId = this.recommendHostIds[0]
            } else if (this._allServerList && this._allServerList.length)
            {
                var ser = this._allServerList[this._allServerList.length - 1];
                this.loginHostId = ser.real;
            }
        }


        getServerName(): string
        {
            let serverInfo = this.getLoginHostInfo();
            if (serverInfo)
            {
                return serverInfo.show || serverInfo.real;
            }
            return "";
        }

        getServerId(): string
        {
            let serverInfo = this.getLoginHostInfo();
            if (serverInfo)
            {
                return serverInfo.real;
            }
            return "";
        }


        /** 获取当前ip地址 */
        getLoginHost(): string
        {
            let obj = this.getLoginHostInfo();
            return obj.ip;
        }


        /** 修改服务器状态 */
        resetHostState(data: Pro.GameServerHostData): void
        {
            if (!data)
            {
                return;
            }
            this.gameServerDataMap.put(data.real, data);
        }


        /** 检查是否在某个服务器上登陆过 */
        checkHostRecord(serverId: string): boolean
        {
            return this.loginHostRecordsMap.containsKey(serverId);
        }

        onQueryLastServer(dataObj)
        {
            var loginHostId: string = "";
            if (dataObj.code == 0)
            {
                var data: { login_server_list: string, last_server_id: string } = dataObj.data;
                let tmpServerRecord = data.login_server_list
                let lastLoginServer = data.last_server_id;
                let loginHostRecords = tmpServerRecord.split(";");
                var las = loginHostRecords.pop();
                //这里是个坑， 服务器传的数据末尾有个“分号” 例如这样 1;2;3;4; 导致数组最后一位为空
                if (las != "")
                {
                    loginHostRecords.push(las);
                }
                this.loginedHostArr = loginHostRecords;
                for (let index = 0; index < loginHostRecords.length; index++)
                {
                    const serverId = Number(loginHostRecords[index]);
                    if (serverId != 0)
                    {
                        this.loginHostRecordsMap.put(serverId, serverId)
                    }
                }
                if (lastLoginServer == null || lastLoginServer == "0" || lastLoginServer == "")
                {
                    if (loginHostRecords.length)
                    {
                        logI("tmpLastServer为0， 但是有登录记录" + loginHostRecords)
                        loginHostId = loginHostRecords[loginHostRecords.length - 1];
                    }
                } else
                {
                    loginHostId = lastLoginServer;
                }

            }
            else
            {
                //没有登录记录
                // lastLoginServer = this.recommendHostIds[this.recommendHostIds.length - 1];
            }
            if (loginHostId != "")
            {
                ServerListDataMgr.loginHostId = loginHostId;
            } else
            {
                ServerListDataMgr.loginHostId = this.recommendHostIds[this.recommendHostIds.length - 1];
            }

        }

        onQueryPLayer(dataObj)
        {
            if (dataObj.code == 0)
            {
                var data = dataObj.data;
                this._playerInfoMap.put(data.worldid, data);
            }
        }

        getPlayerInfo(real: string)
        {
            return this._playerInfoMap.get(real);
        }


        /** 获取角色所在的服务器列表 */
        getRoleServerList(): GameServerHostData[]
        {
            let ids = this.loginedHostArr;
            return this.__getServerListByIds(ids);
        }

        /** 获取推荐服务器列表 */
        getRecommendServerList(): GameServerHostData[]
        {
            let ids = [].concat(this.recommendHostIds);
            //再加上自己登陆过的记录
            for (let id of this.loginedHostArr)
            {
                if (ids.indexOf(id) < 0) { ids.push(id); }
            }
            return this.__getServerListByIds(ids);
        }


        private __getServerListByIds(ids: Array<string>): GameServerHostData[]
        {
            let ret = [];
            for (var id of ids)
            {
                var element = ServerListDataMgr.getServerHostInfo(id);
                if (!element)
                {
                    continue;
                }
                ret.push(element);
            }
            return ret;
        }

    }


    export var ServerListDataMgr = new ServerListDataMgrCls();
}