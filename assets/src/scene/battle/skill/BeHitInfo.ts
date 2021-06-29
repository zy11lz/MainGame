module Pro
{
    export class BeHitInfo
    {
        flyActionAry: Array<FlyBulletInfo>;
        //计算本次收到伤害的时间点
        beHitTimes: Array<number> = [];
        attacker: BaseAtker;
        targetRole: BaseAtker;
        private flySpeedScale: number;
        constructor(attacker: BaseAtker,
            actionStatue: RoleActionStatue,
            actionExTime: number,
            targetRole: BaseAtker,
            tmpSkillEffInfo: cfg.SkillEffectNewSkillEffectCfgInfo)
        {
            this.attacker = attacker;
            this.targetRole = targetRole;
            let skillEffect = null;
            let castPos = 2;
            let behitFrames = [4];
            let weaponAction = [];

            if (tmpSkillEffInfo)
            {
                skillEffect = cfg.SkillEffectNewSkillEffectCfgData.getSkillEffInfoAryById(tmpSkillEffInfo.index);
                castPos = tmpSkillEffInfo.castPos;
                behitFrames = cfg.SkillEffectNewSkillEffectCfgData.getBehitFramesAryById(tmpSkillEffInfo.index);
                weaponAction = cfg.SkillEffectNewSkillEffectCfgData.getWeaponActionAryById(tmpSkillEffInfo.index);
            }

            let isFarAtk = behitFrames.length == 0 && castPos == BatCfg.SkillCastPos.StandStay && skillEffect != null && !skillEffect.isEmptyEffect();
            this.flySpeedScale = actionExTime / GameConfig.EffDetalTime;

            //飞行武器坐标信息
            this.flyActionAry = (isFarAtk || weaponAction.length > 0) ? new Array<FlyBulletInfo>() : null;


            //角色施法位置，以及飞行子弹落地位置
            let weaPosIndex = 2;//表示子弹的出生点是头顶
            let castStandPos = SkillUtil.getCastingActionPosition(attacker, targetRole, castPos);
            let defaultEffPos = SkillUtil.getEffPos(attacker.getResourceID(), weaPosIndex);
            let behitEndPos = new Laya.Point(targetRole.x, targetRole.y + defaultEffPos.y);

            //检索飞行武器和受击时间点
            if (weaponAction.length > 0)
            {
                this.parseDanDao(weaponAction, defaultEffPos, actionExTime, castStandPos);
            }
            else if (isFarAtk)
            {
                let atkerStaPos = new Laya.Point(castStandPos.x, castStandPos.y + defaultEffPos.y);
                let weaponFlyTime = atkerStaPos.distance(behitEndPos.x, behitEndPos.y) / 400 * 300 / attacker.actionSpeed * this.flySpeedScale;
                let weaponCreTime = attacker.getActionTime(actionStatue, actionExTime) / 2;

                //记录飞行信息(前后目标点、飞行时间、创建时间)
                let flyBullet = new FlyBulletInfo();// new Array<Object>();
                flyBullet.atkerStaPos = atkerStaPos;
                flyBullet.behitEndPos = behitEndPos;
                flyBullet.weaponFlyTime = weaponFlyTime;
                flyBullet.weaponCreTime = weaponCreTime;
                flyBullet.tmpWeaponFixedAnger = 0;
                this.flyActionAry.push(flyBullet);

                //记录受击时间点
                this.beHitTimes.push(weaponCreTime + weaponFlyTime);
            }
            else if (behitFrames.length > 0)
            {
                for (let index = 0; index < behitFrames.length; index++) 
                {
                    const element = behitFrames[index];
                    this.beHitTimes.push(element * actionExTime / attacker.actionSpeed);
                }
            }
        }


        parseDanDao(weaponAction, defaultEffPos, actionExTime, castStandPos)
        {
            for (let index = 0; index < weaponAction.length; index++)
            {
                const element = weaponAction[index];
                let tmpFrameIndex = element[0];
                let tmpWeaponPosX = element[1];//这里的值表示子弹相对角色中心X的偏移值(正值)
                let tmpWeaponPosY = element[2];//这里的值表示子弹相对角色中心Y的偏移值(正值)
                let tmpWeaponFixedAnger = element[3] || 0;//子弹是否固定显示角度，1-表示子弹不做旋转处理
                //如果默认都是-1,就是用默认高度
                if (tmpWeaponPosX == -1 && tmpWeaponPosY == -1)
                {
                    tmpWeaponPosX = 0;
                    tmpWeaponPosY = defaultEffPos.y;
                }
                else
                {
                    tmpWeaponPosY *= -1;
                }
                var behitEndPos = new Laya.Point(this.targetRole.x, this.targetRole.y + tmpWeaponPosY);

                let weaponCreTime = tmpFrameIndex * actionExTime / this.attacker.actionSpeed;
                let atkerStaPos = new Laya.Point(castStandPos.x + tmpWeaponPosX * (this.attacker.roleData.isOwer ? 1 : -1), castStandPos.y + tmpWeaponPosY);
                let weaponFlyTime = atkerStaPos.distance(behitEndPos.x, behitEndPos.y) / 400 * 300 / this.attacker.actionSpeed * this.flySpeedScale;

                //记录飞行信息(前后目标点、飞行时间)
                let flyBullet = new FlyBulletInfo();
                flyBullet.atkerStaPos = atkerStaPos;
                flyBullet.behitEndPos = behitEndPos;
                flyBullet.weaponFlyTime = weaponFlyTime;
                flyBullet.weaponCreTime = weaponCreTime;
                flyBullet.tmpWeaponFixedAnger = tmpWeaponFixedAnger;
                this.flyActionAry.push(flyBullet);
                //记录受击时间点
                // this.beHitTimes.push(weaponCreTime + weaponFlyTime);
            }
        }
    }
}