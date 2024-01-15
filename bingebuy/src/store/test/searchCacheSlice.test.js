import searchCacheReducer, { searchCacheItems } from '../searchCacheSlice';

describe('searchCacheSlice', () => {
  it('should handle searchCacheItems action', () => {
    const initialState = {
      cacheItems: {},
    };

    const mockPayload = {
      searchQuery: 'testQuery',
      items: [{ id: '1', name: 'Item 1' }],
    };

    const newState = searchCacheReducer(initialState, searchCacheItems(mockPayload));

    expect(newState).toEqual({
      cacheItems: {
        [mockPayload.searchQuery]: mockPayload.items,
      },
    });
  });
  it('should handle searchCacheItems action with searchQuery', () => {
    const initialState = {
      cacheItems: {},
    };
    const mockPayload = {
      searchQuery: 'testQuery',
      items: [{ id: '1', name: 'Item 1' }],
    };
    const newState = searchCacheReducer(initialState, searchCacheItems(mockPayload));
    // Assert that the state is updated correctly
    expect(newState).toEqual({
      cacheItems: {
        [mockPayload.searchQuery]: mockPayload.items,
      },
    });
  });
  it('should not update state when searchQuery is not provided', () => {
    const initialState = {
      cacheItems: {
        existingQuery: [{ id: '2', name: 'Item 2' }],
      },
    };

    const mockPayload = {
      items: [{ id: '1', name: 'Item 1' }],
    };

    const newState = searchCacheReducer(initialState, searchCacheItems(mockPayload));

    // Assert that the state remains unchanged when searchQuery is not provided
    expect(newState).toEqual(initialState);
  });


});
