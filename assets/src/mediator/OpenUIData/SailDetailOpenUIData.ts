
module Pro
{
	export class SailDetailOpenUIData extends BaseOpenUIData
	{

		public info: Pb_God.PBPlayerSailIndex;

		constructor(info: Pb_God.PBPlayerSailIndex)
		{
			super(PanelNotify.Open_SailDetail);
			this.info = info;
		}
	}
}