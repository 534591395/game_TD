/**
 * 游戏入口
 */
class Runner extends egret.DisplayObjectContainer {
    private player: Player;   
  

    public constructor() {
        super();
    }

    public start() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrameHandler, this);
    }

    public gameOver() {}

    private onFrameHandler() {

    }
}