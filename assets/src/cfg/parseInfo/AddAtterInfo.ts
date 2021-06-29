
module cfg
{
    /**
     * 角色属性
     */
    export class AddAtterInfo
    {
        /**
         * 属性类型
         */
        public type: Pb_God._emBattleAttribute = 0;
        /**
         * 属性整数值
         */
        public value: number = 0;
        /**
         * 万分比属性加成
         */
        public valuePer: number = 0;

        public static parse(str: string, hasFlortNum: boolean = false): Array<AddAtterInfo>
        {
            var arr: Array<AddAtterInfo> = [];
            var array: Array<string> = str.split(";");
            for (var index = 0; index < array.length; index++) 
            {
                var subStr: string = array[index];
                if (subStr == "" || subStr == " ")
                {
                    continue;
                }
                var subArr = subStr.split("|");
                var info = new AddAtterInfo();

                info.type = parseInt(subArr[0]);
                info.value = hasFlortNum ? parseFloat(subArr[1]) : parseInt(subArr[1]);
                if (subArr.length >= 3)
                {
                    info.valuePer = parseInt(subArr[2]);
                }
                arr.push(info);
            }
            return arr;
        }
    }
}