const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'pink';



class Ball {
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random() * 100 + 30;
        this.x = this.radius * 2 + (Math.random() * (this.effect.width - this.radius * 4));
        this.y =  -this.radius;
        this.speedX = Math.random() * 0.5 - 0.2;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.angle = 0;
        this.va = Math.random() *0.1 - 0.05;
        this.range = Math.random () * 30;
        this.gravity = Math.random() * 0.005;
        this.vy = 0;
    }
    update(){
        if (this.x < this.radius || this.x > this.effect.width - this.radius) this.speed *= -1;
        if ( this.y > this.effect.height - this.radius){
            this.radius = Math.random() * 120 + 30;
            this.y = -this.radius;
            this.vy = 0;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.x = this.radius * 2 + (Math.random() * (this.effect.width - this.radius * 4));
            this.y =  -this.radius;
        }
        if (this.y > this.radius * 2){
            this.vy += this.gravity;
            this.speedY += this.vy;
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
    reset(){
        this.x = this.effect.width * 0.5;
        this.y = this.effect.height * 0.5;
    }
}

class MetaballsEffects {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.metaballsArray = [];
    }
    init(numberOfBalls){
        for (let i = 0; i < numberOfBalls; i++){
            this.metaballsArray.push(new Ball(this));
        }
    }
    update(){
        this.metaballsArray.forEach(metaball => metaball.update());

    }
    draw(context){
        this.metaballsArray.forEach(metaball => metaball.draw(context));
    }
    reset(newWidth, newHeight){
        this.width = newWidth;
        this.height = newHeight;
        this.metaballsArray.forEach(metaball => metaball.reset())
    }

}

const effect = new MetaballsEffects(canvas.width, canvas.height);
effect.init(20);


function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    effect.update();
    effect.draw(ctx);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = 'white';
    effect.reset(canvas.width, canvas.height);
})