
module cfg
{
	export class SkillToTriggerType
	{

		public type: Pb_God._emSkillTriggerType;
		public prob: number;

		public static parse(str: string): SkillToTriggerType
		{
			var info = new SkillToTriggerType();
			if (str.length > 0)
			{
				let tmpAry = str.split("_");
				info.type = parseInt(tmpAry[0]);
				info.prob = parseInt(tmpAry[1]);
			}
			else
			{
				info.type = 0;
				info.prob = 0;
			}
			return info;
		}
	}
}