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
    


    constructor() {
        super();
    }
}