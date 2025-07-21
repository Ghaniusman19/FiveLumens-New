import React from "react";
import { Settings } from "lucide-react";
import Button from "../Buttons/Button";

function ScoreCardHeaderEdit() {
  const SaveandPublish = () => {
    console.log("Click save and publish");
  };

  return (
    <div>
      <div className="session-header p-3 transition-all duration-500">
        <div className="flex justify-between flex-row items-center">
          <div className="left basis-2/4 p-2">
            <div className="text-gray-700 text-sm  font-semibold">
              Design your scorecard by adding or removing different meta data
              fields or scoring criteria
            </div>
          </div>
          <div className="right basis-2/4  flex gap-3 justify-end items-center">
            <div className="filter-btn">
              <button className="p-2 border border-gray rounded-md text-gray-600">
                <Settings className="w-5 h-5 " />
              </button>
            </div>
            <div className=" flex gap-2">
              <Button
                label="Save Only"
                className="rounded-xl py-2 flex items-center gap-2 px-3 bg-white text-gray-700 border border-gray-300"
                onClick={() => SaveandPublish()}
              />
              <Button
                label="Save & Publish"
                className="rounded-xl py-2 flex items-center gap-2 px-3 bg-blue-600 text-white"
                onClick={() => SaveandPublish()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreCardHeaderEdit;
