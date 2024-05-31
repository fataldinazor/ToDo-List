"use strict";

import * as listModule from "./list.js";
import { createElement } from "./homepage.js";

const setElementAttribute = (element, id, type, name) => {
  element.setAttribute("id", id);
  element.setAttribute("type", type);
  element.setAttribute("name", name);
};

//Project form
function createPrjForm() {
  const prjList = document.querySelector(".prjList");
  if (document.querySelector(".getPrjForm")) {
    return;
  }
  const getPrjForm = createElement("form", "getPrjForm");
  const nameLabel = createElement("label", "", "Project Name:");
  nameLabel.setAttribute("for", "PrjName");
  const nameInput = document.createElement("input");
  nameInput.setAttribute("id", "PrjName");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "project_name");
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";
  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("type", "reset");
  resetBtn.textContent = "Reset";
  nameLabel.appendChild(nameInput);
  getPrjForm.appendChild(nameLabel);
  prjList.appendChild(getPrjForm);

  const btnContainer = createElement("div", "btnContainer");
  btnContainer.appendChild(submitBtn);
  btnContainer.appendChild(resetBtn);
  getPrjForm.appendChild(btnContainer);
  console.log("form created!");
}

//TaskForm
function createTaskForm(listId) {
  const listName=listModule.getList(listId).name;
  const contentInit = document.querySelector(".contentInit");
  const idVal = createElement("input");
  idVal.setAttribute("value", listId);
  setElementAttribute(idVal, "", "hidden", "list_id");
  
  const getDialog = createElement("dialog");
  const getTaskForm = createElement("form", "getTaskForm");
  const heading = createElement("h2", "", listName);

  //title
  const titleLabel = createElement("label", "taskTitle", "Title:");
  titleLabel.setAttribute("for", "taskTitle");
  const titleInput = document.createElement("input");
  setElementAttribute(titleInput, "taskTitle", "text", "task_name");
  titleLabel.appendChild(titleInput);

  //desc
  const descLabel = createElement("label", "taskDesc", "Description:");
  descLabel.setAttribute("for", "taskDesc");
  const descInput = document.createElement("textarea");
  descInput.setAttribute("rows", "4");
  descInput.setAttribute("cols", "40");
  setElementAttribute(descInput, "taskDesc", "text", "task_desc");
  descLabel.appendChild(descInput);

  //date
  const dateLabel = createElement("label", "taskDate", "Due Date:");
  dateLabel.setAttribute("for", "taskDate");
  const dateInput = document.createElement("input");
  setElementAttribute(dateInput, "taskDueDate", "date", "task_date");
  dateLabel.appendChild(dateInput);

  const priorLabel = createElement("label", "taskPrior", "Priority:");
  priorLabel.setAttribute("for", "taskPrior");
  const selectTask = createElement("select", "", "Select Priority of the Task");
  selectTask.setAttribute("name", "task_prior");
  const lowPrior = createElement("option", "", "Low");
  lowPrior.setAttribute("value", "low");
  const midPrior = createElement("option", "", "Medium");
  midPrior.setAttribute("value", "mid");
  const highPrior = createElement("option", "", "High");
  highPrior.setAttribute("value", "high");
  selectTask.appendChild(lowPrior);
  selectTask.appendChild(midPrior);
  selectTask.appendChild(highPrior);
  priorLabel.appendChild(selectTask);
  //buttons
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";
  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("type", "reset");
  resetBtn.textContent = "Reset";

  // arranging the content
  getDialog.appendChild(getTaskForm);
  getTaskForm.appendChild(heading);
  getTaskForm.appendChild(idVal);
  getTaskForm.appendChild(titleLabel);
  getTaskForm.appendChild(descLabel);
  getTaskForm.appendChild(dateLabel);
  getTaskForm.appendChild(priorLabel);
  const btnContainer = createElement("div", "btnContainer");
  btnContainer.appendChild(submitBtn);
  btnContainer.appendChild(resetBtn);
  getTaskForm.appendChild(btnContainer);
  contentInit.appendChild(getDialog);
  getDialog.showModal();
}

function editTaskForm(currTask){
  const contentInit = document.querySelector(".contentInit");
  const idVal = createElement("input");
  idVal.setAttribute("value", currTask.listId);
  setElementAttribute(idVal, "", "hidden", "list_id");

  const taskId = createElement("input");
  taskId.setAttribute("value", currTask.id);
  setElementAttribute(taskId,"", "hidden", "task_id");

  const getDialog = createElement("dialog");
  const editTaskForm = createElement("form", "editTaskForm");
  const heading = createElement("h2", "", `Edit ${currTask.title}`);

  //title
  const titleLabel = createElement("label", "taskTitle", "Title:");
  titleLabel.setAttribute("for", "taskTitle");
  const titleInput = document.createElement("input");
  setElementAttribute(titleInput, "taskTitle", "text", "task_name");
  titleLabel.appendChild(titleInput);

  //desc
  const descLabel = createElement("label", "taskDesc", "Description:");
  descLabel.setAttribute("for", "taskDesc");
  const descInput = document.createElement("textarea");
  descInput.setAttribute("rows", "4");
  descInput.setAttribute("cols", "40");
  setElementAttribute(descInput, "taskDesc", "text", "task_desc");
  descLabel.appendChild(descInput);

  //date
  const dateLabel = createElement("label", "taskDate", "Due Date:");
  dateLabel.setAttribute("for", "taskDate");
  const dateInput = document.createElement("input");
  setElementAttribute(dateInput, "taskDueDate", "date", "task_date");
  dateLabel.appendChild(dateInput);

  const priorLabel = createElement("label", "taskPrior", "Priority:");
  priorLabel.setAttribute("for", "taskPrior");
  const selectTask = createElement("select", "", "Select Priority of the Task");
  selectTask.setAttribute("name", "task_prior");
  const lowPrior = createElement("option", "", "Low");
  lowPrior.setAttribute("value", "low");
  const midPrior = createElement("option", "", "Medium");
  midPrior.setAttribute("value", "mid");
  const highPrior = createElement("option", "", "High");
  highPrior.setAttribute("value", "high");
  selectTask.appendChild(lowPrior);
  selectTask.appendChild(midPrior);
  selectTask.appendChild(highPrior);
  priorLabel.appendChild(selectTask);

  titleInput.value=currTask.title;
  descInput.value=currTask.desc;
  const date=new Date(currTask.dueDate);
  const formattedDate=date.toISOString().split('T')[0];
  dateInput.value=formattedDate;
  selectTask.value=currTask.priority;  

  //buttons
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";
  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("type", "reset");
  resetBtn.textContent = "Reset";

  // arranging the content
  getDialog.appendChild(editTaskForm);
  editTaskForm.appendChild(heading);
  editTaskForm.appendChild(idVal);
  editTaskForm.appendChild(taskId);
  editTaskForm.appendChild(titleLabel);
  editTaskForm.appendChild(descLabel);
  editTaskForm.appendChild(dateLabel);
  editTaskForm.appendChild(priorLabel);
  const btnContainer = createElement("div", "btnContainer");
  btnContainer.appendChild(submitBtn);
  btnContainer.appendChild(resetBtn);
  editTaskForm.appendChild(btnContainer);
  contentInit.appendChild(getDialog);
  getDialog.showModal();

}

export { createPrjForm, createTaskForm, editTaskForm };
