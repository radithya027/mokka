import TableConsultation from "./component/card";
import Sidebar from "./component/sidebar";

export default function RootLayout({ children }) {
    return (
    <div className="w-full">
        <div className="flex w-full h-full">
            <Sidebar />
            {children}
        </div>
    </div>
    );
  }