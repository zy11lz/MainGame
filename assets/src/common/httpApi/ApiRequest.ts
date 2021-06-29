class ApiRequest
{
    private http: Laya.HttpRequest;
    private responseType: string = "text";
    private header: Array<any> = null;

    private caller: any;
    private callBack: any;


    private _api: EnumHttpApi;

    public get api(): EnumHttpApi
    {
        return this._api;
    }
    public set api(value: EnumHttpApi)
    {
        this._api = value;
    }

    constructor()
    {
        this.http = new Laya.HttpRequest();
    }

    /**
     * setRequestType
     * @param responseType (default="text")Web 服务器的响应类型，可设置为 "text"、"json"、"xml"、"arraybuffer"
     * @return this
     */
    public setResponseType(responseType: string): void
    {
        this.responseType = responseType;
    }

    /**
     * get method
     * @param url
     * @param caller
     * @param callBack
     */
    public getRequest(url: string, caller: any, callBack: any): void
    {
        return this.request(url, caller, callBack, "get");
    }


    /**
     * post method
     * @param url
     * @param caller
     * @param callBack
     * @param data
     */
    public postRequest(url: string, caller: any, callBack: any, data?: any): void
    {
        return this.request(url, caller, callBack, "post", data);
    }

    /**
     *
     * @param url
     * @param caller
     * @param callBack
     * @param method
     * @param data
     */
    private request(url: string, caller: any, callBack: any, method: string, data?: any): void
    {
        this.caller = caller;
        this.callBack = callBack;
        this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
        this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        if (this.header == null)
        {
            this.http.send(url, data, method, this.responseType);
        } else
        {
            this.http.send(url, data, method, this.responseType, this.header);
        }
    }

    /**
     * request complete
     * @param e
     */
    private onHttpRequestComplete(e: any): void
    {
        if (this.caller != null && this.callBack != null)
        {
            this.callBack.call(this.caller, this.api, 0, this.http.data);
        }
    }

    /**
     * request error
     * @param e
     */
    private onHttpRequestError(e: any): void
    {
        if (this.caller != null && this.callBack != null)
        {
            this.callBack.call(this.caller, this.api, 1, e);
        }
    }
}