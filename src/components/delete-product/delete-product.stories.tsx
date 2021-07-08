import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DeleteProductFunc from '.';

export default {
  title: 'Components/Delete',
  component: DeleteProductFunc,
} as ComponentMeta<typeof DeleteProductFunc>;

const Template: ComponentStory<typeof DeleteProductFunc> = () => <DeleteProductFunc />;

export const DeleteProduct = Template.bind({});

