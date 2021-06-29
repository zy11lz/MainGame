/* eslint-disable no-console */

/**
 *  Q1 webview
 */
module Pro
{
    export class KaiRongWebViewSdkSystem extends Q1SdkSystem
    {
        constructor()
        {
            super();
        }

        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "q1sdk.user";
        }

        public sendNative(eventID: number, json: {} = null)
        {
            if (json == null)
            {
                json = {};
            }
            json["tag"] = this.getTag();
            json["eventID"] = eventID;
            var s = JSON.stringify(json);
            kairong5.js2Nactive(s)
        }
    }
}
