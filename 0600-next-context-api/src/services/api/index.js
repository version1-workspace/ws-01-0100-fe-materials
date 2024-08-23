import axios from "axios"

const _sessionStorage =
  typeof sessionStorage !== "undefined" ? sessionStorage : undefined

export const getAccessToken = () => _sessionStorage?.getItem("token") || ""

export const setUserId = uuid => localStorage.setItem("uuid", uuid)
export const getUserId = () => localStorage.getItem("uuid") || ""

class Client {
  constructor(config) {
    this._instance = axios.create({
      ...config,
      headers: {
        ...(config.headers || {})
      }
    })
    this._instance.defaults.headers[
      "Authorization"
    ] = `Bearer ${getAccessToken()}`
  }

  get instance() {
    if (!this._instance) {
      throw new Error("client is not initialized properly")
    }

    return this._instance
  }

  setAccessToken = token => {
    _sessionStorage?.setItem("token", token)
    if (this._instance) {
      this._instance.defaults.headers["Authorization"] = `Bearer ${token}`
    }
  }

  setErrorHandler = handler => {
    this.instance.interceptors.response.use(function(response) {
      return response
    }, handler)
  }
}

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

const client = new Client({
  baseURL: `${baseURL}/api/v1`,
  timeout: 10000,
  withCredentials: true,
  headers: { Authorization: getAccessToken() }
})

const api = {
  client,
  fetchUser: () => {
    return client.instance.get("/users/me")
  },
  fetchProject: ({ slug }) => {
    return client.instance.get(`/users/projects/${slug}`)
  },
  fetchProjects: ({ limit, page, status }) => {
    return client.instance.get("/users/projects", {
      params: {
        limit,
        page,
        status
      }
    })
  },
  fetchStats: () => {
    return client.instance.get(`/users/stats`)
  },
  fetchTask: ({ id }) => {
    return client.instance.get(`/users/tasks/${id}`)
  },
  fetchTasks: ({
    page,
    status,
    limit,
    search,
    sortType,
    sortOrder,
    dateFrom,
    dateTo,
    dateType,
    projectId
  }) => {
    return client.instance.get("/users/tasks", {
      params: {
        page,
        status,
        limit,
        search,
        sortType,
        sortOrder,
        dateFrom,
        dateTo,
        dateType,
        projectId
      }
    })
  },
  createTask: ({ data }) => {
    return client.instance.post(`/users/tasks`, data)
  },
  updateTask: (id, data) => {
    const _data = Object.keys(data).reduce((acc, key) => {
      const v = data[key]
      if (["deadline"].includes(key)) {
        return {
          ...acc,
          [key]: v?.replaceAll("/", "-")
        }
      }

      return {
        ...acc,
        [key]: v
      }
    }, {})
    return client.instance.patch(`/users/tasks/${id}`, _data)
  },
  deleteTask: (id) => {
    return client.instance.delete(`/users/tasks/${id}`)
  },
}

export default api

