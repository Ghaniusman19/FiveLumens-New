import ScoreCardModal from "./ScoreCardModal";
import { useState, useEffect } from "react";
import authtoken from "../../Constants/constants";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
const ScoreCardHeader = () => {
  const [addSectionModal, setaddSectionModal] = useState(false);
  // const [scorecards, setScorecards] = useState([]);
  // const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [pendingValue, setPendingValue] = useState(null); // true or false

  // const updateCheckboxValue = (item, value) => {
  //   setScorecards((prev) =>
  //     prev.map((sc) =>
  //       sc._id === item._id ? { ...sc, visibleToManagers: value } : sc
  //     )
  //   );
  // };
  // const handleCheckboxClick = (item) => {
  //   setSelectedItem(item);
  //   setPendingValue(!item.visibleToManagers); // The value we want to set
  //   setConfirmModalOpen(true);
  // };
  const [allFormData, setAllformData] = useState(() => {
    const storedArray = localStorage.getItem("allFormData");
    return storedArray ? JSON.parse(storedArray) : [];
  });
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    localStorage.setItem("allFormData", JSON.stringify(allFormData));
  }, [allFormData]);
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };
  const handleFormSubmit = async (newFormData) => {
    setAllformData([...allFormData, newFormData]);
  };
  //state for the opening and closing of the dropdown clicked on the 3 dots in scoreheader.jsx
  // const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // const handleDropdownToggle = (index) => {
  //   setOpenDropdownIndex((prev) => (prev === index ? null : index));
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/auth/scorecards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: authtoken,
          },
          body: JSON.stringify({}),
        }
      );
      const result = await response.json();
      if (result && result.data && result.data.collection) {
        // setScorecards(result.data.collection);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        // setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  /////////
  // const [viewModalOpen, setViewModalOpen] = useState(false);
  // const [viewFormData, setViewFormData] = useState(null);
  // const [editModalOpen, setEditModalOpen] = useState(false);
  // const [editFormData, setEditFormData] = useState(null);
  // const [editIndex, setEditIndex] = useState(null);
  // const [cloneModalOpen, setCloneModalOpen] = useState(false);
  // const [evaluateModalOpen, setevaluateModalOpen] = useState(false);
  //data coming from api stoed in state variables....
  // const [apiData, setApiData] = useState(null);
  // const handleEditFormSubmit = () => {
  //   setAllformData((prev) =>
  //     prev.map((item, idx) => (idx === editIndex ? updatedData : item))
  //   updatedData "This is to be passed n the handleEditFormSubmit function parameter "
  //   );
  //   setEditModalOpen(false);
  // };
  const handleAddSectionModal = async () => {
    setaddSectionModal(true);
    const handleActive = async () => {
      try {
        const response = fetch(
          "https://fldemo.fivelumenstest.com/api/auth/coaching-forms/all?isActive=true",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: authtoken,
            },
            body: JSON.stringify(),
          }
        );
        const data = await response.json();
        console.log("API Response:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    handleActive();

    const handleAll = async () => {
      try {
        console.log("hey");
        const response = fetch(
          "https://fldemo.fivelumenstest.com/api/auth/groups/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: authtoken,
            },
            body: JSON.stringify(),
          }
        );
        const data = await response.json();
        console.log("API Response:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    handleAll();
  };

  return (
    <div className="session-header p-3 transition-all duration-500">
      <div className="flex justify-between flex-row items-center">
        <div className="left basis-2/4 p-2">
          <div>
            <h3 className="text-[#101828] text-xl font-bold">Scorecards</h3>
            <p className="font-sans font-normal text-gray-600">
              Manage your scorecards and its details here
            </p>
          </div>
        </div>
        <div className="right basis-2/4  flex gap-3 justify-end items-center">
          <div className="search">
            <form action="">
              <div className="relative">
                <Search className="absolute top-2 left-2 text-gray-400 z-10" />
                <input
                  type="text"
                  className="border pl-8  rounded-lg h-9 focus:outline-gray-300 px-3 py-1 text-gray-600"
                  placeholder="search"
                  value={searchItem}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div className="filter-btn">
            <button className="p-2 border border-gray rounded-md text-gray-600">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="addsession-btn">
            <button
              className="rounded-xl py-2 flex items-center gap-2 px-3 bg-blue-600 text-white"
              onClick={handleAddSectionModal}
            >
              <Plus className="w-4 h-4 text-white" /> Add ScoreCard
            </button>
          </div>
        </div>

        {/* Conditionally Render Modals Below */}
        {addSectionModal && (
          <ScoreCardModal
            show={true}
            onClose={() => setaddSectionModal(false)}
            onSubmit={handleFormSubmit}
            shouldNavigate={true}
            title="Scorecard Settings"
            headerdescription="Manage scorecard settings here"
          />
        )}

        {/* {viewModalOpen && (
          <ScoreCardModal
            show={true}
            onClose={() => setViewModalOpen(false)}
            initialData={viewFormData}
            isView={true}
            shouldNavigate={true}
            title="View Scorecard"
          />
        )}

        {editModalOpen && (
          <ScoreCardModal
            show={true}
            onClose={() => setEditModalOpen(false)}
            initialData={editFormData}
            onSubmit={(updatedData) => handleEditFormSubmit(updatedData)}
            shouldNavigate={false}
            isEdit={true}
            title="Edit Scorecard"
          />
        )}

        {cloneModalOpen && (
          <ScoreCardModal
            show={true}
            onClose={() => setCloneModalOpen(false)}
            onSubmit={handleFormSubmit}
            shouldNavigate={true}
            title="Clone Scorecard"
          />
        )}
        {evaluateModalOpen && (
          <ScoreCardModal
            show={true}
            onClose={() => setevaluateModalOpen(false)}
            onSubmit={handleFormSubmit}
            shouldNavigate={true}
            title="Evaluate Scorecard"
          />
        )} */}
      </div>
      {/* {allFormData.length > 0 && (
        <ul className="">
          <div className="flex justify-between p-2 w-full">
            <h3 className="font-bold">Name & Description</h3>
            <h3 className="font-bold">Evaluation</h3>
            <h3 className="font-bold">Scoring</h3>
            <h3 className="font-bold">Updated</h3>
            <h3 className="font-bold">Status</h3>
            <h3 className="font-bold"></h3>
          </div
        </ul>
      )} */}
    </div>
  );
};

export default ScoreCardHeader;
