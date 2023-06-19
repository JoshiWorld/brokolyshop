import dynamic from 'next/dynamic';

export default function TasksPage() {
  // @ts-ignore
  const TaskPage = dynamic(() => import("./TaskPage"), {
    ssr: false,
  });

  // @ts-ignore
  return <TaskPage />
}
