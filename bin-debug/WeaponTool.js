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
        return _super.call(this) || this;
    }
    return WeaponTool;
}(egret.DisplayObjectContainer));
__reflect(WeaponTool.prototype, "WeaponTool");
