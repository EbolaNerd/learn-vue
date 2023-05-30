import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useRoute } from 'vue-router';
vi.mock('vue-router');

import JobListings from '@/components/JobResults/JobListings.vue';
import { useJobsStore } from '@/stores/jobs';
import { useDegreesStore } from '@/stores/degrees';

const useRouteMock = useRoute as Mock;

describe('JobListings', () => {
  const renderJobsListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    // @ts-expect-error: Getter is readonly
    jobsStore.FILTERED_JOBS = Array(15).fill({});
    const degreesStore = useDegreesStore();

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { jobsStore, degreesStore };
  };

  it('fetches jobs', () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { jobsStore } = renderJobsListings();

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it('fetches degrees', () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { degreesStore } = renderJobsListings();
    expect(degreesStore.FETCH_DEGREES).toHaveBeenCalled();
  });

  it('displays a maximum of 10 jobs', async () => {
    useRouteMock.mockReturnValue({ query: { page: '1' } });

    const { jobsStore } = renderJobsListings();
    // @ts-expect-error: Getter is readonly
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    const jobs = await screen.findAllByRole('listitem');
    expect(jobs).toHaveLength(10);
  });

  describe('when params exlude page number', () => {
    it('diplays page number 1', () => {
      useRouteMock.mockReturnValue({ query: {} });

      renderJobsListings();

      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });

    describe('when params includes page number', () => {
      it('diplays page number', () => {
        useRouteMock.mockReturnValue({ query: { page: '3' } });

        renderJobsListings();

        expect(screen.getByText('Page 3')).toBeInTheDocument();
      });
    });

    describe('when user is on first page', () => {
      it('does not show link to previous page', async () => {
        useRouteMock.mockReturnValue({ query: { page: '1' } });

        const { jobsStore } = renderJobsListings();
        // @ts-expect-error: Getter is readonly
        jobsStore.FILTERED_JOBS = Array(15).fill({});

        await screen.findAllByRole('listitem');
        const presiousLink = screen.queryByRole('link', { name: /previous/i });
        expect(presiousLink).not.toBeInTheDocument();
      });

      it('it shows link to next page', async () => {
        useRouteMock.mockReturnValue({ query: { page: '1' } });

        const { jobsStore } = renderJobsListings();
        // @ts-expect-error: Getter is readonly
        jobsStore.FILTERED_JOBS = Array(15).fill({});

        await screen.findAllByRole('listitem');
        const nextLink = screen.queryByRole('link', { name: /next/i });
        expect(nextLink).toBeInTheDocument();
      });
    });
  });

  describe('when user is on first page', () => {
    it('does not show link to next page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } });

      const { jobsStore } = renderJobsListings();
      // @ts-expect-error: Getter is readonly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it('does shows link to previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } });

      const { jobsStore } = renderJobsListings();
      // @ts-expect-error: Getter is readonly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /previous/i });
      expect(nextLink).toBeInTheDocument();
    });
  });
});
