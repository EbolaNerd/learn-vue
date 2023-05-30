import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';
import { useRouter } from 'vue-router';
vi.mock('vue-router');

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import { useUserStore } from '@/stores/user';

const useMockRouter = useRouter as Mock;

describe('JobFiltersSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    uniqueValues: Set<string>;
    action: Mock;
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {},
  ): JobFiltersSidebarCheckboxGroupProps => ({
    uniqueValues: new Set(['Value A', 'Value B']),
    action: vi.fn(),
    ...props,
  });

  const renderFiltersSidebarCheckboxGroup = (props: JobFiltersSidebarCheckboxGroupProps) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    });
    return { userStore };
  };

  it('renders unique list of values', () => {
    const props = createProps({
      uniqueValues: new Set(['Full-time', 'Part-time']),
    });
    renderFiltersSidebarCheckboxGroup(props);

    const jobTypesListItems = screen.getAllByRole('listitem');
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      useMockRouter.mockReturnValue({ push: vi.fn() });

      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(['Full-time', 'Part-time']),
        action,
      });
      renderFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });

      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(['Full-time']);
    });

    it('navigates user to job results page to see fresh batch of filteres jobs', async () => {
      const push = vi.fn();
      useMockRouter.mockReturnValue({ push });

      const props = createProps({
        uniqueValues: new Set(['Full-time']),
      });

      renderFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });

      await userEvent.click(fullTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });

  describe('when user clears job filters', () => {
    it('unckecks any checked checkboxes', async () => {
      useMockRouter.mockReturnValue({ push: vi.fn() });

      const props = createProps({
        uniqueValues: new Set(['Full-time']),
      });

      const { userStore } = renderFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>('checkbox', {
        name: /full-time/i,
      });

      await userEvent.click(fullTimeCheckboxBeforeAction);

      expect(fullTimeCheckboxBeforeAction.checked).toBe(true);

      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();

      const fullTimeCheckboxAfterAction = await screen.findByRole<HTMLInputElement>('checkbox', {
        name: /full-time/i,
      });

      expect(fullTimeCheckboxAfterAction.checked).toBe(false);
    });
  });
});
