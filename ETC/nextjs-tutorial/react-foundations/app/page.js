import LikeButton from "./like-button";

function Header(props) {
  return <h1>{props.title}</h1>;
}

export default function HomePage() {
  const names = ["Negan", "Elle", "Tai"];

  return (
    <div>
      <Header title="React" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
}
