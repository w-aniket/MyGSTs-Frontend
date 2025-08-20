import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-wave">
      {"MyGSTs".split("").map((letter, i) => (
        <span key={i}>{letter}</span>
      ))}
    </div>
  );
}
