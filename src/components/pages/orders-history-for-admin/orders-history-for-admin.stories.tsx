import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OrdersHistoryForAdmin from '.';

export default {
  title: 'Pages/OrdersHistoryForAdmin',
  component: OrdersHistoryForAdmin,
} as ComponentMeta<typeof OrdersHistoryForAdmin>;

const Template: ComponentStory<typeof OrdersHistoryForAdmin> = () => <OrdersHistoryForAdmin />;

export const OrdersHistoryForAdmin1 = Template.bind({});

