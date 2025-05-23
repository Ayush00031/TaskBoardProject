import React, { useContext, useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Plus, X } from "react-feather";
import { Popover } from "react-tiny-popover";
import { BoardContext } from "../context/BoardContext";

const Sidebar = () => {
  const blankBoard = {
    name: "",
    bgcolor: "#f60000",
    list: [],
  };
  const [boardData, setBoarddata] = useState(blankBoard);
  const [collapsed, setCollapsed] = useState(false);
  const [showpop, setShowpop] = useState(false);
  const { allboard, setAllBoard } = useContext(BoardContext);
  const setActiveboard = (i) => {
    let newBoard = { ...allboard };
    newBoard.active = i;
    setAllBoard(newBoard);
  };
  const addBoard = () => {
    const updatedBoards = {
      ...allboard,
      boards: [...allboard.boards, boardData],
    };
    setAllBoard(updatedBoards);
    setBoarddata(blankBoard);
    setShowpop(false); // close popover
  };
  useEffect(() => {
    console.log("All boards from context:", allboard);
  }, [allboard]);

  const deleteBoard = (index) => {
    let newBoards = { ...allboard };
    newBoards.boards.splice(index, 1); // Remove the board at the given index

    // Adjust active board if needed
    if (newBoards.active === index) {
      newBoards.active = null;
    } else if (newBoards.active > index) {
      newBoards.active -= 1;
    }

    setAllBoard(newBoards);
  };

  return (
    <div
      className={`bg-[#121417] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${
        collapsed ? "w-[42px]" : "w-[280px]"
      }`}
    >
      {collapsed && (
        <div className="p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-600 rounded-sm"
          >
            <ChevronRight size={18}></ChevronRight>
          </button>
        </div>
      )}
      {!collapsed && (
        <div>
          <div className="workspace p-3 flex justify-between border-b border-b-[#9fadbc29]">
            <h4>Remote Dev's Workspace</h4>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-sm p-1"
            >
              <ChevronLeft size={18}></ChevronLeft>
            </button>
          </div>
          <div className="boardlist">
            <div className="flex justify-between px-3 py-2">
              <h6>Your Boards</h6>

              <Popover
                isOpen={showpop}
                align="start"
                positions={["right", "top", "bottom", "left"]} // preferred positions by priority
                content={
                  <div className="ml-2 p-2 w-60 flex flex-col justify-center items-center bg-slate-600 text-white rounded">
                    <button
                      onClick={() => setShowpop(!showpop)}
                      className="absolute right-2 top-2 hover:bg-gray-500 p-1 rounded"
                    >
                      <X size={16}></X>
                    </button>
                    <h4 className="py-3">Create Board</h4>
                    <img src="https://placehold.co/200x120/png" alt="" />
                    <div className="mt-3 flex flex-col items-start w-full">
                      <label htmlFor="title">
                        Board Title <span>*</span>
                      </label>
                      <input
                        value={boardData.name}
                        onChange={(e) =>
                          setBoarddata({ ...boardData, name: e.target.value })
                        }
                        type="text"
                        className="mb-2 h-8 px-2 w-full bg-gray-700"
                      />
                      <label htmlFor="Color">Board Color</label>
                      <input
                        value={boardData.bgcolor}
                        onChange={(e) =>
                          setBoarddata({
                            ...boardData,
                            bgcolor: e.target.value,
                          })
                        }
                        type="color"
                        className="mb-2 h-8 px-2 w-full bg-gray-700"
                      />
                      <button
                        onClick={() => addBoard()}
                        className="w-full rounded h-8 bg-slate-700 mt-2 hover:bg-gray-500"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                }
              >
                <button
                  onClick={() => setShowpop(!showpop)}
                  className="hover:bg-slate-600 p-1 rounded-sm"
                >
                  <Plus size={16}></Plus>
                </button>
              </Popover>
            </div>
          </div>
          <ul>
            {allboard.boards &&
              allboard.boards.map((x, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center px-3 py-2 hover:bg-gray-500"
                >
                  {/* Board button with color and title */}
                  <button
                    onClick={() => setActiveboard(i)}
                    className="flex items-center text-sm text-left w-full"
                  >
                    <span
                      className="w-4 h-4 rounded-sm mr-2"
                      style={{ backgroundColor: `${x.bgcolor}` }}
                    >
                      &nbsp;
                    </span>
                    <span className="truncate">{x.name}</span>
                  </button>

                  {/* Delete button beside title */}
                  <button
                    onClick={() => deleteBoard(i)}
                    className="text-gray-400 hover:text-red-500 ml-2"
                    title="Delete Board"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
