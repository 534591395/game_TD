
declare module PF {
    class Option {
        /**
         * 是否使用对角线
         */
        public allowDiagonal: boolean;
        /**
         * 是否不在拐角处转弯
         */
        public dontCrossCorners: boolean;
        /***
         * 自定义启发式算法
         */
        public heuristic: Function;
        /**
         * 权重
         */
        public weight: number;
        /**
         * 对角线行为
         */
        public diagonalMovement: DiagonalMovement;
        /**
         * 最低时间-IDEA
         */
        public timeLimit:number;
        /**
         * 轨迹递归-IDEA、跳点
         */
        public trackRecursion:boolean;
    }
    enum DiagonalMovement {
        /**
         * 总是
         */
        Always,
        /**
         * 从不
         */
        Never,
        /**
         * 当最多障碍
         */
        IfAtMostOneObstacle,
        /**
         * 只当没有障碍
         */
        OnlyWhenNoObstacles
    }
    /**
     * 启发式算法
     */
    class Heuristic {
        /**
         * 曼哈顿距离
         */
        public static manhattan: Function;
        /**
         * 欧几里德距离
         */
        public static euclidean: Function;
        /**
         * Octile距离
         */
        public static octile: Function;
        /**
         * 切比雪夫距离
         */
        public static chebyshev: Function;
    }
    /**
     * 格子
     */
    class Node {
        constructor();
        /**
         * 横坐标
         */
        public x: number;
        /**
         * 纵坐标
         */
        public y: number;
        /**
         * 是否可以走动
         */
        public walkable: boolean;
    }
    /**
     * 网格
     */
    class Grid {
        /**
         * 构造函数
         * @param matrix 矩阵
         */
        constructor(width: number,height: number,matrix: Array<Array<number>>);
        /**
         * 根据坐标获取格子
         * @param x 横坐标
         * @param y 纵坐标
         */
        public getNodeAt(x: number,y: number): Node;
        /**
         * 指定的坐标是否可以走动
         * @param x 横坐标
         * @param y 纵坐标
         */
        public isWalkableAt(x: number,y: number): boolean;
        /**
         * 某点是否在网格里面
         * @param x
         * @param y
         */
        public isInside(x: number,y: number): boolean;        
        /**
         * 设置某点是否可以走动
         * @param x 某点横坐标
         * @param y 某点纵坐标
         * @param walkable 是否可以走动
         */
        public setWalkableAt(x: number,y: number,walkable: boolean): void;        
        /**
         * 获取格子的邻居
         * @param node 节点
         * @param diagonalMovement 对角线行为
         */
        public getNeighbors(node: Node,diagonalMovement: DiagonalMovement): Array<Node>;
        /**
         * 克隆一个网格对象
         */
        public clone(): Grid;
    }
    class Util {
        /**
         * Backtrace according to the parent records and return the path
         * (including both start and end nodes)
         * @param node
         */
        public static backtrace(node: Node): Array<Array<number>>;
        /**
         * Backtrace from start and end node, and return the path.
         * (including both start and end nodes)
         * @param nodeA
         * @param nodeB
         */
        public static biBacktrace(nodeA: Node,nodeB: Node): Array<Array<number>>;
        /**
         * 计算路径长度
         * @param path
         */
        public static pathLength(path: Array<Array<number>>): number;
        /**
         * 给定开始和结束坐标，返回所有的坐标
         * @param x0
         * @param y0
         * @param x1
         * @param y1
         */
        public static interpolate(x0: number,y0: number,x1: number,y1: number): Array<Array<number>>;
        /**
         * Given a compressed path, return a new path that has all the segments
         * in it interpolated.
         * @param path
         */
        public static expandPath(path: Array<Array<number>>): Array<Array<number>>;        
        /**
         * 平滑给定的路径
         * 不会修改原路径，会返回个新的路径
         * @param grid 网格
         * @param path 路径
         */
        public static smoothenPath(grid: Grid,path: Array<Array<number>>): Array<Array<number>>;
        /**
         * 压缩路径，不改变形状，只删除冗余节点
         * 不会修改原路径，会返回个新的路径
         * @param path
         */
        public static compressPath(path: Array<Array<number>>): Array<Array<number>>;
    }
    /**
     * A星
     */
    class AStarFinder {
        /**
         * 构造函数
         * @param option 寻路选项
         */
        constructor(option?: Option);
        /**
         * 搜索路径
         * @param startX 起始位置横坐标
         * @param startY 起始位置纵坐标
         * @param endX 结束位置横坐标
         * @param endY 结束位置纵坐标
         * @param grid 网格
         */
        public findPath(startX: number,startY: number,endX: number,endY: number,grid: Grid): Array<Array<number>>;
    }
    /**
     * 最好优先
     */
    class BestFirstFinder extends AStarFinder {
        /**
         * 构造函数
         * @param option 寻路选项
         */
        constructor(option: Option);
    }
    /**
     * 广度优先
     */
    class BreadthFirstFinder {
        /**
         * 构造函数
         * @param option 寻路选项
         */
        constructor(option: Option);
        /**
         * 搜索路径
         * @param startX 起始位置横坐标
         * @param startY 起始位置纵坐标
         * @param endX 结束位置横坐标
         * @param endY 结束位置纵坐标
         * @param grid 网格
         */
        public findPath(startX: number,startY: number,endX: number,endY: number,grid: Grid): Array<Array<number>>;
    }
    /**
     * 迪杰斯特拉-单源最短路径
     */
    class DijkstraFinder extends AStarFinder {
        /**
         * 构造函数
         * @param option 寻路选项
         */
        constructor(option: Option);
    }
    /**
     * IDA星
     */
    class IDAStarFinder {
        /**
         * 构造函数
         * @param option 寻路选项
         */
        constructor(option: Option);
        /**
         * 搜索路径
         * @param startX 起始位置横坐标
         * @param startY 起始位置纵坐标
         * @param endX 结束位置横坐标
         * @param endY 结束位置纵坐标
         * @param grid 网格
         */
        public findPath(startX: number,startY: number,endX: number,endY: number,grid: Grid): Array<Array<number>>;
    }
    /**
     * 跳点
     */
    class JumpPointFinder {
        /**
         * 构造函数
         * @param option 寻路选项
         */
        constructor(option: Option);
        /**
         * 搜索路径
         * @param startX 起始位置横坐标
         * @param startY 起始位置纵坐标
         * @param endX 结束位置横坐标
         * @param endY 结束位置纵坐标
         * @param grid 网格
         */
        public findPath(startX: number,startY: number,endX: number,endY: number,grid: Grid): Array<Array<number>>;
    }
}
