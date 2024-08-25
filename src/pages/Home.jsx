import TrendingSection from "../components/homePage_components/TrendingSection";
import TopRatedSection from "../components/homePage_components/TopRatedSection";

const Home = () => {
  return (
    <div className="py-1 sm:p-4">
      <TrendingSection />
      <TopRatedSection />
    </div>
  );
};

export default Home;
