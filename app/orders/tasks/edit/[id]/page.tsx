import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/app/orders/forms/profile-form"

export default function SettingsProfilePage({ params }: { params: { id: number } }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">TaskID: {params.id}</h3>
      </div>
      <Separator />
      <ProfileForm id={params.id} />
    </div>
  )
}
