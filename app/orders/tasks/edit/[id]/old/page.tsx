import dynamic from 'next/dynamic';

export default function TasksEditPage({ params }: { params: { id: number } }) {
  // @ts-ignore
  const TaskPage = dynamic(() => import("./TaskEditPage"), {
    ssr: false
  });

  // @ts-ignore
  return <TaskPage params={params} />
}
