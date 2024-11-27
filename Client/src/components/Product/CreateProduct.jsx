import {
  Button,
  FileInput,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function CreateProduct({ close, setProducts }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategoroy] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState(1);
  const [error, setError] = useState();

  const { user } = useContext(AuthContext);
  const imageUpload = async () => {
    if (!image) {
      return alert("please select an image to upload.");
    }
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
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${DB_URL}/api/user/products/${user._id}`
      );
      if ("products" in response.data) {
        setProducts(response.data.products);
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

      getProducts();
      // Reset form fields
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
        label="Description"
        placeholder="Product description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <NumberInput
        required
        label="Price"
        placeholder="Euro"
        prefix="€"
        mb="md"
        value={price || 0.0}
        onChange={(value) => {
          setPrice(value);
        }}
      />
      <NumberInput
        label="Stock"
        required
        placeholder="stock"
        mt="md"
        value={stock || 1}
        onChange={(value) => {
          setStock(value);
        }}
      />
      <Select
        label="Category"
        required
        placeholder="Pick value"
        data={["food", "pottery", "jewelry, clothing", "art"]}
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
      <Button onClick={handleSubmit}>Create Product</Button>
    </form>
  );
}
