import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OrdersHistoryForUsers from '.';

export default {
  title: 'Pages/OrdersHistoryForUsers',
  component: OrdersHistoryForUsers,
} as ComponentMeta<typeof OrdersHistoryForUsers>;

const Template: ComponentStory<typeof OrdersHistoryForUsers> = () => <OrdersHistoryForUsers />;

export const OrdersHistoryForUsers1 = Template.bind({});

