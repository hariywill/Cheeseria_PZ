import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheeseDetail from '../components/CheeseDetail';

describe('CheeseDetail component', () => {
  const selectedCheese = {
    name: 'Cheddar',
    pricePerKilo: '$10',
  };

  it('renders without crashing', () => {
    render(<CheeseDetail selectedCheese={selectedCheese} />);
  });

  it('displays the selected cheese name and price per kilo', () => {
    const { getByText } = render(<CheeseDetail selectedCheese={selectedCheese} />);
    expect(getByText(`Selected cheese: ${selectedCheese.name}`)).toBeInTheDocument();
    expect(getByText(`Cheese price per kilo: ${selectedCheese.pricePerKilo}`)).toBeInTheDocument();
  });

  it('updates the weight input field correctly', () => {
    const { getByLabelText } = render(<CheeseDetail selectedCheese={selectedCheese} />);
    const weightInput = getByLabelText('Weight (kg)');
    fireEvent.change(weightInput, { target: { value: '0.5' } });
    expect(weightInput.value).toBe('0.5');
  });

  it('displays helper text for invalid input', () => {
    const { getByLabelText, getByText } = render(<CheeseDetail selectedCheese={selectedCheese} />);
    const weightInput = getByLabelText('Weight (kg)');
    fireEvent.change(weightInput, { target: { value: 'abc' } });
    expect(getByText('Input needs to be number only')).toBeInTheDocument();
  });

  it('calculates the total price correctly', () => {
    const { getByText, getByLabelText } = render(<CheeseDetail selectedCheese={selectedCheese} />);
    const weightInput = getByLabelText('Weight (kg)');
    fireEvent.change(weightInput, { target: { value: '1' } });
    fireEvent.click(getByText('Calculate'));
    expect(getByText((content, element) => {
      return content.startsWith('Total price:');
    })).toBeInTheDocument();
  });
});