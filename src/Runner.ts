/**
 * 游戏入口
 */
class Runner extends egret.DisplayObjectContainer {
    private player: Player;   
    
    private mc1;

    public constructor() {
        super();
       
        this.start();
        this.solider()
    }

    public start() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrameHandler, this);
    }

    public gameOver() {}

    private onFrameHandler() {
        
    }


    private solider() {
        const data = RES.getRes("solider_json");
        const txtr = RES.getRes("solider_png");
        const mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        const mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "action" ) );
        this.addChild( mc1 );
        this.mc1 = mc1;
        //this.mc1.gotoAndPlay("dealth", -1);
        this.mc1.x = 200;
        this.mc1.y = 200;
        this.mc1.scaleX = 1;
        //this.mc1.rotation = -180;
        this.mc1.gotoAndPlay("walkRight", -1);
        this.mc1.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
            //this.mc1.gotoAndPlay("dealth", 1);
        }, this);
    }


}