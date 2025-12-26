import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import { useFormik } from "formik";
import { uploadToCloudinary } from "../../../Util/uploadToCloudnary";
import mainCategory from "../../../data/category/mainCategory";
import menLevelTwo from "../../../data/category/level two/menLevelTwo";
import womenleveltwo from "../../../data/category/level two/womenLevelTwo";
import furnitureLevelTwo from "../../../data/category/level two/furnitureLevelTwo";
import electronicsLevelTwo from "../../../data/category/level two/electroicsLevelTwo";
import menLevelThree from "../../../data/category/level three/menLevelThree";
import womenLevelThree from "../../../data/category/level three/womenLevelThree";
import furnitureLevelThree from "../../../data/category/level three/furnitureLevelThree";
import electronicsMobilesLevelThree from "../../../data/category/level three/electronicsLevelThree";

import colors from "../../../data/category/Filter/color";

/* ===== CATEGORY DATA ===== */
const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenleveltwo,
  Kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  Kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsMobilesLevelThree,
};

const AddProduct = () => {
  const [uploadImage, setUploadingImage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      sizes: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.title) errors.title = "Title is required";
      if (!values.description) errors.description = "Description is required";
      if (!values.mrpPrice) errors.mrpPrice = "MRP Price is required";
      if (!values.sellingPrice) errors.sellingPrice = "Selling Price is required";
      if (!values.quantity) errors.quantity = "Quantity is required";
      if (!values.color) errors.color = "Color is required";
      if (!values.sizes) errors.sizes = "Size is required";
      if (!values.category) errors.category = "Category is required";
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      setSnackbarOpen(true);
    },
  });

  /* ===== IMAGE HANDLERS ===== */
  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index: any) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => child.parentCategoryId == parentCategoryId);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="p-4">
        <Grid container spacing={2}>

          {/* ================= IMAGES ================= */}
          <Grid size={{xs:12}}>
            <p className="mb-2 font-medium">
              Product Images <span className="text-red-500">*</span>
            </p>

            <div className="flex gap-4 flex-wrap">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id="fileInput"
                  onChange={handleImageChange}
                />

                <label htmlFor="fileInput">
                  <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer">
                    <AddPhotoAlternateIcon />
                  </div>
                </label>

                {uploadImage && (
                  <div className="absolute inset-0 flex justify-center items-center bg-white/70">
                    <CircularProgress size={26} />
                  </div>
                )}
              </div>

              {formik.values.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt="product"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveImage(index)}
                    sx={{ position: "absolute", top: -8, right: -8, backgroundColor: "white" }}
                  >
                    <CloseIcon sx={{ fontSize: "0.9rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          {/* ================= TITLE ================= */}
          <Grid size = {{xs:12}}>
            <TextField
              fullWidth
              required
              label="Product Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.title)}
              helperText={formik.errors.title}
            />
          </Grid>

          {/* ================= COLOR ================= */}
          <Grid size ={{xs:12}}>
            <TextField
              fullWidth
              required
              label="Color"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.color)}
              helperText={formik.errors.color}
            />
          </Grid>

          {/* ================= DESCRIPTION ================= */}
          <Grid size={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={4}
              id="description"
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean (formik.errors.description)}
              helperText={ formik.touched.description && formik.errors.description}
            />
          </Grid>

          {/* ================= PRICES ================= */}
          <Grid size = {{xs:12 , md:4 , lg:4}}>
            <TextField
              fullWidth
              required
              id="mrp_price"
              type="number"
              label="MRP Price"
              name="mrpPrice"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean (formik.errors.mrpPrice)}
              helperText={ formik.touched.mrpPrice && formik.errors.mrpPrice}
            />
          </Grid>

          <Grid size = {{xs:12 , md:4 , lg:3}}>
            <TextField
              fullWidth
              required
              id="sellingPrice"
              type="number"
              label="Selling Price"
              name="sellingPrice"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={formik.touched.sellingPrice && Boolean (formik.errors.sellingPrice)}
              helperText={ formik.touched.sellingPrice && formik.errors.sellingPrice}
            />
           
          </Grid>

          <Grid size = {{xs:12 , md:4 , lg:4}}>
            <TextField
              fullWidth
              required
              type="number"
              label="Quantity"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.sellingPrice && Boolean (formik.errors.sellingPrice)}
              helperText={ formik.touched.sellingPrice && formik.errors.sellingPrice}
            />
          </Grid>

          <Grid size = {{xs:12 , md:4 , lg:3}}>
            <FormControl 
            fullWidth
            error={formik.touched.color && Boolean(formik.errors.color)}
            required
            >
              <InputLabel id ="color-label">Color</InputLabel>
              <Select
              labelId="color-label"
              id="color"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
              label="color"
              >
                <MenuItem value ="">
                <em>None</em>
                </MenuItem>

                {colors.map((color ,index) => <MenuItem value = { color.name}>
                <div className="flex gap-3">
                  <span style={{backgroundColor : color.hex}} className={`h-5 w-5 rounded-full ${color.name ==="white" ? "border":""}`}></span>
                   <p>{color.name}</p>
                </div>
                </MenuItem>)}

              </Select>
              {formik.touched.color && formik.errors.color && (<FormHelperText>{formik.errors.color}</FormHelperText>)}

            </FormControl>

          </Grid>

          {/* ================= SIZE ================= */}
          <Grid size = {{xs:12 , md:4 , lg:3}}>
            <FormControl fullWidth required error={Boolean(formik.errors.sizes)}>
              <InputLabel>Size</InputLabel>
              <Select
              id="sizes"
                label="sizes-label"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
              >
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
              <FormHelperText>{formik.errors.sizes}</FormHelperText>
            </FormControl>
          </Grid>

          {/* ================= CATEGORY LEVEL 1 ================= */}
          <Grid size ={{xs:12 , md:4 ,lg:4}}>
            <FormControl fullWidth required error={Boolean(formik.errors.category)}>
              <InputLabel id ="category-label">Category</InputLabel>
              <Select

                label="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                {mainCategory.map((item)=>(
                  <MenuItem value = {item.categoryId}>{item.name}</MenuItem>

                ))}
              </Select>
              <FormHelperText>{formik.errors.category}</FormHelperText>
            </FormControl>
          </Grid>

          {/* ================= CATEGORY LEVEL 2 ================= */}
          <Grid size ={{xs:12 , md:4 ,lg:4}}>
            <FormControl fullWidth>
              <InputLabel id = "category2-label">Second Category</InputLabel>
              <Select
                labelId="category2-label"
                id="category"
                name="category2"
                value={formik.values.category2}
                onChange={formik.handleChange}
              >
                {childCategory(categoryTwo[formik.values.category2] || [], formik.values.category2).map((cat: any) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ================= CATEGORY LEVEL 3 ================= */}
          <Grid size ={{xs:12 , md:4 ,lg:4}}>
            <FormControl fullWidth>
              <InputLabel id="category3-label">Sub Category Level 3</InputLabel>
              <Select
                label="category3-label"
                name="category3"
                id="category"
                value={formik.values.category3}
                onChange={formik.handleChange}
              >
                {childCategory(categoryThree[formik.values.category] || [], formik.values.category2).map((cat: any) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ================= SUBMIT ================= */}
          <Grid size={{xs:12}}>
            <Button fullWidth variant="contained" type="submit">
              Add Product
            </Button>
          </Grid>

        </Grid>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success">Product Added Successfully</Alert>
      </Snackbar>
    </div>
  );
};

export default AddProduct;
