import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { getTasks, setTasks } from "@/datastore";

export async function GET(_, context) {
  const {
    params: { id },
  } = context;

  const task = getTasks().find((it) => {
    return it.id === id;
  });

  if (!task) {
    return NextResponse.json(
      {
        error: "Not Found",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    data: task,
  });
}

export async function PATCH(_, context) {
  const {
    params: { id },
  } = context;
  const params = await request.json();

  const tasks = getTasks();
  const index = tasks.findIndex((it) => it.id === id);
  if (index == -1) {
    return new Response(
      {
        message: "Not found",
      },
      {
        status: 404,
      },
    );
  }

  const task = tasks[index];
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

  tasks[index] = task.assign({
    ...params,
    updatedAt: dayjs().format(),
  });
  setTasks(tasks);

  return new Response({
    data: task.raw,
  });
}

export async function DELETE(_, context) {
  const {
    params: { id },
  } = context;

  const tasks = getTasks();
  const task = tasks.find((it) => it.id === id);
  if (!task) {
    return NextResponse.json(
      {
        message: "Not found",
      },
      {
        status: 404,
      },
    );
  }

  tasks.splice(index, 1);
  setTasks(tasks);

  return new Response({
    data: task.raw,
  });
}
