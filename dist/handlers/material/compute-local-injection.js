"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_icon_content_1 = require("./get-icon-content");
const compute_local_icon_template_1 = require("./compute-local-icon-template");
const compute_injection_1 = require("../compute-injection");
exports.computeLocalInjection = compute_injection_1.computeInjection(get_icon_content_1.getIconContent, compute_local_icon_template_1.computeLocalIconTemplate);
