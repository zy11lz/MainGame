/**
 * 中心服地址相关的配置
 */
module ServerHostData
{
    /** 账号服务器(中心服) */
    // var platformHost: string = "";

    // /** 获取公告弹出方式 */
    // export function getNoticeCfgUrl(): string
    // {
    //     return platformHost + "api/misc/notice_cfg/get";
    // }

    /** 记录客户端日志 */
    export function getClientLogUrl(): Array<string>
    {
        return ["http://47.110.125.158:8081/api/client_log/write_log"];
    }
}