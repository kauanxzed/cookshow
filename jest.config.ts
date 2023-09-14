import { getJestProjects } from '@nx/jest';
import '@testing-library/jest-dom/extend-expect';

export default {
  projects: getJestProjects(),
};
