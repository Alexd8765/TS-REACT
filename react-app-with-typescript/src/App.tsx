import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import { Sub, SubsResponseFromApi } from './types';
import jsonData from './a.json';

interface APPstate {
    subs: Array<Sub>;
    newSubsNumber: number;
}

function App() {
    const [subs, setSubs] = useState<APPstate["subs"]>([]);
    const [newSubsNumber, setNewSubsNumber] = useState<APPstate["newSubsNumber"]>(0);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSubs = (): Promise<SubsResponseFromApi> => {
            return Promise.resolve(jsonData);
        }

        const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
            return apiResponse.map(subFromApi => {
                const { months: subMonths, profileUrl: avatar, nick, description, gender } = subFromApi;

                return {
                    nick,
                    description,
                    avatar,
                    subMonths,
                    gender
                };
            });
        }

        fetchSubs().then(apiSubs => {
            const subs = mapFromApiToSubs(apiSubs);
            setSubs(subs);
        });
    }, []);

    useEffect(() => {
        // Actualizar el contador de nuevos subs cada vez que subs cambie
        setNewSubsNumber(subs.length);
    }, [subs]);

    const handleNewSub = (newSub: Sub): void => {
        setSubs(subs => [...subs, newSub]);
    };

    const handleDeleteSub = (nick: string ) => {
      setSubs(subs.filter(sub => sub.nick !== nick));
    };

    return (
        <div className="App" ref={divRef}>
            <h1>midu subs</h1>
            <List subs={subs} onDelete={handleDeleteSub}/>
            Total subs: {newSubsNumber}
            <Form onNewSub={handleNewSub} />
        </div>
    );
}

export default App;
