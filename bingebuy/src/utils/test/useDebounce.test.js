import { renderHook, act, fireEvent, waitFor } from '@testing-library/react-hooks';
import useDebounce from '../useDebounce';

jest.useFakeTimers();

// test('debounces the query correctly', () => {
//   const { result, rerender } = renderHook((props) => useDebounce(props.query, props.delay), {
//     initialProps: { query: 'initial', delay: 500 },
//   });
//   expect(result.current).toBeUndefined();
//   act(() => {
//     rerender({ query: 'updated', delay: 500 });
//     jest.advanceTimersByTime(250); 
//   });
//   expect(result.current).toBeUndefined();
//   act(() => {
//     jest.advanceTimersByTime(250); 
//   });
//   expect(result.current).toBe('updated');
// });


test('debounces the query correctlyy', () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      const { result, rerender } = renderHook(
        (props) => useDebounce(props.query, props.delay),
        {
          initialProps: { query: 'initial', delay: 500 },
        }
      );
      rerender({ query: 'updated', delay: 500 });
      jest.advanceTimersByTime(250);
      expect(result.current).toBeUndefined();
    });
  });
