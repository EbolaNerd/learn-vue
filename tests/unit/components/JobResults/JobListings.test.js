import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import axios from 'axios';

import JobListings from '@/components/JobResults/JobListings.vue';

vi.mock('axios');

describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams,
    },
  });

  const renderJobsListings = ($route) => {
    render(JobListings, {
      global: {
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
    axios.get.mockResolvedValue({ data: [] });
    const $route = createRoute();

    renderJobsListings($route);

    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs');
  });

  it('displays a maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const queryParams = { page: '1' };
    const $route = createRoute(queryParams);

    renderJobsListings($route);

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
        axios.get.mockResolvedValue({ data: Array(15).fill({}) });
        const queryParams = { page: '1' };
        const $route = createRoute(queryParams);

        renderJobsListings($route);

        await screen.findAllByRole('listitem');
        const presiousLink = screen.queryByRole('link', { name: /previous/i });
        expect(presiousLink).not.toBeInTheDocument();
      });

      it('it shows link to next page', async () => {
        axios.get.mockResolvedValue({ data: Array(15).fill({}) });
        const queryParams = { page: '1' };
        const $route = createRoute(queryParams);

        renderJobsListings($route);

        await screen.findAllByRole('listitem');
        const nextLink = screen.queryByRole('link', { name: /next/i });
        expect(nextLink).toBeInTheDocument();
      });
    });
  });

  describe('when user is on first page', () => {
    it('does not show link to next page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);

      renderJobsListings($route);

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it('does shows link to previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);

      renderJobsListings($route);

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /previous/i });
      expect(nextLink).toBeInTheDocument();
    });
  });
});
