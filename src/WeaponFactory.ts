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
    private event: egret.TouchEvent;
    // 武器的图标（右下角的小图标）
    //private gatingIcon: egret.MovieClip;
    private gatingDisabledIcon: egret.Bitmap;
    private gatingdIcon: egret.Bitmap;
    // 鼠标点击时，鼠标全局坐标与_bird的位置差    http://developer.egret.com/cn/example/egret2d/index.html#060-interact-drag-drop
    private distance:egret.Point = new egret.Point();
    
    public parent:egret.DisplayObjectContainer;
    


    constructor(player:Player, parent:egret.DisplayObjectContainer, weaponTool: WeaponTool) {
        super();

        this.player = player;
        this.parent = parent;
        this.weaponTool = weaponTool;
        
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        // TODO : 武器的图标（右下角的小图标）
        this.gatingdIcon = this.createBitmapByName("gatingdIcon_png");
        this.gatingdIcon.width = 60;
        this.gatingdIcon.height = 60;
        
        let toolMap:any = Map.tmxTileMap.getChildByName('tool');
        let childrens = toolMap._childrens || [];
        childrens.map(child => {
            if (child.$name == 'gatingdIcon') {
                this.gatingdIcon.x = child.$x;
                this.gatingdIcon.y = child.$y;
                this.gatingdIcon.width = child.$width;
                this.gatingdIcon.height = child.$height;
            }
        });

        this.parent.addChild(this.gatingdIcon);

        //this.touchEnabled = true;
        // 移动
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        // 开始（按下 -down）
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        // 结束（离开 -up）
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    }

    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }    

    private touchMoveHandler(event:egret.TouchEvent) {
        this.event = event;
        this.placeWeapon(this.dragWeapon);
    }

    private touchBeginHandler(event:egret.TouchEvent) {
        this.event = event;
        // 需点击了创建的图标，才能创建武器（TODO: 图标是否可点击未判断）
        if (this.gatingdIcon.hitTestPoint(event.stageX, event.stageY)) {
            this.createWeapon();
            if (this.dragWeapon) {
                this.distance.x = event.stageX - this.dragWeapon.x;
                this.distance.y = event.stageY - this.dragWeapon.y;
            }
        }
    }

    private touchEndHandler(event:egret.TouchEvent) {
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
            this.weaponTool.removeRadius();
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

        // 附近可放置武器的位置 
        const point = this.getAvailablePositionNearby(this.event.stageX -this.distance.x, this.event.stageY -this.distance.y);
        if (point) {
            this.dragWeapon.x = point.x;
            this.dragWeapon.y = point.y;
            this.dragWeapon.tx = point.tx;
            this.dragWeapon.ty = point.ty;

            let radiusCircle:egret.Shape;
            // 该区域放置武器（判断），说明：瓦片地图格子 maxTx = 18, maxTy = 7;
            if (
                (point.tx==0 && point.ty==3) ||
                point.tx < 0 ||
                point.tx > 17 ||
                point.ty < 0 ||
                point.ty >= 7 ||
                this.player.getWeaponAt(point.tx, point.ty) ||
                !this.player.buildPath(point.tx, point.ty)
            ) {
                radiusCircle = this.weaponTool.drawRadius(this.dragWeapon, false);
                radiusCircle.x = this.dragWeapon.attackRadius/2 - 15;
                radiusCircle.y = this.dragWeapon.attackRadius/2 - 15;
                this.dragWeapon.addChild(radiusCircle);
                this.dragWeapon.alpha = 0.5;
                // 不可放置
                bool = false;
            } else {
                radiusCircle = this.weaponTool.drawRadius(this.dragWeapon, true);
                radiusCircle.x = this.dragWeapon.attackRadius/2 - 15;
                radiusCircle.y = this.dragWeapon.attackRadius/2 - 15;	
                console.log(this.dragWeapon.width, this.dragWeapon.height);		
                this.dragWeapon.addChild(radiusCircle);
                this.dragWeapon.alpha = 1.0;
                // 可放置
                bool = true;
            }
        }
        return bool;
    }

    // 创建武器
    private createWeapon() {
        if (this.canCreate()) {
            const gatling = new Gatling();
            this.dragWeapon = gatling;
            this.dragWeapon.x = this.x;
            this.dragWeapon.y = this.y;
            this.placeWeapon(gatling);
            this.parent.addChild(gatling);
        }
    }

    // 获取附近可放置武器的位置
    private getAvailablePositionNearby(x:number, y:number) {
        let tx = Math.round( (x-this.player.startPoint[0]) / this.player.tileWidth );
        let ty = Math.round( (y-this.player.startPoint[1]) / this.player.tileHeight );
        x = this.player.startPoint[0] + tx * this.player.tileWidth;
        y = this.player.startPoint[1] + ty * this.player.tileHeight;
        return {x: x, y: y, tx: tx, ty: ty};
    }

    // 判断上是否能够创建武器，通过钱来判断
    private canCreate() {
        return true;
       // return this.player.money >= Gatling.getLevel(0).cost;
    }


    // 可创建时武器动画效果
    public updateWeapon() {
        if (this.canCreate()) {
            
        }
    }
}