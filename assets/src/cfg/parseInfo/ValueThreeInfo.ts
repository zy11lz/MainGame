
/*
* name;
*/
module cfg
{
    export class ValueThreeInfo
    {

        public value1: number;
        public value2: number;
        public value3: number;

        public static parse(str: string): Array<ValueThreeInfo>
        {
            var arr: Array<ValueThreeInfo> = [];
            var array: Array<string> = str.split(";");
            for (var index = 0; index < array.length; index++) 
            {
                var subStr: string = array[index];
                if (subStr == "" || subStr == " ")
                {
                    continue;
                }
                var subArr = subStr.split("_");
                var info = new ValueThreeInfo();
                arr.push(info);

                info.value1 = parseInt(subArr[0]);
                info.value2 = parseInt(subArr[1]);
                info.value3 = parseInt(subArr[2]);
            }
            return arr;
        }
    }
}