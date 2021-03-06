

/*<script id="shaderVs" type="x-shader/x-vertex"> /*Vertext Shader*/
void main() {
  gl_Position = vec4(0.5, 0.3, 0.0, 1.0);
  gl_PointSize = 20.0;
}
/*<script id="shaderFs" type="x-shader/x-fragment"> /*Fragment Shader*/
void main() {
  gl_FragColor = vec4(49.0/252.0, 51.0/252.0, 74.0/252.0, 1.0);
}

function init() {
  console.log('init...');

  /* 2D canvas */
  var canvas = document.getElementById("myCanvas2D");
  var context = canvas.getContext("2d");
  context.moveTo(0, 0); /*Pencil place - FROM*/
  context.lineTo(200, 200); /*Pencil place - TO*/
  context.lineWidth=10;
  context.strokeStyle='white';
  context.stroke();
  /* 3D canvas */
  // Get canvas object from the DOM
  var canvas3D = document.getElementById("myCanvas3D");
  //0 Init WebGL context
  var gl = myCanvas3D.getContext("webgl");
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }
  // Clear canvas
  gl.clearColor(40.0/252.0, 40.0/252.0, 62.0/252.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Init shaders
  var vs = document.getElementById('shaderVs').innerHTML;
  var fs = document.getElementById('shaderFs').innerHTML;
  if (!initShaders(gl, vs, fs)) {
    console.log('Failed to intialize shaders.');
  return;
  }
  // Draw
  gl.drawArrays(gl.POINTS, 0, 1);
}

function initShaders(gl, vs_source, fs_source) {
  // Compile shaders
  var vertexShader = makeShader(gl, vs_source, gl.VERTEX_SHADER);
  var fragmentShader = makeShader(gl, fs_source, gl.FRAGMENT_SHADER);
  // Create program
  var glProgram = gl.createProgram();
  // Attach and link shaders to the program
  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);
  gl.linkProgram(glProgram);
  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program");
    return false;
  }
  // Use program
  gl.useProgram(glProgram);
  gl.program = glProgram;
  return true;
}

function makeShader(gl, src, type) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
    return;
  }
  return shader;
}
