window.onload = function () {
	
	Crafty.init(600,300);
	
	// paddle
	Crafty.e("paddle,2D,DOM,Color,Multiway")
		.color('rgb(255,0,0)')
		.attr({w:50, h:10, x:275, y:290})
		.multiway(4, {A: 180, D:0})
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
			   dX: Crafty.math.randomInt(2, 5),
			   dY: Crafty.math.randomInt(2, 5) })
	    .bind('EnterFrame', function () {
	    	// if hit left/right wall
	    	if (this.x <= 0 || this.x >=590) {
	    		this.dX *= -1;
	    	}
	    	
	    	if (this.y <= 0 || this.y >=290) {
	    		this.dY *= -1;
	    	}
	    	
	    	this.x += this.dX;
			this.y += this.dY;
	    })
	    .onHit('paddle', function () {
	    	this.dY = Crafty.math.randomInt(2, 5)
	    	this.dY *= -1;
	    });
	
};