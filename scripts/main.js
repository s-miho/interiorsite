document.addEventListener('DOMContentLoaded', function() {
  const slider = new Slider;
  const mobilemenu = new MobileMenu;
  viewSlide('.service img');
  new Main;
});


//携帯用メニュー

class MobileMenu {
  constructor() {
    this.DOM = {};
    this.DOM.btn = document.querySelector('.mobile-menu__btn');
    this.DOM.cover = document.querySelector('.mobile-menu__cover');
    this.DOM.container = document.querySelector('#global-container');
    this.eventType = this._getEventType();
    this._addEvent();
    
  }
  _getEventType() {
    return window.ontouchstart ? 'touchstart' : 'click';
  }

  _toggle() {
    this.DOM.container.classList.toggle('menu-open');
  }

  _addEvent() {
    this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
  }
}


//スライダー
class Slider {
  constructor() {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      grabCursor: true,
      speed: 2000,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false
      }
    });
  }
}


//ローダー
Pace.on('start', function() {
  const paceProgressInner = document.querySelector('.pace-progress-inner');
  paceProgressInner.innerHTML = '<div></div><div></div><div></div><div></div><div></div>';
});


//serviceの画像スライド
function viewSlide(className, slideNo = -1) {
	let imgArray = document.querySelectorAll(className);
	if (slideNo >= 0) {
		imgArray[slideNo].style.opacity = 0;
	}
	slideNo++;
	if (slideNo >= imgArray.length) {
		slideNo = 0; 
	}
	imgArray[slideNo].style.opacity = 1;
	setTimeout(function(){viewSlide(className, slideNo);}, 3000);
}


//メイン

class Main {
  constructor() {
    this.sides = document.querySelectorAll('.side');
    this._init();
    
  }
  _init() {
    Pace.on('done', this._paceDone.bind(this));
  }

  _paceDone() {
    this._scroll();
  }

  _sideAnimation(el, inview) {
    if(inview) {
      this.sides.forEach(side => side.classList.add('inview'));
    } else {
      this.sides.forEach(side => side.classList.remove('inview'));
    }
  }

  _inviewAnimation(el, inview) {
    if(inview) {
        el.classList.add('inview');
    } else {
        el.classList.remove('inview');
    }
  }

  _textAnimation(el, inview) {
    if(inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    } 
  } 

  _scroll() {
    new ScrollObserver('.main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-350px 0px"});
    new ScrollObserver('.appear', this._inviewAnimation.bind(this), {rootMargin: "0px 0px -200px 0px"});
    new ScrollObserver('.img-cover', this._inviewAnimation.bind(this), {rootMargin: "0px 0px -200px 0px"});
    new ScrollObserver('.img-show', this._inviewAnimation.bind(this), {rootMargin: "0px 0px -200px 0px"});
    new ScrollObserver('.tween-animate-title', this._textAnimation, {rootMargin: "0px 0px -200px 0px"});
  }
}

