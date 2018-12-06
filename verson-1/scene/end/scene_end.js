class SceneEnd extends GameScene {
    constructor(game) {
        super(game)
        var s = {
            game: game,
        }
        this.game.registerAction("r", function () {
            s.replceScene()
        })
        s.replceScene = function () {
            var start = new SceneTitle(game)
            game.replceScene(start)
        }
    }

    update() {
    }

    draw() {
        // draw
        this.game.context.fillStyle = "#646464"
        this.game.context.fillRect(0, 0, 400, 300)
        this.game.context.fillStyle = "#fff"
        this.game.context.fillText("结束，按R重新游戏", 10, 290);
    }

}