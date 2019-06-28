/**
 * 武器类
 */
class WeaponFactory extends egret.DisplayObjectContainer {
    private player:Player;

    // 当前可拖动的武器（创建），目前只有格林机枪一种
    private dragWeapon:Gatling;
    // 武器类工具
    private weaponTool:WeaponTool;
    
    public parent:egret.DisplayObjectContainer;


    constructor(player:Player, parent:egret.DisplayObjectContainer, weaponTool: WeaponTool) {
        super();

        this.player = player;
        this.parent = parent;
        this.weaponTool = weaponTool;
        
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


    // 可创建时武器动画效果
    public updateWeapon() {
        if (this.canCreate()) {
            
        }
    }
}