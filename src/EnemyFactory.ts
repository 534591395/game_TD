/**
 * 敌人类
 */

class EnemyFactory extends egret.DisplayObjectContainer{
    private player:Player;
    // 士兵默认坐标
    private soldierStartX: number = 0;
    private soldierStartY: number = 315;
    // 开始标志
    private started: boolean = false;
    // 当前轮次
    private round: number = 0;
    // 轮次计算
    private roundCount: number = 0;
    // 总轮次
    private roundTotal: number = 20;
    // 下一轮次间隔时间(5秒)
    private roundTime: number = 5;
    // 倒计时
    private countDown: number = this.roundTime + 1;
    // 士兵奔跑频率

    public constructor() {
        super();
    }
    
    
}