import test from 'ava';

import {macro, units} from '@comparison-searching/specification';

import {search as _search} from '#module';

const search = {
	name: 'fibonacci search',
	fn: _search,
};

const largeArray = {
	array: [Int32Array],
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
	length: [(10 ** 5) | 0],
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
	min: [-(2 ** 31) | 0],
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
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
