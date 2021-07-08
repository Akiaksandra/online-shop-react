import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LogInForm from '.';

export default {
  title: 'Components/Modals/LogInForm',
  component: LogInForm,
} as ComponentMeta<typeof LogInForm>;

const Template: ComponentStory<typeof LogInForm> = () => <LogInForm />;

export const LogInForm1 = Template.bind({});

