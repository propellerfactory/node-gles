"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gles = require("../.");
var gl = gles.createWebGLRenderingContext();
var gl2 = gl;
gl.viewport(0, 0, 1, 1);
function drawQuad(program, positionAttribName, positionAttribZ, positionAttribXYScale) {
    var previousBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
    var positionLocation = gl.getAttribLocation(program, positionAttribName);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, previousBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.disableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 4, gl.FLOAT, false, 0, 0);
}
var samplingVs = 'attribute vec4 position;\n' +
    'varying vec2 texcoord;\n' +
    'void main()\n' +
    '{\n' +
    '    gl_Position = vec4(position.xy, 0.0, 1.0);\n' +
    '    texcoord = (position.xy * 0.5) + 0.5;\n' +
    '}\n';
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, samplingVs);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.log('shader compile failure: ' + gl.getShaderInfoLog(vertexShader));
}
var samplingFs = 'precision mediump float;\n' +
    'uniform sampler2D tex;\n' +
    'uniform vec4 subtractor;\n' +
    'varying vec2 texcoord;\n' +
    'void main()\n' +
    '{\n' +
    '    vec4 color = texture2D(tex, texcoord);\n' +
    '    if (abs(color.r - subtractor.r) +\n' +
    '        abs(color.g - subtractor.g) +\n' +
    '        abs(color.b - subtractor.b) +\n' +
    '        abs(color.a - subtractor.a) < 8.0)\n' +
    '    {\n' +
    '        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
    '    }\n' +
    '    else\n' +
    '    {\n' +
    '        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '    }\n' +
    '}\n';
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, samplingFs);
gl.compileShader(fragmentShader);
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log('program link failure: ' + gl.getProgramInfoLog(program));
}
gl.useProgram(program);
var renderbuffer = gl.createRenderbuffer();
gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
gl.renderbufferStorage(gl.RENDERBUFFER, gl2.RGBA8, 1, 1);
var framebuffer = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, renderbuffer);
var oes_ext = gl.getExtension('OES_texture_half_float');
var texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
var texData = new Float32Array([0, 1, 2, 3]);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, oes_ext.HALF_FLOAT_OES, texData);
gl.uniform1i(gl.getUniformLocation(program, 'tex'), 0);
var floatData = new Float32Array([7000.0, 100.0, 33.0, -1.0]);
gl.uniform4fv(gl.getUniformLocation(program, 'subtractor'), floatData);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
drawQuad(program, 'position', 0.5, 1.0);
