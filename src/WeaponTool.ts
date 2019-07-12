/**
 * 武器帮助类（绘制各种图形，移除等）
 */

class WeaponTool extends egret.DisplayObjectContainer {
    private player:Player;
    
    private radiusCircle: egret.Shape;
    private radius: Number;
    // 圈内是否可放置武器（圈为绿色：表示武器可放置(#008b00)， 红色表示不可放置(#ff0000)）
    private enabled:Boolean;

    private upgradeDisabledIcon:egret.Bitmap;
    private upgradeIcon:egret.Bitmap;
    private sellIcon:egret.Bitmap;

    private rightIcon: egret.Bitmap;
  

    public parent:egret.DisplayObjectContainer;
    public weapon:Gatling;

    constructor(player:Player, parent:egret.DisplayObjectContainer) {
        super();
        this.player = player;
        this.parent = parent;
    }

    public drawRadius(weapon:Gatling, enabled:Boolean) {
        if (!this.radiusCircle) {
            this.radiusCircle = new egret.Shape();
        }
        const radius = weapon.attackRadius;
        if (this.radius != radius) {
            this.radius = radius;
            this.radiusCircle.x = 0;
            this.radiusCircle.y = 0;
        }
        if (this.enabled != enabled) {
            this.radiusCircle.graphics.clear();
            this.enabled = enabled;
            this.radiusCircle.graphics.lineStyle(4, 0xb8eaff, 0.4);
            this.radiusCircle.graphics.beginFill(enabled ? 0x008b00 : 0xff0000, 0.4);
            this.radiusCircle.graphics.drawCircle(0, 0, radius);
        }
        
        this.radiusCircle.graphics.endFill();

        return this.radiusCircle;
    }

    public removeRadius() {
        if (this.radiusCircle.parent) {
            this.radiusCircle.parent.removeChild(this.radiusCircle);
        }
    }

    public remove() {
        if (this.rightIcon) {
            this.removeChild(this.rightIcon);
        }
        this.parent.removeChild(this);
        this.weapon = null;
    }

    public show(weapon:Gatling, enabled:Boolean, hasTool:Boolean) {
        this.weapon = weapon;
        this.drawRadius(weapon, enabled);
        this.addChildAt(this.radiusCircle, 0);
        // 卖了、升级？, 添加两种图标
        if (hasTool) {
            this.addChild(this.sellIcon);
            this.sellIcon.x = 0;
            this.sellIcon.y = 0;
            this.sellIcon.scaleX = this.sellIcon.scaleY = 0.2;
            // 能否升级图标设置 
            if (
                weapon.canUpgrade() &&
                this.player.money >= weapon.upgradeMoney
            ) {
                this.rightIcon = this.upgradeIcon;
            } else {
                this.rightIcon = this.upgradeDisabledIcon;
            }
            this.rightIcon.x = 0;
            this.rightIcon.y = 0;
            this.rightIcon.scaleX = this.rightIcon.scaleY = 0.2;
            this.addChild(this.rightIcon);
        }
        
        // 转化为舞台坐标, 文档参考：http://developer.egret.com/cn/github/egret-docs/Engine2D/displayObject/transform/index.html
        weapon.localToGlobal(0, 0);
        this.x = weapon.x - 0;
        this.y = weapon.y - 5;
        this.radiusCircle.x = -weapon.attackRadius - 2;
        this.radiusCircle.y = weapon.attackRadius - 4;
        this.parent.addChild(this);
    }
}