import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from 'Redux/contactsSlice';
import { selectFilters } from 'Redux/selector';

const Filter = () => {
  const filter = useSelector(selectFilters);
  const dispatch = useDispatch();
  const handleFilterChange = event => {
    dispatch(updateFilter(event.target.value));
  };
  return (
    <>
      Filter contacts by name:
      <input type="text" value={filter} onChange={handleFilterChange} />
    </>
  );
};

export default Filter;
