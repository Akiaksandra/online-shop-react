import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Filters from '.';

export default {
  title: 'Components/Filters',
  component: Filters,
} as ComponentMeta<typeof Filters>;

const Template: ComponentStory<typeof Filters> = () => <Filters />;

export const FiltersTopic = Template.bind({});

