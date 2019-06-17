/**
 * Astar寻路算法
 */
var Astar = {
    findPath: function (map, start, end, f) {
        var cols = map[0].length, rows = map.length, limit = cols * rows, f1 = Math.abs, f2 = Math.max, list = {}, result = [], open = [{ x: start[0], y: start[1], f: 0, g: 0, v: start[0] + "_" + start[1] }], length = 1, adj, distance, find, i, j, max, min, current, next;
        end = { x: end[0], y: end[1], v: end[0] + "_" + end[1] };
        switch (f) {
            case "Diagonal":
                find = Astar.diagonalSuccessors;
            case "DiagonalFree":
                distance = Astar.diagonal;
                break;
            case "Euclidean":
                find = Astar.diagonalSuccessors;
            case "EuclideanFree":
                f2 = Math.sqrt;
                distance = Astar.euclidean;
                break;
            default:
                distance = Astar.manhattan;
                find = Astar.nothingToDo;
                break;
        }
        find || (find = Astar.diagonalSuccessorsFree);
        do {
            max = limit;
            min = 0;
            for (i = 0; i < length; ++i) {
                if ((f = open[i].f) < max) {
                    max = f;
                    min = i;
                }
            }
            ;
            current = open.splice(min, 1)[0];
            if (current.v != end.v) {
                --length;
                next = Astar.successors(find, current.x, current.y, map, rows, cols);
                for (i = 0, j = next.length; i < j; ++i) {
                    (adj = next[i]).p = current;
                    adj.f = adj.g = 0;
                    adj.v = adj.x + "_" + adj.y;
                    if (!(adj.v in list)) {
                        adj.f = (adj.g = current.g + distance(adj, current, f1, f2)) + distance(adj, end, f1, f2);
                        open[length++] = adj;
                        list[adj.v] = 1;
                    }
                }
            }
            else {
                i = length = 0;
                do {
                    result[i++] = [current.x, current.y];
                } while (current = current.p);
                result.reverse();
            }
        } while (length);
        return result;
    },
    diagonalSuccessors: function ($N, $S, $E, $W, N, S, E, W, map, rows, cols, result, i) {
        if ($N) {
            $E && !map[N][E] && (result[i++] = { x: E, y: N });
            $W && !map[N][W] && (result[i++] = { x: W, y: N });
        }
        if ($S) {
            $E && !map[S][E] && (result[i++] = { x: E, y: S });
            $W && !map[S][W] && (result[i++] = { x: W, y: S });
        }
        return result;
    },
    diagonalSuccessorsFree: function ($N, $S, $E, $W, N, S, E, W, map, rows, cols, result, i) {
        $N = N > -1;
        $S = S < rows;
        $E = E < cols;
        $W = W > -1;
        if ($E) {
            $N && !map[N][E] && (result[i++] = { x: E, y: N });
            $S && !map[S][E] && (result[i++] = { x: E, y: S });
        }
        if ($W) {
            $N && !map[N][W] && (result[i++] = { x: W, y: N });
            $S && !map[S][W] && (result[i++] = { x: W, y: S });
        }
        return result;
    },
    nothingToDo: function ($N, $S, $E, $W, N, S, E, W, map, rows, cols, result, i) {
        return result;
    },
    successors: function (find, x, y, map, rows, cols) {
        var N = y - 1, S = y + 1, E = x + 1, W = x - 1, $N = N > -1 && !map[N][x], $S = S < rows && !map[S][x], $E = E < cols && !map[y][E], $W = W > -1 && !map[y][W], result = [], i = 0;
        $N && (result[i++] = { x: x, y: N });
        $E && (result[i++] = { x: E, y: y });
        $S && (result[i++] = { x: x, y: S });
        $W && (result[i++] = { x: W, y: y });
        return find($N, $S, $E, $W, N, S, E, W, map, rows, cols, result, i);
    },
    diagonal: function (start, end, f1, f2) {
        return f2(f1(start.x - end.x), f1(start.y - end.y));
    },
    euclidean: function (start, end, f1, f2) {
        var x = start.x - end.x, y = start.y - end.y;
        return f2(x * x + y * y);
    },
    manhattan: function (start, end, f1, f2) {
        return f1(start.x - end.x) + f1(start.y - end.y);
    }
};
