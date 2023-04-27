import React, { useState, useEffect } from 'react'
import SneakersList from '../components/sneakers/sneakers-list/SneakersList'
import SearchBar from '../components/sneakers/searchBar/SearchBar'
import Filters from '../components/sneakers/filters/FiltersGroup'
import sneakersService from '../services/sneakers'

const genderFilters = {
  Men: false,
  Women: false,
  Unisex: false
};

function SneakersPage() {
  const [sneakers, setSneakers] = useState([])
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState(genderFilters)

  const onSearch = (value) => {
    setSearch(value);
  }

  const onFilterGender = (ev) => {
    setFilterGender({...filterGender, [ev.target.value]: !filterGender[ev.target.value]})  
  }

  //GET SNEAKERS FROM API
  useEffect(() => {
    sneakersService.list()
      .then((sneakers) => {
        const NewSneakers = sneakers.filter(sneaker => sneaker.new === true)
        setSneakers(NewSneakers)
      })
      .catch(error => console.error(error))
  }, [])

  //FILTER SNEAKERS BY SEARCH

  const withOutFilters = Object.keys(filterGender).every(gender => !filterGender[gender])

  const sneakersFiltered = sneakers
    .filter(sneaker => sneaker.name.toLowerCase().includes(search))
    .filter(sneaker => withOutFilters || filterGender[sneaker.gender])
 

  return (
    <div className='d-flex'>
      <div>
        <Filters onFilter={onFilterGender} sneakers={sneakers}/>
      </div>
      <div>
        <div>
          <SearchBar onSearch={onSearch} search={search} />
        </div>
        <SneakersList search={search} sneakersFiltered={sneakersFiltered} />
      </div>
    </div>
  )
}

export default SneakersPage