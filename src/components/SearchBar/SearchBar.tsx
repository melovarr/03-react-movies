import css from "./SearchBar.module.css";

interface SearchFormProps {
  onSubmit: (topic: string) => void;
}

export default function SearchBar({ onSubmit }: SearchFormProps) {
  const handleSubmit = (formData: FormData) => {
    const topic = formData.get("query") as string;
    if (topic === "") {
      alert("Please enter your search query.");
      return;
    }
    onSubmit(topic);
  };
  return (
    <div>
      <header className={css.header}>
        <div className={css.container}>
          <a
            className={css.link}
            href="https://www.themoviebd.org/"
            target="_blank"
            rel="noopener noreferer"
          >
            Powered by TMDB
          </a>
          <form className={css.form} action={handleSubmit}>
            <input
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}
