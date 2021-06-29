
/*
* name;
*/
module cfg
{
    export class ValueTwoInfo
    {

        public value1: number;
        public value2: number;

        public static parse(str: string): Array<ValueTwoInfo>
        {
            var arr: Array<ValueTwoInfo> = [];
            var array: Array<string> = str.split(";");
            for (var index = 0; index < array.length; index++) 
            {
                var subStr: string = array[index];
                if (subStr == "" || subStr == " ")
                {
                    continue;
                }
                var subArr = subStr.split("_");
                var info = new ValueTwoInfo();
                arr.push(info);

                info.value1 = parseInt(subArr[0]);
                info.value2 = parseInt(subArr[1]);
            }
            return arr;
        }
    }
}