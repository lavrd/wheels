export const colors = {
  primaryColor: '#051923',
  secondColor: '#FFFFFF',
  exColor1: '#E3D0D8',
  exColor2: '#333745'
};

export const defaultOpts = {
  pX: 0,
  pY: -100,
  pZ: 0,

  rX: 0,
  rY: 0,
  rZ: 0,

  color: '#88CCF1',
  name: 'default'
};

export const opts = {
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

export const defaultCar = 'audi';
export const defaultWheel = 'vossen';

export const windowSize = {
  width: 800,
  height: 600
};

export const carsFPath = {
  audi: '/models/audi.json'
};
export const wheelsFPath = {
  enkei: '/models/enkei.json',
  oz: '/models/oz.json',
  vossen: '/models/vossen.json'
};
