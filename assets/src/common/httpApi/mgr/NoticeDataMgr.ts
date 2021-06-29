
/**
 *  公告管理
 */
module Pro
{
    class NoticeDataaMgrCls
    {
        notiveArr: NoticeInfo[] = [];
        isShowed: boolean = false;

        isHaveNotice()
        {
            return this.notiveArr.length > 0;
        }

        onGetNoticeData(data: NoticeInfo[])
        {
            this.notiveArr = data;
            if (this.isShowed == false)
            {
                this.isShowed = true;
                var isNeedShow: boolean = false;
                let noticeStr = Public.LStorageMgr.GetInst().getLocalData("xjl_notice");
                var readObj: Object = {};
                if (noticeStr == null || noticeStr == "")
                {
                    readObj = {};
                } else
                {
                    readObj = JSON.parse(noticeStr);
                }
                for (let index = 0; index < data.length; index++)
                {
                    const info: NoticeInfo = data[index];
                    if (!readObj.hasOwnProperty(info.id))
                    {
                        readObj[info.id] = info.id;
                        if (info.content.indexOf("无内容") == -1)
                        {
                            isNeedShow = true;
                        }
                    }
                }

                this.notiveArr.sort(this.nodiceSortFunc)
                Public.LStorageMgr.GetInst().setLocalData("xjl_notice", JSON.stringify(readObj));
                if (isNeedShow)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Notice));
                }
            }
        }
        nodiceSortFunc(a: NoticeInfo, b: NoticeInfo)
        {
            var aNum = a.is_top * 10000 + parseInt(a.id);
            var bNum = b.is_top * 10000 + parseInt(b.id);
            return aNum > bNum ? -1 : 1;
        }

        getNoticeByIndex(newIndex: number): NoticeInfo
        {
            if (newIndex < this.notiveArr.length)
            {
                return this.notiveArr[newIndex];
            }
            return null;
        }
    }
    export var NoticeDataMgr: NoticeDataaMgrCls = new NoticeDataaMgrCls();
}