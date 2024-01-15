import searchReducer, {
    fetchItemsStart,
    fetchItemsSuccess,
    fetchItemsFailure,
    searchQueryItems,
    deleteItem,
  } from '../searchSlice';
  
  describe('searchSlice', () => {
    it('should handle searchQueryItems action', () => {
      const initialState = {
        items: [],
        status: 'idle',
        error: null,
        searchQuery: '',
      };
      const newState = searchReducer(initialState, searchQueryItems('testQuery'));
  
      expect(newState).toEqual({
        items: [],
        status: 'idle',
        error: null,
        searchQuery: 'testQuery',
      });
    });
  
    it('should handle fetchItemsStart action', () => {
        const initialState = {
          items: [],
          loading: false, 
          error: null,
          searchQuery: '',
        };
        const newState = searchReducer(initialState, fetchItemsStart());
    
        expect(newState).toEqual({
          items: [],
          loading: true, 
          error: null,
          searchQuery: '',
        });
      });
  
      it('should handle fetchItemsSuccess action', () => {
        const initialState = {
          items: [],
          loading: true,
          error: null,
          searchQuery: '',
        };
    
        const mockItems = [{ id: '1', title: 'Item 1' }];
        const newState = searchReducer(initialState, fetchItemsSuccess(mockItems));
    
        expect(newState).toEqual({
          items: mockItems,
          loading: false,
          error: null,
          searchQuery: '',
        });
      });
      it('should handle fetchItemsFailure action', () => {
        const initialState = {
          items: [],
          loading: true,
          error: null,
          searchQuery: '',
        };
        const error = 'Error fetching items';
        const newState = searchReducer(initialState, fetchItemsFailure(error));
    
        expect(newState).toEqual({
          items: [],
          loading: false,
          error: error,
          searchQuery: '',
        });
      });
  
      it('should handle deleteItem action', () => {
        const initialState = {
          items: [
            { id: '1', name: 'Item 1' },
            { id: '2', name: 'Item 2' },
          ],
          loading: false,
          error: null,
          searchQuery: '',
        };
    
        const itemsToDelete = [{ id: '2', name: 'Item 2' }]; // Adjust the data to match your actual data structure
        const newState = searchReducer(initialState, deleteItem(itemsToDelete));
    
        expect(newState).toEqual({
          items: [
            { id: '2', name: 'Item 2' },
          ],
          loading: false,
          error: null,
          searchQuery: '',
        });
      });

  });
  