"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gles = require("../.");
var test_utils_1 = require("./test_utils");
var gl = gles.createWebGLRenderingContext();
console.log('VERSION: ' + gl.getParameter(gl.VERSION));
console.log('RENDERER: ' + gl.getParameter(gl.RENDERER));
var ext = gl.getExtension('OES_texture_half_float');
gl.getExtension('EXT_color_buffer_half_float');
test_utils_1.initEnvGL(gl);
var texture = test_utils_1.createTexture2D(gl, gl.RGBA, gl.RGBA, ext.HALF_FLOAT_OES);
gl.bindTexture(gl.TEXTURE_2D, texture);
var values = new Float32Array([0.5, 1.5, 2.5, 3.5]);
gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 1, 1, gl.RGBA, gl.FLOAT, values);
var framebuffer = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
test_utils_1.ensureFramebufferAttachment(gl);
var buffer = new Float32Array(4);
gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.FLOAT, buffer);
console.log('buffer: ', buffer);
