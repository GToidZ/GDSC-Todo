import { TodoEntry } from './components/todoEntry';
import './app.css';

export function App() {
    return (
        <>
            <div font="sans normal">
                <TodoEntry label="Go to School"></TodoEntry>
                <TodoEntry label="Eat Lunch"></TodoEntry>
                <TodoEntry label="Do Homework"></TodoEntry>
            </div>
        </>
    );
};
