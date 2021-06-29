/**
 * 页签组件显示页的接口， 注意此接口需要接和TableContiner 使用
 * @author liuYang
 * 
 */
module Pro
{
	export interface ITableView
	{
		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void;

		/** 页签组件销毁 */
		dispose(): void;

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void;

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void;

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部主动调用,传递参数信息 */
		setData($data: any): void;

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void;

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void;

		/** 本类注册事件(如果接口类属于Laya节点，本接口不用继承) */
		on(type: String, caller: any, listener: Function, args?: Array<any>): void;

		/** 本类移除事件(如果接口类属于Laya节点，本接口不用继承) */
		off(type: String, caller: any, listener: Function): void;
	}
}
