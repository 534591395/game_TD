/**
 * 玩家类
 * 地图解析说明：当前手动处理（暂未使用第三方解析库）
 */
class Player extends egret.DisplayObjectContainer {
   // 地图属性
   public startPoint:[number] = [1, 140];
   public tileWidth = 60;
   public tileHeight = 60;
   // 格子个数
   private mapWidth = 18;
   private mapHeight = 7;

   // 玩家属性
   // 分数
   private score:number = 0;
   // 武器
   private weapons = [];

   // 敌人
   private targets = [];
   // 路径集合（敌人可走）
   private path:any;
   
   // 金币
   public money:number = 0;

   // 生命值
   public life:number = 0;
   // 当前玩家进行的游戏轮次
   public round: number = 1;
   public parent:egret.DisplayObjectContainer;

   public constructor(parent) {
        super();
        this.reset();
        this.parent = parent;
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
   
   // 通过目标坐标，获取当前所在的瓦片地图格子坐标
   private getTile(target) {
       // 四舍五入
      const tx = Math.round( (target.x - this.startPoint[0]) / this.tileWidth );
      const ty = Math.round( (target.y - this.startPoint[1]) / this.tileHeight ); 
      return [tx, ty];
   }
   
   // 设置目标下一步的移动方向 ?
   private getNextDirection(target:Soldier) {
       let nextArr = [];
       target.path.map((path, i) => {
           if (path[0] == target.tx && path[1] == target.ty) {
               let next = target.path[i+1];
               nextArr = [next[0]-target.tx, next[1]-target.ty];
           }
       });
       return nextArr.length ? nextArr : null;
   }

   // 移动敌人
   private moveTarget(target:Soldier) {
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
           // direction[0] !=0 表示目标在x轴方向移动（具体查看Soldier类注释）
           if (target.direction[0] != 0) {
               let dx = target.x - ( this.startPoint[0] + tile[0] *  this.tileWidth );
               // 如果当前瓦片格子走完了，走下一个瓦片格子
               if (dx == 0) {
                   target.setDirection(this.getNextDirection(target));
                   target.tx += target.direction[0];
                   target.ty += target.direction[1];
               }
               this.moveByDirection(target);
           } else
           if (target.direction[1] != 0) {
               let dy = target.x - ( this.startPoint[1] + tile[1] *  this.tileHeight );
               // 如果当前瓦片格子走完了，走下一个瓦片格子  ?
               if (dy == -5) {
                   target.setDirection(this.getNextDirection(target));
                   target.tx += target.direction[0];
                   target.ty += target.direction[1];
               }
               this.moveByDirection(target);
           }
       }
   }
   
   // 根据移动方位设置目标坐标 ?
   private moveByDirection(target:Soldier) {
       if (!target.direction) {
           return;
       }
       if (target.direction[0] != 0) {
           target.x += target.speed * target.direction[0];
       } else
       if (target.direction[1] != 0) {
           target.y += target.speed * target.direction[1];
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
       let soldiers = [];
       this.targets.map((soldier:Soldier, i) => {
           // 死亡动画结束了后，清除士兵尸体
           if (soldier.isDeadFinished()) {
               this.parent.removeChild(soldier);
           } else
           // 士兵死亡后，玩家获取金币和分数
           if (soldier.isDead()) {
                this.money += soldier.money;
                this.score += soldier.score;
                // 此时该士兵金币变为空
                soldier.money = 0;
                soldiers.push(soldier);
           } else 
           // 若士兵逃脱了（移动超出屏幕了），玩家扣生命值
           if (soldier.x >= this.stage.stageWidth + soldier.width) {
                this.life --;
                this.parent.removeChild(soldier);
           } else {
               // 士兵移动
               this.moveTarget(soldier);
               soldiers.push(soldier);
           }
       });
       this.targets = soldiers;
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