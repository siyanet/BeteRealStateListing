import { useEffect, useState } from "react";
import OwnerComponent from "../Components/OwnerComponent"
import ReviewCard from "../Components/ReviewCard";
import { Review } from "../Redux/ReviewSlice";
import axiosInstance from "../Components/axiosInstance";


const OwnerReviewView:React.FC = () => {

    const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get("review/");
        setReviews(response.data as Review[]);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);


  return (
  <OwnerComponent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review.uuid}
            name={review.customer_name}
            word={review.comment}
            number={review.rating}
          />
        ))}
      </div>
  </OwnerComponent>
  )
}

export default OwnerReviewView
