var log = console.log.bind(console)

var loadlevel = function (game, n) {
    let blocks = []
    n = n - 1
    var level = levels[n]
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}



var _main = function (params) {

    var images = {
        ball: "img/ball.png",
        paddle: "img/paddle.png",
        block: "img/block.png",
        bg: "img/bg.png",
        particle: "img/particle.png",
        bullet0: "img/bullet0.png",
        bullet1: "img/bullet1.png",
        player0: "img/player/player0.png",
        player1: "img/player/player1.png",
        player2: "img/player/player2.png",
        player3: "img/player/player3.png",
        player4: "img/player/player4.png",
        enemy0: "img/enemy/enemy0.png",
        enemy1: "img/enemy/enemy1.png",
        enemy2: "img/enemy/enemy2.png",
        enemy3: "img/enemy/enemy3.png",
        enemy4: "img/enemy/enemy4.png",
        enemy5: "img/enemy/enemy5.png",
        enemy6: "img/enemy/enemy6.png",
        enemy7: "img/enemy/enemy7.png",
        enemy8: "img/enemy/enemy8.png",
        enemy9: "img/enemy/enemy9.png",
        // 
        idle0: "img/animation/Idle (0).png",
        idle1: "img/animation/Idle (1).png",
        idle2: "img/animation/Idle (2).png",
        idle3: "img/animation/Idle (3).png",
        idle4: "img/animation/Idle (4).png",
        idle5: "img/animation/Idle (5).png",
        idle6: "img/animation/Idle (6).png",
        idle7: "img/animation/Idle (7).png",
        idle8: "img/animation/Idle (8).png",
        idle9: "img/animation/Idle (9).png",
        idle10: "img/animation/Idle (10).png",
        idle11: "img/animation/Idle (11).png",
        idle12: "img/animation/Idle (12).png",
        idle13: "img/animation/Idle (13).png",
        idle14: "img/animation/Idle (14).png",
        idle15: "img/animation/Idle (15).png",
        // 
        run0: "img/animation/Run (0).png",
        run1: "img/animation/Run (1).png",
        run2: "img/animation/Run (2).png",
        run3: "img/animation/Run (3).png",
        run4: "img/animation/Run (4).png",
        run5: "img/animation/Run (5).png",
        run6: "img/animation/Run (6).png",
        run7: "img/animation/Run (7).png",
        run8: "img/animation/Run (8).png",
        run9: "img/animation/Run (9).png",
        run10: "img/animation/Run (10).png",
        //
        ground: "img/ground.png",
        background: "img/background.png",
        pipe: "img/pipe.png",
        bird0: "img/animation/bird0.png",
        bird1: "img/animation/bird1.png",
        bird2: "img/animation/bird2.png",
    }
    
    // var callback = 
    var game = new Game(images, function (game) {
        var scene = new SceneTitle(game)

        //异步
        game.runWithScene(scene)
    } )
}
_main()