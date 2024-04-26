import axios from "axios";

const baseUrl = "http://localhost:5050/api/cheeses/"

export const fetchData = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching cheeses:', error);
    return null;
  }
};

export const refreshData = async () => {
    try {
      const response = await axios.get(baseUrl);
      console.log('Cheese refreshed successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching cheeses:', error);
      return null;
    }
  };

export const handleAdd = async () => {
  try {
    const newCheeseData = {
      name: 'Mozzarella',
      pricePerKilo: '$79',
      color: 'White',
      image: 'mozzarella.jpg'
    };
    const response = await axios.post(baseUrl, newCheeseData);
    console.log('Cheese added successfully:', response.data);
    return true;
  } catch (error) {
    console.error('Error adding cheese:', error);
    return false;
  }
};

export const handleUpdate = async (cheese) => {
  try {
    const updatedCheeseData = {
      name: `Updated ${cheese.name}`,
      pricePerKilo: '$1000',
      color: 'Black',
      image: cheese.image
    };
    const response = await axios.put(baseUrl + cheese.id, updatedCheeseData);
    console.log('Cheese updated successfully:', response.data);
    return true;
  } catch (error) {
    console.error('Error deleting cheese:', error);
    return false;
  }
};

export const handleDelete = async (cheeseId) => {
  try {
    await axios.delete(baseUrl + cheeseId);
    console.log('Cheese deleted successfully');
  } catch (error) {
    console.error('Error deleting cheese:', error);
  }
};