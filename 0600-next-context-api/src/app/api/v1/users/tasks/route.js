import { NextResponse } from "next/server";
import dayjs from 'dayjs';
import { getTasks, setTasks, getProjects } from "@/datastore";
import { PageInfo } from "@/services/api/models/pagination";
import { v4 as uuid } from "uuid";
import { factory } from "@/services/api/models";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 20;
  const status = searchParams.get("status") || ["scheduled"];

  const tasks = getTasks().filter((it) => {
    return status.includes(it.status);
  });

  tasks.sort((a, b) => {
    return new Date(b.deadline) - new Date(a.deadline);
  });
  const pageInfo = new PageInfo({
    page,
    limit,
    totalCount: tasks.length,
  });

  const data = pageInfo.paginate(tasks);

  return NextResponse.json({
    data,
    pageInfo,
  });
}

export async function POST(request) {
  const { projectId, ...rest } = await request.json();

  const tasks = getTasks();
  const project = getProjects().find((it) => it.id === projectId);
  const task = factory.task({
    id: uuid(),
    ...rest,
    project,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  });
  const error = task.validate();
  if (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 400,
      },
    );
  }

  tasks.push(task.raw);
  setTasks(tasks);

  return NextResponse.json(
    {
      data: null,
    },
    {
      status: 201,
    },
  );
}
