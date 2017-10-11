let x = 0;
let y = 0;
let s = 20;

function setup() {
	w = document.documentElement.clientWidth;
	h = document.documentElement.clientHeight;
	createCanvas(w,h)
	background(50, 65, 166);
	draw10p();
}
function draw(){

}
function draw10p() {
	x = 0;
	y = 0;
	let c_s = palette();
	let c_a = c_s[0];
	let c_b = c_s[1];
	background(c_a);
	let n = Math.ceil(((document.documentElement.clientWidth + s) / s) * ((document.documentElement.clientHeight + s) / s));
	for (let i = 0; i < n; i++) {
		stroke(c_b);
		if (random(1) < 0.5) {
			line(x,y,x+s,y+s);			
		} else {
			line(x,y+s,x+s,y);
		}
		x += s;
		if (x > width) {
			x = 0
			y += s;
		}
	}
}
function palette() {
	let found = false;
	let colors = [];
	let c_a, c_b;
	while (!found) {
		c_a = chroma.random();
		c_b = chroma.random();
		if(chroma.contrast(c_a, c_b) > 4.5) {
			found = true;
		}
	}
	colors.push(c_a.rgb());
	colors.push(c_b.rgb());
	return colors;
}