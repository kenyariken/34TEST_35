// Updated main.ts to implement the combined difficulty adjustment

// Constants
const ENEMY_SPAWN_Y = -2; // Off-screen top
const FALL_SPEED_NORMAL = 100; // Normal fall speed in ms
const FALL_SPEED_ADJUSTED = 200; // Adjusted fall speed in ms
const BULLET_SPEED_ADJUSTED = 2; // Adjusted bullet speed for synchronization

// Enemy class implementation
class Enemy {
    constructor() {
        this.y = ENEMY_SPAWN_Y;
        this.fallTimer = 0;
    }

    appear() {
        // Logic for delaying enemy appearance
        this.fallTimer = setTimeout(() => {
            this.startFalling();
        }, 1000); // Delay before enemy appears
    }

    startFalling() {
        // Logic for falling speed adjustment
        setInterval(() => {
            this.y += 1; // Move enemy down
        }, FALL_SPEED_ADJUSTED);
    }
}

// Bullet class implementation
class Bullet {
    constructor() {
        this.speed = BULLET_SPEED_ADJUSTED;
    }

    // Logic to handle bullet movement
}

// Sample instantiation
const enemy = new Enemy();
enemy.appear();