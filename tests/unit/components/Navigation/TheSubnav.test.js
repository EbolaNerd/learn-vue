import { render, screen } from '@testing-library/vue';
import TheSubnav from '@/components/Navigation/TheSubnav.vue';

describe('TheSubnav', () => {
  const renderSubnav = (onJobResultsPage) => {
    render(TheSubnav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      data() {
        return {
          onJobResultsPage: onJobResultsPage,
        };
      },
    });
  };

  describe('When user is on jobs page', () => {
    it('displays job count', () => {
      const onJobResultsPage = true;
      renderSubnav(onJobResultsPage);

      const jobCount = screen.getByText('1653');

      expect(jobCount).toBeInTheDocument();
    });
  });

  describe('When user is not onjobs page', () => {
    it('does not display job count', () => {
      const onJobResultsPage = false;
      renderSubnav(onJobResultsPage);

      const jobCount = screen.queryByText('1653');

      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
