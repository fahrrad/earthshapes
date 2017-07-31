 $fn=50;
 module earthsphere (width, height, angle) {
 scale([1,1,1]){
     linear_extrude(height = height, center = true, convexity = 10,
scale=angle) {
        translate([0, 0, 0]){
            square(size = width, center=true
);
            }
        }
    }
 }

module hollow_earthsphere(width, height, angle) {
    difference(width, height, angle) {
        earthsphere(width, height, angle);
        translate([0,0,.2])
        scale([0.9,0.9,1])
        earthsphere(width, height, angle);
    }
}

translate([0,0,4]){
hollow_earthsphere(8,8,1
   );
}