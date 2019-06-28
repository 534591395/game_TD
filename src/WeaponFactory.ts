/**
 * 武器类
 */
class WeaponFactory extends egret.DisplayObjectContainer {
    private player:Player;

    // 当前可拖动的武器（创建），目前只有格林机枪一种
    private dragWeapon:Gatling;
    
    public parent:egret.DisplayObjectContainer;


    constructor(player:Player, parent:egret.DisplayObjectContainer) {
        super();

        this.player = player;
        this.parent = parent;
        
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        //this.touchEnabled = true;
        // 移动
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        // 开始（按下 -down）
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        // 结束（离开 -up）
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    }

    private touchMoveHandler() {}

    private touchBeginHandler() {
        this.placeWeapon();
    }

    private touchEndHandler() {}

    // 放置武器
    private placeWeapon() {}

    // 创建武器
    private createWeapon() {
        
    }

    // 获取附近可放置武器的位置
    private getAvailablePositionNearby(x, y) {

    }

    // 判断上是否能够创建武器，通过钱来判断
    private canCreate() {

    }
}