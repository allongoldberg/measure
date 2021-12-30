let s=0
let arr = []
let arrcopy = []
let wW, wH, t0, dt
let res

function setup() {
  wW = windowWidth
  wH = wW/1.433
  
  createCanvas(wW, wH)
  
  c = createGraphics(wW, wH, WEBGL)

  
  b1 = loadImage('Assets/bkg1.png')
  b2 = loadImage('Assets/bkg2.png')
  b3 = loadImage('Assets/bkg3.png')
  
  meas = createButton('MEASURE')
  angle = createInput()
  angle.position(wW/2, wH/3)
  angle.size(wW/3,wH/10)
  gg = wW/24
  angle.style('font-size', gg+'px')
  angle.style('text-align', 'center')
  angle.style('color', '#89cef1')
  
  reset = createButton('Reset')
  
}

function draw() {
  
  if (s==0){
    background(0)
    background(b1)
    noStroke()
    bfs = wW/36
    meas.style('background-color', '#89cef1')
    meas.style('font-size', bfs+'px')
    meas.style('color', '#fff')
    meas.style('border-color', '#fff')
    meas.style('font-weight', 'bold')
    meas.size(wW/6, wW/20)
    meas.position(wW/2-40, 2*wH/3)
    meas.mousePressed(sceneup)
    reset.hide()
    textStyle(BOLD)
    textAlign(RIGHT, BASELINE)
    push()
    push()
    translate(20,20)
    pop()
    textSize(wW/28)
    fill(255)
    text('SUPERPOSITION ANGLE θ:', wW/4, wH/3, wW/4)
    pop()
    for (let i=0; i<100;i++){
      arr[i] = 0
    }
  }
  
  else if (s==1){
    background(255)
    background(b2)
    dt = second()-t0 
    if (dt > 2.4){
      sceneup2()
    }
    c.background(0)
    c.image(b2,-wW/2,-wH/2,wW,wH)
    //https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5#lights-and-materials
    c.pointLight(255, 255, 255, mouseX, mouseY, 1000)
    c.specularMaterial(163, 224, 252)
    c.strokeWeight(0)
    c.push()
    c.translate(0,0,160)
    c.rotateZ(PI/2)
    c.rotateX(frameCount * 0.09)
    c.cylinder(wW/11, wW/220)
    c.pop()
    image(c,0,0)
    c.clear()
    textSize(wW/11)
    textAlign(CENTER, CENTER)
    fill(137, 206, 241)
    text('MEASURING', wW/2, wH/2)
    textSize(wW/50)
    textAlign(CENTER, CENTER)
    fill(0)
    text('IF THIS TAKES MORE THAN A FEW SECONDS REFRESH', wW/2, 30*wH/31)
  }
  
  else if (s==2){
    background(255)
    background(b3)
    reset.show()
    reset.style('background-color', '#89cef1')
    reset.style('font-size', bfs+'px')
    reset.style('color', '#fff')
    reset.style('border-color', '#fff')
    reset.style('font-weight', 'bold')
    reset.size(wW/10, wW/20)
    reset.position(wW/2.23,7.08*wH/8)
    reset.mousePressed(sceneup3)
    fill(255)
    noStroke()
    rectMode(RADIUS);
    rect(wW/2, wW/3, wW/4, wW/4, wW/10)
    textSize(wW/3)
    textAlign(CENTER, CENTER)
    fill(137, 206, 252)
    text(res, wW/2, wH/2)
  }
}


function sceneup(){
  s++
  s=s%3
  meas.hide()
  angle.hide()
  t0 = second()
  th = angle.value()
  let p = (1-sq(cos(radians(th/2))))*100
  for (let i=0; i<=p;i++){
    arr[i] = 1
  }
}


function sceneup2(){
  s++
  s=s%3
  res = random(arr)
  console.log(res)
}


function sceneup3(){
  s++
  s=s%3
  meas.show()
  angle.value('')
  angle.show()
  t0 = second()
}