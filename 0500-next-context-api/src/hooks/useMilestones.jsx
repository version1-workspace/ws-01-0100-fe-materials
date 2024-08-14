import { useMemo, useState } from "react";
import api from "@/services/api";
import { factory } from "@/services/api/models";

const useMilestones = () => {
  const [orphans, setOrphans] = useState([]);
  const [milestones, setMilestones] = useState([]);

  const fetch = async ({ slug }) => {
    const res = await api.fetchMilestones({ slug });
    const { milestones, orphans } = res.data.data
    setMilestones(milestones.map((it) => factory.task(it)));
    setOrphans(orphans.map((it) => factory.task(it)));
  };

  const options = useMemo(() => {
    return milestones.map(it => {
      return { label: it.title, value: it.id }
    })
  },[milestones])

  return {
    milestones,
    orphans,
    options,
    fetch,
  };
};

export default useMilestones;
