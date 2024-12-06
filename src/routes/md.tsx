import { useParams } from "@solidjs/router";
import { marked } from "marked";
import { createSignal, createResource, Switch, Match, Show } from "solid-js";
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
    const cparams = useParams();
    const [params, setParams] = createSignal(cparams);

    const [mdtext] = createResource(params, fetchMd);

    return (<>
    <Show when={mdtext.loading}>
    <p>Loading...</p>
    </Show>
    <Switch>
    <Match when={mdtext.error}>
    <span>Error: {mdtext.error}</span>
    </Match>
    <Match when={mdtext()}>
    <div innerHTML={ marked.parse(mdtext()) }></div>
    </Match>
    </Switch>
    </>
    );
}

