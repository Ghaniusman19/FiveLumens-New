import React from "react";
import Container from "../Components/Container";
import ScoreCardHeaderEdit from "../Components/ScoreCardEditComponents/ScoreCardHeaderEdit";
import TotalPossiblePoints from "../Components/ScoreCardEditComponents/TotalPossiblePoints";
import ScoreCardAddSection from "../Components/ScoreCardEditComponents/ScoreCardAddSection";
function ScoreCardEdit() {
  return (
    <Container>
      <div className="bg-white shadow-md rounded-lg mb-4  p-3 ">
        <ScoreCardHeaderEdit />
        <ScoreCardAddSection />
        <TotalPossiblePoints />
      </div>
    </Container>
  );
}

export default ScoreCardEdit;
