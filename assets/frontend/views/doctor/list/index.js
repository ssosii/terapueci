import { h, render } from 'preact';
import { List } from './List';
import { QueryClient, QueryClientProvider } from 'react-query'
import "./list.scss";
const queryClient = new QueryClient()



render(
    <QueryClientProvider client={queryClient}>
        <List />
    </QueryClientProvider>, document.querySelector('#doctorProfileList'));


