// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Demo {
    constructor(x,y,w,h) {
        Object.assign(this, {x,y,w,h});
        this.color = 0;
    };

    update() {
        this.color = this.color+20;
        if(this.color > 360){
            this.color = 0;
            gameEngine.addEntity(new Demo(this.x+this.w,this.y,this.w,this.h))
        }
    }

    draw(ctx) {
       // ctx.fillStyle = rgb(10,186,181);
       ctx.fillStyle = hsl(this.color,100,50);
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
};
