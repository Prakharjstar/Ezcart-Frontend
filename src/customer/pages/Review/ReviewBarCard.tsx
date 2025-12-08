import React from "react";
import { Card, CardContent, LinearProgress } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';


const ReviewBarCard = ()=>{
    const ratings = [
    { star: 5, percent: 70 },
    { star: 4, percent: 20 },
    { star: 3, percent: 5 },
    { star: 2, percent: 3 },
    { star: 1, percent: 2 },
  ];

  return (
    <Card elevation={2} sx={{ padding: 2 }}>
      <CardContent>

        {/* Heading */}
        <p className="text-xl font-semibold mb-2">Ratings & Reviews</p>

        {/* Big rating number */}
        <div className="flex items-center gap-2 mb-4">
          <p className="text-4xl font-bold">4.5</p>
          <StarIcon className="text-yellow-500" />
          <span className="text-gray-500">(210 reviews)</span>
        </div>

        {/* Bars */}
        <div className="space-y-2">
          {ratings.map((item) => (
            <div key={item.star} className="flex items-center gap-2">
              <span className="w-6">{item.star}★</span>

              <LinearProgress
                variant="determinate"
                value={item.percent}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  flexGrow: 1
                }}
              />

              <span className="w-10 text-sm text-gray-600">{item.percent}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewBarCard