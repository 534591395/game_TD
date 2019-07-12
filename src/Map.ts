/**
 * 地图类
 */

class Map extends egret.DisplayObjectContainer {
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
            //let tmxTileMap: tiled.TMXTilemap = new tiled.TMXTilemap(1200, 600, data, mapUrl);
            //tmxTileMap.render();

        }, this); 
    }
}