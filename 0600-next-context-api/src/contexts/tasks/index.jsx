import { createContext, useContext, useState } from "react";
import api from "@/services/api";
import { factory } from "@/services/api/models";
import { Pagination } from "@/services/api/models/pagination";

const TasksContext = createContext({
  data: undefined,
  fetch: async (_params) => {},
});

export const TaskListContainer = ({ children }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const fetch = async ({ page, limit, statuses }) => {
    try {
      const res = await api.fetchTasks({
        page: page || 1,
        limit: limit || 20,
        status: Object.keys(statuses || {}),
      });
      const { data: tasks, pageInfo } = res.data;
      const list = tasks.map((it) => factory.task(it));
      setData(
        new Pagination({
          list,
          pageInfo,
        }),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TasksContext.Provider value={{ data, loading, fetch }}>
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => {
  const { data, loading, fetch } = useContext(TasksContext);

  const fetchDefault = () => {
    fetch({
      page: 1,
      limit: 20,
      statuses: { scheduled: true },
    });
  };

  return {
    data,
    loading,
    fetch,
    fetchDefault,
  };
};

export default useTasks;
