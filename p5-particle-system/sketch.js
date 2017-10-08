let particles = [];
let mic;
let colorList = [];
let colorCSSList = [];
let c_a, c_b;

const grad = document.getElementById('gradient');

function setup() {
	mic = new p5.AudioIn();
	mic.start();
	createCanvas(800, 600);
	c_a = chroma.random();
	c_b = chroma.random();
	let colors = chroma.scale([c_a, c_b]).mode('lch').colors(6);
	colors.map((c) => {
		colorList.push(chroma(c).rgb());
		colorCSSList.push(chroma(c).hex());
	})
	setBG(grad, "background", `linear-gradient(to right, ${colorCSSList[0]}, ${colorCSSList[1]}, ${colorCSSList[2]}, ${colorCSSList[3]}, ${colorCSSList[4]}, ${colorCSSList[5]})`);
}

function draw() {
	background(255);
	for (let i = 0; i < 4; i++) {
		let vol = mic.getLevel()*10;
		n = Math.floor(random(6));
		let color = colorList[n];
		let p = new Particle(vol*vol*0.5, vol*vol*0.5, vol*5+5, color);
		particles.push(p);
	}
	for (let i = particles.length-1; i > 0; i--) {
		particles[i].show();
		particles[i].update();
		if (particles[i].finished()){
			particles.splice(i, 1);
		}
	}
}

class Particle {

	constructor(vx, vy, s = 16, color) {
		this.x = width/2;
		this.y = height/2;
		this.s = s;
		this.alpha = 225;
		this.vx = (vx + 1) * random(-1,1);
		this.vy = (vy + 1) * random(-1,1);
		this.r = color[0];
		this.g = color[1];
		this.b = color[2];
	}

	show() {
		noStroke();
		fill(this.r,this.g,this.b, this.alpha);
		ellipse(this.x, this.y, this.s);
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
		// Gravity
		this.vy += 0.025;
		this.alpha--;
	}

	finished() {
		return this.alpha <= 0;
	}

}

function setBG(elm, prop, value) {
	var prefixes = ['-moz-', '-webkit-', '-o-', '-ms-', '-khtml-'];
	var i, v, starting;
	elm.style[prop] = "";
	starting = elm.style[prop];
	try {
			elm.style[prop] = value;
			if (elm.style[prop] !== starting) {					
				return;
			}
	}
	catch (e) {
	}
	for (i = 0; i < prefixes.length; ++i) {
			v = prefixes[i] + value;
			try {
					elm.style[prop] = v;
					if (elm.style[prop] !== starting) {
							console.log("Prefix: " + prefixes[i]);
							return;
					}
			}
			catch (e2) {
			}
	}
}