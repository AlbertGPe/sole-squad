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
  const [filterPrice, setFilterPrice] = useState('')

  const onSearch = (value) => {
    setSearch(value);
  }

  const onFilterGender = (ev) => {
    setFilterGender({...filterGender, [ev.target.value]: !filterGender[ev.target.value]})  
  }  
  
  const onFilterPrice = (ev) => {
    if (filterPrice === 'Lower' || filterPrice === 'Higher'){
      setFilterPrice('')
    } else {
      setFilterPrice(ev.target.value)
    }
    console.log(ev.target.value)
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

  //FILTER SNEAKERS

  const withOutFilters = Object.keys(filterGender).every(gender => !filterGender[gender])

  let sneakersFiltered = sneakers
    .filter(sneaker => sneaker.name.toLowerCase().includes(search))
    .filter(sneaker => withOutFilters || filterGender[sneaker.gender])
    .sort((a, b) => {
      if (filterPrice === 'Lower') {
        return  a.price - b.price;
      } else if (filterPrice === 'Higher') {
        return  b.price - a.price
      } else {
        return a.name - b.name
      }
    })
 
  return (
    <div className='d-flex'>
      <div>
        <Filters onFilterGender={onFilterGender} onFilterPrice={onFilterPrice} sneakers={sneakers}/>
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