// ===== LED シューティング ゲーム（難易度調整版）=====

// ゲーム変数の初期化
let playerPos = 2  // プレイヤーの初期位置（0-4）
let bulletPos = -1  // 弾の位置（-1は発射前）
let enemyPos = 0  // 敵のX位置
let enemyY = -2    // 敵のY位置（-2から開始：画面外）
let score = 0     // スコア
let gameOver = false  // ゲームオーバーフラグ
let gameLoopActive = false  // ゲームループ制御フラグ

// ゲーム時間管理
let gameTime = 0  // 経過フレーム数
let enemyMoveInterval = 20  // 敵が移動するフレーム数（10ms×20=200ms）

// ===== ゲーム開始 =====
function startGame() {
    playerPos = 2
    bulletPos = -1
    enemyPos = Math.randomRange(0, 5)
    enemyY = -2  // 敵を画面外から開始
    score = 0
    gameOver = false
    gameTime = 0
    basic.clearScreen()
}

startGame()

// ===== メインゲームループ（高速更新版）=====
basic.forever(function () {
    if (gameLoopActive && !gameOver) {
        gameTime = gameTime + 1
        
        // 画面をクリア
        basic.clearScreen()
        
        // プレイヤーを描画（最下段）
        led.plot(playerPos, 4)
        
        // 敵を描画（画面内のみ）
        if (enemyY >= 0 && enemyY <= 4) {
            led.plot(enemyPos, enemyY)
        }
        
        // 弾を描画
        if (bulletPos >= 0 && bulletPos <= 4) {
            led.plot(playerPos, bulletPos)
        }
        
        // 敵が移動するタイミング（200ms ごと・遅くなった）
        if (gameTime % enemyMoveInterval == 0) {
            enemyY = enemyY + 1
            
            // 敵がプレイヤーに衝突したかチェック
            if (enemyY == 4 && enemyPos == playerPos) {
                gameOver = true
                showGameOver()
            }
            
            // 敵が一番下に達したかチェック
            if (enemyY > 4) {
                gameOver = true
                showGameOver()
            }
        }
        
        // 弾が上に移動（毎フレーム：10ms ごと）
        if (bulletPos >= 0) {
            bulletPos = bulletPos - 0.25  // 敵の新しい速度に同期
            
            // 弾が敵に当たったかチェック
            if (bulletPos >= 0 && bulletPos <= 4 && Math.floor(bulletPos) == enemyY && playerPos == enemyPos) {
                score = score + 1
                // 新しい敵を出現させる
                enemyPos = Math.randomRange(0, 5)
                enemyY = -2  // 画面外から再開
                bulletPos = -1
            }
        }
        
        // 弾が画面外に出たらリセット
        if (bulletPos < 0 && bulletPos != -1) {
            bulletPos = -1
        }
        
        // 短い待機（10ms）
        basic.pause(10)
    }
})

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
        bulletPos = 3.5  // プレイヤーの少し上から発射
    }
})

// ===== ゲームオーバー表示 =====
function showGameOver() {
    basic.clearScreen()
    basic.showIcon(IconNames.No)
}

// ===== ゲーム開始時にループを有効化 =====
gameLoopActive = true

// ===== タッチセンサー：再プレイ =====
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    gameLoopActive = false  // ループを一時停止
    basic.pause(200)  // 処理が完了するまで待機
    startGame()
    gameLoopActive = true  // ループを再開
})
