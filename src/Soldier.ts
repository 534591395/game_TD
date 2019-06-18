/**
 * 士兵类
 */

class Soldier extends egret.DisplayObjectContainer{
    // 当前轮次的士兵等级，默认0级。说明：有可能战场上有多个不同等级的士兵
    public static currentLevel: number = 0; 
    // 士兵每级对应的属性
    public static levels = [{maxHealth:100, score:10, money:3, speed:5}];

    // 该士兵的进攻路线
    public path = null;
    
    // 当前该士兵对象的等级，默认0级。
    public level: number = 0;

    public constructor() {
        super();
    }
    
    // 每两轮升级一次士兵等级，对应士兵属性也升级，查看 EnemyFactory类（currentLevel）
    public static setLevel(target:Soldier, level:number) {
        
    }
}