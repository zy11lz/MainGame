
/*
* name;
*/
module cfg
{
    export class ValueOneInfo
    {

        public value1: number;

        public static parse(str: string): Array<ValueOneInfo>
        {
            var arr: Array<ValueOneInfo> = [];
            var array: Array<string> = str.split(";");
            for (var index = 0; index < array.length; index++)
            {
                var subStr: string = array[index];
                if (subStr == "" || subStr == " ")
                {
                    continue;
                }
                var info = new ValueOneInfo();
                info.value1 = parseInt(subStr);
                arr.push(info);
            }
            return arr;
        }
    }
}