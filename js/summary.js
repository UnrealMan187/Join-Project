async function loadSummaryInfos() {
  await loadTasks();

  let sumTodo = 0;
  let sumDone = 0;
  let sumUrgent = 0;
  let sumTasks = 0;
  let sumProgress = 0;
  let sumFeedback = 0;

  for (let i = 0; i < tasks.length; i++) {
    sumTodo = tasks[i].level == "To do" ? (sumTodo + 1) : sumTodo;
    sumDone = tasks[i].level == "Done" ? (sumDone + 1) : sumDone;
    sumUrgent = tasks[i].priority == "Urgent" ? (sumUrgent + 1) : sumUrgent;
    sumTasks = tasks.length;
    sumProgress = tasks[i].level == "In Progress" ? (sumProgress + 1) : sumProgress;
    sumFeedback = tasks[i].level == "Awaiting Feedback" ? (sumFeedback + 1) : sumFeedback;
  }

  document.getElementById("summary__todo").innerHTML = +sumTodo;
  document.getElementById("summary__done").innerHTML = +sumDone;
  document.getElementById("summary__urgent").innerHTML = +sumUrgent;
  document.getElementById("summary__tasks").innerHTML = +sumTasks;
  document.getElementById("summary__progress").innerHTML = +sumProgress;
  document.getElementById("summary__feedback").innerHTML = +sumFeedback;
}
