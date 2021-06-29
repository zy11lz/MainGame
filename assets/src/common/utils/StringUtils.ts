/*
* name;
*/
class StringUtils
{
    constructor()
    {

    }

    static traneToMB(value: number): number
    {
        return Math.floor(value / (1024 * 1024) * 100) / 100;
    }
    static isNotEmpty(value:string)
    {
        return  !StringUtils.isEmpty(value);
    }
    static isEmpty(value:string)
    {
        return value == null||value.length==0;
    }
    /**
        * 平台放发的邮件或者公告带的html标识中不识别
        * 并且文字的大小和颜色会引起报错 这里转译为我们支持的html 目前只处理了颜色、字号、换行
        */
    static formatPlatDescString(desc: string)
    {
        let returnStr = desc;
        let sizeIdx = desc.indexOf("size=");
        let colorIdx = desc.indexOf("color=0x");

        let colorReg: RegExp = /0x.*?\b/g;           //匹配颜色
        let sizeReg: RegExp = /size=[1-9][0-9]*\b/g; //匹配字号
        let underLineReg: RegExp = / u='true'/g;     //匹配下划线
        let boldReg: RegExp = / b='true'/g;          //匹配粗体
        let italicReg: RegExp = / i='true'/g;        //匹配斜体
        let brReg: RegExp = /\\n/g;                  //匹配换位
        let br2Reg: RegExp = /\n/g;                   //匹配换位
        let noUseTag: RegExp = /<p>/g;                //匹配无用标签
        let noUseTag2: RegExp = /<\/p>/g;

        let colors = desc.match(colorReg);
        if (colors)
        {
            for (let i = 0; i < colors.length; i++)
            {
                let color = colors[i];
                let realColor = color.replace("0x", "'#") + "'";
                returnStr = returnStr.replace(color, realColor);
            }
        }

        let sizes = desc.match(sizeReg);
        if (sizes)
        {
            for (let i = 0; i < sizes.length; i++)
            {
                let size = sizes[i];
                let realSize = size.replace("size=", "style='fontSize:") + "'";
                returnStr = returnStr.replace(size, realSize);
            }
        }

        let underLines = desc.match(underLineReg);
        if (underLines)
        {
            for (let i = 0; i < underLines.length; i++)
            {
                let underLine = underLines[i];
                returnStr = returnStr.replace(underLine, "");
            }
        }

        let bolds = desc.match(boldReg);
        if (bolds)
        {
            for (let i = 0; i < bolds.length; i++)
            {
                let bold = bolds[i];
                returnStr = returnStr.replace(bold, "");
            }
        }

        let italics = desc.match(italicReg);
        if (italics)
        {
            for (let i = 0; i < italics.length; i++)
            {
                let italic = italics[i];
                returnStr = returnStr.replace(italic, "");
            }
        }

        let brs = desc.match(brReg);
        if (brs)
        {
            for (let i = 0; i < brs.length; i++)
            {
                let br = "\\" + brs[i];
                returnStr = returnStr.replace(br, "<br>").replace("<font><br></font>", "<br>");     //平台放下发的所有文字都带有<font>标签 换行不能在标签内 这里剔除掉
            }
        }

        let br2s = desc.match(br2Reg);
        if (br2s)
        {
            for (let i = 0; i < br2s.length; i++)
            {
                let br = br2s[i];
                returnStr = returnStr.replace(br, "<br>").replace("<font><br></font>", "<br>");     //平台放下发的所有文字都带有<font>标签 换行不能在标签内 这里剔除掉
            }
        }

        // let noUseTags = desc.match(noUseTag);
        // if(noUseTags)
        // {
        //     for (let i = 0; i < noUseTags.length; i++)
        //     {
        //         let tag = noUseTags[i];
        //         returnStr = returnStr.replace(tag, "");
        //     }
        // }

        // let noUseTag2s = desc.match(noUseTag2);
        // if(noUseTag2s)
        // {
        //     for (let i = 0; i < noUseTag2s.length; i++)
        //     {
        //         let tag = noUseTag2s[i];
        //         returnStr = returnStr.replace(tag, "");
        //     }
        // }

        return returnStr;
    }

}