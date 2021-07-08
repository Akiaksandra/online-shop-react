import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorModal from './error-modal';

export default {
  title: 'Components/Modals/ErrorModal',
  component: ErrorModal,
  argTypes: {
    errorText: { control: 'text' },
  }
} as ComponentMeta<typeof ErrorModal>;

const Template: ComponentStory<typeof ErrorModal> = (args) => <ErrorModal {...args}/>;

export const ErrorModal1 = Template.bind({});
ErrorModal1.args = {
  errorText: "Error Text",
}

