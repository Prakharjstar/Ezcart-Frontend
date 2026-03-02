import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SimilarProduct = () => {
  return (
    <div className="flex justify-center">
      <Link to="/">
        <Button variant="contained" className="bg-primary-color text-white font-medium py-2 px-4 rounded">
         Back
        </Button>
      </Link>
    </div>
  );
};

export default SimilarProduct;
