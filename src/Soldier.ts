/**
 * 士兵类
 */

class Soldier extends egret.DisplayObjectContainer{
    // 当前轮次的士兵等级，默认0级。说明：有可能战场上有多个不同等级的士兵
    public static currentLevel: number = 0; 
    // 士兵每级对应的属性，对应的index表示士兵等级对应的属性，默认 index=0（表示士兵等级0级对应的属性）
    public static levels = [{maxHealth:100, score:10, money:3, speed:5}];

    // 该士兵的进攻路线
    public path = null;    
    // 当前该士兵对象的等级，默认0级。
    public level: number = 0;
    // 士兵移动速度
    public speed: number = 0;
    // 打死该士兵玩家得到的分数
    public score: number = 0;
    // 士兵价值（金币值）
    public money: number = 0;
    // 士兵所在地图坐标（格子坐标）
    public tx: number = -1;
    public ty: number = 3;
    // 方位（上下左右）说明：direction[0] 表示左右方向-- 1 表示往右边走，-1 表示往左边走; 
    // direction[1] 表示往上下方向-- 1 表示往下走， -1 表示往上走；  0 表示不往对应方向走
    public direction: [number, number] = [1,0];
    // avatar 角色 它可以代表角色的位置、方向、运动状态和姿势
    public avatar: egret.MovieClip;

    
    // 当前士兵的最大生命值
    private maxHealth:number = 0;
    // 当前士兵的生命值
    private health:number = 0;
    // 当前士兵的生命条
    private healthBar: egret.MovieClip;
    private healthBarBg: egret.MovieClip;
    

    public constructor() {
        super();

        this.create();
    }
    
    // 每两轮升级一次士兵等级，对应士兵属性也升级，查看 EnemyFactory类（currentLevel）
    public static setLevel(target:Soldier, level:number) {
        if (typeof target === 'undefined' && typeof level === 'undefined' ) {
            return;
        }
        // 要新增的等级大于当前等级，添加该级别对应的士兵属性到属性列表中（说明：levels 默认长度为1, level从0开始--currentLevel）
        if (level >= Soldier.levels.length) {
            // 当前级别对应的属性
            let nowLevel = Soldier.levels[level-1];
            // 新增新的级别属性，每升一级属性值相对当前级别都升一级
            // 关于下面位移取整说明：位移运算只用于整数，如果带小数的数据参与位移运算会被取整 移动0位其实并没有移动，相当于 Math.floor(1.5) || parseInt(1.5,10)
            Soldier.levels[level].maxHealth = (nowLevel.maxHealth * 1.50) >>0;
            Soldier.levels[level].score = (nowLevel.score * 1.10) >> 0;
            // level>>1 说明：每升两个级别，money属性较之前两轮的增值幅度加1 ===  0,1 >> 1 =0; 1,2>> 1 =1, 2,3>>2;
            Soldier.levels[level].money = nowLevel.money+(level>>1);
            Soldier.levels[level].speed = nowLevel.speed;
        }
        // 给当前传入的士兵设置新属性
        const now = Soldier.levels[level];
        target.level = level;
        target.maxHealth = now.maxHealth;
        target.health = target.maxHealth;
        target.score = now.score;
        target.money = now.money;
        target.speed = now.speed;
    }

    // 获取对应等级的士兵属性
    public static getLevel(level: number) {
        if (typeof level === 'undefined') {
            level = Soldier.currentLevel;
        }
        if (level < 0 || level >= Soldier.levels.length) {
            return null;
        }
        return Soldier.levels[level];
    }

    // 全体新增士兵等级升级
    public static upgrade() {
        Soldier.currentLevel++;
        return Soldier.currentLevel;
    }

    // 设置士兵走动方向动画
    public setDirection(direction:[number, number]) {
        if (this.direction[0] == direction[1] && this.direction[1] == direction[1]) {
            return;
        }
        this.direction = direction;

        // 往右边走 walk right  
        if (direction[0] == 1) {
            this.avatar.scaleX = 1;
            this.avatar.gotoAndPlay("walkRight", -1);
        } else
        // 往左走 walk left TODO
        if (direction[0] == -1) {
            this.avatar.scaleX = -1;
            this.avatar.gotoAndPlay("walkRight", -1);
        } else
        // 往下走 walk down
        if (direction[1] == 1) {
            this.avatar.gotoAndPlay("walkDown", -1);
        } else 
        if (direction[1] == -1) {
            this.avatar.gotoAndPlay("walkTop", -1);
        }
    }

    // 士兵中弹
    public getShot(damage:number) {
        // 中弹后扣掉生命值
        this.health -= damage;
        // 当扣除生命值小于0时，生命值重新设置为0.（伤害大小不一定）
        if (this.health < 0) {
            this.health = 0;
        }
        const percent = this.health / this.maxHealth;
        // 更新生命血条,四舍五入，血条长度为40
        let healthWidth = Math.round(40 * percent);
        if (this.healthBar) {
            this.healthBar.width = healthWidth;
        }
    }
    
    // 判断士兵是否死亡
    public isDead() {
        return this.health == 0;
    }

    // 士兵死亡后的动画播放是否结束（结束了就销毁）
    public isDeadFinished() {
        // TODO
    }
    
    // TODO
    public render() {}

    // 创建一个士兵相关属性
    private create() {
        // 设置该士兵属性，以及更新全体新增士兵的等级
        Soldier.setLevel(this, Soldier.currentLevel);
        // 设置士兵角色动画
        const data = RES.getRes("solider_json");
        const txtr = RES.getRes("solider_png");
        const mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        this.avatar = new egret.MovieClip( mcFactory.generateMovieClipData( "action" ) );
        this.addChild( this.avatar );

        // TODO 士兵血条
    }
    
    // 士兵死亡动画
    private animateDeath() {
        this.removeChild(this.healthBar);
        this.removeChild(this.healthBarBg);
        this.healthBar = null;
        this.healthBarBg = null;

        // TODO
    }

    // 
    
    

}