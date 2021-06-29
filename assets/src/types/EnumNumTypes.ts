class NumResInfo
{
    public altasName: string = "";
    public numName: string = "";
    constructor(altasName: string, numName: string)
    {
        this.altasName = altasName;
        this.numName = numName;
    }
}

/*
* name;
*/
class EnumNumTypes
{

    /**加血飘字资源 */
    public static ADD_BLOOD = new NumResInfo("res/Unpack/atlas_font/bmf.fnt", "num2");
    /**物理攻击扣血 */
    public static PHYSICAL_ATTACK = new NumResInfo("res/Unpack/atlas_font/bmf.fnt", "num1");
    /**魔法攻击扣血 */
    public static MAGIC_ATTACK = new NumResInfo("res/Unpack/atlas_font/bmf.fnt", "num3");

}
