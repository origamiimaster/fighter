class Controller {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    constructor(gameElement: HTMLElement) {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        gameElement.addEventListener("keydown", (event) => {
            switch (event.key) {
                case 'ArrowDown':
                    this.down = true
                    break
                case 'ArrowUp':
                    this.up = true
                    break
                case 'ArrowLeft':
                    this.left = true
                    break
                case 'ArrowRight':
                    this.right = true
                    break
            }
        })

        gameElement.addEventListener("keyup", (event) => {
            switch (event.key) {
                case 'ArrowDown':
                    this.down = false
                    break
                case 'ArrowUp':
                    this.up = false
                    break
                case 'ArrowLeft':
                    this.left = false
                    break
                case 'ArrowRight':
                    this.right = false
                    break
            }
        })
    }
}

export { Controller }