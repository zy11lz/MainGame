/**
* name 
*/
module Pro
{
	export class FubenOpenUIData extends BaseOpenUIData
	{
		public battleType: number = -1;
		constructor()
		{
			super(PanelNotify.Open_FightMain);
		}
	}
}