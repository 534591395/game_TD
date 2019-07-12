/**
 * 武器帮助类（绘制各种图形，移除等）
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var WeaponTool = (function (_super) {
    __extends(WeaponTool, _super);
    function WeaponTool(player, parent) {
        var _this = _super.call(this) || this;
        _this.player = player;
        _this.parent = parent;
        return _this;
    }
    WeaponTool.prototype.drawRadius = function (weapon, enabled) {
        if (!this.radiusCircle) {
            this.radiusCircle = new egret.Shape();
        }
        var radius = weapon.attackRadius;
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
    };
    WeaponTool.prototype.removeRadius = function () {
        if (this.radiusCircle.parent) {
            this.radiusCircle.parent.removeChild(this.radiusCircle);
        }
    };
    WeaponTool.prototype.remove = function () {
        if (this.rightIcon) {
            this.removeChild(this.rightIcon);
        }
        this.parent.removeChild(this);
        this.weapon = null;
    };
    WeaponTool.prototype.show = function (weapon, enabled, hasTool) {
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
            if (weapon.canUpgrade() &&
                this.player.money >= weapon.upgradeMoney) {
                this.rightIcon = this.upgradeIcon;
            }
            else {
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
    };
    return WeaponTool;
}(egret.DisplayObjectContainer));
__reflect(WeaponTool.prototype, "WeaponTool");
