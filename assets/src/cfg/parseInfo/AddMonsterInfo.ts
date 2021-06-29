/*
* name;
*/

module cfg
{
    export class AddMonsterInfo
    {
        /** 位置 */
        public posIndex: number;
        /** 英雄Id */
        public skinId: number;
        /** 等级 */
        public level: number;
        /** 进阶等级 */
        public advance: number;
        /** 星级 */
        public star: number;


        /** 新的解析方式，怪物表策划正在整理 */
        public static parse(str: string): Array<AddMonsterInfo>
        {
            var arr: Array<AddMonsterInfo> = [];
            var array: Array<string> = str.split(";");
            for (const subStr of array)
            {
                if (!subStr || subStr == " ")
                    continue;
                //位置_PetID_等级_阶级_星级
                var subArr = subStr.split("_");
                var info = new AddMonsterInfo();
                info.posIndex = parseInt(subArr[0]);
                info.skinId = parseInt(subArr[1]);
                info.level = parseInt(subArr[2]);
                info.advance = parseInt(subArr[3]);
                info.star = parseInt(subArr[4]);
                arr.push(info);
            }
            return arr;
        }
    }
}