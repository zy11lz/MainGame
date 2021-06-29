module Pro
{
    export enum RoleType
    {
        city_role,
        attack_role
    }

    export class RoleManager
    {
        static _cityRolePool: common.Pool;
        static _attackPool: common.Pool;

        static init()
        {
            this._cityRolePool = common.PoolMgr.createPool(PoolTypes.CITY_ROLE);
            this._attackPool = common.PoolMgr.createPool(PoolTypes.ATTACK_ROLE);
        }

        static getAttackRole(): BaseAtker
        {
            return this._attackPool.create() as BaseAtker;
        }

        public static getCityRole(): CityRole
        {
            return this._cityRolePool.create() as CityRole;
        }

        public static release(value: BaseRole)
        {
            if (value)
            {
                if (value.poolSign.isFree)
                {
                    throw new Error("回收2次，是搞什么？")
                }
                common.PoolMgr.releaseItem(value);
            }
        }

        /**
         * 总量
         */
        public static get cityRoleCnt(): number
        {
            return this._cityRolePool.getAllCnt();
        }

        /**
         * 使用中
         */
        public static get cityRoleInUse(): number
        {
            return this._cityRolePool.getAllCnt() - this._cityRolePool.getFreeCnt();
        }
    }
}