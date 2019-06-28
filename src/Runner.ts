/**
 * 游戏入口
 */
class Runner extends egret.DisplayObjectContainer {
    private player: Player;   
    private enemyFactory: EnemyFactory;
    private weaponTool: WeaponTool;
    private weaponFactory: WeaponFactory;
    
    private mc1;

    public constructor() {
        super();
       
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.start, this);
    }

    public start() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.start, this);
        // 实例一个玩家（当前只有一个）
        this.player = new Player(this);
        this.addChild(this.player); 

        // 武器帮助类
        this.weaponTool = new WeaponTool(this.player, this);
        // 武器制造类
        this.weaponFactory = new WeaponFactory(this.player, this, this.weaponTool);
        this.addChild(this.weaponFactory);


        this.enemyFactory = new EnemyFactory(this.player, this);
        this.addChild(this.enemyFactory);
        

        //this.enemyFactory.nextRound();
        
        // 监听帧率，让精灵们动起来
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrameHandler, this);
    }

    public gameOver() {}

    private onFrameHandler() {
        if (this.player.life == 0) {
            this.gameOver();
            return;
        }
        this.player.autoAttack();
    }


    private solider() {
        const data = RES.getRes("solider_animation_json");
        const txtr = RES.getRes("solider_animation_png");
        const mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        const mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "action" ) );
        this.addChild( mc1 );
        this.mc1 = mc1;
        //this.mc1.gotoAndPlay("dealth", -1);
        this.mc1.x = 200;
        this.mc1.y = 200;
        this.mc1.scaleX = 1;
        //this.mc1.rotation = -180;
        this.mc1.gotoAndPlay("solider_walk_right", -1);
        this.mc1.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
            //this.mc1.gotoAndPlay("dealth", 1);
        }, this);
    }


}