var Sprite = function(name, painter, behaviors){
    if(name != undefined) this.name = name;
    if(painter != undefined) this.painter = painter;
    this.x=0;
    this.y=0;
    this.vx=0;
    this.vy=0;
    this.mass = 0;
    this.top = 0;
    this.left = 0;
    this.width=  .5;
    this.height = .5;
    this.velocityX = 0;
    this.velocityY = 0;
    this.opacity = .5;
    this.visible = true;
    this.animating = false;
    this.behaviors = behaviors || [];
}

Sprite.prototype = {
    paint: function(context){
        if(this.painter != undefined && this.visible){
            this.painter.paint(this, context);
        }
    },
    update: function(context){
        for(var i = 0; i < this.behaviors.length; i ++ ){
            this.behaviors[i].execute(this, context, time);
        }
    }
}