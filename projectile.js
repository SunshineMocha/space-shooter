class Projectile extends GameObject{
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.speed = 15; // velocita del proiettile
    }

    move(){ // funzione di move
        this.y -= this.speed; // funzione di movimento automatico del proiettile, velocità costante su una sola direzione
    }
}