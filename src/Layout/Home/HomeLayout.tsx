import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/navbar";
import { AppLayoutProps } from "../../types/components";

export const HomeLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">{children}</main>
      <Footer/> 
    </div>
  );
};
