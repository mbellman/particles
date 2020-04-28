import { indexWhere } from './utilities';

interface ParticleFamily {
  name: string;
  id: number;
};

interface Vec2 {
  x: number;
  y: number;
}

interface Particle {
  position: Vec2;
};

interface State {
  families: ParticleFamily[];
  particles: Particle[];
};

const state: State = {
  families: [],
  particles: []
};

export function addParticleFamily() {
  const { length: totalFamilies } = state.families;

  state.families.push({
    id: totalFamilies,
    name: `Particle${totalFamilies}`
  });
}

export function editParticleFamily(family: ParticleFamily) {
  const targetIndex = indexWhere(state.families, ({ id }) => id === family.id);

  state.families[targetIndex] = family;
}
