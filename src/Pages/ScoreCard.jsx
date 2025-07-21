import { useEffect, useState } from "react";
import Container from "../Components/Container";
import ScoreCardHeader from "../Components/ScoreCard/ScoreCardHeader";
import authtoken from "../Constants/constants";
const ScoreCard = () => {
  const [scorecards, setScoreCardData] = useState([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pendingValue, setPendingValue] = useState(null);
  // const [viewFormData, setViewFormData] = useState(null);

  const handleCheckboxClick = (item) => {
    setSelectedItem(item);
    setPendingValue(!item.visibleToManagers); // The value we want to set
    setConfirmModalOpen(true);
  };
  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex((prev) => (prev === index ? null : index));
  };
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const updateCheckboxValue = (item, value) => {
    setScoreCardData((prev) =>
      prev.map((sc) =>
        sc._id === item._id ? { ...sc, visibleToManagers: value } : sc
      )
    );
  };

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
        setScoreCardData(result.data.collection);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-gray-100 ">
      <Container>
        <div className="bg-white rounded-xl shadow-lg">
          <ScoreCardHeader />

          {scorecards.map((item, index) => (
            <div className=" flex mb-2 gap-4" key={index}>
              <li className="flex relative justify-between items-center w-full bg-gray-50 border border-gray-300 p-2 ">
                <div>
                  <p className="text-blue-800">{item._id}</p>
                  <p> {item.title}</p>
                  <p className="font-light">{item.title}</p>
                </div>
                <div>
                  <p> {item.evaluationType}</p>
                </div>
                <div>
                  <p> {item.scoringModel}</p>
                </div>
                <div>
                  <p> {new Date(item.updatedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p>{item.visibleToManagers} </p>
                </div>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      name={index}
                      checked={item.visibleToManagers} // Use the checked state from the object
                      onChange={() => handleCheckboxClick(item)}
                      id=""
                    />
                    {confirmModalOpen && (
                      <div className="modal transition-all overflow-scroll duration-300 fixed inset-0 bg-gray-600 bg-opacity-5 flex items-center justify-center z-50">
                        <div className="modal-inner bg-white p-5 w-96 rounded-2xl">
                          <h2 className="text-center  text-xl font-semibold">
                            {" "}
                            Deactivate Scorecard
                          </h2>
                          <p className="font-gray text-center">
                            Changing the{" "}
                            <span className="font-semibold text-gray-700">
                              {" "}
                              {selectedItem.title}{" "}
                            </span>
                            scorecard status to inactive will not delete the
                            scorecard, but evaluations can no longer be created
                            using this scorecard until it is reactivated. Do you
                            want to{" "}
                            {selectedItem.visibleToManagers
                              ? "unCheck"
                              : "Check"}{" "}
                            {""}
                            this checkbox?
                          </p>
                          <p className="text-center">
                            Are you sure you want to{" "}
                            {pendingValue ? "check" : "uncheck"} the scorecard
                            status to inactive?
                          </p>
                          <div className="flex gap-2 mt-3 ">
                            <button
                              className="w-full text-center px-4 py-2 bg-white text-gray-700 border rounded-2xl"
                              onClick={() => {
                                setConfirmModalOpen(false);
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="w-full text-center px-4 py-2  bg-yellow-500 text-white rounded-2xl"
                              onClick={() => {
                                updateCheckboxValue(selectedItem, pendingValue);
                                setConfirmModalOpen(false);
                              }}
                            >
                              {selectedItem.visibleToManagers
                                ? "DeActivate"
                                : "Activate"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className="p-2 rounded-xl relative "
                  onClick={() => handleDropdownToggle(index)}
                >
                  &#8942;
                </button>
                {openDropdownIndex === index && (
                  <div className="dropdown-menu absolute right-0 top-10 mt-2 w-40 bg-white border rounded shadow z-50">
                    <ul>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            // setViewFormData(item);
                            // setViewModalOpen(true);
                            setOpenDropdownIndex(null); // close dropdown
                          }}
                        >
                          View
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            // setEditFormData(item);
                            // setEditModalOpen(true);
                            setOpenDropdownIndex(null); // close dropdown
                          }}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            // setCloneModalOpen(true);
                            setOpenDropdownIndex(null);
                          }}
                        >
                          Clone
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setOpenDropdownIndex(null);
                            // setevaluateModalOpen(true);
                            // setViewFormData(item);
                          }}
                        >
                          Evaluate
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ScoreCard;
