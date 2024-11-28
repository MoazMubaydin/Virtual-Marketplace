import {
  Button,
  FileInput,
  Group,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function EditProduct({ close, product }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategoroy] = useState(product.category);
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState(product.stock);
  const [error, setError] = useState();
  const categories = [
    "Food & Beverages",
    "Regional Delicacies",
    "Austrian Wines",
    "Beer & Craft Beverages",
    "Organic & Sustainable Foods",
    "Clothing & Traditional Wear",
    "Dirndl & Lederhosen",
    "Traditional Accessories",
    "Modern Fashion",
    "Outdoor & Alpine Clothing",
    "Home & Living",
    "Austrian Pottery & Ceramics",
    "Handmade Linens & Textiles",
    "Alpine-Style Home Décor",
    "Furniture",
    "Arts & Crafts",
    "Austrian Paintings & Sculptures",
    "Woodwork & Handcrafted Items",
    "Traditional Folk Art",
    "Jewelry",
    "Books & Media",
    "Austrian Literature & History Books",
    "Travel Guides for Austria",
    "Music",
    "Films & Documentaries",
    "Health & Beauty",
    "Natural Skincare",
    "Wellness & Spa Products",
    "Austrian Health Supplements",
    "Essential Oils",
    "Sports & Outdoors",
    "Ski Equipment & Gear",
    "Hiking Accessories",
    "Cycling Equipment",
    "Fitness Wear",
    "Toys & Hobbies",
    "Traditional Wooden Toys",
    "Board Games",
    "Hobby Kits",
    "Musical Instruments",
    "Local Products",
    "Austrian Souvenirs",
    "Handmade Crafts from Local Artisans",
    "Specialty Cheeses & Meats",
    "Eco-Friendly & Sustainable Products",
    "Seasonal Categories",
    "Christmas Market Goods",
    "Advent Wreaths & Calendars",
    "Ornaments & Decorations",
    "Glühwein Sets",
  ];
  const imageUpload = async () => {
    const formData = new FormData();
    console.log(image);
    formData.append("image", image);
    try {
      const responce = await axios.post(`${DB_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return responce.data.imageUrl;
    } catch (error) {
      console.log("Error uploading image", error);
      setError(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || !stock) {
      return setError("All required values must be entered");
    }
    try {
      let uploadedImage;
      if (image) {
        uploadedImage = await imageUpload();
        if (!uploadedImage) {
          return setError("Image upload failed. Please try again.");
        }
      }

      const updatedItem = {
        name,
        description,
        price,
        category,
        image: uploadedImage || product.image,
        stock,
      };

      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.patch(
        `${DB_URL}/api/products/${product._id}`,
        updatedItem,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      close();
    } catch (error) {
      console.error("Error submitting product:", error);
      setError(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter the products name"
      />
      <Textarea
        resize="vertical"
        label="Description"
        placeholder="Product description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Group>
        <NumberInput
          hideControls
          required
          label="Price"
          placeholder="Euro"
          leftSection="€"
          value={price}
          onChange={(value) => {
            setPrice(value);
          }}
        />
        <NumberInput
          hideControls
          label="Stock"
          required
          placeholder="stock"
          value={stock}
          onChange={(value) => {
            setStock(value);
          }}
        />
      </Group>
      <Select
        label="Category"
        required
        placeholder="Pick value"
        data={categories}
        value={category}
        onChange={(value) => {
          setCategoroy(value);
        }}
        searchable
      />
      <FileInput
        label="Upload image"
        placeholder="Upload image"
        value={image}
        onChange={(value) => {
          setImage(value);
        }}
      />
      <p>{error}</p>
      <Button onClick={handleSubmit}>Update Product</Button>
    </form>
  );
}
