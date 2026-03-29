// ===== LED シューティング ゲーム =====

// ゲーム変数の初期化
let playerPos = 2  // プレイヤーの初期位置（0-4）
let bulletPos = -1  // 弾の位置（-1は発射前）
let enemyPos = 0  // 敵のX位置
let enemyY = 0    // 敵のY位置（0-4）
let score = 0     // スコア
let gameOver = false  // ゲームオーバーフラグ

// ボタン入力の初期化
let aPressed = false
let bPressed = false

// ===== ゲーム開始 =====
function startGame() {
    playerPos = 2
    bulletPos = -1
    enemyPos = Math.randomRange(0, 5)
    enemyY = 0
    score = 0
    gameOver = false
    basic.clearScreen()
}

startGame()

// ===== メインゲームループ =====
basic.forever(function () {
    if (!gameOver) {
        // ゲーム画面を更新
        updateGame()
    }
})

// ===== ゲーム更新処理 =====
function updateGame() {
    // 画面をクリア
    basic.clearScreen()
    
    // プレイヤーを描画（最下段）
    led.plot(playerPos, 4)
    
    // 敵を描画
    led.plot(enemyPos, enemyY)
    
    // 弾を描画
    if (bulletPos >= 0) {
        led.plot(playerPos, bulletPos)
    }
    
    // 敵が落ちる（500ms ごと）
    basic.pause(500)
    enemyY = enemyY + 1
    
    // 弾が上がる（毎フレーム）
    if (bulletPos >= 0) {
        bulletPos = bulletPos - 1
    }
    
    // 敵がプレイヤーに衝突したかチェック
    if (enemyY >= 4 && enemyPos == playerPos) {
        gameOver = true
        showGameOver()
    }
    
    // 敵が一番下に達したかチェック
    if (enemyY > 4) {
        gameOver = true
        showGameOver()
    }
    
    // 弾が敵に当たったかチェック
    if (bulletPos >= 0 && bulletPos == enemyY && playerPos == enemyPos) {
        score = score + 1
        // 新しい敵を出現させる
        enemyPos = Math.randomRange(0, 5)
        enemyY = 0
        bulletPos = -1
    }
}

// ===== Aボタン：左に移動 =====
input.onButtonPressed(Button.A, function () {
    if (!gameOver && playerPos > 0) {
        playerPos = playerPos - 1
    }
})

// ===== Bボタン：右に移動 =====
input.onButtonPressed(Button.B, function () {
    if (!gameOver && playerPos < 4) {
        playerPos = playerPos + 1
    }
})

// ===== A+B：弾を発射 =====
input.onButtonPressed(Button.AB, function () {
    if (!gameOver && bulletPos < 0) {
        bulletPos = 3  // プレイヤーの一つ上から発射
    }
})

// ===== ゲームオーバー表示 =====
function showGameOver() {
    basic.clearScreen()
    basic.showString("GAME OVER", 100)
    basic.showString("Score:" + score, 100)
}

// ===== タッチセンサー：再プレイ =====
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    startGame()
    basic.forever(function () {
        if (!gameOver) {
            updateGame()
        }
    })
})