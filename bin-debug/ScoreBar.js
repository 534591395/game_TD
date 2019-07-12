/**
 * 状态栏（分数）
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
var ScoreBar = (function (_super) {
    __extends(ScoreBar, _super);
    function ScoreBar(player, parent) {
        var _this = _super.call(this) || this;
        _this.player = player;
        _this.parent = parent;
        return _this;
    }
    return ScoreBar;
}(egret.DisplayObjectContainer));
__reflect(ScoreBar.prototype, "ScoreBar");
