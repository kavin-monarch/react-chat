import React,{useState,useEffect} from 'react'
import emojiIcon from '../assets/tag_faces.svg'
import micIcon from '../assets/mic.svg'
import sendIcon from '../assets/send.svg'
import './ChatInputBox.css'

export default function ChatInputBox({ message, setMessage, pushMessage,data}) {
    let input=document.querySelector('.input');
    const [suggestion,setSuggestion]= useState(false);
    const [sea,setSea]=useState('');
    const [sug, setSug] = useState([]);
    const [start, setStart] = useState(0);

    useEffect(() => {
        if(suggestion===true){
            filterContacts(data, sea)
        }
    }, [data,sea,message,suggestion])

    function filterContacts(dat, search) {
        const result = dat.filter(({ contact }) => {
            return !search || contact.name.toLowerCase().includes(search.toLowerCase())
        })
        setSug(result);
    }

    let create_span = (current) => {
        let span = document.createElement('span');
        span.innerHTML = '@'+current + '&#8203;';
        span.setAttribute('contenteditable', 'false');
        span.setAttribute('class', 'mention');
        return span;
      }
      
    function setInput(e){
        let key=e.target.querySelector('.avatar-title').innerText;
        setSuggestion(false);
        input.innerHTML=input.innerHTML.replace('@'+sea,'');
        input.append(create_span(key+' '));
        input.innerHTML += '&#8203;';
        setSug([]);
    }

    let suggest=suggestion ? 'suggestion' : '';
    function handleKeyDown(e) {
        if(suggestion===true){
            console.log(message.substring(start,message.length));
            setSea(message.substring(start,message.length));
        }
        if(start===message.length+1){
            setSuggestion(false);
            setSug([]);
        }
        if(e.key==='@'){
            setSuggestion(true);
            setStart(message.length);

        }
        if (e.key === 'Enter' && message && suggestion===false) {
            e.preventDefault();
            let span = document.createElement('span');
            span.innerHTML=e.target.innerHTML;
            e.target.innerHTML=''
            setMessage('');
            pushMessage(span);
        }
    }
    function test(e){
        setMessage(e.target.textContent);
    }
    return (
        <div className="chat-input-box">
            <div className={suggest} id="display_area">
            {sug.map(({ contact, messages }) => (
                       <div className="contact-box" onClick={setInput}>
            <div className="right-section">
                <div className="contact-box-header">
                    <h3 className="avatar-title">{contact.name}</h3>
                    <span className="time-mark">id:{contact.id.substring(0,5)}</span>
                </div>
            </div>
        </div>
                    ))}
            </div>
            <div className="icon emoji-selector">
                <img src={emojiIcon} alt="" />
            </div>

            <div className="chat-input">
                <div
                    className="input"
                    type="text"
                    placeholder="Type a message"
                    textContent={message}
                    onKeyUp={handleKeyDown}
                    contentEditable={true}
                    onInput={test}
                />
            </div>

            <div className="icon send" onClick={pushMessage}>
                <img src={message ? sendIcon : micIcon} alt="" />
            </div>
        </div>
    )
}
