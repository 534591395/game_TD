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
/**
 * 武器类
 */
var WeaponFactory = (function (_super) {
    __extends(WeaponFactory, _super);
    function WeaponFactory(player, parent, weaponTool) {
        var _this = _super.call(this) || this;
        _this.player = player;
        _this.parent = parent;
        _this.weaponTool = weaponTool;
        _this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    WeaponFactory.prototype.onAddToStage = function () {
        //this.touchEnabled = true;
        // 移动
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        // 开始（按下 -down）
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        // 结束（离开 -up）
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    };
    WeaponFactory.prototype.touchMoveHandler = function (event) { };
    WeaponFactory.prototype.touchBeginHandler = function (event) {
        this.placeWeapon(this.dragWeapon);
    };
    WeaponFactory.prototype.touchEndHandler = function (event) { };
    // 放置武器
    WeaponFactory.prototype.placeWeapon = function (weapon) {
        if (!weapon) {
            return;
        }
        // const point = this.getAvailablePositionNearby();
    };
    // 创建武器
    WeaponFactory.prototype.createWeapon = function () {
    };
    // 获取附近可放置武器的位置
    WeaponFactory.prototype.getAvailablePositionNearby = function (x, y) {
        var tx = Math.round((x - this.player.startPoint[0]) / this.player.tileWidth);
        var ty = Math.round((y - this.player.startPoint[1]) / this.player.tileHeight);
        x = this.player.startPoint[0] + tx * this.player.tileWidth;
        y = this.player.startPoint[1] + ty * this.player.tileHeight;
        return { x: x, y: y, tx: tx, ty: ty };
    };
    // 判断上是否能够创建武器，通过钱来判断
    WeaponFactory.prototype.canCreate = function () {
    };
    // 可创建时武器动画效果
    WeaponFactory.prototype.updateWeapon = function () {
        if (this.canCreate()) {
        }
    };
    return WeaponFactory;
}(egret.DisplayObjectContainer));
__reflect(WeaponFactory.prototype, "WeaponFactory");
