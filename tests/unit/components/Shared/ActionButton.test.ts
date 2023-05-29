import { render, screen } from '@testing-library/vue';
import ActionButton from '@/components/Shared/ActionButton.vue';

describe('ActionButton', () => {
  it('renders text', () => {
    render(ActionButton, {
      props: {
        text: 'Sign in',
        type: 'primary',
      },
    });

    const btn = screen.getByRole('button', {
      name: /sign in/i,
    });

    expect(btn).toBeInTheDocument();
  });

  it('applies one of several styles to button', () => {
    render(ActionButton, {
      props: {
        text: 'Sign in',
        type: 'primary',
      },
    });

    const btn = screen.getByRole('button', {
      name: /sign in/i,
    });

    expect(btn).toHaveClass('primary');
  });
});
