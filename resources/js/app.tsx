import './bootstrap.js';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import DefaultLayout from './layouts/DefaultLayout.js';
import AuthorizedLayout from './layouts/AutorizedLayout.js';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { pdfjs } from 'react-pdf';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const queryClient = new QueryClient();

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    // resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    resolve: async (name) => {
        // @ts-ignore
        const page = (await resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx'))).default;

        if (name.startsWith('App/'))
            page.layout = ((page: any) => <AuthorizedLayout>{page}</AuthorizedLayout>);
        else
            page.layout = ((page: any) => <DefaultLayout>{page}</DefaultLayout>);

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <QueryClientProvider client={queryClient}>
                <App {...props} />
            </QueryClientProvider>
        );
    },
    progress: {
        color: '#2563EB',
        //showSpinner: true,
    },
})
    //.then(r => console.log(r));

