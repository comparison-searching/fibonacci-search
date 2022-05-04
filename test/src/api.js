import test from 'ava';

import {macro, units} from '@comparison-searching/specification';

import {search as _search} from '#module';

const search = {
	name: 'fibonacci search',
	fn: _search,
};

const largeArray = {
	array: [Int32Array],
	length: [(10 ** 5) | 0],
	min: [-(2 ** 31) | 0],
	max: [(2 ** 31 - 1) | 0],
	delta: [
		{
			name: 'increasing',
			fn: (a, b) => a - b,
		},
	],
};

const seed = [123, 456];

for (const args of [{}, {length: [333, 1000, 10_000]}, largeArray]) {
	for (const unit of units(args)) {
		test(macro, {...unit, seed, search});
	}
}
