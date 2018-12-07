class SceneBird extends GameScene {
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
