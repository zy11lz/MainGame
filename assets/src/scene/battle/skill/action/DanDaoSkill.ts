module Pro
{
    /**
     * 多弹道技能
     */
    export class DanDaoSkill extends BaseBattleEffect
    {
        private flySpeedScale: number = 1;
        constructor(batRoleMgr: BatRoleMgr)
        {
            super(batRoleMgr);
        }

        doMoveEnd()
        {
            this.showCastEffect();
            this.playAttactAction();
            var weaponAction = cfg.SkillEffectNewSkillEffectCfgData.getWeaponActionAryById(this.skillEffCfgInfo.index);
            let tmpFrameIndex = weaponAction[0][0];
            let actionExTime = Global.getNoZeroValue(this.actionSpeed, GameConfig.EffDetalTime);
            let weaponCreTime = tmpFrameIndex * actionExTime / this.attacker.actionSpeed;
            Laya.timer.once(weaponCreTime, this, this.playDanDao)
        }

        playDanDao()
        {
            for (let index = 0; index < this.battleSkillData.attackArr.length; index++)
            {
                const element: BattlePlaybackHurtInfo = this.battleSkillData.attackArr[index];
                this.toPlayDanDao(element, index);
            }
        }
        toPlayDanDao(element: BattlePlaybackHurtInfo, index: number)
        {
            let castPos = 2;
            if (this.skillEffCfgInfo)
            {
                castPos = this.skillEffCfgInfo.castPos;
                var weaponAction = cfg.SkillEffectNewSkillEffectCfgData.getWeaponActionAryById(this.skillEffCfgInfo.index);
                var target = this._batRoleMgr.getBattleRoleByServerIndex(element.attactInfo.dst);
                if (target)
                {
                    //角色施法位置，以及飞行子弹落地位置
                    let weaPosIndex = 2;//表示子弹的出生点是头顶
                    let castStandPos = SkillUtil.getCastingActionPosition(this.attacker, target, castPos);
                    let defaultEffPos = SkillUtil.getEffPos(this.attacker.getResourceID(), weaPosIndex);
                    var flyBulletInfo: FlyBulletInfo = this.parseDanDao(weaponAction[0], target, defaultEffPos, castStandPos);
                    if (index == 0)
                    {
                        Laya.timer.once(flyBulletInfo.weaponFlyTime, this, this.onFlyComplete)
                    }
                }
            }
        }

        parseDanDao(danDaoInfo, target: BaseAtker, defaultEffPos, castStandPos): FlyBulletInfo
        {
            let tmpFrameIndex = danDaoInfo[0];
            let tmpWeaponPosX = danDaoInfo[1];//这里的值表示子弹相对角色中心X的偏移值(正值)
            let tmpWeaponPosY = danDaoInfo[2];//这里的值表示子弹相对角色中心Y的偏移值(正值)
            let tmpWeaponFixedAnger = danDaoInfo[3] || 0;//子弹是否固定显示角度，1-表示子弹不做旋转处理
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
            //本次技能动作
            let actionExTime = Global.getNoZeroValue(this.actionSpeed, GameConfig.EffDetalTime);
            let weaponCreTime = tmpFrameIndex * actionExTime / this.attacker.actionSpeed;
            var behitEndPos = new Laya.Point(target.x, target.y + tmpWeaponPosY);
            let atkerStaPos = new Laya.Point(castStandPos.x + tmpWeaponPosX * (this.attacker.roleData.isOwer ? 1 : -1), castStandPos.y + tmpWeaponPosY);
            let weaponFlyTime = atkerStaPos.distance(behitEndPos.x, behitEndPos.y) / 400 * 300 / this.attacker.actionSpeed * this.flySpeedScale;
            //记录飞行信息(前后目标点、飞行时间)
            let flyBullet = new FlyBulletInfo();
            flyBullet.atkerStaPos = atkerStaPos;
            flyBullet.behitEndPos = behitEndPos;
            flyBullet.weaponFlyTime = weaponFlyTime;
            flyBullet.weaponCreTime = weaponCreTime;
            flyBullet.tmpWeaponFixedAnger = tmpWeaponFixedAnger;
            return flyBullet;
        }

        onFlyComplete()
        {
            this.showHurt();
            this.moveBack();
        }
    }
}