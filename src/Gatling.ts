/**
 * 格林机枪类（武器的一种）
 */

class Gatling extends egret.DisplayObjectContainer {
    // 机枪状态 idle（闲置）、fire(开火)
    private status = 'idle';
    // 机枪最小伤害值
    private minDamage = 0;
    // 机枪最大伤害值
    private maxDamage = 0;
    // 机枪转动时间（开火）
    private turnTime = 0;
    // 机枪每次发射子弹时间（机枪不可能无间断发子弹，总得间隔一下）
    private fireTime = 0
    // 当前每帧对应的角度数
    private currentAngleFrame = 0;
    // 当前角度数
    private currentAngle = 0;
    private gatling: egret.Bitmap;

    // 机枪等级
    public level = 0;
    // 机枪价格
    public cost = 0;
    // 机枪出售价钱
    public sellMoney = 0;
    // 机枪升级花费价钱
    public upgradeMoney = 0;
    // 机枪攻击半径（不同机枪等级伤害范围不同）
    public attackRadius = 0;
    // 理论机枪转速
    public turnSpeed = 0;
    // 实际机枪转速（说明：游戏快进会影响这个速度，故转速做了两个变量区分）
    public realTurnSpeed = 0;
    
    // 机枪可升级到的最大等级
    public maxLevel = 10;
    
    public tx = -1;
    public ty = -1;

    public static IDLE = 'idle';
    public static FIRE = 'fire';
    // 整体机枪的初始等级，当前全体默认0级
    public static currentLevel = 0;
    // 每级别对应的属性，伤害、升级花费、价格、转速、攻击范围
    public static levels = [{cost:50, sellMoney:25, upgradeMoney:45, minDamage:10, maxDamage:20, attackRadius:135, turnSpeed:300},
				  {cost:90, sellMoney:45, upgradeMoney:65, minDamage:20, maxDamage:50, attackRadius:160, turnSpeed:300},
				  {cost:150, sellMoney:75, upgradeMoney:95, minDamage:50, maxDamage:80, attackRadius:200, turnSpeed:300}];


    public constructor() {
        super();

        this.create();
    }

    //
    public static setLevel(target:Gatling, level:number) {
        target.level = level;
        target.cost = Gatling.levels[level].cost;
        target.sellMoney = Gatling.levels[level].sellMoney;
        target.upgradeMoney = Gatling.levels[level].upgradeMoney;
        target.minDamage = Gatling.levels[level].minDamage;
        target.maxDamage = Gatling.levels[level].maxDamage;
        target.attackRadius = Gatling.levels[level].attackRadius;
        target.realTurnSpeed = target.turnSpeed = Gatling.levels[level].turnSpeed;
    }

    public static getLevel(level:number) {
        if (typeof level === 'undefined') {
            level = Gatling.currentLevel;
        }
        if (level < 0 || level >= Gatling.levels.length) {
            return null;
        }
        return Gatling.levels[level];
    }               
    
    // 判断是否能升级
    public canUpgrade() {
        return this.level < this.maxLevel;
    }

    // 升级
    public upgrade() {
        if (!this.canUpgrade()) {
            return;
        }
        this.level++;
        this.cost = this.cost + this.upgradeMoney;
        // 卖出的价钱，等于总价值的一半（取整，1.2 == 1, 1.6== 1）
        this.sellMoney = this.cost * 0.5 >> 0;
        this.upgradeMoney = this.upgradeMoney + 25;
        this.minDamage = this.minDamage + 10;
        this.maxDamage = this.maxDamage + 20 + this.level * this.level;
        if (this.attackRadius < 200) {
            this.attackRadius = this.attackRadius + 10;
        }
        this.turnSpeed += 2;
        this.realTurnSpeed +=2;
    }

    private create() {
        Gatling.setLevel(this, 0);
        this.gatling = this.createBitmapByName('gatling_d_png');
        this.addChild(this.gatling);
    }

    private getRealFrame(angleFrame, angle) {
        return angleFrame;
    }

    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }  
}