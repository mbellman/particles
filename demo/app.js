var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define("dom", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    ;
    ;
    ;
    function applyCss(css) {
        var tag = document.createElement('style');
        tag.type = 'text/css';
        tag.innerHTML = css;
        document.head.appendChild(tag);
    }
    function q(selector) {
        var elements = [].slice.call(document.querySelectorAll(selector), 0);
        return {
            append: function (html) {
                elements.forEach(function (element) {
                    var child = document.createElement('div');
                    child.innerHTML = html;
                    var nodes = [].slice.call(child.childNodes, 0);
                    nodes.forEach(function (node) { return element.appendChild(node); });
                });
                return this;
            },
            html: function (html) {
                elements.forEach(function (element) { return element.innerHTML = html; });
                return this;
            },
            on: function (eventName, handler) {
                elements.forEach(function (element) { return element.addEventListener(eventName, handler); });
                return this;
            }
        };
    }
    exports.q = q;
    function createTemplate(_a) {
        var html = _a.html, css = _a.css, init = _a.init;
        return {
            __hasBeenPlaced: false,
            place: function (target) {
                if (!this.__hasBeenPlaced) {
                    applyCss(css);
                    this.__hasBeenPlaced = true;
                }
                q(target).append(html);
                if (init) {
                    init();
                }
            }
        };
    }
    exports.createTemplate = createTemplate;
});
define("utilities", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function indexWhere(array, predicate) {
        for (var i = 0; i < array.length; i++) {
            if (predicate(array[i])) {
                return i;
            }
        }
        return -1;
    }
    exports.indexWhere = indexWhere;
    function replace(array, index, element) {
        return __spreadArrays(array.slice(0, index), [
            element
        ], array.slice(index + 1));
    }
    exports.replace = replace;
});
define("system", ["require", "exports", "utilities"], function (require, exports, utilities_1) {
    "use strict";
    exports.__esModule = true;
    ;
    ;
    ;
    var state = {
        families: [],
        particles: []
    };
    function addParticleFamily() {
        var totalFamilies = state.families.length;
        state.families.push({
            id: totalFamilies,
            name: "Particle" + totalFamilies
        });
    }
    exports.addParticleFamily = addParticleFamily;
    function editParticleFamily(family) {
        var targetIndex = utilities_1.indexWhere(state.families, function (_a) {
            var id = _a.id;
            return id === family.id;
        });
        state.families = utilities_1.replace(state.families, targetIndex, family);
    }
    exports.editParticleFamily = editParticleFamily;
});
define("templates", ["require", "exports", "dom", "system"], function (require, exports, dom_1, system_1) {
    "use strict";
    exports.__esModule = true;
    exports.AppTemplate = dom_1.createTemplate({
        html: "\n    <canvas id=\"canvas\"></canvas>\n    <div class=\"right-panel-container\"></div>\n  ",
        css: "\n    body {\n      background-color: #013;\n    }\n\n    .app {\n      border: 2px solid #fff;\n      border-radius: 10px;\n      height: 90%;\n      left: 5%;\n      overflow: hidden;\n      position: absolute;\n      top: 5%;\n      width: 90%;\n    }\n  ",
        init: function () {
            exports.RightPanelTemplate.place('.right-panel-container');
        }
    });
    exports.RightPanelTemplate = dom_1.createTemplate({
        html: "\n    <div class=\"right-panel\">\n      <div class=\"particle-panels-container\"></div>\n      <button class=\"add-button\">+</button>\n    </div>\n  ",
        css: "\n    .right-panel {\n      border-left: 1px solid #aaa;\n      height: 100%;\n      overflow: auto;\n      position: absolute;\n      right: 0;\n      top: 0;\n      width: 300px;\n    }\n\n    .add-button {\n      background-color: #036;\n      border: 0;\n      color: #fff;\n      cursor: pointer;\n      font-size: 20px;\n      font-weight: bold;\n      padding: 15px 10px;\n      transition: all 0.1s;\n      width: 100%;\n    }\n\n    .add-button:hover {\n      background-color: #147;\n    }\n  ",
        init: function () {
            dom_1.q('.add-button').on('click', function () {
                system_1.addParticleFamily();
                exports.ParticlePanelTemplate.place('.particle-panels-container');
            });
        }
    });
    exports.ParticlePanelTemplate = dom_1.createTemplate({
        html: "\n    <div class=\"particle-panel\">\n\n    </div>\n  ",
        css: "\n    @keyframes open {\n      from {\n        height: 0px;\n      }\n      to {\n        height: 150px;\n      }\n    }\n\n    .particle-panel {\n      animation: open 0.3s ease-in-out;\n      border-bottom: 1px solid #fff;\n      height: 150px;\n      width: 100%;\n    }\n  "
    });
});
define("index", ["require", "exports", "templates"], function (require, exports, templates_1) {
    "use strict";
    exports.__esModule = true;
    function main() {
        templates_1.AppTemplate.place('.app');
    }
    main();
});
