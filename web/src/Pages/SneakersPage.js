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

  //GENDER FILTER
  const onFilterGender = (ev) => {
    setFilterGender({...filterGender, [ev.target.value]: !filterGender[ev.target.value]})  
  }  
  //PRICE FILTER
  const onFilterPrice = (ev) => {
    if (filterPrice === 'Lower' || filterPrice === 'Higher'){
      setFilterPrice('')
    } else {
      setFilterPrice(ev.target.value)
    }
  }

  //TAKE BRAND'S NAME, ONE OF EACH, THERE ARE NO REPEATED VALUES
  const sneakersBrand = [...new Set(sneakers.map((sneaker) => sneaker.brand))]
  //CONVERT ARRAY TO OBJECT WITH FALSE VALUE
  const brandFilter = sneakersBrand.reduce((brand, brandKey) => ({ ...brand, [brandKey]: false }), {})
  const [filterBrand, setFilterBrand] = useState(brandFilter)

  //BRAND FILTER
  const onFilterBrand = (ev) => {
    setFilterBrand({...filterBrand, [ev.target.value]: !filterBrand[ev.target.value]})
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
  const withOutBrand = Object.keys(filterBrand).every(brand => !filterBrand[brand])

  let sneakersFiltered = sneakers
    .filter(sneaker => sneaker.name.toLowerCase().includes(search))
    .filter(sneaker => withOutFilters || filterGender[sneaker.gender])
    .filter(sneaker => withOutBrand || filterBrand[sneaker.brand])
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
        <Filters onFilterGender={onFilterGender} onFilterBrand={onFilterBrand} onFilterPrice={onFilterPrice} sneakersBrand={sneakersBrand}/>
      </div>
      <div>
        <div>
          <SearchBar onSearch={onSearch} search={search} />
        </div>
        <SneakersList sneakersFiltered={sneakersFiltered} />
      </div>
    </div>
  )
}

export default SneakersPage