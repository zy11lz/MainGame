class NumberUtils
{
    public static longToNumber(value: Long|number):number
    {
        return Global.longToNumber(value);
    }
    public static longToString(value: Long)
    {
        return this.longToNumber(value).toString();
    }
}