import TrendingSection from "../components/home/TrendingSection";
import TopRatedSection from "../components/home/TopRatedSection";

const Home = () => {
  return (
    <div className="py-1 sm:p-4">
      <TrendingSection />
      <TopRatedSection />
    </div>
  );
};

export default Home;
