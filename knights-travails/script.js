const Knight = function () {
    const moves = [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1],
    ];

    function isValid(x, y) {
        return x >= 0 && x <= 8 && y >= 0 && y <= 8 ? true : false;
    }

    function findShortestDistance(start, end) {
        const visited = [];
        const queue = [];

        queue.push(start);

        // CONTINUE UNTIL QUEUE IS EMPTY
        while (queue.length > 0) {
            // DEQUEUE THE CURPOINT
            const curPoint = queue.shift();

            const x = curPoint.x;
            const y = curPoint.y;
            const distance = curPoint.distance;

            // IF POINT IS THE DESTINATION RETURN ALL THE PREVIOUS POINTS
            if (x === end.x && y === end.y) {
                let myPoint = curPoint;

                console.log(
                    `You made it in ${distance} moves! Here's your path:`
                );
                while (myPoint) {
                    console.log([myPoint.x, myPoint.y]);
                    myPoint = myPoint.previous;
                }
                return distance;
            }
            // ELSE IF POINT IS NOT VISITED
            if (!isItIncluded(visited, curPoint)) {
                visited.push(curPoint);
                // FOR EACH POSSIBLE POINT
                for (let i = 0; i < moves.length; i++) {
                    const x1 = x + moves[i][0];
                    const y1 = y + moves[i][1];

                    // IF POSSIBLE POINT IS INSIDE THE LIMITS OF A CHESSBOARD PUSH IT TO QUEUE
                    if (isValid(x1, y1))
                        queue.push(Point(x1, y1, distance + 1, curPoint));
                }
            }
        }
    }

    function isItIncluded(arr, point) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].x === point.x && arr[i].y === point.y) {
                return true;
            }
        }
        return false;
    }

    return { findShortestDistance };
};

const Point = function (x, y, distance = 0, previous = null) {
    return { x, y, distance, previous };
};

const start = Point(3, 3);
const end = Point(4, 3);

const myKnight = Knight();

myKnight.findShortestDistance(start, end);
