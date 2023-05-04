// classe figlio di GameObject

class Player extends GameObject{
    constructor(x, y, width, height){
        super(x, y, width, height); // vado a prendermi le stesse variabili di GameObject con ereditarietà
        this.speed = 10 // giocatore avrà una velocità per muoversi
        this.controller = {}; // controllo di true false per evitare di seguire una coda di eventi tra cui attesa etc etc
        this.projectiles = []; // proiettili
        this.attackCooldown = 10; // cooldown tra proiettili
    }
    draw(ctx){
        super.draw(ctx); // disegno il giocatore
        this.attackCooldown--;
        this.projectiles.forEach(projectile =>{ // disegno il proiettile, ciclando l'array e applicando il movimento
            projectile.draw(ctx);
            projectile.move();
        });
    }

    controls(){ // funzione per il movimento, wasd, dpad, mouse
        // document.onkeydown = (keyEvent) => {
        //     console.log("keyEvent", keyEvent); // funzione per rilevare se un bottone è schiacciato e lo logga. onkeydown = evento su tasto premuto. keyEvent = evento
        //     // al momento questo non tiene conto del bottone premuto
        //     if (keyEvent.key === "ArrowUp") { // se il tasto premuto è ArrowUp, spostati verso l'alto, ovvero l'origine, del valore della speed
        //         this.y -= this.speed; 
        //     }
        //     if (keyEvent.key === "ArrowDown") { // se il tasto premuto è ArrowUp, spostati verso il basso, ovvero lontano dall'origine
        //         this.y+= this.speed;
        //     }
        //     if (keyEvent.key === "ArrowLeft") {
        //         this.x-= this.speed;
        //     }
        //     if (keyEvent.key === "ArrowRight") {
        //         this.x+= this.speed;
        //     }

            document.onkeydown = (keyEvent) => { // evento per pressione
                console.log("keyEventDown", keyEvent);
                this.controller[keyEvent.key] = true; // true quando premiamo, se sarà sempre premuto il segnale sarà ConstantSourceNode, senza coda eventi

            }
            document.onkeyup = (keyEvent) => { // evento per rilascio
                console.log("keyEventUp", keyEvent);
                this.controller[keyEvent.key] = false; // false quando solleviamo
            }

            console.log("controller", this.controller); // loggo il controller, mi fa il controllo su ogni frame
            if (this.controller.ArrowUp) { // se il tasto premuto è ArrowUp, spostati verso l'alto, ovvero l'origine
                this.y = this.y > 0 ? (this.y - this.speed) : 0; // Se raggiungo lo 0 smetto di togliere, quindi blocco l'animazione
            }
            if (this.controller.ArrowDown) { // se il tasto premuto è ArrowUp, spostati verso il basso, ovvero lontano dall'origine
                this.y = this.y < (canvasHeight - this.height) ? (this.y + this.speed) : (canvasHeight - this.height); // se raggiungo il massimo della canvas con il bordo dell'oggetto smetto di togliere, quindi blocco animazione
            }
            if (this.controller.ArrowLeft) {
                this.x = this.x > 0 ? (this.x - this.speed) : 0;
            }
            if (this.controller.ArrowRight) {
                this.x = this.x < (canvasWidth - this.width) ? (this.x + this.speed) : (canvasWidth - this.width);
            }
            if (this.controller[" "] === true){ // La key della spacebar è uno spazio vuoto, devo controllare sulla stringa con lo spazio 
                this.baseAttack();
            }
        } 

    baseAttack(){
        if(this.attackCooldown <= 0){
            let projectile = new Projectile((this.x + (this.width/2) - 5), this.y, 10, 10) // l'attacco base spawnerà un proiettile, dal muso della nave, a metà. sua origine + metà della sua larghezza
            this.projectiles.push(projectile); // mettiamo nel nostro array proiettili il proiettile, cosi capiamo che sia del player
            this.attackCooldown = 10;
        }
    }
}

