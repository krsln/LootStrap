/*!
  * Compiled on: 2024-04-06
  *
  * Lootstrap v24.4.3-beta.0 (https://krsln.github.io/Lootstrap/Overview)
  * Copyright 2019-2024 Qrsln
  * Licensed under MIT (https://github.com/krsln/Lootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lootstrap = factory());
})(this, (function () { 'use strict';

    // https://stackoverflow.com/questions/30074246/how-to-create-ripple-effect-on-click-material-design
    // color = `var(--ls-btn-ripple-bg, #fff)`

    class ImpulseStyleFactory {
      static ANIMATION_DEFAULT_DURATION = 1;
      static ANIMATION_DEFAULT_SIZE = 300;
      static ANIMATION_RATIO = ImpulseStyleFactory.ANIMATION_DEFAULT_DURATION / ImpulseStyleFactory.ANIMATION_DEFAULT_SIZE;
      static circleImpulseStyle(x, y, size, color = `var(--ls-btn-ripple-bg, #fff)`, duration = 1) {
        return {
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          borderRadius: `50%`,
          display: `inline-block`,
          pointerEvents: `none`,
          position: `absolute`,
          top: `${y - size / 2}px`,
          left: `${x - size / 2}px`,
          animation: `keyframesImpulse ${duration}s`
        };
      }
    }
    class Impulse {
      static service = new Impulse();
      static install(container) {
        Impulse.service.containerRegister(container);
      }
      static destroy(container) {
        Impulse.service.containerUnregister(container);
      }
      static applyToElement({
        x,
        y
      }, container) {
        Impulse.service.createImpulse(x, y, container);
      }
      constructor() {
        this.impulse_clickHandler = this.impulse_clickHandler.bind(this);
        this.impulse_animationEndHandler = this.impulse_animationEndHandler.bind(this);
        this.actives = new Map();
      }
      containerRegister(container) {
        container.addEventListener('click', this.impulse_clickHandler);
      }
      containerUnregister(container) {
        container.removeEventListener('click', this.impulse_clickHandler);
      }
      createImpulse(x, y, container) {
        let {
          clientWidth,
          clientHeight
        } = container;
        let impulse = document.createElement('div');
        impulse.addEventListener('animationend', this.impulse_animationEndHandler);
        let size = Math.max(clientWidth, clientHeight) * 2;
        let color = container.dataset.color;
        Object.assign(impulse.style, ImpulseStyleFactory.circleImpulseStyle(x, y, size, color));
        if (this.actives.has(container)) {
          this.actives.get(container).add(impulse);
        } else {
          this.actives.set(container, new Set([impulse]));
        }
        container.dataset.active = 'true';
        container.appendChild(impulse);
      }
      impulse_clickHandler({
        layerX,
        layerY,
        currentTarget: container
      }) {
        this.createImpulse(layerX, layerY, container);
      }
      impulse_animationEndHandler({
        currentTarget: impulse
      }) {
        let {
          parentNode: container
        } = impulse;
        this.actives.get(container).delete(impulse);
        if (!this.actives.get(container).size) {
          this.actives.delete(container);
          container.dataset.active = 'false';
        }
        container.removeChild(impulse);
      }
    }

    /*** Usage
     *  let impulses = document.querySelectorAll('.Btn-ripple');
     *  let impulseAll = Array.from(impulses);
     *
     *  impulseAll.forEach(Impulse.install);
     * */

    document.addEventListener("DOMContentLoaded", function () {
      // Code to be executed when the DOM is ready
      let impulses = document.querySelectorAll('.Btn-ripple');
      let impulseAll = Array.from(impulses);
      impulseAll.forEach(Impulse.install);
    });
    const Button = {
      ImpulseStyleFactory,
      Impulse
    };

    /**
     * --------------------------------------------------------------------------
     * Lootstrap index.umd.js
     * Licensed under MIT (https://github.com/krsln/Lootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    const index_umd = {
      Button
    };

    return index_umd;

}));
//# sourceMappingURL=lootstrap.js.map
