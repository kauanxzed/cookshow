import { render } from '@testing-library/react';

import Recipe from './recipe';

describe('Recipe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Recipe />);
    expect(baseElement).toBeTruthy();
  });
});
