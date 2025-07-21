import React from "react";
import { useState } from "react";
import Button from "../Buttons/Button";
import { EllipsisVertical } from "lucide-react";
import AddSectionModal from "../ScoreCard/AddSectionModal";
import EditSectionModal from "../ScoreCard/EditSectionModal";
function ScoreCardAddSection() {
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [formDataArray, setFormDataArray] = useState([]);
  const [OpenModal, setOpenModal] = useState(false);
  const [openSectionDropdownIndex, setOpenSectionDropdownIndex] =
    useState(null);
  const [openEditSectionModal, setopenEditSectionModal] = useState(false);
  const scorecardTitle = localStorage.getItem("scorecardtitle");
  // const removeSection = (index) => {
  //   setFormDataArray(formDataArray.filter((_, i) => i !== index));
  // };

  const handleModal = () => {
    setOpenModal(!OpenModal);
  };
  const handleSectionDropdown = (index) => {
    setOpenSectionDropdownIndex((prev) => (prev === index ? null : index));
  };

  const toggleSectionDropdown = () => {
    setShowAddSectionModal(!showAddSectionModal);
  };
  const ShowAddSectionModalData = () => {
    setShowAddSectionModal(false);
  };
  const handleEditSectionModal = () => {
    setopenEditSectionModal(!openEditSectionModal);
  };
  const handleFormSubmit = (formData) => {
    console.log(formDataArray);
    setFormDataArray([...formDataArray, formData]);
  };
  return (
    <div>
      <div className="bg-blue-100  mb-4 p-3">
        <div className="drop-down flex justify-between items-center">
          <h1 className="text-gray-700 font-semibold"> {scorecardTitle}</h1>
          <Button
            label={<EllipsisVertical />}
            onClick={toggleSectionDropdown}
          />
        </div>
        {showAddSectionModal && (
          <div className="relative  ">
            <Button
              label="Add Section"
              className="absolute bg-white shadow-lg p-2 rounded-sm right-0"
              onClick={handleModal}
            />
            {OpenModal && (
              <AddSectionModal
                onClose={() => setShowAddSectionModal(false)}
                onAdd={() => ShowAddSectionModalData()}
                onSubmit={handleFormSubmit}
              />
            )}
          </div>
        )}
      </div>
      {formDataArray.map((f, index) => (
        <div
          key={index}
          className="bg-blue-100 p-3 flex items-center justify-between relative"
        >
          <h3 className="text-lg font-semibold">{f.sectionName}</h3>
          <h2> {index}</h2>
          <Button
            label={<EllipsisVertical />}
            onClick={() => handleSectionDropdown(index)}
            className="relative"
          />
          {openSectionDropdownIndex === index && (
            <>
              <div className="drop-down bg-white absolute right-0 top-10 z-10 flex flex-col items-start ">
                <Button
                  label="Edit Section "
                  className="hover:bg-gray-100  p-2"
                  onClick={handleEditSectionModal}
                />
                <Button
                  label="Delete Section "
                  className="hover:bg-gray-100  p-2"
                />
                <Button
                  label="Add Scoring Criteria "
                  className="hover:bg-gray-100  p-2"
                />
              </div>
              {/* This is the code use to open an edit section modal */}

              {openEditSectionModal && (
                <EditSectionModal
                  onClose={() => setopenEditSectionModal(false)}
                  onSave={handleFormSubmit}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ScoreCardAddSection;
