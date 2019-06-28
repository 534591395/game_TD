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
 * 游戏入口
 */
var Runner = (function (_super) {
    __extends(Runner, _super);
    function Runner() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.start, _this);
        return _this;
    }
    Runner.prototype.start = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.start, this);
        // 实例一个玩家（当前只有一个）
        this.player = new Player(this);
        this.addChild(this.player);
        this.enemyFactory = new EnemyFactory(this.player, this);
        this.addChild(this.enemyFactory);
        //this.enemyFactory.nextRound();
        // 监听帧率，让精灵们动起来
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrameHandler, this);
    };
    Runner.prototype.gameOver = function () { };
    Runner.prototype.onFrameHandler = function () {
        if (this.player.life == 0) {
            this.gameOver();
            return;
        }
        this.player.autoAttack();
    };
    Runner.prototype.solider = function () {
        var data = RES.getRes("solider_animation_json");
        var txtr = RES.getRes("solider_animation_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("action"));
        this.addChild(mc1);
        this.mc1 = mc1;
        //this.mc1.gotoAndPlay("dealth", -1);
        this.mc1.x = 200;
        this.mc1.y = 200;
        this.mc1.scaleX = 1;
        //this.mc1.rotation = -180;
        this.mc1.gotoAndPlay("solider_walk_right", -1);
        this.mc1.addEventListener(egret.Event.COMPLETE, function (e) {
            //this.mc1.gotoAndPlay("dealth", 1);
        }, this);
    };
    return Runner;
}(egret.DisplayObjectContainer));
__reflect(Runner.prototype, "Runner");
