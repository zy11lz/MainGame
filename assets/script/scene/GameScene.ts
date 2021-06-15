
import { _decorator, Component, Node, Label, Prefab ,instantiate} from 'cc';
import { resourceUtil } from '../resourceUtil';
const { ccclass, property } = _decorator;

@ccclass('GameScene')
export class GameScene extends Component {
    
    @property({
        type: Node,
        displayName:    "猫咪容器"
    })
    mCatList = null;
    
    @property({
        type: Label,
        displayName:    "等级"
    })
    mLv  = null;

    @property({
        type: Label,
        displayName:    "经验"
    })
    mExp  = null;
    
    @property({
        type: Label,
        displayName:    "收入"
    })
    mGold  = null;

    @property({
        type: Label,
        displayName:    "收入速度"
    })
    mGoldSpeed  = null;


    @property({
        type: Label,
        displayName:    "体力值"
    })
    mPhysical  = null;


    
    start ()
    {
        this.initData();
        this.schedule(function() {
            console.log("=============");
        },3);
    }


    private initData(): void
    {
        this.initCatInfo();
        this.initDisplayData();
    }

    private initCatInfo(): void
    {
        for (let index = 0; index < 6; index++) {
            resourceUtil.getPrefabInfoByName("catInfo",(err: any[], prefab: Prefab)=>{
                if (err) {
                    console.error(err);
                }
                let node = instantiate(prefab) as Node;
                node.parent = this.mCatList;
            });
        }
    }

    private initDisplayData(): void
    {
        this.mExp.string = "123123";
        this.mGold.string  = "123123";
        this.mGoldSpeed.string  = "123123";
        this.mLv.string = "1231223";
        this.mPhysical.string = "123123";
    }

}
