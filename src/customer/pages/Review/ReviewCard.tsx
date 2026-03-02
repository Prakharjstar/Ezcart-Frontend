import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

type Review = {
  id?: string | number;
  author?: string;
  date?: string;
  rating?: number;
  comment?: string;
  images?: string[];
};
const ReviewCard = ({ review, onDelete }: { review?: Review; onDelete?: (id?: string | number) => void }) => {
  if (!review) return null;
  const r = review;

  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Avatar className="text-white" sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}>
            {r.author?.[0]}
          </Avatar>
        </div>

        <div>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{r.author}</p>
              <p className="opacity-70">{r.date}</p>
            </div>
          </div>

          <Rating readOnly value={r.rating || 0} precision={0.5} />
          <p>{r.comment}</p>

          <div className="flex gap-2 mt-2">
            {(r.images || []).map((src, idx) => (
              <img key={idx} className="w-24 h-24 object-cover" src={src} alt="review" />
            ))}
          </div>
        </div>
      </div>

      <div>
        <IconButton onClick={() => onDelete && onDelete(r.id)} disabled={!onDelete}>
          <Delete sx={{ color: red[700] }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewCard;
