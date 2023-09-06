import { render } from '@testing-library/react';

import Faleconosco from './faleconosco';

describe('Faleconosco', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Faleconosco />);
    expect(baseElement).toBeTruthy();
  });
});
