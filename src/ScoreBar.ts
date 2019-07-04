/**
 * 状态栏（分数）
 */

class ScoreBar extends egret.DisplayObjectContainer {
    private player:Player;
    
    public score:Number;
    public parent:egret.DisplayObjectContainer;

    constructor(player:Player, parent:egret.DisplayObjectContainer) {
        super();

        this.player = player;
        this.parent = parent;
    }
}