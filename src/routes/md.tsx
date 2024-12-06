import { useParams } from "@solidjs/router";
import { marked } from "marked";
import { createSignal, createResource, Switch, Match, Show } from "solid-js";

const fetchMd = async (md) => {
    console.log('fetchmd')
    const response_text = (await fetch(`/public/${md}.md`)).text();
    console.log(response_text);
    return response_text;
}


export default function Md() {
    const params = useParams();
    const [md, setMd] = createSignal(params.md);
    const [mdtext] = createResource(md, fetchMd);

    return (<>
    <p>md</p>
    <Show when={mdtext.loading}>
    <p>Loading...</p>
    </Show>
    <Switch>
    <Match when={mdtext.error}>
    <span>Error: {mdtext.error}</span>
    </Match>
    <Match when={mdtext()}>
    <div innerHTML={ marked.parse(mdtext()) }></div>
    <p> hello md page </p>
    <div>Md: {params.md}</div>
    </Match>
    </Switch>
    </>
    );
}

