import ReviewerAssignedPapersList from "../../../components/ReviewerPaperList/ReviewerAssignedPaperList";
import NavbarMenu from "../../../components/UI/NavbarMenu";

const SectionEditorAssignedPapers = (props) => {

    return(<div className="overflow-hidden">
        <NavbarMenu></NavbarMenu>
        <ReviewerAssignedPapersList></ReviewerAssignedPapersList>
    </div>);
}

export default SectionEditorAssignedPapers;

