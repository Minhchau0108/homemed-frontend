import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputRange from "react-input-range";
import { productActions } from "../redux/actions/product.actions";
import "react-input-range/lib/css/index.css";
import Select from "react-select";
import { Badge, ButtonGroup, ToggleButton, Button } from "react-bootstrap";
const FilterBar = ({
  main,
  categories,
  handleClickCategory,
  selectedCategory,
  selectedSort,
  handleSelectedSort,
  priceRange,
  handlePriceRange,
}) => {
  const options = [
    {
      value: { key: "avgRating", ascending: -1 },
      label: "Rating: high to low",
    },
    { value: { key: "avgRating", ascending: 1 }, label: "Rating: low to high" },
    { value: { key: "price", ascending: -1 }, label: "Price: high to low" },
    { value: { key: "price", ascending: 1 }, label: "Price: low to high" },
  ];
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSelectedCategory = (e) => {
    console.log("id", e.currentTarget.value);
    dispatch(productActions.setSelectedCategory(e.currentTarget.value));
    history.push(`/category/${e.currentTarget.value}`);
  };
  return (
    <>
      <div className='py-2 px-2 bg-custom text-white '>
        <strong className='text-capitalize font-weight-bold text-white'>
          {main && `CATEGORIES`}
          {!main && `${categories[0]?.parentCategory?.name}`}
        </strong>
      </div>
      <ul className='list-unstyled text-muted font-weight-normal user-sidebar'>
        {main &&
          categories.map((c) => (
            <li className='mb-2 ' key={c._id}>
              <Button
                value={c._id}
                onClick={handleSelectedCategory}
                className='btn-outline-category text-capitalize d-flex justify-content-between px-1 btn-category'
                style={{ fontSize: "15px", fontWeight: "600px", width: "100%" }}
              >
                {c.name}
                <Badge
                  pill
                  variant='light'
                  className='ml-0'
                  style={{ paddingTop: "5px", color: "#1877f2" }}
                >
                  {c?.sum}
                </Badge>
              </Button>
            </li>
          ))}
        <ButtonGroup toggle vertical style={{ width: "100%" }}>
          {!main &&
            categories.map((c, idx) => (
              <ToggleButton
                key={c._id}
                type='radio'
                className='mb-2 d-flex justify-content-between text-capitalize text-dark px-1'
                variant='outline-category'
                name='tag'
                value={c._id}
                checked={selectedCategory === c._id}
                onChange={handleClickCategory}
                style={{ fontSize: "15px", fontWeight: "600px", width: "100%" }}
              >
                <span style={{ fontSize: "15px", fontWeight: "600px" }}>
                  {c.name}
                </span>

                <Badge
                  pill
                  variant='light'
                  className='ml-5'
                  style={{ paddingTop: "5px", color: "#1877f2" }}
                >
                  {c?.count}
                </Badge>
              </ToggleButton>
            ))}
        </ButtonGroup>
      </ul>

      <div className='py-2 px-4 bg-light text-dark mb-5'>
        <strong className='text-uppercase font-weight-bold'>Price range</strong>
      </div>
      <div className='price-range'>
        <div className='row justify-content-center'>
          <div className='col-11'>
            <InputRange
              minValue={0}
              maxValue={500000}
              step={10000}
              onChange={handlePriceRange}
              value={priceRange}
            />
          </div>
        </div>

        <div className='row pt-3 mb-3'>
          <div className='col-6'>
            <strong className='small font-weight-bold text-uppercase'>
              From
            </strong>
          </div>
          <div className='col-6 text-right'>
            <strong className='small font-weight-bold text-uppercase'>
              To
            </strong>
          </div>
        </div>
      </div>
      <div className='py-2 px-4 bg-light text-dark mt-5 mb-3'>
        <strong className='text-uppercase font-weight-bold'>sort by</strong>
      </div>
      <Select
        options={options}
        defaultValue={selectedSort}
        onChange={handleSelectedSort}
      />
    </>
  );
};

export default FilterBar;
