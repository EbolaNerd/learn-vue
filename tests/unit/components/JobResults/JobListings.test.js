import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import JobListings from '@/components/JobResults/JobListings.vue';
import { useJobsStore } from '@/stores/jobs';

vi.mock('axios');

describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams,
    },
  });

  const renderJobsListings = ($route) => {
    const pinia = createTestingPinia();

    render(JobListings, {
      global: {
        plugins: [pinia],
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it('fetches jobs', () => {
    const $route = createRoute();

    renderJobsListings($route);

    const jobsStore = useJobsStore();

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it('displays a maximum of 10 jobs', async () => {
    const queryParams = { page: '1' };
    const $route = createRoute(queryParams);

    renderJobsListings($route);

    const jobsStore = useJobsStore();
    jobsStore.jobs = Array(15).fill({});

    const jobs = await screen.findAllByRole('listitem');
    expect(jobs).toHaveLength(10);
  });

  describe('when params exlude page number', () => {
    it('diplays page number 1', () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);

      renderJobsListings($route);

      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });

    describe('when params includes page number', () => {
      it('diplays page number', () => {
        const queryParams = { page: '3' };
        const $route = createRoute(queryParams);

        renderJobsListings($route);

        expect(screen.getByText('Page 3')).toBeInTheDocument();
      });
    });

    describe('when user is on first page', () => {
      it('does not show link to previous page', async () => {
        const queryParams = { page: '1' };
        const $route = createRoute(queryParams);

        renderJobsListings($route);
        const jobStore = useJobsStore();

        jobStore.jobs = Array(15).fill({});

        await screen.findAllByRole('listitem');
        const presiousLink = screen.queryByRole('link', { name: /previous/i });
        expect(presiousLink).not.toBeInTheDocument();
      });

      it('it shows link to next page', async () => {
        const queryParams = { page: '1' };
        const $route = createRoute(queryParams);

        renderJobsListings($route);
        const jobsStore = useJobsStore();
        jobsStore.jobs = Array(15).fill({});

        await screen.findAllByRole('listitem');
        const nextLink = screen.queryByRole('link', { name: /next/i });
        expect(nextLink).toBeInTheDocument();
      });
    });
  });

  describe('when user is on first page', () => {
    it('does not show link to next page', async () => {
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);

      renderJobsListings($route);
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it('does shows link to previous page', async () => {
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);

      renderJobsListings($route);
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /previous/i });
      expect(nextLink).toBeInTheDocument();
    });
  });
});
