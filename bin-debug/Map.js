/**
 * 地图类
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
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Map.getMapObj = function (parentName, targetName) {
        var toolMap = Map.tmxTileMap.getChildByName(parentName);
        var childrens = toolMap._childrens || [];
        var targetObj;
        childrens.map(function (child) {
            if (child.$name == targetName) {
                targetObj = child;
            }
        });
        return targetObj;
    };
    Map.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addMap();
    };
    Map.prototype.addMap = function () {
        var _this = this;
        var mapUrl = "resource/assets/TD/bg.tmx";
        var mapUrlLoader = new egret.URLLoader();
        mapUrlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        mapUrlLoader.load(new egret.URLRequest(mapUrl));
        mapUrlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
            var data = egret.XML.parse(event.target.data);
            console.log(data);
            var tmxTileMap = new tiled.TMXTilemap(1200, 600, data, mapUrl);
            tmxTileMap.render();
            tmxTileMap.width = _this.stage.stageWidth;
            tmxTileMap.height = _this.stage.stageHeight;
            Map.tmxTileMap = tmxTileMap;
            _this.addChild(tmxTileMap);
            console.log(tmxTileMap);
            _this.spirit();
        }, this);
    };
    Map.prototype.spirit = function () {
        var runner = new Runner();
        this.addChild(runner);
    };
    return Map;
}(egret.DisplayObjectContainer));
__reflect(Map.prototype, "Map");
