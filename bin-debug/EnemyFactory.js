/**
 * 敌人类
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
var EnemyFactory = (function (_super) {
    __extends(EnemyFactory, _super);
    // 士兵奔跑频率
    function EnemyFactory() {
        var _this = _super.call(this) || this;
        // 士兵默认坐标
        _this.soldierStartX = 0;
        _this.soldierStartY = 315;
        // 开始标志
        _this.started = false;
        // 当前轮次
        _this.round = 0;
        // 轮次计算
        _this.roundCount = 0;
        // 总轮次
        _this.roundTotal = 20;
        // 下一轮次间隔时间(5秒)
        _this.roundTime = 5;
        // 倒计时
        _this.countDown = _this.roundTime + 1;
        return _this;
    }
    return EnemyFactory;
}(egret.DisplayObjectContainer));
__reflect(EnemyFactory.prototype, "EnemyFactory");
