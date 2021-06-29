
module Pro
{
    /**
     * 玩家登录时的参数
     */
    export class LoginArgs
    {
        /** 登陆方式 */
        // public LastType: LoginType = LoginType.None;
        /** 上次登录账户 */
        public LastOffAcnt: string = null;
        /** 上次登录密码 */
        public LastOffPsw: string = null;
        /** 上次登录的时候是否为注册（登陆成功后会变成false） */
        // public IsRegister: boolean = false;
        /** 游客账号(永久存储) */
        // public GuestNum: string = null;
    }

    /**
     * 登陆方式
     */
    export enum LoginType
    {
        /** 无登陆方式 */
        // None = -1,
        /** 本地账号 */
        // Office
    }
}