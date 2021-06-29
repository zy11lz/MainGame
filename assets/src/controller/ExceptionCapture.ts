// /**
//  * 游戏异常拦截
// * name
// */
// module Pro
// {
// 	export class ExceptionCapture
// 	{
// 		constructor()
// 		{

// 		}

// 		static setup()
// 		{
// 			if (GlobalData.isRelease)
// 			{
// 				window.onerror = function (message: string, filename: string, lineno: number, colno: number, error: Error)
// 				{
// 					if (!GlobalData.isRelease)
// 					{ //调试模式，不讲究
// 						// eslint-disable-next-line
// 						alert(`出错啦，请将此弹窗截图发给前端同事，或者看看控制台发生了啥？\n\n` + error.stack);
// 						return;
// 					}
// 					//正式环境下，修剪一下文字，然后存到日志服务器上
// 					let errorMsg = message + " :--->  ";
// 					let stackList = error.stack ? error.stack.split("\n    at ") : [""];
// 					stackList.shift(); //去掉前面多余的
// 					let leftLen = 5;
// 					if (stackList.length > leftLen) { stackList.splice(leftLen, stackList.length - leftLen); }
// 					//发布模式下， 本身只有一行代码，显示报错位置无意义
// 					let reg = /\([^\)]*\)/;
// 					for (var i = 0; i < stackList.length; i++)
// 					{
// 						stackList[i] = stackList[i].replace(reg, "");
// 					}
// 					errorMsg += stackList.join(" <--");
// 					GameLaunch.PostClientLog(errorMsg);

// 					ThirdMgr.onCrash(error.stack);
// 				}

// 			} else
// 			{
// 				Laya.alertGlobalError(false);
// 			}
// 		}
// 	}
// }