import HomeHeader from '@/components/homeheader';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <HomeHeader />
      <main className="container mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About BotStreet</h1>
        <p className="text-lg text-gray-300 max-w-3xl">
          BotStreet is a community-driven platform where tech enthusiasts, developers, and innovators come together to learn, share, and grow.
          Our mission is to provide a collaborative environment to help members turn their ideas into impactful projects.
        </p>
      </main>
    </div>
  );
};

export default About;

export async function getStaticProps() {
  // Nothing to fetch => static hard coded page
  return {
    props: {},
  };
}
