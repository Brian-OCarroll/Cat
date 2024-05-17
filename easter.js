// var this.boxes = document.getElementsByClassName('bounce')
var element = document.querySelectorAll('.bounce')[0];
// var this.box = $('.bounce')
var bg = document.getElementById('bg');

// document.onclick = function () {
//   let newBounce = `<div class="bounce"><img src="images/bounce.png" alt=""></div>`
//   bg.insertAdjacentHTML('beforeend', newBounce);

// }
let cats = ['chonk.png', 'hover.png', 'smile.png', 'mustache.png'];

document.onclick = function () {
  let cat = cats[cats.length * Math.random() | 0];
  // let newBounce = `<div class="bounce"></div>`
  var newBounce = document.createElement("div");
  var newImg = document.createElement('img')
  newImg.src = "./images/" + cat
  newBounce.appendChild(newImg)
  newBounce.className = 'bounce'
  bg.appendChild(newBounce);
  new Bounce(newBounce)
}
class Bounce {
  constructor(box) {
  this.box = box
    this.colors = ['#ff0000', '#ff4000', '#ff8000', '#ffbf00', '#ffff00', '#bfff00', '#80ff00', '#40ff00', '#00ff00', '#00ff40', '#00ff80', '#00ffbf', '#00ffff', '#00bfff', '#0080ff', '#0040ff', '#0000ff', '#4000ff', '#8000ff', '#bf00ff', '#ff00ff', '#ff00bf', '#ff0080', '#ff0040', '#ff0000']

    this.win = window;
    this.ww = this.win.innerWidth;
    this.wh = this.win.innerHeight;
    this.translateX = Math.floor((Math.random() * this.ww) + 1);
    this.translateY = Math.floor((Math.random() * this.wh) + 1);
    this.boxWidth = this.box.offsetWidth;
    this.boxHeight = this.box.offsetHeight;
    this.boxTop = this.box.offsetTop;
    this.boxLeft = this.box.offsetLeft;
    this.xMin = -this.boxLeft;
    this.yMin = -this.boxTop
    this.xMax = this.win.innerWidth - this.boxLeft - this.boxWidth;
    this.yMax = this.win.innerHeight - this.boxTop - this.boxHeight;
    this.request = null;
    this.direction = 'se';
    this.speed = 4;
    this.timeout = null;
    this.setStyle = this.setStyle.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.setLimits = this.setLimits.bind(this);
    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.init();
    this.resizeHandler = this.resizeHandler.bind(this)
    this.win.addEventListener('resize',this.resizeHandler, false);

  }
    init() {
    this.request = requestAnimationFrame(this.init);
    this.move();
    // setInterval(function() {
    //   move();
    // }, 16.66);
  }
  createElement() {
    document.createElement('div')
  }
  resizeHandler() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.update(), 100);
  }
  // reset constraints
  update() {
    this.xMin = -this.boxLeft;
    this.yMin = -this.boxTop;
    this.xMax = this.win.innerWidth - this.boxLeft - this.boxWidth;
    this.yMax = this.win.innerHeight - this.boxTop - this.boxHeight;
  }
  move() {
    this.setDirection();
    this.setStyle(this.box, {
      transform: 'translate3d(' + this.translateX + 'px, ' + this.translateY + 'px, 0)',
    });
  }
  setStyle(element, properties) {

    var prefix = this.getVendor(),
      property, css = '';
    for (property in properties) {
      css += property + ': ' + properties[property] + ';';
      css += prefix + property + ': ' + properties[property] + ';';
    }
    element.style.cssText += css;
  }
  setDirection() {
    switch (this.direction) {
      case 'ne':
        this.translateX += this.speed;
        this.translateY -= this.speed;
        break;
      case 'nw':
        this.translateX -= this.speed;
        this.translateY -= this.speed;
        break;
      case 'se':
        this.translateX += this.speed;
        this.translateY += this.speed;
        break;
      case 'sw':
        this.translateX -= this.speed;
        this.translateY += this.speed;
        break;
    }
    this.setLimits();
  }

  setLimits() {
    if (this.translateY <= this.yMin) {
      if (this.direction == 'nw') {
        this.direction = 'sw';
      } else if (this.direction == 'ne') {
        this.direction = 'se';
      }
      // this.switchColor();
    }
    if (this.translateY >= this.yMax) {
      if (this.direction == 'se') {
        this.direction = 'ne';
      } else if (this.direction == 'sw') {
        this.direction = 'nw';
      }
      // this.switchColor();
    }
    if (this.translateX <= this.xMin) {
      if (this.direction == 'nw') {
        this.direction = 'ne';
      } else if (this.direction == 'sw') {
        this.direction = 'se';
      }
      // this.switchColor();
    }
    if (this.translateX >= this.xMax) {
      if (this.direction == 'ne') {
        this.direction = 'nw';
      } else if (this.direction == 'se') {
        this.direction = 'sw';
      }
      // this.switchColor();
    }
  }

   getVendor() {
    var ua = navigator.userAgent.toLowerCase(),
      match = /opera/.exec(ua) || /msie/.exec(ua) || /firefox/.exec(ua) || /(chrome|safari)/.exec(ua) || /trident/.exec(ua),
      vendors = {
        opera: '-o-',
        chrome: '-webkit-',
        safari: '-webkit-',
        firefox: '-moz-',
        trident: '-ms-',
        msie: '-ms-',
      };
  
    return vendors[match[0]];
  };

  // switchColor() {
  //   var color = Math.floor((Math.random() * 25) + 1);
  
  //   while (color == this.currentColor) {
  //     color = Math.floor((Math.random() * 25) + 1)
  //   }
  
  //   this.setStyle(bg, {
  //     "background-color": this.colors[color]
  //   });
  
  //   this.currentColor = color;
  // }
}
let uno = new Bounce(element);

document.addEventListener('DOMContentLoaded', (event) => {
  var trck = document.getElementById("song");

  // Function to play the track
  function playtrack() {
      trck.play().catch(error => {
          console.log("Autoplay prevented: " + error);
          // Implement user interaction logic here, if needed
      });
  }

  // Autoplay with a user gesture fallback
  playtrack();

  // Reset currentTime to 0 when track ends to loop
  trck.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
  }, false);

  // Optional: Add a user gesture to start playing if autoplay fails
  document.addEventListener('click', () => {
      if (trck.paused) {
          playtrack();
      }
  });
});
