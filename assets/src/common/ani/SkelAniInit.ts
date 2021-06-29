/**
 * 贴图格式
 */
class TextureFormat
{

    // ["WEBGL_compressed_texture_astc", "", "", "", "WEBGL_compressed_texture_s3tc_srgb"];

    /** rgb dxt1、rgba dxt1、rgba dxt3、rgba dxt5 */
    public static readonly COMPRESSED_TEXTURE_S3TC: string = "WEBGL_compressed_texture_s3tc";
    /** rgb、rbga explicit alpha、rgba interpolated alpha */
    public static readonly COMPRESSED_TEXTURE_ATC: string = "WEBGL_compressed_texture_atc";
    /**rgb 4bpp, rgb 2bpp, rgb 4bpp, rgb 2bpp*/
    public static readonly COMPRESSED_TEXTURE_PVRTC: string = "WEBGL_compressed_texture_pvrtc";

    // DXT formats, from:
    // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
    public static readonly COMPRESSED_RGB_S3TC_DXT1_EXT: number = 0x83F0;
    public static readonly COMPRESSED_RGBA_S3TC_DXT1_EXT: number = 0x83F1;
    public static readonly COMPRESSED_RGBA_S3TC_DXT3_EXT: number = 0x83F2;
    public static readonly COMPRESSED_RGBA_S3TC_DXT5_EXT: number = 0x83F3;
    // ATC formats, from:
    // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_atc/
    public static readonly COMPRESSED_RGB_ATC_WEBGL: number = 0x8C92;
    public static readonly COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: number = 0x8C93;
    public static readonly COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: number = 0x87EE;
    // PVR formats, from:
    // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    public static readonly COMPRESSED_RGB_PVRTC_4BPPV1_IMG: number = 0x8C00;
    public static readonly COMPRESSED_RGB_PVRTC_2BPPV1_IMG: number = 0x8C01;
    public static readonly COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: number = 0x8C02;
    public static readonly COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: number = 0x8C03;
    // not support etc1
    // ETC1 format, from:
    // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc1/
    public static readonly COMPRESSED_RGB_ETC1_WEBGL: number = 0x8D64;

    private constructor()
    {

    }

}

/*
* name;
*/
class SkelAniInit
{
    static isCanPvr: boolean = false;

    static init(isIos: boolean)
    {
        // this.initGl();
        spine.FlypineSetting.IS_LAYA_ONE = false;
        spine.FlypineSetting.isOpenBlend = false;
        spine.FlypineSetting.isOpenClipping = true;
        spine.FlypineSetting.renderGap = 1;
        if (isIos)
        {
            spine.FlypineSetting.clipReturn = false;
            spine.FlypineSetting.noLoopOnClip = false;
            // spine.FlypineSetting.renderGap = 2;
        }
        spine.FlypineSetting.setSkelFrameRate(3 * spine.FlypineSetting.renderGap)
        spine.FlyRender.ins.start();
    }

    static initGl()
    {
        // let gl: WebGLRenderingContext = Laya.WebGLContext.mainContext;
        // let vendorPrefixes = ["", "WEBKIT_", "MOZ_"];
        // for (let i = 0; i < vendorPrefixes.length; ++i)
        // {
        //     if (gl.getExtension(vendorPrefixes[i] + TextureFormat.COMPRESSED_TEXTURE_ATC))
        //     {
        //         console.log("_supportATC");
        //         // SkelAniInit.isCanPvr =  true;
        //         logE( "SkelAniInit.isCanPvr" +  SkelAniInit.isCanPvr)
        //     } else if (gl.getExtension(vendorPrefixes[i] + TextureFormat.COMPRESSED_TEXTURE_PVRTC))
        //     {
        //         console.log("_supportPVR");
        //     } else if (gl.getExtension(vendorPrefixes[i] + TextureFormat.COMPRESSED_TEXTURE_S3TC))
        //     {
        //         console.log("_supportDDS");
        //     }
        // }
    }

    static recyleSpine()
    {
        var freeArr: string[] = spine.TempletMgr.instance.checkFreeTempltet();
        for (var index = 0; index < freeArr.length; index++)
        {
            var element = freeArr[index];
            logI("回收骨骼动画", element);
            spine.TempletMgr.instance.disposeTemplet(element);
        }
    }
}