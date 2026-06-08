import Button from '../components/ui/Button';
import { generateMeetingCode } from '../utils/helpers';

const Home = () => {
  const handleCreate = () => {
    const code = generateMeetingCode();
    alert(`Meeting created! Code: ${code}`);
  };

  return (
    <section className="hero">
      <h1 className="hero__title">Welcome to IntelMeet</h1>
      <p className="hero__subtitle">
        Smart, seamless video meetings — powered by real-time collaboration.
      </p>
      <Button onClick={handleCreate}>Create Meeting</Button>
    </section>
  );
};

export default Home;
