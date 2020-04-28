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
    function createNodes(html) {
        var child = document.createElement('div');
        child.innerHTML = html;
        return [].slice.call(child.childNodes, 0);
    }
    function q(selector) {
        var elements;
        if (typeof selector === 'string') {
            elements = [].slice.call(document.querySelectorAll(selector), 0);
        }
        else {
            elements = selector;
        }
        return {
            __elements: elements,
            append: function (html) {
                elements.forEach(function (element) {
                    if (typeof html === 'string') {
                        createNodes(html).forEach(function (node) { return element.appendChild(node); });
                    }
                    else {
                        html.__elements.forEach(function (node) { return element.appendChild(node); });
                    }
                });
                return this;
            },
            find: function (selector) {
                var found = [];
                elements
                    .filter(function (element) { return !!element.querySelectorAll; })
                    .forEach(function (element) {
                    found = found.concat([].slice.call(element.querySelectorAll(selector), 0));
                });
                return q(found);
            },
            html: function (html) {
                elements.forEach(function (element) { return element.innerHTML = html; });
                return this;
            },
            on: function (eventName, handler) {
                elements
                    .filter(function (element) { return !!element.addEventListener; })
                    .forEach(function (element) { return element.addEventListener(eventName, handler); });
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
                var nodes = createNodes(html);
                var $root = q(nodes);
                q(target).append($root);
                if (init) {
                    init($root);
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
        state.families[targetIndex] = family;
    }
    exports.editParticleFamily = editParticleFamily;
});
define("templates", ["require", "exports", "dom", "system"], function (require, exports, dom_1, system_1) {
    "use strict";
    exports.__esModule = true;
    exports.AppTemplate = dom_1.createTemplate({
        html: "\n    <canvas id=\"canvas\"></canvas>\n    <div class=\"right-panel-container\"></div>\n  ",
        css: "\n    body {\n      background-color: #013;\n    }\n\n    button {\n      background-color: #036;\n      border: 0;\n      border-bottom: 2px solid #002;\n      outline: 1px solid #458;\n      color: #fff;\n      cursor: pointer;\n      transition: all 0.1s;\n    }\n\n    button:hover {\n      background-color: #147;\n    }\n\n    button[disabled] {\n      cursor: not-allowed;\n      opacity: 0.5;\n    }\n\n    .app {\n      border: 2px solid #fff;\n      border-radius: 10px;\n      height: 90%;\n      left: 5%;\n      overflow: hidden;\n      position: absolute;\n      top: 5%;\n      width: 90%;\n    }\n  ",
        init: function () {
            exports.RightPanelTemplate.place('.right-panel-container');
        }
    });
    exports.RightPanelTemplate = dom_1.createTemplate({
        html: "\n    <div class=\"right-panel\">\n      <div class=\"particle-panels-container\"></div>\n      <button class=\"add-button\">+</button>\n    </div>\n  ",
        css: "\n    .right-panel {\n      border-left: 1px solid #aaa;\n      height: 100%;\n      overflow: auto;\n      position: absolute;\n      right: 0;\n      top: 0;\n      width: 300px;\n    }\n\n    .add-button {\n      font-size: 20px;\n      font-weight: bold;\n      padding: 15px 10px;\n      width: 100%;\n    }\n  ",
        init: function ($root) {
            $root.find('.add-button').on('click', function () {
                system_1.addParticleFamily();
                exports.ParticlePanelTemplate.place('.particle-panels-container');
            });
        }
    });
    exports.ParticlePanelTemplate = dom_1.createTemplate({
        html: "\n    <div class=\"particle-panel\">\n      <div class=\"field\">Name: <input name=\"name\"></div>\n      <div class=\"field\">Color: <input name=\"color\"></div>\n      <div class=\"buttons\">\n        <button class=\"edit-button\">\n          Edit Behavior\n        </button>\n        <button class=\"save-button\" disabled>\n          Save\n        </button>\n      </div>\n    </div>\n  ",
        init: function ($root) {
            $root.find('input').on('change', function () {
            });
        },
        css: "\n    @keyframes open {\n      from {\n        height: 0px;\n      }\n      to {\n        height: 120px;\n      }\n    }\n\n    .particle-panel {\n      animation: open 0.3s ease-in-out;\n      border-bottom: 1px solid #fff;\n      box-sizing: border-box;\n      color: #fff;\n      font-family: Arial;\n      height: 120px;\n      overflow: hidden;\n      padding: 0 10px;\n      width: 100%;\n    }\n\n    .field {\n      margin: 10px 10px 0;\n    }\n\n    input {\n      background-color: #013;\n      border: 1px solid #fff;\n      color: #fff;\n    }\n\n    .buttons {\n      display: flex;\n      margin-top: 10px;\n    }\n\n    .edit-button,\n    .save-button {\n      margin: 0 5px;\n      padding: 10px;\n      width: 50%;\n    }\n  "
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
