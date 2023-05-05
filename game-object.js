class GameObject{
    constructor(x, y, width, height, color = 'black', imageUrl){
        // costruire un sistema di ereditarietà in cui qualsiasi elemento che infiliamo nel mondo di gioco erediti da game object, quindi cerchiamo di capire quali sono le caratteristiche in comune
        // tutti avranno una posizione x y e una grandezza di partenza
        this.isAlive = true;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        if (imageUrl) {
            this.image = new Image(this.width, this.height);
            this.image.onload = () => {
                this.hasImage = true;
            }
            this.image.src = imageUrl;
        }
    }

    // tutti i giochi devono avere un motore rendering, in questo caso draw per js
    draw(ctx){
        if (this.hasImage) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        } else {
            ctx.fillStyle = this.color; // diamo uno stile all'oggetto
            ctx.fillRect(this.x, this.y, this.width, this.height); // diamo i parametri per disegnare
        }
    }

    isColliding(other){

        const isCollidingX = other.x < (this.x + this.width) && (other.x + other.width) > this.x;
        const isCollidingY = other.y < (this.y + this.height) && (other.y + other.height) > this.y;

        if (isCollidingX && isCollidingY) { // se la x del nemico è uguale alla x del giocatore piu la sua larghezza, c'è collisione etc etc
            return true
        } else {
            return false
        }
    }
}