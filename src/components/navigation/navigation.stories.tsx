import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navigation from '.';

export default {
  title: 'Components/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = () => <Navigation />;

export const Navigation1 = Template.bind({});

