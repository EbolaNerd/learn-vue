import { render, screen } from '@testing-library/vue';
import HeaderContainer from '@/components/shared/HeaderContainer.vue';

describe('HeaderContainer', () => {
  it('allows parent components to provide title content', () => {
    render(HeaderContainer, {
      slots: {
        title: '<h2>This is the title</h2>',
      },
    });
    expect(screen.getByText('This is the title')).toBeInTheDocument();
  });

  it('allows parent components to provide subtitle content', () => {
    render(HeaderContainer, {
      slots: {
        subtitle: '<h3>This is the subtitle</h3>',
      },
    });
    expect(screen.getByText('This is the subtitle')).toBeInTheDocument();
  });
});
