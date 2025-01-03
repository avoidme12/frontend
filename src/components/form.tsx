import {useRef} from "react";

export default function Form(){
    const inputNameRef = useRef(null)
    const inputAuthorRef = useRef(null)
    const inputImageRef = useRef(null)
    const inputFileRef = useRef(null)

    const sendData = (name, author, image, file) => {

        const data = JSON.stringify({
            id:8,
            name: name,
            image: image,
            file: file,
            desc: author,
            minutes: '4',
            seconds: '22',
        })

        console.log(data)
    }

    return(
        <div className='m-5'>
            <input ref={inputNameRef} className='text-black mx-3' type="text" placeholder='Название'/>
            <input ref={inputAuthorRef} className='text-black mx-3' type="text" placeholder='Автор'/>
            <input ref={inputImageRef} className='text-black mx-3' type="file" accept='.jpg, .jpeg, .png' placeholder='Изображение'/>
            <input ref={inputFileRef} type="file" accept='.mp3' placeholder='Файл'/>
            <button onClick={e => sendData(inputNameRef.current.value,inputAuthorRef.current.value,inputImageRef.current.value,inputFileRef.current.value)} className='bg-white font-semibold text-black'>Отправить</button>
        </div>
    )
}