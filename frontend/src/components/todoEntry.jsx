import { useState } from 'preact/hooks';

/**
 * Icon is from Heroicons 
 */

export function TodoEntry({ label }) {

    const [completed, setCompleted] = useState(false);
    const toggle = () => setCompleted(!completed);

    return (
        <div flex="~ row" items="center" justify="between"
            p="x-4 y-2" m="x-4 y-2"
            bg="white" border="~ solid gray-200 hover:gray-300" rounded="~"
            cursor="pointer">
            <div flex="~ row" gap="x-2" items="center">
                <input type="checkbox" checked={completed} onClick={toggle}
                    className={`appearance-none`}
                    w="4" h="4" border="2 solid gray-600" rounded="sm"
                    bg="checked:sky-500"
                    ring="hover:~ sky-500 offset-1"
                ></input>
                <span text="gray-800">{label}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="2 gray-900" h="4" w="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </div >
    );

};