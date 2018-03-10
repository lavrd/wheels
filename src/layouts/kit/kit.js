import React from "react";
import * as THREE from 'three';
import {
  carsFPath,
  colors,
  defaultCar,
  defaultOpts,
  defaultWheel,
  opts,
  wheelsFPath,
  windowSize
} from '../../utils/config';
import {Preloader} from '../../components';

const three = THREE;

class Kit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      renderer: null,
      scene: null,
      camera: null,
      models: {},
      pending: true,
      currentColor: null,
      currentWheel: defaultWheel
    };
  }

  async componentDidMount() {
    await this.init();
    await this.setState({pending: false});
    await document.getElementById('scene').appendChild(this.state.renderer.domElement);
    this.renderScene();
  }

  init = async () => {
    const renderer = new three.WebGLRenderer({antialias: true});
    renderer.context.getShaderInfoLog = () => '';
    renderer.setSize(windowSize.width, windowSize.height);
    renderer.setClearColor(colors.secondColor, 1);

    const scene = new three.Scene();

    const camera = new three.PerspectiveCamera(20, windowSize.width / windowSize.height, 0.2, 25000);
    camera.position.set(1500, 500, 500);
    scene.add(camera);

    const OrbitControls = require('../../utils/orbitControls')(THREE);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', this.renderScene);
    controls.enablePan = false;
    controls.enableZoom = false;

    const light_1 = new three.PointLight(0xffffff, 0.5, 10000);
    light_1.position.set(50, 150, 0);
    const light_2 = new three.PointLight(0xffffff, 0.5, 10000);
    light_2.position.set(250, 500, 500);
    const light_3 = new three.PointLight(0xffffff, 0.5, 10000);
    light_3.position.set(550, 500, 500);
    const light_4 = new three.PointLight(0xffffff, 0.5, 10000);
    light_3.position.set(-250, -500, -500);
    const lightAmbient = new three.AmbientLight(0x404040);
    scene.add(light_1, light_2, light_3, light_4, lightAmbient);

    await this.setState({renderer: renderer, scene: scene, camera: camera});
    await this.loadOneTypeModels(carsFPath, defaultCar);
    await this.loadOneTypeModels(wheelsFPath, defaultWheel, 'wheels');
    window.addEventListener('resize', this.onWindowResize, false);
  };

  loadOneTypeModels = async (fpath, defaultModel, type) => {
    for (const id in fpath) {
      if (fpath.hasOwnProperty(id)) {
        const model = await this.loadModel(fpath, id);
        if (id === defaultModel) {
          switch (type) {
            case 'wheels':
              this.addWheelToScene(model);
              break;
            default:
              this.state.scene.add(model);
          }
        }
      }
    }
  };

  addWheelToScene = (model) => {
    const wheel_1 = model.clone();
    const wheel_2 = model.clone();
    const wheel_3 = model.clone();
    const wheel_4 = model.clone();

    this.setOpts(wheel_1, opts.wheel_1);
    this.setOpts(wheel_2, opts.wheel_2);
    this.setOpts(wheel_3, opts.wheel_3);
    this.setOpts(wheel_4, opts.wheel_4);

    this.state.scene.add(wheel_1, wheel_2, wheel_3, wheel_4);
  };

  setOpts = (model, opts) => {
    model.name = opts.name;
    model.material.color.set(opts.color);
    model.position.x = opts.pX;
    model.position.y = opts.pY;
    model.position.z = opts.pZ;
    model.rotation.x = opts.rX;
    model.rotation.y = opts.rY;
    model.rotation.z = opts.rZ;
  };

  onWindowResize = () => {
    const {camera} = this.state;
    camera.aspect = windowSize.width / windowSize.height;
    camera.updateProjectionMatrix();
    this.setState({camera: camera});
    this.state.renderer.setSize(windowSize.width, windowSize.height);
    this.renderScene();
  };

  loadModel = (fpVar, name) => {
    return new Promise((resolve) => {
      new three.JSONLoader().load(fpVar[name], (geometry) => {
        const material = new three.MeshPhongMaterial({
          flatShading: three.FlatShading,
          color: defaultOpts.color
        });

        const model = new three.Mesh(geometry, material);
        this.setOpts(model, defaultOpts);
        const models = this.state.models;
        models[name] = model;
        this.setState({models: models});
        resolve(model);
      });
    });
  };

  getCurrentWheels = () => {
    const {scene} = this.state;
    return {
      wheel_1: scene.getObjectByName('wheel_1'),
      wheel_2: scene.getObjectByName('wheel_2'),
      wheel_3: scene.getObjectByName('wheel_3'),
      wheel_4: scene.getObjectByName('wheel_4')
    };
  };

  handleChangeColor = (e, c) => {
    const color = colors[c];
    opts.wheel_1.color = color;
    opts.wheel_2.color = color;
    opts.wheel_3.color = color;
    opts.wheel_4.color = color;

    const wheels = this.getCurrentWheels();
    this.removeWheels();
    this.addWheelToScene(wheels.wheel_1);
    this.renderScene();
    this.setState({currentColor: c});
  };

  removeWheels = () => {
    const wheels = this.getCurrentWheels();
    this.state.scene.remove(
      wheels.wheel_1,
      wheels.wheel_2,
      wheels.wheel_3,
      wheels.wheel_4
    );
  };

  handleChangeWheel = (e, wheel) => {
    this.removeWheels();
    this.addWheelToScene(this.state.models[wheel]);
    this.renderScene();
    this.setState({currentWheel: wheel});
  };

  renderScene = () => {
    this.state.renderer.render(this.state.scene, this.state.camera);
  };

  render() {
    if (this.state.pending) return <Preloader/>;
    return (
      <section>
        <div id='scene' className='d-flex justify-space-center'/>

        <div className='d-flex justify-space-center'>
          <div className='d-flex wheels-block'>
            {
              Object.keys(wheelsFPath).map((id, index) =>
                <button
                  onClick={(e) => this.handleChangeWheel(e, id)}
                  key={index}
                  disabled={id === this.state.currentWheel}
                >
                  {console.log(id === this.state.currentWheel)}
                  enkei
                </button>
              )
            }
          </div>

          <div className="d-flex colors-block">
            {
              Object.keys(colors).map((id, index) =>
                <button
                  disabled={id === this.state.currentColor}
                  key={index}
                  onClick={(e) => this.handleChangeColor(e, id)}
                />
              )
            }
          </div>
        </div>
      </section>
    );
  }
}

export default Kit;
