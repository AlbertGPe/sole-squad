import React from 'react'
import SneakersList from '../components/sneakers/sneakers-list/SneakersList'
import SearchBar from '../components/sneakers/searchBar/SearchBar'

function SneakersPage() {
  return (
    <>
      <SearchBar />
      <SneakersList />
    </>
  )
}

export default SneakersPage