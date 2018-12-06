class GameAnimation {
    constructor(game) {
        this.game = game

        this.setup()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.x = 150
        this.y = 200
        this.speed = 1
        this.fall = true
        this.rotation = 0
        this.die = false

        this.gy = 10
        this.vy = 0
        this.animationName = 'bird'
        this.animations = {
            idle: [],
            run: [],
            bird: [],
        }

        this.numberOfFrames = {
            idle: 16,
            run: 11,
            bird: 3,
        }
        this.init(this.numberOfFrames)
        // 当前帧 当前帧下标 动画冷却 
        this.framesCurrent = this.frames()[0]
        this.frameIndex = 0
        this.framesCooldown = config.frames_cooldown
    }
    init(numberOfFrames) {
        var loadFrames = (key) => {
            for (let i = 0; i < numberOfFrames[key]; i++) {
                let name = key + `${i}`
                let t = GameImage.new(this.game, name)
                t.x = this.x
                this.animations[key].push(t)
            }
        }
        let keys = Object.keys(numberOfFrames)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            loadFrames(key)
        }
    }
    frames() {
        return this.animations[this.animationName]
    }
    draw() {
        var context = this.game.context
        let o  = this.framesCurrent 
        
        context.save()
        //移动到中心点旋转
        let w2 = o.w / 2
        let h2 = o.h / 2
        context.translate(o.x + w2, o.y + h2);
        context.rotate(this.rotation * Math.PI / 180);
        context.translate(- w2, - h2);
        context.drawImage(o.texture, 0, 0)
        context.restore()
    }
    update() {
        this.framesCooldown --
        this.y += this.vy
        this.vy += this.gy * 0.005
        
        if (this.y > 475) {
            this.y = 475
        }

        if (this.fall == true && this.rotation <  45) {
            this.rotation ++
        } else if (this.fall == false && this.rotation > - 45) {
                this.rotation -= 6
        }
        if (this.framesCooldown < 0) {
            this.framesCooldown = 10

            this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames[this.animationName]
            this.framesCurrent = this.frames()[this.frameIndex]
            this.framesCurrent.x = this.x
            this.framesCurrent.y = this.y
        } 
    }
    changeAnimation(status) {
        var animationNames = {
            down: 'bird',
            up: 'bird',
        }
        var name = animationNames[status]
        this.animationName = name  
    }
    jump(status) {
        if (this.die) {
            return
        }
        if (status == 'up') {
            this.fall = true
        } 
        if (status == 'down') {
            this.fall = false
        }
        this.vy = -2
        // this.rotation = -45
        this.changeAnimation(status)
        var o = this.framesCurrent
        var canvasWidth = this.game.canvas.width        
    }
    over() {
        this.die = true
    }
    moveLeft(status) {
        this.changeAnimation(status)
        var o = this.framesCurrent
        if (o.x <= - o.w / 2) { return }
        this.x -= this.speed    
        this.fall = true 
    }
    moveRight(status) {  
        this.changeAnimation(status)
        var o = this.framesCurrent
        var canvasWidth = this.game.canvas.width
        if (o.x > canvasWidth - o.w + o.w / 2) { return }
        this.x += this.speed   
        this.fall = false 
    }
}
