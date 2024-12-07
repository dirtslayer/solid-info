import { createSignal, createResource } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route, A } from "@solidjs/router";
import  Md from "./routes/md";
import  NotFound from "./routes/notfound";


const fetchBooks = async (id) =>
  (await fetch(`/books.json`)).json();

const App = () => {
 const [booksId, setBooksId] = createSignal(1);
 const [books] = createResource(booksId, fetchBooks);

  return (
    <>
    <Show when={books.loading}>
    <p>Loading...</p>
    </Show>
    <Switch>
    <Match when={books.error}>
    <span>Error: {books.error}</span>
    </Match>
    <Match when={books()}>

    <For each={books().books} fallback={<div>Loading...</div>}>
    {(book) => <><h3>{book.title}</h3><ul>
      <For each={book.chapters}>
      {(c) => <li><A href= { c.file.slice(0, -3) }>
        {c.file.replaceAll("_"," ").split("/").slice(-1).pop().slice(0,-3)} 
        </A></li>}
      </For></ul></>
    }
    </For>
    </Match>
    </Switch>

    </>
  );





};

render(
  () => (
    <Router>
     <Route path="/" component={App} />
     <Route path="/:md/" component={Md} />
    <Route path="/:md/:md1" component={Md} />

    <Route path="*paramName" component={NotFound} />
    </Router>
  ) ,
  document.getElementById("app")!);
