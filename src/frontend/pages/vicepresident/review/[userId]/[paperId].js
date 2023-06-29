import FullReviewForm from "../../../../components/MakeReview/FullReviewForm";
import LightReviewForm from "../../../../components/MakeReview/LightReviewForm";
import NavbarMenu from "../../../../components/UI/NavbarMenu";
import { useRouter } from "next/router";

const MakeReviewPage = (props) => {
  const router = useRouter();
  const { userId, paperId } = router.query;
  return (
    <div className="overflow-hidden">
      <NavbarMenu></NavbarMenu>
      <LightReviewForm userId={userId} paperId={paperId}></LightReviewForm>
    </div>
  );
};

export default MakeReviewPage;
