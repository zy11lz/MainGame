
module cfg
{
    export class SkillValueTypeIntInfo extends Array<number> {

        public uType: number = 0;

        public static parseOne(str: string): SkillValueTypeIntInfo
        {
            var info = new SkillValueTypeIntInfo();
            str.split("_").forEach(element =>
            {
                if (element.length > 0)
                {
                    if (info.uType == 0)
                    {
                        info.uType = parseInt(element);
                    }
                    else
                    {
                        info.push(parseInt(element));
                    }
                }
            });
            return info;
        }

        public static parse(str: string): Array<SkillValueTypeIntInfo>
        {
            var arr: Array<SkillValueTypeIntInfo> = [];
            var array: Array<string> = str.split(";");
            for (var index = 0; index < array.length; index++) 
            {
                var subStr: string = array[index];
                if (subStr == "" || subStr == " ")
                {
                    continue;
                }
                arr.push(SkillValueTypeIntInfo.parseOne(subStr));
            }
            return arr;
        }
    }
}