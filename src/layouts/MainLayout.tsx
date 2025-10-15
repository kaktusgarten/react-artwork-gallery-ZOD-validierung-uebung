import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function MainLayout() {
  return (
    <>
      <div className="page flex flex-col min-h-screen">
        <div className="py-4 bg-primary">
          <div className="container m-auto text-primary-content">
            <Header></Header>
          </div>
        </div>

        <div className="container m-auto flex-1 my-4">
          <Outlet></Outlet>
        </div>

        <div className="py-4 bg-primary ">
          <div className="container m-auto text-primary-content">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
}
