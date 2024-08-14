import { NextResponse } from "next/server";
import { getTasks, setTasks, getProjects } from "@/datastore";
import { PageInfo } from "@/services/api/models/pagination";
import { v4 as uuid } from "uuid";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 20;

  const tasks = getTasks();
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
  const task = factory.task({ id: uuid(), ...rest, project });
  const error = task.validate();
  if (error) {
    return new Response(
      {
        message: error,
      },
      {
        status: 400,
      },
    );
  }

  tasks.push(task);
  setTasks(tasks);

  return new Response(
    {
      data: null,
    },
    {
      status: 201,
    },
  );
}
