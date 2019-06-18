/**
 * 玩家类
 * 地图解析说明：当前手动处理（暂未使用第三方解析库）
 */
class Player extends egret.DisplayObjectContainer {
   // 地图属性
   private startPoint:[number] = [105, 140];
   private tileWidth = 60;
   private tileHeight = 60;
   // 格子个数
   private mapWidth = 18;
   private mapHeight = 7;

   // 玩家属性
   // 金币
   private money:number = 0;
   // 生命值
   private life:number = 0;
   // 分数
   private score:number = 0;
   // 武器
   private weapons = [];

   // 敌人
   private targets = [];
   // 路径集合（敌人可走）
   private path:any;

   // 当前玩家进行的游戏轮次
   public round: number = 1;

   public constructor() {
        super();
        this.reset();
   }

   // 重置玩家属性
   private reset() {
	 this.money = 100;
	 this.life = 20;
	 this.score = 0;
	 this.round = 1;
	 this.weapons = [];
	 this.targets = [];	
	 this.path = this.buildPath();
   }
   
   private buildPath(tx?, ty?, start?, end?) {
       // map 地图格子集合
       let map = [];
       let s = start;
       if(!s || s[0] < 0) {
           s = [0, 3];
       }
       if (!end) {
           end = [17, 3];
       }
       // 遍历地图
       for(let i = 0; i < this.mapHeight; i++) {
           map[i] = [];
           for (let j = 0; j < this.mapWidth; j++) {
               // 说明：遍历地图，若发现该格子上有武器，那么设置为 1，否则设置为0 。即 1表示该格子（敌人）不能走
               map[i][j] = this.getWeaponAt(j, i) ? 1: 0;
           }
       }
       // 若外面传入指定区域，该区域值设置为 1
       if (tx || ty) {
           map[tx][ty]= 1;
       }
       // 寻路算法，返回最优的path集合
       let pathArr = Astar.findPath(map, s, end) || [];
       if (pathArr.length) {
           // 末尾添加结束点坐标
           pathArr.push([18,3],[19,3]);
           // 开始坐标
           if (start && start[0] < 0) {
               pathArr.unshift(start);
           }
           return pathArr;
       }

       return null;
   }

   private buidAllPaths() {
       // 默认创建一条path（给敌人使用）
       this.path = this.buildPath();
       // 循环敌人实例，更新敌人的path
       for(let i = 0; i < this.targets.length; i++) {
           let target = this.targets[i];
           // 敌人已不再地图上的，无需更新path
           if (target.tx >= this.mapWidth || target.ty >= this.mapHeight) {
               continue;
           }
           target.path = this.buildPath(null, null, [target.tx, target.ty]);
       }
   }
   
   // 根据地图坐标（地图格子）里查找武器，若这个格子里没有返回null
   private getWeaponAt(tx, ty) {
       let weapon = null;
       this.weapons.map(w => {
           if (w.tx == tx && w.ty == ty) {
               weapon = w;
           }
       });
       return weapon;
   }

   private getTile(target) {}

   // 移动敌人
   private moveTarget(target) {
       if (target.x < this.startPoint[0]) {
           let x = target.x + target.speed;
           if (x < this.startPoint[0]) {
               target.x = x;
           } else {
               target.x = this.startPoint[0];
               target.tx = 0;
               target.ty = 3;
           }
       } else {
           let tile = this.getTile(target);
           if (target.direction[0] != 0) {

           }
       }
   }

   // 添加武器，每次添加一个武器后，需重新计算path（障碍物变更）
   public addWeapon(weapon) {
       if (!weapon) {
           return false;
       }
       this.weapons.push(weapon);
       this.buidAllPaths();
   }

   // 移除武器
   public removeWeapon(weapon) {
       const index = this.weapons.indexOf(weapon);
       if (index > -1) {
           this.weapons.splice(index, 1);
           this.buidAllPaths();
       }
   }

   // 自动攻击
   public autoAttack() {

   }

   // 添加敌人
   public addTarget(target:Soldier) {
       if (!target) {
           return;
       }
       target.path = this.path;
       this.targets.push(target);
   }
}