import React, { useState } from "react";
import { Box, Button, Rating, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../State/store";

const CreateReview = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const auth = useAppSelector((s) => s.auth);

  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const arr: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await toBase64(file);
      arr.push(base64 as string);
    }
    setImages((prev) => [...prev, ...arr]);
  };

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    const key = `reviews_${productId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");

    const newReview = {
      id: Date.now(),
      author: auth.user?.fullName || auth.user?.email || "Anonymous",
      date: new Date().toISOString(),
      rating: rating || 0,
      comment,
      images,
    };

    const updated = [newReview, ...existing];
    localStorage.setItem(key, JSON.stringify(updated));

    // Navigate back to product details where productId is used
    navigate(`/product-details/0/x/${productId}`);
  };

  return (
    <Box className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Rating value={rating} onChange={(_e, v) => setRating(v)} />
        </div>

        <div>
          <TextField
            label="Comment"
            multiline
            rows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          <div className="flex gap-2 mt-2">
            {images.map((src, idx) => (
              <img key={idx} src={src} className="w-24 h-24 object-cover" alt={`preview-${idx}`} />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" variant="contained" color="primary">
            Submit Review
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default CreateReview;
