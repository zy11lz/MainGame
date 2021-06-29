/* eslint-disable no-console */
function java2Js(parm)
{
    KaiRongSdk.__onJava2Js(parm);
}


module KaiRongSdk
{
    var callBack: Function;
    export function __onJava2Js(message: any)
    {

        try
        {
            let type = typeof message;
            var data: any;
            if (type == "object")
            {
                data = message;
            }
            else
            {
                data = JSON.parse(message);
            }
            var tag = String(data["tag"]);
            var eid = parseInt(String(data["eventID"]));
            if (callBack != null)
            {
                callBack(eid, data);
            }
            else
            {
                console.error("NativeBridge.sendToJS=>找不到tag：" + tag);
            }
        } catch (error)
        {
            console.log("【Bridge.onNaciveMessage】error=" + error);
        }
    }

    export function addCallBack(callback: (id: number, json: {}) => {})
    {
        callBack = callback;
    }
}

