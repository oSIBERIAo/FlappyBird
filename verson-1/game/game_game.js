class Game extends GameScene {
    constructor(images, Callback) {
        super(images, Callback)
        this.Callback = Callback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.images = images
        this.paused = false
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        var g = this

        window.addEventListener("keydown", function (e) {
            g.keydowns[e.key] =  'down'
        })
        window.addEventListener("keyup", function (e) {
            g.keydowns[e.key] = 'up'
        })
        this.init()
    }
    textureByName(name) {
        var g = this
        var img = g.images[name]
        return img
    }
    drawImage(guaImage) {
        var g = this
        g.context.drawImage(guaImage.texture, guaImage.x, guaImage.y)
    }
    registerAction(key, callback) {
        var g = this
        g.actions[key] = callback
    }

    runloop() {
        var g = this
        var actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            let status = g.keydowns[key]
            if (status == 'down') {
                g.actions[key]('down')
            } else if (status == 'up') {
                // g.actions[key](status) 错误
                g.actions[key]('up')
                g.keydowns[key] = null
            }
        }
        g.update()
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        g.draw()
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }
    replceScene(scene) {
        var g = this
        g.scene = scene
    }
    update() {
        var g = this
        g.scene.update()
    }
    draw() {
        var g = this
        g.scene.draw()
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
    }
    __start() {
        var g = this
        this.Callback(g)
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }
    init() {
        var g = this
        var names = Object.keys(this.images)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
                g.images[name] = img
                if (i == names.length - 1) {
                    g.__start()
                }
            }
        }
    }
}