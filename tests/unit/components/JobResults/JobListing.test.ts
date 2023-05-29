import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import JobListing from '@/components/JobResults/JobListing.vue';
import { createJob } from 'tests/utils/createJob';
import type { Job } from '@/api/types';

describe('JobListing', () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub,
        },
      },
      props: {
        job: {
          ...job,
        },
      },
    });
  };

  it('renders job title', () => {
    const job = createJob({ title: 'Vue Programmer' });

    renderJobListing(job);
    expect(screen.getByText('Vue Programmer')).toBeInTheDocument();
  });

  it('renders job organization', () => {
    const job = createJob({ organization: 'Air bnb' });

    renderJobListing(job);
    expect(screen.getByText('Air bnb')).toBeInTheDocument();
  });

  it('render job location', () => {
    const job = createJob({ locations: ['Copenhagen', 'Helsingør'] });

    renderJobListing(job);
    expect(screen.getByText('Copenhagen')).toBeInTheDocument();
    expect(screen.getByText('Helsingør')).toBeInTheDocument();
  });

  it('render job qualifications', () => {
    const job = createJob({ minimumQualifications: ['Code', 'Development'] });

    renderJobListing(job);
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
  });
});
