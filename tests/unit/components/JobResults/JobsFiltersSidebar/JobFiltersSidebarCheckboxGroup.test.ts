import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';
import { useRouter } from 'vue-router';
vi.mock('vue-router');

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';

const useMockRouter = useRouter as Mock;

describe('JobFiltersSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    header: string;
    uniqueValues: Set<string>;
    action: Mock;
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {},
  ): JobFiltersSidebarCheckboxGroupProps => ({
    header: 'Some header',
    uniqueValues: new Set(['Value A', 'Value B']),
    action: vi.fn(),
    ...props,
  });

  const renderFiltersSidebarCheckboxGroup = (props: JobFiltersSidebarCheckboxGroupProps) => {
    const pinia = createTestingPinia();

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  it('renders unique list of values', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['Full-time', 'Part-time']),
    });
    renderFiltersSidebarCheckboxGroup(props);

    const button = screen.getByRole('button', { name: /job types/i });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole('listitem');
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      useMockRouter.mockReturnValue({ push: vi.fn() });

      const action = vi.fn();
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Full-time', 'Part-time']),
        action,
      });
      renderFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole('button', { name: /job types/i });
      await userEvent.click(button);

      const fullTomeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });

      await userEvent.click(fullTomeCheckbox);

      expect(action).toHaveBeenCalledWith(['Full-time']);
    });

    it('navigates user to job results page to see fresh batch of filteres jobs', async () => {
      const push = vi.fn();
      useMockRouter.mockReturnValue({ push });

      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Full-time']),
      });

      renderFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole('button', { name: /job types/i });
      await userEvent.click(button);

      const fullTomeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });

      await userEvent.click(fullTomeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
