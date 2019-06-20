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
        _this.solider();
        _this.start();
        return _this;
    }
    Runner.prototype.start = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrameHandler, this);
    };
    Runner.prototype.gameOver = function () { };
    Runner.prototype.onFrameHandler = function () {
    };
    Runner.prototype.solider = function () {
        var _this = this;
        var data = RES.getRes("solider_json");
        var txtr = RES.getRes("solider_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("action"));
        this.addChild(mc1);
        this.mc1 = mc1;
        this.mc1.gotoAndPlay("dealth", 1);
        this.mc1.addEventListener(egret.Event.COMPLETE, function (e) {
            _this.mc1.gotoAndPlay("dealth", 1);
        }, this);
    };
    return Runner;
}(egret.DisplayObjectContainer));
__reflect(Runner.prototype, "Runner");
