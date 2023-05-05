const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let canvasWidth = window.innerWidth;  // prendo dimensioni schermo
let canvasHeight = window.innerHeight;

canvas.width = canvasWidth;             // assegno dimensioni alla canvas
canvas.height = canvasHeight;

let animate;

let player = new Player(canvasWidth/2, canvasHeight/2, 50, 50, 'white', './assets/alien.png'); // creo un nuovo oggetto player

let enemySpawnCooldown = 120;
let allEnemies = [];

function animator(){ // funzione per animare canvas
    ctx.clearRect(0,0, canvasWidth, canvasHeight); // pulisco oggetti gia esistenti
    animate = requestAnimationFrame(animator);

    if(player){
        player.draw(ctx); // disegno il quadrato
        player.controls(canvasWidth, canvasHeight);
    }

    enemySpawnCooldown--;
    if (enemySpawnCooldown <= 0) {
        enemySpawn();
        enemySpawnCooldown = 120;
    }

    
    allEnemies.forEach(enemy => {
        enemy.draw(ctx);
        enemy.move(canvasWidth, canvasHeight);
    })

    if(player){
        checkCollision();
        //allEnemies = allEnemies.filter(enemy => enemy.isAlive);
    }
}

function enemySpawn(){
    const randomX = Math.random() * (canvasWidth - 50); // evito che venga generato sull'angolo togliendo alla X la dimensione del nemico
    let enemy = new BaseEnemy(randomX, -60, 50, 50, 'red', './assets/alien.png');
    allEnemies.push(enemy);
}

function checkCollision(){ // funzione per creare la collisione
    // noi vogliamo conoscere tutti gli assets del giocatore (proiettile) e tutti i nemici
    // creiamo array di giocatore
    let playerAssets = [player, ...player.projectiles] // fai un array che ha dentro player e tutti i suoi proiettili

    for (let i = 0; i < playerAssets.length; i++) { // cicliamo gli assets
        const pA = playerAssets[i];
        for (let j = 0; j < allEnemies.length; j++) { // per ogni assets controlliamo ogni nemico
            const enemy = allEnemies[j];

            // funzione isColliding in game object
            // if (enemy.x < (pA.x + pA.width)&&
            // (enemy.x + enemy.width) > pA.x &&
            // enemy.y < (pA.y + pA.height) &&
            // (enemy.y + enemy.height) > pA.y) { // se la x del nemico è uguale alla x del giocatore piu la sua larghezza, c'è collisione etc etc
            //     enemy.healthPoints--;
            //     console.log(enemy.healthPoints)
            // }

            if (pA.isColliding(enemy)) {
                pA.collision()
                enemy.collision();
            }
        }
    }

    allEnemies = allEnemies.filter(enemy => enemy.isAlive);
    player.projectiles = player.projectiles.filter(projectiles => projectiles.isAlive);
    if (!player.isAlive){
        player = null;
    }
}

animator(); // chiamo la funzione animator la prima volta