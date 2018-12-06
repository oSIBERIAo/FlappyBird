var Ball = function (game) {
    // var o = game.textureByName("ball")
    var o = GameImage.new(game, "ball")

    o.x = 190
    o.y = 203
    o.speedX = 3
    o.speedY = 3
    o.fired = false

    o.fire = function () {
        o.fired = true
    }
    o.move = function (canvas) {
        if (o.fired) {
            if (o.x  > canvas.width - o.w || o.x < 0) {
                o.speedX = -o.speedX
            }
            if (o.y > canvas.height - o.h  || o.y < 0) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }

    o.bounce = function (rect) {
        if (rect) {
            let b = rect
            //此处给系统计算预留时间 10
            if ((o.x > b.x + b.w - 10) || (o.x + o.w -10 < b.x)) {
                // log('侧边碰撞')
                o.speedX *= -1
                return
            }
        }
        o.speedY *= -1
    }
    o.judgeRect = function (rect, point) {
        let x = point.x
        let y = point.y
        return (x > rect.x && x < rect.x + rect.w) && (y > rect.y && y < rect.y + rect.h)
    }
    return o //Obj
}