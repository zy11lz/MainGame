// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Prefab, Node, SpriteComponent, SpriteFrame, Rect, ImageAsset, Size, loader, TextAsset, Texture2D,instantiate } from "cc";
const { ccclass } = _decorator;

@ccclass("resourceUtil")
export class resourceUtil {
    public static loadRes (url: string, type: any, cb: Function) {
        loader.loadRes(url, type, function (err, res) {
            if (err) {
                cc.error(err.message || err);
                cb(err, res);
                return;
            }

            cb(err, res);
        });
    }

    public static getMap (level: number, cb: Function) {
        let levelStr = 'map';
        //前面补0
        if (level >= 100) {
            levelStr += level;
        } else if (level >= 10) {
            levelStr += '0' + level;
        } else {
            levelStr += '00' + level;
        }

        this.loadRes(`gamePackage/map/config/${levelStr}`, null, (err, txtAsset)=>{
            if (err) {
                cb(err, txtAsset);
                return;
            }

            let content = '';
            if (txtAsset._file) {
                if (window['LZString']) {
                    content = window['LZString'].decompressFromEncodedURIComponent(txtAsset._file);
                }
                var objJson = JSON.parse(content);
                cb(null, objJson);
            } else if (txtAsset.text) {
                if (window['LZString']) {
                    content = window['LZString'].decompressFromEncodedURIComponent(txtAsset.text);
                }
                var objJson = JSON.parse(content);
                cb(null, objJson);
            } else if (txtAsset.json) {
                cb(null, txtAsset.json);
            } else {
                cb('failed');
            }
        });
    }

    public static getMapObjs(type: string, arrName: Array<string>, progressCb?:Function, completeCb?:Function) {
        let arrUrls = [];
        for (let idx = 0; idx < arrName.length; idx++) {
            arrUrls.push(`gamePackage/map/${type}/${arrName[idx]}`)
        }

        loader.loadResArray(arrUrls, Prefab, progressCb, completeCb);
    }

    public static getUIPrefabRes (prefabPath: string, cb?: Function) {
        this.loadRes("prefab/ui/" + prefabPath, cc.Prefab, cb);
    }

    public static createUI (path: string, cb?: Function, parent?: Node) {
        this.getUIPrefabRes(path, function (err, prefab) {
            if (err) return;
            var node = instantiate(prefab);
            node.setPosition(0, 0, 0);
            if (!parent) {
                parent = cc.find("Canvas");
            }

            parent.addChild(node);
            cb(null, node);
        });
    }

    public static getCarsBatch(arrName: Array<string>, progressCb?:Function, completeCb?:Function) {
        let arrUrls = [];
        for (let idx = 0; idx < arrName.length; idx++) {
            arrUrls.push(`prefab/car/car${arrName[idx]}`);
        }

        loader.loadResArray(arrUrls, Prefab, progressCb, completeCb);
    }

    public static getUICar (name:string, cb: Function) {
        this.loadRes(`prefab/ui/car/uiCar${name}`, Prefab, cb);
    }

    public static getCar (name:string, cb: Function) {
        this.loadRes(`prefab/car/car${name}`, Prefab, cb);
    }

    public static setCarIcon (name: string, sprite: SpriteComponent, isBlack: boolean, cb: Function) {
        let path = `gamePackage/texture/car/car${name}`;
        if (isBlack) {
            path += 'Black';
        }

        this.setSpriteFrame(path, sprite, cb);
    }

    public static getJsonData (fileName: string, cb: Function) {
        cc.loader.loadRes("datas/" + fileName, function (err, content) {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            if (content.json) {
                cb(err, content.json);
            } else {
                cb('failed!!!');
            }
        });
    }

    public static getData (fileName:string, cb: Function) {
        cc.loader.loadRes("datas/" + fileName, function (err, content) {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            var text = content.text;
            if (!text) {
                cc.loader.load(content.nativeUrl, function(err, content) {
                    text = content;
                    cb(err, text);
                });
                return;
            }

            cb(err, text);
        });
    }

    public static setSpriteFrame (path: string, sprite: SpriteComponent, cb: Function) {
        this.loadRes(path + '/spriteFrame', SpriteFrame, function (err, spriteFrame) {
            if (err) {
                console.error('set sprite frame failed! err:', path, err);
                cb(err);
                return;
            }

            if (sprite && cc.isValid(sprite)) {
                sprite.spriteFrame = spriteFrame;
                cb(null);
            }
        });
    }

    /**
     * 获取预制体
     *
     * @static
     * @param {string} name
     * @param {Function} cb
     * @memberof resourceUtil
     */
    public static getPrefabInfoByName (name:string, cb: Function) {
        this.loadRes(`prefabs/${name}`, Prefab, cb);
    }

    public static setCustomerIcon (name: string, sprite: SpriteComponent, cb: Function) {
        let path = `gamePackage/texture/head/head${name}`;

        this.setSpriteFrame(path, sprite, cb);
    }

    public static getEffect (name: string, cb: Function) {
        this.loadRes(`prefab/effect/${name}`, Prefab, cb);
    }
}
