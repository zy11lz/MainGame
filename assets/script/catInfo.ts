import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Typescript')
export class catInfo extends Component {
    @property({
        type: Node,
        displayName:    "猫咪底座"
    })
    mCatDest = null;

    @property({
        type: Node,
        displayName:    "猫咪"
    })
    mCat = null;

    @property({
        type: Node,
        displayName:    "猫咪任务"
    })
    mCatTask = null;

    @property({
        type: Node,
        displayName:    "猫咪想的东西"
    })
    mCatItem = null;

    start () {
        // Your initialization goes here.
        this.schedule(this.checkUpdate,1);
    }

    private checkUpdate(): void
    {

    }

    update (deltaTime: number) {
        
    }
}
