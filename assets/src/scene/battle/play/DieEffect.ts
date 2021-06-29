// module Pro
// {
//     export class DieEffect extends FramePlayer
//     {
//         private _totalFrame: number = 0;
//         actionExTime: number = 0;
//         tempActionList: string[];
//         actionIndex: number = 0 ;
//         actionTime: number = 0;
//         constructor()
//         {
//             super();
//             let tempAtlasData = Laya.loader.getRes("res/ani/role/1/stand.atlas");
//             if (tempAtlasData)
//             {
//                 let tempActionFrames: Array<any> = tempAtlasData["frames"];
//                 this._totalFrame = tempActionFrames.length;
//                 this.tempActionList = new Array<string>();
//                 for (let tempKey in tempActionFrames)
//                 {
//                     this.tempActionList.push(tempKey);
//                 }
//                 this._totalFrame = this.tempActionList.length;
//             }
//             this.anchorX = 0.5;
//             this.anchorY = 0.5;
//             this.actionExTime = 100;//GameConfig.EffDetalTime;
//         }

//         public play()
//         {
//             Laya.timer.clear(this, this.update);
//             Laya.timer.frameLoop(1, this, this.update);
//             this.scaleX = actionFlipX ? -1 : 1;

//         }

//         update()
//         {
//             if (Laya.timer.currTimer - this.actionTime < this.actionExTime)
//             {
//                 return;
//             }
//             if (this.actionIndex >= this._totalFrame)
//             {
//                 this.actionIndex = 0;
//             }
//             let tmpSpName = "res/blinkModel/1/stand/" + this.tempActionList[this.actionIndex];
//             this.skin = tmpSpName;
//             //记录下一帧切换时间
//             this.actionTime = Laya.timer.currTimer;
//             this.actionIndex++;
//         }

//         public stop()
//         {
//             Laya.timer.clear(this, this.update);
//         }
//     }
// }