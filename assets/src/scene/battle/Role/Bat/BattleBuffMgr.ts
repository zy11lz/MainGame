module Pro
{
    /**
     * buff管理器
     */
    export class BattleBuffMgr
    {

        private m_pOwner: RoleAtkData;
        private m_poolBuff: Array<BattleBuff> = [];

        public init(pOwner: RoleAtkData)
        {
            this.m_pOwner = pOwner;
            this.m_poolBuff.splice(0, this.m_poolBuff.length);
        }

        //-------------------------------------------buff查找---------------------------------------
        /** 获取当前所有buff */
        public getPoolBuff(): Array<BattleBuff>
        {
            return this.m_poolBuff;
        }

        /** 
         * 查找同源buff
         * @param uBuffId buffId
         * @param pSource buff触发者
         */
        public find(uBuffId: number, pSource: RoleAtkData): BattleBuff	
        {
            if (pSource == null) return null;
            let tmpResults = this.m_poolBuff.filter(element => element.getSource() == pSource && element.buffid == uBuffId);
            return tmpResults.length > 0 ? tmpResults[0] : null;
        }

        syncBeforRoundBuff(buff: Pb_God.PBFightBuffState[])
        {
            for (let index = 0; index < buff.length; index++)
            {
                const pBFightBuffState = buff[index];
                for (let index = 0; index < this.m_poolBuff.length; index++)
                {
                    const battleBuff = this.m_poolBuff[index];
                    if (battleBuff.buffid == pBFightBuffState.buffid)
                    {
                        battleBuff.syncByBuffState(pBFightBuffState);
                    }
                }
            }
        }


        /**
         * 查找第一个buff
         * @param uBuffId buffId
         */
        public findFirst(uBuffId: number): BattleBuff	
        {
            let tmpResults = this.m_poolBuff.filter(element => element.buffid == uBuffId);
            return tmpResults.length > 0 ? tmpResults[0] : null;
        }

        //-------------------------------------------------------------
        //------------------------------ 查找状态buff
        public findBuffState(uState: number): BattleBuff
        {
            for (let i = 0; i < this.m_poolBuff.length; i++)
            {
                let pBuff = this.m_poolBuff[i];
                if (!pBuff || pBuff.isDelete())
                    continue;

                if (cfg.BuffNewBuffCfgData.getAddStateByID(pBuff.buffid) == uState)
                {
                    return pBuff;
                }
            }

            return null;
        }

        /** 获取有益类型 */
        public haveEffectType(emType: Pb_God._emBuffEffectType): boolean
        {
            for (let i = 0; i < this.m_poolBuff.length; i++)
            {
                let pBuff = this.m_poolBuff[i];
                if (!pBuff || pBuff.isDelete())
                    continue;

                if (cfg.BuffNewBuffCfgData.getEffectTypeByID(pBuff.buffid) == emType)
                {
                    return true;
                }
            }

            return false;
        }

  

        /** buff按照增益优先 */
        private _sort_buff_(pLeft: BattleBuff, pRight: BattleBuff): number
        {
            let tmpLeftEffType = cfg.BuffNewBuffCfgData.getEffectTypeByID(pLeft.buffid);
            let tmpRightEffType = cfg.BuffNewBuffCfgData.getEffectTypeByID(pRight.buffid);
            if (tmpLeftEffType == tmpRightEffType)
            {
                return pLeft.buffid < pRight.buffid ? 1 : -1;
            }
            return pLeft < pRight ? 1 : -1;
        }

        //-------------------------------------------回合数据---------------------------------------
        /** 回合切换 */
        public onRound()
        {
            if (this.m_poolBuff.length == 0)
                return;

            //需要排序 增益放前面
            this.m_poolBuff.sort(this._sort_buff_);

            //删除buff以及刷新buff状态
            let tmpIndex = 0;
            while (tmpIndex < this.m_poolBuff.length)
            {
                let pGameBuff = this.m_poolBuff[tmpIndex];

                if (!pGameBuff.isDelete())
                {
                    pGameBuff.processRound();
                }

                if (pGameBuff.isDelete())
                {
                    this.m_poolBuff.splice(tmpIndex, 1);
                    this.refreshBuffOnce(pGameBuff);
                }
                else
                {
                    tmpIndex++;
                }
            }
        }

        /** 重新所有buff状态 */
        public refreshState()
        {
            for (let i = 0; i < this.m_poolBuff.length; i++)
            {
                let pGameBuff = this.m_poolBuff[i];
                if (!pGameBuff || pGameBuff.isDelete())
                    continue;

                let uAddState = cfg.BuffNewBuffCfgData.getAddStateByID(pGameBuff.buffid);
                if (!uAddState)
                    continue;

                this.m_pOwner.addBuffState(uAddState);
            }
        }

        /** 重新所有buff属性 */
        public refreshAttr()
        {
            for (let i = 0; i < this.m_poolBuff.length; i++)
            {
                let pGameBuff = this.m_poolBuff[i];
                if (!pGameBuff || pGameBuff.isDelete())
                    continue;

                let tmpBuffType = cfg.BuffNewBuffCfgData.getBuffTypeByID(pGameBuff.buffid);
                if (Pb_God._emBuffType.BuffType_AddAttri != tmpBuffType)
                    continue;

                // pGameBuff.calcAttr();
            }
        }

        //-------------------------------------------buff添加和删除---------------------------------------
        /** 
         * 添加buff 
         * @param damageAfter 目前是否是伤害后加的buff
         * @param uBuffId buffId
         * @param pSource buff触发者
         * @param pSkillIndex skillIndex
         * @param uExtraValue buff额外值
         * */
        public addBuff(damageAfter: boolean, uBuffID: number, pSource: RoleAtkData, pSkillIndex: number = 0, uExtraValue: number = 0): BattleBuff
        {

            if (uBuffID == 0)
            {
                return null;
            }

            if (!cfg.BuffNewBuffCfgData.check_mark(uBuffID, Pb_God._emBuffMark.BuffMark_DeadCanAdd) && this.m_pOwner.isDead())
            {
                return null;
            }

            //判断buff状态
            if (cfg.BuffNewBuffCfgData.getAddStateByID(uBuffID) > 0)
            {
                let tmpCanAddAry = cfg.BuffNewBuffStateCfgData.getCanAddStatusByIndex(uBuffID);
                if (this.m_pOwner.haveBuffState(tmpCanAddAry))
                {
                    return null;
                }
            }

            //判断效果免疫
            if (cfg.BuffNewBuffCfgData.getBuffTypeByID(uBuffID) == Pb_God._emBuffEffectType.BuffEffectType_Harmful)
            {
                if (this.m_pOwner.haveBuffState(Pb_God._emBuffControlType.BuffControl_NoHarmEffect))
                    return null;
            }

            let pGameBuff = this.find(uBuffID, pSource);

            let bAdd = false;
            if (pGameBuff)
            {
                // bAdd = pGameBuff.repeat(uBuffID, uExtraValue);
                pGameBuff.setDelete(false);
                this.refreshBuffOnce(pGameBuff);
            }
            else
            {
                let tmpDiffType = cfg.BuffNewBuffCfgData.getDiffRepeatTypeByID(uBuffID);
                let pOldBuff = this.findFirst(uBuffID);
                if (pOldBuff == null)
                {
                    bAdd = true;
                }
                else if (Pb_God._emBuffDiffRepeatType.BuffDiffRepeatType_Save == tmpDiffType)
                {
                    bAdd = true;
                }
                else if (Pb_God._emBuffDiffRepeatType.BuffDiffRepeatType_Drop == tmpDiffType)
                {
                    if (pOldBuff)
                    {
                        bAdd = false;
                    }
                }
                else if (Pb_God._emBuffDiffRepeatType.BuffDiffRepeatType_Refresh == tmpDiffType)
                {
                    //删除已有的
                    if (pOldBuff)
                    {
                        pOldBuff.setDelete(true);
                    }

                    bAdd = true;
                }

                if (bAdd)
                {
                    pGameBuff = new BattleBuff();
                    pGameBuff.init(this.m_pOwner, pSource, pSkillIndex, uBuffID, uExtraValue);
                    this.m_poolBuff.push(pGameBuff);
                }
            }

            //buff有层次变化 
            if (bAdd)
            {
                this.refreshBuffOnce(pGameBuff);
                //buff提示
                // let tmpSkillName = cfg.BuffNewBuffCfgData.getBuffNameByID(pGameBuff.buffid);
                // if (damageAfter)
                // {
                //     this.m_pOwner.getDamageInfo().damageAfterTipsList.push(tmpSkillName);
                // }
                // else
                // {
                //     this.m_pOwner.getDamageInfo().damageBeforeTipsList.push(tmpSkillName)
                // }
            }
            return pGameBuff;
        }


        public removeBuff(buffID: number): void
        {
            for (let index = 0; index < this.m_poolBuff.length; index++)
            {
                const battleBuff: BattleBuff = this.m_poolBuff[index];
                if (battleBuff.buffid == buffID)
                {
                    battleBuff.delBuff();
                }
            }
            this.refreshState();
        }

        /** buff被删除+添加 */
        private refreshBuffOnce(pGameBuff: BattleBuff): void
        {
            let tmpBuffType = cfg.BuffNewBuffCfgData.getBuffTypeByID(pGameBuff.buffid);
            let tmpBuffValue = cfg.BuffNewBuffCfgData.getValueInfoByIndex(pGameBuff.buffid);

            if (cfg.BuffNewBuffCfgData.getAddStateByID(pGameBuff.buffid) > 0)
            {
                this.m_pOwner.refreshBuffState();
            }
        }
 
        //-------------------------------------------------------------
        //------------------------------
        public getBuffByType(uType: number, vecGameBuff: Array<BattleBuff>): boolean
        {
            vecGameBuff.splice(0, vecGameBuff.length);
            for (let i = 0; i < this.m_poolBuff.length; i++)
            {
                let pBuff = this.m_poolBuff[i];

                if (!pBuff || pBuff.isDelete() || !pBuff.getSource())
                    continue;

                if (cfg.BuffNewBuffCfgData.getBuffTypeByID(pBuff.buffid) == uType)
                    vecGameBuff.push(pBuff);
            }

            return !vecGameBuff.length;
        }


 
    }
}