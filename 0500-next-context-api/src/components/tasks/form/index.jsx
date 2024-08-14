import styles from "./index.module.css";
import { useForm } from "@/hooks/useForm";
import api from "@/services/api";
import TextInput from "@/components/shared/input/text";
import DateInput from "@/components/shared/input/date";
import AppDate from "@/lib/date";
import {
  selectableStatus,
  statusOptions,
} from "@/services/api/models/task";
import Select from "@/components/shared/select";
import TextArea from "@/components/shared/input/textarea";
import { join } from "@/lib/cls";
import Button from "@/components/shared/button";
import { useToast } from "@/lib/toast/hook";
import ErrorMessage from "@/components/shared/errorMessage";
import useProjects from "@/contexts/projects";

const Form = ({ title, data, onSubmit, onCancel }) => {
  const toast = useToast();
  const { projects, options: projectOptions } = useProjects();

  const { submit, change, errors, form } = useForm({
    initialValues: {
      project: data?.project,
      parent: data?.parent,
      title: data?.title || "",
      description: data?.description || "",
      startingAt: data?.startingAt,
      deadline: data?.deadline?.forHtml || AppDate.in(7).toString(),
      status: data?.status || "scheduled",
      children: [],
    },
    validate: (values, { errors }) => {
      if (!values.project) {
        errors.set("project", "プロジェクトを設定してください");
      }

      if (!values.title) {
        errors.set("title", "タイトルを設定してください");
      }

      if (!values.deadline) {
        errors.set("deadline", "期限を設定してください");
      }

      return errors;
    },
    onSubmit: async (values) => {
      const { project, ...rest } = values;
      try {
        await api.createTask({
          data: { ...rest, projectId: data?.project?.id, kind: "task" },
        });

        onSubmit();

        toast.success("タスクを追加しました。");
      } catch {
        toast.error("タスクの追加に失敗しました。");
      }
    },
  });

  const errorMessages = errors.object;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.form}>
          <div className={styles.field}>
            <div className={join(styles.label, styles.required)}>
              プロジェクト
            </div>
            <div className={styles.input}>
              <Select
                data={projectOptions}
                value={form.project?.id}
                defaultOption={{
                  label: "プログラムを選択してください",
                  value: "",
                }}
                onSelect={(option) => {
                  const project = projects.find((it) => it.id === option.value);
                  change({ project });
                }}
              />
              <ErrorMessage message={errorMessages.project} />
            </div>
          </div>
          <div className={styles.field}>
            <div className={join(styles.label, styles.required)}>タスク</div>
            <div className={styles.input}>
              <TextInput
                type="text"
                value={form.title}
                placeholder="タスクを入力。 例)  英会話レッスンの予約、React公式ドキュメントを1ページ読む"
                onChange={(e) => {
                  change({ title: e.target.value });
                }}
              />
              <ErrorMessage message={errorMessages.title} />
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.label}>説明・メモ</div>
            <div className={styles.input}>
              <TextArea
                value={form.description}
                rows={5}
                placeholder="タスクの説明・メモ"
                onChange={(e) => {
                  change({ description: e.target.value });
                }}
              />
            </div>
          </div>
          <div className={styles.field}>
            <div className={join(styles.label, styles.required)}>締切日</div>
            <div className={styles.input}>
              <DateInput
                value={form.deadline}
                onChange={(e) => {
                  change({ deadline: e.target.value });
                }}
              />
              <ErrorMessage message={errorMessages.deadline} />
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.label}>開始予定日</div>
            <div className={styles.input}>
              <DateInput
                value={form.startingAt}
                onChange={(e) => {
                  change({ startingAt: e.target.value });
                }}
              />
            </div>
          </div>
          <div className={styles.field}>
            <div className={join(styles.label, styles.status)}>ステータス</div>
            <div className={styles.input}>
              <Select
                data={statusOptions}
                value={form.status}
                defaultOption={{
                  label: "ステータスを選択してください",
                  value: "",
                }}
                onSelect={(option) => {
                  const status = selectableStatus.find(
                    (it) => it === option.value,
                  );
                  change({ status });
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.buttons}>
            <Button
              variant="primary"
              onClick={() => {
                submit();
              }}>
              {data ? "更新" : "作成"}
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              キャンセル
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
