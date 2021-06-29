module Pro.ExceptionsCapture
{
    //游戏异常拦截
    export function setup(): void
    {
        if (GlobalData.isRelease)
        {
            window.onerror = function (message: string, filename: string, lineno: number, colno: number, error: Error)
            {
                let stack: string;
                if (SystemUtils.isIos())
                {
                    // ios 报错如下,和android 的堆栈长的不一样
                    // let error = "cpuMemory=4002000&gpuMemory=70564929.33333334&memUsed=0&memTotal=0&memMax=0&spineRender=1&spineTempSize=1&client_ver=1.0.3.2122011.9&server_id=1031&player_id=0&player_name=user0&content=comfilmEnter@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:320729:34%0AonClickEnterBtn@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:320720:30%0AMOUSE_UP_Called@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:38784:40%0ArunWith@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:1182:40%0Aevent@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:1240:58%0AsendEvents@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:18653:25%0AonMouseUp@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:18777:28%0AonMouseUp@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:19021:37%0Acheck@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:19065:30%0Acheck@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:19047:39%0Acheck@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:19047:39%0Acheck@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:19047:39%0Acheck@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:19047:39%0Acheck@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:19047:39%0A_checkAllBaseUI@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:19109:29%0ArunEvent@http://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:19226:61%0Ahttp://172.16.130.13:83/bin/index_2.html?AppVersion=9&platformType=2&systemVersion=14.4.2&deviceName=iOS&deviceModel=iPhone9,1&channelId=unknown:18933:35";
                    stack = error.stack.replace(/http(s?):\/\/(.+?)(:\d+:\d+)/g, "$3");
                    stack = stack.replace(/\n/g, " at ");
                }
                else
                {
                    stack = error.stack.replace(/http(s?):\/\/(.+?)\//g, "");
                }
                GameLaunch.PostClientLog(stack);
                ThirdMgr.onCrash(stack);
            }
        } else
        {
            Laya.alertGlobalError(false);
        }
    }
}
