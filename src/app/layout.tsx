import { Toaster } from "react-hot-toast";
import Header from "@layout/Header";
import Footer from "@layout/Footer";
import QueryProvider from "./providers/QueryProvider";
import AuthProvider from "./providers/AuthProvider";
import { DeleteModalProvider } from "@context/DeleteModalContext";
import DeleteUser from "@components/modal/user-modal/DeleteModal";
import "@/lib/chart";
import "../assets/style/globals.css";
import "../assets/style/Fontface.css";
import "../assets/style/Theme.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gradient-to-br from-white via-white to-green-50">
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerStyle={{}}
          toasterId="default"
          toastOptions={{
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#000',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            },
            success: {
              duration: 4000,
              iconTheme: {
                primary: 'green',
                secondary: "white",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: 'red',
                secondary: 'white',
              },
            }
          }}
        />
        <AuthProvider>
          <QueryProvider>
            <DeleteModalProvider>
              <Header />
              {children}
              <Footer />
              <DeleteUser />
            </DeleteModalProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
