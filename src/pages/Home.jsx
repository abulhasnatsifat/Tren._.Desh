import { Navbar, Main, Footer, ScrollToggle, CustomerSupportToggle, ThemeToggle, TranslateToggle } from "../components";
import { TranslationProvider } from "../context/TranslationContext";

import PageLoadAnimation from '../components/PageLoadAnimation';
import Download from '../pages/Download';
function Home() {
  return (
    <TranslationProvider>
      <div className="page-content">
        <Navbar />
        <Main />
        <Download/>
        <Footer />
        <CustomerSupportToggle />
        <PageLoadAnimation/>
        <ScrollToggle />
        <TranslateToggle />
        <ThemeToggle />
     
      </div>
    </TranslationProvider>
  )
}

export default Home;