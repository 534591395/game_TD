/**
 * 武器类
 */
class WeaponFactory extends egret.DisplayObjectContainer {
    private player:Player;

    // 当前可拖动的武器（创建），目前只有格林机枪一种
    private dragWeapon:Gatling;
    // 武器类工具
    private weaponTool:WeaponTool;
    // 触摸时的事件
    private event: egret.Event;
    
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

    private touchMoveHandler(event:egret.Event) {
        this.event = event;
        this.placeWeapon(this.dragWeapon);
    }

    private touchBeginHandler(event:egret.Event) {
        this.event = event;
        // TODO：需点击了创建的图标，才能创建武器
        this.createWeapon();
    }

    private touchEndHandler(event:egret.Event) {
        if (!this.dragWeapon) {
            return;
        }
        this.event = event;
        const yes = this.placeWeapon(this.dragWeapon);
        // 如果该位置可放置武器
        if (yes) {
            this.player.addWeapon(this.dragWeapon);
            this.player.money -= this.dragWeapon.cost;
            this.updateWeapon();

        } else {
            this.parent.removeChild(this.dragWeapon);
        }
        this.dragWeapon = null;
    }

    // 放置武器
    private placeWeapon(weapon:Gatling) {
        let bool = false;
        if (!weapon) {
            return bool;
        }
        
        //const point = this.getAvailablePositionNearby();
        return bool;
    }

    // 创建武器
    private createWeapon() {
        if (this.canCreate()) {
            const gatling = new Gatling();
            this.dragWeapon = gatling;
            this.placeWeapon(gatling);
            this.parent.addChild(gatling);
        }
    }

    // 获取附近可放置武器的位置
    private getAvailablePositionNearby(x, y) {
        let tx = Math.round( (x-this.player.startPoint[0]) / this.player.tileWidth );
        let ty = Math.round( (y-this.player.startPoint[1]) / this.player.tileHeight );
        x = this.player.startPoint[0] + tx * this.player.tileWidth;
        y = this.player.startPoint[1] + ty * this.player.tileHeight;
        return {x: x, y: y, tx: tx, ty: ty};
    }

    // 判断上是否能够创建武器，通过钱来判断
    private canCreate() {
        return this.player.money >= Gatling.getLevel(0).cost;
    }


    // 可创建时武器动画效果
    public updateWeapon() {
        if (this.canCreate()) {
            
        }
    }
}