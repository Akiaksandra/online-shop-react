import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Spinner from '.';

export default {
  title: 'Components/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = () => <Spinner />;

export const Spinner1 = Template.bind({});

