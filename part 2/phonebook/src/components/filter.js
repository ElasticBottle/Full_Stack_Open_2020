import React from 'react'

const handleFilterChange = (setFilterString) => (event) => {
    setFilterString(event.target.value);
}

const Filter = ({ filterString, setFilterString }) => <div>
    filter shown with <input value={filterString} onChange={handleFilterChange(setFilterString)} />
</div>

export default Filter