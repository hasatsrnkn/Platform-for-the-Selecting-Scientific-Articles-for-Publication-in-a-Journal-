import NavbarMenu from "../../../components/UI/NavbarMenu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GradeSkillsForm from "../../../components/GradeSkills/GradeSkillsForm";

const GradeSkillsPage = (props) => {
    const token = useSelector((state) => state.auth.token);
    const userID = useSelector((state) => state.auth.userID);
    
    return(<div>
        <NavbarMenu></NavbarMenu>
        <GradeSkillsForm></GradeSkillsForm>
    </div>);
}

export default GradeSkillsPage;