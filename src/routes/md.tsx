import { useParams, useNavigate } from "@solidjs/router";
import { marked } from "marked";
import { createSignal, createResource, Switch, Match, Show, onMount, onCleanup } from "solid-js";
import "./md.css";
/*
 *  only supports one folder level down
 */
const fetchMd = async (params) => {
    console.log('fetchmd: params.md ' + params.md);
    console.log('fetchmd: params.md1 ' + params.md1);
    if (undefined ===  params.md1) {
        const response_text = (await fetch(`/${params.md}.md`)).text();
        console.log(response_text);
        return response_text;
    } else {
        const response_text = (await fetch(`/${params.md}/${params.md1}.md`)).text();
        console.log(response_text);
        return response_text;
    }
}


export default function Md() {
const navigate = useNavigate();

    const cparams = useParams();
    const [params, setParams] = createSignal(cparams);
    const [sy,setSy] = createSignal(window.scrollY * 1.0 );
    const [key,setKey] = createSignal(":");
    const [mdtext] = createResource(params, fetchMd);

    let divRef: HTMLDivElement;

    onMount(() => {
        document.addEventListener("scroll", handleScroll);
        document.addEventListener("keydown", onkeydown);

    });

    onCleanup(() => {
        document.removeEventListener('scroll', handleScroll);
    });

    const handleScroll = (event: any) => {
        let scrollTop: number = window.scrollY;
        let docHeight: number  = document.body.scrollHeight;
        let winHeight: number = window.innerHeight;
        let scrollPercent: number = docHeight - winHeight;
        setSy((scrollTop*100/scrollPercent).toFixed(0));
    };


const onkeydown = (event: any ) => {
    setKey (event.key);
    if (event.key === '1' ) {
        navigate("/1", { replace: false });
    }

    if (event.key === 'h' || event.key === 'H' ) {
        navigate("/help", { replace: false });
    }
    
    if (event.key === 't' || event.key === 'T' ) {
        navigate("/", { replace: false });
    }
};

    return (<>
    <div ref={divRef!} class="wrapper">
    <Show when={mdtext.loading}>
    <p>Loading...</p>
    </Show>
    <Switch>
    <Match when={mdtext.error}>
    <span>Error: {mdtext.error}</span>
    </Match>
    <Match when={mdtext()}>
    <div class="md" innerHTML={ marked.parse(mdtext()) + "<p> ‎</p><p> ‎</p>" }></div>
    <footer class="page-footer">{ key() }---Info: { cparams.md } / { cparams.md1 ?? " " }
     ----- lines: { mdtext().split('\n').length  } --{ sy() }%-----</footer>
    </Match>
    </Switch>

     </div>
    </>
    );
}

