import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorIndicator from '.';

export default {
  title: 'Components/ErrorIndicator',
  component: ErrorIndicator,
  argTypes: {
    errorText: { control: 'text' },
  }
} as ComponentMeta<typeof ErrorIndicator>;

const Template: ComponentStory<typeof ErrorIndicator> = (args) => <ErrorIndicator {...args}/>;

export const ErrorIndicator1 = Template.bind({});
ErrorIndicator1.args = {
  errorText: "SomeText"
}

