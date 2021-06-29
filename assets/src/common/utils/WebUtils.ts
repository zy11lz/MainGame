class WebUtils
{
    public static getParam(param): string
    {
        if (window && window.location && window.location.search)
        {
            var uri = window.location.search;
            var re = new RegExp("" + param + "=([^&?]*)", "ig");
            return ((uri.match(re)) ? (uri.match(re)[0].substr(param.length + 1)) : '');
        }
        return null;
    }
}