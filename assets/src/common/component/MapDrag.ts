class MapDrag extends Laya.Dragging {
    constructor(){
        super();
    }

    // backArea(target: any, area: Laya.Rectangle): void {
    //     let minX: number = Laya.stage.width - target.width * target.scaleX;
    //     let minY: number = Laya.stage.height - target.height * target.scaleY;
    //     target.x = Math.min(Math.max(target.x, minX), area.x)
    //     target.y = Math.min(Math.max(target.y, minY), area.y - (target.height - Laya.stage.height))
    // }

     loop() {
            var point = this["_parent"].getMousePoint();
            var mouseX = point.x;
            var mouseY = point.y;
            var offsetX = mouseX - this["_lastX"];
            var offsetY = mouseY - this["_lastY"];
            if (this["_clickOnly"]) {
                if (Math.abs(offsetX * Laya.stage["_canvasTransform"].getScaleX()) > 20 || Math.abs(offsetY * Laya.stage["_canvasTransform"].getScaleY()) > 20) {
                    this["_clickOnly"] = false;
                    this["_offsets"] || (this["_offsets"] = []);
                    this["_offsets"].length = 0;
                    this.target.event(Laya.Event.DRAG_START, this.data);
                    Laya.MouseManager.instance.disableMouseEvent = this["_disableMouseEvent"];
                }
                else
                    return;
            }
            else {
                this["_offsets"].push(offsetX, offsetY);
            }
            if (offsetX === 0 && offsetY === 0)
                return;
            this["_lastX"] = mouseX;
            this["_lastY"] = mouseY;
            this.target.x += offsetX * this["_elasticRateX"];
            this.target.y += offsetY * this["_elasticRateY"];
            this.area && this["checkArea"]();
            this.target.event(Laya.Event.DRAG_MOVE, this.data);
        }

    // backToArea(): void 
    // {
    //     this.backArea(this.target, this.area);
    // }
}