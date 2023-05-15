import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';

import TheSubnav from '@/components/Navigation/TheSubnav.vue';
import { useJobsStore } from '@/stores/jobs';

describe('TheSubnav', () => {
  const renderTheSubnav = (routeName) => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(TheSubnav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore };
  };

  describe('When user is on jobs page', () => {
    it('displays job count', async () => {
      const routeName = 'JobResults';

      const { jobsStore } = renderTheSubnav(routeName);
      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe('When user is not on jobs page', () => {
    it('does not display job count', () => {
      const routeName = 'Home';

      const { jobsStore } = renderTheSubnav(routeName);
      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
