import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NewProductForm from '.';

export default {
  title: 'Components/Modals/NewProductForm',
  component: NewProductForm,
} as ComponentMeta<typeof NewProductForm>;

const Template: ComponentStory<typeof NewProductForm> = () => <NewProductForm />;

export const NewProductForm1 = Template.bind({});

