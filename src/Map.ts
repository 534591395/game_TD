/**
 * 地图类
 */

class Map extends egret.DisplayObjectContainer {
    public static tmxTileMap: tiled.TMXTilemap;
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addMap();
    }

    private addMap() {
        const mapUrl: string = "resource/assets/TD/bg.tmx";
        let mapUrlLoader: egret.URLLoader = new egret.URLLoader();
        mapUrlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        mapUrlLoader.load(new egret.URLRequest(mapUrl));

        mapUrlLoader.addEventListener(egret.Event.COMPLETE, (event:egret.Event) => {
            let data:any = egret.XML.parse(event.target.data);
            console.log(data)
            let tmxTileMap: tiled.TMXTilemap = new tiled.TMXTilemap(1200, 600, data, mapUrl);
            tmxTileMap.render();
            tmxTileMap.width = this.stage.stageWidth;
            tmxTileMap.height = this.stage.stageHeight;
            Map.tmxTileMap = tmxTileMap;
            this.addChild(tmxTileMap);
            console.log(tmxTileMap)
            this.spirit();
        }, this); 
    }

    private spirit() {
        let runner = new Runner();
        this.addChild(runner);
    }
}