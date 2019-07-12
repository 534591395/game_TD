/**
 * 格林机枪类（武器的一种）
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
var Gatling = (function (_super) {
    __extends(Gatling, _super);
    function Gatling() {
        var _this = _super.call(this) || this;
        // 机枪状态 idle（闲置）、fire(开火)
        _this.status = 'idle';
        // 机枪最小伤害值
        _this.minDamage = 0;
        // 机枪最大伤害值
        _this.maxDamage = 0;
        // 机枪转动时间（开火）
        _this.turnTime = 0;
        // 机枪每次发射子弹时间（机枪不可能无间断发子弹，总得间隔一下）
        _this.fireTime = 0;
        // 当前每帧对应的角度数
        _this.currentAngleFrame = 0;
        // 当前角度数
        _this.currentAngle = 0;
        // 机枪等级
        _this.level = 0;
        // 机枪价格
        _this.cost = 0;
        // 机枪出售价钱
        _this.sellMoney = 0;
        // 机枪升级花费价钱
        _this.upgradeMoney = 0;
        // 机枪攻击半径（不同机枪等级伤害范围不同）
        _this.attackRadius = 0;
        // 理论机枪转速
        _this.turnSpeed = 0;
        // 实际机枪转速（说明：游戏快进会影响这个速度，故转速做了两个变量区分）
        _this.realTurnSpeed = 0;
        // 机枪可升级到的最大等级
        _this.maxLevel = 10;
        _this.tx = -1;
        _this.ty = -1;
        _this.create();
        return _this;
    }
    //
    Gatling.setLevel = function (target, level) {
        target.level = level;
        target.cost = Gatling.levels[level].cost;
        target.sellMoney = Gatling.levels[level].sellMoney;
        target.upgradeMoney = Gatling.levels[level].upgradeMoney;
        target.minDamage = Gatling.levels[level].minDamage;
        target.maxDamage = Gatling.levels[level].maxDamage;
        target.attackRadius = Gatling.levels[level].attackRadius;
        target.realTurnSpeed = target.turnSpeed = Gatling.levels[level].turnSpeed;
    };
    Gatling.getLevel = function (level) {
        if (typeof level === 'undefined') {
            level = Gatling.currentLevel;
        }
        if (level < 0 || level >= Gatling.levels.length) {
            return null;
        }
        return Gatling.levels[level];
    };
    // 判断是否能升级
    Gatling.prototype.canUpgrade = function () {
        return this.level < this.maxLevel;
    };
    // 升级
    Gatling.prototype.upgrade = function () {
        if (!this.canUpgrade()) {
            return;
        }
        this.level++;
        this.cost = this.cost + this.upgradeMoney;
        // 卖出的价钱，等于总价值的一半（取整，1.2 == 1, 1.6== 1）
        this.sellMoney = this.cost * 0.5 >> 0;
        this.upgradeMoney = this.upgradeMoney + 25;
        this.minDamage = this.minDamage + 10;
        this.maxDamage = this.maxDamage + 20 + this.level * this.level;
        if (this.attackRadius < 200) {
            this.attackRadius = this.attackRadius + 10;
        }
        this.turnSpeed += 2;
        this.realTurnSpeed += 2;
    };
    Gatling.prototype.create = function () {
        Gatling.setLevel(this, 0);
        this.gatling = this.createBitmapByName('gatling_d_png');
        this.gatling.width = 110;
        this.gatling.height = 130;
        this.addChild(this.gatling);
    };
    Gatling.prototype.getRealFrame = function (angleFrame, angle) {
        return angleFrame;
    };
    Gatling.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Gatling.IDLE = 'idle';
    Gatling.FIRE = 'fire';
    // 整体机枪的初始等级，当前全体默认0级
    Gatling.currentLevel = 0;
    // 每级别对应的属性，伤害、升级花费、价格、转速、攻击范围
    Gatling.levels = [{ cost: 50, sellMoney: 25, upgradeMoney: 45, minDamage: 10, maxDamage: 20, attackRadius: 135, turnSpeed: 300 },
        { cost: 90, sellMoney: 45, upgradeMoney: 65, minDamage: 20, maxDamage: 50, attackRadius: 160, turnSpeed: 300 },
        { cost: 150, sellMoney: 75, upgradeMoney: 95, minDamage: 50, maxDamage: 80, attackRadius: 200, turnSpeed: 300 }];
    return Gatling;
}(egret.DisplayObjectContainer));
__reflect(Gatling.prototype, "Gatling");
