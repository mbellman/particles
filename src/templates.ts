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

    button {
      background-color: #036;
      border: 0;
      border-bottom: 2px solid #002;
      outline: 1px solid #458;
      color: #fff;
      cursor: pointer;
      transition: all 0.1s;
    }

    button:hover {
      background-color: #147;
    }

    button[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
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
      font-size: 20px;
      font-weight: bold;
      padding: 15px 10px;
      width: 100%;
    }
  `,
  init($root) {
    $root.find('.add-button').on('click', () => {
      addParticleFamily();

      ParticlePanelTemplate.place('.particle-panels-container');
    });
  }
});

export const ParticlePanelTemplate = createTemplate({
  html: `
    <div class="particle-panel">
      <div class="field">Name: <input name="name"></div>
      <div class="field">Color: <input name="color"></div>
      <div class="buttons">
        <button class="edit-button">
          Edit Behavior
        </button>
        <button class="save-button" disabled>
          Save
        </button>
      </div>
    </div>
  `,
  init($root) {
    $root.find('input').on('change', () => {
    });
  },
  css: `
    @keyframes open {
      from {
        height: 0px;
      }
      to {
        height: 120px;
      }
    }

    .particle-panel {
      animation: open 0.3s ease-in-out;
      border-bottom: 1px solid #fff;
      box-sizing: border-box;
      color: #fff;
      font-family: Arial;
      height: 120px;
      overflow: hidden;
      padding: 0 10px;
      width: 100%;
    }

    .field {
      margin: 10px 10px 0;
    }

    input {
      background-color: #013;
      border: 1px solid #fff;
      color: #fff;
    }

    .buttons {
      display: flex;
      margin-top: 10px;
    }

    .edit-button,
    .save-button {
      margin: 0 5px;
      padding: 10px;
      width: 50%;
    }
  `
});