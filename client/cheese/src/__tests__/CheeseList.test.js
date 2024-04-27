import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheeseList from '../components/CheeseList';

describe('CheeseList component', () => {
  const cheeses = [
    { id: 1, name: 'Cheddar', image: 'cheddar.jpg', pricePerKilo: '$10', color: 'Yellow' },
    { id: 2, name: 'Brie', image: 'brie.jpg', pricePerKilo: '$12', color: 'White' },
  ];

  it('renders without crashing', () => {
    render(<CheeseList cheeses={[]} />);
  });

  it('renders the correct number of cheese items', () => {
    const { getAllByTestId } = render(<CheeseList cheeses={cheeses} />);
    const cheeseItems = getAllByTestId('cheese-item');
    expect(cheeseItems).toHaveLength(cheeses.length);
  });

  it('renders each cheese item with the correct properties', () => {
    const { getByText, getByAltText } = render(<CheeseList cheeses={cheeses} />);
    cheeses.forEach((cheese) => {
      expect(getByText(cheese.name)).toBeInTheDocument();
      expect(getByText(`${cheese.pricePerKilo} per kilo`)).toBeInTheDocument();
      expect(getByText(cheese.color)).toBeInTheDocument();
      expect(getByAltText(cheese.name)).toBeInTheDocument();
    });
  });

  it('calls setSelectedCheese when a cheese is selected', () => {
    const setSelectedCheese = jest.fn();
    const { getAllByTestId } = render(
      <CheeseList cheeses={cheeses} setSelectedCheese={setSelectedCheese} />
    );
    const selectButton = getAllByTestId(`select-${cheeses[0].id}`);
    fireEvent.click(selectButton[0]);
    expect(setSelectedCheese).toHaveBeenCalledWith(cheeses[0]);
  });

  it('calls handleDelete when delete button is clicked', () => {
    const handleDelete = jest.fn();
    const { getAllByTestId } = render(
      <CheeseList cheeses={cheeses} handleDelete={handleDelete} />
    );
    const deleteButton = getAllByTestId(`delete-${cheeses[0].id}`);
    fireEvent.click(deleteButton[0]);
    expect(handleDelete).toHaveBeenCalledWith(cheeses[0].id);
  });
});