import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-sm md:max-w-4xl mx-auto flex flex-col md:flex-row-reverse bg-white rounded-[2.5rem] shadow-xl overflow-y-auto overflow-x-hidden h-full max-h-[90vh]">
      
      <div className="flex flex-col items-center justify-center p-8 md:w-1/2 bg-white">
        <div className="relative w-48 h-48 md:w-72 md:h-72 mb-6">
          <Image
            src="/landingimage.png"
            alt="Private Coaching Illustration"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-[#1a2e15] mb-2 text-center">
          Private Coaching
        </h1>
        <p className="text-sm md:text-base text-gray-600 text-center px-4 mb-8">
          Add one-on-one, confidential sessions for only $35 per session
        </p>

        <div className="flex gap-2 w-full max-w-xs mx-auto mb-8">
          <div className="h-1.5 flex-1 bg-[#bdf08c] rounded-full"></div>
          <div className="h-1.5 flex-1 bg-[#bdf08c] rounded-full"></div>
          <div className="h-1.5 flex-1 bg-[#e8f5df] rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 md:w-1/2 md:bg-[#fcfdfa] md:border-r border-gray-100">
        <div className="w-full max-w-xs space-y-4">
          <button className="w-full flex items-center justify-center gap-3 bg-[#f5f5f0] text-gray-800 py-3.5 rounded-full font-medium hover:bg-[#93d976] hover:text-[#1a2e15] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 bg-[#f5f5f0] text-gray-800 py-3.5 rounded-full font-medium hover:bg-[#93d976] hover:text-[#1a2e15] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.19.04 2.15.42 2.89 1.12-2.58 1.4-2.14 4.54.44 5.56-.63 1.94-1.33 3.46-1.91 4.29v.01z" fill="currentColor"/>
              <path d="M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.02 4.41-3.74 4.25z" fill="currentColor"/>
            </svg>
            Continue with Apple
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 bg-[#f5f5f0] text-gray-800 py-3.5 rounded-full font-medium hover:bg-[#93d976] hover:text-[#1a2e15] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
            </svg>
            Continue As Guest
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-600">
          Already have an account? <Link href="/login" className="font-bold text-[#1a2e15] hover:underline">Log in</Link>
        </p>
      </div>

    </div>
  );
}
