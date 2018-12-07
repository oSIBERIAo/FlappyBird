class SceneTitle extends GameScene {
    constructor(game) {
        super(game)
        this.game = game

        this.setup()

        // this.gameLable = GameLable.new(this.game, "开始，按K开始游戏")
        // this.addElement(this.gameLable)
 
        this.setupInputs()
    }
    setup() {
        var game = this.game
         
        this.score = 0
        this.die = false

        this.bg = BackGround.new(game)
        this.bg.x = 0
        this.bg2 = BackGround.new(game)
        this.bg2.x = this.bg2.w
        this.addElement(this.bg, this.bg2)

        this.pipes = Pipes.new(game)
        this.addElement(this.pipes)
        
        this.grounds = []
        for (let i = 0; i < 10; i++) {
            let g = Ground.new(game)
            g.y = config.groundsY.value
            g.x = g.w * i
            this.addElement(g)
            this.grounds.push(g)
        }
        
        this.gameAnimation = GameAnimation.new(this.game)
        this.addElement(this.gameAnimation)

        this.lable = GameLable.new(game, this.score)
        this.addElement(this.lable)
    }
    intersectsCheck(a, b) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i] instanceof a) {
                for (let x = 0; x < this.elements.length; x++) {
                    if (this.elements[x] instanceof b) {
                        let c = this.elements[i] //pipes
                        let b = this.elements[x]
                        // log('111', b, c)
                        for (let y = 0; y < c.pipes.length; y++) {
                            let a = c.pipes[y]    //pipe             
                            
                            let result = rectIntersects(a, b) || rectIntersects(b, a)
                            if (result) {
                                this.gameAnimation.over()
                                this.die = true
                            }
                            
                        }
                    }
                }
            }
        }
    }
    draw() {
        super.draw()
    }
    setupInputs() {
        // this.game.registerAction("a", (keyStatus) => {
        //     this.gameAnimation.moveLeft(keyStatus)
        // })
        // this.game.registerAction("d", (keyStatus) => {
        //     this.gameAnimation.moveRight(keyStatus)
        // })
        this.game.registerAction("j", (keyStatus) => {
            this.gameAnimation.jump(keyStatus)
        })
        this.game.registerAction("k", () => {
            this.replceScene()
        })
        this.replceScene = function () {
            var start = new SceneBird(this.game)
            this.game.replceScene(start)
        }
        document.querySelector('#id_fps').addEventListener("input", function (e) {
            window.fps = e.target.value
        })
    }
    update() {
        this.intersectsCheck(Pipes, GameAnimation)
        super.update()     
    }
}

class Pipe {
    constructor(game) {
        this.game = game
        var name = 'pipe'
        this.texture = this.game.textureByName(name)

        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.status = true
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    update() {
    }
    draw() {
        this.game.drawImage(this)
    }
}
class Pipes {
    constructor(game) {
        this.game = game
        // super(game, name)

        this.setup()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.score = 0
        this.scoreCount = 2
        this.speed = 1
        this.pipes = []
        for (let i = 0; i < 3; i++) {
            let p1 = Pipe.new(this.game)
            let p2 = Pipe.new(this.game)
            p1.x += (i + 2)* 300
            p2.x += (i + 2) * 300

            p1.y = randomBetween(-380, -110)
            p2.y = p1.h + p1.y + config.pipe_space.value
            p2.flipY = true
            // this.game.drawImage(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    update() {
        this.pipes.forEach(pipe => {
            pipe.x -= this.speed
            if (pipe.x < -300) {
                pipe.x = 2 * 300 + this.speed
            }

            // 越过 小鸟x 150坐标且未死亡
            if (pipe.x == 150 && !this.game.scene.die) {
                this.scoreCount--
                if (this.scoreCount == 0) {
                    this.scoreCount = 2
                    this.score += 1
                }
            }

            // 更新同步scene的分数
            if (this.game.scene.die) {
                if (this.game.scene.score == this.score) {
                    this.game.scene.score -= 1
                }
            }
            // 判定死亡前多得1分，特殊处理
            if (!this.game.scene.die) {
                this.game.scene.score = this.score
            }
        });
    }
    draw() {
        var context = this.game.context
        this.pipes.forEach(pipe => {
            var o = pipe
            context.save()
            //移动到中心点旋转
            let w2 = o.w / 2
            let h2 = o.h / 2
            context.translate(o.x + w2, o.y + h2);
            var scaleY = o.flipY ? -1 : 1
            context.scale(1, scaleY)
            context.translate(- w2, - h2);
            context.drawImage(o.texture, 0, 0)
            context.restore()
        });  
    }
}

class GameLable {
    constructor(game, text) {
        this.game = game
        this.text = text
        this.x = 10
        this.y = 20
    }
    static new(game, text) {
        var i = new this(game, text)
        return i
    }
    update() {    
        this.text = this.game.scene.score
    }
    draw() {
        this.game.context.fillStyle = "#FF3300"
        this.game.context.font = "20px Helvetica";
        this.game.context.fillText(this.text, this.x, this.y);
    }
}

class GameParticleSystem {
    constructor(game, point) {
        this.game = game
        this.numberOfParticle = 40
        this.particles = []
        this.x = point.x
        this.y = point.y
        this.live = 100

        this.init()
    }
    static new(game, point) {
        var i = new this(game, point)
        return i
    }
    init() {

    }
    update() {  
        if (this.particles.length < this.numberOfParticle) {
            let p = Particle.new(this.game, this)
            p.x = this.x
            p.y = this.y
            this.particles.push(p)
        }  
        this.live --
        if (this.live < 0) {
            this.status = false
        }
        for (let p of this.particles) {
            p.update()
        }
        let statusCheck = function (elements) {
            return elements.status != false
        }
        this.particles = this.particles.filter(statusCheck)

    }
    draw() {    
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i]
            p.draw()
        }
    }
}
class Particle extends GameImage {
    constructor(game) {
        let name = 'particle'
        super(game, name)
        this.game = game
        this.lives = 80
        this.status = true

        this.setup()
    }
    setup() {
        this.speedX = randomBetween(-100, 100)
        this.speedY = randomBetween(-100, 100)
    }
    update() {
        this.lives --
        this.x += this.speedX/100
        this.y += this.speedY/100
        if (this.lives < 0) {
            this.status = false
        }
    }
    debug() {
        this.speed = randomBetween(-100, 100)
    }
}