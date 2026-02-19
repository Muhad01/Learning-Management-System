import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NextPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-2">Next page</h1>
      <p className="text-muted-foreground mb-6">
        Swipe right brought you here. Use swipe left to go back, or the button below.
      </p>
      <Link href="/">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Button>
      </Link>
    </div>
  )
}
