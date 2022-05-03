import assert from 'assert';

/**
 * This implementation of Fibonacci search (or Fibonaccian search) has the
 * following properties:
 *   - It tries to split the array into small piece first and large piece last
 *   so that a branch more often results into a forward scan of the input
 *   array.
 *   - To avoid repeating comparisons whose outcome is known we use a modified
 *   fibonnaci recurrence:
 *         F(n)    = F(n-1) + F(n-2) + 1
 *     with F(0) = 0 and F(1) = 0
 *  which leads to F(n) = F'(n+1)-1 where F' is the standard Fibonacci sequence
 *  since F'(1) = 1 and F'(2) = 1 and F'(n)-1 = (F'(n-1)-1) + (F'(n-2)-1) + 1
 *
 *     F'(n+1) - 1 =  F'(n) - 1 + F'(n-1) - 1 + 1
 *                 =  F'(n) + F'(n-1) - 1
 *       F'(n+1)   =  F'(n) + F'(n-1)
 *
 *  The +1 accounts for discarding the pivot element instead of keeping it in
 *  for further comparison.
 */
const search = (delta, a, i, j, v) => {
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
	const n = (j - i) | 0;
	// eslint-disable-next-line no-bitwise
	if (n <= 0) return ~j;

	// INIT F(k-1) and F(k-2)
	let q = 0;
	let p = 1;
	let temporary = 0;
	do {
		// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
		temporary = (q + p) | 0;
		q = p;
		p = temporary;
	} while (p > 0 && p <= n);

	p = q;
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
	q = (temporary - q) | 0;

	// MAIN LOOP
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
	let m = (((i + q) | 0) - 1) | 0; // I + F(k-2) - 1
	while (i < j) {
		// We have
		//
		// |  F(k-2) - 1  | 1 |  <= F(k-1) - 1  |
		// |  F(k-2) - 1  | 1 |  >= F(k-3) - 1  |
		// |          N >= F(k-1) - 1           |
		//
		// F(k-2) <= F(k-1)
		assert(q <= p);
		// F(k-2) <= N
		assert(q <= j - i);
		// N <= F(k) - 1 = F(k-1) + F(k-2) - 1
		assert(q + p - 1 >= j - i);
		const d = delta(v, a[m]);
		if (d < 0) {
			j = m;
			// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
			p = (p - q) | 0; // F(k-3)
			// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
			q = (q - p) | 0; // F(k-4)
			// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
			m = (((i + q) | 0) - 1) | 0;
		} else if (d > 0) {
			// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
			q = (p - q) | 0; // F(k-3)
			// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
			p = (((m - i) | 0) + 1) | 0; // F(k-2)
			// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
			i = (m + 1) | 0;
			// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
			m = (((i + q) | 0) - 1) | 0; // I + F(k-2) - 1
			while (m >= j) {
				// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
				p = (p - q) | 0; // F(k-3)
				// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
				q = (q - p) | 0; // F(k-4)
				// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
				m = (((i + q) | 0) - 1) | 0;
			}
		} else return m;
	}

	// eslint-disable-next-line no-bitwise
	return ~j;
};

export default search;
