/**
* name 
*/
module cfg
{
    export class AddSkillInfo
    {
        public skillID: number = 0;
        public skillLv: number = 1;

        public static parse(str: string): Array<AddSkillInfo>
        {
            var arr: Array<AddSkillInfo> = [];
            var array: Array<string> = str.split(";");
            for (var index = 0; index < array.length; index++) 
            {
                var subStr: string = array[index];
                if (subStr == "" || subStr == " ")
                {
                    continue;
                }
                var subArr = subStr.split("_");
                var info = new AddSkillInfo();

                info.skillID = parseInt(subArr[0]);
                info.skillLv = parseInt(subArr[1]);
                arr.push(info);
            }
            return arr;
        }
    }
}