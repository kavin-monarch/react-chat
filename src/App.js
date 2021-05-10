import React, { useState, useEffect } from 'react'

import { mainUser, contactsMessages, Message } from './generateData'
import Avatar from './components/Avatar'
import ContactBox from './components/ContactBox'
import MessagesBox from './components/MessagesBox'
import ChatInputBox from './components/ChatInputBox/ChatInputBox'
import Search from './components/Search'
import Welcome from './components/Welcome'
import './App.css'


function App() {
    const [data, setData] = useState(contactsMessages)
    const [contactSelected, setContactSelected] = useState({})
    const [currentMessages, setCurrentMessages] = useState([])
    const [message, setMessage] = useState('')
    const [search, setSearch] = useState('')
    const [filteredContacts, setFilterContacts] = useState([])
    const [span, setSpan] = useState('');

    useEffect(() => {
        const currContact = data.find((d) => d.contact.id === contactSelected.id)
        setCurrentMessages((currContact && currContact.messages) || [])
        filterContacts(data, search)
    }, [message,contactSelected, data, search])

    function pushMessage(spa1) {
        const index = data.findIndex((d) => d.contact.id === contactSelected.id)

        const newData = Object.assign([], data, {
            [index]: {
                contact: contactSelected,
                messages: [...data[index].messages, new Message(true, message, new Date())],
            },
        })
        setSpan(spa1);
        setData(newData)
        setMessage('killer');
    }

    function filterContacts(data, search) {
        const result = data.filter(({ contact }) => {
            return !search || contact.name.toLowerCase().includes(search.toLowerCase())
        })
        setFilterContacts(result)
    }

    return (
        <div className="app">
            <aside>
                <header>
                    <Avatar user={mainUser} displayWithName/>
                </header>
                <Search search={search} setSearch={setSearch} />
                <div className="contact-boxes">
                    {filteredContacts.map(({ contact, messages }) => (
                        <ContactBox
                            contact={contact}
                            key={contact.id}
                            setContactSelected={setContactSelected}
                            messages={messages}
                        />
                    ))}
                </div>
            </aside>
            {contactSelected.id ? (
                <main>
                    <header>
                        <Avatar user={contactSelected} displayWithName/>
                    </header>
                    <MessagesBox messages={currentMessages} span={span} />
                    <ChatInputBox message={message} setMessage={setMessage} pushMessage={pushMessage} data={data}/>
                </main>
            ) : (
                <Welcome />
            )}
        </div>
    )
}

export default App
