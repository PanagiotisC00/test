export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">Hello World! 👋</h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to our Next.js 15 blog platform with Supabase and Prisma integration
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6 text-left">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tech Stack:</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Next.js 15 with App Router
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Supabase Database
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Prisma ORM
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
              Tailwind CSS + shadcn/ui
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
