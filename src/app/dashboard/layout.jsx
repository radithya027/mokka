import TableConsultation from "./component/card";
import Sidebar from "./component/sidebar";

export default function RootLayout({ children }) {
    return (
    <div className="w-full">
        <div className="flex items-center w-full">
            <Sidebar />
            {children}
        </div>
    </div>
    );
  }