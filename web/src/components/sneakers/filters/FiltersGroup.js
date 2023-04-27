import React from 'react'
import './Filters.css'


function Filters({ onFilter, sneakers }) {

  return (
    <div className='filter-group'>
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Gender
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <div className="form-check">
                <input className="form-check-input" onChange={onFilter} type="checkbox" value="Men" id="flexCheckMen" />
                <label className="form-check-label" htmlFor="flexCheckMen">
                  Men
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" onChange={onFilter} type="checkbox" value="Women" id="flexCheckWomen" />
                <label className="form-check-label" htmlFor="flexCheckWomen">
                  Women
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" onChange={onFilter} type="checkbox" value="Unisex" id="flexCheckUnisex" />
                <label className="form-check-label" htmlFor="flexCheckUnisex">
                  Unisex
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
              Brand
            </button>
          </h2>
          <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
            <div className="accordion-body">
              {[...new Set(sneakers.map((sneaker) => (
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {sneaker.brand}
                </label>
              </div>
                )))]}             
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
              Price
            </button>
          </h2>
          <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Lower" id="flexCheckLower" />
                <label className="form-check-label" htmlFor="flexCheckLower">
                  Lower to Higher
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Higher" id="flexCheckHigher" />
                <label className="form-check-label" htmlFor="flexCheckHigher">
                  Higher To Lower
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters