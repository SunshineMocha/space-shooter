class GameObject{
    constructor(x, y, width, height){
        // costruire un sistema di ereditarietà in cui qualsiasi elemento che infiliamo nel mondo di gioco erediti da game object, quindi cerchiamo di capire quali sono le caratteristiche in comune
        // tutti avranno una posizione x y e una grandezza di partenza
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // tutti i giochi devono avere un motore rendering, in questo caso draw per js
    draw(ctx){
        ctx.fillStyle = "white"; // diamo uno stile all'oggetto
        ctx.fillRect(this.x, this.y, this.width, this.height); // diamo i parametri per disegnare
    }
}