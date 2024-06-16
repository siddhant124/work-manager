import { Metadata } from "next";
import React from "react";
import ShowTasksScreen from "./show-task-screen";

export const metadata: Metadata = {
  title: "Tasks: Work Manager",
};

const ShowTask = () => {
  return <ShowTasksScreen/>;
};

export default ShowTask;
