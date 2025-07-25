import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              BlogApp
            </Link>
            <div className="flex space-x-4">
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link href="/blogs">
                <Button variant="ghost">Blogs</Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
