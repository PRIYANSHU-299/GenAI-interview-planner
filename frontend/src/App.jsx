import { RouterProvider } from "react-router"
import { router } from "./app.route.jsx"
import { AuthProvider } from "./Features/Auth/auth.context.jsx"
import { InterviewProvider } from "./Features/Interview/interview.context.jsx"
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1f27',
              color: '#fff',
              border: '1px solid #2a2f3a'
            },
            success: { duration: 3000 },
            error: { duration: 4000 }
          }}
        />
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App