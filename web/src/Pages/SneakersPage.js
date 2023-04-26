import React, { useState } from 'react'
import SneakersList from '../components/sneakers/sneakers-list/SneakersList'
import SearchBar from '../components/sneakers/searchBar/SearchBar'
import Filters from '../components/sneakers/filters/FiltersGroup'


function SneakersPage() {
  const [search, setSearch] = useState('');

  const onSearch = (value) => {
    setSearch(value)
  }

  return (
    <div className='d-flex'>
      <div>
        <Filters />
      </div>
      <div>
        <div>
          <SearchBar onSearch={onSearch} search={search} />
        </div>
        <SneakersList search={search} />
      </div>
    </div>
  )
}

export default SneakersPage