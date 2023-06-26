const ChiefEditor = require("../models/UserModels/chiefEditorModel");
const Reviewer = require("../models/UserModels/reviewerModel");
const SectionEditor = require("../models/UserModels/sectionEditorModel");
const SelectionAssistantEditor = require("../models/UserModels/selectionAssistantEditorModel");
const User = require("../models/UserModels/userModel");
const VicePresident = require("../models/UserModels/vicePresidentModel");
const Grade = require("../models/gradeModel");
const Section = require("../models/sectionModel");
const Organization = require("../models/OrganizationModels/organizationModel");
const OrganizationItem = require("../models/OrganizationModels/organization-item-Model");
const Paper = require("../models/PaperModels/paperModel");
const PaperItem = require("../models/PaperModels/paper-item-Model");

exports.getAllSectionEditors = (req, res, next) => {
  SectionEditor.findAll({ include: [{ model: Section }, { model: User }] })
    .then((sectionEditors) => {
      if (!sectionEditors) {
        const error = new Error("No section editors");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ users: sectionEditors });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllReviewers = (req, res, next) => {
  User.findAll({
    where: { role: "reviewer" },
    include: [{ model: Reviewer }],
  })
    .then((reviewers) => {
      if (!reviewers) {
        const error = new Error("No reviewers");
        error.statusCode = 404;
        throw error;
      }
      Paper.findAll().then((papers) => {
        PaperItem.findAll().then((paperItems) => {
          res
            .status(200)
            .json({ users: reviewers, papers: papers, paperItems: paperItems });
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllChiefEditors = (req, res, next) => {
  ChiefEditor.findAll({ include: [{ model: User }] })
    .then((chiefEditors) => {
      if (!chiefEditors) {
        const error = new Error("No chief editors");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ users: chiefEditors });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.putChiefEditor = (req, res, next) => {
  const chiefEditorsIds = [
    {
      chiefEditorId: req.body.chiefEditorId1,
    },
    {
      chiefEditorId: req.body.chiefEditorId2,
    },
    {
      chiefEditorId: req.body.chiefEditorId3,
    },
    {
      chiefEditorId: req.body.chiefEditorId4,
    },
    {
      chiefEditorId: req.body.chiefEditorId5,
    },
    {
      chiefEditorId: req.body.chiefEditorId6,
    },
    {
      chiefEditorId: req.body.chiefEditorId7,
    },
    {
      chiefEditorId: req.body.chiefEditorId8,
    },
    {
      chiefEditorId: req.body.chiefEditorId9,
    },
    {
      chiefEditorId: req.body.chiefEditorId10,
    },
    {
      chiefEditorId: req.body.chiefEditorId11,
    },
    {
      chiefEditorId: req.body.chiefEditorId12,
    },
    {
      chiefEditorId: req.body.chiefEditorId13,
    },
  ];

  const updatePromises = [];

  for (let index = 0; index < 13; index++) {
    const updatePromise = Section.findOne({ where: { idSection: index + 1 } })
      .then((section) => {
        if (!section) {
          const error = new Error(`Section ${index + 1} not found`);
          error.statusCode = 404;
          throw error;
        }
        console.log(
          "index: " +
            index +
            " section: " +
            section.idSection +
            " idChiefEditor: " +
            chiefEditorsIds[index].chiefEditorId
        );
        return section.update({
          idChiefEditor: chiefEditorsIds[index].chiefEditorId,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        throw err; // Rethrow the error to be caught by Promise.all()
      });

    updatePromises.push(updatePromise);
  }

  Promise.all(updatePromises)
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.changeSectionEditorSection = (req, res, next) => {
  const userId = req.body.userId;
  const sectionId = req.body.sectionId;
  SectionEditor.findOne({ where: { idUser: userId } })
    .then((user) => {
      if (!user) {
        const error = new Error("No user");
        error.statusCode = 404;
        throw error;
      }

      if (!sectionId) {
        const error = new Error("No section");
        error.statusCode = 404;
        throw error;
      }

      user.update({ idSection: sectionId });
      return res
        .status(201)
        .json({ message: "Section is changed successfully!" });
    })
    .catch((err) => {
      throw err;
    });
};

exports.changeUserRole = (req, res, next) => {
  const userId = req.body.userId;
  const role = req.body.role;

  User.findOne({ where: { idUser: userId } })
    .then((user) => {
      if (!user) {
        const error = new Error("No user");
        error.statusCode = 404;
        throw error;
      }
      const UserClass = getUserClass(role);
      if (!UserClass) {
        const error = new Error("Invalid user type");
        error.statusCode = 400;
        throw error;
      }
      const currentUserType = getUserClass(user.role);
      if (!currentUserType) {
        UserClass.create({ id: userId, idUser: userId })
          .then(() => {
            user.update({ role: role });
            if (role == "reviewer") {
              Grade.create({
                id: userId,
                idUser: userId,
              });
            }
            res.status(200).json({ message: "User role updated successfully" });
          })
          .catch((err) => {
            throw err;
          });
      } else {
        currentUserType
          .findOne({ where: { idUser: userId } })
          .then((findedUser) => {
            findedUser.destroy().then(() => {
              UserClass.create({ id: userId, idUser: userId })
                .then(() => {
                  user.update({ role: role });
                  if (role == "reviewer") {
                    Grade.create({
                      id: userId,
                      idUser: userId,
                    });
                  }
                  res
                    .status(200)
                    .json({ message: "User role updated successfully" });
                })
                .catch((err) => {
                  throw err;
                });
            });
          });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.assignReviewersSection = async (req, res, next) => {
  console.log("girdi");
  let reviewers = await createReviewers();
  let sections = await Section.findAll();
  let sectionAverages = await computeSectionAverages(sections, reviewers);
  const reviewerLenght = reviewers.length;
  let count = 1;
  for (const section of sections) {
    const currentSection = getSectionWithLowestAverage(sectionAverages);
    const orderedReviewers = orderReviewers(
      reviewers,
      currentSection,
      sectionAverages
    );

    let k = Math.floor(reviewerLenght / 13); // Number of reviewers per section
    if (count == 13) {
      k = reviewers.length;
    }
    const assignedReviewers = orderedReviewers.slice(0, k);

    await updateSectionWithReviewers(currentSection, assignedReviewers);
    reviewers = await removeAssignedReviewers(assignedReviewers, reviewers);
    sections = await removeSection(currentSection, sections);
    reviewers = await removeGrade(currentSection, reviewers);
    sectionAverages = await computeSectionAverages(sections, reviewers);
    count++;
  }
  res
    .status(200)
    .json({ message: "Reviewers assigned to sections successfully." });
};

exports.assignPapersToReviewers = async (req, res, next) => {
  const sectionId = req.body.sectionId;
  let reviewers = await createReviewersForAssignment(sectionId);
  let papers = await Paper.findAll({ where: { idSection: sectionId } });
  let paperBidAverages = await computePaperBidAverages(papers, reviewers);
  let count = 1;
  let paperLength = papers.length;
  for (const paper of papers) {
    const currentPaperId = getPaperWithLowestBidAverage(paperBidAverages);
    const orderedReviewers = orderReviewersByBidLevel(
      reviewers,
      currentPaperId,
      paperBidAverages
    );
    let k = 2;

    const assignedReviewers = orderedReviewers.slice(0, k);
    await updatePapersWithReviewers(currentPaperId, assignedReviewers);
    reviewers = await removeAssignedReviewersForPaperAssignment(
      assignedReviewers,
      reviewers
    );
    papers = await removePaper(currentPaperId, papers);
    reviewers = await removePaperItem(currentPaperId, reviewers);
    paperBidAverages = await computePaperBidAverages(papers, reviewers);
    count++;
  }
  res
    .status(200)
    .json({ message: "Reviewers assigned to sections successfully." });
};

//Helper Functions

async function removeGrade(currentSection, reviewers) {
  reviewers.forEach((reviewer) => {
    reviewer.grades[currentSection - 1] = null; // Or assign any other appropriate value
  });

  return reviewers;
}

async function removePaperItem(currentPaperId, reviewers) {
  reviewers.forEach((reviewer) => {
    reviewer.paperItems.filter(
      (paperItem) => !(paperItem.paperIdPaper == currentPaperId)
    );
  });
  return reviewers;
}

async function removeSection(currentSection, sections) {
  sections = sections.filter(
    (section) => !(section.idSection == currentSection)
  );
  return sections;
}

async function removePaper(currentPaperId, papers) {
  papers = papers.filter((paper) => !(paper.idPaper == currentPaperId));

  return papers;
}

async function removeAssignedReviewers(assignedReviewers, reviewers) {
  const assignedReviewersIds = assignedReviewers.map(
    (reviewer) => reviewer.idUser
  );

  reviewers = reviewers.filter(
    (reviewer) => !assignedReviewersIds.includes(reviewer.idUser)
  );

  return reviewers;
}

async function removeAssignedReviewersForPaperAssignment(
  assignedReviewers,
  reviewers
) {
  assignedReviewers.map(async (reviewer) => {
    if (reviewer.assignment == 2) {
      reviewers = reviewers.filter(
        (foundReviewer) => !(foundReviewer.idUser === reviewer.idUser)
      );
    }
  });
  return reviewers;
}

async function updateSectionWithReviewers(currentSection, assignedReviewers) {
  await Promise.all(
    assignedReviewers.map(async (reviewer) => {
      const foundReviewer = await Reviewer.findOne({
        where: { id: reviewer.idUser },
      });
      await foundReviewer.update({ idSection: currentSection });
    })
  );
}

async function updatePapersWithReviewers(currentPaperId, assignedReviewers) {
  await Promise.all(
    assignedReviewers.map(async (reviewer) => {
      const foundReviewer = await Reviewer.findOne({
        where: { idUser: reviewer.idUser },
      });
      const associatedPaperItem = await PaperItem.findOne({
        where: {
          userIdUser: foundReviewer.idUser,
          paperIdPaper: currentPaperId,
        },
      });

      if (associatedPaperItem) {
        await associatedPaperItem.update({
          assigned: true,
        });
      } else {
        await PaperItem.create({
          reviewed: false,
          assigned: true,
          userIdUser: foundReviewer.idUser,
          paperIdPaper: currentPaperId,
        });
      }
      foundReviewer.assignment++;
    })
  );
}

function orderReviewers(reviewers, currentSection, sectionAverages) {
  reviewers.sort((a, b) => {
    const currentSectionGradeA = a.grades[currentSection - 1];
    const currentSectionGradeB = b.grades[currentSection - 1];
    if (currentSectionGradeA !== currentSectionGradeB) {
      return currentSectionGradeB - currentSectionGradeA; // Higher grade first
    }

    const averageA = getReviewerAverage(a, currentSection, sectionAverages);
    const averageB = getReviewerAverage(b, currentSection, sectionAverages);
    return averageA - averageB; // Lower average first
  });

  return reviewers;
}

function orderReviewersByBidLevel(reviewers, currentPaperId, paperBidAverages) {
  reviewers.sort((a, b) => {
    const currentPaperBidLevelA = a.paperItems.find(
      (paperItem) => paperItem.paperIdPaper == currentPaperId
    )
      ? a.paperItems.find(
          (paperItem) => paperItem.paperIdPaper == currentPaperId
        ).bidLevel
      : 0;
    const currentPaperBidLevelB = b.paperItems.find(
      (paperItem) => paperItem.paperIdPaper == currentPaperId
    )
      ? b.paperItems.find(
          (paperItem) => paperItem.paperIdPaper == currentPaperId
        ).bidLevel
      : 0;

    if (currentPaperBidLevelA !== currentPaperBidLevelB) {
      return currentPaperBidLevelB - currentPaperBidLevelA; //higher grade first
    }

    const averageA = getReviewerBidAverage(a, currentPaperId, paperBidAverages);
    const averageB = getReviewerBidAverage(a, currentPaperId, paperBidAverages);
    return averageA - averageB; // Lower average first
  });
  return reviewers;
}

function getReviewerAverage(reviewer, currentSection, sectionAverages) {
  let sum = 0;
  let count = 0;
  for (const sectionAverage of sectionAverages) {
    if (sectionAverage.sectionId !== currentSection) {
      if (reviewer.grades[sectionAverage.sectionId - 1] != null) {
        sum += reviewer.grades[sectionAverage.sectionId - 1];
        count++;
      }
    }
  }
  return count != 0 ? sum / count : 0;
}

function getReviewerBidAverage(reviewer, currentPaperId, paperBidAverages) {
  let sum = 0;
  let count = 0;
  for (const paperAverage of paperBidAverages) {
    if (paperAverage.paperId !== currentPaperId) {
      const paperItemBid = PaperItem.findOne({
        where: {
          userIdUser: reviewer.idUser,
          paperIdPaper: paperAverage.paperId,
        },
      });

      if (paperItemBid) {
        sum = sum + paperItemBid.bidLevel;
      } else {
        sum = sum + 0;
      }
      count++;
    }
  }
  return count != 0 ? sum / count : 0;
}

function getSectionWithLowestAverage(sectionAverages) {
  // Sort the section averages in ascending order based on average score
  sectionAverages.sort((a, b) => a.average - b.average);
  return sectionAverages[0].sectionId;
}

function getPaperWithLowestBidAverage(paperBidAverages) {
  paperBidAverages.sort((a, b) => a.average - b.average);
  return paperBidAverages[0].paperId;
}

async function computeSectionAverages(sections, reviewers) {
  const sectionAverages = [];
  for (const section of sections) {
    // Compute the average grade for the section
    const average = await computeAverageGradeForSection(
      section.idSection,
      reviewers
    );
    sectionAverages.push({ sectionId: section.idSection, average });
  }
  return sectionAverages;
}

async function computePaperBidAverages(papers, reviewers) {
  const paperAverages = [];
  for (const paper of papers) {
    const average = await computeAverageBidForPaper(paper, reviewers);
    paperAverages.push({ paperId: paper.idPaper, average });
  }
  return paperAverages;
}

async function computeAverageBidForPaper(paper, reviewers) {
  let sum = 0;
  for (const reviewer of reviewers) {
    const paperItemBid = PaperItem.findOne({
      where: { userIdUser: reviewer.idUser, paperIdPaper: paper.idPaper },
    });

    if (paperItemBid) {
      sum = sum + paperItemBid.bidLevel;
    } else {
      sum = sum + 0;
    }
  }
  return sum / reviewers.length;
}

async function computeAverageGradeForSection(sectionId, reviewers) {
  // Query the grades for the section and compute the average
  let sum = 0;
  for (const reviewer of reviewers) {
    if (reviewer.grades[sectionId - 1] != null) {
      sum = sum + reviewer.grades[sectionId - 1];
    }
  }
  return sum / reviewers.length;
}

async function createReviewersForAssignment(sectionId) {
  const reviewers = [];
  const allReviewers = await Reviewer.findAll({
    where: { idSection: sectionId },
  });
  for (const reviewer of allReviewers) {
    const paperItems = await PaperItem.findAll({
      where: { userIdUser: reviewer.idUser },
    });
    paperItems.forEach((paperItem) =>
      paperItem.update({
        assigned: false,
      })
    );
    reviewers.push({
      idUser: reviewer.idUser,
      paperItems: paperItems,
      assignment: 0,
    });
  }
  return reviewers;
}

async function createReviewers() {
  const reviewers = [];
  const allReviewers = await Reviewer.findAll();

  for (const reviewer of allReviewers) {
    const grade = await Grade.findOne({ where: { idUser: reviewer.idUser } });
    reviewers.push({
      idUser: reviewer.idUser,
      grades: [
        grade.grade1,
        grade.grade2,
        grade.grade3,
        grade.grade4,
        grade.grade5,
        grade.grade6,
        grade.grade7,
        grade.grade8,
        grade.grade9,
        grade.grade10,
        grade.grade11,
        grade.grade12,
        grade.grade13,
      ],
    });
  }

  return reviewers;
}

function getUserClass(userType) {
  switch (userType) {
    case "chiefeditor":
      return ChiefEditor;
    case "reviewer":
      return Reviewer;
    case "sectioneditor":
      return SectionEditor;
    case "selectionassistanteditor":
      return SelectionAssistantEditor;
    case "vicepresident":
      return VicePresident;
    default:
      return null;
  }
}
