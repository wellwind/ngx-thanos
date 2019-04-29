// to fix error: Cannot call a namespace ('html2canvas')
import * as html2canvas_ from 'html2canvas';
import { range } from 'ramda';

const html2canvas = html2canvas_;

const LAYERS = 32;
const TRANSITION_DURATION = 1.5;
const TRANSITION_DELAY = 1.35;

const sampler = (
  layerImages: ImageData[],
  sourceImgData: ImageData,
  width: number,
  height: number
) => {
  const layerCount = layerImages.length;
  const repeat = 2;
  range(0, width).forEach(x => {
    range(0, height).forEach(y => {
      range(0, repeat).forEach(n => {
        const pieceIndex = Math.floor(
          (layerCount * (Math.random() + (2 * x) / width)) / 3
        );
        const pixelPos = 4 * (y * width + x);
        for (let rgbaIndex = 0; rgbaIndex < 4; rgbaIndex++) {
          const dataPos = pixelPos + rgbaIndex;
          layerImages[pieceIndex].data[dataPos] = sourceImgData.data[dataPos];
        }
      });
    });
  });
};

const transformLayerCanvas = (canvas: HTMLCanvasElement) => {
  const rotate1 = 15 * (Math.random() - 0.5);
  const rotate2 = 15 * (Math.random() - 0.5);
  const fac = 2 * Math.PI * (Math.random() - 0.5);
  const translateX = 60 * Math.cos(fac);
  const translateY = 30 * Math.sin(fac);

  canvas.style.transform = `rotate(${rotate1}deg) translate(${translateX}px, ${translateY}px) rotate(${rotate2}deg)`;
  canvas.style.opacity = '0';

  const removeDelay = 1e3 * (TRANSITION_DURATION + 1 + Math.random());
  setTimeout(() => canvas.remove(), removeDelay);
};

// fix retina problem
// https://github.com/cburgmer/rasterizeHTML.js/blob/master/examples/retina.html
const backingScale = () => {
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }
  return 1;
};

export const thanosRewind = (target: HTMLElement) =>
  new Promise(resolve => {
    target.style.opacity = '1';
    target.style.visibility = 'visible';
    resolve();
  });

export const thanosSnap = (target: HTMLElement) =>
  new Promise<{ rewind: () => {} }>(resolve => {
    const effect = document.createElement('div');
    effect.classList.add('thanos');
    target.parentNode.insertBefore(effect, target);
    const targetRect = target.getBoundingClientRect();

    html2canvas(target).then((canvas: HTMLCanvasElement) => {
      const context = canvas.getContext('2d');
      effect.style.position = 'absolute';
      effect.style.left = targetRect.left + 'px';
      effect.style.top = targetRect.top + 'px';
      effect.style.width = targetRect.width + 'px';
      effect.style.height = targetRect.height + 'px';

      const { width, height } = canvas;

      // get element imageData
      const imgData = context.getImageData(0, 0, width, height);

      const layerImages = range(0, LAYERS).map(_ =>
        context.createImageData(width, height)
      );
      sampler(layerImages, imgData, width, height);

      layerImages.forEach((effectImage, index) => {
        const newCanvas = document.createElement('canvas');

        newCanvas.style.position = 'absolute';
        newCanvas.style.transition = `all ${TRANSITION_DURATION}s`;

        newCanvas.width = targetRect.width * backingScale();
        newCanvas.height = targetRect.height * backingScale();

        newCanvas.style.width = `${newCanvas.width / backingScale()}px`;
        newCanvas.style.height = `${newCanvas.height / backingScale()}px`;

        const newContext = newCanvas.getContext('2d');
        newContext.putImageData(effectImage, 0, 0);

        effect.appendChild(newCanvas);

        const transitionDelay = TRANSITION_DELAY * (index / layerImages.length);
        newCanvas.style.transitionDelay = `${transitionDelay}s`;

        setTimeout(() => transformLayerCanvas(newCanvas), 0);
      });

      target.style.transition = `opacity ${TRANSITION_DURATION} ease`;
      target.style.opacity = '0';

      setTimeout(() => {
        target.style.visibility = 'hidden';
        effect.remove();
        resolve({
          rewind: () => thanosRewind(target)
        });
      }, 1e3 * TRANSITION_DURATION);
    });
  });
