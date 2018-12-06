class GameScene {
    constructor(game) {
        this.game = game
        this.elements = []

    }
    addElement() {
        this.elements.push(...arguments)  
    }
    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            element.draw()
        }
    }
    update() {
        if (this.enableDebugMode) {
            for (let i = 0; i < this.elements.length; i++) {
                const element = this.elements[i];
                element.debug && element.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            element.update()
        }
    }
}







