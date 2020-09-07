import 'antd/es/date-picker/style/index';

import generatePicker from 'antd/es/date-picker/generatePicker';

import { pickersConfig } from '@/config/pickersConfig';

export const DatePicker = generatePicker<Date>(pickersConfig);
