import { createTemplate, q } from './dom';
import { addParticleFamily } from './system';

export const AppTemplate = createTemplate({
  html: `
    <canvas id="canvas"></canvas>
    <div class="right-panel-container"></div>
  `,
  css: `
    body {
      background-color: #013;
    }

    .app {
      border: 2px solid #fff;
      border-radius: 10px;
      height: 90%;
      left: 5%;
      overflow: hidden;
      position: absolute;
      top: 5%;
      width: 90%;
    }
  `,
  init() {
    RightPanelTemplate.place('.right-panel-container');
  }
});

export const RightPanelTemplate = createTemplate({
  html: `
    <div class="right-panel">
      <div class="particle-panels-container"></div>
      <button class="add-button">+</button>
    </div>
  `,
  css: `
    .right-panel {
      border-left: 1px solid #aaa;
      height: 100%;
      overflow: auto;
      position: absolute;
      right: 0;
      top: 0;
      width: 300px;
    }

    .add-button {
      background-color: #036;
      border: 0;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      padding: 15px 10px;
      transition: all 0.1s;
      width: 100%;
    }

    .add-button:hover {
      background-color: #147;
    }
  `,
  init() {
    q('.add-button').on('click', () => {
      addParticleFamily();

      ParticlePanelTemplate.place('.particle-panels-container');
    });
  }
});

export const ParticlePanelTemplate = createTemplate({
  html: `
    <div class="particle-panel">

    </div>
  `,
  css: `
    @keyframes open {
      from {
        height: 0px;
      }
      to {
        height: 150px;
      }
    }

    .particle-panel {
      animation: open 0.3s ease-in-out;
      border-bottom: 1px solid #fff;
      height: 150px;
      width: 100%;
    }
  `
});