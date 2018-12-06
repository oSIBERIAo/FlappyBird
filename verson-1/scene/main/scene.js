class Scene extends GameScene {
    constructor(game) {
        super(game)
        this.game = game
        this.enableDebugMode = true
        this.score = 0

        
        this.setup()
        this.setupInputs()

        var debugMode = () => {
            window.addEventListener("keydown", (e) => {
                if (e.key == "o") {
                    this.enableDebugMode = !this.enableDebugMode
                }
                if (!this.enableDebugMode) {
                    log('关闭试调模式')
                    return
                } else {
                    if (e.key == "p") {
                        log('ppp')
                        this.game.paused = !this.game.paused
                    }
                    if (e.key == "b") {
                        if (this.levelN > 1) {
                            this.levelN--
                        }
                        this.blocks = loadlevel(game, this.levelN)
                    }
                    if (e.key == "n") {
                        if (this.levelN == levels.length) {
                            return
                        }
                        this.levelN++
                        this.blocks = loadlevel(game, this.levelN)
                    }
                }

            })
            document.querySelector('#id_fps').addEventListener("input", function (e) {
                window.fps = e.target.value
            })
        }
        debugMode()
    }
    setup() {
        var game = this.game
        this.player = Player.new(game)

        this.bg = BackGround.new(game)
        this.bg2 = BackGround.new(game)
        this.bg2.y = -this.game.canvas.clientHeight

        this.score = 0
        this.lable = GameLable.new(game, this.score)

        this.addElement(this.bg, this.bg2, this.player, this.lable)

        this.numberEnemy = 12
        this.addEnemeies()
        this.game.registerAction("f", () => {
            this.player.fire()
        })  
    }
    setupInputs() {
        this.game.registerAction("a", () => {
            this.player.moveLeft()
        })
        this.game.registerAction("d", () => {
            this.player.moveRight(this.game.canvas.width)
        })
        this.game.registerAction("w", () => {
            this.player.moveUp(this.game.canvas.height)
        })
        this.game.registerAction("s", () => {
            this.player.moveDown(this.game.canvas.height)
        })
    }
    addEnemeies() {
        // var es = []
        for (let i = 0; i < this.numberEnemy; i++) {
            let enemy = Enemy.new(this.game)
            // es.push(enemy)
            this.addElement(enemy)
        }
        // this.enemies = es
    }
     //碰撞检测标记
    removeCheck(a, b) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i] instanceof a) {
                for (let x = 0; x < this.elements.length; x++) {
                    if (this.elements[x] instanceof b) {
                        let a = this.elements[i]
                        let b = this.elements[x]
                        let result = rectIntersects(a, b) || rectIntersects(b, a)
                        if (result) {
                             //标记去除并添加爆炸效果
                            a.status = false
                            b.status = false
                            if (a instanceof Enemy || b instanceof Enemy ) {
                                this.score += 100
                                var ParticleSystem = GameParticleSystem.new(this.game, b)
                                this.addElement(ParticleSystem)
                            }
                            
                            this.numberEnemy--
                        }
                    }
                }
            }
        }
    }
    remove() {
        let statusCheck = function (elements) {
            return elements.status != false
        }
        this.elements = this.elements.filter(statusCheck)
    }
    updateEnemy() {
        this.numberEnemy = 0
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i] instanceof Enemy) {
                this.numberEnemy++
            }
        }
        if (this.numberEnemy < config.enemy_number) {
            let enemy = Enemy.new(this.game)
            this.addElement(enemy)
            this.numberEnemy++
        }
    }

    update() {
        super.update()
        var game = this.game
        if (game.paused) { return }

        //碰撞检测标记
        this.removeCheck(Enemy, Bullet)
        this.removeCheck(Enemy, Player)
        this.removeCheck(EnemyBullet, Player)
        this.removeCheck(EnemyBullet, Bullet)

    
        //移除被标记碰撞物体
        this.remove()

        this.updateEnemy()
    }
}

