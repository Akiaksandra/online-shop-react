import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuccessModal from './success-modal';

export default {
  title: 'Components/Modals/SuccessModal',
  component: SuccessModal,
  argTypes: {
    text: { control: 'text' },
  }
} as ComponentMeta<typeof SuccessModal>;

const Template: ComponentStory<typeof SuccessModal> = (args) => <SuccessModal {...args}/>;

export const SuccessModal1 = Template.bind({});
SuccessModal1.args = {
  text: "Success Text"
}
