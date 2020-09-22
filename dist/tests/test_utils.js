"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initEnvGL(gl) {
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.STENCIL_TEST);
    gl.disable(gl.BLEND);
    gl.disable(gl.DITHER);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.disable(gl.SAMPLE_COVERAGE);
    gl.enable(gl.SCISSOR_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var coords = new Float32Array([
        -1.0, 1.0, 0.0, 0.0, 1.0, -1.0, -1.0, 0.0, 0.0, 0.0,
        1.0, 1.0, 0.0, 1.0, 1.0, 1.0, -1.0, 0.0, 1.0, 0.0
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    var indices = new Uint16Array([0, 1, 2, 2, 1, 3]);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return [vertexBuffer, indexBuffer];
}
exports.initEnvGL = initEnvGL;
function createTexture2D(gl, internalFormat, format, type) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 1, 1, 0, format, type, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
}
exports.createTexture2D = createTexture2D;
function ensureFramebufferAttachment(gl) {
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status != gl.FRAMEBUFFER_COMPLETE) {
        if (status === gl.FRAMEBUFFER_COMPLETE) {
            console.log('FRAMEBUFFER_COMPLETE');
        }
        else if (status === gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT) {
            console.log('FRAMEBUFFER_INCOMPLETE_ATTACHMENT');
        }
        else if (status === gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT) {
            console.log('FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT');
        }
        else if (status === gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS) {
            console.log('FRAMEBUFFER_INCOMPLETE_DIMENSIONS');
        }
        else if (status === gl.FRAMEBUFFER_UNSUPPORTED) {
            console.log('FRAMEBUFFER_UNSUPPORTED');
        }
        else {
            console.error('Unknown error');
        }
        throw new Error('Exception binding to framebuffer!');
    }
}
exports.ensureFramebufferAttachment = ensureFramebufferAttachment;
