/**
 * 武器帮助类（绘制各种图形，移除等）
 */

class WeaponTool extends egret.DisplayObjectContainer {
    private player:Player;
    
    private radiusCircle: egret.Shape;
  

    public parent:egret.DisplayObjectContainer;

    constructor(player:Player, parent:egret.DisplayObjectContainer) {
        super();
        this.player = player;
        this.parent = parent;
    }

    public drawRadius() {
        if (!this.radiusCircle) {
            this.radiusCircle = new egret.Shape();
        }
        return this.radiusCircle;
    }

    public removeRadius() {
        if (this.radiusCircle.parent) {
            this.radiusCircle.parent.removeChild(this.radiusCircle);
        }
    }
}