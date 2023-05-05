class BaseEnemy extends GameObject{
    constructor(x,y,width,height, color = 'red', imageUrl){
        super(x,y,width,height, color, imageUrl);
        this.speed = 3;
        this.healthPoints = 3;
    }
    
    move(canvasWidth, canvasHeight){
        this.y += this.speed;
        if (this.y > canvasHeight) {
            this.isAlive = false;
        }
    }

    collision(){
        this.healthPoints--;
        if (this.healthPoints <= 0) {
            this.isAlive = false;
        }
    }
}