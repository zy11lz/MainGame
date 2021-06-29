module Pro
{
    export class CxH5SdkSystem extends WxCxH5SdkSystem
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
            return "CxH5SdkSystem.user";
        }
    }
}