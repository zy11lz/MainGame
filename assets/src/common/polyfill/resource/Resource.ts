/**
* name 
*/
module Pro
{
	export class Resource
	{
		constructor()
		{

		}

		static polyFill()
		{
			Laya.Resource._addCPUMemory = Resource._addCPUMemory;
			Laya.Resource._addGPUMemory = Resource._addGPUMemory;
			Laya.Resource._addMemory = Resource._addMemory;

		}


		/**
		 * @internal
		 */
		static _addCPUMemory(size: number): void
		{
			Laya.Resource._cpuMemory += size;
		}

		/**
		 * @internal
		 */
		static _addGPUMemory(size: number): void
		{
			if(size >0)
			{
				let a = 1;
			}
			Laya.Resource._gpuMemory += size;
		}

		/**
		 * @internal
		 */
		static _addMemory(cpuSize: number, gpuSize: number): void
		{
			Laya.Resource._cpuMemory += cpuSize;
			Laya.Resource._gpuMemory += gpuSize;
		}
	}
}