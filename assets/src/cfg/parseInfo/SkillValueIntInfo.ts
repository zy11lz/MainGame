
module cfg
{
    export class SkillValueIntInfo extends Array<number> {

        public static parseOne(str: string, spitStr: string = "_"): SkillValueIntInfo
        {
            var info = new SkillValueIntInfo();
            str.split(spitStr).forEach(element =>
            {
                if (element.length > 0)
                {
                    info.push(parseInt(element));
                }
            });
            return info;
        }

        public static parse(str: string): Array<SkillValueIntInfo>
        {
            var arr: Array<SkillValueIntInfo> = [];
            var array: Array<string> = str.split(";");
            for (var index = 0; index < array.length; index++) 
            {
                var subStr: string = array[index];
                if (subStr == "" || subStr == " ")
                {
                    continue;
                }
                arr.push(SkillValueIntInfo.parseOne(subStr));
            }
            return arr;
        }
    }
}