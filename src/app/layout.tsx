import { Toaster } from "react-hot-toast";
import "../assets/style/globals.css";
import "../assets/style/Fontface.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no,viewport-fit=cover"></meta>
      </head>
      <body>
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
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
