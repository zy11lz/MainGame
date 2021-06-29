class CrashReportInfo
{
    server_id: number;
    player_id: number;
    player_name: string;
    /** 报错堆栈 */
    content: string;
    /** laya的内存统计 */
    cpuMemory: number = 0;
    /** laya的gpumem统计 */
    gpuMemory: number = 0;
    /**window.performance 内存统计， 有可能为0 */
    memUsed: number = 0;
    /**window.performance 内存统计， 有可能为0 */
    memTotal: number = 0;
    /**window.performance 内存统计， 有可能为0 */
    memMax: number = 0;
    /**当前渲染的spine数量 */
    spineRender: number = 0;
    /**当前spine,模板数量 */
    spineTempSize: number = 0;
    client_ver: string = "";
    constructor()
    {

    }
}