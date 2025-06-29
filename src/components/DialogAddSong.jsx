import { Button } from "./ui/button.tsx"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog.tsx"
import { Input } from "../components/ui/input.tsx"
import { Label } from "../components/ui/label.tsx"
import {useContext, useState} from "react";
import axios from "axios";
import {useToast} from "@/hooks/use-toast.js";


export function DialogAddSong() {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState()
    const [file, setFile] = useState()
    const { toast } = useToast()

    const uploadAudio = async () => {
        console.log('ну сработало')
        try {
            let filePath = ''
            let imagePath = ''
            let idFile = ''
            let idImage = ''

            const formDataFile = new FormData()
            formDataFile.append('file', file)
            formDataFile.append('upload_preset', 'music-app')
            formDataFile.append('cloud_name', 'dehzfto8m')
            const formDataImage = new FormData()
            formDataImage.append('file', image)
            formDataImage.append('upload_preset', 'music-app')
            formDataImage.append('cloud_name', 'dehzfto8m')
            console.log(formDataFile)

            const response = await fetch(`https://api.cloudinary.com/v1_1/dehzfto8m/image/upload`, {
                method: "POST",
                body: formDataImage
            }).then(res => {
                toast({
                    title: 'Отправка изображения на сервер успешно завершена!'
                })
                return res.json()
            })
            idImage = response.public_id
            imagePath = response.url
            console.log(response)

            const response1 = await fetch(`https://api.cloudinary.com/v1_1/dehzfto8m/video/upload`, {
                method: "POST",
                body: formDataFile
            }).then(res => {
                toast({
                    title: 'Отправка музыки на сервер успешно завершена!'
                })
                return res.json()
            })
            idFile = response1.public_id
            filePath = response1.url
            console.log(response1)

            try{
                await axios.post(`${import.meta.env.VITE_HOST}/add/`, {
                    name: name,
                    desc: author,
                    image: imagePath,
                    file: filePath,
                    publicIdImage: idImage,
                    publicIdFile: idFile
                }).then(r => {
                    console.log(r)
                    if(r.status === 200 || r.status === 201)
                        toast({
                            title: 'Замена полностью завершена!',
                            description: 'Можно обновить страницу'
                        })
                    else
                        toast({
                        title: 'Ошибка!',
                        description: 'Файлы выложены, но не заменены в базе данных!'
                    })
                })
                return 'Success!'
            }
            catch (e) {
                toast({
                    title: 'Ошибка!',
                    description: 'Файлы выложены, но не заменены в базе данных!'
                })
                console.log(e)
                return 'Error!'
            }
        }
        catch (e) {
            console.log(e)
            toast({
                title: 'Непредвиденная ошибка!',
                description: 'Повторите попытку позже!'
            })
        }
    }
    const handleDrop = () => {
        toast({
            title: 'Отправка началась!',
            description: 'Пожалуйста не обновляйте страницу!'
        })
        console.log('фигня')
        uploadAudio()
        console.log(file)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-black text-white font-semibold duration-300' variant="outline">Add Song</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black">
                <DialogHeader>
                    <DialogTitle className='text-white'>Add Song</DialogTitle>
                    <DialogDescription>
                        Add song to app
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right text-white">
                            Название
                        </Label>
                        <Input id="name" type='text' className="col-span-3 text-white" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="author" className="text-right text-white">
                            Автор
                        </Label>
                        <Input id="author" type='text' className="col-span-3 text-white" onChange={e => setAuthor(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right text-white">
                            Image
                        </Label>
                        <Input id="image" type='file' accept='image/*' className="col-span-3 text-white" onChange={e => setImage(e.target.files[0])}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right text-white">
                            Music
                        </Label>
                        <Input id="file" type='file' accept='.mp3' className="col-span-3 text-white" onChange={e => setFile(e.target.files[0])}/>
                    </div>
                </div>
                <DialogClose asChild>
                    <Button type="submit" onClick={() => handleDrop()}>Отправить</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
