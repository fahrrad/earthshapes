 $fn=50;
 module earthsphere (width, height, angle) {
 scale([1,width,1]){
     linear_extrude(height = height, center = true, convexity = 10,
scale=angle) {
        translate([0, 0, 0]){
            circle(r = 4);
            }
        }
    }
 }

module hollow_earthsphere(width, height, angle) {
    difference(width, height, angle) {
        earthsphere(width, height, angle);
        translate([0,0,1])
        earthsphere(width, height, angle);
    }
}


hollow_earthsphere(0.5,10,2);