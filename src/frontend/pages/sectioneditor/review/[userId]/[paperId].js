import FullReviewForm from "../../../../components/MakeReview/FullReviewForm";
import NavbarMenu from "../../../../components/UI/NavbarMenu";
import { useRouter } from "next/router";

const MakeReviewPage = (props) => {
  const router = useRouter();
  const { userId, paperId } = router.query;
  return (
    <div className="overflow-hidden">
      <NavbarMenu></NavbarMenu>
      <FullReviewForm userId={userId} paperId={paperId}></FullReviewForm>
    </div>
  );
};

export default MakeReviewPage;
