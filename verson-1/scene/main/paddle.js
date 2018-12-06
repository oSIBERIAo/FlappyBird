var Paddle = function (game) {
    // var o = game.imageFromGame("paddle")
    
    var o = GameImage.new(game, "paddle")
    o.x = 120
    o.y = 250
    o.speed = 3
    o.moveLeft = function () {
        if (o.x <= 0) { return }
        o.x -= o.speed
    }
    o.moveRight = function (canvasWidth) {
        if (o.x > canvasWidth - o.image.width) { return }
        o.x += o.speed
    }

    o.collide = function (ball) {
        return rectIntersects(ball, o)
    }
    return o //Obj
}