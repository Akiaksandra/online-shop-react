import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LogOutForm from '.';

export default {
  title: 'Components/Modals/LogOutForm',
  component: LogOutForm,
} as ComponentMeta<typeof LogOutForm>;

const Template: ComponentStory<typeof LogOutForm> = () => <LogOutForm />;

export const LogOutForm1 = Template.bind({});

