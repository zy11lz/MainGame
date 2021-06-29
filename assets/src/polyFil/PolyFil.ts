/*
* name;
*/
class PolyFil
{
    constructor()
    {

    }


    static createByJson(json: any, node?: any, root?: Laya.Node, customHandler?: Laya.Handler, instanceHandler?: Laya.Handler): any
    {
        if (typeof (json) == 'string')
        {
            json = JSON.parse((<string>json));
        }
        var props: any = json.props;

        if (!node)
        {
            node = instanceHandler ? instanceHandler.runWith(json) : Laya.ClassUtils.getInstance(props.runtime || json.type);
            if (!node) { return null; }
        }

        var child: any[] = json.child;
        if (child)
        {
            for (var i: number = 0, n: number = child.length; i < n; i++)
            {
                var data: any = child[i];
                if ((data.props.name === "render" || data.props.renderType === "render") && node["_$set_itemRender"])
                {
                    node.itemRender = data;
                    if ((node).setItemRender != null)
                    {
                        (node).setItemRender(data);
                    }
                }
                else
                {
                    if (data.type == "Graphic")
                    {
                        Laya.ClassUtils["_addGraphicsToSprite"](data, node);
                    } else if (Laya.ClassUtils["_isDrawType"](data.type))
                    {
                        Laya.ClassUtils["_addGraphicToSprite"](data, node, true);
                    } else
                    {
                        var tChild: any = Laya.ClassUtils.createByJson(data, null, root as any, customHandler, instanceHandler)
                        if (data.type === "Script")
                        {
                            if ("owner" in tChild)
                            {
                                tChild["owner"] = node;
                            } else if ("target" in tChild)
                            {
                                tChild["target"] = node;
                            }
                        } else if (data.props.renderType == "mask")
                        {
                            node.mask = tChild;
                        } else
                        {
                            node.addChild(tChild);
                        }
                    }
                }
            }
        }

        if (props)
        {
            for (var prop in props)
            {
                var value: any = props[prop];
                if (prop === "var" && root)
                {
                    root[value] = node;
                } else if (value instanceof Array && node[prop] instanceof Function)
                {
                    node[prop].apply(node, value);
                } else
                {
                    node[prop] = value;
                }
            }
        }

        if (customHandler && json.customProps)
        {
            customHandler.runWith([node, json]);
        }

        if (node["created"]) { node.created(); }

        return node;
    }
}