/**
 * 游戏入口
 */
class Runner extends egret.DisplayObjectContainer {
    private player: Player;   
    
    private mc1;

    public constructor() {
        super();
        this.solider();
        this.start();
    }

    public start() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrameHandler, this);
    }

    public gameOver() {}

    private onFrameHandler() {
        
    }

    private solider() {
        const data = RES.getRes("solider_walkRight_json");
        const txtr = RES.getRes("solider_walkRight_png");
        const mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        const mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "walkRight" ) );
        this.addChild( mc1 );
        this.mc1 = mc1;
        this.mc1.gotoAndPlay(1);
        this.mc1.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
            this.mc1.gotoAndPlay(1);
        }, this);
    }
}