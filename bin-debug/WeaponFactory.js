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
        // 鼠标点击时，鼠标全局坐标与_bird的位置差    http://developer.egret.com/cn/example/egret2d/index.html#060-interact-drag-drop
        _this.distance = new egret.Point();
        _this.player = player;
        _this.parent = parent;
        _this.weaponTool = weaponTool;
        _this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    WeaponFactory.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        // TODO : 武器的图标（右下角的小图标）
        this.gatingdIcon = this.createBitmapByName("gatingdIcon_png");
        var targetMap = Map.getMapObj('tool', 'gatingdIcon');
        if (targetMap) {
            this.gatingdIcon.x = targetMap.$x;
            this.gatingdIcon.y = targetMap.$y;
            this.gatingdIcon.width = targetMap.$width;
            this.gatingdIcon.height = targetMap.$height;
        }
        this.parent.addChild(this.gatingdIcon);
        //this.touchEnabled = true;
        // 移动
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        // 开始（按下 -down）
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        // 结束（离开 -up）
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    };
    WeaponFactory.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    WeaponFactory.prototype.touchMoveHandler = function (event) {
        this.event = event;
        this.placeWeapon(this.dragWeapon);
    };
    WeaponFactory.prototype.touchBeginHandler = function (event) {
        this.event = event;
        // 需点击了创建的图标，才能创建武器（TODO: 图标是否可点击未判断）
        if (this.gatingdIcon.hitTestPoint(event.stageX, event.stageY)) {
            this.createWeapon();
            if (this.dragWeapon) {
                this.distance.x = event.stageX - this.dragWeapon.x;
                this.distance.y = event.stageY - this.dragWeapon.y;
            }
        }
    };
    WeaponFactory.prototype.touchEndHandler = function (event) {
        if (!this.dragWeapon) {
            return;
        }
        this.event = event;
        var yes = this.placeWeapon(this.dragWeapon);
        // 如果该位置可放置武器
        if (yes) {
            this.player.addWeapon(this.dragWeapon);
            this.player.money -= this.dragWeapon.cost;
            this.updateWeapon();
            this.weaponTool.removeRadius();
        }
        else {
            this.parent.removeChild(this.dragWeapon);
        }
        this.dragWeapon = null;
    };
    // 放置武器
    WeaponFactory.prototype.placeWeapon = function (weapon) {
        var bool = false;
        if (!weapon) {
            return bool;
        }
        // 附近可放置武器的位置 
        var point = this.getAvailablePositionNearby(this.event.stageX - this.distance.x, this.event.stageY - this.distance.y);
        if (point) {
            this.dragWeapon.x = point.x;
            this.dragWeapon.y = point.y;
            this.dragWeapon.tx = point.tx;
            this.dragWeapon.ty = point.ty;
            var radiusCircle = void 0;
            // 该区域放置武器（判断），说明：瓦片地图格子 maxTx = 20, maxTy = 10;
            if ((point.tx == 0 && point.ty == 3) ||
                point.tx < 0 ||
                point.tx > 19 ||
                point.ty < 0 ||
                point.ty >= 7 ||
                this.player.getWeaponAt(point.tx, point.ty) ||
                !this.player.buildPath(point.tx, point.ty)) {
                radiusCircle = this.weaponTool.drawRadius(this.dragWeapon, false);
                radiusCircle.x = this.dragWeapon.attackRadius / 2 - 15;
                radiusCircle.y = this.dragWeapon.attackRadius / 2 - 15;
                this.dragWeapon.addChild(radiusCircle);
                this.dragWeapon.alpha = 0.5;
                // 不可放置
                bool = false;
            }
            else {
                radiusCircle = this.weaponTool.drawRadius(this.dragWeapon, true);
                radiusCircle.x = this.dragWeapon.attackRadius / 2 - 15;
                radiusCircle.y = this.dragWeapon.attackRadius / 2 - 15;
                console.log(this.dragWeapon.tx, this.dragWeapon.ty);
                this.dragWeapon.addChild(radiusCircle);
                this.dragWeapon.alpha = 1.0;
                // 可放置
                bool = true;
            }
        }
        return bool;
    };
    // 创建武器
    WeaponFactory.prototype.createWeapon = function () {
        if (this.canCreate()) {
            var gatling = new Gatling();
            this.dragWeapon = gatling;
            this.dragWeapon.x = this.x;
            this.dragWeapon.y = this.y;
            this.placeWeapon(gatling);
            this.parent.addChild(gatling);
        }
    };
    // 获取附近可放置武器的位置
    WeaponFactory.prototype.getAvailablePositionNearby = function (x, y) {
        var tx = Math.round((x - this.player.startPoint[0]) / this.player.tileWidth);
        var ty = Math.round((y - this.player.startPoint[1]) / this.player.tileHeight);
        //let ty = Math.round( (y) / this.player.tileHeight );
        console.log(y);
        x = this.player.startPoint[0] + tx * this.player.tileWidth;
        y = this.player.startPoint[1] + ty * this.player.tileHeight;
        return { x: x, y: y, tx: tx, ty: ty };
    };
    // 判断上是否能够创建武器，通过钱来判断
    WeaponFactory.prototype.canCreate = function () {
        return true;
        // return this.player.money >= Gatling.getLevel(0).cost;
    };
    // 可创建时武器动画效果
    WeaponFactory.prototype.updateWeapon = function () {
        if (this.canCreate()) {
        }
    };
    return WeaponFactory;
}(egret.DisplayObjectContainer));
__reflect(WeaponFactory.prototype, "WeaponFactory");
