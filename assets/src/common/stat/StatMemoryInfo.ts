/**
* laya的memorty统计不准，
* 这里调用js的系统api统计，
*  @author fly*yhliuyang
*/
class StatMemoryInfo
{
    private memoryInfo: MemoryInfo;
    private static _instance: StatMemoryInfo;

    static get insntace(): StatMemoryInfo
    {
        if (StatMemoryInfo._instance == null)
        {
            StatMemoryInfo._instance = new StatMemoryInfo();
        }

        return StatMemoryInfo._instance;
    }
    constructor()
    {
        if (window.performance && window.performance && window.performance["memory"])
        {
            this.memoryInfo = window.performance["memory"];
        } else
        {
            this.memoryInfo = { usedJSHeapSize: 0, totalJSHeapSize: 0, jsHeapSizeLimit: 0 };
            this.memoryInfo.usedJSHeapSize = 0; // JS 对象（包括V8引擎内部对象）占用的内存，一定小于 totalJSHeapSize，否则可能出现内存泄漏
            this.memoryInfo.totalJSHeapSize = 0; // 可使用的内存
            this.memoryInfo.jsHeapSizeLimit = 0;// 内存大小限制
        }
    }

    public update()
    {
        if (window.performance && window.performance && window.performance["memory"])
        {
            this.memoryInfo = window.performance["memory"];
        }
    }

    public get max(): number
    {
        return StringUtils.traneToMB(this.memoryInfo.jsHeapSizeLimit);
    }
    public get total(): number
    {
        return StringUtils.traneToMB(this.memoryInfo.totalJSHeapSize);
    }

    public get used(): number
    {
        return StringUtils.traneToMB(this.memoryInfo.usedJSHeapSize);
    }
}