/**
* name 
*/
module Pro
{
	export class ShuDanDaoSkill extends BaseBattleEffect
	{
		constructor(batRoleMgr: BatRoleMgr)
		{
			super(batRoleMgr);
		}


		doMoveEnd()
		{
			this.showCastEffect();
			this.playAttactAction();
			Laya.timer.once(this.beHitInfo.beHitTimes[0], this, this.playDanDao, [], false);
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
				var target = this._batRoleMgr.getBattleRoleByServerIndex(element.attactInfo.dst);
				if (target)
				{
					//角色施法位置，以及飞行子弹落地位置
					// let tmpFlyEffLayer = this.attacker.roleData.getBatPlaceMgr().EffCeilLayer;
					var weaponFlyTime = 300;
					// let skillEffIndex = 0;
					// var atkerStaPos = target.position;
					// atkerStaPos.y -= 500;
					// let flyBulletSps = EffectMgr.Inst.createSkillEffect(this.attacker.getResourceID(), weaponFlyTime, this.skillEffect, atkerStaPos, 1, this.attacker.actionSpeed, tmpFlyEffLayer, skillEffIndex);
					// for (const tmpFlyBulletSp of flyBulletSps)
					// {
					// 	Laya.Tween.to(tmpFlyBulletSp, { x: target.x, y: target.y - 50 }, weaponFlyTime, Laya.Ease.linearIn);
					// }
					if (index == 0)
					{
						Laya.timer.once(weaponFlyTime, this, this.onFlyComplete)
					}
				}
			}
		}


		onFlyComplete()
		{
			this.showHurt();
			this.moveBack();
		}

	}
}