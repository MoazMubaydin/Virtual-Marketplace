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
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function CreateProduct({
  close,
  setUserProducts,
  setHomeProducts,
}) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategoroy] = useState(null);
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);
  const imageUpload = async () => {
    const formData = new FormData();
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
  const getHomeProducts = async () => {
    try {
      const response = await axios.get(`${DB_URL}/api/products`);
      console.log(response.data);
      if ("products" in response.data) {
        setHomeProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserProducts = async () => {
    try {
      const response = await axios.get(
        `${DB_URL}/api/user/products/${user._id}`
      );
      if ("products" in response.data) {
        setUserProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || !stock) {
      return setError("All required values must be entered");
    }
    try {
      const uploadedImage = await imageUpload();

      if (!uploadedImage) {
        return setError("Image upload failed. Please try again.");
      }
      const newItem = {
        name,
        description,
        price,
        category,
        image: uploadedImage,
        stock,
      };

      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.post(`${DB_URL}/api/products`, newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getHomeProducts();
      getUserProducts();

      setName("");
      setDescription("");
      setPrice(0);
      setCategoroy("");
      setImage("");
      setStock(1);
      setError("");
      close();
    } catch (error) {
      console.error("Error submitting product:", error);
      setError("Failed to create product. Please try again.");
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
        required
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
          placeholder="€ Euro"
          leftSection="€"
          value={price}
          onChange={(value) => {
            setPrice(value);
          }}
        />
        <NumberInput
          label="Stock"
          hideControls
          required
          placeholder="stock"
          value={stock || 1}
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
      <Button onClick={handleSubmit} ml={"130"} mr={"130"}>
        Create Product
      </Button>
    </form>
  );
}
