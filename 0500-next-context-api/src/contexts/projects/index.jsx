import { createContext, useContext, useMemo } from "react";
import api from "@/services/api";
import { factory } from "@/services/api/models";
import { useEffect, useState } from "react";
import { Pagination } from "@/services/api/models/pagination";

const ProjectsContext = createContext({
  data: [],
  fetch: async (_) => {},
});

export const useProjectsWithoutContext = () => {
  const [data, setData] = useState(Pagination.create());
  const [loading, setLoading] = useState(true);

  const fetch = async (params) => {
    try {
      const res = await api.fetchProjects(params);
      const list = res.data.data;
      const projects = list.map((it) => factory.project(it));

      setData(
        new Pagination({
          list: projects,
          pageInfo: res.data.pageInfo,
        }),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    fetch,
  };
};

export const ProjectsContainer = ({ children }) => {
  const { data, loading, fetch } = useProjectsWithoutContext();

  useEffect(() => {
    fetch({
      limit: 100,
    });
  }, []);

  return (
    <ProjectsContext.Provider
      value={{ data: data.list, paginated: data, loading, fetch }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjects = () => {
  const { fetch, data, loading } = useContext(ProjectsContext);

  const options = useMemo(() => {
    return data.reduce((acc, it) => {
      return [...acc, { label: it.name, value: it.id }];
    }, []);
  }, [data]);

  return {
    fetch,
    refetch: () => fetch({ limit: 100 }),
    projects: data,
    loading,
    options,
  };
};

export default useProjects;
