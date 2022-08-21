/* eslint-env mocha */

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import waitForExpect from 'wait-for-expect';

import { getPets } from '../petdata';

Enzyme.configure({ adapter: new Adapter() });

chai.use(sinonChai);

waitForExpect.defaults.timeout = 10;
waitForExpect.defaults.interval = 5;

export const mockAxios = new MockAdapter(axios);
mockAxios.onGet('/api/pets').reply(200, getPets());
