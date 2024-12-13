import { useParams, useNavigate } from "@solidjs/router";
import { marked } from "marked";
import {
  createSignal,
  createResource, Switch,
  Match,
  Show,
  onMount,
  onCleanup
}
  from "solid-js";
import "./md.css";

/*
 *  has 2 params, second optional, if there are 2, the second is the filename
 *  and the first is the folder, only supports one folder level down atm,
 *  ie. there are no sub chapters
 */
const fetchMd = async (params: any): Promise<string> => {
  console.log('fetchmd: params.md ' + params.md);
  console.log('fetchmd: params.md1 ' + params.md1);
  if (undefined === params.md1) {
    const response_text = (await fetch(`/${params.md}.md`)).text();
    console.log(response_text);
    return response_text;
  } else {
    const response_text = (await fetch(`/${params.md}/${params.md1}.md`)).text();
    console.log(response_text);
    return response_text;
  }
}

const fetchNav = async (cparams: any) => {
  console.log('fetchnav cparams: ' + cparams.md );
  const response = await fetch('/books.json');
  const b = await response.json();
  console.log(b);
  let prev = "/";
  let next = "/";
  let found = false;
  let nextset = false;
  b.books.forEach( (book, index, books) => {
    console.log(book.title);
    book.chapters.forEach((ch,i,b) => {
      if ( ( ch.file.slice(0,-3) == cparams.md ) ||
           ( ch.file.slice(0,-3) == (cparams.md + '/' + cparams.md1) ) ){
        console.log('found')
        found = true;
      } else {
      if (!found) {
        prev = ch.file.slice(0,-3);
      } else {
        if (!nextset ) {
          next = ch.file.slice(0,-3);
          nextset = true;
        }
      }
      }
      
      
    });
  });
  
  console.log({ "next": next, "prev": prev });
  
  return ({ "next": next, "prev": prev });
}


export default function Md() {
  const navigate = useNavigate();

  const cparams = useParams();
  const [params, setParams] = createSignal(cparams);

  const [sy, setSy] = createSignal(window.scrollY.toString());
  const [key, setKey] = createSignal(":");

  const [mdtext] = createResource(params, fetchMd);

  const [navId, setNavId] = createSignal(cparams);
  const [nav] = createResource(navId, fetchNav);

  onMount(() => {
    document.addEventListener("scroll", handleScroll);
    document.addEventListener("keydown", onkeydown);

  });

  onCleanup(() => {
    document.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = (event: any) => {
    let scrollTop: number = window.scrollY;
    let docHeight: number = document.body.scrollHeight;
    let winHeight: number = window.innerHeight;
    let scrollPercent: number = docHeight - winHeight;
    let scrolldisplay = (scrollTop * 100 / scrollPercent).toFixed(0);
    setSy(scrolldisplay);
  };


  const onkeydown = (event: any) => {
    setKey(event.key);
    if (event.key === '1') {
      navigate("/1", { replace: false });
    }

    if (event.key === 'h' || event.key === 'H') {
      navigate("/help", { replace: false });
    }

    if (event.key === 't' || event.key === 'T') {
      navigate("/", { replace: false });
    }

    if (event.key === 'q' || event.key === 'Q') {
      window.location.href = document.location.origin;
    }

    if (event.key === 'n' || event.key === 'N') {
      navigate(nav().next)
    }
    if (event.key === 'p' || event.key === 'P') {
      navigate(nav().prev)
    }
  };

  return (<>
    <div class="wrapper">
      <Show when={mdtext.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={mdtext.error}>
          <span>Error: {mdtext.error}</span>
        </Match>
        <Match when={mdtext()}>
          <div class="md"
            innerHTML={marked.parse(mdtext()!) + "<p> ‎</p><p> ‎</p>"}>
          </div>
          <footer class="page-footer">{key()}---Info: {cparams.md} / {cparams.md1 ?? " "}
            ----- lines: {mdtext()!.split('\n').length} --{sy()}%-----</footer>
        </Match>
      </Switch>
    </div>
  </>);
}

