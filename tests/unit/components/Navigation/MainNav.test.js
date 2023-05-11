import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import MainNav from '@/components/Navigation/MainNav.vue';
import { RouterLinkStub } from '@vue/test-utils';

describe('MainNav', () => {
  const renderMainNav = () => {
    const $route = {
      name: 'Home',
    };

    render(MainNav, {
      global: {
        mocks: {
          $route,
        },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it('displays company name', () => {
    renderMainNav();

    const companyName = screen.getByText('Danske Spil');
    expect(companyName).toBeInTheDocument();
  });

  it('displays menu items for navigation', () => {
    renderMainNav();

    const navigationMenuItems = screen.getAllByRole('listitem');
    const itemsText = navigationMenuItems.map((li) => li.textContent);

    expect(itemsText).toEqual([
      'Teams',
      'Locations',
      'Life at Danske Spil',
      'How we hire',
      'Students',
      'Jobs',
    ]);
  });

  describe('When the user logs in', () => {
    it('displays user profile picture', async () => {
      renderMainNav();

      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      });

      expect(profileImage).not.toBeInTheDocument();

      const loginBtn = screen.getByRole('button', {
        name: /sign in/i,
      });

      await userEvent.click(loginBtn);
      profileImage = screen.getByRole('img', {
        name: /user profile image/i,
      });

      expect(profileImage).toBeInTheDocument();
    });
  });
});
