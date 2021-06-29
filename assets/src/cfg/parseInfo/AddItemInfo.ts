/*
* name;
*/
module cfg
{
    export class AddItemInfo  extends Pb_God.PBItem
    {
        // itemid ;
        // itemcount;
        constructor()
        {
            super();
        }

        public static getAddItemAttr(parent: any, strValue: string, saveKey: string): AddItemInfo[]
        {
            if (!parent) return null;
            if (parent[saveKey] == null)
            {
                parent[saveKey] = AddItemInfo.parse(strValue);
            }
            return parent[saveKey];
        }

        public static parse(str: string): Array<AddItemInfo>
        {
            var arr: Array<AddItemInfo> = [];
            var array: Array<string> = str.split(";");
            for (var index = 0; index < array.length; index++) 
            {
                var subStr: string = array[index];
                if (subStr == "" || subStr == " ")
                {
                    continue;
                }
                var subArr = subStr.split("_");
                var info: AddItemInfo = new AddItemInfo();

                info.itemid = parseInt(subArr[0]);
                info.itemcount = parseInt(subArr[1]);
                arr.push(info);
            }
            return arr;
        }
    }
}