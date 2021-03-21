import { Vector2D } from "./vector2d.js";
class Character {
    constructor(name, controller, idleAnimation) {
        this.name = name;
        this.controller = controller;
        this.poses = [];
        this.animations = new Map();
        this.animations.set("idle", idleAnimation);
        this.hitboxes = [];
        this.hurtboxes = [];
        this.appearance = [];
        this.currentPose = 0;
        this.x = 0;
        this.y = 0;
        this.velocity = new Vector2D(0, 0);
        this.maxVel = new Vector2D(10, 10);
        this.stunDuration = 0;
        this.currentAnimation = "idle";
    }
    setX(x) {
        // console.log("character setting x " + x)
        this.x = x;
        this.animations.forEach((value, key) => {
            value.setX(x);
        });
        // Object.keys(this.animations).forEach((key: string)=>{
        //     this.animations.get(key).setX(x)
        // })
    }
    setY(y) {
        this.y = y;
        this.animations.forEach((value, key) => {
            value.setY(y);
        });
    }
    draw(scene, debug = false) {
        this.appearance.forEach((object) => {
            object.draw(scene);
        });
        if (debug) {
            this.hitboxes.forEach((hitbox) => {
                hitbox.draw(scene);
            });
            this.hurtboxes.forEach((hurtbox) => {
                hurtbox.draw(scene);
            });
        }
    }
    addAnimation(animation, key) {
        this.animations.set(key, animation);
    }
    update() {
        // console.log(this.velocity.x)
        if (this.controller.left) {
            this.velocity.x -= 1;
        }
        if (this.controller.right) {
            this.velocity.x += 1;
        }
        if (this.controller.up) {
            this.velocity.y -= 1;
        }
        if (this.controller.down) {
            this.velocity.y += 1;
        }
        // // Velocity Damping 
        this.velocity.x *= 0.9;
        this.velocity.y *= 0.9;
        // if (this.velocity.x > this.maxVel.x) {
        //     this.velocity.x = this.maxVel.x
        // }
        // if (this.velocity.y > this.maxVel.y) {
        //     this.velocity.y = this.maxVel.y
        // }
        //If near floor, and going towards floor, do not move down anymore
        // if (this.y + this.velocity.y >= 100){
        //     console.log("floor:")
        //     this.velocity.y = 0
        //     this.setY(100)
        // }
        // if (this.stunDuration > 0) {
        //     this.stunDuration -= 1
        // }
        if (this.currentAnimation == "idle") {
            let cur_animation;
            if (this.controller.normal) {
                this.currentAnimation = "normal";
                cur_animation = this.animations.get("normal");
            }
            else {
                cur_animation = this.animations.get("idle");
            }
            let pose = cur_animation.getCurrentFrame();
            cur_animation.incrementFrame();
            if (cur_animation.currentFrame >= cur_animation.totalFrames) {
                cur_animation.currentFrame = 0;
            }
            this.appearance = pose.appearance;
            this.hitboxes = pose.hitboxes;
            this.hurtboxes = pose.hurtboxes;
        }
        else {
            // Doing other animation, so gotta stick with it
            let cur_animation = this.animations.get(this.currentAnimation);
            let pose = cur_animation.getCurrentFrame();
            cur_animation.incrementFrame();
            if (cur_animation.currentFrame >= cur_animation.totalFrames) {
                cur_animation.reset();
                this.currentAnimation = "idle";
            }
            this.appearance = pose.appearance;
            this.hitboxes = pose.hitboxes;
            this.hurtboxes = pose.hurtboxes;
        }
    }
}
class Pose {
    constructor(hitboxes, hurtboxes, appearance) {
        this.x = 0;
        this.y = 0;
        this.hitboxes = hitboxes;
        this.hurtboxes = hurtboxes;
        this.appearance = appearance;
    }
    setX(x) {
        // console.log("setting x" + x)
        let dx = x - this.x;
        this.x += dx;
        this.hitboxes.forEach((hitbox) => {
            hitbox.x += dx;
        });
        this.hurtboxes.forEach((hurtbox) => {
            hurtbox.x += dx;
        });
        this.appearance.forEach((appearance) => {
            appearance.x += dx;
        });
    }
    setY(y) {
        let dy = y - this.y;
        this.y += dy;
        this.hitboxes.forEach((hitbox) => {
            hitbox.y += dy;
        });
        this.hurtboxes.forEach((hurtbox) => {
            hurtbox.y += dy;
        });
        this.appearance.forEach((appearance) => {
            appearance.y += dy;
        });
    }
}
class Animation {
    constructor(name) {
        this.name = name;
        this.poses = [];
        this.currentFrame = 0;
        this.totalFrames = 0;
    }
    addPose(pose) {
        this.poses.push(pose);
        this.totalFrames += 1;
    }
    reset() {
        this.currentFrame = 0;
    }
    getCurrentFrame() {
        return this.poses[this.currentFrame];
    }
    incrementFrame() {
        this.currentFrame += 1;
    }
    // resetFrame(){
    //     this.currentFrame = 1
    // }
    setX(x) {
        // console.log("received at animation: " + x)
        this.poses.forEach((pose) => {
            pose.setX(x);
        });
    }
    setY(y) {
        this.poses.forEach((pose) => {
            pose.setY(y);
        });
    }
}
class ArrowController {
    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.debug = false;
        this.normal = false;
        this.special = false;
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowDown':
                    this.down = true;
                    break;
                case 'ArrowUp':
                    this.up = true;
                    break;
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
                // case ''
            }
        });
        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'ArrowDown':
                    this.down = false;
                    break;
                case 'ArrowUp':
                    this.up = false;
                    break;
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
            }
        });
    }
}
class WASDController {
    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.debug = false;
        this.special = false;
        this.normal = false;
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 's':
                    this.down = true;
                    break;
                case 'w':
                    this.up = true;
                    break;
                case 'a':
                    this.left = true;
                    break;
                case 'd':
                    this.right = true;
                    break;
                case 'j':
                    this.normal = true;
                    break;
                case 'k':
                    this.special = true;
                    break;
            }
        });
        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 's':
                    this.down = false;
                    break;
                case 'w':
                    this.up = false;
                    break;
                case 'a':
                    this.left = false;
                    break;
                case 'd':
                    this.right = false;
                    break;
                case 'j':
                    this.normal = false;
                    break;
                case 'k':
                    this.special = false;
                    break;
            }
        });
    }
}
function isHitCircle(object) {
    return object.type === "circle";
}
function isHitRect(object) {
    return object.type === "rectangle";
}
function isHurtCircle(object) {
    return object.type === "circle";
}
function isHurtRect(object) {
    return object.type === "rectangle";
}
function isCircle(object) {
    return object.type === "circle";
}
function isRect(object) {
    return object.type === "rectangle";
}
export { Pose, ArrowController, WASDController, Character, Animation };
