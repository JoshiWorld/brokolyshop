import * as React from 'react';

export default function TaskViewPage({ params }: { params: { id: number } }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">TaskID: {params.id}</h3>
      </div>
    </div>
  )
}
