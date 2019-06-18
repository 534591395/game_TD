/**
 * 敌人类
 */

class EnemyFactory extends egret.DisplayObjectContainer{
    private player:Player;
    // 士兵默认坐标（初始生成坐标）
    private soldierStartX: number = 0;
    private soldierStartY: number = 315;
    // 一轮生成士兵的个数（每轮累加，下一轮清零）
    private roundCount: number = 0;
    // 一轮生成士兵的总个数
    private roundTotal: number = 20;
    // 下一轮次间隔时间(5秒)
    private roundTime: number = 5;
    // 倒计时频率（默认1s）
    private time:number = 1000;
    // 倒计时计时器
    private countDownTimer:egret.Timer;
    // 创建士兵的计时器
    private createTimer: egret.Timer;
    // 创建士兵频率
    private createTime: number = 1.5;
    
    // 当前轮次开始标志
    public started: boolean = false;
    // 当前轮次（每轮开始累加）
    public round: number = 0;
    // 所有轮次生成的士兵总个数
    public count: number = 0;

    public constructor(player:Player) {
        super();
        this.player = player;
    }
    
    // 重置
    public resume() {
        // 当前轮次生成的士兵个数（一轮刚开始时），游戏开始倒计时开始
        if (this.roundCount == 0) {
            if (!this.countDownTimer) {
                this.countDownTimer = new egret.Timer(this.time, this.roundTime);
                // 注册事件侦听器
                this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.countDownFn,this);
                this.countDownTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.countDownComFn,this);
            }
            this.countDownTimer.start();
        } 
        // 否则的话，继续生成士兵
        else {
            this.run();
        }
    }

    // 运行游戏
    public run() {
        if (!this.createTimer) {
            let time = this.time * this.createTime;
            // 倒计时：time-- 间隔时间； time * this.roundTotal -- 总计时（(创建一个士兵花费的时间time)*总兵数）
            this.createTimer = new egret.Timer(time, time * this.roundTotal);
            // 注册事件侦听器
            this.createTimer.addEventListener(egret.TimerEvent.TIMER, this.createFn,this);
            this.createTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.createComFn,this);
        }
        this.createTimer.start();
    }
    
    // 暂停游戏
    public stop() {
        this.createTimer.stop();
        this.countDownTimer.stop();
    }

    // 下一轮
    public nextRound() {
        this.started = true;
        // 累加游戏轮次
        this.round++;
        this.player.round = this.round;
        // 重新统计当前轮次生成的士兵个数
        this.roundCount = 0;

        // 每两轮升级一次士兵等级
        Soldier.currentLevel = Math.floor(this.round / 2);

        // 开始游戏倒计时
        this.countDownTimer.start();
    }

    // 游戏开始的倒计时进行时回调 
    private countDownFn() {}

    // 游戏开始的倒计时结束回调
    private countDownComFn() {
        this.countDownTimer.reset();
        this.create();
        this.run();
    }

    // 创建士兵结束（一轮）
    private createComFn() {
        this.createTimer.reset();
        this.create();
    }
    
    // 创建士兵过程（一轮）
    private createFn() {}

    // 创建士兵
    private create() {
        // 若当前轮次生成的士兵个数大于等于当前轮次士兵总个数，停止当前轮次(0-19)
        if (this.roundCount >= this.roundTotal) {
            this.started = false;
            this.stop();
            return;
        }
        
        let soldier = new Soldier();
        soldier.x = this.soldierStartX;
        soldier.y = this.soldierStartY;
        // 将敌人加入玩家视野
        this.player.addTarget(soldier);
        // 加入场景
        this.addChild(soldier);
        
        // 计数
        this.count++;
        this.roundCount++;
    }
}