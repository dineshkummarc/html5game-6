window.onload = function () {
	
	Crafty.init(600,300);
	Crafty.background('rgb(127,127,127)');
	
	// paddle
	Crafty.e("paddle,2D,DOM,Color,Multiway")
		.color('rgb(255,0,0)')
		.attr({w:50, h:10, x:275, y:290})
		.multiway(8, {A: 180, D:0})
		.bind('EnterFrame', function () {
			// constraint paddle in the boundary
			if (this.x <= 0) {
				this.x = 0;
			}
			
			if (this.x >= 550) {
				this.x = 550;
			}
		});
	
	// ball
	Crafty.e("ball,2D,DOM,Color,Collision")
		.color('rgb(0,255,0)')
		.attr({w:10, h:10, x:300, y:150,
			   dX: Crafty.math.randomInt(2, 4),
			   dY: Crafty.math.randomInt(3, 4) })
	    .bind('EnterFrame', function () {
	    	// if hit left/right wall
	    	if (this.x <= 0 || this.x >=590) {
	    		this.dX *= -1;
	    	}
	    	
	    	if (this.y <= 0) {
	    		this.dY *= -1;
	    	}
	    	
	    	if (this.y >= 295) {
	    		this.x = 300;
	    		this.y = 150;
	    		this.dX = Crafty.math.randomInt(3, 4);
	    		this.dY = Crafty.math.randomInt(3, 4);
	    	}
	    	
	    	this.x += this.dX;
			this.y += this.dY;
	    })
	    .onHit('paddle', function () {
	    	this.y = 280;
	    	this.dY *= -1;
	    })
	    .onHit('bricks', function() {
	    	this.dY *= -1;
	    });
	
	// bricks
	var j = 0;
	var i = 0;
	var count = 0;
	while (count < 60) {
		
		var posX = i*35 + (i+1)*5;
		var posY = j*20 + (j+1)*5;
		
		if (posX > 600) {			
			i = 0;
			j += 1;
			posX = i*35 + (i+1)*5;
			posY = j*20 + (j+1)*5;	
		}
		
		i++;
		count++;
		
		Crafty.e("bricks,2D,DOM,Color,Collision")
			.color("rgb(23,45,255)")
			.attr({w:35, h:20, x:posX, y:posY})
			.onHit("ball",function(){
				this.destroy();
			});
	};
	
};