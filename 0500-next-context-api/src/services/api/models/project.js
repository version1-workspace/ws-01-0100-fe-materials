import { now } from "@/services/api/models/date"
import { factory } from "."

const Status = {
  initial: "initial",
  active: "active",
  archived: "archived"
}

export class ProjectModel {
  _milestones = []

  constructor(params) {
    this.id = params?.id
    this._raw = params
  }

  params() {
    if (!this._raw) {
      return
    }

    const projectParams = JSON.parse(
      JSON.stringify(this._raw, Object.getOwnPropertyNames(this._raw))
    )

    return {
      ...projectParams,
    }
  }

  with(key, value) {
    const params = this.params()
    if (!params) {
      return
    }

    params[key] = value

    return factory.project(params)
  }

  withName(value) {
    return this.with("name", value)
  }

  withSlug(value) {
    return this.with("slug", value)
  }

  withGoal(value) {
    return this.with("goal", value)
  }

  withShouldbe(value) {
    return this.with("shouldbe", value)
  }

  withDeadline(value) {
    const params = this.params()
    if (!params) {
      return
    }

    params.deadline = value

    return factory.project(params)
  }

  get isArchived() {
    return this._raw.status === "archived"
  }
}

export const within = (project, date) => {
  const min = now()
  const max = project.deadline

  return min.lessThanEqual(date) && max.greaterThanEqual(date)
}

