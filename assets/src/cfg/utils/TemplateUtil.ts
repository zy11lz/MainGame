module cfg
{

	/**
	 * 策划配置数据工具类
	 * 用来创建配置数据的索引
	 * @author fly.liuyang
	 *
	 */
	export class TemplateUtil
	{
		/**
		 * 把dic里存储的键提取出来转换为数组
		 */
		public static converDicKeyToArr(dic: Object): any[]
		{
			var arr: any[] = new Array();
			var i: any
			for (i in dic)
			{
				arr.push(i);
			}
			return arr;
		}

		/**
		 * 把dic里存储的值提取出来转换为数组
		 */
		public static converDicValueToArr(dic: Object): any[]
		{
			var arr: any[] = new Array();
			var i: any;
			for (i in dic)
			{
				arr.push(dic[i]);
			}
			return arr;
		}

		/**
		 * 把array数组转换Dictionary
		 * @param arr
		 * @param keyName
		 * @return
		 *
		 */
		public static converArrToDictionary(arr: any, keyName: string): Object
		{
			var dic: Object = {};
			var obj: Object
			for (obj of arr)
			{
				if (obj.hasOwnProperty(keyName))
				{
					dic[obj[keyName]] = obj;
				}
			}
			return dic;
		}

		public static convertNumArrToDic(arr: Array<number>): Object
		{
			var dic: Object = {};
			var obj: number;
			for (obj of arr)
			{
				dic[obj] = obj;
			}
			return dic;
		}

		// /**
		//  * 把array数组转换Dictionary
		//  * @param arr
		//  * @param keyName
		//  * @return
		//  *
		//  */
		// public static converArrToDictionaryNoKey(arr:any):Dictionary
		// {
		// 	var dic:Dictionary = new Dictionary();
		// 	if(arr)
		// 	{
		// 		for each (var obj:any in arr)
		// 		{
		// 			dic[obj] = obj;
		// 		}
		// 	}
		// 	return dic;
		// }

		// /**
		//  * 把Vector数组转换Dictionary
		//  * @param arr
		//  * @param keyName
		//  * @return
		//  *
		//  */
		// public static converVectorToDictionary(arr:any,keyName:string):Dictionary
		// {
		// 	var dic:Dictionary = new Dictionary();
		// 	for each (var obj:Object in arr)
		// 	{
		// 		if(obj.hasOwnProperty(keyName))
		// 		{
		// 			dic[obj[keyName]] = obj;
		// 		}
		// 	}
		// 	return dic;
		// }

		/**
		 * 创建联合索引 【联合组建】
		 * @param dataDic
		 * @param indexArr
		 * @return
		 *
		 */
		public static createUniqIndexFromDic(dataDic: Object, indexArr: any[]): Object
		{
			return TemplateUtil.createUniqIndexFromObj(dataDic, indexArr);
		}
		/**
		 * 创建联合索引 【联合组建】
		 * @param dataDic
		 * @param indexArr
		 * @return
		 *
		 */
		public static createUniqIndexFromArr(dataArr: any[], indexArr: any[]): Object
		{
			return TemplateUtil.createUniqIndexFromObj(dataArr, indexArr);
		}
		/**
		 * 创建联合索引 【联合组建】
		 * @param dataDic
		 * @param indexArr
		 * @return
		 *
		 */
		public static createUniqIndexFromVec(dataArr: any, indexArr: any[]): Object
		{
			return TemplateUtil.createUniqIndexFromObj(dataArr, indexArr);
		}
		/**
		 * 创建联合索引 【联合组建】
		 * @param dataDic
		 * @param indexArr
		 * @return
		 *
		 */
		private static createUniqIndexFromObj(dataDic: Object, indexArr: any[]): Object
		{
			var indexDic: Object = {};
			var key: any;
			// for (var key in object) {
			// 	if (object.hasOwnProperty(key)) {
			// 		var element = object[key];

			// 	}
			// }
			for (key in dataDic)
			{
				var obj = dataDic[key];
				var valueArr: any[] = new Array();
				var attName: string
				for (attName of indexArr)
				{
					valueArr.push(obj[attName]);
				}
				var keyStr: string = valueArr.join("_");
				var arr: any[] = indexDic[keyStr];
				if (arr == null)
				{
					arr = new Array();
					indexDic[keyStr] = arr;
				}
				arr.push(obj);
			}
			return indexDic;
		}

		// public static createIndexFromDic(dataDic:Object,indexArr:any[]):Object
		// {
		// 	return TemplateUtil.createIndexFromObj(dataDic,indexArr);
		// }

		// public static createIndexFromArr(dataDic:any[],indexArr:any[]):Object
		// {
		// 	return TemplateUtil.createIndexFromObj(dataDic,indexArr);
		// }

		// public static createIndexFromVec(dataVec:any,indexArr:any[]):Object
		// {
		// 	return TemplateUtil.createIndexFromObj(dataVec,indexArr);
		// }

		// private static createIndexFromObj(dataSource:Object,indexArr:any[]):Object
		// {
		// 	var indexDic:any = {};
		// 	var dataObj:Object
		// 	for (dataObj in dataSource)
		// 	{
		// 		var indexObj:Object
		// 		for(indexObj of indexArr)
		// 		{
		// 			if(indexObj instanceof String)
		// 			{
		// 				var dic:Object = indexDic.indexObj;
		// 				if(dic == null)
		// 				{
		// 					dic = {};
		// 					indexDic.indexObj = dic;
		// 				}
		// 				var arr:any[] =  dic[dataObj[indexObj]];
		// 				if(arr == null)
		// 				{
		// 					arr = new Array();
		// 					dic[dataObj[indexObj]] = arr;
		// 				}
		// 				arr.push(dataObj);
		// 			}else if(indexObj instanceof Array)//联合索引
		// 			{
		// 				var arrKey:string = (<Array>indexObj ).join("_");
		// 				var mulitDic:Dictionary = indexDic[arrKey];
		// 				if(mulitDic == null)
		// 				{
		// 					mulitDic = new Dictionary();
		// 					indexDic[arrKey] = mulitDic;
		// 				}
		// 				for each (var subIndexName:Object in indexObj)
		// 				{
		// 					var mulitArr:any[] =  mulitDic[dataObj[subIndexName]];
		// 					if(mulitArr == null)
		// 					{
		// 						mulitArr = new Array();
		// 						mulitDic[dataObj[subIndexName]] = mulitArr;
		// 					}
		// 					mulitArr.push(dataObj);
		// 				}
		// 			}
		// 		}
		// 	}
		// 	return indexDic;
		// }

		// public static collectKeyToArr(arr:any, keyName:string):any[]
		// {
		// 	var returnArr:any[] = new Array();
		// 	var obj:Object
		// 	for(obj in arr)
		// 	{
		// 		if(obj.hasOwnProperty(keyName))
		// 		{
		// 			returnArr.push(obj[keyName]);
		// 		}
		// 	}
		// 	return returnArr;
		// }

		public static createSimpleIndexFromObj(dataArr: Array<any>, indexStr: string): Object
		{
			var indexDic: Object = new Object();

			for (var dataObj of dataArr)
			{
				if (dataObj.hasOwnProperty(indexStr))
				{
					var indexValue: any = dataObj[indexStr];
					var arr: any[] = indexDic[indexValue];
					if (arr == null)
					{
						arr = new Array();
						indexDic[indexValue] = arr;
					}
					arr.push(dataObj);
				}
			}
			return indexDic;
		}
	}
}