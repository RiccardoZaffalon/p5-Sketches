let particles = [];
let amp;
let colorList = [];
let colorCSSList = [];
let c_a, c_b;
let song;

function preload() {
  song = loadSound('this.mp3');
}

const grad = document.getElementById('gradient');

function setup() {
	amp = new p5.Amplitude();
	song.loop();
	createCanvas(800, 600);
	getColors();
}

function draw() {
	background(255);
	let vol = amp.getLevel()*10;
	for (let i = 0; i < 4; i++) {
		n = Math.floor(random(6));
		let color = colorList[n];
		let p = new Particle(vol*vol*0.5, vol*vol*0.5, vol*5+5, color);
		particles.push(p);
	}
	for (let i = particles.length-1; i > 0; i--) {
		particles[i].show();
		particles[i].update(vol);
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

	update(vol) {
		this.x += this.vx;
		this.y += this.vy;
		// Gravity
		this.vy += 0.025;
		this.alpha--;
		this.s = map(this.s*vol, 0, 500, 8, 96)*random(0.9,1.1);
	}

	finished() {
		return this.alpha <= 0;
	}

}

function getColors() {
	colorList = [];
	colorCSSList = [];
	c_a = chroma.random();
	c_b = chroma.random();
	let colors = chroma.scale([c_a, c_b]).mode('lch').colors(6);
	colors.map((c) => {
		colorList.push(chroma(c).rgb());
		colorCSSList.push(chroma(c).hex());
	})
	setBG(grad, "background", `linear-gradient(to right, ${colorCSSList[0]}, ${colorCSSList[1]}, ${colorCSSList[2]}, ${colorCSSList[3]}, ${colorCSSList[4]}, ${colorCSSList[5]})`);
}

function update(jscolor) {
    // 'jscolor' instance can be used as a string
    console.log(jscolor)
}

const pause = document.getElementById('pause');

pause.addEventListener('click', e => {
	e.preventDefault();
	if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.pause();
    pause.innerText = '► Start song';
  } else {
    song.play();
    pause.innerText = '❚❚ Pause song';
  }
})

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