import { renderHook, act, fireEvent, waitFor } from '@testing-library/react-hooks';
import useDebounce from '../useDebounce';

jest.useFakeTimers();
  describe('useDebounce', () => {
    it('debounces the query correctlyy', () => {
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

    it('should clear the debounce timer on unmount', () => {
      const delay = 500;
      const { unmount } = renderHook((props) => useDebounce(props.query, props.delay), {
        initialProps: { query: 'initial', delay },
      });
  
      act(() => {
        unmount(); 
        jest.runAllTimers(); 
      });
  
    });

    it('should set debounced query when delay elapses', () => {
      const query = 'test';
      const delay = 500;
      const { result } = renderHook((props) => useDebounce(props.query, props.delay), {
        initialProps: { query, delay },
      });
      act(() => {
        jest.advanceTimersByTime(delay);
      });
      expect(result.current).toBe(query); 
    });
  
  });