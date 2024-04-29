import AppDate from "./date";

export const validate = (task) => {
  if (!task.name) {
    return "タスク名を入力してください";
  }

  if (!task.deadline) {
    return "期限日を入力してください";
  }

  if (!task.deadline.isAfter(new AppDate())) {
    return "期限日は今日以降を指定してください";
  }

  return "";
};
