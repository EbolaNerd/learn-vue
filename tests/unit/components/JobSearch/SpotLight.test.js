import { render, screen } from '@testing-library/vue';
import axios from 'axios';

import SpotLight from '@/components/JobSearch/SpotLight.vue';

vi.mock('axios');

describe('SpotLight', () => {
  const mockSpotLIghtsReponse = (spotlight = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'http://fakeimage.com/1234',
          title: 'Fake title',
          description: 'Face description',
          ...spotlight,
        },
      ],
    });
  };

  it('provides image to parent component', async () => {
    const spotlight = { img: 'Other image' };
    mockSpotLIghtsReponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
            <h1>{{ slotProps.img}}</h1>
            </template>`,
      },
    });

    const text = await screen.findByText('Other image');
    expect(text).toBeInTheDocument();
  });

  it('provides a title to parent component', async () => {
    const spotlight = { title: 'Other title' };
    mockSpotLIghtsReponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
            <h1>{{ slotProps.title}}</h1>
            </template>`,
      },
    });

    const text = await screen.findByText('Other title');
    expect(text).toBeInTheDocument();
  });

  it('provides a description to parent component', async () => {
    const spotlight = { description: 'Other description' };
    mockSpotLIghtsReponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
            <h1>{{ slotProps.description}}</h1>
            </template>`,
      },
    });

    const text = await screen.findByText('Other description');
    expect(text).toBeInTheDocument();
  });
});
