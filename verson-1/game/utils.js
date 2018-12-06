const aInb = function (x, x1, x2) {
    return x > x1 && x < x2
}
const rectIntersects = function (a, b) {
    // catch 接住计算不过来导致崩溃的bug
    try {
        if (aInb(b.x, a.x, a.x + a.w) || aInb(a.x, b.x, b.x + b.w)) {
            if (aInb(b.y, a.y, a.y + a.h) || aInb(a.y, b.y, b.y + b.h)) {
                // log('碰撞💥')
                return true
            }
        }
    } catch(err) {
        log('捕捉到错误', err)
        return false
    }
    return false
}

const randomBetween = function (start, end) {
    let s = Math.random() * (end - start + 1)
    s = start + Math.floor(s)
    return s
}
