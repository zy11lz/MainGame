/*
* name;
*/
class StatItemInfo
{

  // this._view[0] = { title: "FPS(WebGL)", value: "_fpsStr", color: "yellow", units: "int" };
  // 	this._view[1] = { title: "Spridddte", value: "_spriteStr", color: "white", units: "int" };
  // 	this._view[2] = { title: "RenderBatches", value: "renderBatches", color: "white", units: "int" };
  // 	this._view[3] = { title: "SavedRenderBatches", value: "savedRenderBatches", color: "white", units: "int" };
  // 	this._view[4] = { title: "CPUMemory", value: "cpuMemory", color: "yellow", units: "M" };
  // 	this._view[5] = { title: "GPUMemory", value: "gpuMemory", color: "yellow", units: "M" };
  // 	this._view[6] = { title: "Shader", value: "shaderCall", color: "white", units: "int" };
  // 	this._view[7] = { title: "Canvas", value: "_canvasStr", color: "white", units: "int" };
  targetCls: any;
  title: string;
  value: string;
  color: string;
  units: string;
  x: number = 0;
  y: number = 0;

  constructor()
  {

  }
}