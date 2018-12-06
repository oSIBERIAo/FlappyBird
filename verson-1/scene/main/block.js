var Block = function (game, position) {
    // var o = game.imageFromGame("block")

    var o = GameImage.new(game, "block")
    var p = position

    o.x = p[0]
    o.y = p[1]
    o.lives = p[2] || 1
    o.alive = true

    o.kill = function () {
        if (o.lives < 1) {
            o.alive = false 
        } else {
            o.lives--
        }
        
    }
    o.collide = function (ball) {
        //未存活加碰撞检测
        return o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o))
    }
    return o //Obj
}