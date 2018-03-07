const three = THREE;

let renderer, scene, camera;
const loader = new three.JSONLoader();

const models = {};
const carsFilepath = {
  audi: '/static/models/audi.json'
};
const wheelsFilepath = {
  enkei: '/static/models/enkei.json',
  oz: '/static/models/oz.json',
  vossen: '/static/models/vossen.json'
};

const defaultCar = 'audi';
const defaultWheel = 'vossen';

const colors = {
  primaryColor: '#1E1E24',
  secondColor: '#FFF8F0',
  exColor1: '#111D4A',
  exColor2: '#FFCF99',
  exColor3: '#92140C',
};

const defaultOpts = {
  pX: 0,
  pY: -100,
  pZ: 0,

  rX: 0,
  rY: 0,
  rZ: 0,

  color: colors.exColor2,

  name: 'default'
};

const opts = {
  wheel_1: Object.assign({}, defaultOpts),
  wheel_2: Object.assign({}, defaultOpts),
  wheel_3: Object.assign({}, defaultOpts),
  wheel_4: Object.assign({}, defaultOpts)
};

opts.wheel_1.pX = -50;
opts.wheel_1.name = 'wheel_1';

opts.wheel_2.pX = -250;
opts.wheel_2.name = 'wheel_2';

opts.wheel_3.pX = -50;
opts.wheel_3.pZ = 280;
opts.wheel_3.name = 'wheel_3';

opts.wheel_4.pX = -250;
opts.wheel_4.pZ = 280;
opts.wheel_4.name = 'wheel_4';

const render = () => {
  renderer.render(scene, camera)
};

const init = () => {

  renderer = new three.WebGLRenderer({antialias: true});
  renderer.context.getShaderInfoLog = () => '';
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(colors.secondColor, 1);
  document.getElementById('scene').appendChild(renderer.domElement);

  scene = new three.Scene();

  camera = new three.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.2, 25000);
  camera.position.set(1500, 500, 500);
  scene.add(camera);
  render();

  const controls = new three.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.enablePan = false;
  controls.enableZoom = false;

  const light_1 = new three.PointLight(0xffffff, 1, 4000);
  light_1.position.set(50, 150, 0);
  const light_2 = new three.PointLight(0xffffff, 1, 4000);
  light_2.position.set(250, 500, 500);
  const lightAmbient = new three.AmbientLight(0x404040);
  scene.add(light_1, light_2, lightAmbient);

  loadOneTypeModels(carsFilepath, defaultCar);
  loadOneTypeModels(wheelsFilepath, defaultWheel, 'wheels');

  setTimeout(() => render(), 250);

  window.addEventListener('resize', onWindowResize, false)
};

const loadOneTypeModels = (filepath, defaultModel, type) => {

  for (const id in filepath) {
    if (filepath.hasOwnProperty(id)) {
      loadModel(filepath, id).then((model) => {

        if (id === defaultModel) {

          switch (type) {
            case 'wheels':

              addWheelToScene(model);

              break;

            default:
              scene.add(model);
          }
        }
      })
    }
  }
};

const addWheelToScene = (model) => {

  const wheel_1 = model.clone();
  const wheel_2 = model.clone();
  const wheel_3 = model.clone();
  const wheel_4 = model.clone();

  setOpts(wheel_1, opts.wheel_1);
  setOpts(wheel_2, opts.wheel_2);
  setOpts(wheel_3, opts.wheel_3);
  setOpts(wheel_4, opts.wheel_4);

  scene.add(wheel_1, wheel_2, wheel_3, wheel_4);
};

const setOpts = (model, opts) => {

  model.name = opts.name;
  model.material.color.set(opts.color);
  model.position.x = opts.pX;
  model.position.y = opts.pY;
  model.position.z = opts.pZ;
  model.rotation.x = opts.rX;
  model.rotation.y = opts.rY;
  model.rotation.z = opts.rZ;
};

const onWindowResize = () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render()
};

const loadModel = (fpVar, name) => {

  return new Promise((resolve) => {

    loader.load(fpVar[name], (geometry) => {

      const material = new three.MeshPhongMaterial({
        flatShading: three.FlatShading,
        color: defaultOpts.color
      });

      const model = new three.Mesh(geometry, material);
      setOpts(model, defaultOpts);
      models[name] = model;

      resolve(model)
    })
  })
};

const getCurrentWheels = () => {

  return {
    wheel_1: scene.getObjectByName('wheel_1'),
    wheel_2: scene.getObjectByName('wheel_2'),
    wheel_3: scene.getObjectByName('wheel_3'),
    wheel_4: scene.getObjectByName('wheel_4')
  }
};

const removeWheels = () => {

  const wheels = getCurrentWheels();

  scene.remove(
    wheels.wheel_1,
    wheels.wheel_2,
    wheels.wheel_3,
    wheels.wheel_4
  )
};

const changeWheel = (wheel) => {

  removeWheels();

  addWheelToScene(models[wheel]);

  render()
};

const changeColor = (c) => {

  const color = colors[c];

  opts.wheel_1.color = color;
  opts.wheel_2.color = color;
  opts.wheel_3.color = color;
  opts.wheel_4.color = color;


  const wheels = getCurrentWheels();

  removeWheels();

  addWheelToScene(wheels.wheel_1);

  render()
};

window.onload = () => init();
