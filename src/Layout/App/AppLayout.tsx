import { Sidebar } from "../../components/Sidebar/Sidebar"
import { AppLayoutProps } from "../../types/components"


export const AppLayout = ({children}: AppLayoutProps) => {
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1">
            {children}
            </main>
        </div>
    )
}