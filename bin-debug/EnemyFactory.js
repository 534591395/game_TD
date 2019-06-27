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
    function EnemyFactory(player) {
        var _this = _super.call(this) || this;
        // 士兵默认坐标（初始生成坐标）
        _this.soldierStartX = 0;
        _this.soldierStartY = 315;
        // 一轮生成士兵的个数（每轮累加，下一轮清零）
        _this.roundCount = 0;
        // 一轮生成士兵的总个数
        _this.roundTotal = 20;
        // 下一轮次间隔时间(5秒)
        _this.roundTime = 5;
        // 倒计时频率（默认1s）
        _this.time = 1000;
        // 创建士兵频率
        _this.createTime = 1.5;
        // 当前轮次开始标志
        _this.started = false;
        // 当前轮次（每轮开始累加）
        _this.round = 0;
        // 所有轮次生成的士兵总个数
        _this.count = 0;
        _this.player = player;
        _this.resume();
        return _this;
    }
    // 游戏重置
    EnemyFactory.prototype.resume = function () {
        // 当前轮次生成的士兵个数（一轮刚开始时），游戏开始倒计时开始
        if (this.roundCount == 0) {
            if (!this.countDownTimer) {
                this.countDownTimer = new egret.Timer(this.time, this.roundTime);
                // 注册事件侦听器
                this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.countDownFn, this);
                this.countDownTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.countDownComFn, this);
            }
            this.countDownTimer.start();
        }
        else {
            this.run();
        }
    };
    // 运行游戏
    EnemyFactory.prototype.run = function () {
        if (!this.createTimer) {
            // 每隔一段时间创建一个士兵
            var time = this.time * this.createTime;
            // 倒计时：time-- 间隔时间； time * this.roundTotal -- 总计时（(创建一个士兵花费的时间time)*总兵数）
            this.createTimer = new egret.Timer(time, time * this.roundTotal);
            // 注册事件侦听器
            this.createTimer.addEventListener(egret.TimerEvent.TIMER, this.createFn, this);
            this.createTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.createComFn, this);
        }
        this.createTimer.start();
    };
    // 暂停游戏
    EnemyFactory.prototype.stop = function () {
        this.createTimer.stop();
        this.countDownTimer.stop();
    };
    // 下一轮
    EnemyFactory.prototype.nextRound = function () {
        this.started = true;
        // 累加游戏轮次
        this.round++;
        this.player.round = this.round;
        // 重新统计当前轮次生成的士兵个数
        this.roundCount = 0;
        // 每两轮升级一次士兵等级
        Soldier.currentLevel = Math.floor(this.round / 2);
        // 开始游戏倒计时
        this.countDownTimer.start();
    };
    // 游戏开始的倒计时进行时回调 
    EnemyFactory.prototype.countDownFn = function () { };
    // 游戏开始的倒计时结束回调
    EnemyFactory.prototype.countDownComFn = function () {
        this.countDownTimer.reset();
        this.create();
        this.run();
    };
    // 创建士兵结束（一轮）
    EnemyFactory.prototype.createComFn = function () {
        this.createTimer.reset();
    };
    // 创建士兵过程（一轮）
    EnemyFactory.prototype.createFn = function () {
        this.create();
    };
    // 创建士兵
    EnemyFactory.prototype.create = function () {
        // 若当前轮次生成的士兵个数大于等于当前轮次士兵总个数，停止当前轮次(0-19)
        if (this.roundCount >= this.roundTotal) {
            this.started = false;
            this.stop();
            return;
        }
        var soldier = new Soldier();
        soldier.x = this.soldierStartX;
        soldier.y = this.soldierStartY;
        // 将敌人加入玩家视野
        this.player.addTarget(soldier);
        // 加入场景
        this.addChild(soldier);
        // 计数
        this.count++;
        this.roundCount++;
    };
    return EnemyFactory;
}(egret.DisplayObjectContainer));
__reflect(EnemyFactory.prototype, "EnemyFactory");
